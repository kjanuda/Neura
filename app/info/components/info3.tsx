export default function CircuitDebugger() {
  return (
    <div className="min-h-screen bg-[#c5c9ce]">
      {/* Hero Section */}
      <div className="px-8 py-6">
        {/* Breadcrumb Navigation */}
        

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              
              

              {/* Main Heading */}
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
                In-ESP32-Circuit Debugger
              </h2>

              {/* Subheading */}
              <h3 className="text-3xl font-light text-gray-700 mb-8">
                Designed for Developers
              </h3>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed">
                In-ESP32-Circuit Debugger is a USB-powered in-circuit debugger and 
                programmer for ESP32 microcontrollers, featuring a high-speed 
                JTAG interface, fast programming, standard connectors, and seamless 
                compatibility with ESP-IDF and Arduino frameworks.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end items-start -mt-8">
              <img 
                src="/esp32-devboard-.png" 
                alt="ESP32 Development Board with Circuit Debugger"
                className="w-full max-w-lg object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-gray-50 px-8 py-16 mt-16">
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
                  Target ESP32 SoC
                </h3>
                <p className="text-gray-600">Compatibility</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32-S2</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32-S3</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">ESP32-C3</span>
                </div>
              </div>
            </div>

            {/* USB Host Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  USB Host Interface
                </h3>
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-600">
                    USB 2.0 full speed with USB-C connector
                  </span>
                </div>
              </div>
            </div>

            {/* Programming Interfaces */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Target Programming Interfaces
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2"></span>
                  <span className="text-gray-600">
                    Standard 20-pin male 1.27mm pitch JTAG connector (ribbon cable included)
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2"></span>
                  <span className="text-gray-600">
                    Standard 10-pin male 1.27mm pitch JTAG connector (ribbon cable not included)
                  </span>
                </div>
              </div>
            </div>

            {/* Debugging Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Debugging Features
                </h3>
                <p className="text-gray-600">Advanced Development Tools</p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">Real-time JTAG debugging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">Breakpoint support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">Memory inspection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">Flash programming</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span className="text-gray-600">OpenOCD compatible</span>
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