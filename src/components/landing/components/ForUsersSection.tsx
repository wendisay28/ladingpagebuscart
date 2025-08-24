"use client";
import { useEffect, useRef } from "react";
import { Filter, CalendarDays, MapPin, Sparkles, Heart } from "lucide-react";

export default function ForUsersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger && sectionRef.current) {
      const el = sectionRef.current;
      const items = el.querySelectorAll(".reveal");
      window.gsap.set(items, { opacity: 0, y: 40 });
      window.gsap.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  const features = [
    { icon: Filter, title: "Filtros inteligentes", desc: "Categorías, estilos y ubicación" },
    { icon: CalendarDays, title: "Calendario de eventos", desc: "Planifica tus experiencias" },
    { icon: MapPin, title: "Descubre en tu ciudad", desc: "Mapa y recomendaciones" },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-0">
        <div className="section-title text-center mb-12 reveal">
          <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Para usuarios</h3>
          <p className="text-gray-300">Explora artistas, sigue favoritos y reserva al instante</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="reveal">
              <div className="h-full bg-gradient-to-br from-gray-800 to-black border border-purple-600/30 rounded-2xl p-6">
                <f.icon className="w-6 h-6 text-pink-500 mb-3" />
                <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
