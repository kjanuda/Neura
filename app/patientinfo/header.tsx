'use client';

import React from 'react';

export default function HealthMonitorHeader() {
  const [currentTime, setCurrentTime] = React.useState<Date | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Set mounted to true and initialize time on client side only
    setMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-none">
      {/* Background Image with White Blur Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/health.webp')"
        }}
      >
        {/* White Blur Overlay - Reduced */}
        <div className="absolute inset-0 bg-white/25 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-16 md:px-12 md:py-20">
        <div className="flex items-start justify-between">
          {/* Left Side - Icon and Title */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              
              <h1 className="text-5xl md:text-6xl font-light text-black drop-shadow-lg">
                AI-Powered Health Monitoring
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="inline-block">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-200 shadow-lg">
                <p className="text-black text-xl md:text-2xl font-light">
                  Patient P001 - Enhanced CNN-LSTM Prediction System
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Time and Day */}
          <div className="text-right ml-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {/* Only render time after component is mounted on client */}
                {mounted && currentTime ? formatTime(currentTime) : '00:00:00 AM'}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {mounted && currentTime ? formatDay(currentTime) : 'Loading...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative White Blur Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
    </div>
  );
}