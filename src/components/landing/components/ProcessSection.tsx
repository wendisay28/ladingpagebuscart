"use client";
import { useEffect, useRef } from "react";
import { Search, SlidersHorizontal, MessagesSquare, ShieldCheck, ArrowRight } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const STEPS = [
  {
    n: "01",
    Icon: Search,
    title: "Descubre",
    text: "Explora artistas, eventos y espacios culturales cerca de ti, por categoría y ciudad.",
  },
  {
    n: "02",
    Icon: SlidersHorizontal,
    title: "Compara",
    text: "Revisa portafolios, precios y disponibilidad lado a lado antes de decidir.",
  },
  {
    n: "03",
    Icon: MessagesSquare,
    title: "Acuerda",
    text: "Habla directo con el artista y define fecha, alcance y tarifa, sin intermediarios.",
  },
  {
    n: "04",
    Icon: ShieldCheck,
    title: "Contrata protegido",
    text: "Tu pago queda retenido en Mercado Pago y se libera solo cuando el servicio se confirma.",
  },
];

export default function ProcessSection() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  // Misma animación de scroll que Contraofertas: pin + scrub con entrada escalonada
  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const gsapModule = await import("gsap");
      const STModule = await import("gsap/ScrollTrigger");
      const gs = (gsapModule as any).default || (gsapModule as any).gsap || gsapModule;
      const ST = (STModule as any).default || (STModule as any).ScrollTrigger || STModule;
      gs.registerPlugin(ST);
      if (!mounted || !sectionRef.current) return;

      // Pin con scrub en pantallas donde el grid cabe en el viewport (igual que Contraofertas)
      const canPin = window.matchMedia("(min-width: 640px)").matches;

      // El título NO se anima con el scroll: queda visible para no dejar pantalla vacía
      gs.set(".proc-card", { y: 140, opacity: 0 });
      gs.set(".proc-cta", { y: 40, opacity: 0 });
      gs.set(".proc-line", { scaleX: 0 });
      gs.set(".proc-node", { scale: 0, opacity: 0 });

      const cards = gs.utils.toArray(".proc-card");
      const nodes = gs.utils.toArray(".proc-node");

      if (canPin) {
        // Sección anclada: tarjetas y red conectora avanzan/retroceden con el scroll
        const tl = gs.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 2.6}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "processSection",
          },
        });

        // Cada tarjeta ocupa su propio tramo del scroll: la última termina casi al final
        const SEG = 1;
        tl.to(".proc-line", { scaleX: 1, duration: cards.length * SEG, ease: "none" }, 0);
        cards.forEach((card: any, i: number) => {
          tl.to(card, { y: 0, opacity: 1, duration: 0.85, ease: "power2.out" }, i * SEG);
          // El nodo brota cuando la línea alcanza la unión con la siguiente tarjeta
          if (i > 0 && nodes[i - 1]) {
            tl.to(nodes[i - 1], { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, i * SEG);
          }
        });
        tl.to(".proc-cta", { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, cards.length * SEG - 0.3);
        tl.to({}, { duration: 0.25 });

        cleanup = () => {
          try { (ST as any).getById?.("processSection")?.kill?.(); } catch {}
          tl.kill();
        };
      } else {
        // Pantallas muy angostas: sin pin, pero igual atado al scroll (scrub por tarjeta)
        const triggers: any[] = [];
        const scrubIn = (target: any, trigger: any) =>
          gs.to(target, {
            y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger, start: "top 95%", end: "top 55%", scrub: 1 },
          });

        cards.forEach((card: any) => triggers.push(scrubIn(card, card)));
        triggers.push(scrubIn(".proc-cta", ".proc-cta"));
        cleanup = () => triggers.forEach((t) => { t.scrollTrigger?.kill?.(); t.kill?.(); });
      }
    };

    setup();
    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  const ink = isDark ? "#f5f3ff" : "#1f2937";
  const accent = isDark ? "#a78bfa" : "#6d28d9";
  const body = isDark ? "#b9b3cf" : "#4b5563";
  const gridLine = isDark ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.12)";

  const glass = {
    border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.75)"}`,
    background: isDark
      ? `linear-gradient(160deg, rgba(255,255,255,0.09), transparent 45%),
         rgba(255,255,255,0.045)`
      : `linear-gradient(160deg, rgba(255,255,255,0.50), rgba(240,235,255,0.20) 50%),
         linear-gradient(120deg, rgba(233,224,255,0.35), rgba(224,213,255,0.25))`,
    backdropFilter: "blur(18px) saturate(150%)",
    WebkitBackdropFilter: "blur(18px) saturate(150%)",
    boxShadow: isDark
      ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 24px 60px -28px rgba(124,58,237,0.30)"
      : "inset 0 1px 0 rgba(255,255,255,0.9), 0 24px 60px -32px rgba(124,58,237,0.28)",
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden transition-colors duration-300 flex items-center"
      style={{ backgroundColor: isDark ? "#0a0618" : "#f0ebff", minHeight: "100svh" }}
    >
      {/* Cuadrícula, misma del hero */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px),
                            linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(110% 80% at 50% 30%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(110% 80% at 50% 30%, black 50%, transparent 100%)",
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "50%", top: "-18%", width: "52vw", aspectRatio: "1",
          transform: "translateX(-50%)",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(124,58,237,0.22)" : "rgba(124,58,237,0.14)"}, transparent 70%)`,
        }}
      />

      <div className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 py-24 lg:py-20 z-10">

        {/* Encabezado */}
        <div className="proc-title text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <h2
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: ink,
              marginBottom: 18,
            }}
          >
            Cómo <span style={{ color: accent }}>funciona</span>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: body }}>
            Cuatro pasos para pasar de la idea a la experiencia, con tu dinero
            seguro en cada momento.
          </p>
        </div>

        {/* Pasos + red conectora */}
        <div className="relative">
          {/* Línea que crece de tarjeta en tarjeta */}
          <div
            aria-hidden
            className="proc-line hidden lg:block absolute left-[4%] right-[4%] pointer-events-none"
            style={{
              top: "50%",
              height: 2,
              background: "linear-gradient(90deg, #7c3aed, #2563eb)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
              opacity: isDark ? 0.55 : 0.45,
            }}
          />
          {/* Nodos de la red, en cada unión entre tarjetas */}
          {[25, 50, 75].map((left, i) => (
            <span
              key={i}
              aria-hidden
              className="proc-node hidden lg:block absolute pointer-events-none rounded-full"
              style={{
                left: `${left}%`,
                top: "50%",
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
                transform: "scale(0)",
                background: isDark ? "#a78bfa" : "#7c3aed",
                boxShadow: `0 0 0 4px ${isDark ? "rgba(167,139,250,0.18)" : "rgba(124,58,237,0.15)"}, 0 0 14px ${isDark ? "rgba(167,139,250,0.6)" : "rgba(124,58,237,0.45)"}`,
                zIndex: 5,
              }}
            />
          ))}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ n, Icon, title, text }) => (
            <div key={n} className="proc-card group relative rounded-3xl p-6 lg:p-7" style={glass}>
              <div className="transition-transform duration-300 group-hover:-translate-y-1.5">
                <div className="flex items-start justify-between mb-7">
                  <span
                    className="flex items-center justify-center rounded-2xl"
                    style={{
                      width: 46,
                      height: 46,
                      background: isDark ? "rgba(167,139,250,0.14)" : "rgba(124,58,237,0.10)",
                      border: `1px solid ${isDark ? "rgba(167,139,250,0.30)" : "rgba(124,58,237,0.22)"}`,
                      color: accent,
                    }}
                  >
                    <Icon size={21} />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: 38,
                      lineHeight: 1,
                      color: isDark ? "rgba(167,139,250,0.22)" : "rgba(124,58,237,0.18)",
                    }}
                  >
                    {n}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 19,
                    color: ink,
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: body }}>{text}</p>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* CTA */}
        <div className="proc-cta flex justify-center mt-12">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(124,58,237,0.35)"}`,
              color: isDark ? "#c4b5fd" : "#6d28d9",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            Empezar ahora
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
