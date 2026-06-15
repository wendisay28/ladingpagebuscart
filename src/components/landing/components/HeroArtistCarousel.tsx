"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Bookmark, Heart, BadgeCheck } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

interface Item {
  id: string;
  name: string;
  category: string;
  location: string;
  tagline: string;
  image: string;
  verified: boolean;
}

const ITEMS: Item[] = [
  {
    id: "1",
    name: "Valentina Rojas",
    category: "Danza",
    location: "Bogotá, Colombia",
    tagline: "Danza contemporánea en escena",
    image: "/artistastop/bailarina.webp",
    verified: true,
  },
  {
    id: "2",
    name: "Festival en vivo",
    category: "Evento",
    location: "Cali, Colombia",
    tagline: "Música en vivo para toda la ciudad",
    image: "/artistastop/evento.webp",
    verified: false,
  },
  {
    id: "3",
    name: "Javier Ramírez",
    category: "Música",
    location: "Medellín, Colombia",
    tagline: "DJ & productor",
    image: "/artistastop/djs.jpg",
    verified: true,
  },
];

export default function HeroArtistCarousel() {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const next = () => setCurrent((i) => (i + 1) % ITEMS.length);
  const prev = () => setCurrent((i) => (i - 1 + ITEMS.length) % ITEMS.length);

  // Autoplay (respeta reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  const ghost = {
    background: isDark ? "rgba(255,255,255,0.10)" : "rgba(124,58,237,0.08)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(124,58,237,0.22)"}`,
    color: isDark ? "rgba(255,255,255,0.85)" : "#6d28d9",
  };

  return (
    <div className="relative">
      {/* Tres tarjetas: la central resalta, las laterales asoman a los costados */}
      <div className="relative w-[19rem] sm:w-[23rem] h-[28rem] sm:h-[31rem]">
        {ITEMS.map((item, index) => {
          const pos = (index - current + ITEMS.length) % ITEMS.length;
          const active = pos === 0;
          // pos 0 = centro · 1 = derecha · ITEMS.length-1 = izquierda · resto oculto
          const x = pos === 1 ? 112 : pos === ITEMS.length - 1 ? -112 : 0;
          const visible = active || pos === 1 || pos === ITEMS.length - 1;
          return (
            <div
              key={item.id}
              className="absolute inset-0 rounded-[28px] overflow-hidden transition-all duration-700 ease-out"
              style={{
                opacity: visible ? (active ? 1 : 0.45) : 0,
                transform: `translateX(${x}px) scale(${active ? 1 : 0.85})`,
                zIndex: active ? 30 : visible ? 20 : 10,
                pointerEvents: active ? "auto" : "none",
                boxShadow: active
                  ? "0 30px 80px -24px rgba(124,58,237,0.45), 0 0 0 1px rgba(255,255,255,0.35)"
                  : "0 20px 50px -24px rgba(30,27,75,0.35)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />

              {/* Overlay oscuro inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/30 to-transparent" />

              {/* Píldora de categoría */}
              <div className="absolute top-5 left-5">
                <span
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                  style={{
                    background: "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.30)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Guardar + Favorito */}
              <div className="absolute top-5 right-5 flex flex-col gap-2.5">
                <button
                  onClick={() => setSaved((s) => ({ ...s, [item.id]: !s[item.id] }))}
                  aria-label="Guardar"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <Bookmark className="w-[18px] h-[18px]" fill={saved[item.id] ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => setFavs((f) => ({ ...f, [item.id]: !f[item.id] }))}
                  aria-label="Favorito"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: favs[item.id] ? "#fb7185" : "#ffffff",
                  }}
                >
                  <Heart className="w-[18px] h-[18px]" fill={favs[item.id] ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Información */}
              <div className="absolute inset-x-4 bottom-4">
                <div
                  className="rounded-3xl px-5 py-5"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white leading-tight">{item.name}</h3>
                    {item.verified && <BadgeCheck className="w-5 h-5 text-[#a78bfa] shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-white/85 text-sm">{item.tagline}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles: chevrons mini + puntos */}
      <div className="flex items-center justify-center gap-4 mt-3.5">
        <button
          onClick={prev}
          aria-label="Anterior"
          className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={ghost}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          {ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Ir a la tarjeta ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${index === current ? "w-7" : "w-2"}`}
              style={{
                background:
                  index === current
                    ? isDark ? "#ffffff" : "#7c3aed"
                    : isDark ? "rgba(255,255,255,0.30)" : "rgba(124,58,237,0.25)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Siguiente"
          className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={ghost}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
