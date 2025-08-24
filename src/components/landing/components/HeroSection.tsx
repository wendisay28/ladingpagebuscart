'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function HeroSection() {
  // Inject keyframes/animations en el DOM (solo si Tailwind no está configurado aún)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(40px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes zoom-in-up {
        0% { opacity: 0; transform: scale(0.95) translateY(40px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes glow {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
      .animate-zoom-in-up {
        animation: zoom-in-up 1s ease-out forwards;
      }
      .animate-glow {
        animation: glow 3s ease-in-out infinite;
      }
      .tight-line-height {
        line-height: 0.85 !important;
      }
    `;
    
    // Agregar los estilos al head del documento
    document.head.appendChild(style);
    
    // Función de limpieza que se ejecutará cuando el componente se desmonte
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section
      className="relative h-screen bg-black text-white overflow-hidden flex items-center"
      role="region"
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-24 left-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-10 w-56 h-56 bg-purple-700 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content - Orden invertido en móvil */}
      <div className="w-full max-w-[1250px] mx-auto px-0 relative z-10 flex flex-col-reverse lg:flex-row items-center h-full -mt-8 lg:-mt-12">
        {/* Contenedor de texto - Abajo en móvil, a la izquierda en desktop */}
        <div className="w-full lg:w-2/5 flex items-center">
          <div className="max-w-xl lg:max-w-2xl mx-auto lg:mx-0 text-left animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-2 lg:mb-3 tight-line-height" style={{ lineHeight: '0.9' }}>
              Busca, <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">compara</span>, contrata y vive el{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">arte</span> en tu ciudad
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 lg:mb-5 font-sans tracking-wide">
              BuscArt te conecta con artistas, eventos y espacios culturales. Contrata en tiempo real, publica ofertas, proyectos, convocatorias y descubre experiencias cerca de ti de forma rápida y segura.
            </p>

            <div className="flex flex-row gap-3 max-w-sm lg:max-w-md">
              <a href="/busco-artistas" aria-label="Busco artistas" className="w-1/2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 lg:py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Busco artistas
                </Button>
              </a>

              <a href="/soy-artista" aria-label="Soy artista" className="w-1/2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 lg:py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Soy artista
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Contenedor de imagen - Arriba en móvil, a la derecha en desktop */}
        <div className="w-full lg:w-3/5 flex items-center justify-center mb-4 lg:mb-0">
          <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-96 sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] animate-zoom-in-up lg:transform lg:translate-x-8 xl:translate-x-12">
            <img 
              src="/landing/tango.png" 
              alt="Arte y cultura" 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Error loading image:', e.currentTarget.src);
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Efecto de brillo en la imagen */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent animate-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}