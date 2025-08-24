"use client";
import { useEffect, useRef } from "react";
import { Briefcase, Megaphone, BarChart3, Handshake, Building2 } from "lucide-react";

export default function ForCompaniesSection() {
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
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text column */}
          <div className="w-full lg:w-1/2 space-y-4 reveal">
            <div className="flex items-center gap-2 text-gray-300">
              <Building2 className="w-5 h-5 text-pink-500" />
              <span className="uppercase tracking-widest text-xs">Para empresas</span>
            </div>
            <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold gradient-text reveal">
              Impulsa tus eventos y campañas
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3 reveal"><Briefcase className="w-5 h-5 text-purple-500 mt-0.5"/>Publicar lugares, eventos y convocatorias</li>
              <li className="flex items-start gap-3 reveal"><Megaphone className="w-5 h-5 text-pink-500 mt-0.5"/>Gestionar difusión de campañas (promos, estrenos, festivales)</li>
              <li className="flex items-start gap-3 reveal"><BarChart3 className="w-5 h-5 text-purple-500 mt-0.5"/>Panel de métricas: alcance, asistentes potenciales e interacción</li>
              <li className="flex items-start gap-3 reveal"><Handshake className="w-5 h-5 text-pink-500 mt-0.5"/>Contratar artistas directamente y crear alianzas</li>
            </ul>
          </div>

          {/* Visual column */}
          <div className="w-full lg:w-1/2 reveal">
            <div className="relative w-full rounded-2xl border border-purple-600/30 bg-gradient-to-br from-gray-800 to-black p-6 overflow-hidden">
              <div className="text-sm text-gray-300 mb-4">Panel de métricas (demo)</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/50 border border-pink-500/20">
                  <div className="text-xs text-gray-400">Alcance</div>
                  <div className="font-bold text-2xl">+12.4k</div>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-purple-500/20">
                  <div className="text-xs text-gray-400">Interacción</div>
                  <div className="font-bold text-2xl">+2.3k</div>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-pink-500/20">
                  <div className="text-xs text-gray-400">Asistentes</div>
                  <div className="font-bold text-2xl">+860</div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-pink-500/10 via-transparent to-purple-600/10"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
