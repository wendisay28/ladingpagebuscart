import { Mail, Phone, MapPin, Send, ArrowRight, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Navigation from "@/src/components/landing/components/Navigation";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-emerald-300" />,
      title: 'Correo Electrónico',
      description: 'info@buscart.com',
      link: 'mailto:info@buscart.com'
    },
    {
      icon: <Phone className="w-6 h-6 text-fuchsia-300" />,
      title: 'Teléfono',
      description: '+57 300 123 4567',
      link: 'tel:+573001234567'
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-300" />,
      title: 'Ubicación',
      description: 'Medellín, Colombia',
      link: 'https://maps.google.com/?q=Medellin,Colombia'
    }
  ];

  const faqs = [
    {
      question: '¿Cómo me registro en la plataforma?',
      answer: 'Puedes registrarte haciendo clic en "Registrarte" en la esquina superior derecha y completando el formulario con tus datos.'
    },
    {
      question: '¿Cuánto cuesta usar BuscArt?',
      answer: 'El registro básico es gratuito por 2 meses. Después solo pagas 10% por venta exitosa. Sin costos ocultos.'
    },
    {
      question: '¿Cómo contacto a un artista?',
      answer: 'Puedes buscar artistas en nuestra sección de exploración y contactarlos directamente a través de sus perfiles verificados.'
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer: 'Sí, ofrecemos soporte por correo electrónico y chat en vivo durante horario laboral para resolver cualquier inconveniente.'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Navigation />
      <main className="relative z-10 pt-20">
        {/* Animated background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-emerald-900/10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-fuchsia-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-emerald-300/60 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-fuchsia-300/60 rounded-full animate-bounce delay-700"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bounce delay-1100"></div>
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-emerald-200/60 rounded-full animate-bounce delay-1500"></div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20 z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-400/5 border border-emerald-400/15 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                <Star className="w-4 h-4 text-emerald-300/80" />
                <span className="text-emerald-200/90 text-sm font-medium">Estamos aquí para ayudarte</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="text-white">CONTÁCT</span>
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">ANOS</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12">
                ¿Tienes alguna pregunta o necesitas ayuda? Nuestro equipo está listo para conectarte con el mundo del arte digital.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div className="bg-gray-900/40 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-xl mr-4 flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Envíanos un mensaje</h2>
                    <p className="text-gray-400 text-sm">Te responderemos lo antes posible</p>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-300/50 focus:border-emerald-300/50 transition-all duration-300"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-fuchsia-300/50 focus:border-fuchsia-300/50 transition-all duration-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-3">
                      Tipo de consulta
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50 transition-all duration-300"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="artist">Soy artista</option>
                      <option value="business">Busco contratar talento</option>
                      <option value="support">Soporte técnico</option>
                      <option value="partnership">Alianzas comerciales</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-3">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-300/50 focus:border-emerald-300/50 transition-all duration-300"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50 transition-all duration-300 resize-none"
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="group w-full relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-400 to-purple-400 text-white font-semibold rounded-xl hover:from-emerald-300 hover:to-purple-300 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative z-10">Enviar mensaje</span>
                    <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>
              </div>

              {/* Contact Info & FAQ */}
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="bg-gray-900/40 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Información de contacto</h2>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Conecta con nosotros através de cualquiera de estos canales. Estamos comprometidos con brindarte la mejor atención.
                  </p>
                  
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <Link 
                        key={index} 
                        href={item.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-6 bg-gray-800/30 border border-gray-700/30 rounded-xl hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <div className={`flex-shrink-0 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                          index === 0 ? 'bg-emerald-400/8 text-emerald-300' :
                          index === 1 ? 'bg-fuchsia-400/8 text-fuchsia-300' :
                          'bg-purple-400/8 text-purple-300'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-white group-hover:text-gray-100 transition-colors duration-300">{item.title}</h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gray-900/40 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-fuchsia-400 to-emerald-400 rounded-lg mr-3 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    Preguntas frecuentes
                  </h3>
                  
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-700/50 pb-6 last:border-b-0 last:pb-0">
                        <h4 className="font-semibold text-white mb-3">{faq.question}</h4>
                        <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <Link 
                      href="/preguntas-frecuentes" 
                      className="group inline-flex items-center text-transparent bg-gradient-to-r from-purple-300 to-emerald-300 bg-clip-text font-medium hover:from-purple-200 hover:to-emerald-200 transition-all duration-300"
                    >
                      Ver todas las preguntas frecuentes
                      <ArrowRight className="w-4 h-4 ml-2 text-purple-300 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative z-10 pb-20">
          <div className="container mx-auto px-4">
            <div className="bg-gray-900/40 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-12 shadow-2xl text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400 rounded-2xl mb-8">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Nuestra Oficina</h3>
              <p className="text-xl text-gray-300 mb-4">Medellín, Colombia</p>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ubicados en el corazón de la innovación colombiana, donde la creatividad y la tecnología se encuentran para transformar la cultura.
              </p>
              
              <Link 
                href="https://maps.google.com/?q=Medellin,Colombia" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-400 to-purple-400 text-white font-semibold rounded-xl hover:from-emerald-300 hover:to-purple-300 transition-all duration-300 transform hover:scale-105"
              >
                <MapPin className="w-5 h-5 mr-3" />
                <span className="relative z-10">Ver en Google Maps</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="relative z-10 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center border-t border-gray-800/50 pt-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-lg mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-white font-bold text-xl">BuscArt</span>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                Conectando artistas con oportunidades en el mundo digital
              </p>
              
              <div className="flex justify-center space-x-8 mb-6">
                <Link href="/privacidad" className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-300">
                  Privacidad
                </Link>
                <Link href="/terminos" className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-300">
                  Términos
                </Link>
                <Link href="/contacto" className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-300">
                  Contacto
                </Link>
              </div>
              
              <p className="text-gray-500 text-xs">
                © 2024 BuscArt. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}