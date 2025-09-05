import { Metadata } from 'next';
import { BadgeCheck, BarChart2, Calendar, CheckCircle, Clock, DollarSign, Headphones, Lightbulb, Megaphone, Palette, Percent, Sparkles, Target, TrendingUp, Users, Zap, Star, ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/src/components/landing/components/Navigation';

export const metadata: Metadata = {
  title: 'Servicios - BuscArt',
  description: 'Descubre nuestros planes y servicios para artistas y gestores culturales. Prueba gratis por 2 meses sin comisiones.',
};

function ServiciosContent() {
  const pricingPlans = [
    {
      name: 'Prueba Gratis',
      price: '$0',
      duration: '2 meses',
      description: 'Ideal para comenzar',
      features: [
        'Sin comisiones por ventas',
        'Perfil de artista completo',
        'Acceso a ofertas de trabajo',
        'Soporte por correo electrónico',
        '2 meses sin compromiso'
      ],
      cta: 'Comenzar prueba gratis',
      popular: true,
      highlight: '¡Mejor oferta!'
    },
    {
      name: 'Plan Premium',
      price: '10%',
      duration: 'por venta',
      description: 'Después del período de prueba',
      features: [
        'Solo pagas cuando vendes',
        'Todo lo del plan gratuito',
        'Destacado en búsquedas',
        'Estadísticas avanzadas',
        'Soporte prioritario'
      ],
      cta: 'Saber más',
      popular: false
    }
  ];

  const services = [
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: 'Posicionamiento de Eventos',
      description: 'Estrategias de marketing digital para dar mayor visibilidad a tus eventos culturales y artísticos.',
      color: 'emerald'
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: 'Asesoría en Marketing Cultural',
      description: 'Desarrollamos planes personalizados para promocionar tu trabajo artístico de manera efectiva.',
      color: 'fuchsia'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Estrategias de Crecimiento',
      description: 'Te ayudamos a expandir tu audiencia y aumentar tu presencia en el sector cultural.',
      color: 'purple'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Producción de Contenido',
      description: 'Creamos contenido profesional para mostrar tu trabajo en redes sociales y plataformas digitales.',
      color: 'emerald'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Gestión de Comunidad',
      description: 'Construimos y mantenemos una comunidad comprometida con tu trabajo artístico.',
      color: 'fuchsia'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Campañas Publicitarias',
      description: 'Diseñamos campañas efectivas en redes sociales y medios digitales para promocionar tus eventos.',
      color: 'purple'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Registro Gratis',
      description: 'Crea tu perfil en minutos y completa tu portafolio.',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: '02',
      title: 'Período de Prueba',
      description: 'Disfruta de 2 meses sin comisiones por ventas.',
      icon: <Clock className="w-6 h-6" />
    },
    {
      step: '03',
      title: 'Comienza a Vender',
      description: 'Recibe ofertas y contrata artistas sin intermediarios.',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      step: '04',
      title: 'Continúa con Ventajas',
      description: 'Después de la prueba, solo pagas el 10% por cada venta exitosa.',
      icon: <Percent className="w-6 h-6" />
    }
  ];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-300/60 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-fuchsia-300/60 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-emerald-300/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-fuchsia-300/60 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-400/5 border border-emerald-400/15 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 text-emerald-300/80" />
              <span className="text-emerald-200/90 text-sm font-medium">Prueba gratis por 2 meses</span>
            </div>

            {/* Main title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
              <span className="text-white">NUESTROS</span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
                SERVICIOS
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Impulsa tu carrera artística con herramientas profesionales y estrategias probadas
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-400 to-fuchsia-400 px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-300 hover:to-fuchsia-300 transition-all duration-300 flex items-center gap-2">
                Empezar ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border border-emerald-300/25 text-emerald-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-300/5 transition-all duration-300 flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Ver demo
              </button>
            </div>
          </div>
        </div>

        {/* Decorative lines */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"></div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">PLANES</span>
              <span className="text-emerald-300"> & </span>
              <span className="text-fuchsia-300">PRECIOS</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Sin sorpresas, sin compromisos a largo plazo
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative group ${
                  plan.popular 
                    ? 'order-first lg:order-none' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-emerald-300 to-purple-300 text-black text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.highlight}
                    </div>
                  </div>
                )}
                
                <div className={`relative p-8 rounded-3xl border transition-all duration-500 group-hover:scale-105 ${
                  plan.popular 
                    ? 'border-emerald-300/40 bg-gradient-to-b from-emerald-950/15 to-purple-950/15 shadow-2xl shadow-emerald-400/5' 
                    : 'border-gray-700 bg-gray-900/30 hover:border-purple-300/40'
                } backdrop-blur-sm`}>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className={`text-5xl font-black ${
                        plan.popular ? 'text-emerald-300' : 'text-white'
                      }`}>
                        {plan.price}
                      </span>
                      {plan.duration && (
                        <span className="ml-2 text-gray-400">/ {plan.duration}</span>
                      )}
                    </div>
                    <p className="text-gray-300">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-400 to-purple-400 text-white hover:from-emerald-300 hover:to-purple-300'
                      : 'border border-gray-600 text-white hover:bg-white hover:text-black'
                  }`}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 max-w-2xl mx-auto">
              Los pagos por comisiones nos permiten seguir mejorando la plataforma y desarrollar nuevas funcionalidades.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-white">¿CÓMO</span>
            <span className="text-fuchsia-300"> FUNCIONA</span>
            <span className="text-emerald-300">?</span>
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative group">
                  {/* Connection line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-300/30 to-transparent z-0"></div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    
                    <div className="text-6xl font-black text-gray-800 mb-4 group-hover:text-gray-700 transition-colors">
                      {step.step}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">SERVICIOS</span>
              <br />
              <span className="text-purple-300">ADICIONALES</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Herramientas profesionales para llevar tu carrera al siguiente nivel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="group relative h-full">
                <div className="relative p-8 rounded-2xl border border-gray-800 bg-gray-900/20 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 group-hover:scale-105 h-full flex flex-col">
                  
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                    service.color === 'emerald' ? 'bg-emerald-400/8 text-emerald-300' :
                    service.color === 'fuchsia' ? 'bg-fuchsia-400/8 text-fuchsia-300' :
                    'bg-purple-400/8 text-purple-300'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Hover effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    service.color === 'emerald' ? 'bg-gradient-to-br from-emerald-400/3 to-transparent' :
                    service.color === 'fuchsia' ? 'bg-gradient-to-br from-fuchsia-400/3 to-transparent' :
                    'bg-gradient-to-br from-purple-400/3 to-transparent'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-white">¿LISTO PARA</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                IMPULSAR TU CARRERA?
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Únete a cientos de artistas que ya están creciendo con nosotros
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/registro" 
                className="group bg-gradient-to-r from-emerald-400 to-purple-400 px-10 py-5 rounded-full font-bold text-lg hover:from-emerald-300 hover:to-purple-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Comenzar prueba gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/contacto" 
                className="border-2 border-gray-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Hablar con un asesor
              </Link>
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
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
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
    </div>
  );
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="pt-20">
        <ServiciosContent />
      </main>
    </div>
  );
}