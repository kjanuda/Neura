'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Zap, Activity, Wind } from 'lucide-react';
import Link from 'next/link';

interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

const ProductPortfolio = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const product = {
    name: 'HealthGuard AI',
    category: 'IoT Health Monitor',
    description: 'ESP32-based home patient monitoring system with DHT11, MAX30102, and MQ-135 sensors for real-time health tracking and AI-powered anomaly detection',
    topImage: '/neu.png',
    bottomImage: '/neu1.webp',
    specs: [
      { label: 'Temperature', value: 'DHT11', icon: Zap },
      { label: 'Heart Rate', value: 'MAX30102', icon: Activity },
      { label: 'Air Quality', value: 'MQ-135', icon: Wind }
    ]
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gray-50" />
        <div className="w-1/2 bg-white" />
      </div>

      {/* Animated Background Grid */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gray-400 opacity-10"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12">
        <div className="flex items-center gap-3 mb-2">
          <div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Healthcare IoT</div>
            <div className="text-2xl font-bold text-black">
              IoT Home Patient Monitoring
            </div>
          </div>
        </div>
        <p className="text-gray-600">Real-time health tracking with AI-powered anomaly detection</p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Section */}
          <div className="relative">
            <div 
              className="relative w-full aspect-square max-w-md mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transform: isHovered ? 'scale(1.05) rotateZ(2deg)' : 'scale(1) rotateZ(0deg)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Bottom Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <img 
                  src={product.bottomImage}
                  alt="Circuit pattern"
                  className="w-full h-full object-cover"
                />
                {isHovered && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30"
                    style={{ animation: 'shine 1.5s ease-in-out' }}
                  />
                )}
              </div>

              {/* Top Image */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: isHovered ? 'translateY(-10px) scale(1.1)' : 'translateY(0) scale(1)',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <img 
                  src={product.topImage}
                  alt={product.name}
                  className="w-3/4 h-3/4 object-contain drop-shadow-2xl"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                  }}
                />
              </div>

              {/* Floating Elements */}
              {isHovered && (
                <>
                  <div 
                    className="absolute w-16 h-16 rounded-full bg-gray-900 opacity-10 blur-xl"
                    style={{
                      top: '10%',
                      right: '10%',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  />
                  <div 
                    className="absolute w-20 h-20 rounded-full bg-gray-900 opacity-10 blur-xl"
                    style={{
                      bottom: '15%',
                      left: '5%',
                      animation: 'pulse 2s ease-in-out infinite 0.5s'
                    }}
                  />
                </>
              )}
            </div>

            {/* Status Badge */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl border-2 border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="font-semibold text-gray-800">ESP32 System</span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            {/* Category */}
            <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full border border-gray-200">
              <span className="text-sm font-semibold text-gray-900">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sensor Specs */}
            <div className="grid grid-cols-3 gap-3">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1">
                    <spec.icon className="w-5 h-5 mb-2 text-gray-700" />
                    <div className="text-xs font-medium text-gray-500">{spec.label}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Real-time health data monitoring',
                'Cloud-based AI anomaly detection',
                'Web dashboard with alerts'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/info">
              <button className="group relative px-8 py-4 bg-black text-white font-semibold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Learn More
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="hidden lg:block absolute bottom-8 left-8">
        <div className="px-5 py-3 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-xs text-gray-500 font-medium">Connectivity</div>
          <div className="font-bold text-gray-900">ESP32 WiFi</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(30deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ProductPortfolio;