'use client';

import { useEffect, ReactNode } from 'react';
import Navigation from '@/src/components/landing/components/Navigation';
import SiteFooter from './SiteFooter';

interface SiteShellProps {
  children: ReactNode;
  /** Sección activa para resaltar en el nav (hero | nosotros | como-funciona | contacto). */
  activeSection?: string;
}

/**
 * SiteShell — chrome compartido de todas las páginas secundarias.
 * Fondo oscuro de marca (#0a0618) con orbes púrpura/azul difuminados + reveal al hacer scroll.
 */
export default function SiteShell({ children, activeSection }: SiteShellProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-in');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0618] text-white overflow-x-hidden">
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .reveal-in {
          opacity: 1 !important;
          transform: none !important;
        }
        .reveal.d1 { transition-delay: 0.08s; }
        .reveal.d2 { transition-delay: 0.16s; }
        .reveal.d3 { transition-delay: 0.24s; }
        .reveal.d4 { transition-delay: 0.32s; }
        @keyframes orb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-24px) scale(1.06); }
        }
      `}</style>

      {/* Fondo de marca */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#130d2a] via-[#0a0618] to-[#0a0618]" />
        <div
          className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#7c3aed]/15 blur-[120px]"
          style={{ animation: 'orb-float 9s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#2563eb]/12 blur-[130px]"
          style={{ animation: 'orb-float 11s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-[#9333ea]/10 blur-[110px]"
          style={{ animation: 'orb-float 10s ease-in-out infinite' }}
        />
      </div>

      <Navigation activeSection={activeSection} />

      <main className="relative z-10 pt-16">{children}</main>

      <SiteFooter />
    </div>
  );
}
