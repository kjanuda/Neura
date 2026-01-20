"use client";

import React from 'react';
import { Zap, TrendingUp, Target, Sparkles, Shield, Globe2, GraduationCap } from 'lucide-react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            6. FUTURE ENHANCEMENTS
          </h2>
          <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl">
            Roadmap & Vision
          </h1>
        </div>

        {/* Main Layout with Image */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/over.jpeg" 
                  alt="Healthcare impact" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Timeline */}
          <div className="relative max-w-6xl">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400"></div>

            {/* Short-Term: 3-6 months */}
            <div className="relative mb-16 md:mb-20">
              <div className="flex items-start gap-6 md:gap-8">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Zap className="w-7 h-7 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="mb-4">
                    <span className="text-blue-600 text-xs md:text-sm font-light tracking-wider">PHASE 01</span>
                    <h3 className="text-gray-900 text-2xl md:text-3xl font-light mb-2">Short-Term</h3>
                    <p className="text-gray-600 text-sm md:text-base font-light">3-6 months</p>
                  </div>

                  <div className="grid gap-6">
                    {/* Technical Improvements */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-900 text-base md:text-lg font-light">Technical Improvements</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          { title: "Edge AI", desc: "Deploy TensorFlow Lite on ESP32 for offline operation" },
                          { title: "Multi-Patient Support", desc: "Scale to 100+ simultaneous patients" },
                          { title: "Enhanced Sensors", desc: "ECG, blood pressure, glucose monitoring" },
                          { title: "Mobile App", desc: "Native iOS/Android applications" }
                        ].map((item, idx) => (
                          <li key={idx} className="flex flex-col gap-1">
                            <span className="text-gray-800 text-sm font-light">{item.title}</span>
                            <span className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Clinical Features */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-900 text-base md:text-lg font-light">Clinical Features</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "Medication Reminders: Integration with prescription schedules",
                          "Activity Tracking: Accelerometer for movement patterns",
                          "Sleep Monitoring: Analysis of sleep quality and disturbances",
                          "Voice Alerts: Audible warnings for patients",
                          "Emergency Contact Management: Multiple caregiver profiles with priority levels",
                          "Hospital Integration API: Direct ER notification with patient data transmission",
                          "Geolocation Services: Real-time patient location tracking",
                          "Two-Way Communication: Audio/video link with caregivers during emergencies"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs md:text-sm font-light leading-relaxed">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium-Term: 6-12 months */}
            <div className="relative mb-16 md:mb-20">
              <div className="flex items-start gap-6 md:gap-8">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="mb-4">
                    <span className="text-blue-600 text-xs md:text-sm font-light tracking-wider">PHASE 02</span>
                    <h3 className="text-gray-900 text-2xl md:text-3xl font-light mb-2">Medium-Term</h3>
                    <p className="text-gray-600 text-sm md:text-base font-light">6-12 months</p>
                  </div>

                  <div className="grid gap-6">
                    {/* Advanced AI */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-900 text-base md:text-lg font-light">Advanced AI</h4>
                      </div>
                      <ul className="space-y-3">
                        {[
                          { title: "Transformer Models", desc: "Attention-only architecture for better performance" },
                          { title: "Federated Learning", desc: "Privacy-preserving model updates across patients" },
                          { title: "Explainable AI", desc: "SHAP/LIME for transparent predictions" },
                          { title: "Multi-Modal Learning", desc: "Integrate image data (facial analysis, wound healing)" }
                        ].map((item, idx) => (
                          <li key={idx} className="flex flex-col gap-1">
                            <span className="text-gray-800 text-sm font-light">{item.title}</span>
                            <span className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* System Integration */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Globe2 className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-900 text-base md:text-lg font-light">System Integration</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "Electronic Health Records (EHR): HL7 FHIR standard compliance",
                          "Hospital Information Systems: Seamless data exchange",
                          "Laboratory Results: Incorporate blood test trends",
                          "Imaging Integration: X-ray, CT scan correlation",
                          "Emergency Dispatch Systems: 1990 (Sri Lanka emergency number) integration",
                          "Ambulance Services: GPS-based routing and patient data pre-transmission",
                          "SMS Gateway: Multi-carrier notification redundancy",
                          "VOIP Integration: Automated voice calls to caregivers"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs md:text-sm font-light leading-relaxed">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Long-Term: 1-2 years */}
            <div className="relative">
              <div className="flex items-start gap-6 md:gap-8">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center shadow-lg">
                    <Target className="w-7 h-7 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="mb-4">
                    <span className="text-blue-600 text-xs md:text-sm font-light tracking-wider">PHASE 03</span>
                    <h3 className="text-gray-900 text-2xl md:text-3xl font-light mb-2">Long-Term</h3>
                    <p className="text-gray-600 text-sm md:text-base font-light">1-2 years</p>
                  </div>

                  <div className="grid gap-6">
                    {/* Clinical Validation */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-900 text-sm md:text-base font-light">Clinical Validation</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "Randomized Controlled Trial (RCT): 500+ patient study",
                          "Multi-Center Validation: 5+ hospital sites",
                          "FDA/CE Mark Certification: Medical device approval",
                          "Clinical Guidelines: Integration into care protocols"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs font-light leading-relaxed">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Commercialization */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Globe2 className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-900 text-sm md:text-base font-light">Commercialization</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "Product Development: Consumer-grade packaging",
                          "Manufacturing Partnership: Local production in Sri Lanka",
                          "Insurance Integration: Coverage by health insurers",
                          "Global Expansion: Adaptation for regional markets"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs font-light leading-relaxed">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Research Contributions */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        <h4 className="text-gray-900 text-sm md:text-base font-light">Research Contributions</h4>
                      </div>
                      <ul className="space-y-2">
                        {[
                          "Academic Publications: IEEE, Nature, Medical journals",
                          "Open-Source Release: Dataset and model sharing",
                          "Community Building: Developer ecosystem",
                          "Training Programs: Healthcare worker education"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs font-light leading-relaxed">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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