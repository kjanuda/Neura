"use client";

import React from 'react';
import { ArrowRight, Cpu, Database, Brain, Monitor } from 'lucide-react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            3. METHODOLOGY
          </h2>
          <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl">
            System Architecture
          </h1>
        </div>

        {/* System Flow Diagram */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Stage 1: Sensor Layer */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <div className="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Cpu className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-gray-900 text-lg md:text-xl font-light mb-3">SENSOR LAYER</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700 text-xs md:text-sm font-light">ESP32 + Sensors</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">MAX30100</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">DHT22</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">MQ135</p>
                </div>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Real-time data collection from multiple health sensors
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-white rounded-full p-2 shadow-md border border-gray-200">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Stage 2: Data Processing */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <div className="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Database className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-gray-900 text-lg md:text-xl font-light mb-3">DATA PROCESSING</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700 text-xs md:text-sm font-light">MongoDB</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">Aggregation</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">Feature Eng.</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">Normalization</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">Time-series</p>
                </div>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Data cleaning and feature extraction
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-white rounded-full p-2 shadow-md border border-gray-200">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Stage 3: AI/ML Engine */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <div className="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-gray-900 text-lg md:text-xl font-light mb-3">AI/ML ENGINE</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700 text-xs md:text-sm font-light">CNN-LSTM</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">+ Attention</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">Ensemble</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">Models</p>
                </div>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Advanced deep learning for health prediction
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                <div className="bg-white rounded-full p-2 shadow-md border border-gray-200">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Stage 4: User Interface */}
            <div>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <div className="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Monitor className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-gray-900 text-lg md:text-xl font-light mb-3">USER INTERFACE</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700 text-xs md:text-sm font-light">React Web</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">Dashboard</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">+ Alerts</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">+ Analytics</p>
                  <p className="text-gray-700 text-xs md:text-sm font-light">+ History</p>
                </div>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Real-time visualization and alerts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Flow Explanation */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-lg">
            <h3 className="text-gray-700 text-lg md:text-xl font-light mb-6 tracking-wide">
              How It Works
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5 border border-blue-200">1</div>
                  <div>
                    <h4 className="text-gray-900 text-sm md:text-base font-light mb-1">Data Collection</h4>
                    <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed">
                      IoT sensors continuously monitor vital signs including heart rate, blood oxygen, temperature, humidity, and air quality every second.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5 border border-blue-200">2</div>
                  <div>
                    <h4 className="text-gray-900 text-sm md:text-base font-light mb-1">Data Processing</h4>
                    <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed">
                      Raw sensor data is cleaned, normalized, and transformed into features. Time-series patterns are extracted and stored in MongoDB.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5 border border-blue-200">3</div>
                  <div>
                    <h4 className="text-gray-900 text-sm md:text-base font-light mb-1">AI Analysis</h4>
                    <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed">
                      CNN-LSTM model with attention mechanism analyzes patterns, predicts health deterioration 30-60 minutes ahead with 95% accuracy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5 border border-blue-200">4</div>
                  <div>
                    <h4 className="text-gray-900 text-sm md:text-base font-light mb-1">Alert & Visualization</h4>
                    <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed">
                      Real-time dashboard displays health status, trends, and sends multi-level alerts to healthcare providers when needed.
                    </p>
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