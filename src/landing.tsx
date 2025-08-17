"use client";
import { useEffect } from 'react';
import CustomCursor from './components/landing/components/CustomCursor';
import { NavigationProvider } from './context/NavigationContext';
import Navigation from './components/landing/components/Navigation';
import HeroSection from './components/landing/components/HeroSection';
import Universe from './components/landing/components/Universe';
import CounterOffers from './components/landing/components/CounterOffers';
import InteractiveMapSection from './components/landing/components/InteractiveMapSection';
import Footer from './components/landing/components/Footer';
import HowItWorks from './components/landing/components/HowItWorks';
// LandingCarousel removed - now available at /lugares

export default function Home() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }, []);

  return (
    <NavigationProvider>
      <div className="bg-black text-white overflow-x-hidden font-space border-2 border-red-500">
        <CustomCursor />
        <div className="scroll-progress"></div>
        <Navigation />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* Universe Section with Impact Numbers */}
        <Universe />
        
        {/* Interactive Map Section */}
        <InteractiveMapSection />
        
        {/* Counter Offers */}
        <section className="py-20 bg-black">
          <CounterOffers />
        </section>

        {/* Artist Categories - Now available at /explorar */}
        
        {/* Footer */}
        <Footer />
      </div>
    </NavigationProvider>
  );
}
