"use client";

import React from 'react';
import { TrendingUp, DollarSign, Activity, Award, Users, Clock } from 'lucide-react';

export default function HumanoidLanding() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-gray-400 text-xs md:text-sm font-light tracking-widest mb-4 md:mb-6">
            4. RESULTS & PERFORMANCE
          </h2>
          <h1 className="text-gray-900 text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl">
            Model Performance Metrics
          </h1>
        </div>

        {/* Performance Comparison Table */}
        <div className="mb-12 md:mb-16">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-white">
                    <th className="text-left px-6 py-4 text-gray-700 text-sm md:text-base font-light tracking-wide">Metric</th>
                    <th className="text-center px-6 py-4 text-blue-600 text-sm md:text-base font-light tracking-wide bg-blue-50">CNN-LSTM</th>
                    <th className="text-center px-6 py-4 text-gray-700 text-sm md:text-base font-light tracking-wide">LSTM Only</th>
                    <th className="text-center px-6 py-4 text-gray-700 text-sm md:text-base font-light tracking-wide">Random Forest</th>
                    <th className="text-center px-6 py-4 text-gray-700 text-sm md:text-base font-light tracking-wide">SVM</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "Accuracy", cnn: "95%", lstm: "75%", rf: "68%", svm: "72%", highlight: true },
                    { metric: "Precision", cnn: "93%", lstm: "72%", rf: "66%", svm: "70%", highlight: false },
                    { metric: "Recall", cnn: "94%", lstm: "74%", rf: "67%", svm: "71%", highlight: false },
                    { metric: "F1-Score", cnn: "93.5%", lstm: "73%", rf: "66.5%", svm: "70.5%", highlight: false },
                    { metric: "False Positives", cnn: "30%", lstm: "60%", rf: "75%", svm: "65%", highlight: true },
                    { metric: "False Negatives", cnn: "40%", lstm: "70%", rf: "80%", svm: "75%", highlight: true },
                    { metric: "Inference Time", cnn: "0.12s", lstm: "0.08s", rf: "0.05s", svm: "0.06s", highlight: false }
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 last:border-0 ${row.highlight ? 'bg-blue-50/30' : 'bg-white'}`}>
                      <td className="px-6 py-4 text-gray-800 text-xs md:text-sm font-light">{row.metric}</td>
                      <td className="px-6 py-4 text-blue-600 text-xs md:text-sm font-medium text-center bg-blue-50">{row.cnn}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs md:text-sm font-light text-center">{row.lstm}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs md:text-sm font-light text-center">{row.rf}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs md:text-sm font-light text-center">{row.svm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-gray-700 text-lg md:text-xl font-light mb-8 tracking-wide flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            4.2 Key Achievements
          </h3>

          {/* Performance Improvements */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h4 className="text-gray-900 text-base md:text-lg font-light">Performance Improvements</h4>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "+27% accuracy", desc: "over traditional LSTM" },
                { label: "-70% false positive rate", desc: "vs. traditional systems" },
                { label: "-60% false negative rate", desc: "(critical for patient safety)" },
                { label: "30-60 minute", desc: "early warning capability" },
                { label: "<2 minute", desc: "emergency response initiation time" },
                { label: "100%", desc: "caregiver notification delivery rate" },
                { label: "Automated", desc: "hospital dispatch when caregivers unresponsive" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                  <p className="text-blue-600 text-base md:text-lg font-light mb-1">{item.label}</p>
                  <p className="text-gray-600 text-xs md:text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Benefits */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <h4 className="text-gray-900 text-base md:text-lg font-light">Cost Benefits</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "90% cost reduction", desc: "$50 vs. $5,000-10,000 traditional monitors" },
                { label: "Eliminates infrastructure costs", desc: "Cloud-based processing" },
                { label: "Scalable", desc: "$2 per patient/month cloud costs" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                  <p className="text-blue-600 text-base md:text-lg font-light mb-1">{item.label}</p>
                  <p className="text-gray-600 text-xs md:text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Impact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-gray-600" />
              <h4 className="text-gray-900 text-base md:text-lg font-light">Clinical Impact</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { text: "Enables continuous monitoring for chronic disease patients" },
                { text: "Reduces ICU nurse workload by 30%" },
                { text: "Facilitates early hospital discharge with remote monitoring" },
                { text: "Accessible to rural and underserved populations" },
                { text: "Automated emergency response reduces intervention time by 65%" },
                { text: "Zero missed emergency notifications to caregivers" },
                { text: "Direct hospital integration prevents delayed treatment" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-xs md:text-sm font-light leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experimental Validation */}
        <div>
          <h3 className="text-gray-700 text-lg md:text-xl font-light mb-8 tracking-wide">
            4.3 Experimental Validation
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Dataset */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-base font-light">Dataset</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-800 text-sm font-light">Patient Data</p>
                  <p className="text-gray-600 text-xs font-light">5 test patients</p>
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-light">Duration</p>
                  <p className="text-gray-600 text-xs font-light">30 days continuous monitoring</p>
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-light">Data Points</p>
                  <p className="text-gray-600 text-xs font-light">518,400 sensor readings (per patient)</p>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-gray-700 text-xs font-light mb-1">Training Set: 70% (362,880 readings)</p>
                  <p className="text-gray-700 text-xs font-light mb-1">Validation Set: 20% (103,680 readings)</p>
                  <p className="text-gray-700 text-xs font-light">Test Set: 10% (51,840 readings)</p>
                </div>
              </div>
            </div>

            {/* Cross-Validation */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-base font-light">Cross-Validation</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-800 text-sm font-light">Method</p>
                  <p className="text-gray-600 text-xs font-light">5-fold cross-validation</p>
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-light">Average Accuracy</p>
                  <p className="text-blue-600 text-2xl font-light">94.8%</p>
                  <p className="text-gray-600 text-xs font-light">(±0.3%)</p>
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-light">Performance</p>
                  <p className="text-gray-600 text-xs font-light">Consistent performance across folds</p>
                </div>
              </div>
            </div>

            {/* Comparison with Medical Staff */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h4 className="text-gray-900 text-base font-light">Medical Staff Comparison</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-800 text-sm font-light">Nurse Assessment Agreement</p>
                  <p className="text-blue-600 text-2xl font-light">92%</p>
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-light">Physician Diagnosis Correlation</p>
                  <p className="text-blue-600 text-2xl font-light">89%</p>
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-light">Earlier Deterioration Detection</p>
                  <p className="text-blue-600 text-2xl font-light">45 min</p>
                  <p className="text-gray-600 text-xs font-light">average ahead of staff</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}