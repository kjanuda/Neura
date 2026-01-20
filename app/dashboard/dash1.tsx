'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";

export default function HealthProtectionSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Get user name from localStorage or session storage
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.name || parsedUser.email?.split('@')[0] || 'User');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUserName('User');
      }
    } else {
      setUserName('User');
    }

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

    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Intersection Observer for reveal animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    checkMobile();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile]);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden">
      
      {/* Full page background with parallax */}
      <div className="absolute inset-0 w-full h-full">
        
        {/* Background image - BEHIND (static, no motion) */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: 'url(/where-to-buy-bg--mobile.webp)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: isVisible ? 0.95 : 0,
            transition: 'opacity 1s ease-out'
          }}
        ></div>
        
        {/* Front Device image - IN FRONT with enhanced parallax and 3D tilt effect */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat z-10 will-change-transform transition-transform duration-500 ease-out"
          style={{
            backgroundImage: 'url(/where-to-buy-front--mobile.webp)',
            backgroundPosition: isMobile 
              ? 'right bottom 10%' 
              : 'right bottom',
            backgroundSize: isMobile 
              ? 'contain' 
              : 'auto 90%',
            opacity: isVisible ? 0.95 : 0,
            transform: isMobile 
              ? `translateY(-${scrollY * 0.15}px) translateX(${scrollY * 0.02}px) rotateY(${scrollY * 0.01}deg)` 
              : `translateY(-${scrollY * 0.35}px) translateX(${scrollY * 0.05}px) rotateY(${mousePosition.x * -0.3}deg) rotateX(${mousePosition.y * 0.2}deg) scale(${1 + scrollY * 0.00005})`,
            transformStyle: 'preserve-3d',
            transition: 'opacity 1.2s ease-out 0.3s, transform 0.5s ease-out'
          }}
        ></div>
      </div>
      
      {/* Floating particles background effect - Only render on client */}
      {isMounted && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      )}
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 relative z-20">
        <div className="flex items-center min-h-screen">
          
          {/* Left Content with staggered reveal */}
          <div className={`space-y-4 md:space-y-6 max-w-xl py-10 md:py-20 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Welcome, {userName}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight text-gray-900 animate-slide-in-left">
              <span className="block animate-text-shimmer">Your Health,</span>
              <span className="block text-blue-600 animate-text-shimmer">Our Priority</span>
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-light max-w-md animate-fade-in delay-200">
              It is our job to protect <span className="font-semibold text-gray-800">{userName}</span>'s health. If you're feeling unwell, we're here for you with comprehensive care and support every step of the way.
            </p>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg animate-fade-in delay-300">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-green-900">24/7 Health Monitoring</p>
                <p className="text-xs text-green-700 mt-1">We're always watching over your wellbeing</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 animate-fade-in delay-400">
              <Link href="/preg">
              <button className="group bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transform inline-flex items-center gap-2 justify-center relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <svg className="w-5 h-5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="relative">Access Health Services</span>
                <span className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-25 rounded-lg group-hover:scale-110 transition-all duration-300"></span>
              </button>
              </Link>

              <button className="group bg-white hover:bg-gray-50 text-gray-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-blue-300 hover:scale-105 active:scale-95 transform inline-flex items-center gap-2 justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn More</span>
              </button>
            </div>

            {/* Health Stats Cards */}
            <div className="grid grid-cols-3 gap-3 pt-4 animate-fade-in delay-500">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-gray-600 mt-1">Availability</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 hover:border-green-300 transition-colors duration-300">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">Care Focus</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 hover:border-purple-300 transition-colors duration-300">
                <div className="text-2xl font-bold text-purple-600">∞</div>
                <div className="text-xs text-gray-600 mt-1">Support</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Social media icons - Left side Desktop only with hover animations */}
      <div className="hidden lg:flex fixed left-4 2xl:left-8 top-1/2 transform -translate-y-1/2 flex-col gap-5 2xl:gap-6 z-30">
        <a href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1 hover:rotate-12" aria-label="Twitter">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1 hover:rotate-12" aria-label="LinkedIn">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1 hover:rotate-12" aria-label="Facebook">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-125 hover:-translate-x-1 hover:rotate-12" aria-label="Instagram">
          <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
      
      {/* Mobile social icons - Bottom right with pulse */}
      <div className="lg:hidden fixed bottom-8 right-4 z-30 animate-fade-in">
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-125 active:scale-95 animate-pulse-subtle" aria-label="Twitter">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 active:scale-95 animate-pulse-subtle" aria-label="LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile menu button - Top right with rotate animation */}
      <div className="lg:hidden fixed top-6 right-4 z-30 animate-fade-in">
        <button className="group bg-white p-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 transform hover:bg-gray-50 hover:rotate-90">
          <svg className="w-6 h-6 text-gray-700 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Scroll indicator - Bottom center with enhanced bounce */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 z-30 flex justify-center animate-fade-in">
        <div className="animate-bounce-slow text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-300">
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.5;
          }
        }
        
        @keyframes pulseSubtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes textShimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
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
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulseSubtle 3s ease-in-out infinite;
        }
        
        .animate-text-shimmer {
          background: linear-gradient(90deg, #1f2937, #3b82f6, #1f2937);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShimmer 8s ease-in-out infinite;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
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