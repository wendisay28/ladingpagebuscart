import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useState } from 'react';

export function EmergencyArtistSection() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isSearching, setIsSearching] = useState(false);
  const [artistsFound, setArtistsFound] = useState(0);
  
  const handleEmergencySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeLeft(30 * 60);
    setArtistsFound(0);
  };

  return (
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
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">✓</span>
                </div>
                <span>Artistas disponibles en tiempo real</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">✓</span>
                </div>
                <span>Confirmación inmediata</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-bold">✓</span>
                </div>
                <span>Pago seguro al finalizar</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setShowEmergencyModal(true)}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-6 text-lg font-semibold"
              >
                ¡Necesito un artista YA!
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 py-6 text-lg"
              >
                Ver artistas disponibles
              </Button>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-6 w-full max-w-xs">
            <h3 className="text-xl font-bold mb-4 text-center">Historias de éxito</h3>
            <div className="space-y-4">
              <div className="bg-black/40 p-4 rounded-lg">
                <p className="text-sm italic mb-2">"¡Salvaron mi fiesta de cumpleaños! Encontré un cantante 20 minutos antes de que empezara el evento."</p>
                <p className="text-xs text-orange-400">- María G., Medellín</p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg">
                <p className="text-sm italic mb-2">"El DJ que contraté no llegó, pero en 15 minutos tenía un reemplazo profesional."</p>
                <p className="text-xs text-orange-400">- Carlos M., Bogotá</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 relative border border-red-500/30">
            <button 
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold mb-2">Solicitud de Emergencia</h3>
            <p className="text-gray-400 mb-6">Completa el formulario y encontraremos artistas disponibles ahora mismo.</p>
            
            <form onSubmit={handleEmergencySearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ubicación del evento</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="¿Dónde será el evento?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de evento</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                >
                  <option value="fiesta">Fiesta</option>
                  <option value="boda">Boda</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Presupuesto aproximado</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Ej: $300.000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Detalles adicionales</label>
                <textarea 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white h-24"
                  placeholder="¿Qué tipo de artista necesitas? ¿Algún género musical específico?"
                ></textarea>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 text-lg font-semibold"
                >
                  Buscar Artistas Ahora
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
