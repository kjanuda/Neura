"use client";

import React from 'react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-slate-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            2. PROPOSED SOLUTION
          </h2>
          <h1 className="text-slate-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl mb-6">
            System Overview
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            An integrated IoT-AI platform that continuously monitors patient vital signs, processes data through advanced machine learning models, and provides real-time health assessments with predictive alerts.
          </p>
        </div>

        {/* Core Components */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-slate-700 text-base md:text-lg font-light mb-6 tracking-wide">
            2.1 Core Components
          </h3>
          <div className="grid md:grid-cols-5 gap-4 md:gap-6">
            {[
              { num: "1", title: "Sensor Layer", desc: "ESP32-based multi-sensor array" },
              { num: "2", title: "Data Processing", desc: "Real-time aggregation and feature engineering" },
              { num: "3", title: "AI Engine", desc: "CNN-LSTM hybrid with attention mechanism" },
              { num: "4", title: "User Interface", desc: "Web-based dashboard with mobile compatibility" },
              { num: "5", title: "Alert System", desc: "Multi-level notification system for healthcare providers" }
            ].map((item) => (
              <div key={item.num} className="bg-white/80 backdrop-blur-sm rounded-lg p-5 border border-slate-200/50 hover:border-blue-300 transition-colors">
                <div className="text-blue-500 text-2xl font-light mb-2">{item.num}</div>
                <h4 className="text-slate-900 text-sm font-light mb-2">{item.title}</h4>
                <p className="text-slate-500 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monitored Health Parameters */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-slate-700 text-base md:text-lg font-light mb-6 tracking-wide">
            2.2 Monitored Health Parameters
          </h3>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-slate-700 text-xs md:text-sm font-light tracking-wide">Parameter</th>
                    <th className="text-left px-6 py-4 text-slate-700 text-xs md:text-sm font-light tracking-wide">Sensor</th>
                    <th className="text-left px-6 py-4 text-slate-700 text-xs md:text-sm font-light tracking-wide">Normal Range</th>
                    <th className="text-left px-6 py-4 text-slate-700 text-xs md:text-sm font-light tracking-wide">Clinical Significance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "Heart Rate", sensor: "MAX30100", range: "60-100 bpm", sig: "Cardiac function, stress, activity" },
                    { param: "Blood Oxygen (SpO2)", sensor: "MAX30100", range: "95-100%", sig: "Respiratory function, oxygen delivery" },
                    { param: "Body Temperature", sensor: "DHT22", range: "36.5-37.5°C", sig: "Infection, inflammation, metabolic state" },
                    { param: "Environmental Humidity", sensor: "DHT22", range: "40-60%", sig: "Comfort, respiratory health" },
                    { param: "Air Quality (PPM)", sensor: "MQ135", range: "<100 PPM", sig: "Respiratory irritants, indoor air quality" }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 text-slate-800 text-xs md:text-sm font-light">{row.param}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs md:text-sm font-light">{row.sensor}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs md:text-sm font-light">{row.range}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs md:text-sm font-light">{row.sig}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Automated Emergency Response System */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-slate-700 text-base md:text-lg font-light mb-6 tracking-wide">
            2.3 Automated Emergency Response System
          </h3>
          
          <div className="mb-8">
            <h4 className="text-slate-900 text-sm md:text-base font-light mb-4">
              Multi-Tier Alert Escalation Protocol
            </h4>
            <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed mb-6">
              The system implements an intelligent emergency notification cascade that ensures rapid response during critical health events:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 hover:shadow-lg hover:border-blue-300 transition-all">
                <h4 className="text-slate-900 text-sm md:text-base font-light mb-4">Tier 1 - Caregiver Notification (0-2 minutes)</h4>
                <ul className="space-y-2">
                  {[
                    "Instant SMS, phone call, and push notifications to enrolled caregivers (family members, home nurses)",
                    "Multiple contact methods ensure message delivery",
                    "Visual and audio alarms on patient's device",
                    "GPS location sharing for immediate assistance"
                  ].map((point, idx) => (
                    <li key={idx} className="text-slate-600 text-xs md:text-sm font-light leading-relaxed flex">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 hover:shadow-lg hover:border-blue-300 transition-all">
                <h4 className="text-slate-900 text-sm md:text-base font-light mb-4">Tier 2 - Escalation Protocol (2-5 minutes)</h4>
                <ul className="space-y-2">
                  {[
                    "If caregivers do not acknowledge alert within 2 minutes, automatic escalation",
                    "Secondary caregiver contacts notified",
                    "Emergency services pre-alert (standby notification)"
                  ].map((point, idx) => (
                    <li key={idx} className="text-slate-600 text-xs md:text-sm font-light leading-relaxed flex">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 hover:shadow-lg hover:border-blue-300 transition-all">
                <h4 className="text-slate-900 text-sm md:text-base font-light mb-4">Tier 3 - Hospital Emergency Dispatch (5+ minutes)</h4>
                <ul className="space-y-2">
                  {[
                    "Automatic notification to nearest hospital emergency department",
                    "Patient medical history, current vitals, and GPS location transmitted",
                    "Direct integration with hospital triage systems",
                    "Ambulance dispatch if critical thresholds exceeded"
                  ].map((point, idx) => (
                    <li key={idx} className="text-slate-600 text-xs md:text-sm font-light leading-relaxed flex">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h4 className="text-slate-900 text-sm md:text-base font-light mb-4">
              Critical Thresholds for Automatic Hospital Notification
            </h4>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 mb-8">
              <ul className="space-y-2">
                {[
                  "SpO2 < 88% (severe hypoxia)",
                  "Heart Rate > 140 or < 40 bpm (cardiac emergency)",
                  "Temperature > 39.5°C (severe fever) or < 35°C (hypothermia)",
                  "Sustained deteriorating trend predicted by AI",
                  "Loss of patient vital signs (sensor disconnect detection)"
                ].map((threshold, idx) => (
                  <li key={idx} className="text-slate-600 text-xs md:text-sm font-light leading-relaxed flex">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{threshold}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h4 className="text-slate-900 text-sm md:text-base font-light mb-4">
              Smart Features
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Location-Based Hospital Selection",
                  desc: "Automatically identifies 3 nearest hospitals with emergency facilities"
                },
                {
                  title: "Response Confirmation",
                  desc: "Tracks acknowledgment times and responder locations"
                },
                {
                  title: "False Alarm Prevention",
                  desc: "AI validates emergencies before hospital notification"
                },
                {
                  title: "Communication Integration",
                  desc: "Two-way communication channel with responders"
                },
                {
                  title: "Medical Record Transmission",
                  desc: "Automated sharing of patient history, medications, allergies"
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 hover:shadow-lg hover:border-blue-300 transition-all">
                  <h4 className="text-slate-900 text-sm md:text-base font-light mb-2">{feature.title}</h4>
                  <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Innovations */}
        <div>
          <h3 className="text-slate-700 text-base md:text-lg font-light mb-6 tracking-wide">
            2.4 Key Innovations
          </h3>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "1. Hybrid CNN-LSTM Architecture",
                points: [
                  "CNN layers extract spatial patterns from multi-sensor correlations",
                  "LSTM captures temporal dependencies and trends",
                  "Attention mechanism focuses on critical health events",
                  "Achieves 95% accuracy vs. 75% for traditional LSTM"
                ]
              },
              {
                title: "2. Personalized Patient Baselines",
                points: [
                  "Adaptive learning of individual \"normal\" ranges",
                  "Accounts for age, pre-existing conditions, medications",
                  "Reduces false alarms from 60% to 30%"
                ]
              },
              {
                title: "3. Early Warning System",
                points: [
                  "Predicts health deterioration 30-60 minutes ahead",
                  "Multi-level alerts: Normal, Warning, Critical",
                  "Automated caregiver notification cascade",
                  "Direct hospital emergency integration",
                  "GPS-based nearest hospital identification"
                ]
              },
              {
                title: "4. Cost Optimization",
                points: [
                  "Hardware cost: $50 (₹4,000) vs. traditional $5,000-$10,000",
                  "Cloud-based processing eliminates expensive on-site servers",
                  "Open-source software stack reduces licensing costs"
                ]
              }
            ].map((innovation) => (
              <div key={innovation.title} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 hover:shadow-lg hover:border-blue-300 transition-all">
                <h4 className="text-slate-900 text-sm md:text-base font-light mb-4">{innovation.title}</h4>
                <ul className="space-y-2">
                  {innovation.points.map((point, idx) => (
                    <li key={idx} className="text-slate-600 text-xs md:text-sm font-light leading-relaxed flex">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}