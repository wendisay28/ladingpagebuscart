"use client";
import { useEffect, useRef } from "react";
import { Users2, Sparkles, Link2 } from "lucide-react";

export default function CommunityCollabSection() {
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
        <div className="section-title text-center mb-10 reveal">
          <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Comunidad & Colaboraciones</h3>
          <p className="text-gray-300">Conecta, comparte y crea proyectos conjuntos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="reveal">
            <div className="h-full bg-gradient-to-br from-gray-800 to-black border border-purple-600/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3 text-white"><Users2 className="w-5 h-5 text-pink-500"/>Feed de comunidad</div>
              <div className="text-sm text-gray-400">Descubre publicaciones, proyectos y showcases de artistas y empresas.</div>
            </div>
          </div>
          <div className="reveal">
            <div className="h-full bg-gradient-to-br from-gray-800 to-black border border-purple-600/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3 text-white"><Link2 className="w-5 h-5 text-purple-500"/>Match creativo</div>
              <div className="text-sm text-gray-400">Conecta artistas complementarios para colaboraciones y nuevas propuestas.</div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
