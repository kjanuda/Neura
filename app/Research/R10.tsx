"use client";

import React from 'react';
import { CheckCircle, Award, Calendar, MapPin, Target } from 'lucide-react';

export default function Conclusion() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="https://videos.ctfassets.net/qx5k8y1u9drj/7ESqEXkjx3sr5cfXTfutcY/75c46f65619029ee1ca91219e64beb3d/helix-02-mobile.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
      
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-4xl">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            8. CONCLUSION
          </h2>
          <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
            Advancing Healthcare Through Innovation
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {/* Left Column - Key Stats */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Accuracy Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <span className="text-blue-600 text-xs font-light tracking-wider">ACCURACY</span>
                </div>
                <div className="text-4xl font-light text-gray-900 mb-1">95%</div>
                <p className="text-gray-600 text-sm font-light">CNN-LSTM hybrid architecture</p>
              </div>

              {/* False Alarm Reduction */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                  <span className="text-green-600 text-xs font-light tracking-wider">EFFICIENCY</span>
                </div>
                <div className="text-4xl font-light text-gray-900 mb-1">70%</div>
                <p className="text-gray-600 text-sm font-light">False alarm reduction</p>
              </div>

              {/* Cost Reduction */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                  <span className="text-purple-600 text-xs font-light tracking-wider">AFFORDABILITY</span>
                </div>
                <div className="text-4xl font-light text-gray-900 mb-1">90%</div>
                <p className="text-gray-600 text-sm font-light">Cost reduction vs traditional systems</p>
              </div>

              {/* Early Detection */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                  <span className="text-red-600 text-xs font-light tracking-wider">PREDICTION</span>
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">30-60 min</div>
                <p className="text-gray-600 text-sm font-light">Early deterioration warning</p>
              </div>
            </div>
          </div>

          {/* Center Column - Main Message */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 leading-tight">
                Democratizing Hospital-Grade Monitoring
              </h3>

              <div className="space-y-6 text-gray-700 font-light">
                <p className="text-base leading-relaxed">
                  This AI-powered patient monitoring system represents a significant advancement in affordable, accessible healthcare technology. By achieving 95% accuracy with a CNN-LSTM hybrid architecture, reducing false alarms by 70%, and costing 90% less than traditional systems, we demonstrate that hospital-grade continuous monitoring can be democratized for all populations.
                </p>

                <p className="text-base leading-relaxed">
                  The system's ability to predict health deterioration 30-60 minutes in advance enables proactive medical intervention, potentially saving lives and reducing healthcare costs. With validation based on cutting-edge 2024-2025 research and practical deployment considerations for Sri Lankan healthcare context, this project bridges the gap between academic research and real-world clinical impact.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-8">
                  <p className="text-gray-900 font-light mb-2">
                    <span className="font-light text-sm tracking-wider text-blue-600">KEY ACHIEVEMENT</span>
                  </p>
                  <p className="text-gray-800 font-light leading-relaxed">
                    First Sri Lankan implementation of state-of-the-art CNN-LSTM with attention mechanism for real-time patient monitoring, validated against international benchmarks and optimized for local healthcare challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Information Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg mb-8">
          <h3 className="text-2xl font-light text-gray-900 mb-8">Submission Details</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Event Info */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-light mb-1">SUBMITTED FOR</p>
                  <p className="text-lg text-gray-900 font-light">IEEE EMBS BioFusion 2026 Research Exhibition</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-light mb-1">EVENT DATE</p>
                  <p className="text-lg text-gray-900 font-light">22 January 2026</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-light mb-1">VENUE</p>
                  <p className="text-lg text-gray-900 font-light">University of Sri Jayewardenepura</p>
                </div>
              </div>
            </div>

            {/* Award Categories */}
            <div className="space-y-4">
              <p className="text-sm text-gray-500 font-light mb-4">AWARD CATEGORIES</p>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <p className="text-gray-900 font-light flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Best Innovation Award
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <p className="text-gray-900 font-light flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    Best Research Impact Award
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 mt-6">
                <p className="text-gray-900 font-light text-sm">
                  This research demonstrates technical excellence, clinical relevance, and social impact—positioning the project as a strong contender for both innovation and research impact awards at BioFusion 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Statement */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-600 font-light text-base leading-relaxed">
            By combining cutting-edge machine learning with practical healthcare solutions, we envision a future where advanced medical monitoring is accessible to everyone, regardless of geographic or economic constraints.
          </p>
        </div>
      </div>
    </div>
  );
}