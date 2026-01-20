"use client";

import React, { useRef, useEffect, useState } from 'react';

export default function AmbiqVideoHero() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(err => {
              console.log('Auto-play prevented:', err);
            });
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23000000' width='1920' height='1080'/%3E%3C/svg%3E"
      >
        <source src="/neura.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Notes on design, direction,
            <br />
            and everything between.
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Our ultimate goal at Ambiq is to put intelligence everywhere
            while fostering a cleaner, greener, and safer environment for
            humanity.
          </p>
        </div>
      </div>
    </div>
  );
}