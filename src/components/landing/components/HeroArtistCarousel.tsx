"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Bookmark, Heart, BadgeCheck } from "lucide-react";

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
    tagline: "Bailarina contemporánea",
    image: "/artistastop/bailarina.jpg",
    verified: true,
  },
  {
    id: "2",
    name: "María González",
    category: "Música",
    location: "Medellín, Colombia",
    tagline: "Cantante de boleros",
    image: "/artistastop/modelo.jpg",
    verified: true,
  },
  {
    id: "3",
    name: "Carlos Martínez",
    category: "Música",
    location: "Medellín, Colombia",
    tagline: "Pianista profesional",
    image: "/artistastop/pianista.png",
    verified: false,
  },
  {
    id: "4",
    name: "Javier Ramírez",
    category: "Evento",
    location: "Cali, Colombia",
    tagline: "DJ & productor",
    image: "/artistastop/djs.jpg",
    verified: true,
  },
];

export default function HeroArtistCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const nextCard = () => setCurrentIndex((i) => (i === ITEMS.length - 1 ? 0 : i + 1));
  const prevCard = () => setCurrentIndex((i) => (i === 0 ? ITEMS.length - 1 : i - 1));

  const getCardPosition = (index: number) => {
    const positions = ["center", "right", "hidden", "left"];
    const relativeIndex = (index - currentIndex + ITEMS.length) % ITEMS.length;
    return positions[relativeIndex] || "hidden";
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[520px] lg:h-[560px] overflow-visible" style={{ perspective: "1500px" }}>
        <div className="flex items-center justify-center h-full">
          <div className="relative w-80 h-[30rem]">
            {ITEMS.map((item, index) => {
              const position = getCardPosition(index);
              let transformStyle = "";
              let zIndex = 1;
              let opacity = 0.4;

              if (position === "center") {
                transformStyle = "translateX(0) scale(1) translateZ(0)";
                zIndex = 10;
                opacity = 1;
              } else if (position === "left") {
                transformStyle = "translateX(-78px) scale(0.86) rotateY(20deg) translateZ(-90px)";
                zIndex = 5;
                opacity = 0.5;
              } else if (position === "right") {
                transformStyle = "translateX(78px) scale(0.86) rotateY(-20deg) translateZ(-90px)";
                zIndex = 5;
                opacity = 0.5;
              } else {
                transformStyle = "translateX(0) scale(0.7) translateZ(-180px)";
                zIndex = 1;
                opacity = 0.2;
              }

              const isCenter = position === "center";

              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: `translate(-50%, -50%) ${transformStyle}`,
                    zIndex,
                    opacity,
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div
                    className="relative w-80 h-[30rem] rounded-[28px] overflow-hidden"
                    style={{
                      boxShadow: isCenter
                        ? "0 30px 80px -20px rgba(124,58,237,0.45), 0 0 0 1px rgba(255,255,255,0.5)"
                        : "0 20px 50px -20px rgba(30,27,75,0.35), 0 0 0 1px rgba(255,255,255,0.4)",
                    }}
                  >
                    {/* Imagen */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Overlay oscuro inferior */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/30 to-transparent" />
                    {/* Glow violeta sutil superior */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "radial-gradient(120% 70% at 50% 0%, rgba(124,58,237,0.20), transparent 55%)" }}
                    />

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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSaved((s) => ({ ...s, [item.id]: !s[item.id] }));
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setFavs((f) => ({ ...f, [item.id]: !f[item.id] }));
                        }}
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

                    {/* Información (panel glass) */}
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
                </div>
              );
            })}
          </div>

          {/* Navegación */}
          <button
            onClick={prevCard}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#7c3aed]/10 hover:bg-[#7c3aed]/25 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110 z-30 group border border-[#e9d5ff]"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-[#7c3aed]" />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#7c3aed]/10 hover:bg-[#7c3aed]/25 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110 z-30 group border border-[#e9d5ff]"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 text-[#7c3aed]" />
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center space-x-3 mt-4">
        {ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-7 bg-[#7c3aed]" : "w-2 bg-[#d1d5db] hover:bg-[#9ca3af]"
            }`}
            aria-label={`Ir a la tarjeta ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
