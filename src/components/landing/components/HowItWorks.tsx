"use client";
import { useEffect, useRef, useState } from "react";
import { Palette, Building2, Ticket, Landmark, ArrowRight } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const ROLES = [
  {
    Icon: Palette,
    title: "Artista",
    text: "Crea tu perfil, muestra tu portafolio y recibe contratos.",
    cta: "Crear perfil de artista",
    href: "/register",
    image: "/artistastop/bailarina.webp",
    alt: "Bailarina contemporánea en escena",
  },
  {
    Icon: Building2,
    title: "Empresa",
    text: "Encuentra y contrata talento verificado para tus eventos y campañas.",
    cta: "Buscar talento",
    href: "/explorar",
    image: "/artistastop/fotografo.jpg",
    alt: "Fotógrafo profesional en producción",
  },
  {
    Icon: Ticket,
    title: "Organizador",
    text: "Publica tu evento y recibe propuestas de artistas.",
    cta: "Publicar un evento",
    href: "/register",
    image: "/artistastop/evento.webp",
    alt: "Concierto en vivo con público",
  },
  {
    Icon: Landmark,
    title: "Espacio cultural",
    text: "Da a conocer tu espacio y programa tu agenda cultural.",
    cta: "Publicar mi espacio",
    href: "/register",
    image: "/Medellin/PalaciodeBellasArtes.jpeg",
    alt: "Palacio de Bellas Artes de Medellín",
  },
];

export default function HowItWorks() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Entrada lateral alternada atada al scroll (sin pin: fórmula distinta a "Cómo funciona")
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

      gs.set(".roles-title", { x: -70, opacity: 0 });
      const panels = gs.utils.toArray(".roles-panel");
      panels.forEach((p: any, i: number) => gs.set(p, { x: i % 2 === 0 ? -90 : 90, y: 70, opacity: 0 }));

      const tl = gs.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 15%",
          scrub: 1,
          invalidateOnRefresh: true,
          id: "rolesSection",
        },
      });

      tl.to(".roles-title", { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
      panels.forEach((p: any, i: number) => {
        tl.to(p, { x: 0, y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.25 + i * 0.35);
      });

      cleanup = () => {
        try { (ST as any).getById?.("rolesSection")?.kill?.(); } catch {}
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
  const gridLine = isDark ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.12)";

  return (
    <section
      ref={sectionRef}
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
          maskImage: "radial-gradient(110% 80% at 50% 50%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(110% 80% at 50% 50%, black 50%, transparent 100%)",
        }}
      />
      {/* Glow lateral */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: "-14%", top: "20%", width: "46vw", aspectRatio: "1",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.10)"}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 py-24 lg:py-28 z-10">

        {/* Encabezado */}
        <div className="roles-title max-w-2xl mb-12 lg:mb-14">
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
            ¿Cuál eres <span style={{ color: accent }}>tú?</span>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: body, maxWidth: "52ch" }}>
            Artistas, empresas, organizadores y espacios culturales: cada rol
            tiene su lugar en el ecosistema.
          </p>
        </div>

        {/* Acordeón de roles */}
        <div className="flex flex-col lg:flex-row gap-4 h-[720px] lg:h-[520px]">
          {ROLES.map(({ Icon, title, text, cta, href, image, alt }, i) => {
            const isActive = active === i;
            return (
              <article
                key={title}
                className="roles-panel relative overflow-hidden rounded-3xl cursor-pointer"
                style={{
                  flex: isActive ? 3 : 1,
                  transition: "flex 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.75)"}`,
                  boxShadow: isActive
                    ? "0 30px 80px -28px rgba(124,58,237,0.45)"
                    : "0 20px 50px -28px rgba(30,27,75,0.35)",
                }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                    filter: isActive ? "none" : "saturate(0.7) brightness(0.85)",
                  }}
                />
                {/* Velo */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(10,6,24,0.88) 0%, rgba(10,6,24,0.30) 45%, rgba(10,6,24,0.10) 100%)"
                      : "linear-gradient(to top, rgba(10,6,24,0.85) 0%, rgba(30,27,75,0.45) 60%, rgba(30,27,75,0.30) 100%)",
                    transition: "background 0.5s",
                  }}
                />

                {/* Icono */}
                <div className="absolute top-5 left-5">
                  <span
                    className="flex items-center justify-center rounded-2xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.30)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      color: "#ffffff",
                    }}
                  >
                    <Icon size={20} />
                  </span>
                </div>

                {/* Contenido inferior */}
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <h3
                    style={{
                      fontFamily: "var(--font-display), system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: isActive ? 24 : 19,
                      lineHeight: 1.15,
                      color: "#ffffff",
                      transition: "font-size 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      textWrap: "balance",
                    }}
                  >
                    {title}
                  </h3>

                  {/* Descripción + CTA solo en el panel activo */}
                  <div
                    style={{
                      maxHeight: isActive ? 160 : 0,
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(12px)",
                      overflow: "hidden",
                      transition: "max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s 0.12s, transform 0.55s 0.1s",
                    }}
                  >
                    <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.82)", marginTop: 10, maxWidth: "38ch" }}>
                      {text}
                    </p>
                    <a
                      href={href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-4 text-[14px] font-semibold group/cta"
                      style={{ color: "#ffffff" }}
                    >
                      <span
                        className="px-4 py-2 rounded-full inline-flex items-center gap-2 transition-transform duration-200 group-hover/cta:-translate-y-0.5"
                        style={{
                          background: "rgba(255,255,255,0.14)",
                          border: "1px solid rgba(255,255,255,0.32)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                        }}
                      >
                        {cta}
                        <ArrowRight size={15} />
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
