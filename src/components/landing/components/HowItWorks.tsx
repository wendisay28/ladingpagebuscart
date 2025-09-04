'use client';
import { useEffect, useRef } from 'react';
import { Search, CalendarDays, Megaphone, Images, MapPin, Shield } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    { icon: Search, title: "Buscar Artistas", description: "Filtra por tipo, ciudad, precio o categoría." },
    { icon: CalendarDays, title: "Comparar Perfiles", description: "Compara disponibilidad, precios y reputación." },
    { icon: Megaphone, title: "Ofertas en Tiempo Real", description: "Publica tu oferta y recibe respuestas inmediatas." },
    { icon: Images, title: "Portafolios Completos", description: "Ve fotos, videos y valoraciones reales." },
    { icon: MapPin, title: "Descubrir Eventos", description: "Encuentra eventos y sitios culturales cercanos." },
    { icon: Shield, title: "Pagos Seguros", description: "Paga de forma segura y califica tu experiencia." },
  ];

  useEffect(() => {
    // Intersection Observer para elementos que aparecen desde abajo
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observar elementos
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes morphing {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: scale(1.1) rotate(90deg);
          }
          50% {
            border-radius: 50% 60% 30% 60% / 40% 70% 60% 30%;
            transform: scale(0.9) rotate(180deg);
          }
          75% {
            border-radius: 70% 30% 60% 40% / 60% 40% 50% 70%;
            transform: scale(1.05) rotate(270deg);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-in {
          opacity: 1;
        }

        .slide-up {
          transform: translateY(60px) scale(0.95);
        }

        .slide-up.animate-in {
          animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .slide-down.animate-in {
          animation: slideInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .slide-left.animate-in {
          animation: slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .slide-right.animate-in {
          animation: slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .fade-scale.animate-in {
          animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.03);
        }

        .floating-icon {
          animation: float 6s ease-in-out infinite;
        }

        .morphing-blob {
          animation: morphing 15s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        /* Efectos de paralaje con CSS */
        @media (prefers-reduced-motion: no-preference) {
          .parallax-slow {
            animation: float 8s ease-in-out infinite;
          }
          
          .parallax-fast {
            animation: float 4s ease-in-out infinite reverse;
          }
        }
      `}</style>

      <section ref={sectionRef} id="process" className="relative min-h-screen py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>

        {/* Morphing Background Blobs con más movimiento */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="morphing-blob absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-transparent parallax-slow"></div>
          <div className="morphing-blob absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-600/20 to-transparent parallax-fast" style={{ animationDelay: '2s' }}></div>
          <div className="morphing-blob absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-blue-600/15 to-transparent parallax-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-[1250px] mx-auto px-0">
          {/* Título con animación desde arriba */}
          <div className="animate-on-scroll slide-down text-center mb-12 md:mb-20">
            <h2 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4 md:mb-8">
              Cómo Funciona
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Todo lo que necesitas para encontrar y contratar artistas
            </p>
          </div>

          {/* Features Grid con animaciones escalonadas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isEven = index % 2 === 0;
              const animationClass = index < 2 
                ? (isEven ? 'slide-left' : 'slide-right')
                : 'slide-up';
              
              return (
                <div 
                  key={index} 
                  className={`feature-card group h-full animate-on-scroll ${animationClass} stagger-${index + 1}`}
                >
                  <div className="relative bg-gradient-to-br from-gray-800 to-black p-6 md:p-8 rounded-2xl border border-purple-600/30 hover:border-purple-600 transition-all duration-500 h-full flex flex-col">
                    
                    {/* Icono con efecto flotante */}
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto floating-icon">
                      <IconComponent className="icon w-8 h-8 text-white" strokeWidth={2.2} />
                    </div>

                    <div className="text-center flex-grow">
                      <h3 className="text-lg md:text-xl font-orbitron font-bold gradient-text mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
                    
                    {/* Efecto de resplandor adicional */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-20"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Elementos decorativos que aparecen con fade-scale */}
          <div className="animate-on-scroll fade-scale stagger-4 mt-16 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-purple-600/30 bg-gray-900/50">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-300">Plataforma activa 24/7</span>
            </div>
          </div>
        </div>

        {/* Partículas flotantes adicionales */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-purple-500/50 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full bg-pink-500/50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </section>
    </>
  );
}