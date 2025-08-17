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
      className="relative min-h-[100vh] bg-black text-white overflow-hidden flex items-center py-16"
      role="region"
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-24 left-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-10 w-56 h-56 bg-purple-700 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content - Orden invertido en móvil */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 flex flex-col-reverse lg:flex-row items-center pt-16 lg:pt-0">
        {/* Contenedor de texto - Abajo en móvil, a la izquierda en desktop */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pr-12">
          <div className="max-w-2xl mx-auto text-left animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 lg:mb-8">
              Busca, <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">compara</span>, contrata y vive el{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">arte</span> en tu ciudad
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8 lg:mb-10 font-sans tracking-wide max-w-3xl">
              BuscArt te conecta con artistas, eventos y espacios culturales. Contrata en tiempo real, publica ofertas, proyectos, convocatorias y descubre experiencias cerca de ti de forma rápida y segura.
            </p>

            <div className="flex flex-row gap-3 max-w-md">
              <a href="/busco-artistas" aria-label="Busco artistas" className="w-1/2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white text-sm sm:text-base py-2 sm:py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Busco artistas
                </Button>
              </a>

              <a href="/soy-artista" aria-label="Soy artista" className="w-1/2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white text-sm sm:text-base py-2 sm:py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Soy artista
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Contenedor de imagen - Arriba en móvil, a la derecha en desktop */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-2 sm:px-4">
          <div className="relative w-full max-w-2xl lg:max-w-3xl h-[350px] sm:h-[450px] md:h-[550px] lg:h-[750px] animate-zoom-in-up">
            <img 
              src="images/landing/tango.png" 
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