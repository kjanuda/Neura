'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Cpu, Layers } from 'lucide-react';
import Link from "next/link";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const products = [
    {
      name: 'HealthGuard AI',
      category: 'IoT Health Monitor',
      description: 'ESP32-based home patient monitoring system with DHT11, MAX30102, and MQ-135 sensors for real-time health tracking and AI-powered anomaly detection',
      topImage: '/neu.png',
      bottomImage: '/neu1.webp',
      gradientFrom: '#10b981',
      gradientTo: '#3b82f6',
      specs: [
        { label: 'Temp', value: 'DHT11', icon: Zap },
        { label: 'Heart', value: 'MAX30102', icon: Cpu },
        { label: 'Air', value: 'MQ-135', icon: Layers }
      ]
    },
  ];

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [currentIndex]);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gray-50" />
        <div className="w-1/2 bg-white" />
      </div>

      {/* Animated Background Grid - Gray Side */}
      <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
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
            className="absolute rounded-full bg-blue-400 opacity-20"
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
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-12">
        <div className="flex items-center gap-3 mb-2">
          <div>
            <div className="text-sm font-medium text-gray-500">Healthcare IoT</div>
            <div className="text-xl font-bold text-black">
              IoT Home Patient Monitoring
            </div>
          </div>
        </div>
        <p className="text-gray-600 ml-15">Real-time health tracking with AI-powered anomaly detection</p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Section - Gray Background */}
          <div className="relative">
            {/* Interactive Chip Images */}
            <div 
              className="relative w-full aspect-square max-w-md mx-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transform: isHovered ? 'scale(1.05) rotateZ(2deg)' : 'scale(1) rotateZ(0deg)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Bottom Image - Hexagonal Pattern */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={currentProduct.bottomImage}
                  alt="Circuit pattern"
                  className="w-full h-full object-cover"
                />
                {/* Shine Effect */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30"
                    style={{
                      animation: 'shine 1.5s ease-in-out'
                    }}
                  />
                )}
              </div>

              {/* Top Image - Apollo Chip */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: isHovered ? 'translateY(-10px) scale(1.1)' : 'translateY(0) scale(1)',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <img 
                  src={currentProduct.topImage}
                  alt={currentProduct.name}
                  className="w-3/4 h-3/4 object-contain drop-shadow-2xl"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                  }}
                />
              </div>

              {/* Orbiting Elements */}
              {isHovered && (
                <>
                  <div 
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-60 blur-xl"
                    style={{
                      top: '10%',
                      right: '10%',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  />
                  <div 
                    className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-40 blur-xl"
                    style={{
                      bottom: '15%',
                      left: '5%',
                      animation: 'pulse 2s ease-in-out infinite 0.5s'
                    }}
                  />
                </>
              )}
            </div>

            {/* Category Label */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl border-2 border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-gray-800">ESP32 System</span>
              </div>
            </div>
          </div>

          {/* Info Section - White Background */}
          <div className="space-y-6">
            <div>
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {currentProduct.category}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {currentProduct.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Real-time health data monitoring',
                'Cloud-based AI anomaly detection',
                'Web dashboard with alerts'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
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

      {/* Category Labels - Desktop Only */}
      <div className="hidden lg:block absolute bottom-8 left-8 space-y-2">
        <div className="px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-xs text-gray-500">Connectivity</div>
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
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ProductPortfolio;