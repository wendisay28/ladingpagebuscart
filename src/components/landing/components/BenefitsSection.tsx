"use client";
import { MapPin, Zap, Video, BadgeCheck, CalendarDays, Globe } from "lucide-react";
import { motion } from "framer-motion";

const BENEFITS = [
  {
    icon: MapPin,
    title: "Descubrimiento geolocalizado",
    description: "Encuentra talento, eventos y espacios cerca de ti, en tiempo real.",
  },
  {
    icon: Zap,
    title: "Contratación directa",
    description: "Conecta y cierra acuerdos sin intermediarios ni fricción.",
  },
  {
    icon: Video,
    title: "Portafolios inmersivos",
    description: "Fotos, videos y trabajos reales para decidir con confianza.",
  },
  {
    icon: BadgeCheck,
    title: "Perfiles verificados",
    description: "Identidad y reputación validadas para contratar con seguridad.",
  },
  {
    icon: CalendarDays,
    title: "Agenda cultural integrada",
    description: "Eventos y programación cultural conectados en un solo lugar.",
  },
  {
    icon: Globe,
    title: "Ecosistema conectado",
    description: "Artistas, empresas, eventos y espacios en una misma red.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#f0ebff] overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#1f2937]">
            ¿Por qué{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb]">
              BuscArt
            </span>
            ?
          </h2>
          <p className="text-lg text-[#6b7280] mt-5 leading-relaxed">
            La infraestructura cultural diseñada para que conectar talento sea simple, seguro y rápido.
          </p>
        </motion.div>

        {/* Grid de beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative rounded-3xl p-8 bg-white/60 border border-[#e9d5ff] backdrop-blur-sm hover:bg-white/80 hover:border-[#7c3aed] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] shadow-lg shadow-[#7c3aed]/20 group-hover:scale-105 transition-transform duration-300">
                <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-semibold text-[#1f2937] mb-2">{title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
