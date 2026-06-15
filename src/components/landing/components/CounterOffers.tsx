"use client";
import { useEffect, useRef, useState } from "react";
import { Zap, Star, Briefcase, ArrowLeftRight } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

interface Offer {
  title: string;
  description: string;
  price: string;
  timer: number;
  client: { initials: string; name: string; company: string; rating: string; projects: number };
}

const OFFERS: Offer[] = [
  {
    title: "Mural corporativo",
    description: "Empresa tecnológica busca artista urbano para intervenir su lobby.",
    price: "$3.500.000",
    timer: 3600,
    client: { initials: "TC", name: "TechCorp Solutions", company: "Empresa tecnológica", rating: "4.8", projects: 23 },
  },
  {
    title: "Show para boda",
    description: "Pareja busca un espectáculo único para su ceremonia y recepción.",
    price: "$2.800.000",
    timer: 7200,
    client: { initials: "SM", name: "Sofía & Miguel", company: "Evento privado", rating: "5.0", projects: 1 },
  },
  {
    title: "Instalación digital",
    description: "Museo requiere una experiencia interactiva para su nueva sala.",
    price: "$5.200.000",
    timer: 1800,
    client: { initials: "MA", name: "Museo de Arte Moderno", company: "Institución cultural", rating: "4.9", projects: 15 },
  },
];

export default function CounterOffers() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const gsapRef = useRef<any>(null);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStaticMode(true);
        return;
      }

      const gsapModule = await import("gsap");
      const STModule = await import("gsap/ScrollTrigger");
      const gs = (gsapModule as any).default || (gsapModule as any).gsap || gsapModule;
      const ST = (STModule as any).default || (STModule as any).ScrollTrigger || STModule;
      gs.registerPlugin(ST);
      if (!mounted || !sectionRef.current) return;
      gsapRef.current = gs;

      // Cuenta regresiva de cada oferta
      const intervals: ReturnType<typeof setInterval>[] = [];
      sectionRef.current.querySelectorAll<HTMLElement>(".co-timer").forEach((timer) => {
        let left = parseInt(timer.getAttribute("data-timer") || "0", 10);
        intervals.push(
          setInterval(() => {
            const h = String(Math.floor(left / 3600)).padStart(2, "0");
            const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
            const s = String(left % 60).padStart(2, "0");
            timer.textContent = left <= 0 ? "EXPIRADO" : `${h}:${m}:${s}`;
            left--;
          }, 1000)
        );
      });

      const cards = gs.utils.toArray(".co-card");
      gs.set(".co-title", { y: 60, opacity: 0 });
      gs.set(cards, { y: 120, opacity: 0 });
      cards.forEach((card: any) => {
        gs.set(card.querySelector(".co-front"), { rotationY: 180, backfaceVisibility: "hidden" });
        gs.set(card.querySelector(".co-back"), { rotationY: 0, backfaceVisibility: "hidden" });
      });

      // Anclada al scroll: el título sube, las cartas entran y se voltean una a una
      const tl = gs.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "counterOffers",
        },
      });

      tl.to(".co-title", { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);
      cards.forEach((card: any, i: number) => {
        tl.to(card, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.3 + i * 0.45);
        tl.to(card.querySelector(".co-back"), { rotationY: 180, duration: 0.6, ease: "power2.inOut" }, 0.9 + i * 0.5);
        tl.to(card.querySelector(".co-front"), { rotationY: 0, duration: 0.6, ease: "power2.inOut" }, 0.9 + i * 0.5);
      });
      tl.to({}, { duration: 0.4 });

      cleanup = () => {
        intervals.forEach(clearInterval);
        try { (ST as any).getById?.("counterOffers")?.kill?.(); } catch {}
        tl.kill();
      };
    };

    setup();
    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  // Volteo manual al tocar la carta
  const flip = (e: React.MouseEvent) => {
    const gs = gsapRef.current;
    const card = (e.currentTarget as HTMLElement);
    if (!gs) return;
    const front = card.querySelector(".co-front");
    const back = card.querySelector(".co-back");
    const flipped = card.classList.toggle("co-flipped");
    gs.to(front, { rotationY: flipped ? 180 : 0, duration: 0.6, ease: "power2.inOut" });
    gs.to(back, { rotationY: flipped ? 0 : 180, duration: 0.6, ease: "power2.inOut" });
  };

  const ink = isDark ? "#f5f3ff" : "#1f2937";
  const accent = isDark ? "#a78bfa" : "#6d28d9";
  const body = isDark ? "#b9b3cf" : "#4b5563";
  const gridLine = isDark ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.12)";

  // Acento por carta: violeta, rosa y azul, para darle vida
  const ACCENTS = [
    { grad: "linear-gradient(135deg, #7c3aed, #2563eb)", timer: isDark ? "#a78bfa" : "#6d28d9", glow: "rgba(124,58,237,0.45)" },
    { grad: "linear-gradient(135deg, #ec4899, #9333ea)", timer: isDark ? "#f9a8d4" : "#db2777", glow: "rgba(236,72,153,0.45)" },
    { grad: "linear-gradient(135deg, #2563eb, #7c3aed)", timer: isDark ? "#93c5fd" : "#2563eb", glow: "rgba(37,99,235,0.45)" },
  ];

  // Vidrio espejo translúcido: la cuadrícula y los glows se ven a través de la carta
  const face = (glow: string) => ({
    background: isDark
      ? "linear-gradient(160deg, rgba(255,255,255,0.10), transparent 45%), rgba(255,255,255,0.045)"
      : "linear-gradient(160deg, rgba(255,255,255,0.60), rgba(240,235,255,0.22) 50%), rgba(233,224,255,0.30)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.85)"}`,
    boxShadow: `inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.95)"}, 0 30px 70px -30px ${glow}`,
    backdropFilter: "blur(24px) saturate(160%)",
    WebkitBackdropFilter: "blur(24px) saturate(160%)",
  });
  const faceInk = isDark ? "#f5f3ff" : "#1f2937";
  const faceBody = isDark ? "rgba(245,243,255,0.72)" : "#4b5563";
  const faceMuted = isDark ? "rgba(245,243,255,0.50)" : "#6b7280";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#0a0618" : "#f0ebff", minHeight: "100svh" }}
    >
      {/* Cuadrícula */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px),
                            linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(110% 80% at 50% 40%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(110% 80% at 50% 40%, black 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: "-10%", top: "0%", width: "46vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(124,58,237,0.24)" : "rgba(124,58,237,0.14)"}, transparent 70%)`,
        }}
      />
      {/* Glow rosa para darle vida */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "-8%", bottom: "-12%", width: "42vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(236,72,153,0.20)" : "rgba(236,72,153,0.12)"}, transparent 70%)`,
        }}
      />

      <div className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 py-24 lg:py-20 z-10">

        <div className="co-title text-center max-w-2xl mx-auto mb-14">
          <h2
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: ink,
              marginBottom: 16,
            }}
          >
            Contraofertas en <span style={{ color: accent }}>tiempo real</span>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: body }}>
            Negocia directamente con quien contrata: propuestas con tiempo límite
            y respuestas al instante.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {OFFERS.map((offer, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            return (
            <div
              key={offer.title}
              className="co-card relative h-[320px] cursor-pointer"
              style={{ perspective: "1200px" }}
              onClick={flip}
            >
              {/* Cara: oferta */}
              <div
                className="co-front absolute inset-0 rounded-3xl p-6 flex flex-col"
                style={{ ...face(a.glow), transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="flex items-center justify-center rounded-2xl"
                    style={{
                      width: 44, height: 44,
                      background: a.grad,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 0 24px ${a.glow}`,
                    }}
                  >
                    <Zap size={20} color="#fff" fill="#fff" />
                  </span>
                  <div className="text-right">
                    <div style={{ fontSize: 11, color: faceMuted }}>Expira en</div>
                    <div className="co-timer font-mono" data-timer={offer.timer} style={{ fontSize: 17, fontWeight: 700, color: a.timer }}>
                      --:--:--
                    </div>
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display), system-ui, sans-serif",
                    fontWeight: 700, fontSize: 19, color: faceInk, marginBottom: 8,
                  }}
                >
                  {offer.title}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: faceBody }}>{offer.description}</p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: 22, fontWeight: 800, color: faceInk }}>{offer.price}</span>
                    <span
                      className="px-4 py-2 rounded-full text-[12.5px] font-bold text-white"
                      style={{ background: a.grad, boxShadow: `0 4px 16px ${a.glow}` }}
                    >
                      Ofertar
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5" style={{ fontSize: 11, color: faceMuted }}>
                    <ArrowLeftRight size={11} />
                    Toca para ver el cliente
                  </div>
                </div>
              </div>

              {/* Cara: cliente */}
              <div
                className="co-back absolute inset-0 rounded-3xl p-6 flex flex-col items-center text-center"
                style={{ ...face(a.glow), transformStyle: "preserve-3d", display: staticMode ? "none" : undefined }}
              >
                <span
                  className="flex items-center justify-center rounded-full mb-3 mt-2"
                  style={{
                    width: 64, height: 64,
                    background: a.grad,
                    border: "2px solid rgba(255,255,255,0.45)",
                    color: "#fff", fontSize: 20, fontWeight: 800,
                    fontFamily: "var(--font-display), system-ui, sans-serif",
                    boxShadow: `0 0 28px ${a.glow}`,
                  }}
                >
                  {offer.client.initials}
                </span>
                <h3 style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontWeight: 700, fontSize: 17, color: faceInk }}>
                  {offer.client.name}
                </h3>
                <p style={{ fontSize: 12.5, color: faceMuted, marginBottom: 16 }}>{offer.client.company}</p>

                <div className="w-full flex flex-col gap-2.5 mb-5">
                  <div className="flex items-center justify-between px-1">
                    <span style={{ fontSize: 13, color: faceMuted }}>Calificación</span>
                    <span className="flex items-center gap-1">
                      <Star size={13} fill="#facc15" color="#facc15" />
                      <span style={{ fontSize: 13, fontWeight: 700, color: faceInk }}>{offer.client.rating}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span style={{ fontSize: 13, color: faceMuted }}>Proyectos</span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} color={a.timer} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: faceInk }}>{offer.client.projects}</span>
                    </span>
                  </div>
                </div>

                <span
                  className="mt-auto w-full py-2.5 rounded-full text-[12.5px] font-bold"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.10)" : "rgba(124,58,237,0.08)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.28)" : "rgba(124,58,237,0.30)"}`,
                    color: isDark ? "#ffffff" : "#6d28d9",
                  }}
                >
                  Volver a la oferta
                </span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
