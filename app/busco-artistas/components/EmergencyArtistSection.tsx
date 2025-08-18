import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface EmergencyArtistSectionProps {
  onEmergencyRequest: (data: { location: string; eventType: string; budget: string; details: string }) => void;
  isSearching: boolean;
  timeLeft: number;
  artistsFound: number;
}

export function EmergencyArtistSection({ 
  onEmergencyRequest, 
  isSearching, 
  timeLeft, 
  artistsFound 
}: EmergencyArtistSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [request, setRequest] = useState({
    location: '',
    eventType: 'fiesta',
    budget: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmergencyRequest(request);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-20 bg-gradient-to-br from-red-900/20 to-pink-900/20 p-8 rounded-2xl border border-red-500/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/public/noise.png')] opacity-5 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="text-center mb-8">
          <span className="bg-red-900/50 text-red-400 text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block border border-red-500/20">
            Servicio de Emergencia
          </span>
          <h2 className="text-3xl font-bold mb-4">¿Necesitas un artista para hoy?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Si tu evento es hoy y necesitas un artista con urgencia, nuestro equipo se pondrá en acción para encontrarte a alguien increíble en tiempo récord.
          </p>
        </div>

        {!isSearching ? (
          <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/5">
            <h3 className="text-xl font-semibold mb-4">Cuéntanos sobre tu evento</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Ubicación</label>
                  <Input 
                    required 
                    placeholder="¿Dónde es el evento?"
                    value={request.location}
                    onChange={(e) => setRequest({...request, location: e.target.value})}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Tipo de evento</label>
                  <select 
                    value={request.eventType}
                    onChange={(e) => setRequest({...request, eventType: e.target.value})}
                    className="w-full p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white"
                  >
                    <option value="fiesta">Fiesta</option>
                    <option value="matrimonio">Matrimonio</option>
                    <option value="empresarial">Evento Empresarial</option>
                    <option value="cumpleanos">Cumpleaños</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Presupuesto aproximado</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                    <Input 
                      type="number" 
                      placeholder="Ej: 500.000"
                      value={request.budget}
                      onChange={(e) => setRequest({...request, budget: e.target.value})}
                      className="pl-8 bg-gray-800/50 border-gray-700"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Detalles adicionales</label>
                  <Textarea 
                    placeholder="¿Qué tipo de artista necesitas? ¿Algún género musical en particular?"
                    rows={3}
                    value={request.details}
                    onChange={(e) => setRequest({...request, details: e.target.value})}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white py-6 text-lg"
                >
                  Buscar Artista de Emergencia
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/5 text-center">
            <div className="animate-pulse mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto flex items-center justify-center text-2xl font-bold">
                {artistsFound}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Buscando artistas disponibles...</h3>
            <p className="text-gray-400 mb-6">Estamos contactando a los artistas en tu área que podrían estar disponibles.</p>
            
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <div className="text-3xl font-mono font-bold text-white mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-400">Tiempo restante</div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
              <div 
                className="bg-gradient-to-r from-red-500 to-pink-500 h-2.5 rounded-full" 
                style={{ width: `${100 - (timeLeft / (30 * 60)) * 100}%` }}
              ></div>
            </div>
            
            <p className="text-green-400 mb-6">
              {artistsFound} {artistsFound === 1 ? 'artista ha aceptado' : 'artistas han aceptado'} tu solicitud
            </p>
            
            <Button 
              variant="outline" 
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-white"
              onClick={() => {
                // Reset search logic would go here
              }}
            >
              Cancelar Búsqueda
            </Button>
          </div>
        )}
        
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Respuesta en minutos',
              description: 'Nuestro equipo trabaja las 24/7 para encontrar artistas disponibles para tu evento de último momento.'
            },
            {
              title: 'Garantía de satisfacción',
              description: 'Si el artista no cumple con tus expectativas, trabajaremos para encontrar un reemplazo de inmediato.'
            },
            {
              title: 'Pago seguro',
              description: 'Solo pagas cuando confirmes al artista. Tu pago está protegido hasta que el servicio sea completado.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Emergency Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-red-500/30 max-w-2xl w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Confirmar Solicitud de Emergencia</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-300">Estás a punto de solicitar un artista de emergencia con los siguientes detalles:</p>
                
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Ubicación</p>
                      <p className="font-medium">{request.location || 'No especificada'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Tipo de evento</p>
                      <p className="font-medium capitalize">{request.eventType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Presupuesto</p>
                      <p className="font-medium">{request.budget ? `$${parseInt(request.budget).toLocaleString()}` : 'No especificado'}</p>
                    </div>
                  </div>
                  
                  {request.details && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-1">Detalles adicionales</p>
                      <p className="text-sm">{request.details}</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-yellow-900/30 border border-yellow-700/50 text-yellow-300 text-sm p-4 rounded-lg">
                  <p className="font-medium mb-1">¡Atención!</p>
                  <p>Por ser una solicitud de emergcia, se aplica un recargo del 20% sobre el valor del servicio. ¿Deseas continuar?</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowModal(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={() => {
                    onEmergencyRequest(request);
                    setShowModal(false);
                  }}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500"
                >
                  Confirmar y Pagar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
