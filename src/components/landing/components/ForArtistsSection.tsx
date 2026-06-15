"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import {
  Heart, Bookmark, Share2, BadgeCheck, MapPin, Star, Briefcase, UserPlus,
  ShieldCheck, ArrowRight, Home, Compass, PlusCircle, User, Search,
  Calendar, Ticket, BrainCircuit, CalendarPlus,
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const BULLETS = [
  { Icon: Search, text: "Desliza entre artistas y eventos de tu ciudad, en tarjetas a pantalla completa" },
  { Icon: BrainCircuit, text: "Nuestra IA reúne toda la oferta cultural de la ciudad en un solo lugar" },
  { Icon: CalendarPlus, text: "¿Organizas? Publica tus propios eventos y recibe reservas" },
  { Icon: ShieldCheck, text: "Reserva y contrata siempre con el pago protegido" },
];

// Marco de teléfono reutilizable con barra de navegación de la app
function PhoneFrame({ children, isDark, className, style }: { children: ReactNode; isDark: boolean; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`relative w-[272px] h-[565px] rounded-[42px] p-2 ${className ?? ""}`}
      style={{
        background: "#0c0a14",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.9)"}`,
        boxShadow: isDark
          ? "0 50px 110px -35px rgba(124,58,237,0.55), 0 25px 60px -30px rgba(0,0,0,0.9)"
          : "0 50px 110px -40px rgba(124,58,237,0.45)",
        ...style,
      }}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-22 h-[20px] rounded-full bg-black z-30" style={{ width: 88 }} />
      <div className="relative w-full h-full rounded-[34px] overflow-hidden flex flex-col" style={{ background: "#0a0618" }}>
        <div className="relative flex-1 m-1.5 rounded-[26px] overflow-hidden">{children}</div>
        <div className="flex items-center justify-around px-4 pb-3 pt-1">
          <Home size={18} color="rgba(255,255,255,0.4)" />
          <Compass size={18} color="#a78bfa" />
          <PlusCircle size={22} color="rgba(255,255,255,0.85)" />
          <Heart size={18} color="rgba(255,255,255,0.4)" />
          <User size={18} color="rgba(255,255,255,0.4)" />
        </div>
      </div>
    </div>
  );
}

// Elementos compartidos de las tarjetas réplica
function CardChrome() {
  return (
    <>
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
        <span style={{ width: 4, height: 22, borderRadius: 3, background: "#fff" }} />
        <span style={{ width: 4, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.4)" }} />
        <span style={{ width: 4, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.4)" }} />
      </div>
      <div className="absolute right-3 top-[40%] -translate-y-1/2 flex flex-col items-center gap-4">
        <Heart size={22} fill="#f87171" color="#f87171" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }} />
        <Bookmark size={22} fill="#ffffff" color="#ffffff" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }} />
        <Share2 size={22} fill="#ffffff" color="#ffffff" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }} />
      </div>
    </>
  );
}

const tagChip = { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.30)" };
const glassBtn = { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)" };
const gradBtn = { background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 4px 16px rgba(124,58,237,0.55)" };

export default function ForArtistsSection() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

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

      gs.set(".showcase-copy", { x: -70, opacity: 0 });
      gs.set(".showcase-phone-a", { y: 150, rotate: 7, opacity: 0 });
      gs.set(".showcase-phone-b", { y: 190, rotate: -6, opacity: 0 });
      gs.set(".showcase-chip", { scale: 0, opacity: 0 });

      const tl = gs.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 10%",
          scrub: 1,
          invalidateOnRefresh: true,
          id: "showcaseSection",
        },
      });

      tl.to(".showcase-copy", { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.to(".showcase-phone-a", { y: 0, rotate: -3, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.15);
      tl.to(".showcase-phone-b", { y: 0, rotate: 4, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.35);
      tl.to(".showcase-chip", { scale: 1, opacity: 1, duration: 0.35, stagger: 0.18, ease: "back.out(1.8)" }, 0.95);

      cleanup = () => {
        try { (ST as any).getById?.("showcaseSection")?.kill?.(); } catch {}
        tl.kill();
      };
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

  const floatChip = {
    background: isDark ? "rgba(17,11,38,0.72)" : "rgba(255,255,255,0.78)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.95)"}`,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: isDark
      ? "0 16px 40px -16px rgba(124,58,237,0.45)"
      : "0 16px 40px -18px rgba(124,58,237,0.35)",
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden transition-colors duration-300"
      style={{
        // Fondo propio de esta sección: degradado profundo sin cuadrícula
        background: isDark
          ? "linear-gradient(175deg, #0a0618 0%, #170d33 45%, #0a0618 100%)"
          : "linear-gradient(175deg, #f0ebff 0%, #e3d7ff 45%, #f0ebff 100%)",
      }}
    >
      {/* Glows cruzados */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: "-6%", top: "6%", width: "48vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(124,58,237,0.30)" : "rgba(124,58,237,0.18)"}, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "-10%", bottom: "-8%", width: "42vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(37,99,235,0.22)" : "rgba(37,99,235,0.12)"}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 py-24 lg:py-28 z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-6 items-center">

          {/* Texto */}
          <div className="showcase-copy">
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
              Así se ve <span style={{ color: accent }}>explorar.</span>
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: body, maxWidth: "46ch", marginBottom: 30 }}>
              Artistas y eventos de frente: su trabajo, su tarifa y su fecha
              en tarjetas a pantalla completa.
            </p>

            <div className="flex flex-col gap-4 mb-9">
              {BULLETS.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  {/* Cápsula con gradiente de marca */}
                  <span
                    className="relative flex items-center justify-center rounded-2xl shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 22px -10px ${isDark ? "rgba(124,58,237,0.65)" : "rgba(124,58,237,0.5)"}`,
                      color: "#ffffff",
                    }}
                  >
                    <Icon size={19} strokeWidth={2.2} />
                  </span>
                  <span style={{ fontSize: 15, lineHeight: 1.5, color: body }}>{text}</span>
                </div>
              ))}
            </div>

            <a
              href="/explorar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={
                isDark
                  ? { background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.28)" }
                  : { background: "linear-gradient(135deg, #7c3aed, #2563eb)", boxShadow: "0 12px 32px -12px rgba(124,58,237,0.55)" }
              }
            >
              Explorar talento
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Dúo de teléfonos: artista + evento */}
          <div className="relative flex justify-center items-center">

            {/* Chips flotantes */}
            <div className="showcase-chip hidden xl:flex absolute -left-8 top-10 items-center gap-2.5 px-4 py-3 rounded-2xl z-30" style={floatChip}>
              <MapPin size={17} style={{ color: accent }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: ink }}>Cerca de ti</div>
                <div style={{ fontSize: 11, color: body }}>Bogotá · a 2,4 km</div>
              </div>
            </div>
            <div className="showcase-chip hidden xl:flex absolute -left-14 bottom-24 items-center gap-2.5 px-4 py-3 rounded-2xl z-30" style={floatChip}>
              <ShieldCheck size={17} style={{ color: "#10b981" }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: ink }}>Pago protegido</div>
                <div style={{ fontSize: 11, color: body }}>Mercado Pago</div>
              </div>
            </div>
            <div className="showcase-chip hidden xl:flex absolute -right-6 top-24 items-center gap-2.5 px-4 py-3 rounded-2xl z-30" style={floatChip}>
              <BrainCircuit size={17} style={{ color: accent }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: ink }}>Agenda con IA</div>
                <div style={{ fontSize: 11, color: body }}>Toda la ciudad, un lugar</div>
              </div>
            </div>

            {/* Teléfono A: explorar artistas */}
            <PhoneFrame isDark={isDark} className="showcase-phone-a z-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/artistastop/bailarina.webp" alt="Perfil de artista en BuscArt" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
              <CardChrome />
              <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[16px] font-bold text-white truncate">Valentina Rojas</span>
                  <span className="w-[15px] h-[15px] rounded-full bg-[#7c3aed] flex items-center justify-center shrink-0">
                    <BadgeCheck size={9} color="#fff" />
                  </span>
                  <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold text-white shrink-0" style={{ border: "1px solid rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.15)" }}>
                    <UserPlus size={9} color="#fff" />
                    Seguir
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <Star size={10} fill="#facc15" color="#facc15" />
                  <span className="text-[10px] font-bold text-white">4.9</span>
                  <span className="text-white/40 text-[10px]">·</span>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.18)", border: "1px solid rgba(16,185,129,0.4)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
                    <span className="text-[9px] font-semibold" style={{ color: "#34d399" }}>Disponible</span>
                  </span>
                  <span className="text-white/40 text-[10px]">·</span>
                  <MapPin size={10} color="rgba(255,255,255,0.8)" />
                  <span className="text-[10px] text-white/80">Bogotá, 2,4 km</span>
                </div>
                <p className="text-[11px] text-white/85 leading-snug mb-2.5">
                  Danza contemporánea para eventos, video y escena en vivo.
                </p>
                <div className="flex gap-1.5 mb-3">
                  {["Danza", "Contemporáneo"].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-white" style={tagChip}>{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <span className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl" style={glassBtn}>
                    <span className="text-white/70 text-[9px] font-medium">desde</span>
                    <span className="text-white text-[10px] font-bold">$450.000</span>
                  </span>
                  <span className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-white text-[10px] font-bold" style={gradBtn}>
                    <Briefcase size={11} color="#fff" />
                    Contratar
                  </span>
                </div>
              </div>
            </PhoneFrame>

            {/* Teléfono B: tarjeta de evento */}
            <PhoneFrame isDark={isDark} className="showcase-phone-b z-10 hidden sm:block -ml-16 mt-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/artistastop/evento.webp" alt="Evento cultural en BuscArt" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
              <CardChrome />
              <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-4">
                <span className="text-[16px] font-bold text-white block mb-1 truncate">Jazz al Parque</span>
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <Calendar size={10} color="rgba(255,255,255,0.7)" />
                  <span className="text-[10px] font-semibold text-white/85">Sáb 21 jun · 7:00 PM</span>
                  <span className="text-white/40 text-[10px]">·</span>
                  <MapPin size={10} color="rgba(255,255,255,0.8)" />
                  <span className="text-[10px] text-white/80">Bogotá</span>
                </div>
                <p className="text-[11px] text-white/85 leading-snug mb-2.5">
                  Festival con bandas en vivo y entrada libre al parque.
                </p>
                <div className="flex gap-1.5 mb-3">
                  {["Música", "Festival"].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-white" style={tagChip}>{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <span className="flex-1 flex items-center justify-center py-2 rounded-xl" style={glassBtn}>
                    <span className="text-white/80 text-[10px] font-semibold">Gratis</span>
                  </span>
                  <span className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-white text-[10px] font-bold" style={gradBtn}>
                    <Ticket size={11} color="#fff" />
                    Reservar
                  </span>
                </div>
              </div>
            </PhoneFrame>
          </div>

        </div>
      </div>
    </section>
  );
}
