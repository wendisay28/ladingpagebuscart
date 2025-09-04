import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Clock, UserCheck, MapPin, Calendar, AlertTriangle, Music, DollarSign } from 'lucide-react';

// ===== Types =====
type EventType = 'fiesta' | 'boda' | 'corporativo' | 'cumpleanos' | 'otro';

interface EmergencyRequest {
  location: string;
  eventType: EventType;
  budget: string;
  details: string;
}

interface EmergencyArtistSectionProps {
  onEmergencyRequest: (data: EmergencyRequest) => void;
  isSearching: boolean;
  timeLeft: number;
  artistsFound: number;
}

// ===== Constants =====
const EVENT_TYPES = [
  { value: 'fiesta' as const, label: 'Fiesta', icon: <Music className="w-4 h-4" /> },
  { value: 'boda' as const, label: 'Boda', icon: <Calendar className="w-4 h-4" /> },
  { value: 'corporativo' as const, label: 'Evento Corporativo', icon: <UserCheck className="w-4 h-4" /> },
  { value: 'cumpleanos' as const, label: 'Cumpleaños', icon: <Clock className="w-4 h-4" /> },
  { value: 'otro' as const, label: 'Otro', icon: <AlertTriangle className="w-4 h-4" /> },
];

const EMERGENCY_SURCHARGE = 0.2; // 20% de recargo por servicio de emergencia

// ===== Component =====

export function EmergencyArtistSection({ 
  onEmergencyRequest, 
  isSearching, 
  timeLeft, 
  artistsFound 
}: EmergencyArtistSectionProps) {
  // ===== State =====
  const [showModal, setShowModal] = useState(false);
  const [request, setRequest] = useState<EmergencyRequest>({
    location: '',
    eventType: 'fiesta',
    budget: '',
    details: ''
  });

  // ===== Handlers =====
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmEmergencyRequest = () => {
    onEmergencyRequest(request);
    setShowModal(false);
  };

  // ===== Utility Functions =====
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (value: string): string => {
    if (!value) return 'No especificado';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(Number(value));
  };

  const calculateTotalWithSurcharge = (): string => {
    if (!request.budget) return 'N/A';
    const total = Number(request.budget) * (1 + EMERGENCY_SURCHARGE);
    return formatCurrency(total.toString());
  };

  // ===== Render =====
  return (
    <section className="mb-20 bg-gradient-to-br from-red-900/20 to-pink-900/20 p-6 sm:p-8 rounded-2xl border border-red-500/20 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/public/noise.png')] opacity-5 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 px-2 sm:px-0">
          <span className="inline-flex items-center gap-2 bg-red-900/50 text-red-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-red-500/20">
            <AlertTriangle className="w-4 h-4" />
            Servicio de Emergencia
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">¿Necesitas un artista para hoy?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Si tu evento es hoy y necesitas un artista con urgencia, nuestro equipo se pondrá en acción para encontrarte a alguien increíble en tiempo récord.
          </p>
        </header>
        
        {/* Emergency Request Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-900/95 rounded-2xl border border-red-500/30 max-w-2xl w-full overflow-hidden animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Confirmar Solicitud de Emergencia</h3>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  <p className="text-gray-300">
                    Por favor revisa los detalles de tu solicitud antes de confirmar:
                  </p>
                  
                  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700/50">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-400 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          Ubicación
                        </p>
                        <p className="font-medium text-white">
                          {request.location || 'No especificada'}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-gray-400 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          Tipo de evento
                        </p>
                        <p className="font-medium text-white capitalize">
                          {EVENT_TYPES.find(t => t.value === request.eventType)?.label || request.eventType}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-gray-400 flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4" />
                          Presupuesto
                        </p>
                        <p className="font-medium text-white">
                          {request.budget ? formatCurrency(request.budget) : 'No especificado'}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-gray-400">Recargo por emergencia</p>
                        <p className="font-medium text-yellow-400">
                          {EMERGENCY_SURCHARGE * 100}%
                        </p>
                      </div>
                      
                      <div className="space-y-1 md:col-span-2">
                        <p className="text-sm text-gray-400">Total con recargo</p>
                        <p className="text-xl font-bold text-red-400">
                          {calculateTotalWithSurcharge()}
                        </p>
                      </div>
                    </div>
                    
                    {request.details && (
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <p className="text-sm text-gray-400 mb-2">Detalles adicionales:</p>
                        <p className="text-gray-300 text-sm bg-gray-800/30 p-3 rounded-lg">
                          {request.details}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-700/30 text-yellow-300 text-sm p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">¡Atención! Recargo por servicio de emergencia</p>
                        <p className="text-yellow-200/80">
                          Por ser una solicitud de última hora, se aplica un recargo del {EMERGENCY_SURCHARGE * 100}% sobre el valor del servicio. 
                          Este recargo nos permite movilizar rápidamente a nuestros artistas para atender tu solicitud de inmediato.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setShowModal(false)}
                    className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 transition-colors"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="button"
                    onClick={confirmEmergencyRequest}
                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    Confirmar y Pagar {request.budget && `(${calculateTotalWithSurcharge()})`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Form Section */}
        {!isSearching ? (
          <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/5 shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-400" />
              Cuéntanos sobre tu evento
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Location Input */}
              <div className="space-y-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                  Ubicación del evento
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="¿Dónde será el evento?"
                    value={request.location}
                    onChange={handleInputChange}
                    className="pl-9 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors"
                  />
                </div>
              </div>

              {/* Event Type Select */}
              <div className="space-y-1">
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-300">
                  Tipo de evento
                </label>
                <div className="relative">
                  <select
                    id="eventType"
                    name="eventType"
                    value={request.eventType}
                    onChange={handleInputChange}
                    className="w-full p-2.5 rounded-lg bg-gray-800/50 border border-gray-700 text-white text-sm focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 appearance-none pr-8"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Budget Input */}
              <div className="space-y-1">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300">
                  Presupuesto aproximado
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Ej: 500.000"
                    value={request.budget}
                    onChange={handleInputChange}
                    min="0"
                    className="pl-9 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-1">
                <label htmlFor="details" className="block text-sm font-medium text-gray-300">
                  Detalles adicionales
                </label>
                <Textarea 
                  id="details"
                  name="details"
                  placeholder="¿Qué tipo de artista necesitas? ¿Algún género musical en particular?"
                  rows={3}
                  value={request.details}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors"
                />
              </div>

              {/* Info Alert */}
              <div className="bg-yellow-900/20 border border-yellow-700/30 text-yellow-300 text-xs sm:text-sm p-3 sm:p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">¡Importante!</p>
                    <p className="text-yellow-200/80">
                      Nuestro equipo contactará a artistas disponibles en tu zona. 
                      La tarifa puede incluir un recargo por servicio de última hora.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 text-sm sm:text-base font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Buscar Artistas
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/5 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-900/30 to-pink-900/30 mb-5 sm:mb-6 border border-red-500/20 animate-pulse">
              <svg className="animate-spin h-7 w-7 sm:h-8 sm:w-8 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Buscando artistas disponibles</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">Estamos contactando a los mejores artistas en tu zona.</p>
            
            <div className="w-full bg-gray-800/50 rounded-full h-2 sm:h-2.5 mb-5 sm:mb-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-500 to-pink-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${100 - (timeLeft / 30) * 100}%`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              ></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Tiempo: {formatTime(timeLeft)}</span>
              </div>
              <div className="w-px h-4 bg-gray-700"></div>
              <div className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-1.5 rounded-full">
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{artistsFound} artistas encontrados</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
