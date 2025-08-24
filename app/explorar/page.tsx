"use client";
import React, { useMemo, useState } from "react";
import { MapPin, SlidersHorizontal, Star, Sparkles, ChevronLeft, ChevronRight, Search, Info, Heart, Play, Users } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import the CategoriesModal to avoid SSR issues with the document object
const CategoriesModal = dynamic(
  () => import('./components/CategoriesModal'),
  { ssr: false }
);

// Mock data - in production this would come from your data source
const demoArtists = [
  { id: 1, name: "Sofia Martínez", category: "Música", distance: "1.2", price: "150", rating: 4.9, image: "https://images.unsplash.com/photo-1494790108755-2616b332c11c?w=400&h=600&fit=crop" },
  { id: 2, name: "Carlos Rivera", category: "DJ", distance: "2.1", price: "200", rating: 4.8, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
  { id: 3, name: "Ana Gutiérrez", category: "Baile", distance: "0.8", price: "180", rating: 4.9, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop" },
  { id: 4, name: "Miguel Torres", category: "Teatro", distance: "3.5", price: "220", rating: 4.7, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop" },
  { id: 5, name: "Laura Vega", category: "Canto", distance: "1.8", price: "160", rating: 4.8, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop" },
  { id: 6, name: "Andrés López", category: "Stand Up", distance: "4.2", price: "250", rating: 4.6, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" },
  { id: 7, name: "Isabella Cruz", category: "Violín", distance: "2.7", price: "300", rating: 4.9, image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop" },
  { id: 8, name: "Diego Ramírez", category: "Guitarra", distance: "1.5", price: "140", rating: 4.7, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop" }
];

const categories = [
  { id: 1, name: "Música en Vivo", count: 245, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop" },
  { id: 2, name: "DJ & Sonido", count: 189, image: "https://images.unsplash.com/photo-1571327073757-71d13cb8d3c6?w=400&h=600&fit=crop" },
  { id: 3, name: "Baile & Danza", count: 167, image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=600&fit=crop" },
  { id: 4, name: "Teatro & Arte", count: 98, image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=600&fit=crop" },
  { id: 5, name: "Comedia", count: 76, image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop" },
  { id: 6, name: "Eventos Corporativos", count: 134, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=600&fit=crop" }
];

// Define interfaces for our data structures
interface ArtistCard {
  id: number;
  title: string;
  meta: string;
  image: string;
  price: string;
  rating: number;
  tag?: string;
}

interface CategoryCard {
  id: number;
  title: string;
  meta: string;
  image: string;
  variant: "category";
}

// Helper functions
const getFeaturedArtists = () => demoArtists.slice(0, 6);
const getTopRatedArtists = () => [...demoArtists].sort((a, b) => b.rating - a.rating);
const getNewArtists = () => demoArtists.slice(3, 8);

// --- Helpers
const SectionTitle: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode; className?: string }> = ({ title, subtitle, action, className = "" }) => (
  <div className={`flex flex-col gap-1 md:flex-row md:items-end md:justify-between mb-6 ${className}`}>
    <div className="space-y-1">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-400 max-w-prose leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
    {action && (
      <div className="shrink-0 mt-3 md:mt-0">
        {action}
      </div>
    )}
  </div>
);

interface ScrollRowProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollRow: React.FC<ScrollRowProps> = ({ children, id, className = "", style }) => {
  const scrollBy = (dir: number) => {
    const el = document.getElementById(id || "");
    if (!el) return;
    el.scrollBy({ 
      left: dir * (window.innerWidth < 768 ? 280 : 320), 
      behavior: "smooth" 
    });
  };
  
  return (
    <div className={`relative group ${className}`} style={style}>
      <button 
        aria-label="Scroll left" 
        onClick={() => scrollBy(-1)} 
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:bg-black/90 hover:border-purple-500/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <div 
        id={id} 
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1"
      >
        {children}
      </div>
      
      <button 
        aria-label="Scroll right" 
        onClick={() => scrollBy(1)} 
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:bg-black/90 hover:border-purple-500/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

// Add global styles for animations
const styleElement = typeof document !== 'undefined' ? document.createElement('style') : null;
if (styleElement) {
  styleElement.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in-card {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(styleElement);
}

const PosterCard: React.FC<{
  id?: number;
  title: string;
  meta?: string;
  tag?: string;
  image?: string;
  rating?: number;
  price?: string;
  variant?: "artist" | "event" | "place" | "category";
}> = ({ id, title, meta, tag, image, rating, price, variant = "artist" }) => {
  const bg = {
    artist: "from-purple-600/40 via-fuchsia-500/30 to-blue-600/30",
    event: "from-amber-500/40 via-orange-500/30 to-rose-600/30",
    place: "from-emerald-600/40 via-teal-500/30 to-cyan-600/30",
    category: "from-slate-600/40 via-zinc-500/30 to-stone-600/30",
  }[variant];
  
  const imageUrl = image || '/placeholder-artist.jpg';
  const delay = (id || 0) * 50; // Convert to milliseconds
  
  return (
    <div 
      className="snap-start w-[240px] md:w-[280px] shrink-0 cursor-pointer fade-in-card"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0
      }}
    >
      <div className={`relative aspect-[2/3] rounded-2xl overflow-hidden border border-gray-800/50 bg-gradient-to-br ${bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30`}>
        {/* Image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-artist.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-all duration-300" />
        </div>

        {/* Top badges */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {tag && (
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/20 bg-black/70 backdrop-blur-sm text-white font-medium shadow-lg transition-all duration-300 hover:bg-purple-600/80">
              {tag === 'Nuevo' ? <Sparkles className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />} 
              {tag}
            </span>
          )}
          {rating !== undefined && (
            <div className="flex items-center gap-1.5 text-xs bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-amber-400 border border-amber-400/20 shadow-lg transition-all duration-300">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <h3 className="text-base md:text-lg font-bold leading-tight line-clamp-2 text-white mb-1">
            {title}
          </h3>
          {meta && (
            <p className="text-xs md:text-sm text-gray-300/90 line-clamp-1">
              {meta}
              {price && ` • $${price}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterPill: React.FC<{ label: string; disabled?: boolean }> = ({ label, disabled = true }) => (
  <button 
    disabled={disabled} 
    className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-full border border-gray-700 bg-gray-900/60 text-gray-400 cursor-not-allowed backdrop-blur-sm hover:border-gray-600 transition-colors duration-200"
  >
    <SlidersHorizontal className="h-4 w-4" />
    {label}
  </button>
);

// Generate data
const nearbyArtists: ArtistCard[] = [...demoArtists]
  .sort((a, b) => parseFloat(a.distance || '0') - parseFloat(b.distance || '0'))
  .slice(0, 10)
  .map((artist) => ({
    id: artist.id,
    title: artist.name,
    meta: `${artist.category} • ${artist.distance} km`,
    image: artist.image,
    price: artist.price,
    rating: artist.rating,
    tag: parseFloat(artist.distance || '0') < 2 ? "Cerca de ti" : undefined,
  }));

const topWeekly: ArtistCard[] = getTopRatedArtists()
  .slice(0, 10)
  .map((artist) => ({
    id: artist.id,
    title: artist.name,
    meta: `${artist.category} • Desde $${artist.price}`,
    image: artist.image,
    price: artist.price,
    rating: artist.rating,
    tag: "Top 10",
  }));

const aiRecommended: ArtistCard[] = getNewArtists()
  .map((artist) => ({
    id: artist.id,
    title: artist.name,
    meta: artist.category,
    image: artist.image,
    price: artist.price,
    rating: artist.rating,
    tag: "Nuevo",
  }));

const featuredCategories: CategoryCard[] = categories
  .slice(0, 8)
  .map((category) => ({
    id: category.id,
    title: category.name,
    meta: `${category.count} artistas`,
    image: category.image,
    variant: "category" as const,
  }));

// --- Page Component
export default function ExplorarNetflixMock() {
  const city = "Bogotá";
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  const Filters = useMemo(() => (
    <div className="flex flex-wrap gap-3 animate-fade-in-up">
      <FilterPill label="Ubicación" />
      <FilterPill label="Presupuesto" />
      <FilterPill label="Categoría" />
      <FilterPill label="Disponibilidad" />
      <FilterPill label="Valoración" />
    </div>
  ), []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* HERO / Intro explicativa */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,rgba(147,51,234,0.3),transparent),radial-gradient(40%_60%_at_80%_0%,rgba(236,72,153,0.25),transparent),radial-gradient(50%_70%_at_20%_80%,rgba(59,130,246,0.2),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        </div>
        
        <div className="relative w-full px-6 pt-12 pb-8 md:pt-20 md:pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Location indicator */}
              <div className="inline-flex items-center gap-2 text-sm text-gray-400 animate-fade-in-up">
                <div className="relative">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                </div>
                Descubre talento cerca de <span className="font-semibold text-white">{city}</span>
              </div>
              
              {/* Main title */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-3xl md:text-6xl font-bold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
                    Conecta con el talento
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                    que buscas
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
                  Descubre artistas, músicos, DJs y talentos locales. 
                  <span className="text-white font-medium"> Filtra por ubicación, presupuesto y disponibilidad.</span>
                  <br className="hidden md:block" />
                  <span className="text-purple-300"> Encuentra el talento perfecto para tu evento.</span>
                </p>
              </div>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="relative flex-1 max-w-2xl group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                  <input 
                    disabled 
                    placeholder="Buscar músicos, DJs, artistas..." 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-700 bg-black/40 backdrop-blur-sm text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:border-gray-600"
                  />
                </div>
                <button 
                  disabled 
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-gray-700 bg-black/40 backdrop-blur-sm text-gray-400 cursor-not-allowed hover:border-gray-600 transition-all duration-200 min-w-[140px]"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  Filtros
                </button>
              </div>

              {/* Info banner */}
              <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Info className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-purple-200">
                  <span className="font-medium">Vista demo:</span> En producción verás perfiles reales con disponibilidad en tiempo real, precios actualizados y sistema de reservas integrado.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="border-y border-gray-800/50 bg-black/20 backdrop-blur-sm">
        <div className="w-full px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <SectionTitle
              title="Filtros de búsqueda"
              subtitle="Personaliza tu búsqueda para encontrar exactamente lo que necesitas."
              action={
                <span className="text-xs text-purple-400 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <Sparkles className="h-3 w-3" />
                  Próximamente interactivo
                </span>
              }
            />
            {Filters}
          </div>
        </div>
      </section>

      {/* CERCANOS A TI */}
      <section className="w-full px-6 pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Talento cerca de ti"
            subtitle="Artistas y músicos disponibles en tu zona, ordenados por proximidad."
            action={
              <button className="text-sm px-4 py-2 rounded-full border border-gray-700 text-white hover:bg-gray-800 hover:border-purple-500 transition-all duration-200">
                Ver todos
              </button>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-nearby" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {nearbyArtists.map((a, i) => (
              <PosterCard 
                key={a.id || i} 
                id={a.id}
                title={a.title} 
                meta={a.meta} 
                tag={a.tag} 
                image={a.image}
                rating={a.rating}
                price={a.price}
                variant="artist" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* TOP SEMANAL */}
      <section className="w-full px-6 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Top de la semana"
            subtitle="Los artistas más populares y mejor valorados esta semana."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Star className="h-4 w-4 fill-amber-400" />
                Trending
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-top" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {topWeekly.map((a, i) => (
              <PosterCard 
                key={a.id || i} 
                id={a.id}
                title={a.title} 
                meta={a.meta} 
                tag={a.tag} 
                image={a.image}
                rating={a.rating}
                price={a.price}
                variant="event" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* RECOMENDADOS POR IA */}
      <section className="w-full px-6 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Recomendados para ti"
            subtitle="Sugerencias personalizadas basadas en tus preferencias y búsquedas anteriores."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-fuchsia-400 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20">
                <Sparkles className="h-4 w-4" />
                IA Personalizada
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-ai" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {aiRecommended.map((a, i) => (
              <PosterCard 
                key={a.id || i} 
                id={a.id}
                title={a.title} 
                meta={a.meta} 
                tag={a.tag} 
                image={a.image}
                rating={a.rating}
                price={a.price}
                variant="place" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* CATEGORÍAS DESTACADAS */}
      <section className="w-full px-6 pt-12 md:pt-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Explora por categorías"
            subtitle="Descubre talentos organizados por especialidades y tipos de eventos."
            action={
              <button 
                onClick={() => setIsCategoriesModalOpen(true)}
                className="text-sm px-4 py-2 rounded-full border border-gray-700 text-white hover:bg-gray-800 hover:border-purple-500 transition-all duration-200"
              >
                Ver todas las categorías
              </button>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-cat" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {featuredCategories.map((c, i) => (
              <PosterCard 
                key={c.id || i} 
                id={c.id}
                title={c.title} 
                meta={c.meta} 
                image={c.image}
                variant="category" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800/50 bg-black/40 backdrop-blur-sm">
        <div className="w-full px-6 py-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Demostración del interfaz
            </div>
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              Esta es una vista previa del diseño. En la versión final incluirá perfiles completos, 
              sistema de reservas, chat integrado, y pagos seguros.
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:translate-y-\\[-4px\\] {
          transform: translateY(-4px);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      {/* Categories Modal */}
      <CategoriesModal 
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
      />
    </div>
  );
}