"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Handshake,
  CheckCircle2,
  Compass,
} from "lucide-react";
import Link from "next/link";

export default function ForCompaniesSection() {
  const features = [
    {
      icon: Search,
      title: "1. Descubre",
      description:
        "Explora artistas, eventos y espacios culturales cerca de ti.",
      color: "text-[#7c3aed]",
      bgColor: "bg-[#7c3aed]/10",
      borderColor: "border-[#e9d5ff]",
      gradient: "from-[#7c3aed]/20 via-[#9333ea]/10 to-transparent",
    },
    {
      icon: SlidersHorizontal,
      title: "2. Compara",
      description:
        "Revisa perfiles, precios y reseñas para elegir la mejor opción.",
      color: "text-[#9333ea]",
      bgColor: "bg-[#9333ea]/10",
      borderColor: "border-[#d8b4fe]",
      gradient: "from-[#9333ea]/20 via-[#a78bfa]/10 to-transparent",
    },
    {
      icon: Handshake,
      title: "3. Conecta",
      description:
        "Contacta y coordina directamente dentro de la plataforma.",
      color: "text-[#2563eb]",
      bgColor: "bg-[#2563eb]/10",
      borderColor: "border-[#bfdbfe]",
      gradient: "from-[#2563eb]/20 via-[#3b82f6]/10 to-transparent",
    },
    {
      icon: CheckCircle2,
      title: "4. Haz que ocurra",
      description:
        "Cierra con pagos seguros y vive la experiencia.",
      color: "text-[#10b981]",
      bgColor: "bg-[#10b981]/10",
      borderColor: "border-[#a7f3d0]",
      gradient: "from-[#10b981]/20 via-[#34d399]/10 to-transparent",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f0ebff]">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Grid con altura mínima fija */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-screen lg:min-h-[800px]">
          {/* Columna izquierda - Usando flex para centrar contenido */}
          <motion.div
            className="flex flex-col justify-center py-12 lg:py-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7c3aed]/10 border border-[#e9d5ff]"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Compass className="w-4 h-4 text-[#7c3aed]" />
                  <span className="text-[#7c3aed] text-sm font-medium">
                    Simple y rápido
                  </span>
                </motion.div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#1f2937]">
                  Cómo{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb]">
                    funciona
                  </span>
                </h2>
              </div>

              <p className="text-[#6b7280] text-lg md:text-xl leading-relaxed max-w-xl">
                Cuatro pasos para pasar de la idea a la experiencia. Rápido, simple
                y sin complicaciones.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#2563eb] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                  >
                    Empezar ahora
                  </motion.button>
                </Link>
                <Link href="/explorar">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl border-2 border-[#e9d5ff] text-[#6b7280] font-semibold hover:border-[#7c3aed] hover:text-[#7c3aed] transition-all duration-300 text-base"
                  >
                    Explorar talento
                  </motion.button>
                </Link>
              </div>

              <motion.div
                className="grid grid-cols-3 gap-8 pt-8 border-t border-[#e9d5ff]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#1f2937]">
                    500+
                  </div>
                  <div className="text-[#6b7280] text-sm mt-1">Espacios</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#1f2937]">
                    50k+
                  </div>
                  <div className="text-[#6b7280] text-sm mt-1">Eventos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#1f2937]">
                    98%
                  </div>
                  <div className="text-[#6b7280] text-sm mt-1">Satisfacción</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Columna derecha - Usando flex para distribuir tarjetas uniformemente */}
          <div className="flex flex-col justify-center py-12 lg:py-16">
            <div className="flex flex-col gap-6 h-full">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`flex-1 min-h-[130px] relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.gradient} backdrop-blur-lg border border-[#e9d5ff] shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                >
                  {/* Overlay con hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/90 group-hover:from-white/80 group-hover:via-white/70 group-hover:to-white/80 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-xl ${feature.bgColor} ${feature.borderColor} border shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-[#1f2937] mb-2 leading-tight group-hover:text-[#7c3aed] transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-[#6b7280] text-sm leading-snug group-hover:text-[#4b5563] transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator mejorado */}
                    <div className="w-full h-1 bg-[#e9d5ff]/50 rounded-full overflow-hidden mt-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 + index * 5}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${
                          feature.color.includes("#7c3aed")
                            ? "bg-gradient-to-r from-[#7c3aed] to-[#9333ea]"
                            : feature.color.includes("#9333ea")
                            ? "bg-gradient-to-r from-[#9333ea] to-[#a78bfa]"
                            : feature.color.includes("#2563eb")
                            ? "bg-gradient-to-r from-[#2563eb] to-[#3b82f6]"
                            : "bg-gradient-to-r from-[#10b981] to-[#34d399]"
                        } shadow-lg`}
                      />
                    </div>
                  </div>

                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#7c3aed]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
