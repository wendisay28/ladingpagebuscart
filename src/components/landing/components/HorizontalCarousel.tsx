"use client";
import { ReactNode, useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalCarouselProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function HorizontalCarousel({ 
  title, 
  description, 
  children, 
  className = '' 
}: HorizontalCarouselProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll(); // Check initial state
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className={`p-1 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors ${!showLeftButton ? 'opacity-30 cursor-default' : ''}`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`p-1 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors ${!showRightButton ? 'opacity-30 cursor-default' : ''}`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {description && (
        <p className="text-gray-400 text-sm mb-4">{description}</p>
      )}
      
      <div className="relative">
        <div 
          ref={scrollContainer}
          className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 -mx-4 px-4"
        >
          {children}
        </div>
        
        {/* Gradient overlays for better UX */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent"></div>
      </div>
    </div>
  );
}

// Componente para las tarjetas de artista
export function ArtistCard({ 
  name, 
  category, 
  image, 
  rating,
  distance,
  price
}: {
  name: string;
  category: string;
  image: string;
  rating: number;
  distance?: string;
  price?: string;
}) {
  return (
    <div className="flex-shrink-0 w-40 md:w-48 lg:w-56 group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
          <div className="flex items-center space-x-1">
            <div className="text-yellow-400">★</div>
            <span className="text-xs text-white">{rating}</span>
          </div>
          {distance && (
            <div className="text-xs text-gray-300 flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-green-500 mr-1"></span>
              {distance} km
            </div>
          )}
          {price && (
            <div className="text-xs font-medium text-white mt-1">
              Desde ${price}/hora
            </div>
          )}
        </div>
      </div>
      <h3 className="text-sm font-medium text-white truncate">{name}</h3>
      <p className="text-xs text-gray-400 truncate">{category}</p>
    </div>
  );
}

// Componente para las tarjetas de categoría
export function CategoryCard({ 
  name, 
  image,
  count = 0
}: {
  name: string;
  image: string;
  count?: number;
}) {
  return (
    <div className="flex-shrink-0 w-40 md:w-48 lg:w-56 group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-2">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
          <div>
            <h3 className="text-sm font-medium text-white">{name}</h3>
            {count > 0 && (
              <p className="text-xs text-gray-300">{count} artistas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
