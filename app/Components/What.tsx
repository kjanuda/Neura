import React from 'react';
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';

export default function IoTHealthPage() {
  return (
    <div className="min-h-screen bg-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-8 leading-tight">
            What is HealthGuard AI?
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Text Content */}
            <div>
              <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
                This IoT-based home patient monitoring system uses an ESP32 microcontroller connected to multiple health and environmental sensors to collect real-time data for continuous remote patient monitoring.
              </p>
              <Link href="/learn">
              <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg mb-12">
                <ArrowUpRight className="w-6 h-6" />
                <span className="font-semibold text-lg">More info</span>
              </button>
              </Link>

            </div>
            
            {/* Right Side - System Components Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-gray-100 to-slate-200 rounded-3xl p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Sensor Integration
                </h2>
                <div className="flex items-center justify-center my-8">
                  <img 
                    src="/images.webp" 
                    alt="IoT Sensors"
                    className="w-2/3 h-auto object-contain"
                  />
                </div>
                <p className="text-slate-600 text-right text-base mb-8">
                  Essential for Real-Time Health Monitoring
                </p>

                {/* Bottom Text Under Image */}
                <div className="mt-8 pt-6 border-t border-slate-300">
                  <p className="text-base text-slate-700 leading-relaxed">
                    The DHT11 sensor measures body temperature, the MAX30102 monitors heart rate and blood oxygen saturation (SpO₂), and the MQ-135 tracks air quality—critical for patients with respiratory conditions like asthma. All sensor data is transmitted via Wi-Fi to a cloud server where an AI-based anomaly detection model analyzes patterns and detects abnormal changes early.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}