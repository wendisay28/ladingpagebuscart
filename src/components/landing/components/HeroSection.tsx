"use client";
import { useEffect } from "react";
import { ShieldCheck, BadgeCheck, MapPin } from "lucide-react";
import HeroArtistCarousel from "./HeroArtistCarousel";
import { useTheme } from "../../../context/ThemeContext";

const FACTS = [
  { Icon: BadgeCheck, text: "0% comisión para artistas en el lanzamiento" },
  { Icon: ShieldCheck, text: "Pagos protegidos con Mercado Pago" },
  { Icon: MapPin, text: "Bogotá · Medellín · Cali" },
];

export default function HeroSection() {
  const { isDark } = useTheme();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes hero-card-in {
        from { opacity: 0; transform: translateY(36px) scale(0.985); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes hero-glow-drift {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(4%, -5%); }
      }
      @keyframes hero-pulse-dot {
        0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.55); }
        70% { box-shadow: 0 0 0 9px rgba(167,139,250,0); }
      }
      @keyframes hero-marquee-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .hero-card-in { animation: hero-card-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
      .hero-glow { animation: hero-glow-drift 14s ease-in-out infinite; }
      .hero-dot { animation: hero-pulse-dot 2.4s ease-out infinite; }
      .hero-marquee { animation: hero-marquee-scroll 32s linear infinite; }

      .hero-cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 15px 32px;
        border-radius: 999px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s, box-shadow 0.2s;
        ${isDark
          ? `background: rgba(255,255,255,0.10);
             border: 1px solid rgba(255,255,255,0.28);
             color: #ffffff;`
          : `background: linear-gradient(135deg, #7c3aed, #2563eb);
             border: 1px solid transparent;
             color: #ffffff;
             box-shadow: 0 12px 32px -12px rgba(124,58,237,0.55);`}
      }
      .hero-cta-primary:hover {
        transform: translateY(-2px);
        ${isDark ? `background: rgba(255,255,255,0.16);` : `box-shadow: 0 16px 40px -12px rgba(124,58,237,0.65);`}
      }
      .hero-cta-outline {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 15px 28px;
        border-radius: 999px;
        background: transparent;
        border: 1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(124,58,237,0.35)"};
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        color: ${isDark ? "#c4b5fd" : "#6d28d9"};
        transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s, border-color 0.2s;
      }
      .hero-cta-outline:hover {
        transform: translateY(-2px);
        background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(124,58,237,0.07)"};
        border-color: ${isDark ? "rgba(255,255,255,0.35)" : "rgba(124,58,237,0.55)"};
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-card-in, .hero-glow, .hero-dot, .hero-marquee { animation: none; opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [isDark]);

  const ink = isDark ? "#f5f3ff" : "#1f2937";
  const accent = isDark ? "#a78bfa" : "#6d28d9";
  const body = isDark ? "#b9b3cf" : "#4b5563";
  const gridLine = isDark ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.12)";

  return (
    <section
      className="relative overflow-hidden flex items-center transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#0a0618" : "#f0ebff", minHeight: "100svh" }}
    >
      {/* Fondo en cuadrícula */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px),
                            linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(120% 90% at 50% 40%, black 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 40%, black 55%, transparent 100%)",
        }}
      />
      {/* Glows de color sobre la cuadrícula */}
      <div
        aria-hidden
        className="hero-glow absolute pointer-events-none"
        style={{
          left: "-10%", top: "10%", width: "44vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(124,58,237,0.30)" : "rgba(124,58,237,0.18)"}, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="hero-glow absolute pointer-events-none"
        style={{
          right: "-8%", bottom: "0%", width: "40vw", aspectRatio: "1",
          animationDelay: "-7s",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(37,99,235,0.26)" : "rgba(37,99,235,0.14)"}, transparent 70%)`,
        }}
      />

      <div className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-6 pt-24 pb-10 lg:pt-24 lg:pb-12 z-10">

        {/* Card grande del hero */}
        <div
          className="hero-card-in grid lg:grid-cols-[0.95fr_1.05fr] overflow-hidden"
          style={{
            borderRadius: 28,
            border: `1px solid ${isDark ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.75)"}`,
            // Vidrio: tintes translúcidos + sheen de espejo; el blur deja ver la cuadrícula
            background: isDark
              ? `linear-gradient(160deg, rgba(255,255,255,0.10), transparent 45%),
                 rgba(255,255,255,0.045)`
              : `linear-gradient(160deg, rgba(255,255,255,0.45), rgba(240,235,255,0.18) 48%),
                 linear-gradient(120deg, rgba(233,224,255,0.35), rgba(224,213,255,0.25) 55%, rgba(219,206,255,0.30))`,
            backdropFilter: "blur(22px) saturate(150%)",
            WebkitBackdropFilter: "blur(22px) saturate(150%)",
            boxShadow: isDark
              ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 40px 100px -30px rgba(124,58,237,0.35), 0 20px 60px -30px rgba(0,0,0,0.8)"
              : "inset 0 1px 0 rgba(255,255,255,0.95), 0 40px 100px -40px rgba(124,58,237,0.30)",
          }}
        >
          {/* Contenido */}
          <div className="p-8 pb-10 sm:p-11 sm:pb-12 lg:p-12 lg:pb-14 lg:pr-8 flex flex-col justify-center order-2 lg:order-1">

            {/* Chip de vidrio, misma familia que nav y card */}
            <div
              className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full self-start"
              style={{
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.55)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.85)"}`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span className="hero-dot inline-block rounded-full" style={{ width: 7, height: 7, background: accent }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", color: isDark ? "#c4b5fd" : "#6d28d9" }}>
                ECOSISTEMA CULTURAL
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: ink,
                margin: 0,
              }}
            >
              <span style={{ display: "block", fontSize: "clamp(2.9rem, 5vw, 4.4rem)", lineHeight: 0.98, textTransform: "uppercase" }}>
                Busca,
              </span>
              <span style={{ display: "block", fontSize: "clamp(2.9rem, 5vw, 4.4rem)", lineHeight: 0.98, textTransform: "uppercase", marginTop: 6 }}>
                Compara
              </span>
              <span style={{ display: "block", fontSize: "clamp(1.45rem, 2.3vw, 1.95rem)", lineHeight: 1.2, fontWeight: 700, marginTop: 14 }}>
                y contrata <span style={{ color: accent }}>arte cerca de ti.</span>
              </span>
            </h1>

            {/* Divisor corto */}
            <span
              aria-hidden
              style={{
                display: "block",
                width: 56,
                height: 3,
                borderRadius: 99,
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                margin: "26px 0 18px",
              }}
            />

            <p style={{ fontSize: 16, lineHeight: 1.7, color: body, maxWidth: "42ch", marginBottom: 32 }}>
              Descubre artistas, eventos, espacios culturales y oportunidades desde una
              experiencia diseñada para conectar talento con quienes lo necesitan.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a href="/explorar">
                <button className="hero-cta-primary">Explorar talento</button>
              </a>
              <a href="/register">
                <button className="hero-cta-outline">
                  Crear perfil gratis
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </a>
            </div>

          </div>

          {/* Escenario gráfico: luz, categorías flotando y ecualizador */}
          <div
            className="relative order-1 lg:order-2 min-h-[300px] sm:min-h-[380px] lg:min-h-0 overflow-hidden"
            style={{
              background: isDark
                ? "radial-gradient(110% 80% at 50% -10%, rgba(167,139,250,0.35), transparent 55%), linear-gradient(160deg, #1c1040, #0a0618 75%)"
                : "transparent",
            }}
          >
            {/* Haz de luz central (solo en oscuro) */}
            {isDark && (
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  left: "50%", top: "-20%", width: "70%", aspectRatio: "1",
                  transform: "translateX(-50%)",
                  background: "radial-gradient(closest-side, rgba(255,255,255,0.16), transparent 70%)",
                }}
              />
            )}

            {/* Carrusel de artistas encima del escenario */}
            <div className="relative z-10 h-full flex items-center justify-center px-2 py-4">
              <HeroArtistCarousel />
            </div>

          </div>
        </div>

        {/* Marquesina de hechos, por fuera de la tarjeta */}
        <div
          className="mt-7 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="hero-marquee flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center gap-12 pr-12" aria-hidden={half === 1}>
                {[...FACTS, ...FACTS].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-2.5 shrink-0">
                    <Icon size={15} style={{ color: accent }} />
                    <span style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", color: body }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
