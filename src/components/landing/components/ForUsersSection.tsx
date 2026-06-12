"use client";
import { useEffect, useRef, useState } from "react";
import { Filter, CalendarDays, MapPin, Sparkles, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ForUsersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on client side
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${4 + Math.random() * 4}s`
      }))
    );
  }, []);

  const features = [
    { 
      icon: Filter, 
      title: "Filtros inteligentes", 
      desc: "Categorías, estilos y ubicación",
      color: "from-[#7c3aed] to-[#9333ea]",
      delay: "delay-100"
    },
    { 
      icon: CalendarDays, 
      title: "Calendario de eventos", 
      desc: "Planifica tus experiencias",
      color: "from-[#2563eb] to-[#3b82f6]",
      delay: "delay-200"
    },
    { 
      icon: MapPin, 
      title: "Descubre en tu ciudad", 
      desc: "Mapa y recomendaciones",
      color: "from-[#10b981] to-[#34d399]",
      delay: "delay-300"
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#f0ebff] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7c3aed]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9333ea]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#2563eb]/5 to-transparent rounded-full animate-spin-slow" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0ebff] via-white to-[#f0ebff]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {mounted && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#7c3aed]/20 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Enhanced Title Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7c3aed]/10 rounded-full border border-[#e9d5ff] mb-6">
            <Sparkles className="w-4 h-4 text-[#7c3aed]" />
            <span className="text-sm text-[#7c3aed] font-medium">Para usuarios</span>
          </div>
          
          <h3 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-[#1f2937] via-[#7c3aed] to-[#9333ea] bg-clip-text text-transparent">
              Explora, Conecta
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] bg-clip-text text-transparent">
              y Disfruta
            </span>
          </h3>
          
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto leading-relaxed">
            Descubre artistas increíbles, sigue a tus favoritos y reserva experiencias únicas al instante
          </p>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group transition-all duration-700 ${feature.delay} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="relative h-full bg-gradient-to-br from-white to-[#f3f4f6] backdrop-blur-sm border border-[#e9d5ff] rounded-3xl p-8 hover:border-[#7c3aed] transition-all duration-500 group-hover:transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#7c3aed]/20">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#7c3aed]/0 via-[#9333ea]/0 to-[#2563eb]/0 group-hover:from-[#7c3aed]/20 group-hover:via-[#9333ea]/20 group-hover:to-[#2563eb]/20 transition-all duration-500 -z-10" />
                
                {/* Icon with Gradient Background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                
                {/* Content */}
                <div>
                  <h4 className="text-xl font-bold text-[#1f2937] mb-3 group-hover:text-[#7c3aed] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-[#6b7280] leading-relaxed group-hover:text-[#4b5563] transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-[#7c3aed]" />
                </div>

                {/* Animated Background Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} blur-xl opacity-20`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link href="/explorar" className="inline-block">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] rounded-full hover:from-[#8b5cf6] hover:via-[#a78bfa] hover:to-[#3b82f6] transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-[#7c3aed]/25">
              <Heart className="w-5 h-5 text-white group-hover:animate-pulse" />
              <span className="text-white font-semibold">Comenzar a explorar</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}