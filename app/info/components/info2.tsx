export default function ESP32Page() {
  return (
    <div className="min-h-screen bg-[#c5c9ce]">
      {/* Specifications Section */}
      <div className="bg-gray-50 px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800">Specifications</h2>
            <button className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors">
              <div className="w-14 h-14 border-2 border-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-lg font-medium">Compare with others</span>
            </button>
          </div>

          {/* Specification Items */}
          <div className="space-y-12">
            {/* Target Compatibility */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Target ESP32 Modules
                </h3>
                <p className="text-gray-600">Compatibility</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32-WROOM-32</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32-WROVER</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32-S Series</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32-C Series</span>
                </div>
              </div>
            </div>

            {/* Connectivity Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Connectivity Interface
                </h3>
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">
                    Micro-USB / USB-C connector for power and serial communication
                  </span>
                </div>
              </div>
            </div>

            {/* Programming Interfaces */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Programming Interfaces
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2"></span>
                  <span className="text-gray-600">
                    GPIO pins with I2C, SPI, UART support (standard 2.54mm pitch headers)
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2"></span>
                  <span className="text-gray-600">
                    PWM, ADC, DAC, and touch sensor pins (breadboard compatible)
                  </span>
                </div>
              </div>
            </div>

            {/* Project Components */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Project Components
                </h3>
                <p className="text-gray-600 italic">Measure Heart Rate and SpO2 with MAX30102</p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">ESP32 Dev Board × 1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">MAX30102 Sensor × 1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">OLED Display (SSD1306 – I2C) × 1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">Breadboard × 1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">Jumper wires</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">DHT11</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}