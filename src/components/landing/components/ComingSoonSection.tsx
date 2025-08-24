"use client";
import { useEffect, useRef } from "react";
import { Bot, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

export default function ComingSoonSection() {
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

  const items = [
    { icon: Bot, title: "Recomendaciones con IA" },
    { icon: FileCheck2, title: "Contratos digitales instantáneos" },
    { icon: ShieldCheck, title: "Garantía de pago para artistas" },
    { icon: Sparkles, title: "Herramientas avanzadas de colaboración" },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-0">
        <div className="section-title text-center mb-10 reveal">
          <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Próximamente en BuscArt</h3>
          <p className="text-gray-300">Una mirada al futuro de la plataforma</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((Item, i) => (
            <div key={i} className="reveal">
              <div className="flex items-center gap-3 bg-gradient-to-br from-gray-800 to-black border border-purple-600/30 rounded-2xl p-5">
                <Item.icon className="w-5 h-5 text-pink-500" />
                <span className="text-white/90 text-sm">{Item.title}</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-purple-600/20 border border-purple-600/40 text-purple-200">Coming soon</span>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
