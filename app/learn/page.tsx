"use client";

import React, { useState } from 'react';
import { Brain, Cpu, Layers, Zap, Radio, Database, ChevronDown, ChevronUp } from 'lucide-react';

export default function HumanoidLanding() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section: React.SetStateAction<null>) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="relative w-full min-h-screen bg-white">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            TECHNICAL DEEP DIVE
          </h2>
          <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl mb-6">
            Learn More
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            Explore the technical details of our hybrid CNN-LSTM architecture and IoT sensor integration that powers intelligent patient health monitoring.
          </p>
        </div>

        {/* ML Model Architecture */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 rounded-full p-3">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-gray-900 text-2xl md:text-4xl font-light">Machine Learning Model Architecture</h2>
          </div>

          {/* Model Overview */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-10 border border-gray-200 mb-8">
            <h3 className="text-gray-900 text-xl md:text-2xl font-light mb-6">Hybrid CNN-LSTM with Attention Mechanism</h3>
            <p className="text-gray-700 text-sm md:text-base font-light leading-relaxed mb-6">
              Our model combines the spatial feature extraction capabilities of Convolutional Neural Networks (CNN) with the temporal sequence learning power of Long Short-Term Memory (LSTM) networks, enhanced by an attention mechanism that focuses on critical health events.
            </p>

            {/* Architecture Layers */}
            <div className="space-y-4">
              {[
                {
                  layer: "Input Layer",
                  icon: Database,
                  description: "Multi-sensor time-series data (Heart Rate, SpO2, Temperature, Humidity, Air Quality)",
                  specs: "Shape: (batch_size, time_steps, features) = (32, 60, 5)",
                  color: "blue"
                },
                {
                  layer: "CNN Layers",
                  icon: Layers,
                  description: "Extract spatial correlations between different vital signs",
                  specs: "3 Conv1D layers: 64, 128, 256 filters | Kernel size: 3 | Activation: ReLU | Max Pooling",
                  color: "blue"
                },
                {
                  layer: "LSTM Layers",
                  icon: Zap,
                  description: "Capture temporal dependencies and health trend patterns over time",
                  specs: "2 Bidirectional LSTM layers: 128, 64 units | Dropout: 0.3 | Return sequences",
                  color: "blue"
                },
                {
                  layer: "Attention Mechanism",
                  icon: Brain,
                  description: "Focus on critical time windows when health deterioration occurs",
                  specs: "Self-attention layer with learned weights | Softmax activation",
                  color: "blue"
                },
                {
                  layer: "Dense Layers",
                  icon: Layers,
                  description: "Final classification and prediction layers",
                  specs: "Dense(64) → ReLU → Dropout(0.3) → Dense(3) → Softmax",
                  color: "blue"
                },
                {
                  layer: "Output Layer",
                  icon: Zap,
                  description: "Health status classification: Normal, Warning, Critical",
                  specs: "3 classes with probability scores | Prediction confidence threshold: 0.85",
                  color: "blue"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 text-base md:text-lg font-light mb-2">{item.layer}</h4>
                      <p className="text-gray-700 text-sm font-light leading-relaxed mb-3">{item.description}</p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-600 text-xs md:text-sm font-light font-mono">{item.specs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Training Details */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-gray-900 text-base md:text-lg font-light mb-4">Training Configuration</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">OPTIMIZER</p>
                  <p className="text-gray-900 text-sm font-light">Adam (lr=0.001, β1=0.9, β2=0.999)</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">LOSS FUNCTION</p>
                  <p className="text-gray-900 text-sm font-light">Categorical Cross-Entropy</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">BATCH SIZE</p>
                  <p className="text-gray-900 text-sm font-light">32 samples</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">EPOCHS</p>
                  <p className="text-gray-900 text-sm font-light">100 (Early stopping: patience=10)</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-gray-900 text-base md:text-lg font-light mb-4">Data Preprocessing</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">NORMALIZATION</p>
                  <p className="text-gray-900 text-sm font-light">Min-Max Scaling (0-1 range)</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">TIME WINDOWS</p>
                  <p className="text-gray-900 text-sm font-light">60-second sliding windows</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">SAMPLING RATE</p>
                  <p className="text-gray-900 text-sm font-light">1 Hz (1 reading per second)</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">FEATURE ENGINEERING</p>
                  <p className="text-gray-900 text-sm font-light">Rolling mean, std, gradients</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-gray-900 text-base md:text-lg font-light mb-4">Model Performance</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">ACCURACY</p>
                  <p className="text-blue-600 text-2xl font-light">95%</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">INFERENCE TIME</p>
                  <p className="text-gray-900 text-sm font-light">0.12 seconds</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">MODEL SIZE</p>
                  <p className="text-gray-900 text-sm font-light">8.4 MB (TensorFlow)</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">PREDICTION HORIZON</p>
                  <p className="text-gray-900 text-sm font-light">30-60 minutes ahead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IoT Implementation */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 rounded-full p-3">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-gray-900 text-2xl md:text-4xl font-light">IoT Sensor Integration</h2>
          </div>

          {/* Hardware Architecture */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-10 border border-gray-200 mb-8">
            <h3 className="text-gray-900 text-xl md:text-2xl font-light mb-6">Hardware Components</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "ESP32 Microcontroller",
                  description: "Main processing unit with WiFi/Bluetooth connectivity",
                  specs: [
                    "Dual-core Xtensa 32-bit processor @ 240 MHz",
                    "520 KB SRAM, 4 MB Flash memory",
                    "WiFi 802.11 b/g/n, Bluetooth 4.2",
                    "12-bit ADC, multiple I2C/SPI interfaces",
                    "Low power consumption: <1W active"
                  ],
                  cost: "$8"
                },
                {
                  name: "MAX30100 Pulse Oximeter",
                  description: "Heart rate and blood oxygen (SpO2) sensor",
                  specs: [
                    "Red & IR LED for SpO2 measurement",
                    "Photodetector for pulse detection",
                    "I2C digital interface",
                    "Range: 0-100% SpO2, 0-200 bpm HR",
                    "Accuracy: ±2% SpO2, ±2 bpm HR"
                  ],
                  cost: "$12"
                },
                {
                  name: "DHT22 Temperature & Humidity",
                  description: "Environmental and body temperature monitoring",
                  specs: [
                    "Temperature range: -40°C to 80°C",
                    "Humidity range: 0-100% RH",
                    "Accuracy: ±0.5°C, ±2% RH",
                    "Digital signal output",
                    "Low power: 2.5mA max current"
                  ],
                  cost: "$5"
                },
                {
                  name: "MQ135 Air Quality Sensor",
                  description: "Detects harmful gases and air pollutants",
                  specs: [
                    "Detects: CO2, NH3, NOx, smoke, benzene",
                    "Analog output (0-5V)",
                    "Detection range: 10-1000 ppm",
                    "Preheat time: 24-48 hours",
                    "Operating voltage: 5V DC"
                  ],
                  cost: "$3"
                }
              ].map((component, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-gray-900 text-base md:text-lg font-light mb-2">{component.name}</h4>
                      <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">{component.description}</p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-light ml-4">
                      {component.cost}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 text-xs font-light tracking-wide mb-2">SPECIFICATIONS</p>
                    <ul className="space-y-1">
                      {component.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="text-gray-700 text-xs font-light flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-900 text-base md:text-lg font-light mb-2">Total Hardware Cost</h4>
                  <p className="text-gray-600 text-sm font-light">Complete sensor array with ESP32 microcontroller</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 text-3xl md:text-4xl font-light">$50</p>
                  <p className="text-gray-600 text-xs font-light">(₹4,000 approx.)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Flow & Communication */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Radio className="w-5 h-5 text-blue-600" />
                <h3 className="text-gray-900 text-lg md:text-xl font-light">Data Transmission</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-800 text-sm font-light mb-2">WiFi Communication</h4>
                  <p className="text-gray-600 text-xs font-light leading-relaxed mb-2">
                    ESP32 connects to local WiFi network and transmits sensor data to cloud server via HTTPS/MQTT protocol.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700 text-xs font-light font-mono">Protocol: MQTT over TLS 1.2</p>
                    <p className="text-gray-700 text-xs font-light font-mono">Frequency: 1 Hz (every second)</p>
                    <p className="text-gray-700 text-xs font-light font-mono">Payload: ~200 bytes JSON</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-800 text-sm font-light mb-2">Bluetooth Backup</h4>
                  <p className="text-gray-600 text-xs font-light leading-relaxed mb-2">
                    Local data logging to mobile app when WiFi unavailable, with automatic sync when connection restored.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700 text-xs font-light font-mono">Range: ~10 meters</p>
                    <p className="text-gray-700 text-xs font-light font-mono">Local storage: 24 hours buffer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Database className="w-5 h-5 text-blue-600" />
                <h3 className="text-gray-900 text-lg md:text-xl font-light">Data Processing Pipeline</h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Sensor Reading", desc: "Raw analog/digital signals from sensors" },
                  { step: "2", title: "Edge Processing", desc: "Basic filtering and validation on ESP32" },
                  { step: "3", title: "Cloud Upload", desc: "Encrypted transmission to MongoDB database" },
                  { step: "4", title: "Feature Engineering", desc: "Calculate statistical features and trends" },
                  { step: "5", title: "AI Prediction", desc: "CNN-LSTM model inference on processed data" },
                  { step: "6", title: "Alert Generation", desc: "Multi-tier notification based on predictions" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-gray-800 text-sm font-light mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Power & Reliability */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-gray-900 text-base md:text-lg font-light mb-4">Power Management</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">POWER SOURCE</p>
                  <p className="text-gray-900 text-sm font-light">5V USB / Battery (18650 Li-ion)</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">CONSUMPTION</p>
                  <p className="text-gray-900 text-sm font-light">Average: 0.8W | Peak: 1.2W</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">BATTERY LIFE</p>
                  <p className="text-gray-900 text-sm font-light">8-12 hours continuous operation</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">SOLAR OPTION</p>
                  <p className="text-gray-900 text-sm font-light">5W panel for remote areas</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-gray-900 text-base md:text-lg font-light mb-4">Reliability Features</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">WATCHDOG TIMER</p>
                  <p className="text-gray-900 text-sm font-light">Auto-reset on system hang</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">ERROR DETECTION</p>
                  <p className="text-gray-900 text-sm font-light">Sensor disconnect alerts</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">DATA BACKUP</p>
                  <p className="text-gray-900 text-sm font-light">Local 24-hour buffer storage</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">UPTIME</p>
                  <p className="text-gray-900 text-sm font-light">99.5% availability target</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-gray-900 text-base md:text-lg font-light mb-4">Security</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">ENCRYPTION</p>
                  <p className="text-gray-900 text-sm font-light">TLS 1.2 for all communications</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">AUTHENTICATION</p>
                  <p className="text-gray-900 text-sm font-light">Device certificates & API keys</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">DATA PRIVACY</p>
                  <p className="text-gray-900 text-sm font-light">HIPAA-compliant storage</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs font-light tracking-wide mb-1">OTA UPDATES</p>
                  <p className="text-gray-900 text-sm font-light">Secure firmware updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}