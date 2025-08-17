"use client";
import { useEffect, useRef } from 'react';
import CustomCursor from './components/landing/components/CustomCursor';
import { NavigationProvider } from './context/NavigationContext';
import Navigation from './components/landing/components/Navigation';
import HeroSection from './components/landing/components/HeroSection';
import Universe from './components/landing/components/Universe';
import ArtistCategories from './components/landing/components/ArtistCategories';
import ArtistsCarousel from './components/landing/components/ArtistsCarousel';
import CounterOffers from './components/landing/components/CounterOffers';
import InteractiveMapSection from './components/landing/components/InteractiveMapSection';
import Footer from './components/landing/components/Footer';
import Gallery from './components/landing/components/Gallery';
import HowItWorks from './components/landing/components/HowItWorks';
import LandingCarousel from './components/landing/components/LandingCarousel';

export default function Home() {
  const artistsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }, []);

  const scrollToArtists = () => {
    if (artistsRef.current) {
      const rect = artistsRef.current.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        return; // Ya está visible
      }
    }
    artistsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        
        {/* Artists Carousel with How It Works */}
        <ArtistsCarousel />
        
        {/* Universe Section with Impact Numbers */}
        <Universe />
        
        {/* Interactive Map Section */}
        <InteractiveMapSection />
        
        {/* Gallery Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-6">
            <Gallery />
          </div>
        </section>

        {/* Counter Offers */}
        <section className="py-20 bg-black">
          <CounterOffers />
        </section>

        {/* Artist Categories */}
        <section ref={artistsRef} className="pb-0 bg-black">
          <ArtistCategories 
            onViewArtists={scrollToArtists}
          />
        </section>

        {/* Landing Carousel */}
        <section className="relative">
          <LandingCarousel />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </NavigationProvider>
  );
}
