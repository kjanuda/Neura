'use client';

import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      
      {/* Full page robot background */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* Face/Head image - BEHIND (background layer) with subtle parallax */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat will-change-transform"
          style={{
            backgroundImage: 'url(/hed1.webp)',
            backgroundPosition: isMobile 
              ? 'center top 0%' 
              : 'top 0% right 65%',
            backgroundSize: isMobile 
              ? 'auto 55%' 
              : 'auto 85%',
            opacity: 0.95,
            transform: isMobile 
              ? `translateY(-${scrollY * 0.05}px) scale(${1 + scrollY * 0.0001})` 
              : `translateY(-${scrollY * 0.15}px) scale(${1 + scrollY * 0.00008})`
          }}
        ></div>
        
        {/* Hand/Body image - IN FRONT (top layer) with enhanced parallax */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat z-10 will-change-transform"
          style={{
            backgroundImage: 'url(/hed2.webp)',
            backgroundPosition: isMobile 
              ? 'center bottom 15%' 
              : 'bottom 5% right 10%',
            backgroundSize: isMobile 
              ? 'auto 75%' 
              : 'auto 115%',
            opacity: 0.95,
            transform: isMobile 
              ? `translateY(-${scrollY * 0.15}px) translateX(${scrollY * 0.02}px)` 
              : `translateY(-${scrollY * 0.35}px) translateX(${scrollY * 0.05}px)`
          }}
        ></div>
      </div>
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 relative z-20">
        <div className="flex items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 max-w-md py-10 md:py-20 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-gray-800 animate-slide-in-left">
               <br /> Smart Healthcare Monitoring
            </h1>
            
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed font-light max-w-xs sm:max-w-sm md:max-w-md animate-fade-in delay-200">
              Neura is an IoT-based patient monitoring system that applies Edge AI to analyze vital health data locally, enabling rapid anomaly detection, reduced cloud dependency, and intelligent home healthcare solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 animate-fade-in delay-400">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform">
                Press Releases
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 hover:shadow-md transform hover:scale-105 active:scale-95">
                Learn More
              </button>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Mobile bottom navigation indicators - Show only on mobile */}
      
      
      {/* Side navigation indicators - Desktop only */}
      
      
      {/* Social media icons - Left side Desktop only */}
      <div className="hidden lg:flex fixed left-4 2xl:left-8 top-1/2 transform -translate-y-1/2 flex-col gap-5 2xl:gap-6 z-30">
        <a href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1" aria-label="Twitter">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1" aria-label="LinkedIn">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1" aria-label="Facebook">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1" aria-label="Instagram">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
      
      {/* Mobile social icons - Bottom right */}
      <div className="lg:hidden fixed bottom-8 right-4 z-30 animate-fade-in">
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-125 active:scale-95" aria-label="Twitter">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 active:scale-95" aria-label="LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile menu button - Top right */}
      <div className="lg:hidden fixed top-6 right-4 z-30 animate-fade-in">
        <button className="bg-white p-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 transform hover:bg-gray-50">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Scroll indicator - Bottom center for mobile */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 z-30 flex justify-center animate-fade-in">
        <div className="animate-bounce-slow text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 2.5s ease-in-out infinite;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Better touch targets for mobile */
        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}