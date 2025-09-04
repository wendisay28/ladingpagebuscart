"use client";
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Zap, Check, Star, MapPin, Heart, Share2, Info, Music, CalendarCheck } from 'lucide-react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface Artist {
  id: string;
  name: string;
  profession: string;
  price: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
}

const HowItWorksSection = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const inView1 = useInView(ref1, { once: true, amount: 0.5 });
  const inView2 = useInView(ref2, { once: true, amount: 0.5 });
  const inView3 = useInView(ref3, { once: true, amount: 0.5 });

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    if (inView1) controls1.start("visible");
  }, [controls1, inView1]);

  useEffect(() => {
    if (inView2) controls2.start("visible");
  }, [controls2, inView2]);

  useEffect(() => {
    if (inView3) controls3.start("visible");
  }, [controls3, inView3]);

  return (
    <div className="lg:w-1/2 px-0">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          Encuentra el talento perfecto para tu evento y ocasión
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Conectamos organizadores con los mejores artistas y profesionales del entretenimiento
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Paso 1 */}
        <motion.div 
          ref={ref1}
          initial="hidden"
          animate={controls1}
          variants={itemVariants}
          className="group relative pl-4 border-l-2 border-pink-500"
        >
          <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-pink-500"></div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Search className="text-pink-500 mr-3 w-5 h-5" />
            Busca
          </h3>
          <p className="text-gray-300 pl-8">
            Explora entre cientos de artistas y profesionales calificados. Filtra por categoría, ubicación y presupuesto.
          </p>
        </motion.div>
        
        {/* Paso 2 */}
        <motion.div 
          ref={ref2}
          initial="hidden"
          animate={controls2}
          variants={itemVariants}
          className="group relative pl-4 border-l-2 border-purple-500"
        >
          <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Filter className="text-purple-500 mr-3 w-5 h-5" />
            Compara
          </h3>
          <ul className="space-y-2 pl-8">
            <li className="flex items-start">
              <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Revisa portafolios y reseñas</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Compara presupuestos</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Guarda tus favoritos</span>
            </li>
          </ul>
        </motion.div>
        
        {/* Paso 3 */}
        <motion.div 
          ref={ref3}
          initial="hidden"
          animate={controls3}
          variants={itemVariants}
          className="group relative pl-4 border-l-2 border-blue-500"
        >
          <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Zap className="text-blue-500 mr-3 w-5 h-5" />
            Contrata con confianza
          </h3>
          <p className="text-gray-300 pl-8">
            Realiza pagos seguros a través de nuestra plataforma. Tu dinero está protegido hasta que el servicio sea completado.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const featuredArtists: Artist[] = [
  {
    id: '1',
    name: 'María González',
    profession: 'Cantante de boleros',
    price: 'Desde $1,200,000',
    location: 'Medellín, Colombia',
    image: '/artistastop/modelo.jpg',
    rating: 4.9,
    reviews: 127
  },
  {
    id: '2',
    name: 'Carlos Martínez',
    profession: 'Músico profesional',
    price: 'Desde $800,000',
    location: 'Medellín, Colombia',
    image: '/artistastop/pianista.png',
    rating: 4.8,
    reviews: 89
  },
  {
    id: '3',
    name: 'Laura Torres',
    profession: 'Bailarina profesional',
    price: 'Desde $1,000,000',
    location: 'Medellín, Colombia',
    image: '/artistastop/bailarina.jpg',
    rating: 5.0,
    reviews: 203
  },
  {
    id: '4',
    name: 'Javier Ramírez',
    profession: 'DJ profesional',
    price: 'Desde $1,500,000',
    location: 'Medellín, Colombia',
    image: '/artistastop/djs.jpg',
    rating: 4.7,
    reviews: 156
  }
];

export default function ArtistsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredArtists.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredArtists.length - 1 : prevIndex - 1
    );
  };

  const getCardPosition = (index: number) => {
    const positions = ['left', 'center', 'right'];
    const relativeIndex = (index - currentIndex + featuredArtists.length) % featuredArtists.length;
    return positions[relativeIndex] || 'hidden';
  };

  return (
    <section className="py-20 bg-black">
      <div className="w-full max-w-[1250px] mx-auto px-0 overflow-visible">
        {/* Layout en dos columnas lado a lado */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          {/* Columna izquierda - Sección "Cómo Funciona" */}
          <HowItWorksSection />

          {/* Columna derecha - Carrusel de Artistas */}
          <div className="lg:w-1/2 relative">
            <div className="carousel-container relative w-full h-[500px] lg:h-[650px] overflow-visible">
              <div className="flex items-center justify-center h-full">
                <div className="relative w-full max-w-sm ml-44">
                  {featuredArtists.map((artist, index) => {
                    const position = getCardPosition(index);
                    let transformStyle = '';
                    let zIndex = 1;
                    let opacity = 0.4;
                    
                    if (position === 'center') {
                      transformStyle = `translateX(60px) translateY(180px) scale(1.05) translateZ(0)`;
                      zIndex = 10;
                      opacity = 1;
                    } else if (position === 'left') {
                      transformStyle = `translateX(-60px) translateY(180px) scale(0.85) rotateY(15deg) translateZ(-60px)`;
                      zIndex = 5;
                      opacity = 0.6;
                    } else if (position === 'right') {
                      transformStyle = `translateX(180px) translateY(180px) scale(0.85) rotateY(-15deg) translateZ(-60px)`;
                      zIndex = 5;
                      opacity = 0.6;
                    } else {
                      transformStyle = 'translateX(60px) translateY(180px) scale(0.7) translateZ(-120px)';
                      zIndex = 1;
                      opacity = 0.3;
                    }
                    
                    return (
                      <div
                        key={artist.id}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out cursor-pointer"
                        style={{
                          transform: `translate(-50%, -50%) ${transformStyle}`,
                          zIndex: zIndex,
                          opacity: opacity
                        }}
                        onClick={() => setCurrentIndex(index)}
                      >
                        <div className={`bg-gray-900 rounded-[20px] overflow-hidden w-80 h-[28rem] shadow-xl transition-all duration-300 ${
                          position === 'center' ? 'border-2 border-pink-500 shadow-pink-500/30 hover:shadow-pink-500/50' : 'border border-gray-700/50'
                        }`}>
                          {/* Imagen del artista - 60% del height */}
                          <div className="relative h-[60%] overflow-hidden">
                            <img
                              src={artist.image}
                              alt={artist.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyYTM1Ii8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiI+QXJ0aXN0YTwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjU1JSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            
                            {/* Badge de rating - esquina superior derecha */}
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white text-sm font-semibold">{artist.rating}</span>
                            </div>

                            {/* Botones de acción en esquina inferior derecha */}
                            <div className="absolute right-3 bottom-3 flex flex-col gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="p-2 rounded-full text-gray-300 bg-gray-900/80 hover:bg-gray-800/90 hover:text-red-500 transition-all"
                                aria-label="Añadir a favoritos"
                              >
                                <Heart className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="p-2 rounded-full bg-gray-900/80 text-gray-300 hover:bg-gray-800/90 transition-all"
                                aria-label="Compartir"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Contenido de la tarjeta - 40% del height */}
                          <div className="flex flex-col h-[40%] overflow-hidden">
                            <div className="p-4 pb-2">
                              <div className="flex items-baseline gap-2">
                                <h3 className="font-semibold text-lg text-white line-clamp-1">
                                  {artist.name}
                                </h3>
                                <span className="text-xs text-pink-500 font-medium">
                                  • {artist.profession}
                                </span>
                              </div>
                              
                              {/* Rating y reseñas */}
                              <div className="flex items-center mt-1.5 text-sm text-gray-300">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                  <span>{artist.rating}</span>
                                </div>
                                <span className="mx-2">•</span>
                                <span>{artist.reviews} reseñas</span>
                                <span className="flex items-center text-gray-400 ml-3 text-xs">
                                  <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                                  <span className="truncate">{artist.location}</span>
                                </span>
                              </div>
                            </div>

                            <div className="px-4 pb-3 flex-1 overflow-y-auto">
                              {/* Descripción breve */}
                              <p className="text-sm text-gray-300 mb-3 leading-relaxed line-clamp-2">
                                Artista profesional con amplia experiencia en eventos y presentaciones únicas.
                              </p>
                            </div>

                            {/* Pie de tarjeta con precio y botones */}
                            <div className="border-t border-gray-700/50 px-4 py-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center bg-gray-800/80 rounded-full px-3 py-1">
                                  <Music className="w-3.5 h-3.5 mr-1.5 text-pink-500" />
                                  <span className="text-sm text-white font-medium">{artist.price}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                  <button 
                                    className="w-8 h-8 rounded-full border border-pink-500 text-white flex items-center justify-center hover:bg-pink-500/20 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    aria-label="Ver más información"
                                  >
                                    <Info className="w-4 h-4" />
                                  </button>
                                  <button 
                                    className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-500/90 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    aria-label="Contratar"
                                  >
                                    <CalendarCheck className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Botones de navegación - centrados a los lados */}
                <button 
                  onClick={prevCard}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110 z-30 group"
                  aria-label="Artista anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-white group-hover:text-pink-300 transition-colors" />
                </button>
                <button 
                  onClick={nextCard}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110 z-30 group"
                  aria-label="Siguiente artista"
                >
                  <ChevronRight className="w-5 h-5 text-white group-hover:text-pink-300 transition-colors" />
                </button>
              </div>
            </div>

            {/* Indicadores de posición */}
            <div className="flex justify-center space-x-3 -mt-8">
              {featuredArtists.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-pink-500 scale-110' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ir al artista ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}