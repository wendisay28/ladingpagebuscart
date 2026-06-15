"use client";
import React, { useEffect, useRef } from 'react';
import CustomCursor from './components/landing/components/CustomCursor';
import { NavigationProvider } from './context/NavigationContext';
import { useTheme } from './context/ThemeContext';
import Navigation from './components/landing/components/Navigation';
import HeroSection from './components/landing/components/HeroSection';
import CounterOffers from './components/landing/components/CounterOffers';
import HowItWorks from './components/landing/components/HowItWorks';
import ProcessSection from './components/landing/components/ProcessSection';
import ForArtistsSection from './components/landing/components/ForArtistsSection';
import Universe from './components/landing/components/Universe';
import BenefitsSection from './components/landing/components/BenefitsSection';
import Footer from './components/landing/components/Footer';

function HomeContent() {
  const { isDark } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Recalcular ScrollTrigger cuando las imágenes pesadas terminan de cargar:
    // sin esto, los pins y puntos de inicio quedan descuadrados con el layout final.
    let st: any;
    let raf = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const refresh = () => st?.refresh?.();

    import('gsap/ScrollTrigger').then((mod) => {
      st = (mod as any).default || (mod as any).ScrollTrigger || mod;
      st.config?.({ ignoreMobileResize: true });
      if (document.readyState === 'complete') {
        raf = requestAnimationFrame(refresh);
      } else {
        window.addEventListener('load', refresh, { once: true });
      }
      // Las secciones crean sus triggers de forma asíncrona: refrescos diferidos
      timeouts.push(setTimeout(refresh, 1200), setTimeout(refresh, 3000));
    });

    // Initialize audio
    const audio = new Audio("/sounds/mi-sonido.mp3");
    audio.volume = 0.5;
    audio.load();
    audioRef.current = audio;

    return () => {
      window.removeEventListener('load', refresh);
      cancelAnimationFrame(raf);
      timeouts.forEach(clearTimeout);
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

        {/* Proceso: del descubrimiento al pago protegido */}
        <ProcessSection />

        {/* Perfiles: ¿cuál eres tú? */}
        <HowItWorks />

        <ForArtistsSection />

        {/* ¿Por qué BuscArt? */}
        <BenefitsSection />

        {/* Contraofertas en tiempo real */}
        <CounterOffers />

        {/* Cierre: el ecosistema + CTA final */}
        <Universe />

        {/* Footer */}
        <Footer />
      </div>
    </NavigationProvider>
  );
}

export default function Home() {
  // ThemeProvider vive en app/layout.tsx para cubrir también las páginas del menú
  return <HomeContent />;
}