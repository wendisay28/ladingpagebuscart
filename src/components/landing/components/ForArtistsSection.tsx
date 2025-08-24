"use client";
import { useEffect, useRef } from "react";
import { Music, Camera, Palette, Calendar, Star } from "lucide-react";

export default function ForArtistsSection() {
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

  return (
    <section ref={sectionRef} className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-0">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          {/* Text column */}
          <div className="w-full lg:w-1/2 space-y-4 reveal">
            <div className="uppercase tracking-widest text-xs text-gray-300">Para artistas</div>
            <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
              Haz brillar tu talento
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3 reveal"><Palette className="w-5 h-5 text-pink-500 mt-0.5"/>Publicar servicios creativos (música, foto, pintura, performance...)</li>
              <li className="flex items-start gap-3 reveal"><Star className="w-5 h-5 text-purple-500 mt-0.5"/>Portafolio interactivo: trabajos, reseñas y calificaciones</li>
              <li className="flex items-start gap-3 reveal"><Calendar className="w-5 h-5 text-pink-500 mt-0.5"/>Agendar contratos y colaboraciones</li>
              <li className="flex items-start gap-3 reveal"><Music className="w-5 h-5 text-purple-500 mt-0.5"/>Aceptar y gestionar ofertas</li>
            </ul>
          </div>

          {/* Visual column */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 reveal">
            {[
              "/artists/artist1.jpg",
              "/artists/artist2.jpg",
              "/artists/artist3.jpg",
              "/artists/artist4.jpg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-purple-600/30 bg-black/50">
                <img src={src} alt="Portafolio" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-600/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
