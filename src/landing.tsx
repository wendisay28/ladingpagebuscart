"use client";
import { useEffect } from 'react';
import CustomCursor from './components/landing/components/CustomCursor';
import { NavigationProvider } from './context/NavigationContext';
import Navigation from './components/landing/components/Navigation';
import HeroSection from './components/landing/components/HeroSection';
import CounterOffers from './components/landing/components/CounterOffers';
import Footer from './components/landing/components/Footer';
import HowItWorks from './components/landing/components/HowItWorks';
import ForCompaniesSection from './components/landing/components/ForCompaniesSection';
import ForArtistsSection from './components/landing/components/ForArtistsSection';
import ForUsersSection from './components/landing/components/ForUsersSection';
import CommunityCollabSection from './components/landing/components/CommunityCollabSection';
import ComingSoonSection from './components/landing/components/ComingSoonSection';
import ArtistsCarousel from './components/landing/components/ArtistsCarousel';
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
      <div className="bg-black text-white overflow-x-hidden font-space">
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
        <ForUsersSection />
        {/* Artists carousel below Users section */}
        <ArtistsCarousel />
        <CommunityCollabSection />
        <ComingSoonSection />

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
