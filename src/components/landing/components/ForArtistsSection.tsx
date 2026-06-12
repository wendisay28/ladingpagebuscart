"use client";
import { useEffect, useRef } from "react";
import { Palette, Ticket, Landmark, Rocket, Compass } from "lucide-react";
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
      gsap.to(section, {
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
      icon: <Palette className="w-6 h-6 text-[#7c3aed]" />,
      text: "Artistas — talento verificado para cada disciplina creativa"
    },
    {
      icon: <Ticket className="w-6 h-6 text-[#9333ea]" />,
      text: "Eventos — conciertos, festivales y experiencias cerca de ti"
    },
    {
      icon: <Landmark className="w-6 h-6 text-[#7c3aed]" />,
      text: "Espacios — lugares culturales con alma para cada ocasión"
    },
    {
      icon: <Rocket className="w-6 h-6 text-[#2563eb]" />,
      text: "Oportunidades — convocatorias, contratos y trabajo para crecer"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch min-h-[500px]">
          {/* Text column */}
          <div className="flex flex-col justify-between h-full m-4">
            <div className="space-y-4">
              <div className="text-reveal flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#7c3aed]" />
                <span className="uppercase tracking-widest text-xs text-[#7c3aed] font-semibold">
                  Explora BuscArt
                </span>
              </div>

              <h2 className="text-reveal font-bold text-4xl lg:text-5xl text-[#1f2937] leading-tight">
                Descubre exactamente lo que{" "}
                <span className="relative inline-block bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] bg-clip-text text-transparent">
                  necesitas
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] rounded-full" />
                </span>
              </h2>

              <p className="text-reveal text-base text-[#6b7280] leading-relaxed max-w-lg">
                Artistas, eventos, espacios y oportunidades en un mismo lugar. Encuentra exactamente lo que buscas y empieza a explorar.
              </p>
            </div>

            <div className="space-y-4 flex-grow flex flex-col justify-center">
              {artistFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="text-reveal flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-white/50 to-[#f3f4f6]/30 border border-[#e9d5ff] hover:border-[#7c3aed] transition-all duration-300 hover:bg-white/40"
                >
                  <div className="flex-shrink-0 p-2 bg-gradient-to-br from-[#7c3aed]/20 to-[#9333ea]/20 rounded-lg">
                    {feature.icon}
                  </div>
                  <p className="text-[#6b7280] leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
              <Link href="/explorar" className="block w-full">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] text-white font-medium shadow-lg hover:shadow-xl hover:shadow-[#7c3aed]/30 transition-all duration-300 flex items-center justify-center gap-2 group"
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
                { src: "/artistastop/bailarina.jpg", alt: "Artistas", category: "Artistas" },
                { src: "/artistastop/djs.jpg", alt: "Eventos", category: "Eventos" },
                { src: "/Medellin/PalaciodeBellasArtes.jpeg", alt: "Espacios", category: "Espacios" },
                { src: "/artistastop/fotografo.jpg", alt: "Oportunidades", category: "Oportunidades" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="image-item relative group cursor-pointer aspect-square w-full h-full flex"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#e9d5ff] bg-gradient-to-br from-white to-[#f3f4f6] flex">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7c3aed]/60 via-transparent to-[#9333ea]/20" />
                    <div className="hover-overlay absolute inset-0 bg-gradient-to-t from-[#7c3aed]/80 via-[#9333ea]/40 to-transparent opacity-0 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-60" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#7c3aed] to-[#2563eb] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
