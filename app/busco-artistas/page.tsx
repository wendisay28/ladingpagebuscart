'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, X, Search, CalendarCheck, Handshake, Shield, Tag, MessageSquare, Star, Award, FileSignature, MapPin } from 'lucide-react';
// Import data
import { benefits, artistCategories, howItWorks } from './data';

// Import components
import { Benefits } from './components/Benefits';
import { LiveArtistSection } from './components/LiveArtistSection';
import { EmergencyArtistSection } from './components/EmergencyArtistSection';
import { HowItWorks as HowItWorksComponent } from './components/HowItWorks';

export default function BuscoArtistasPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    budget: '',
    description: ''
  });
  
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
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
        
        // Simulate finding artists
        if (timeLeft % 30 === 0) {
          setArtistsFound(prev => Math.min(prev + Math.floor(Math.random() * 3) + 1, 15));
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isSearching, timeLeft]);
  
  const handleEmergencySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeLeft(30 * 60); // Reset timer
    setArtistsFound(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setShowQuoteModal(false);
  };

  const features = [
    {
      icon: <Search className="w-8 h-8 text-purple-400" />,
      title: "Encuentra al artista ideal",
      description: "Explora perfiles verificados de artistas profesionales que se ajusten a tu evento y presupuesto."
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-green-400" />,
      title: "Disponibilidad en tiempo real",
      description: "Consulta las fechas disponibles de los artistas en tiempo real y agenda sin complicaciones."
    },
    {
      icon: <Handshake className="w-8 h-8 text-blue-400" />,
      title: "Contratación segura",
      description: "Proceso de pago protegido y contrato digital para tu tranquilidad."
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "Pago seguro",
      description: "Tu dinero está protegido hasta que el servicio sea completado satisfactoriamente."
    },
    {
      icon: <Tag className="w-6 h-6 text-purple-400" />,
      title: "Mejor precio garantizado",
      description: "Compara ofertas y elige la que mejor se adapte a tu presupuesto."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      title: "Comunicación directa",
      description: "Chatea directamente con los artistas para aclarar dudas antes de contratar."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      title: "Artistas verificados",
      description: "Todos los artistas pasan por un proceso de verificación de identidad y experiencia."
    },
    {
      icon: <Award className="w-6 h-6 text-pink-400" />,
      title: "Calificaciones y reseñas",
      description: "Lee opiniones reales de otros organizadores de eventos."
    },
    {
      icon: <FileSignature className="w-6 h-6 text-blue-400" />,
      title: "Contrato digital",
      description: "Firma electrónica de contratos para mayor seguridad y comodidad."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl relative">
            <button 
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Solicitar Cotización</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium mb-1">Tipo de Evento</label>
                <Input 
                  id="eventType"
                  name="eventType"
                  type="text" 
                  value={formData.eventType}
                  onChange={handleInputChange}
                  placeholder="Ej: Boda, Fiesta de Cumpleaños, etc." 
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium mb-1">Fecha del Evento</label>
                  <Input 
                    id="eventDate"
                    name="eventDate"
                    type="date" 
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-1">Presupuesto Aproximado</label>
                  <Input 
                    id="budget"
                    name="budget"
                    type="number" 
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="$" 
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción del Evento</label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos más sobre tu evento, ubicación, número de invitados, etc." 
                  rows={4} 
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowQuoteModal(false)}
                  className="border-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Contrata al Artista Perfecto
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Conectamos organizadores de eventos con los mejores artistas locales. Fácil, rápido y seguro.
          </p>
          <Button 
            onClick={() => setShowQuoteModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
          >
            Solicitar Cotización
          </Button>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: 1,
                title: "Describe tu evento",
                description: "Cuéntanos qué necesitas y cuál es tu presupuesto."
              },
              {
                number: 2,
                title: "Recibe ofertas",
                description: "Los artistas interesados te enviarán sus propuestas."
              },
              {
                number: 3,
                title: "Compara y elige",
                description: "Revisa perfiles, portafolios y comentarios."
              },
              {
                number: 4,
                title: "Contrata seguro",
                description: "Firma el contrato digital y realiza el pago protegido."
              }
            ].map((step) => (
              <div key={step.number} className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center text-xl font-bold text-purple-400 mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Beneficios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Artist Section */}
        <div className="mb-20 relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-center mb-4">
              <span className="text-white">Tu Evento, Tu Artista, en</span>
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"> Minutos</span>
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center mt-12">
              {/* Map Section */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden w-full h-96 bg-gray-900 shadow-lg shadow-purple-500/20">
                  {/* Map image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src="/Map/map1.jpg" 
                      alt="Mapa de la ciudad"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  
                  {/* Artist offer */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="bg-purple-700 text-white p-4 rounded-lg shadow-xl w-64">
                      <p className="font-semibold">Carlos Baladista</p>
                      <p className="text-sm text-gray-200">Acepta tu oferta: $250.000</p>
                      <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-500 hover:to-purple-600 text-white">
                        Aceptar Oferta
                      </Button>
                    </div>
                  </div>
                  
                  {/* Nearby artists notification */}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                    <MapPin className="text-pink-400 w-4 h-4" />
                    <div>
                      <p className="font-medium text-white">Se detectaron 10 artistas cerca</p>
                      <p className="text-gray-300 text-xs">Disponibles en tiempo real</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Info Section */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-2xl font-bold">Artistas disponibles ahora en tu zona</h3>
                <p className="text-gray-300">
                  Nuestra plataforma en tiempo localiza automáticamente a los artistas más cercanos a tu ubicación que están disponibles ahora mismo.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { name: 'Músicos', count: 24 },
                    { name: 'DJs', count: 18 },
                    { name: 'Payasos', count: 9 },
                    { name: 'Otros', count: 15 }
                  ].map((category, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <p className="text-gray-400 text-sm">{category.name}</p>
                      <p className="text-2xl font-bold">{category.count}+</p>
                      <p className="text-xs text-green-400">Disponibles</p>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-500 hover:to-purple-600 text-white py-6 text-lg"
                  onClick={() => setShowQuoteModal(true)}
                >
                  Encontrar Artistas Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Artist Section */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-8 mb-12 border border-red-500/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 text-red-300 text-sm font-medium mb-4">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  SERVICIO DE EMERGENCIA
                </div>
                <h2 className="text-3xl font-bold mb-4">¿Necesitas un artista <span className="text-orange-400">AHORA MISMO</span>?</h2>
                <p className="text-lg text-gray-300 mb-6">
                  ¿Tu artista canceló a última hora? ¿Tienes un evento inesperado? No te preocupes, tenemos artistas listos para actuar en menos de 30 minutos.
                </p>
                
                {!isSearching ? (
                  <Button 
                    onClick={() => setShowEmergencyModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg font-semibold"
                  >
                    ¡Necesito un artista YA!
                  </Button>
                ) : (
                  <div className="bg-black/30 p-6 rounded-xl border border-orange-500/30">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-4xl font-bold text-orange-400 mb-2">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </div>
                      <p className="text-gray-300 mb-4">Buscando artistas disponibles cerca de ti...</p>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-red-600 h-2.5 rounded-full" 
                          style={{ width: `${100 - (timeLeft / (30 * 60)) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-lg text-orange-300 font-medium">
                        {artistsFound} artistas disponibles encontrados
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Nuestro equipo está contactando a los artistas más cercanos a tu ubicación
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-black/20 p-6 rounded-xl border border-orange-500/20">
                <h3 className="text-xl font-semibold mb-3 text-orange-300">Historias de éxito</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-orange-500/20 p-2 rounded-lg mr-3">
                      <MessageSquare className="w-5 h-5 text-orange-300" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">"El músico que había contratado canceló 1 hora antes de mi boda. ¡Gracias a este servicio encontré un violinista increíble que salvó el día!"</p>
                      <p className="text-orange-400 text-xs mt-1">- Ana M., Boda en Medellín</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-orange-500/20 p-2 rounded-lg mr-3">
                      <MessageSquare className="w-5 h-5 text-orange-300" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">"Para el cumpleaños sorpresa de mi esposo, el DJ no llegó. En 20 minutos teníamos a un músico profesional que hizo la fiesta inolvidable."</p>
                      <p className="text-orange-400 text-xs mt-1">- Carlos R., Fiesta en Bogotá</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para encontrar a tu artista ideal?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Miles de organizadores ya han encontrado al artista perfecto para sus eventos.
          </p>
          <Button 
            onClick={() => setShowQuoteModal(true)}
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Comenzar Ahora
          </Button>
        </div>
      </div>
      
      {/* Emergency Request Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">¡Necesito un artista YA!</h2>
              <p className="text-gray-400 text-sm">Completa este formulario y encontraremos artistas disponibles en tu zona de inmediato.</p>
            </div>
            
            <form onSubmit={handleEmergencySearch} className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">Ubicación del evento</label>
                <Input 
                  id="location"
                  type="text" 
                  value={emergencyRequest.location}
                  onChange={(e) => setEmergencyRequest({...emergencyRequest, location: e.target.value})}
                  placeholder="Dirección o barrio" 
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium mb-1">Tipo de evento</label>
                <select
                  id="eventType"
                  value={emergencyRequest.eventType}
                  onChange={(e) => setEmergencyRequest({...emergencyRequest, eventType: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="fiesta">Fiesta privada</option>
                  <option value="boda">Boda</option>
                  <option value="corporativo">Evento corporativo</option>
                  <option value="restaurante">Restaurante/Bar</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="emergency-budget" className="block text-sm font-medium mb-1">Presupuesto aproximado</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <Input 
                    id="emergency-budget"
                    type="text" 
                    value={emergencyRequest.budget}
                    onChange={(e) => setEmergencyRequest({...emergencyRequest, budget: e.target.value})}
                    placeholder="Ej: 500.000" 
                    className="pl-8 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="emergency-details" className="block text-sm font-medium mb-1">Detalles importantes</label>
                <Textarea 
                  id="emergency-details"
                  value={emergencyRequest.details}
                  onChange={(e) => setEmergencyRequest({...emergencyRequest, details: e.target.value})}
                  placeholder="Ej: Necesito un DJ para 3 horas, evento al aire libre, 100 personas..." 
                  rows={3}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="bg-orange-900/20 border border-orange-500/30 p-3 rounded-lg text-sm text-orange-200">
                <p>⚠️ <strong>Importante:</strong> Nuestro equipo contactará a artistas disponibles en tu zona. La tarifa puede incluir un recargo por servicio de última hora.</p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowEmergencyModal(false)}
                  className="border-gray-600 hover:bg-gray-700 text-white"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  Buscar Artistas
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
