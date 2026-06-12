"use client";
import { useEffect, useRef, useState } from "react";
import { Users2, MessageSquare, Heart, ArrowRight, Link2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CommunityCollabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setMounted(true);
    
    return () => {
      // Cleanup function
      if (animationTimeline.current) {
        animationTimeline.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    // Store references to all elements
    const sectionElement = sectionRef.current;
    const headerElement = sectionElement.querySelector('.section-header');
    const cardElements = sectionElement.querySelectorAll('.feature-card');
    
    // Create timeline with proper scope
    animationTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: 'top 85%',
        toggleActions: 'play none none none',
        invalidateOnRefresh: true
      }
    });

    // Only proceed if elements exist
    if (headerElement) {
      gsap.set(headerElement, { y: 50, opacity: 0 });
      animationTimeline.current.to(headerElement, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      });
    }

    if (cardElements.length > 0) {
      gsap.set(cardElements, { 
        y: 30, 
        opacity: 0,
        scale: 0.98
      });
      
      animationTimeline.current.to(cardElements, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)"
      }, 0.2);
    }
  }, [mounted]);

  const features = [
    {
      icon: <Users2 className="w-6 h-6 text-[#7c3aed]" />,
      title: "Feed de comunidad",
      description: "Descubre publicaciones, proyectos y showcases de artistas y empresas.",
      stats: "2 ciudades activas"
    },
    {
      icon: <Link2 className="w-6 h-6 text-[#9333ea]" />,
      title: "Match creativo",
      description: "Conecta con artistas complementarios para colaboraciones únicas.",
      stats: "+500 conexiones diarias"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#2563eb]" />,
      title: "Foros temáticos",
      description: "Participa en discusiones especializadas por categorías artísticas.",
      stats: "50+ temas activos"
    },
    {
      icon: <Heart className="w-6 h-6 text-[#ec4899]" />,
      title: "Proyectos exitosos",
      description: "Colabora en iniciativas seleccionadas por la comunidad.",
      stats: "100+ proyectos exitosos"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-[#f0ebff] to-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxMjQsIDU4LCAyMzcsIDAuMDQpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
      </div>
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="section-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] bg-clip-text text-transparent">
            Comunidad & Colaboraciones
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7c3aed] to-[#9333ea] mx-auto mb-4"></div>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
            Conecta, comparte y crea proyectos conjuntos en nuestra comunidad de artistas y creadores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-gradient-to-br from-white to-[#f3f4f6] backdrop-blur-sm border border-[#e9d5ff] rounded-2xl p-6 hover:border-[#7c3aed] transition-all duration-300 hover:shadow-lg hover:shadow-[#7c3aed]/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-[#7c3aed]/10 to-[#9333ea]/10 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1f2937] mb-2">{feature.title}</h3>
                  <p className="text-[#6b7280] mb-3">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#7c3aed] font-medium">{feature.stats}</span>
                    <button className="text-[#9333ea] hover:text-[#7c3aed] transition-colors flex items-center gap-1 text-sm font-medium">
                      Ver más <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] text-white rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-[#7c3aed]/30">
            Únete a la comunidad
          </button>
          <p className="mt-4 text-[#9ca3af] text-sm">
            Más de 10,000 artistas y creadores ya forman parte
          </p>
        </div>
      </div>
    </section>
  );
}
