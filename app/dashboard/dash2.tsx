'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function HeroComponent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-100/30 to-blue-100/30 rounded-full blur-3xl -z-10"></div>

      {/* Main Content */}
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 flex items-center min-h-screen lg:min-h-screen">
        <div className={`w-full max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 backdrop-blur-md border border-blue-200/50 mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800">AI-Powered Connected Healthcare</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 lg:mb-8 leading-tight tracking-tight">
            Tomorrow's Patient Care Made
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
              Intelligent
            </span>
          </h1>

          {/* Main Description */}
          <p className="text-sm sm:text-base md:text-base text-slate-700 mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-normal max-w-3xl">
            As the connected world continues to expand, AI-powered patient monitoring plays a central role in shaping a more interconnected, accessible, and efficient healthcare future. From real-time vital tracking that simplifies patient care to intelligent risk prediction systems that support medical professionals, HealthAI ensures seamless connectivity between patients and healthcare providers. Our advanced System-on-Chip solutions stand out for exceptional processing efficiency, enabling extended monitoring capabilities for connected devices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12 lg:mb-16">
            <button className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Start Monitoring
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-slate-300 text-slate-800 rounded-lg font-semibold text-sm sm:text-base hover:border-blue-600 hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 backdrop-blur-sm">
              Learn More
            </button>
          </div>

          {/* Features List */}
          <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12 lg:mb-14">
            {[
              { text: '24/7 Continuous Monitoring', delay: '0ms' },
              { text: 'AI-Powered Risk Detection', delay: '100ms' },
              { text: 'Sub-10ms Alert Response', delay: '200ms' }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 sm:gap-4 text-slate-800 group cursor-pointer"
                style={{ animation: isLoaded ? `slideIn 0.6s ease-out ${feature.delay} forwards` : 'none', opacity: 0 }}
              >
                <div className="flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                </div>
                <span className="text-sm sm:text-base font-semibold group-hover:text-blue-600 transition-colors duration-300">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {[
              { value: '10K+', label: 'Patients', subtext: 'Monitored' },
              { value: '99.2%', label: 'Accuracy', subtext: 'Verified' },
              { value: '<10ms', label: 'Response', subtext: 'Time' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-600 mt-0.5">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}