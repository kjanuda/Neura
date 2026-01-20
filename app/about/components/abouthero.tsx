"use client";

import React from "react";
import { ArrowRight, Sparkles, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Years Badge */}
            <div className="inline-flex items-baseline gap-4">
              <div className="text-8xl md:text-9xl font-light text-gray-900 leading-none">1</div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-light text-gray-600">Years</span>
                <span className="text-sm text-gray-400 font-light tracking-wide">SINCE 2024</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4">
                ABOUT US
              </h2>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Neura Innovation
              </h1>
              <p className="text-gray-700 text-sm md:text-base font-light leading-relaxed max-w-xl">
                Neura is at the forefront of IoT and AI innovation, enabling ambient intelligence across billions of devices through advanced edge-AI platforms and ultra-low-power solutions.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              {[
                { icon: Award, label: "Accuracy", value: "95%" },
                { icon: Sparkles, label: "Innovation", value: "First in SL" },
                { icon: Users, label: "Impact", value: "Rural Access" },
                { icon: ArrowRight, label: "Cost Reduction", value: "90%" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                  <stat.icon className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="text-gray-900 text-xl md:text-2xl font-light mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-xs font-light">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center gap-3 px-8 py-4 border border-gray-300 rounded-full text-gray-900 font-light hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
              <span className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full group-hover:border-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-sm md:text-base">Our Journey</span>
            </button>

            {/* Mission Statement */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
              <h3 className="text-gray-900 text-base md:text-lg font-light mb-3">Our Mission</h3>
              <p className="text-gray-700 text-xs md:text-sm font-light leading-relaxed">
                Making advanced healthcare monitoring accessible to everyone through cutting-edge AI technology and affordable IoT solutions, bridging the gap between urban and rural healthcare.
              </p>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative">
            {/* Image Container */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-b from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-200">
              <img 
                src="/intro-tree.webp" 
                alt="Neura Innovation Tree" 
                className="w-full h-full object-contain drop-shadow-2xl p-8"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs hidden lg:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-900 text-sm font-light">System Active</span>
              </div>
              <p className="text-gray-600 text-xs font-light">Monitoring 5 patients continuously</p>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs hidden lg:block">
              <div className="text-blue-600 text-2xl font-light mb-1">518,400</div>
              <p className="text-gray-600 text-xs font-light">Data points analyzed per patient</p>
            </div>
          </div>

        </div>

        {/* Bottom Timeline/Journey Section */}
        <div className="mt-20 md:mt-24 max-w-7xl mx-auto">
          <h2 className="text-gray-900 text-2xl md:text-3xl font-light mb-12 text-center">
            Our Innovation Journey
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { year: "2024", title: "Foundation", desc: "Research initiated on CNN-LSTM for healthcare monitoring" },
              { year: "2025", title: "Validation", desc: "95% accuracy achieved in clinical trials with 5 patients" },
              { year: "2025", title: "Innovation", desc: "First Sri Lankan implementation of attention-mechanism AI" },
              { year: "2026", title: "Expansion", desc: "Scaling to rural healthcare and multi-center validation" }
            ].map((milestone, idx) => (
              <div key={idx} className="relative bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-blue-600 text-3xl font-light mb-2">{milestone.year}</div>
                <h3 className="text-gray-900 text-base md:text-lg font-light mb-2">{milestone.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed">{milestone.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}