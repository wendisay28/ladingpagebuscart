import { useEffect, useState } from "react";
import HeroArtistCarousel from "./HeroArtistCarousel";
import { useTheme } from "../../../context/ThemeContext";

export default function HeroSection() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.9s ease-out forwards;
      }
      .btn-primary-hero {
        background: ${isDark ? "#ffffff" : "#111827"};
        color: ${isDark ? "#111827" : "#fff"};
        border: none;
        border-radius: 6px;
        padding: 14px 32px;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: background 0.15s, opacity 0.15s;
        font-family: inherit;
      }
      .btn-primary-hero:hover { background: ${isDark ? "#e5e7eb" : "#1f2937"}; }
      .btn-ghost-hero {
        background: transparent;
        color: ${isDark ? "#c4b5fd" : "#7c3aed"};
        border: none;
        border-bottom: 1px solid ${isDark ? "rgba(196,181,253,0.5)" : "#c4b5fd"};
        border-radius: 0;
        padding: 14px 0;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.04em;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: inherit;
        transition: color 0.15s;
      }
      .btn-ghost-hero:hover { color: ${isDark ? "#a78bfa" : "#6d28d9"}; }
    `;
    document.head.appendChild(style);
    setIsVisible(true);
    return () => { document.head.removeChild(style); };
  }, [isDark]);

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#0a0618" : "#ffffff" }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-20 lg:py-0" style={{ gap: "0" }}>

          {/* LEFT — 58% */}
          <div
            className={`w-full lg:w-[58%] ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ paddingRight: "clamp(32px, 5vw, 72px)" }}
          >

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div style={{ width: 32, height: 1, background: "#7c3aed", flexShrink: 0 }} />
              <span style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7c3aed",
              }}>
                Ecosistema cultural
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(36px, 4.5vw, 54px)",
                fontWeight: 400,
                lineHeight: 1.08,
                color: isDark ? "#f9fafb" : "#111827",
                letterSpacing: "-0.025em",
                marginBottom: 6,
              }}
            >
              Busca, compara y
            </h1>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(36px, 4.5vw, 54px)",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.08,
                color: "#7c3aed",
                letterSpacing: "-0.025em",
                marginBottom: 28,
              }}
            >
              contrata arte cerca de ti.
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 15,
              lineHeight: 1.7,
              color: isDark ? "#9ca3af" : "#6b7280",
              maxWidth: 400,
              marginBottom: 44,
            }}>
              Descubre artistas, eventos, espacios culturales y oportunidades desde una
              experiencia diseñada para conectar talento con quienes lo necesitan.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-5 flex-wrap">
              <a href="/explorar">
                <button className="btn-primary-hero">Explorar talento</button>
              </a>
              <a href="/register">
                <button className="btn-ghost-hero">
                  Crear perfil gratis
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </a>
            </div>

          </div>

          {/* RIGHT — 42% */}
          <div
            className={`w-full lg:w-[42%] flex items-center justify-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            <HeroArtistCarousel />
          </div>

        </div>
      </div>
    </section>
  );
}