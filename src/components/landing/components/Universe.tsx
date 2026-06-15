'use client';
import { useEffect, useRef } from 'react';
import { Palette, Search, Landmark, Users, Target, Repeat, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function Universe() {
  const { isDark } = useTheme();
  const timelineRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const gsapRef = useRef<any>(null);
  const scrollTriggerRef = useRef<any>(null);
  const ctxRef = useRef<any>(null);

  const addToItemsRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (typeof window === 'undefined') return;

    const setup = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        if (!mounted) return;

        const gsapLib = (gsapModule as any).gsap || (gsapModule as any).default || (gsapModule as any);
        const scrollTriggerLib = (ScrollTriggerModule as any).ScrollTrigger || (ScrollTriggerModule as any).default || (ScrollTriggerModule as any);
        if (!gsapLib) throw new Error('GSAP module not resolved');
        gsapLib.registerPlugin(scrollTriggerLib);
        gsapRef.current = gsapLib;
        scrollTriggerRef.current = scrollTriggerLib;

        const hasContext = typeof (gsapLib as any).context === 'function';
        let localCleanup: (() => void) | null = null;

        const runAnimations = () => {
          const tl = gsapLib.timeline({
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top top',
              end: '+=200%',
              scrub: true,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              id: 'universeTimeline',
            },
          });

          itemsRef.current.forEach((item, i) => {
            tl.from(
              item,
              {
                y: i % 2 === 0 ? 150 : -150,
                opacity: 0,
                scale: 0.8,
                ease: 'power4.out',
                duration: 1.2,
              },
              i
            );
          });

          tl.from(
            '.timeline-line path',
            {
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
              ease: 'power2.inOut',
              duration: 3,
            },
            0
          );

          return () => {
            // Solo matar lo propio: nunca getAll() — eso destruye los triggers de toda la página
            try { scrollTriggerLib.getById?.('universeTimeline')?.kill?.(); } catch {}
            try { tl.kill(); } catch {}
          };
        };

        let ctx: any = null;
        if (hasContext) {
          ctx = (gsapLib as any).context(runAnimations, timelineRef);
          ctxRef.current = ctx;
        } else {
          localCleanup = runAnimations();
          ctxRef.current = { revert: () => { try { localCleanup && localCleanup(); } catch {} } };
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error cargando GSAP/ScrollTrigger:', e);
        }
      }
    };

    setup();

    return () => {
      mounted = false;
      try { ctxRef.current?.revert(); } catch {}
      try { scrollTriggerRef.current?.getById?.('universeTimeline')?.kill?.(); } catch {}
    };
  }, []);

  return (
    <>
      {/* Timeline */}
      <section
        ref={timelineRef}
        className="relative py-32 overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: isDark ? '#0a0618' : '#f0ebff' }}
      >
        {/* Cuadrícula de marca */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(124,58,237,0.14)' : 'rgba(124,58,237,0.12)'} 1px, transparent 1px),
                              linear-gradient(90deg, ${isDark ? 'rgba(124,58,237,0.14)' : 'rgba(124,58,237,0.12)'} 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(110% 80% at 50% 45%, black 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(110% 80% at 50% 45%, black 50%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: '50%', top: '-15%', width: '54vw', aspectRatio: '1',
            transform: 'translateX(-50%)',
            background: `radial-gradient(closest-side, ${isDark ? 'rgba(124,58,237,0.24)' : 'rgba(124,58,237,0.14)'}, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              style={{
                fontFamily: 'var(--font-display), system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: isDark ? '#f5f3ff' : '#1f2937',
                marginBottom: 20,
              }}
            >
              Todo ocurre en un mismo <span style={{ color: isDark ? '#a78bfa' : '#6d28d9' }}>ecosistema</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#7c3aed] to-[#2563eb] mx-auto mb-4 rounded-full" />
            <p
              className="max-w-3xl mx-auto"
              style={{ fontSize: 17, lineHeight: 1.7, color: isDark ? '#b9b3cf' : '#4b5563' }}
            >
              La cultura funciona porque todos colaboran. BuscArt no es un directorio:
              es la infraestructura que conecta cada pieza.
            </p>
          </div>

          <div className="relative w-full">
            {/* Línea curva Desktop */}
            <svg
              className="hidden md:block absolute w-full h-40 timeline-line"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 50 Q 250 0 500 50 T 1000 50"
                stroke="url(#grad)"
                fill="transparent"
                strokeWidth="4"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>

            {/* Línea serpiente Mobile */}
            <svg
              className="absolute md:hidden left-1/2 transform -translate-x-1/2 w-1 h-full"
              viewBox="0 0 4 1000"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 0 Q 4 250 2 500 Q 0 750 2 1000"
                stroke="url(#gradV)"
                fill="transparent"
                strokeWidth="4"
              />
              <defs>
                <linearGradient id="gradV" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative flex flex-col md:flex-row md:justify-between">
              {[
                {
                  icon: Palette,
                  title: 'El artista publica',
                  desc: 'Su talento, portafolio y tarifas quedan visibles para todos.',
                },
                {
                  icon: Search,
                  title: 'Alguien lo encuentra',
                  desc: 'Empresas y organizadores lo contratan con pago protegido.',
                },
                {
                  icon: Landmark,
                  title: 'El espacio los recibe',
                  desc: 'Salas, museos y escenarios abren su agenda.',
                },
                {
                  icon: Users,
                  title: 'El público asiste',
                  desc: 'La ciudad vive la experiencia y la cultura circula.',
                },
                {
                  icon: Target,
                  title: 'Nacen oportunidades',
                  desc: 'Cada evento genera nuevos contratos y conexiones.',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  ref={addToItemsRefs}
                  className={`relative flex flex-col items-center text-center w-full max-w-xs mx-auto
                    md:w-1/5 md:items-center
                    ${i % 2 !== 0 ? 'md:mt-28' : ''}
                    ${
                      i % 2 === 0
                        ? 'md:self-center md:items-center md:text-center'
                        : 'md:self-center md:items-center md:text-center'
                    }
                    mb-16 md:mb-0 px-4
                  `}
                >
                  {/* Anillo de vidrio + esfera con luz interior */}
                  <div
                    className="rounded-full p-2.5 mb-4 md:mb-6 mx-auto"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.45)',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.9)'}`,
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                  >
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center"
                      style={{
                        boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.35), inset 0 -6px 14px rgba(0,0,0,0.25), 0 0 40px rgba(124,58,237,0.35), 0 0 70px rgba(37,99,235,0.18)',
                      }}
                    >
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 text-white" strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold mb-2 px-2"
                    style={{ fontFamily: 'var(--font-display), system-ui, sans-serif', color: isDark ? '#f5f3ff' : '#1f2937' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base max-w-[280px] px-2" style={{ color: isDark ? '#b9b3cf' : '#4b5563' }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* El ciclo se cierra */}
            <div ref={addToItemsRefs} className="flex justify-center mt-14 md:mt-16">
              <div
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.55)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.85)'}`,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                }}
              >
                <Repeat
                  size={17}
                  className="animate-spin"
                  style={{ color: isDark ? '#a78bfa' : '#6d28d9', animationDuration: '7s' }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display), system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: 15,
                    color: isDark ? '#f5f3ff' : '#1f2937',
                  }}
                >
                  …y el ciclo vuelve a empezar.
                </span>
              </div>
            </div>
          </div>

          {/* CTA final de la página */}
          <div className="text-center mt-20">
            <p
              style={{
                fontFamily: 'var(--font-display), system-ui, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                color: isDark ? '#f5f3ff' : '#1f2937',
                marginBottom: 22,
              }}
            >
              El ecosistema te está esperando.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={
                  isDark
                    ? { background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.28)' }
                    : { background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 12px 32px -12px rgba(124,58,237,0.55)' }
                }
              >
                Crear perfil gratis
                <ArrowRight size={16} />
              </a>
              <a
                href="/explorar"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.22)' : 'rgba(124,58,237,0.35)'}`,
                  color: isDark ? '#c4b5fd' : '#6d28d9',
                  background: 'transparent',
                }}
              >
                Explorar talento
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
