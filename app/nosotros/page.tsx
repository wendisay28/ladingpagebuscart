'use client';

import { Metadata } from 'next';
import { Building2, Users, Target, BarChart3, Calendar, FileText, Rocket, Shield, Zap, Scale, Star, Sparkles, Heart, Globe, Music, Palette, Camera, Trophy, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Navigation from '@/src/components/landing/components/Navigation';

// Hook personalizado para animaciones de scroll
const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observar todos los elementos con clase animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default function AboutPage() {
  useScrollAnimation();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: 'Marketplace de artistas',
      description: 'Conecta directamente a creadores con empresas, instituciones y público que buscan contratar talento cultural de forma transparente y profesional.'
    },
    {
      icon: <Calendar className="w-8 h-8 text-white" />,
      title: 'Agenda cultural',
      description: 'Visibiliza los eventos más relevantes en música, arte, teatro, danza y más, creando un calendario cultural integral para toda Colombia.'
    },
    {
      icon: <FileText className="w-8 h-8 text-white" />,
      title: 'Reservas culturales',
      description: 'Facilita la compra de entradas para museos, galerías y experiencias emblemáticas, democratizando el acceso a la cultura.'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: 'Gestión inteligente',
      description: 'Herramientas digitales avanzadas para pagos, contratos y organización de eventos con transparencia, seguridad e inteligencia artificial.'
    }
  ];

  const values = [
    {
      icon: <Rocket className="w-8 h-8 text-white" />,
      title: 'Innovación',
      description: 'Aplicamos tecnología de vanguardia, programación e inteligencia artificial al servicio de la cultura y el arte.'
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: 'Confiabilidad',
      description: 'Garantizamos procesos claros, seguros y transparentes en cada contratación, reserva y transacción.'
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: 'Accesibilidad',
      description: 'Eliminamos barreras geográficas y económicas para acercar artistas, eventos y espacios culturales a todos.'
    },
    {
      icon: <Scale className="w-8 h-8 text-white" />,
      title: 'Equidad',
      description: 'Generamos oportunidades justas para artistas emergentes y consolidados, promoviendo la diversidad cultural.'
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: 'Impacto Social',
      description: 'Fortalecemos la economía naranja y contribuimos al desarrollo cultural, social y empresarial de Colombia.'
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: 'Pasión Cultural',
      description: 'Cada interacción con el arte debe ser memorable, inspiradora y de calidad excepcional.'
    }
  ];

  const vision = [
    { value: '3%', label: 'del PIB representa la economía naranja', icon: <BarChart3 className="w-6 h-6" /> },
    { value: '500K+', label: 'empleos potenciales a generar', icon: <Users className="w-6 h-6" /> },
    { value: '∞', label: 'posibilidades creativas', icon: <Sparkles className="w-6 h-6" /> },
    { value: '1', label: 'sola plataforma integral', icon: <Globe className="w-6 h-6" /> }
  ];

  const team = [
    {
      icon: <Music className="w-12 h-12 text-white" />,
      title: 'Músicos',
      description: 'Artistas de todos los géneros musicales'
    },
    {
      icon: <Palette className="w-12 h-12 text-white" />,
      title: 'Artistas Visuales',
      description: 'Pintores, escultores y artistas gráficos'
    },
    {
      icon: <Camera className="w-12 h-12 text-white" />,
      title: 'Creadores Digitales',
      description: 'Fotógrafos, videomakers y diseñadores'
    },
    {
      icon: <Trophy className="w-12 h-12 text-white" />,
      title: 'Artistas Escénicos',
      description: 'Teatro, danza y performance'
    }
  ];

  return (
    <>
      <Navigation />
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .slide-up {
          transform: translateY(60px);
        }
        
        .slide-left {
          transform: translateX(60px);
        }
        
        .slide-right {
          transform: translateX(-60px);
        }
        
        .fade-in {
          opacity: 0;
        }
        
        .scale-in {
          transform: scale(0.8);
          opacity: 0;
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
        
        .parallax-slow {
          animation: parallax-float 6s ease-in-out infinite;
        }
        
        .parallax-medium {
          animation: parallax-float 4s ease-in-out infinite reverse;
        }
        
        .parallax-fast {
          animation: parallax-float 3s ease-in-out infinite;
        }
        
        @keyframes parallax-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      
      <main className="min-h-screen bg-black overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-black pt-24">
          {/* Fondo sutil */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-black to-black" />
          </div>
          
          {/* Partículas mínimas */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-300/60 rounded-full animate-pulse parallax-slow" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-fuchsia-300/60 rounded-full animate-pulse parallax-fast" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300/60 rounded-full animate-pulse parallax-medium" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge minimalista */}
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-300/20 bg-emerald-900/20 backdrop-blur-sm mb-8 animate-on-scroll fade-in">
                <span className="text-emerald-300/90 text-sm font-medium">Transformando la cultura colombiana</span>
              </div>

              {/* Título principal */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="block text-white animate-on-scroll slide-up stagger-1">
                  El futuro del
                </span>
                <span className="block bg-gradient-to-r from-purple-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent animate-on-scroll slide-up stagger-2">
                  arte digital
                </span>
              </h1>

              {/* Descripción */}
              <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed animate-on-scroll fade-in stagger-3">
                Estamos construyendo el ecosistema digital que conectará a toda la comunidad artística colombiana. 
                Una plataforma donde el talento encuentra oportunidades y la cultura se vuelve accesible para todos.
              </p>

              {/* CTAs minimalistas */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-on-scroll scale-in stagger-4">
                <Link 
                  href="/registro-artista" 
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-400 to-purple-400 text-white font-semibold rounded-xl hover:from-emerald-300 hover:to-purple-300 transition-all duration-300 transform hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Únete como Artista
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/registro-empresa" 
                  className="group inline-flex items-center px-8 py-4 bg-transparent border border-emerald-300/30 text-emerald-300 font-semibold rounded-xl hover:border-emerald-300/50 hover:bg-emerald-300/5 transition-all duration-300"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Buscar Talento
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Scroll indicator */}
              <div className="animate-bounce animate-on-scroll fade-in stagger-5">
                <ArrowRight className="w-6 h-6 text-gray-600 mx-auto rotate-90" />
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Misión */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-on-scroll slide-up">
                Nuestra Misión
              </h2>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed animate-on-scroll fade-in stagger-1">
                Democratizar el acceso a la cultura y el arte, creando un puente digital 
                que facilita conexiones significativas entre creadores, gestores culturales y audiencias. 
                Queremos profesionalizar el sector cultural colombiano, generar oportunidades 
                económicas sostenibles para los artistas y hacer que el arte sea accesible para todos.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-emerald-300/20 hover:border-emerald-300/40 transition-all duration-300 animate-on-scroll slide-left stagger-1">
                <Target className="w-16 h-16 text-emerald-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Visión</h3>
                <p className="text-gray-400 leading-relaxed">Ser la plataforma líder de economía naranja en Latinoamérica, transformando cómo se consume y crea cultura</p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-fuchsia-300/20 hover:border-fuchsia-300/40 transition-all duration-300 animate-on-scroll slide-up stagger-2">
                <Rocket className="w-16 h-16 text-fuchsia-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Propósito</h3>
                <p className="text-gray-400 leading-relaxed">Empoderar a cada artista colombiano con herramientas digitales de clase mundial para hacer crecer su carrera</p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-purple-300/20 hover:border-purple-300/40 transition-all duration-300 animate-on-scroll slide-right stagger-3">
                <Heart className="w-16 h-16 text-purple-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Compromiso</h3>
                <p className="text-gray-400 leading-relaxed">Construir una comunidad inclusiva donde cada talento encuentre su lugar y oportunidad de brillar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 bg-black border-t border-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 animate-on-scroll slide-up">
              Nuestros Valores
            </h2>
            <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto text-lg animate-on-scroll fade-in stagger-1">
              Los principios que guían cada decisión y acción en BuscArt
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className={`group relative p-8 rounded-2xl bg-gray-900/30 border ${
                  index % 3 === 0 ? 'border-emerald-300/20 hover:border-emerald-300/40' :
                  index % 3 === 1 ? 'border-fuchsia-300/20 hover:border-fuchsia-300/40' :
                  'border-purple-300/20 hover:border-purple-300/40'
                } transition-all duration-500 hover:scale-105 animate-on-scroll ${index % 2 === 0 ? 'slide-left' : 'slide-right'} stagger-${(index % 6) + 1}`}>
                  <div className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 ${
                    index % 3 === 0 ? 'bg-emerald-400/8 text-emerald-300' :
                    index % 3 === 1 ? 'bg-fuchsia-400/8 text-fuchsia-300' :
                    'bg-purple-400/8 text-purple-300'
                  }`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-black border-t border-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 animate-on-scroll slide-up">
              Lo que Construimos
            </h2>
            <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto text-lg animate-on-scroll fade-in stagger-1">
              Una suite completa de herramientas digitales para revolucionar el ecosistema cultural
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className={`flex items-start group hover:scale-105 transition-transform duration-300 animate-on-scroll ${index % 2 === 0 ? 'slide-left' : 'slide-right'} stagger-${index + 1}`}>
                  <div className="flex-shrink-0 mr-6">
                    <div className={`flex items-center justify-center h-20 w-20 rounded-2xl border group-hover:border-opacity-60 transition-colors duration-300 ${
                      index % 4 === 0 ? 'bg-emerald-400/8 border-emerald-300/30 text-emerald-300' :
                      index % 4 === 1 ? 'bg-fuchsia-400/8 border-fuchsia-300/30 text-fuchsia-300' :
                      index % 4 === 2 ? 'bg-purple-400/8 border-purple-300/30 text-purple-300' :
                      'bg-emerald-400/8 border-emerald-300/30 text-emerald-300'
                    }`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-4 group-hover:transition-colors duration-300 ${
                      index % 4 === 0 ? 'text-white group-hover:text-emerald-300' :
                      index % 4 === 1 ? 'text-white group-hover:text-fuchsia-300' :
                      index % 4 === 2 ? 'text-white group-hover:text-purple-300' :
                      'text-white group-hover:text-emerald-300'
                    }`}>{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artistas que Apoyamos */}
        <section className="py-20 bg-black border-t border-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 animate-on-scroll slide-up">
              Artistas que Apoyaremos
            </h2>
            <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto text-lg animate-on-scroll fade-in stagger-1">
              Desde talentos emergentes hasta artistas consolidados en todas las disciplinas creativas
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className={`text-center p-8 rounded-2xl bg-gray-900/30 border transition-all duration-500 hover:scale-105 group animate-on-scroll scale-in stagger-${index + 1} ${
                  index % 4 === 0 ? 'border-emerald-300/20 hover:border-emerald-300/40' :
                  index % 4 === 1 ? 'border-fuchsia-300/20 hover:border-fuchsia-300/40' :
                  index % 4 === 2 ? 'border-purple-300/20 hover:border-purple-300/40' :
                  'border-emerald-300/20 hover:border-emerald-300/40'
                }`}>
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    index % 4 === 0 ? 'bg-emerald-400/8 text-emerald-300' :
                    index % 4 === 1 ? 'bg-fuchsia-400/8 text-fuchsia-300' :
                    index % 4 === 2 ? 'bg-purple-400/8 text-purple-300' :
                    'bg-emerald-400/8 text-emerald-300'
                  }`}>
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{member.title}</h3>
                  <p className="text-gray-500">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nuestra Visión del Impacto */}
        <section className="py-20 bg-black border-t border-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 animate-on-scroll slide-up">
              El Impacto que Queremos Crear
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto text-lg animate-on-scroll fade-in stagger-1">
              Creemos en el potencial transformador de la economía naranja para Colombia
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {vision.map((stat, index) => (
                <div key={index} className={`text-center p-8 rounded-2xl bg-gray-900/50 border transition-all duration-300 hover:scale-105 group animate-on-scroll slide-up stagger-${index + 1} ${
                  index % 4 === 0 ? 'border-emerald-300/20 hover:border-emerald-300/40' :
                  index % 4 === 1 ? 'border-fuchsia-300/20 hover:border-fuchsia-300/40' :
                  index % 4 === 2 ? 'border-purple-300/20 hover:border-purple-300/40' :
                  'border-emerald-300/20 hover:border-emerald-300/40'
                }`}>
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    index % 4 === 0 ? 'bg-emerald-400/8 text-emerald-300' :
                    index % 4 === 1 ? 'bg-fuchsia-400/8 text-fuchsia-300' :
                    index % 4 === 2 ? 'bg-purple-400/8 text-purple-300' :
                    'bg-emerald-400/8 text-emerald-300'
                  }`}>
                    {stat.icon}
                  </div>
                  <p className="text-4xl md:text-5xl font-bold text-white mb-3">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Minimalista */}
        <section className="py-24 bg-black border-t border-gray-900">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight animate-on-scroll slide-up stagger-1">
                <span className="text-white">¿Listo para Ser Parte de la</span>
                <span className="block bg-gradient-to-r from-emerald-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent mt-2">
                  Revolución Cultural?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed animate-on-scroll fade-in stagger-2">
                Únete a la comunidad de pioneros que está transformando la industria cultural colombiana. 
                Juntos construimos el futuro del arte digital.
              </p>
              
              {/* Estadísticas minimalistas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-on-scroll slide-up stagger-3">
                <div className="text-center p-6 rounded-xl bg-gray-900/50 border border-emerald-300/20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-emerald-400/8 flex items-center justify-center">
                    <Users className="w-8 h-8 text-emerald-300" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">Miles</p>
                  <p className="text-gray-500">de artistas esperando</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gray-900/50 border border-fuchsia-300/20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-fuchsia-400/8 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-fuchsia-300" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">Infinitas</p>
                  <p className="text-gray-500">oportunidades creativas</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-gray-900/50 border border-purple-300/20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-purple-400/8 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-purple-300" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">1</p>
                  <p className="text-gray-500">plataforma integral</p>
                </div>
              </div>

              {/* CTAs principales minimalistas */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16 animate-on-scroll scale-in stagger-4">
                <Link 
                  href="/registro-artista" 
                  className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-emerald-400 to-purple-400 text-white font-bold rounded-xl hover:from-emerald-300 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  <Users className="w-6 h-6 mr-3" />
                  <span>Soy Artista</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/registro-empresa" 
                  className="group inline-flex items-center px-12 py-6 bg-transparent border-2 border-emerald-300/40 text-white font-bold rounded-xl hover:border-emerald-300/60 hover:bg-emerald-300/5 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  <Building2 className="w-6 h-6 mr-3" />
                  <span>Busco Talento</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Mensaje de confianza */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600 animate-on-scroll fade-in stagger-5">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-emerald-300/70 mr-2" />
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-fuchsia-300/70 mr-2" />
                  <span>Registro Rápido</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-purple-300/70 mr-2" />
                  <span>Soporte Premium</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="relative z-10 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center border-t border-gray-800/50 pt-8">
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  BuscArt
                </h2>
              </div>
              <p className="text-gray-400 text-sm mb-6 max-w-2xl mx-auto">
                Conectando artistas con oportunidades únicas. Únete a nuestra comunidad y lleva tu talento al siguiente nivel.
              </p>
              <div className="flex justify-center space-x-4 mb-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} BuscArt. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}