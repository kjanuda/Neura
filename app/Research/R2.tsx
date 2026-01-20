"use client";

import React from 'react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full h-screen bg-white">
      <div className="relative z-10 flex flex-col justify-end h-full">
        {/* Main Content */}
        <div className="px-8 pb-12 md:px-16 md:pb-16 lg:px-20 lg:pb-20 flex flex-col gap-8">
          {/* Header */}
          <div>
            <h2 className="text-black/40 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
              EXECUTIVE SUMMARY
            </h2>
            <h1 className="text-black text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 md:mb-8 tracking-tight max-w-4xl">
              Research Overview
            </h1>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl">
            {/* Left Column */}
            <div>
              <p className="text-black/75 text-sm md:text-base font-light leading-relaxed mb-6">
                This research project presents an innovative, cost-effective patient health monitoring system that combines Internet of Things (IoT) sensors with advanced deep learning algorithms to provide real-time health assessment and early warning detection.
              </p>
              <p className="text-black/75 text-sm md:text-base font-light leading-relaxed">
                The system achieves 95% accuracy in predicting patient health deterioration using a hybrid CNN-LSTM architecture with attention mechanisms, significantly outperforming traditional monitoring approaches while reducing false alarms by 70%.
              </p>
            </div>

            {/* Right Column */}
            <div className="border-l border-black/10 pl-8 md:pl-12">
              <h3 className="text-black text-sm md:text-base font-light mb-3 tracking-wide">
                KEY INNOVATION
              </h3>
              <p className="text-black/75 text-sm md:text-base font-light leading-relaxed">
                First Sri Lankan implementation of CNN-LSTM hybrid model with attention mechanism for continuous patient monitoring, validated against state-of-the-art 2024-2025 healthcare AI research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}