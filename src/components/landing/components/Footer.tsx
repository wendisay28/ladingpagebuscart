"use client";
import { useEffect, useRef } from 'react';

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Advanced Generative Art Footer
    const startGenerativeArt = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
        opacity: number;
        life: number;
      }> = [];
      const particleCount = 50;

      // Create floating geometric shapes
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 4 + 2,
          color: ['#1f2937', '#374151', '#4b5563', '#6b7280'][Math.floor(Math.random() * 4)],
          opacity: Math.random() * 0.5 + 0.1,
          life: Math.random() * 100
        });
      }

      const animateGenerativeArt = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life += 0.5;

          if (particle.x < -20 || particle.x > canvas.width + 20) particle.vx *= -1;
          if (particle.y < -20 || particle.y > canvas.height + 20) particle.vy *= -1;

          // Pulsating effect
          const pulse = Math.sin(particle.life * 0.02) * 0.3 + 0.7;
          
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.life * 0.01);
          
          // Draw geometric shapes
          ctx.globalAlpha = particle.opacity * pulse;
          ctx.fillStyle = particle.color;
          
          if (index % 3 === 0) {
            // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -particle.size);
            ctx.lineTo(-particle.size, particle.size);
            ctx.lineTo(particle.size, particle.size);
            ctx.closePath();
            ctx.fill();
          } else if (index % 3 === 1) {
            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Square
            ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
          }
          
          ctx.restore();
        });

        // Connect nearby particles with elegant lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const opacity = (120 - distance) / 120 * 0.1;
              ctx.strokeStyle = `rgba(107, 114, 128, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(animateGenerativeArt);
      };
      animateGenerativeArt();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    };

    startGenerativeArt();
  }, []);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Canvas para arte generativo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Subtle overlay patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.1),transparent_50%)]"></div>
      </div>

      {/* Sección CTA mejorada */}
      <div className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 mb-6">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-gray-100 leading-tight tracking-tight">
            ¿Listo para vivir una{' '}
            <span className="relative inline-block">
              experiencia
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-600/20 to-gray-600/20 rounded-lg blur-xl"></div>
              <span className="relative text-gray-300 font-normal italic">única</span>
            </span>
            ?
          </h2>
          
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            Únete a nuestra comunidad de artistas y descubre eventos increíbles cerca de ti. 
            Conecta con creadores, explora nuevas oportunidades.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-500 hover:via-pink-400 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-500 border border-purple-400/50 hover:border-pink-300/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-purple-900/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>Comenzar ahora</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <button className="group px-10 py-4 bg-transparent hover:bg-gray-800/30 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-500 border border-gray-600/50 hover:border-gray-400/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700/0 via-gray-700/10 to-gray-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-4.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Ver eventos</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Elegant separator */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent"></div>
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-px bg-gradient-to-r from-gray-600 to-gray-500"></div>
        </div>
      </div>
      
      {/* Contenido principal del footer mejorado */}
      <div className="relative z-10 w-full max-w-[1250px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand section sin estadísticas */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-3xl font-light text-white mb-6 tracking-tight">BuscArt</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8 max-w-md">
                La plataforma definitiva que conecta artistas talentosos con oportunidades únicas. 
                Crea, colabora y crece en nuestra comunidad creativa.
              </p>
            </div>
            
            {/* Social media mejorada */}
            <div className="flex space-x-4">
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation sections con iconos SVG */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold mb-8 text-gray-200 uppercase tracking-wider relative">
              Para Artistas
              <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Crear Perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', href: '/register' },
                { name: 'Portfolio', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', href: '/soy-artista' },
                { name: 'Comisiones', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6', href: '/servicios' },
                { name: 'Eventos', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', href: '/lugares' }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="group flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-all duration-300">
                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="text-sm">{item.name}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-all duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-semibold mb-8 text-gray-200 uppercase tracking-wider relative">
              Para Clientes
              <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Buscar Artistas', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', href: '/busco-artistas' },
                { name: 'Proyectos', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', href: '/servicios' },
                { name: 'Precios', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', href: '/servicios#precios' },
                { name: 'Soporte', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z', href: '/contacto' }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="group flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-all duration-300">
                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="text-sm">{item.name}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-all duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-semibold mb-8 text-gray-200 uppercase tracking-wider relative">
              Empresa
              <div className="absolute -bottom-2 left-0 w-6 h-0.5 bg-gradient-to-r from-gray-500 to-transparent"></div>
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Acerca de', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', href: '/nosotros' },
                { name: 'Blog', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', href: '/blog' },
                { name: 'Carreras', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', href: '/carreras' },
                { name: 'Contacto', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', href: '/contacto' }
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="group flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-all duration-300">
                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="text-sm">{item.name}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-all duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer bottom premium */}
        <div className="pt-12 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} BuscArt. Todos los derechos reservados.
              </p>
            </div>
            
            <div className="flex items-center space-x-8 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">Términos de Servicio</a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">Política de Privacidad</a>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}