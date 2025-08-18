import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArtistCategory } from '../types';

interface LiveArtistSectionProps {
  onFindArtists: () => void;
  categories: ArtistCategory[];
}

export function LiveArtistSection({ onFindArtists, categories }: LiveArtistSectionProps) {
  return (
    <div className="mb-20 relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="text-white">Tu Evento, Tu Artista, en</span>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"> Minutos</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center mt-12">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden w-full h-96 bg-gray-900 shadow-lg shadow-purple-500/20">
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/Map/map1.jpg" 
                  alt="Mapa de la ciudad"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="bg-purple-700 text-white p-4 rounded-lg shadow-xl w-64">
                  <p className="font-semibold">Carlos Baladista</p>
                  <p className="text-sm text-gray-200">Acepta tu oferta: $250.000</p>
                  <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-500 hover:to-purple-600 text-white">
                    Aceptar Oferta
                  </Button>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                <MapPin className="text-pink-400 w-4 h-4" />
                <div>
                  <p className="font-medium text-white">Se detectaron 10 artistas cerca</p>
                  <p className="text-gray-300 text-xs">Disponibles en tiempo real</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-bold">Artistas disponibles ahora en tu zona</h3>
            <p className="text-gray-300">
              Nuestra plataforma en tiempo localiza automáticamente a los artistas más cercanos a tu ubicación que están disponibles ahora mismo.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/5">
                  <p className="text-gray-400 text-sm">{category.name}</p>
                  <p className="text-2xl font-bold">{category.count}+</p>
                  <p className="text-xs text-green-400">Disponibles</p>
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-500 hover:to-purple-600 text-white py-6 text-lg"
              onClick={onFindArtists}
            >
              Encontrar Artistas Ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
