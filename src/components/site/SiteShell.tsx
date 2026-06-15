'use client';

import { useEffect, ReactNode, CSSProperties } from 'react';
import Navigation from '@/src/components/landing/components/Navigation';
import SiteFooter from './SiteFooter';
import { useTheme } from '@/src/context/ThemeContext';

interface SiteShellProps {
  children: ReactNode;
  /** Sección activa para resaltar en el nav (hero | nosotros | como-funciona | contacto). */
  activeSection?: string;
}

/**
 * SiteShell — chrome compartido de todas las páginas secundarias.
 * Reactivo al tema: oscuro (#0a0618) o claro lavanda (#f0ebff), con la misma
 * cuadrícula + glows de la home. Define las variables --site-* que consumen los
 * helpers `cx` de theme.ts, así todo el contenido recolorea con el toggle.
 */
export default function SiteShell({ children, activeSection }: SiteShellProps) {
  const { isDark } = useTheme();

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

  const vars = (
    isDark
      ? {
          '--site-bg': '#0a0618',
          '--site-ink': '#f5f3ff',
          '--site-muted': 'rgba(201,189,240,0.72)',
          '--site-surface': 'rgba(255,255,255,0.045)',
          '--site-surface-hover': 'rgba(255,255,255,0.09)',
          '--site-border': 'rgba(255,255,255,0.14)',
          '--site-border-hover': 'rgba(255,255,255,0.28)',
          '--site-grad-a': '#a78bfa',
          '--site-grad-b': '#60a5fa',
          '--site-accent': '#a78bfa',
          '--site-accent-2': '#60a5fa',
        }
      : {
          '--site-bg': '#f0ebff',
          '--site-ink': '#1f2937',
          '--site-muted': '#4b5563',
          '--site-surface': 'rgba(255,255,255,0.55)',
          '--site-surface-hover': 'rgba(255,255,255,0.85)',
          '--site-border': 'rgba(255,255,255,0.85)',
          '--site-border-hover': 'rgba(124,58,237,0.4)',
          '--site-grad-a': '#7c3aed',
          '--site-grad-b': '#2563eb',
          '--site-accent': '#6d28d9',
          '--site-accent-2': '#2563eb',
        }
  ) as CSSProperties;

  const gridLine = isDark ? 'rgba(124,58,237,0.14)' : 'rgba(124,58,237,0.12)';

  return (
    <div
      className="relative min-h-screen overflow-x-hidden transition-colors duration-300 [color:var(--site-ink)]"
      style={{ ...vars, backgroundColor: 'var(--site-bg)' }}
    >
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

      {/* Fondo de marca: cuadrícula + glows (coherente con la home) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px),
                              linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(120% 90% at 50% 30%, black 55%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 50% 30%, black 55%, transparent 100%)',
          }}
        />
        <div
          className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full blur-[120px]"
          style={{ background: isDark ? 'rgba(124,58,237,0.22)' : 'rgba(124,58,237,0.15)', animation: 'orb-float 9s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full blur-[130px]"
          style={{ background: isDark ? 'rgba(37,99,235,0.18)' : 'rgba(37,99,235,0.10)', animation: 'orb-float 11s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full blur-[110px]"
          style={{ background: isDark ? 'rgba(147,51,234,0.14)' : 'rgba(147,51,234,0.08)', animation: 'orb-float 10s ease-in-out infinite' }}
        />
      </div>

      <Navigation activeSection={activeSection} />

      <main className="relative z-10 pt-16">{children}</main>

      <SiteFooter />
    </div>
  );
}
