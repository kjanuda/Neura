import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.ctfassets.net/qx5k8y1u9drj/2fyl7BnOtv5uyHkmWmnrQv/f9d9a70af813f0099d4a649b6748ec1a/homepage-01.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/25" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-end h-full">
        {/* Main Content */}
        <div className="px-8 pb-12 md:px-16 md:pb-16 lg:px-20 lg:pb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-12">
          {/* Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-3 md:mb-4 tracking-tight">
              Research
            </h1>
            <p className="text-white/75 text-sm md:text-base font-light max-w-xl leading-relaxed">
              CNN-LSTM hybrid architecture for healthcare Remote patient monitoring system LSTM, attention mechanisms, IoT integration
            </p>
          </div>

          {/* Right Content - Full Video Button */}
          <div className="flex items-end">
            
          </div>
        </div>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}