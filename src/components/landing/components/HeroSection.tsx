import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(60px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes zoom-in-up {
        0% { opacity: 0; transform: scale(0.8) translateY(60px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes floating {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
        50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(16, 185, 129, 0.3); }
      }
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes blob-move {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -30px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      .animate-fade-in-up {
        animation: fade-in-up 1s ease-out forwards;
      }
      .animate-zoom-in-up {
        animation: zoom-in-up 1.2s ease-out forwards;
      }
      .animate-floating {
        animation: floating 6s ease-in-out infinite;
      }
      .animate-pulse-glow {
        animation: pulse-glow 3s ease-in-out infinite;
      }
      .animate-gradient-shift {
        background-size: 200% 200%;
        animation: gradient-shift 4s ease infinite;
      }
      .animate-blob-move {
        animation: blob-move 10s ease-in-out infinite;
      }
      .glass-effect {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .text-shadow-glow {
        text-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
      }
    `;
    
    document.head.appendChild(style);
    setIsVisible(true);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen text-white overflow-hidden flex items-center pt-8 lg:pt-16"
      style={{backgroundColor: '#000000'}}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-blob-move"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-blob-move" style={{animationDelay: '-5s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500 rounded-full blur-3xl animate-blob-move" style={{animationDelay: '-2.5s'}}></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1250px] mx-auto px-0 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
          
          {/* Text Content */}
          <div className={`w-full lg:w-1/2 lg:pl-0 pt-16 lg:pt-0 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left lg:translate-y-[-5%]">
              
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6 animate-pulse-glow">
                <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 001-4V5z" />
                </svg>
                <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Plataforma Líder en Gestión Cultural
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 text-shadow-glow">
                Busca, <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
                  compara
                </span>, <br />
                contrata y vive el{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
                  arte
                </span> <br />
                en tu ciudad
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                BuscArt te conecta con artistas, eventos y espacios culturales. 
                <span className="text-emerald-300 font-semibold"> Contrata en tiempo real</span>, 
                publica ofertas y descubre experiencias cerca de ti.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a href="/busco-artistas" className="group">
                  <button className="relative w-full sm:w-auto px-10 py-5 text-lg font-bold bg-transparent border-2 border-purple-500 hover:border-emerald-400 text-purple-400 hover:text-white rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden group-hover:shadow-emerald-500/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-emerald-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="relative flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      Busco artistas
                    </div>
                  </button>
                </a>
                
                <a href="/soy-artista" className="group">
                  <button className="relative w-full sm:w-auto px-10 py-5 text-lg font-bold bg-gradient-to-r from-emerald-500 via-purple-500 to-violet-500 hover:from-emerald-400 hover:via-purple-400 hover:to-violet-400 text-white rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden animate-gradient-shift">
                    <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-3xl"></div>
                    <div className="relative flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3 transform group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Soy artista
                    </div>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className={`w-full lg:w-1/2 flex items-center justify-center mb-6 lg:mb-0 order-1 lg:order-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <img 
              src="/landing/arte2.svg" 
              alt="Arte y cultura digital - Artistas y eventos creativos" 
              className="w-full max-w-lg sm:max-w-xl lg:max-w-3xl h-auto object-contain"
              onError={(e) => {
                console.error('Error cargando la imagen:', e);
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass-effect rounded-full p-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}