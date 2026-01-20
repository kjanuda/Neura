"use client";

import React from 'react';
import { Building2, Home, Heart, MapPin, TrendingUp, Users2, DollarSign, Globe } from 'lucide-react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            5. IMPACT & APPLICATIONS
          </h2>
          <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl">
            Primary Use Cases
          </h1>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Hospital ICU Monitoring */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-gray-400 text-xs font-light tracking-wider">USE CASE 01</span>
                <h3 className="text-gray-900 text-lg md:text-xl font-light">Hospital ICU Monitoring</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Continuous surveillance of critical patients",
                "Reduces alarm fatigue for nursing staff",
                "Early sepsis/deterioration detection",
                "Seamless integration with existing workflows",
                "Automated emergency team activation",
                "Direct physician notification for critical events"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm font-light leading-relaxed">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elderly Care Facilities */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <Users2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-gray-400 text-xs font-light tracking-wider">USE CASE 02</span>
                <h3 className="text-gray-900 text-lg md:text-xl font-light">Elderly Care Facilities</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "24/7 monitoring for nursing homes",
                "Fall detection integration (future)",
                "Medication adherence tracking",
                "Multi-tier family notification system",
                "Automatic ambulance dispatch for emergencies"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm font-light leading-relaxed">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Home-Based Care */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-gray-400 text-xs font-light tracking-wider">USE CASE 03</span>
                <h3 className="text-gray-900 text-lg md:text-xl font-light">Home-Based Care</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Post-surgery recovery monitoring",
                "Chronic disease management (diabetes, COPD, heart failure)",
                "Telemedicine enablement",
                "Reduces hospital readmissions",
                "Caregiver peace of mind with instant alerts",
                "Nearest hospital auto-notification during emergencies"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm font-light leading-relaxed">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rural Healthcare */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-gray-400 text-xs font-light tracking-wider">USE CASE 04</span>
                <h3 className="text-gray-900 text-lg md:text-xl font-light">Rural Healthcare</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Bridges gap in specialist access",
                "Low bandwidth requirements (edge processing)",
                "Solar-powered operation possible",
                "Multilingual interface (Sinhala, Tamil, English)",
                "Critical for areas with limited emergency services",
                "GPS location sharing for rapid ambulance dispatch"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm font-light leading-relaxed">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Economic Impact */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-8">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <h2 className="text-gray-900 text-2xl md:text-4xl font-light">5.2 Economic Impact</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Healthcare System Benefits */}
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900 text-lg md:text-xl font-light">Healthcare System Benefits</h3>
                </div>
                <div className="space-y-5">
                  {[
                    { title: "Prevents hospital readmissions", value: "$2,000-5,000", desc: "saved per patient" },
                    { title: "Reduces ICU length of stay", value: "1.5 days", desc: "average reduction" },
                    { title: "Optimizes resource allocation", value: "Focus", desc: "nursing on high-risk patients" },
                    { title: "Early intervention", value: "Prevents", desc: "expensive emergency treatments" }
                  ].map((item, idx) => (
                    <div key={idx} className="pb-5 border-b border-gray-200 last:border-0 last:pb-0">
                      <p className="text-gray-800 text-sm font-light mb-2">{item.title}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-blue-600 text-xl md:text-2xl font-light">{item.value}</span>
                        <span className="text-gray-600 text-xs font-light">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Patient Benefits */}
            <div>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <Users2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-gray-900 text-lg md:text-xl font-light">Patient Benefits</h3>
                </div>
                <div className="space-y-5">
                  {[
                    { title: "Reduced out-of-pocket costs", value: "90%", desc: "savings on monitoring" },
                    { title: "Better quality of life", value: "Stay", desc: "at home longer" },
                    { title: "Peace of mind", value: "24/7", desc: "safety net" },
                    { title: "Faster recovery", value: "Earlier", desc: "detection of complications" }
                  ].map((item, idx) => (
                    <div key={idx} className="pb-5 border-b border-gray-200 last:border-0 last:pb-0">
                      <p className="text-gray-800 text-sm font-light mb-2">{item.title}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-blue-600 text-xl md:text-2xl font-light">{item.value}</span>
                        <span className="text-gray-600 text-xs font-light">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Impact */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Globe className="w-6 h-6 text-blue-600" />
            <h2 className="text-gray-900 text-2xl md:text-4xl font-light">5.3 Social Impact</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Accessibility */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-100 shadow-sm">
              <h3 className="text-gray-900 text-lg md:text-xl font-light mb-6">Accessibility</h3>
              <div className="space-y-4">
                {[
                  { stat: "70%", label: "Brings advanced monitoring to rural population" },
                  { stat: "₹4,000", label: "Affordable for middle-income families (one-time cost)" },
                  { stat: "Enables", label: "Supports aging-in-place initiatives" },
                  { stat: "Reduces", label: "Urban hospital burden" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 text-2xl font-light min-w-fit">{item.stat}</div>
                    <div className="text-gray-700 text-sm font-light leading-relaxed">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equity */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-100 shadow-sm">
              <h3 className="text-gray-900 text-lg md:text-xl font-light mb-6">Equity</h3>
              <div className="space-y-4">
                {[
                  "No discrimination by location or economic status",
                  "Standardized care quality",
                  "Data-driven decision making",
                  "Democratizes access to AI healthcare"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}