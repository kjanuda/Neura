"use client";

import React from 'react';
import { Lightbulb, Microscope, Users, BookOpen, CheckCircle, Globe2, Award, Lock } from 'lucide-react';

export default function ResearchSignificance() {
  return (
    <div className="relative w-full min-h-screen bg-white" style={{
      backgroundImage: 'url(/sys.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
      
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-20 md:mb-24">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            7. RESEARCH SIGNIFICANCE
          </h2>
          <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl">
            Novel Contributions & Impact
          </h1>
        </div>



        {/* Three Column Grid for 7.1 */}
        <div className="mb-20 md:mb-24">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-2 md:mb-3">
            PHASE 01
          </h2>
          <h3 className="text-gray-900 text-2xl md:text-3xl font-light mb-12">Novel Contributions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Technical Innovation Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-lg font-light">Technical Innovation</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ul className="space-y-4">
                  {[
                    { title: "CNN-LSTM Hybrid", desc: "First implementation for patient monitoring in Sri Lanka" },
                    { title: "Attention Mechanism", desc: "Adaptation for multi-sensor health data" },
                    { title: "Personalized Baseline", desc: "Methodology for individual patient analysis" },
                    { title: "Cost-Optimized", desc: "Architecture for resource-constrained settings" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex flex-col gap-1 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
                      <span className="text-gray-800 text-sm font-light">{item.title}</span>
                      <span className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Clinical Innovation Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Microscope className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-lg font-light">Clinical Innovation</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ul className="space-y-4">
                  {[
                    { title: "Early Warning", desc: "30-60 minute advance detection (vs 15 min)" },
                    { title: "Reduced Alarms", desc: "70% false alarm reduction vs industry" },
                    { title: "Home-Based ICU", desc: "ICU-grade monitoring in patient homes" },
                    { title: "Cultural Adapt", desc: "Designed for South Asian healthcare" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex flex-col gap-1 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
                      <span className="text-gray-800 text-sm font-light">{item.title}</span>
                      <span className="text-gray-600 text-xs font-light leading-relaxed">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Innovation Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-lg font-light">Social Innovation</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {[
                    "Democratizes access to advanced health monitoring",
                    "Addresses rural-urban healthcare divide",
                    "Supports aging-in-place policies",
                    "Reduces burden on healthcare systems"
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

        {/* Two Column Layout for 7.2 & 7.3 */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 7.2 Academic Rigor */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-2 md:mb-3">
              PHASE 02
            </h2>
            <h3 className="text-gray-900 text-2xl md:text-3xl font-light mb-8">Academic Rigor</h3>

            {/* Research Validation */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-base md:text-lg font-light">Research Validation</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ul className="space-y-2">
                  {[
                    "Based on 2024-2025 peer-reviewed research (Nature, PMC, ScienceDirect)",
                    "Systematic literature review of 50+ papers",
                    "Comparison with 4 established baseline models",
                    "Statistical significance testing (p < 0.05)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs md:text-sm font-light leading-relaxed">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reproducibility */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-base md:text-lg font-light">Reproducibility</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ul className="space-y-2">
                  {[
                    "Open-source code repository (GitHub)",
                    "Detailed documentation and tutorials",
                    "Sample dataset for benchmarking",
                    "Hardware specifications and schematics"
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

          {/* 7.3 Global Alignment */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-2 md:mb-3">
              PHASE 03
            </h2>
            <h3 className="text-gray-900 text-2xl md:text-3xl font-light mb-8">Alignment with Global Goals</h3>

            {/* UN SDGs */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe2 className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-base md:text-lg font-light">UN Sustainable Development Goals</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ul className="space-y-2">
                  {[
                    "SDG 3: Good Health and Well-being",
                    "SDG 9: Industry, Innovation, and Infrastructure",
                    "SDG 10: Reduced Inequalities",
                    "SDG 11: Sustainable Cities and Communities"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs md:text-sm font-light leading-relaxed">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* WHO Guidelines */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Microscope className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-base md:text-lg font-light">WHO Digital Health Guidelines</h4>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <ul className="space-y-2">
                  {[
                    "Evidence-based design principles",
                    "User-centered development approach",
                    "Privacy and security by design",
                    "Interoperability standards compliance"
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
    </div>
  );
}