'use client';
import { useState, useEffect } from 'react';
import { X, Search, CalendarCheck, Handshake, Shield, Tag, MessageSquare, Star, Award, FileSignature, MapPin, Clock, Users, Zap, CheckCircle, AlertTriangle, Music, Mic, Volume2, Phone } from 'lucide-react';

export default function BuscoArtistasPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    budget: '',
    description: ''
  });
  
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isSearching, setIsSearching] = useState(false);
  const [artistsFound, setArtistsFound] = useState(0);
  const [emergencyRequest, setEmergencyRequest] = useState({
    location: '',
    eventType: 'fiesta',
    budget: '',
    details: ''
  });
  
  useEffect(() => {
    if (isSearching && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
        
        if (timeLeft % 30 === 0) {
          setArtistsFound(prev => Math.min(prev + Math.floor(Math.random() * 3) + 1, 15));
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isSearching, timeLeft]);
  
  const handleEmergencySearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeLeft(30 * 60);
    setArtistsFound(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setShowQuoteModal(false);
  };

  const benefits = [
    { icon: <Shield className="w-6 h-6 text-emerald-400" />, title: "Pago seguro", description: "Tu dinero está protegido hasta que el servicio sea completado satisfactoriamente." },
    { icon: <Tag className="w-6 h-6 text-purple-400" />, title: "Mejor precio garantizado", description: "Compara ofertas y elige la que mejor se adapte a tu presupuesto." },
    { icon: <MessageSquare className="w-6 h-6 text-blue-400" />, title: "Comunicación directa", description: "Chatea directamente con los artistas para aclarar dudas antes de contratar." },
    { icon: <Star className="w-6 h-6 text-yellow-400" />, title: "Artistas verificados", description: "Todos los artistas pasan por un proceso de verificación de identidad y experiencia." },
    { icon: <Award className="w-6 h-6 text-pink-400" />, title: "Calificaciones y reseñas", description: "Lee opiniones reales de otros organizadores de eventos." },
    { icon: <FileSignature className="w-6 h-6 text-indigo-400" />, title: "Contrato digital", description: "Firma electrónica de contratos para mayor seguridad y comodidad." }
  ];

  const steps = [
    { number: 1, title: "Describe tu evento", description: "Cuéntanos qué necesitas, tu presupuesto y fecha del evento.", icon: <MessageSquare className="w-8 h-8 text-purple-400" /> },
    { number: 2, title: "Recibe ofertas", description: "Los artistas interesados te enviarán sus propuestas personalizadas.", icon: <Handshake className="w-8 h-8 text-blue-400" /> },
    { number: 3, title: "Compara y elige", description: "Revisa perfiles, portafolios, reseñas y elige al mejor.", icon: <Search className="w-8 h-8 text-green-400" /> },
    { number: 4, title: "Contrata seguro", description: "Firma el contrato digital y realiza el pago protegido.", icon: <Shield className="w-8 h-8 text-yellow-400" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.3),transparent)] animate-pulse"></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative transform animate-scaleIn">
            <button 
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 transform"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Solicitar Cotización
              </h2>
              <p className="text-gray-400 mt-2">Cuéntanos sobre tu evento y te conectaremos con los mejores artistas</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tipo de Evento</label>
                <input
                  name="eventType"
                  type="text" 
                  value={formData.eventType}
                  onChange={handleInputChange}
                  placeholder="Ej: Boda, Fiesta de Cumpleaños, Evento Corporativo" 
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Fecha del Evento</label>
                  <input
                    name="eventDate"
                    type="date" 
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Presupuesto</label>
                  <input
                    name="budget"
                    type="number" 
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="$500,000" 
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Descripción del Evento</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos más sobre tu evento: ubicación, número de invitados, ambiente deseado, etc." 
                  rows={4} 
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-6">
                <button 
                  type="button" 
                  onClick={() => setShowQuoteModal(false)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-12">

              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Contrata al Artista
                </span>
                <br />
                <span className="text-white relative">
                  Perfecto
                  <div className="absolute -right-4 -top-2 w-8 h-8 bg-purple-500/20 rounded-full animate-ping"></div>
                  <div className="absolute -right-4 -top-2 w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Conectamos organizadores de eventos con los mejores artistas locales en tiempo real. 
                <span className="text-purple-400 font-semibold block mt-2">
                  ✨ Fácil, rápido y seguro - Respuesta garantizada en 30 minutos
                </span>
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Pago 100% seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Artistas verificados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Miles de reseñas 5★</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setShowQuoteModal(true)}
                className="relative group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/30 text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">Solicitar Cotización Gratis</span>
              </button>
              
              <button 
                onClick={() => setShowEmergencyModal(true)}
                className="relative group px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-orange-500/30 text-lg flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-6 h-6 animate-pulse" />
                  ¡Necesito un artista YA!
                </span>
              </button>
            </div>
            
            {/* Social proof */}
            <p className="text-gray-500 text-sm mt-8">
              Más de 10,000 organizadores confían en nosotros cada mes
            </p>
          </div>
        </section>

        {/* Emergency Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-3xl p-12 border border-red-500/20 relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-8">
                  <div>
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-medium mb-6">
                      <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      SERVICIO DE EMERGENCIA 24/7
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                      ¿Necesitas un artista{" "}
                      <span className="text-orange-400 animate-pulse">AHORA MISMO</span>?
                    </h2>
                    
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                      ¿Tu artista canceló a última hora? ¿Tienes un evento inesperado? 
                      No te preocupes, tenemos artistas listos para actuar en menos de 30 minutos.
                    </p>
                  </div>
                  
                  {!isSearching ? (
                    <div className="space-y-6">
                      <button 
                        onClick={() => setShowEmergencyModal(true)}
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-orange-500/30 text-lg flex items-center gap-3"
                      >
                        <Zap className="w-6 h-6" />
                        ¡Necesito un artista YA!
                      </button>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Respuesta en 5 min
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Atención 24/7
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Garantizado
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/30">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-orange-400 mb-3">
                          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                        <p className="text-gray-300 mb-6">Buscando artistas disponibles cerca de ti...</p>
                        
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full animate-pulse" 
                            style={{ width: `${100 - (timeLeft / (30 * 60)) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-2xl text-orange-300 font-bold mb-2">
                          {artistsFound} artistas disponibles encontrados
                        </div>
                        <p className="text-sm text-gray-400">
                          Nuestro equipo está contactando a artistas disponibles en tu zona
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Success Stories */}
                <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 lg:max-w-md w-full">
                  <h3 className="text-2xl font-bold mb-6 text-orange-300">Historias de éxito</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-500/20 p-3 rounded-xl flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          "El músico que había contratado canceló 1 hora antes de mi boda. 
                          ¡Gracias a este servicio encontré un violinista increíble que salvó el día!"
                        </p>
                        <p className="text-orange-400 text-xs mt-2 font-medium">- Ana M., Boda en Medellín</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-500/20 p-3 rounded-xl flex-shrink-0">
                        <Star className="w-5 h-5 text-orange-300" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          "Para el cumpleaños sorpresa de mi esposo, el DJ no llegó. 
                          En 20 minutos teníamos a un músico profesional que hizo la fiesta inolvidable."
                        </p>
                        <p className="text-orange-400 text-xs mt-2 font-medium">- Carlos R., Fiesta en Bogotá</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ¿Cómo funciona?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              En 4 simples pasos conectamos tu evento con el artista ideal
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50"></div>
            
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all duration-500 hover:transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Beneficios únicos
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Todo lo que necesitas para contratar artistas con total confianza
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group h-full">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Artist Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl p-12 border border-purple-500/20 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Tu Evento, Tu Artista, en </span>
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Minutos
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Tecnología en tiempo real que localiza artistas disponibles cerca de ti
                </p>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Map Section */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl shadow-purple-500/20 h-[500px]">
                    {/* Map placeholder */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
                      {/* Grid pattern overlay */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full" style={{
                          backgroundImage: `
                            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>
                      
                      {/* Map elements */}
                      <div className="absolute inset-0 p-4">
                        {/* Streets */}
                        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-600"></div>
                        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gray-600"></div>
                        <div className="absolute left-1/4 top-0 h-full w-0.5 bg-gray-600"></div>
                        <div className="absolute left-3/4 top-0 h-full w-0.5 bg-gray-600"></div>
                        
                        {/* Location pins for other artists */}
                        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        
                        {/* Main location pin */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-purple-500 rounded-full animate-bounce flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Map label */}
                      <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-black/60 px-2 py-1 rounded">
                        Bogotá, Colombia
                      </div>
                    </div>
                    
                    {/* Artist notification */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-fadeInScale">
                      <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-4 rounded-xl shadow-2xl border border-white/20 max-w-72">
                        {/* Header with avatar and info */}
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">
                            CB
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 text-sm">Carlos Baladista</h3>
                              <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                Verificado
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-600">Músico certificado</span>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs font-medium text-gray-700 ml-1">4.9</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Offer details */}
                        <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-green-800 font-medium text-sm">Acepta tu oferta:</span>
                            <span className="text-lg font-bold text-green-700">$250.000</span>
                          </div>
                        </div>
                        
                        {/* Countdown timer */}
                        <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-orange-600" />
                              <span className="text-orange-800 text-xs font-medium">Oferta válida por:</span>
                            </div>
                            <div className="text-orange-700 font-bold text-sm">
                              14:32
                            </div>
                          </div>
                          <div className="w-full bg-orange-200 rounded-full h-1.5 mt-1">
                            <div className="bg-orange-500 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg py-2 text-xs font-medium transition-all duration-200 hover:scale-105">
                            Aceptar Oferta
                          </button>
                          <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
                            <MessageSquare className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats overlay */}
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm max-w-64">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white font-medium">Artistas disponibles:</span>
                          </div>
                          <span className="text-green-400 font-bold">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs">En un radio de 5km</span>
                          <span className="text-blue-400 text-xs">Tiempo real</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Distance indicator */}
                    <div className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-medium">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      2.3 km
                    </div>
                  </div>
                </div>
                
                {/* Info Section */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Artistas disponibles ahora en tu zona</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Nuestra plataforma en tiempo real localiza automáticamente a los artistas más cercanos 
                      a tu ubicación que están disponibles ahora mismo.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Músicos', count: 24, color: 'bg-blue-500/20 border-blue-400/30' },
                      { name: 'DJs', count: 18, color: 'bg-purple-500/20 border-purple-400/30' },
                      { name: 'Payasos', count: 9, color: 'bg-pink-500/20 border-pink-400/30' },
                      { name: 'Otros', count: 15, color: 'bg-green-500/20 border-green-400/30' }
                    ].map((category, index) => (
                      <div key={index} className={`${category.color} p-4 rounded-xl border backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                        <p className="text-gray-300 text-sm">{category.name}</p>
                        <p className="text-2xl font-bold text-white">{category.count}+</p>
                        <p className="text-xs text-green-400 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                          Disponibles
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/30"
                    onClick={() => setShowQuoteModal(true)}
                  >
                    Encontrar Artistas Ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-3xl p-16 text-center border border-purple-500/20 relative overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                ¿Listo para encontrar a tu{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  artista ideal?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Miles de organizadores ya han encontrado al artista perfecto para sus eventos. 
                Únete a nuestra comunidad y descubre el talento local.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowQuoteModal(true)}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/30 text-lg"
                >
                  Comenzar Ahora - Es Gratis
                </button>
                <button className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-lg">
                  Ver Artistas Disponibles
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Emergency Request Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform animate-scaleIn">
            <button 
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 transform"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-red-500/20 p-2 rounded-lg mr-3">
                  <Zap className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">¡Necesito un artista YA!</h2>
                  <p className="text-red-300 text-sm">Servicio de emergencia 24/7</p>
                </div>
              </div>
              <p className="text-gray-400">
                Completa este formulario y encontraremos artistas disponibles en tu zona de inmediato.
              </p>
            </div>
            
            <form onSubmit={handleEmergencySearch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Ubicación del evento</label>
                <input
                  type="text" 
                  value={emergencyRequest.location}
                  onChange={(e) => setEmergencyRequest({...emergencyRequest, location: e.target.value})}
                  placeholder="Dirección o barrio" 
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tipo de evento</label>
                <select
                  value={emergencyRequest.eventType}
                  onChange={(e) => setEmergencyRequest({...emergencyRequest, eventType: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                >
                  <option value="fiesta">Fiesta privada</option>
                  <option value="boda">Boda</option>
                  <option value="corporativo">Evento corporativo</option>
                  <option value="restaurante">Restaurante/Bar</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Presupuesto aproximado</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="text" 
                    value={emergencyRequest.budget}
                    onChange={(e) => setEmergencyRequest({...emergencyRequest, budget: e.target.value})}
                    placeholder="500,000" 
                    className="w-full pl-8 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Detalles importantes</label>
                <textarea
                  value={emergencyRequest.details}
                  onChange={(e) => setEmergencyRequest({...emergencyRequest, details: e.target.value})}
                  placeholder="Ej: Necesito un DJ para 3 horas, evento al aire libre, 100 personas..." 
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 resize-none"
                />
              </div>
              
              <div className="bg-orange-900/30 border border-orange-500/30 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-orange-200 text-sm font-medium mb-1">Importante:</p>
                    <p className="text-orange-300 text-sm">
                      Nuestro equipo contactará a artistas disponibles en tu zona. 
                      La tarifa puede incluir un recargo por servicio de última hora.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowEmergencyModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                >
                  Buscar Artistas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}