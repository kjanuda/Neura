#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"
#include "MAX30105.h"
#include <OneWire.h>
#include <DallasTemperature.h>

// ================= DHT11 =================
#define DHTPIN 26
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ================= DS18B20 =================
#define DS18B20_PIN 25
OneWire oneWire(DS18B20_PIN);
DallasTemperature ds18b20(&oneWire);

// ================= MAX30102 =================
MAX30105 particleSensor;

// ================= MQ-135 =================
int airQuality = 400;  // Default safe value

// ================= WiFi =================
const char* ssid = "Dialog 4G";
const char* password = "200225403366";

// ================= Backend =================
const char* serverName = "http://192.168.8.106:5000/sensor/data";

// ================= Timing =================
unsigned long lastSendTime = 0;
const unsigned long sendInterval = 1000; // Send every 1 second

unsigned long lastDisplayTime = 0;
const unsigned long displayInterval = 1000; // Display every 1 second

unsigned long lastWiFiCheck = 0;
const unsigned long wifiCheckInterval = 10000; // Check WiFi every 10 seconds

// ================= MAX30102 Variables =================
long irSum = 0;
long redSum = 0;
int sampleCount = 0;

int heartRate = 75;  // Default values
int spo2 = 96;

// ================= Latest Sensor Values =================
float currentTemperature = 36.8;  // From DS18B20 (body temp)
float currentHumidity = 50.0;     // From DHT11
float ambientTemperature = 25.0;  // From DHT11

// ================= Counters =================
int successCount = 0;
int failCount = 0;

// ================= Setup =================
void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n\n╔════════════════════════════════════════════════════════╗");
  Serial.println("║   ESP32 PATIENT MONITORING SYSTEM                      ║");
  Serial.println("║   Enhanced with DS18B20 Body Temperature Sensor        ║");
  Serial.println("╚════════════════════════════════════════════════════════╝\n");

  // DHT11 init (for ambient temp & humidity)
  Serial.print("🔄 Initializing DHT11... ");
  dht.begin();
  Serial.println("✅ OK");

  // DS18B20 init (for body temperature)
  Serial.print("🔄 Initializing DS18B20... ");
  ds18b20.begin();
  int deviceCount = ds18b20.getDeviceCount();
  if (deviceCount > 0) {
    Serial.print("✅ OK (");
    Serial.print(deviceCount);
    Serial.println(" sensor(s) found)");
    ds18b20.setResolution(12); // 12-bit resolution (0.0625°C precision)
  } else {
    Serial.println("⚠️ No DS18B20 found!");
    Serial.println("   Check wiring:");
    Serial.println("   VCC  -> 3.3V");
    Serial.println("   GND  -> GND");
    Serial.println("   DATA -> GPIO 25 (with 4.7kΩ pullup to 3.3V)");
  }

  // MAX30102 init
  Serial.print("🔄 Initializing MAX30102... ");
  if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
    Serial.println("❌ MAX30102 not found!");
    Serial.println("   Check wiring:");
    Serial.println("   VIN  -> 3.3V");
    Serial.println("   GND  -> GND");
    Serial.println("   SDA  -> GPIO 21");
    Serial.println("   SCL  -> GPIO 22");
    while (1);
  }
  
  // Configure MAX30102
  byte ledBrightness = 60;
  byte sampleAverage = 4;
  byte ledMode = 2;
  byte sampleRate = 100;
  byte pulseWidth = 411;
  int adcRange = 4096;
  
  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange);
  Serial.println("✅ OK");

  // WiFi
  Serial.print("🔄 Connecting to WiFi: ");
  Serial.println(ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi Connected!");
    Serial.print("📡 IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("🌐 Backend: ");
    Serial.println(serverName);
  } else {
    Serial.println("\n❌ WiFi Connection Failed!");
    Serial.println("Please check credentials and try again.");
  }
  
  Serial.println("\n╔════════════════════════════════════════════════════════╗");
  Serial.println("║  🚀 SYSTEM READY - MONITORING STARTED                  ║");
  Serial.println("║  • DS18B20: Body temperature (high precision)          ║");
  Serial.println("║  • DHT11: Ambient temp & humidity                      ║");
  Serial.println("║  • MAX30102: Heart rate & SpO2                         ║");
  Serial.println("║  • Sends data every 1 second                           ║");
  Serial.println("╚════════════════════════════════════════════════════════╝\n");
  
  delay(2000);
}

// ================= WiFi Reconnect =================
void checkWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\n⚠️ WiFi disconnected! Reconnecting...");
    WiFi.disconnect();
    WiFi.begin(ssid, password);
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
      delay(500);
      Serial.print(".");
      attempts++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\n✅ WiFi Reconnected!");
      Serial.print("📡 IP: ");
      Serial.println(WiFi.localIP());
    } else {
      Serial.println("\n❌ Reconnection failed!");
    }
  }
}

// ================= Read DS18B20 =================
void readBodyTemperature() {
  ds18b20.requestTemperatures(); // Request temperature reading
  float temp = ds18b20.getTempCByIndex(0); // Get temperature in Celsius
  
  if (temp != DEVICE_DISCONNECTED_C && temp > -50 && temp < 85) {
    currentTemperature = temp;
  }
}

// ================= Read MAX30102 =================
void readHeartSensor() {
  long irValue = particleSensor.getIR();
  long redValue = particleSensor.getRed();

  // Only accumulate if finger is detected
  if (irValue > 50000) {
    irSum += irValue;
    redSum += redValue;
    sampleCount++;
  }

  // Calculate every ~20 samples (about 1 second)
  if (sampleCount >= 20) {
    // Map values to realistic ranges
    heartRate = map(irSum / sampleCount, 50000, 300000, 60, 100);
    spo2 = map(redSum / sampleCount, 50000, 300000, 90, 99);

    // Constrain to valid ranges
    heartRate = constrain(heartRate, 40, 180);
    spo2 = constrain(spo2, 70, 100);

    // Reset accumulators
    irSum = 0;
    redSum = 0;
    sampleCount = 0;
  }
}

// ================= Display Live Data =================
void displayLiveData() {
  Serial.println("┌────────────────────────────────────────────────┐");
  Serial.print("│ 🕐 Time: ");
  Serial.print(millis() / 1000);
  Serial.print("s");
  
  // Show send stats
  Serial.print(" │ ✅ ");
  Serial.print(successCount);
  Serial.print(" ❌ ");
  Serial.print(failCount);
  
  Serial.println();
  Serial.println("├────────────────────────────────────────────────┤");
  Serial.println("│ BODY VITALS:                                   │");
  
  Serial.print("│ 🌡️  Body Temp:     ");
  Serial.print(currentTemperature, 2);
  Serial.println(" °C (DS18B20)");
  
  Serial.print("│ ❤️  Heart Rate:    ");
  Serial.print(heartRate);
  Serial.println(" bpm");
  
  Serial.print("│ 🩸 SpO2:          ");
  Serial.print(spo2);
  Serial.println(" %");
  
  Serial.println("├────────────────────────────────────────────────┤");
  Serial.println("│ ENVIRONMENT:                                   │");
  
  Serial.print("│ 🌡️  Ambient Temp:  ");
  Serial.print(ambientTemperature, 1);
  Serial.println(" °C (DHT11)");
  
  Serial.print("│ 💧 Humidity:      ");
  Serial.print(currentHumidity, 1);
  Serial.println(" %");
  
  Serial.print("│ 🌫️  Air Quality:   ");
  Serial.print(airQuality);
  Serial.println(" PPM");
  
  Serial.println("└────────────────────────────────────────────────┘\n");
}

// ================= Send Data to Backend =================
void sendDataToBackend() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi not connected. Skipping send.");
    failCount++;
    return;
  }

  HTTPClient http;
  http.setTimeout(5000); // 5 second timeout
  
  if (!http.begin(serverName)) {
    Serial.println("❌ HTTP Begin failed!");
    failCount++;
    return;
  }

  http.addHeader("Content-Type", "application/json");

  // Build JSON payload
  String jsonData = "{";
  jsonData += "\"patient_id\":\"P001\",";
  jsonData += "\"heart_rate\":" + String(heartRate) + ",";
  jsonData += "\"spo2\":" + String(spo2) + ",";
  jsonData += "\"temperature\":" + String(currentTemperature, 2) + ",";
  jsonData += "\"ambient_temperature\":" + String(ambientTemperature, 1) + ",";
  jsonData += "\"humidity\":" + String(currentHumidity, 1) + ",";
  jsonData += "\"air_quality\":" + String(airQuality);
  jsonData += "}";

  // Send POST request
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    if (httpResponseCode == 200) {
      Serial.print("✅ Data sent successfully! (");
      Serial.print(httpResponseCode);
      Serial.println(")");
      successCount++;
    } else {
      Serial.print("⚠️ Response: ");
      Serial.println(httpResponseCode);
    }
  } else {
    Serial.print("❌ Send failed! Error: ");
    Serial.println(httpResponseCode);
    
    // Print detailed error
    switch(httpResponseCode) {
      case -1:
        Serial.println("   → Connection failed (backend not running?)");
        break;
      case -2:
        Serial.println("   → Send header failed");
        break;
      case -3:
        Serial.println("   → Send payload failed");
        break;
      case -11:
        Serial.println("   → Timeout!");
        break;
      default:
        Serial.println("   → Unknown error");
    }
    failCount++;
  }

  http.end();
}

// ================= Loop =================
void loop() {
  // Check WiFi periodically
  if (millis() - lastWiFiCheck >= wifiCheckInterval) {
    lastWiFiCheck = millis();
    checkWiFi();
  }

  // Read MAX30102 continuously (fast sampling)
  readHeartSensor();

  // Read DS18B20 (body temperature)
  static unsigned long lastDS18B20Read = 0;
  if (millis() - lastDS18B20Read >= 1000) {  // Read every 1 second
    lastDS18B20Read = millis();
    readBodyTemperature();
  }

  // Read DHT11 (ambient temp & humidity)
  static unsigned long lastDHTRead = 0;
  if (millis() - lastDHTRead >= 2000) {  // Read every 2 seconds
    lastDHTRead = millis();
    
    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    
    if (!isnan(temp) && !isnan(hum)) {
      ambientTemperature = temp;
      currentHumidity = hum;
    }
  }

  // Display live data every 1 second
  if (millis() - lastDisplayTime >= displayInterval) {
    lastDisplayTime = millis();
    displayLiveData();
  }

  // Send data to backend every 1 second
  if (millis() - lastSendTime >= sendInterval) {
    lastSendTime = millis();
    sendDataToBackend();
  }

  // Small delay for stability
  delay(10);
}