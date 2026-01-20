"use client";
import React, { useState, useEffect } from 'react';

export default function ArchitectureDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getOpacity = (step: number) => activeStep === step ? 1 : 0.4;
  const getScale = (step: number) => activeStep === step ? 1.05 : 1;
  const getColor = (step: number) => {
    const colors = ['#f97316', '#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#6366f1'];
    return colors[step];
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <svg viewBox="0 0 1400 1850" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#f97316', stopOpacity: 0.1}} />
              <stop offset="100%" style={{stopColor: '#f97316', stopOpacity: 0}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 0.1}} />
              <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.1}} />
              <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0}} />
            </linearGradient>
            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 0.1}} />
              <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 0}} />
            </linearGradient>
            <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0.1}} />
              <stop offset="100%" style={{stopColor: '#10b981', stopOpacity: 0}} />
            </linearGradient>
            <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 0.1}} />
              <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 0}} />
            </linearGradient>
            <filter id="glow1">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect width="1400" height="1850" fill="#0f172a" opacity="0.3"/>

          {/* Title */}
          <text x="700" y="50" fontSize="42" fontWeight="bold" textAnchor="middle" fill="#ffffff">
            Smart IoT Healthcare Ecosystem
          </text>
          <text x="700" y="90" fontSize="16" textAnchor="middle" fill="#94a3b8">
            End-to-End Patient Monitoring & AI Analysis
          </text>

          {/* Decorative line */}
          <line x1="200" y1="110" x2="1200" y2="110" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>

          {/* ========== STEP 1: SENSORS ========== */}
          <g opacity={getOpacity(0)} style={{transform: `scale(${getScale(0)})`, transformOrigin: '700px 250px', transition: 'all 0.5s ease'}}>
            {/* Title Card */}
            <rect x="100" y="140" width="1200" height="70" rx="12" fill="url(#grad1)" stroke="#f97316" strokeWidth="2"/>
            <circle cx="150" cy="175" r="20" fill="#f97316"/>
            <text x="150" y="183" fontSize="24" textAnchor="middle" fill="#ffffff" fontWeight="bold">1</text>
            <text x="250" y="175" fontSize="20" fontWeight="bold" fill="#fef3c7">SENSOR DATA COLLECTION</text>
            <text x="250" y="200" fontSize="12" fill="#cbd5e1">Real-time monitoring from patient devices</text>

            {/* Sensors */}
            {[
              {x: 120, emoji: '🌡️', name: 'DHT11', spec: 'Temperature\n0-50°C'},
              {x: 380, emoji: '💨', name: 'MQ-135', spec: 'Air Quality\nAQI 0-100'},
              {x: 640, emoji: '❤️', name: 'Pulse Sensor', spec: 'Heart Rate\n60-100 BPM'},
              {x: 900, emoji: '📊', name: 'Pressure', spec: 'Blood Press\n80-180 mmHg'},
            ].map((sensor, i) => (
              <g key={i} className="hover:opacity-100" style={{opacity: activeStep === 0 ? 1 : 0.7}}>
                <circle cx={sensor.x + 100} cy="330" r="55" fill="#1e293b" stroke="#f97316" strokeWidth="2"/>
                <text x={sensor.x + 100} y="335" fontSize="32" textAnchor="middle">{sensor.emoji}</text>
                <rect x={sensor.x} y="410" width="200" height="80" rx="10" fill="#1e293b" stroke="#f97316" strokeWidth="1" opacity="0.8"/>
                <text x={sensor.x + 100} y="440" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#fef3c7">{sensor.name}</text>
                <text x={sensor.x + 100} y="465" fontSize="10" textAnchor="middle" fill="#cbd5e1">{sensor.spec}</text>
                
                {/* Pulse effect */}
                {activeStep === 0 && (
                  <>
                    <circle cx={sensor.x + 100} cy="330" r="55" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.3" style={{animation: 'pulse 2s infinite'}}/>
                    <circle cx={sensor.x + 100} cy="330" r="55" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.2" style={{animation: 'pulse 2s infinite 0.3s'}}/>
                  </>
                )}
              </g>
            ))}

            {/* Flow arrows */}
            <path d="M 220 510 Q 350 550 380 580" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)"/>
            <path d="M 480 510 Q 550 550 620 580" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)"/>
            <path d="M 740 510 Q 820 550 900 580" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)"/>
            <path d="M 1000 510 Q 1080 550 1100 580" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)"/>

            {/* Converging point */}
            <circle cx="700" cy="620" r="8" fill="#f97316"/>
            <line x1="700" y1="628" x2="700" y2="680" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrowOrange)"/>
          </g>

          {/* ========== STEP 2: ESP32 ========== */}
          <g opacity={getOpacity(1)} style={{transform: `scale(${getScale(1)})`, transformOrigin: '700px 750px', transition: 'all 0.5s ease'}}>
            <rect x="100" y="700" width="1200" height="70" rx="12" fill="url(#grad2)" stroke="#8b5cf6" strokeWidth="2"/>
            <circle cx="150" cy="735" r="20" fill="#8b5cf6"/>
            <text x="150" y="743" fontSize="24" textAnchor="middle" fill="#ffffff" fontWeight="bold">2</text>
            <text x="250" y="735" fontSize="20" fontWeight="bold" fill="#ede9fe">ESP32 MICROCONTROLLER</text>
            <text x="250" y="760" fontSize="12" fill="#cbd5e1">Data processing, validation & encryption</text>

            {/* Processing stages */}
            {[
              {x: 130, title: 'Sampling', icon: '⚡'},
              {x: 350, title: 'Validation', icon: '✓'},
              {x: 570, title: 'Processing', icon: '⚙️'},
              {x: 790, title: 'Encryption', icon: '🔒'},
              {x: 1010, title: 'JSON Format', icon: '📝'},
            ].map((stage, i) => (
              <g key={i}>
                <rect x={stage.x} y="800" width="160" height="110" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" opacity={activeStep === 1 ? 1 : 0.6}/>
                <text x={stage.x + 80} y="825" fontSize="24" textAnchor="middle">{stage.icon}</text>
                <text x={stage.x + 80} y="855" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#ede9fe">{stage.title}</text>
                <line x1={stage.x + 160} y1="855" x2={stage.x + 180} y2="855" stroke="#8b5cf6" strokeWidth="2"/>
              </g>
            ))}

            {/* Flow down */}
            <line x1="700" y1="910" x2="700" y2="960" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowPurple)"/>
          </g>

          {/* ========== STEP 3: TRANSMISSION ========== */}
          <g opacity={getOpacity(2)} style={{transform: `scale(${getScale(2)})`, transformOrigin: '700px 1010px', transition: 'all 0.5s ease'}}>
            <rect x="100" y="970" width="1200" height="70" rx="12" fill="url(#grad3)" stroke="#3b82f6" strokeWidth="2"/>
            <circle cx="150" cy="1005" r="20" fill="#3b82f6"/>
            <text x="150" y="1013" fontSize="24" textAnchor="middle" fill="#ffffff" fontWeight="bold">3</text>
            <text x="250" y="1005" fontSize="20" fontWeight="bold" fill="#dbeafe">SECURE WIFI TRANSMISSION</text>
            <text x="250" y="1030" fontSize="12" fill="#cbd5e1">HTTP POST with encryption • 2-5 second latency</text>

            {/* Transmission visualization */}
            <g className="animate-pulse" style={{animation: 'pulse 1.5s infinite'}}>
              <circle cx="250" cy="1100" r="25" fill="#3b82f6" opacity="0.3"/>
              <circle cx="250" cy="1100" r="20" fill="none" stroke="#3b82f6" strokeWidth="2"/>
              <text x="250" y="1110" fontSize="20" textAnchor="middle" fill="#dbeafe">📡</text>
            </g>

            <text x="700" y="1100" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#dbeafe">Cloud Network Connection</text>
            <text x="700" y="1125" fontSize="11" textAnchor="middle" fill="#cbd5e1">Encrypted TLS • Timestamped • Error Handling</text>

            <g className="animate-pulse" style={{animation: 'pulse 1.5s infinite 0.3s'}}>
              <circle cx="1150" cy="1100" r="25" fill="#3b82f6" opacity="0.3"/>
              <circle cx="1150" cy="1100" r="20" fill="none" stroke="#3b82f6" strokeWidth="2"/>
              <text x="1150" y="1110" fontSize="20" textAnchor="middle" fill="#dbeafe">☁️</text>
            </g>

            <line x1="700" y1="1150" x2="700" y2="1200" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)"/>
          </g>

          {/* ========== STEP 4: BACKEND ========== */}
          <g opacity={getOpacity(3)} style={{transform: `scale(${getScale(3)})`, transformOrigin: '700px 1280px', transition: 'all 0.5s ease'}}>
            <rect x="100" y="1210" width="1200" height="70" rx="12" fill="url(#grad4)" stroke="#ec4899" strokeWidth="2"/>
            <circle cx="150" cy="1245" r="20" fill="#ec4899"/>
            <text x="150" y="1253" fontSize="24" textAnchor="middle" fill="#ffffff" fontWeight="bold">4</text>
            <text x="250" y="1245" fontSize="20" fontWeight="bold" fill="#fbcfe8">API SERVER & DATABASE</text>
            <text x="250" y="1270" fontSize="12" fill="#cbd5e1">Node.js/Express • MongoDB • Data Storage & Retrieval</text>

            {/* API & DB boxes */}
            <rect x="150" y="1310" width="480" height="100" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="2" opacity={activeStep === 3 ? 1 : 0.6}/>
            <text x="390" y="1330" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#fbcfe8">API ENDPOINTS</text>
            <text x="390" y="1350" fontSize="10" textAnchor="middle" fill="#cbd5e1">POST /sensor-data</text>
            <text x="390" y="1365" fontSize="10" textAnchor="middle" fill="#cbd5e1">GET /patient/:id</text>
            <text x="390" y="1380" fontSize="10" textAnchor="middle" fill="#cbd5e1">POST /predict</text>

            <rect x="770" y="1310" width="480" height="100" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="2" opacity={activeStep === 3 ? 1 : 0.6}/>
            <text x="1010" y="1330" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#fbcfe8">MONGODB COLLECTIONS</text>
            <text x="1010" y="1350" fontSize="10" textAnchor="middle" fill="#cbd5e1">patients • sensor_data</text>
            <text x="1010" y="1365" fontSize="10" textAnchor="middle" fill="#cbd5e1">alerts_logs • predictions</text>
            <text x="1010" y="1380" fontSize="10" textAnchor="middle" fill="#cbd5e1">1-year retention</text>

            {/* Connection line */}
            <path d="M 630 1360 L 770 1360" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowPink)"/>
            
            <line x1="700" y1="1410" x2="700" y2="1460" stroke="#ec4899" strokeWidth="3" markerEnd="url(#arrowPink)"/>
          </g>

          {/* ========== STEP 5: AI/ML ========== */}
          <g opacity={getOpacity(4)} style={{transform: `scale(${getScale(4)})`, transformOrigin: '700px 1530px', transition: 'all 0.5s ease'}}>
            <rect x="100" y="1480" width="1200" height="70" rx="12" fill="url(#grad5)" stroke="#10b981" strokeWidth="2"/>
            <circle cx="150" cy="1515" r="20" fill="#10b981"/>
            <text x="150" y="1523" fontSize="24" textAnchor="middle" fill="#ffffff" fontWeight="bold">5</text>
            <text x="250" y="1515" fontSize="20" fontWeight="bold" fill="#d1fae5">MACHINE LEARNING ANALYSIS</text>
            <text x="250" y="1540" fontSize="12" fill="#cbd5e1">Feature Engineering • Anomaly Detection • Risk Prediction</text>

            {/* ML stages */}
            {[
              {x: 130, title: 'Features', icon: '🔢'},
              {x: 350, title: 'Anomaly', icon: '🎯'},
              {x: 570, title: 'LSTM', icon: '🧠'},
              {x: 790, title: 'Risk Score', icon: '📊'},
              {x: 1010, title: 'Decision', icon: '✓'},
            ].map((stage, i) => (
              <g key={i}>
                <rect x={stage.x} y="1570" width="160" height="110" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" opacity={activeStep === 4 ? 1 : 0.6}/>
                <text x={stage.x + 80} y="1595" fontSize="24" textAnchor="middle">{stage.icon}</text>
                <text x={stage.x + 80} y="1625" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#d1fae5">{stage.title}</text>
                <line x1={stage.x + 160} y1="1625" x2={stage.x + 180} y2="1625" stroke="#10b981" strokeWidth="2"/>
              </g>
            ))}

            <line x1="700" y1="1680" x2="700" y2="1730" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)"/>
          </g>

          {/* ========== STEP 6: DASHBOARD ========== */}
          <g opacity={getOpacity(5)} style={{transform: `scale(${getScale(5)})`, transformOrigin: '700px 1800px', transition: 'all 0.5s ease'}}>
            <rect x="100" y="1750" width="1200" height="70" rx="12" fill="url(#grad6)" stroke="#6366f1" strokeWidth="2"/>
            <circle cx="150" cy="1785" r="20" fill="#6366f1"/>
            <text x="150" y="1793" fontSize="24" textAnchor="middle" fill="#ffffff" fontWeight="bold">6</text>
            <text x="250" y="1785" fontSize="20" fontWeight="bold" fill="#e0e7ff">NEXT.JS DASHBOARD DISPLAY</text>
            <text x="250" y="1810" fontSize="12" fill="#cbd5e1">Real-time charts • Patient profiles • Risk alerts • Reports</text>

            {/* Dashboard components */}
            {[
              {x: 140, emoji: '📊', label: 'Charts'},
              {x: 380, emoji: '👤', label: 'Profile'},
              {x: 620, emoji: '⚠️', label: 'Alerts'},
              {x: 860, emoji: '📈', label: 'History'},
              {x: 1100, emoji: '🎯', label: 'Reports'},
            ].map((comp, i) => (
              <g key={i}>
                <circle cx={comp.x + 50} cy="1620" r="45" fill="#1e293b" stroke="#6366f1" strokeWidth="2"/>
                <text x={comp.x + 50} y="1625" fontSize="28" textAnchor="middle">{comp.emoji}</text>
              </g>
            ))}
          </g>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#f97316"/>
            </marker>
            <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#8b5cf6"/>
            </marker>
            <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowPink" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#ec4899"/>
            </marker>
            <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#10b981"/>
            </marker>
          </defs>

          {/* Status indicator */}
          <text x="700" y="1850" fontSize="12" textAnchor="middle" fill="#64748b">
            {`Displaying Step ${activeStep + 1} of 6 • Auto-cycles every 3 seconds`}
          </text>

          {/* CSS Animations */}
          <style>{`
            @keyframes pulse {
              0%, 100% { r: 55; opacity: 0.3; }
              50% { r: 70; opacity: 0; }
            }
            .animate-pulse { animation: pulse 2s infinite; }
          `}</style>
        </svg>
      </div>
    </div>
  );
}