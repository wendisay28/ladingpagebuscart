"use client";
import { useEffect, useRef, useState } from "react";
import { Users2, MessageSquare, Heart, ArrowRight, Link2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CommunityCollabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !sectionRef.current) return;

    // Initial setup
    gsap.set('.section-header', { y: 50, opacity: 0 });
    gsap.set('.feature-card', { 
      y: 30, 
      opacity: 0,
      scale: 0.98
    });

    // Create timeline
    const animationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });

    // Header animation
    animationTimeline.to('.section-header', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out"
    });

    // Cards animation
    animationTimeline.to('.feature-card', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.2)"
    }, 0.2);

    // Cleanup
    return () => {
      animationTimeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  const features = [
    {
      icon: <Users2 className="w-6 h-6 text-pink-500" />,
      title: "Feed de comunidad",
      description: "Descubre publicaciones, proyectos y showcases de artistas y empresas.",
      stats: "+1K publicaciones diarias"
    },
    {
      icon: <Link2 className="w-6 h-6 text-purple-500" />,
      title: "Match creativo",
      description: "Conecta con artistas complementarios para colaboraciones únicas.",
      stats: "+500 conexiones diarias"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      title: "Foros temáticos",
      description: "Participa en discusiones especializadas por categorías artísticas.",
      stats: "50+ temas activos"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: "Proyectos destacados",
      description: "Colabora en iniciativas seleccionadas por la comunidad.",
      stats: "100+ proyectos activos"
    }
  ];

  if (!isClient) {
    return null;
  }

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxMDIsIDEyNixlLzQpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Comunidad & Colaboraciones
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Conecta, comparte y crea proyectos conjuntos en nuestra comunidad de artistas y creadores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-pink-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-3">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pink-400 font-medium">{feature.stats}</span>
                    <button className="text-purple-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                      Ver más <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
            Únete a la comunidad
          </button>
          <p className="mt-4 text-gray-400 text-sm">
            Más de 10,000 artistas y creadores ya forman parte
          </p>
        </div>
      </div>
    </section>
  );
}
