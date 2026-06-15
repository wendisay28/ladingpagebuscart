"use client";
import { MapPin, Zap, Video, BadgeCheck, CalendarDays, Palette, Building2, Landmark, Target } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";

const CARDS = [
  {
    icon: MapPin,
    title: "Descubrimiento geolocalizado",
    description: "Encuentra talento, eventos y espacios cerca de ti, en tiempo real.",
    wide: true,
    radar: true,
  },
  {
    icon: Zap,
    title: "Contratación directa",
    description: "Conecta y cierra acuerdos sin intermediarios ni fricción.",
  },
  {
    icon: Video,
    title: "Portafolios inmersivos",
    description: "Fotos, videos y trabajos reales para decidir con confianza.",
  },
  {
    icon: BadgeCheck,
    title: "Perfiles verificados",
    description: "Identidad y reputación validadas para contratar con seguridad.",
  },
  {
    icon: CalendarDays,
    title: "Agenda cultural integrada",
    description: "Eventos y programación cultural conectados en un solo lugar.",
  },
];

const ECOSYSTEM_ICONS = [Palette, CalendarDays, Building2, Landmark, Target];

export default function BenefitsSection() {
  const { isDark } = useTheme();
  const reduced = useReducedMotion();

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

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      className="relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#0a0618" : "#f0ebff" }}
    >
      {/* Cuadrícula de marca */}
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
          left: "-12%", top: "10%", width: "44vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(124,58,237,0.24)" : "rgba(124,58,237,0.14)"}, transparent 70%)`,
        }}
      />
      {/* Glow rosa para darle vida */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: "-10%", bottom: "-10%", width: "40vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(236,72,153,0.18)" : "rgba(236,72,153,0.11)"}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 py-24 lg:py-28 z-10">

        <motion.div {...rise(0)} className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
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
            ¿Por qué <span style={{ color: accent }}>BuscArt</span>?
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: body }}>
            La infraestructura cultural diseñada para que conectar talento sea
            simple, seguro y rápido.
          </p>
        </motion.div>

        {/* Bento */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map(({ icon: Icon, title, description, wide, radar }, i) => (
            <motion.div
              key={title}
              {...rise(0.08 + i * 0.08)}
              whileHover={reduced ? undefined : { y: -5 }}
              className={`relative overflow-hidden rounded-3xl p-7 ${wide ? "sm:col-span-2" : ""}`}
              style={glass}
            >
              {/* Radar decorativo en la tarjeta ancha */}
              {radar && (
                <div aria-hidden className="absolute -right-10 -top-10 w-56 h-56 pointer-events-none hidden sm:block">
                  {[88, 150, 212].map((size, r) => (
                    <span
                      key={r}
                      className="absolute rounded-full"
                      style={{
                        width: size, height: size,
                        right: 56 - size / 2 + 44, top: 56 - size / 2 + 44,
                        border: `1px solid ${isDark ? `rgba(167,139,250,${0.35 - r * 0.1})` : `rgba(124,58,237,${0.28 - r * 0.08})`}`,
                      }}
                    />
                  ))}
                  <span
                    className="absolute rounded-full"
                    style={{ width: 10, height: 10, right: 95, top: 95, background: accent, boxShadow: `0 0 16px ${accent}` }}
                  />
                </div>
              )}

              <span
                className="relative flex items-center justify-center rounded-2xl mb-6"
                style={{
                  width: 46,
                  height: 46,
                  // Alternancia violeta / rosa para darle vida al grid
                  background: i % 3 === 1
                    ? "linear-gradient(135deg, #ec4899, #9333ea)"
                    : "linear-gradient(135deg, #7c3aed, #2563eb)",
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 22px -10px ${
                    i % 3 === 1
                      ? isDark ? "rgba(236,72,153,0.65)" : "rgba(236,72,153,0.5)"
                      : isDark ? "rgba(124,58,237,0.65)" : "rgba(124,58,237,0.5)"
                  }`,
                  color: "#ffffff",
                }}
              >
                <Icon size={20} strokeWidth={2} />
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: ink,
                  marginBottom: 8,
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: body, maxWidth: wide ? "52ch" : undefined }}>
                {description}
              </p>
            </motion.div>
          ))}

          {/* Tira final: ecosistema conectado (puente hacia el cierre) */}
          <motion.div
            {...rise(0.5)}
            className="sm:col-span-2 lg:col-span-3 rounded-3xl px-7 py-6 flex flex-col sm:flex-row items-center gap-5 justify-between"
            style={glass}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: ink,
                  marginBottom: 4,
                }}
              >
                Ecosistema conectado
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: body }}>
                Artistas, eventos, empresas, espacios y oportunidades en una misma red.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {ECOSYSTEM_ICONS.map((Icon, i) => (
                <span
                  key={i}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 38,
                    height: 38,
                    background: isDark ? "rgba(167,139,250,0.14)" : "rgba(124,58,237,0.10)",
                    border: `1px solid ${isDark ? "rgba(167,139,250,0.30)" : "rgba(124,58,237,0.22)"}`,
                    color: accent,
                  }}
                >
                  <Icon size={17} />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
