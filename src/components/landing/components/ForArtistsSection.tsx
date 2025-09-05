"use client";
import { useEffect, useRef } from "react";
import { Music, Camera, Palette, Calendar, Star, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ForArtistsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const textItems = el.querySelectorAll(".text-reveal");
    const imageItems = el.querySelectorAll(".image-item");
    const section = el.querySelector("section");

    // Clear any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Reset initial state with null checks
    gsap.set(textItems, { 
      y: 100, 
      opacity: 0,
      willChange: 'transform, opacity'
    });

    gsap.set(imageItems, { 
      y: 100, 
      opacity: 0,
      willChange: 'transform, opacity'
    });

    // Only proceed if we have elements to animate
    if (textItems.length === 0 && imageItems.length === 0) return;

    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
        markers: false
      }
    });

    // Only add text animation if there are text items
    if (textItems.length > 0) {
      tl.to(textItems, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Only add image animation if there are image items
    if (imageItems.length > 0) {
      // Animate image grid with a slight delay after text
      tl.to(imageItems, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, textItems.length > 0 ? "-=0.3" : 0);
    }

    // Only add scroll effect if section exists
    if (section) {
      const scrollTween = gsap.to(section, {
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        scale: 0.98,
        opacity: 0.7,
        y: 50,
        ease: "none"
      });
    }

    // Hover effects for images with null check
    imageItems.forEach((item) => {
      const image = item.querySelector('img');
      if (!image) return;
      
      item.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.05, duration: 0.3 });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.3 });
      });
    });

    animationRef.current = tl;

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Cleanup hover event listeners
      imageItems.forEach((item) => {
        const image = item.querySelector('img');
        if (!image) return;
        
        item.removeEventListener('mouseenter', () => {
          gsap.to(image, { scale: 1.05, duration: 0.3 });
        });
        
        item.removeEventListener('mouseleave', () => {
          gsap.to(image, { scale: 1, duration: 0.3 });
        });
      });
    };
  }, []);

  const artistFeatures = [
    {
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      text: "Publica servicios creativos únicos (música, fotografía, arte visual, performance)"
    },
    {
      icon: <Star className="w-6 h-6 text-purple-400" />,
      text: "Portafolio interactivo con trabajos destacados, reseñas y calificaciones"
    },
    {
      icon: <Calendar className="w-6 h-6 text-pink-400" />,
      text: "Sistema de reservas inteligente para contratos y colaboraciones"
    },
    {
      icon: <Music className="w-6 h-6 text-purple-400" />,
      text: "Gestiona ofertas y proyectos desde un dashboard profesional"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/40 to-black" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch min-h-[500px]">
          {/* Text column */}
          <div className="flex flex-col justify-between h-full m-4">
            <div className="space-y-4">
              <div className="text-reveal flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="uppercase tracking-widest text-xs text-purple-300 font-semibold">
                  Para artistas
                </span>
              </div>
              
              <h2 className="text-reveal font-bold text-4xl lg:text-5xl text-white leading-tight">
                Haz brillar tu{" "}
                <span className="relative inline-block bg-gradient-to-r from-fuchsia-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  talento
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-400 via-pink-500 to-purple-500 rounded-full" />
                </span>
              </h2>
              
              <p className="text-reveal text-base text-gray-300 leading-relaxed max-w-lg">
                Conecta con tu audiencia, monetiza tu arte y construye una carrera sólida en nuestra plataforma diseñada especialmente para creadores.
              </p>
            </div>

            <div className="space-y-4 flex-grow flex flex-col justify-center">
              {artistFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="text-reveal flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/40"
                >
                  <div className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg">
                    {feature.icon}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
              <Link href="/tienda" className="block w-full">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Explorar</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </div>
          {/* Visual column */}
          <div className="flex items-center justify-center h-full m-4">
            <div className="images-grid grid grid-cols-2 gap-4 w-full h-full">
              {[
                { src: "/artistastop/saxofonista.png", alt: "Saxofonista en concierto", category: "Música" },
                { src: "/artistastop/djs.jpg", alt: "DJ en presentación", category: "Música Electrónica" },
                { src: "/artistastop/fotografo.jpg", alt: "Fotógrafo profesional", category: "Fotografía" },
                { src: "/artistastop/bailarina.jpg", alt: "Bailarina en presentación", category: "Danza" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="image-item relative group cursor-pointer aspect-square w-full h-full flex"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-gray-900 to-gray-800 flex">
                    <img 
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-600/20" />
                    <div className="hover-overlay absolute inset-0 bg-gradient-to-t from-purple-900/80 via-pink-900/40 to-transparent opacity-0 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-60" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
