"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Megaphone,
  BarChart3,
  Handshake,
  Building2,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function ForCompaniesSection() {
  const features = [
    {
      icon: Briefcase,
      title: "Publicación de espacios",
      description:
        "Publica lugares, eventos y convocatorias de manera profesional con herramientas que maximizan tu visibilidad.",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
      gradient: "from-pink-600/20 via-pink-500/10 to-transparent",
    },
    {
      icon: Megaphone,
      title: "Gestión de campañas",
      description:
        "Difunde promociones, estrenos y festivales con estrategias que impulsan tu alcance y engagement.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      gradient: "from-purple-600/20 via-purple-500/10 to-transparent",
    },
    {
      icon: BarChart3,
      title: "Métricas y análisis",
      description:
        "Accede a reportes claros de asistencia potencial, interacciones y crecimiento en tiempo real.",
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      gradient: "from-violet-600/20 via-violet-500/10 to-transparent",
    },
    {
      icon: Handshake,
      title: "Networking directo",
      description:
        "Conecta con artistas y aliados estratégicos de manera rápida y confiable dentro de la red profesional.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      gradient: "from-emerald-600/20 via-emerald-500/10 to-transparent",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">
                    Para empresas
                  </span>
                </motion.div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Encuentra los mejores{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-violet-500">
                    espacios
                  </span>{" "}
                  para tus eventos
                </h2>
              </div>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
                Conecta con tu audiencia y maximiza el impacto de tus eventos con
                herramientas profesionales diseñadas para tu crecimiento.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/lugares">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                  >
                    Ver lugares disponibles
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-500 hover:text-white transition-all duration-300 text-base"
                >
                  Solicitar demo
                </motion.button>
              </div>

              <motion.div
                className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    500+
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Espacios</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    50k+
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Eventos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    98%
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Satisfacción</div>
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
                  className={`flex-1 min-h-[130px] relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.gradient} backdrop-blur-lg border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                >
                  {/* Overlay con hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 group-hover:from-gray-900/80 group-hover:via-gray-800/70 group-hover:to-gray-900/80 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-xl ${feature.bgColor} ${feature.borderColor} border shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-gray-100 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-snug group-hover:text-gray-200 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator mejorado */}
                    <div className="w-full h-1 bg-gray-700/50 rounded-full overflow-hidden mt-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 + index * 5}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${
                          feature.color.includes("pink")
                            ? "bg-gradient-to-r from-pink-500 to-pink-400"
                            : feature.color.includes("purple")
                            ? "bg-gradient-to-r from-purple-500 to-purple-400"
                            : feature.color.includes("violet")
                            ? "bg-gradient-to-r from-violet-500 to-violet-400"
                            : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                        } shadow-lg`}
                      />
                    </div>
                  </div>

                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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