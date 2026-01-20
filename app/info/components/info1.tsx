export default function ESP32Page() {
  return (
    <div className="min-h-screen bg-[#c5c9ce] px-8 py-6">
      {/* Breadcrumb Navigation */}
      

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Logo */}
            <div className="mb-12">
              <h1 className="text-4xl font-light mb-1">
                <span className="text-gray-600">esp</span>
                <span className="text-blue-600 font-semibold">32</span>
              </h1>
              <p className="text-xs text-gray-500">by Neura</p>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
              ESP32
            </h2>

            {/* Subheading */}
            <h3 className="text-3xl font-light text-gray-700 mb-8">
              Designed for IoT Applications
            </h3>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              ESP32 is a powerful, low-cost microcontroller with integrated 
              Wi-Fi and Bluetooth connectivity, featuring dual-core processing, 
              rich peripheral interfaces, low power consumption, and extensive 
              compatibility with the Arduino and ESP-IDF ecosystems.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end items-start -mt-8">
            <img 
              src="/esp321.png" 
              alt="ESP32 Development Board"
              className="w-full max-w-lg object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}