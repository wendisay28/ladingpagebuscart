'use client';
import { useEffect, useRef } from 'react';
import { Sparkles, Shield, Zap, Users } from 'lucide-react';

export default function Universe() {
  const timelineRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const countersRef = useRef<HTMLDivElement[]>([]);
  const gsapRef = useRef<any>(null);
  const scrollTriggerRef = useRef<any>(null);
  const ctxRef = useRef<any>(null);

  const addToItemsRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const addToCountersRefs = (el: HTMLDivElement) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el);
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

          const counterObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const target = entry.target as HTMLElement;
                  const count = parseInt(target.dataset.count || '0', 10);
                  const duration = 2;
                  let current = 0;
                  const increment = count / (60 * duration);

                  const updateCounter = () => {
                    if (current < count) {
                      current += increment;
                      target.textContent = Math.ceil(current).toLocaleString();
                      requestAnimationFrame(updateCounter);
                    } else {
                      target.textContent = count.toLocaleString();
                    }
                  };

                  updateCounter();
                  counterObserver.unobserve(target);
                }
              });
            },
            { threshold: 0.5 }
          );

          countersRef.current.forEach((counter) => {
            if (counter) counterObserver.observe(counter);
          });

          return () => {
            try { gsapLib.killTweensOf('*'); } catch {}
            try { scrollTriggerLib.getAll().forEach((st: any) => st.kill()); } catch {}
            countersRef.current.forEach((counter) => {
              try { if (counter) counterObserver.unobserve(counter); } catch {}
            });
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
      <section ref={timelineRef} className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Próximamente en BuscArt
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Conectamos talento y oportunidades en una plataforma innovadora.
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
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
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
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative flex flex-col md:flex-row md:justify-between">
              {[
                {
                  icon: Sparkles,
                  title: 'Sistema MI',
                  desc: 'Algoritmo inteligente para conectar proyectos y artistas.',
                },
                {
                  icon: Shield,
                  title: 'Protección Total',
                  desc: 'Pagos y derechos seguros en cada paso.',
                },
                {
                  icon: Zap,
                  title: 'Proceso Ágil',
                  desc: 'Optimización de flujos y tiempos.',
                },
                {
                  icon: Users,
                  title: 'Comunidad Elite',
                  desc: 'Red de artistas y creadores de primer nivel.',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  ref={addToItemsRefs}
                  className={`relative flex flex-col items-center text-center w-full max-w-xs mx-auto
                    md:w-1/4 md:items-center
                    ${i % 2 !== 0 ? 'md:mt-28' : ''}
                    ${
                      i % 2 === 0
                        ? 'md:self-center md:items-center md:text-center'
                        : 'md:self-center md:items-center md:text-center'
                    }
                    mb-16 md:mb-0 px-4
                  `}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 md:mb-6 shadow-2xl mx-auto">
                    <Icon className="w-9 h-9 sm:w-10 sm:h-10 md:w-16 md:h-16 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 px-2">{title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base max-w-[280px] px-2">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impacto en Números */}
      <section className="relative py-20 md:py-32 bg-black z-10">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">Impacto en Números</h3>
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
            Estas cifras representan nuestras <strong>metas y proyecciones</strong> mientras seguimos conectando artistas y proyectos en todo el mundo.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { count: 1200, label: 'Artistas Verificados', note: 'Meta 2025' },
              { count: 900, label: 'Proyectos Exitosos', note: 'Proyección' },
              { count: 150, label: 'Ciudades Activas', note: 'Objetivo' },
              { count: 98, label: '% Satisfacción', note: 'Proyección' },
            ].map(({ count, label, note }, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20"
              >
                <div
                  ref={addToCountersRefs}
                  data-count={count}
                  className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 md:mb-3"
                >
                  0
                </div>
                <div className="text-gray-300 text-lg">{label}</div>
                <div className="text-gray-500 text-sm mt-1">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
