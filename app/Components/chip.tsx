'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Cpu, Layers } from 'lucide-react';
import Link from "next/link";

const ProductPortfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

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
    <section className="min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="flex-1 bg-gray-100" />
        <div className="flex-1 bg-white" />
      </div>

      {/* Animated Background Grid - Gray Side */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 w-1/2" style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-blue-500 rounded-full opacity-20"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            pointerEvents: 'none'
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes rotateChip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16" style={{ animation: 'fadeIn 1s ease-out' }}>
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-semibold">Healthcare IoT</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-2 sm:mb-4 px-4">
            IoT Home Patient Monitoring
          </h1>
          <p className="text-gray-700 text-base sm:text-lg px-4">
            Real-time health tracking with AI-powered anomaly detection
          </p>
        </div>

        {/* Main Content */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            {/* Image Section - Gray Background */}
            <div className="relative p-6 sm:p-8 lg:p-12 flex items-center justify-center order-1 lg:order-1 bg-gray-100">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
               
                
                {/* Interactive Chip Images */}
                <div 
                  className="relative w-full aspect-square cursor-pointer transition-all duration-500"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{ 
                    transform: isHovered ? 'scale(1.05) rotateZ(2deg)' : 'scale(1) rotateZ(0deg)',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Bottom Image - Hexagonal Pattern */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
                    <img 
                      src={currentProduct.bottomImage}
                      alt="Chip internal view"
                      className="w-full h-full object-contain transition-transform duration-700"
                      style={{
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                      }}
                    />
                    {/* Shine Effect */}
                    {isHovered && (
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
                          animation: 'shine 1.5s ease-in-out infinite'
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Top Image - Apollo Chip */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                    style={{
                      transform: isHovered ? 'translateY(-30px) scale(1.08)' : 'translateY(0) scale(1)',
                      filter: isHovered 
                        ? 'drop-shadow(0 30px 40px rgba(37, 99, 235, 0.4)) drop-shadow(0 0 30px rgba(37, 99, 235, 0.3))' 
                        : 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
                    }}
                  >
                    <img 
                      src={currentProduct.topImage}
                      alt={`${currentProduct.name} chip`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Orbiting Elements */}
                  {isHovered && (
                    <>
                      <div className="absolute top-1/4 left-0 w-3 h-3 rounded-full bg-blue-600 animate-ping" />
                      <div className="absolute bottom-1/4 right-0 w-2 h-2 rounded-full bg-blue-600 animate-ping" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-blue-600 animate-ping" style={{ animationDelay: '1s' }} />
                    </>
                  )}
                </div>
                
                {/* Category Label */}
                <div className="text-center mt-6 sm:mt-8">
                  <div className="inline-block px-6 py-3 bg-white rounded-full border border-slate-300 shadow-lg">
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-600">
                      ESP32 System
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section - White Background */}
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-2 bg-white">
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full border border-blue-200 text-blue-700 text-sm font-semibold mb-4 sm:mb-6 w-fit" style={{ animation: 'fadeIn 1s ease-out 0.2s both' }}>
                {currentProduct.category}
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-bold text-black mb-3 sm:mb-4" style={{ animation: 'fadeIn 1s ease-out 0.4s both' }}>
                {currentProduct.name}
              </h2>
              
              <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{ animation: 'fadeIn 1s ease-out 0.6s both' }}>
                {currentProduct.description}
              </p>

              {/* Features */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8" style={{ animation: 'fadeIn 1s ease-out 1s both' }}>
                {[
                  'Real-time health data monitoring',
                  'Cloud-based AI anomaly detection', 
                  'Web dashboard with alerts'
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 group"
                    style={{ animation: `fadeIn 0.5s ease-out ${1.2 + index * 0.1}s both` }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                      style={{
                        background: `linear-gradient(135deg, ${currentProduct.gradientFrom}, ${currentProduct.gradientTo})`,
                        boxShadow: `0 0 10px ${currentProduct.gradientFrom}50`
                      }}
                    />
                    <span className="text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div style={{ animation: 'fadeIn 1s ease-out 1.5s both' }}>
                <Link href="/info">
                <button 
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 relative overflow-hidden group"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Category Labels - Desktop Only */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden xl:block" style={{ animation: 'fadeIn 1s ease-out 1.7s both' }}>
            <div className="bg-white backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-slate-200 hover:scale-110 transition-transform duration-300">
              <span className="text-emerald-600 font-semibold">ESP32</span>
            </div>
          </div>
          
          <div className="absolute -right-4 top-1/4 hidden xl:block" style={{ animation: 'fadeIn 1s ease-out 1.9s both' }}>
            <div className="bg-white backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-slate-200 hover:scale-110 transition-transform duration-300">
              <span className="text-emerald-600 font-semibold">WiFi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPortfolio;