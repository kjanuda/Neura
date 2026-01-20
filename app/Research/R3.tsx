"use client";

import React from 'react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src="/HS-hero.webp"
          alt="Healthcare background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-white/90" />
      </div>

      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-black/40 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            1. PROBLEM STATEMENT
          </h2>
          <h1 className="text-black text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl">
            Global Healthcare Challenges
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Section 1.1 */}
            <div>
              <h3 className="text-black text-base md:text-lg font-light mb-4 tracking-wide">
                1.1 Critical Issues in Current Patient Monitoring
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-black text-sm md:text-base font-light mb-1">
                    High False Alarm Rate
                  </p>
                  <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                    Traditional ICU monitors generate 40-60% false positive alarms, leading to alarm fatigue among medical staff
                  </p>
                </div>
                <div>
                  <p className="text-black text-sm md:text-base font-light mb-1">
                    Delayed Detection
                  </p>
                  <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                    Manual monitoring cannot provide 24/7 surveillance, resulting in delayed response to patient deterioration
                  </p>
                </div>
                <div>
                  <p className="text-black text-sm md:text-base font-light mb-1">
                    Limited Accessibility
                  </p>
                  <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                    Expensive monitoring equipment (₹500,000 - ₹2,000,000) restricts access to tier-1 hospitals only
                  </p>
                </div>
                <div>
                  <p className="text-black text-sm md:text-base font-light mb-1">
                    Resource Constraints
                  </p>
                  <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                    Nursing shortage requires 1:4 nurse-to-patient ratio in ICUs, often unmet in developing countries
                  </p>
                </div>
                <div>
                  <p className="text-black text-sm md:text-base font-light mb-1">
                    Rural Healthcare Gap
                  </p>
                  <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                    70% of Sri Lankan population in rural areas lacks access to continuous health monitoring
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1.2 */}
            <div>
              <h3 className="text-black text-base md:text-lg font-light mb-4 tracking-wide">
                1.2 Local Context (Sri Lanka)
              </h3>
              <div className="space-y-3">
                <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                  <span className="text-black">Aging Population:</span> 12.4% of population over 60 years (projected to reach 20% by 2041)
                </p>
                <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                  <span className="text-black">Chronic Disease Burden:</span> Rising diabetes (10.3%), cardiovascular disease (leading cause of death), and respiratory conditions
                </p>
                <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                  <span className="text-black">Healthcare Cost:</span> Out-of-pocket health expenditure at 47% of total health spending
                </p>
                <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                  <span className="text-black">ICU Bed Shortage:</span> Only 1.2 ICU beds per 100,000 population (WHO recommendation: 5-10)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="border-l border-black/10 pl-8 md:pl-12">
            <h3 className="text-black text-base md:text-lg font-light mb-4 tracking-wide">
              1.3 Research Gap
            </h3>
            <p className="text-black/75 text-sm md:text-base font-light leading-relaxed mb-6">
              Existing patient monitoring systems lack:
            </p>
            <div className="space-y-4">
              <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                • Predictive capability to forecast health deterioration 30-60 minutes ahead
              </p>
              <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                • Personalized baselines adapted to individual patient characteristics
              </p>
              <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                • Cost-effective solutions for home-based and rural healthcare
              </p>
              <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed">
                • Advanced AI integration using state-of-the-art deep learning architectures
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}