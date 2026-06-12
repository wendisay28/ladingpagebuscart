'use client';
import { useEffect, useRef } from 'react';
import { Palette, CalendarDays, Building2, Landmark, Target } from 'lucide-react';

export default function Universe() {
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
            try { gsapLib.killTweensOf('*'); } catch {}
            try { scrollTriggerLib.getAll().forEach((st: any) => st.kill()); } catch {}
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
      try {
        const ScrollTrigger = scrollTriggerRef.current;
        if (ScrollTrigger) ScrollTrigger.getAll().forEach((st: any) => st.kill());
      } catch {}
    };
  }, []);

  return (
    <>
      {/* Timeline */}
      <section ref={timelineRef} className="relative py-32 overflow-hidden bg-white">
        <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] bg-clip-text text-transparent">
            Todo ocurre en un mismo ecosistema
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#7c3aed] to-[#2563eb] mx-auto mb-4" />
            <p className="text-xl text-[#6b7280] max-w-3xl mx-auto leading-relaxed">
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
                  title: 'Artistas',
                  desc: 'El talento que da vida a la cultura.',
                },
                {
                  icon: CalendarDays,
                  title: 'Eventos',
                  desc: 'Donde el talento se encuentra con el público.',
                },
                {
                  icon: Building2,
                  title: 'Empresas',
                  desc: 'Marcas que activan, contratan y patrocinan.',
                },
                {
                  icon: Landmark,
                  title: 'Espacios culturales',
                  desc: 'Los lugares que albergan la experiencia.',
                },
                {
                  icon: Target,
                  title: 'Oportunidades',
                  desc: 'Contratos y colaboración para todos.',
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
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center mb-4 md:mb-6 mx-auto"
                    style={{ boxShadow: '0 0 40px rgba(124,58,237,0.35), 0 0 70px rgba(37,99,235,0.20)' }}
                  >
                    <Icon className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1f2937] mb-2 px-2">{title}</h3>
                  <p className="text-[#6b7280] text-sm sm:text-base max-w-[280px] px-2">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
