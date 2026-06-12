"use client";
import React, { useEffect, useRef } from 'react';
import CustomCursor from './components/landing/components/CustomCursor';
import { NavigationProvider } from './context/NavigationContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/landing/components/Navigation';
import HeroSection from './components/landing/components/HeroSection';
import CounterOffers from './components/landing/components/CounterOffers';
import HowItWorks from './components/landing/components/HowItWorks';
import ForCompaniesSection from './components/landing/components/ForCompaniesSection';
import ForArtistsSection from './components/landing/components/ForArtistsSection';
import Universe from './components/landing/components/Universe';
import BenefitsSection from './components/landing/components/BenefitsSection';
import Footer from './components/landing/components/Footer';

function HomeContent() {
  const { isDark } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    // Initialize audio
    const audio = new Audio("/sounds/mi-sonido.mp3");
    audio.volume = 0.5;
    audio.load();
    audioRef.current = audio;

    return () => {
      // Clean up audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <NavigationProvider>
      <div
        className="overflow-x-hidden font-space transition-colors duration-300"
        style={{
          backgroundColor: isDark ? '#0a0618' : '#f0ebff',
          color: isDark ? '#e5e7eb' : '#1f2937',
        }}
      >
        <CustomCursor />
        <div className="scroll-progress"></div>
        <Navigation />

        {/* Hero Section */}
        <HeroSection />

        {/* How It Works Section */}
        <HowItWorks />

        {/* New Sections */}
        <ForCompaniesSection />
        <ForArtistsSection />

        {/* ¿Por qué BuscArt? */}
        <BenefitsSection />
        <Universe />

        {/* Counter Offers */}
        <section className="py-20" style={{ backgroundColor: isDark ? '#0a0618' : '#f0ebff' }}>
          <CounterOffers />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </NavigationProvider>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}