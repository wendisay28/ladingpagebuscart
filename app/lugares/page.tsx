"use client";
import React, { useMemo } from "react";
import { MapPin, SlidersHorizontal, Star, Sparkles, ChevronLeft, ChevronRight, Search, Info, Calendar, Users, Clock, Wifi } from "lucide-react";

// Mock data para lugares y eventos
const demoVenues = [
  { id: 1, name: "Teatro Colón", category: "Teatro", distance: "1.5", capacity: "900", price: "800", rating: 4.9, image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=600&fit=crop" },
  { id: 2, name: "Salón Crystal", category: "Salón de Eventos", distance: "2.8", capacity: "200", price: "1200", rating: 4.8, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=600&fit=crop" },
  { id: 3, name: "Centro de Convenciones", category: "Corporativo", distance: "0.9", capacity: "500", price: "2000", rating: 4.7, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=600&fit=crop" },
  { id: 4, name: "Hacienda Villa María", category: "Bodas", distance: "15.2", capacity: "300", price: "1500", rating: 4.9, image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=600&fit=crop" },
  { id: 5, name: "Club Campestre", category: "Recreativo", distance: "8.5", capacity: "400", price: "1800", rating: 4.6, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=600&fit=crop" },
  { id: 6, name: "Terraza Sky", category: "Rooftop", distance: "3.1", capacity: "150", price: "1000", rating: 4.8, image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=600&fit=crop" },
  { id: 7, name: "Finca El Paraíso", category: "Campestre", distance: "25.0", capacity: "250", price: "1300", rating: 4.7, image: "https://images.unsplash.com/photo-1520637836862-4d197d17c452?w=400&h=600&fit=crop" },
  { id: 8, name: "Auditorio ModernoTech", category: "Conferencias", distance: "4.2", capacity: "600", price: "2200", rating: 4.5, image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=600&fit=crop" }
];

const demoEvents = [
  { id: 1, name: "Concierto de Rock Alternativo", category: "Música", date: "2024-08-30", attendees: "250", price: "85", rating: 4.8, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop" },
  { id: 2, name: "Festival Gastronómico", category: "Gastronomía", date: "2024-09-05", attendees: "500", price: "65", rating: 4.9, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop" },
  { id: 3, name: "Expo Arte Contemporáneo", category: "Arte", date: "2024-09-15", attendees: "180", price: "45", rating: 4.6, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop" },
  { id: 4, name: "Feria de Emprendimiento", category: "Negocios", date: "2024-09-20", attendees: "400", price: "120", rating: 4.7, image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=600&fit=crop" },
  { id: 5, name: "Noche de Comedy Show", category: "Comedia", date: "2024-08-28", attendees: "120", price: "55", rating: 4.8, image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop" },
  { id: 6, name: "Workshop de Fotografía", category: "Educativo", date: "2024-09-10", attendees: "30", price: "150", rating: 4.9, image: "https://images.unsplash.com/photo-1606982175531-5ddb5baa5b4e?w=400&h=600&fit=crop" }
];

const categories = [
  { id: 1, name: "Salones de Eventos", count: 145, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=600&fit=crop" },
  { id: 2, name: "Espacios Corporativos", count: 89, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=600&fit=crop" },
  { id: 3, name: "Venues para Bodas", count: 67, image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=600&fit=crop" },
  { id: 4, name: "Espacios al Aire Libre", count: 98, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=600&fit=crop" },
  { id: 5, name: "Teatros y Auditorios", count: 34, image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=600&fit=crop" },
  { id: 6, name: "Galerías de Arte", count: 56, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop" }
];

// Define interfaces
interface VenueCard {
  id: number;
  title: string;
  meta: string;
  image: string;
  price: string;
  rating: number;
  tag?: string;
  capacity?: string;
}

interface EventCard {
  id: number;
  title: string;
  meta: string;
  image: string;
  price: string;
  rating: number;
  tag?: string;
  date?: string;
}

interface CategoryCard {
  id: number;
  title: string;
  meta: string;
  image: string;
  variant: "category";
}

// Helper functions
const getNearbyVenues = () => [...demoVenues].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
const getTopRatedVenues = () => [...demoVenues].sort((a, b) => b.rating - a.rating);
const getUpcomingEvents = () => demoEvents.slice(0, 6);

// --- Helpers Components
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
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:bg-black/90 hover:border-emerald-500/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
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
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:bg-black/90 hover:border-emerald-500/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
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
  capacity?: string;
  date?: string;
  variant?: "venue" | "event" | "category";
}> = ({ id, title, meta, tag, image, rating, price, capacity, date, variant = "venue" }) => {
  const bg = {
    venue: "from-emerald-600/40 via-teal-500/30 to-cyan-600/30",
    event: "from-amber-500/40 via-orange-500/30 to-rose-600/30",
    category: "from-slate-600/40 via-zinc-500/30 to-stone-600/30",
  }[variant];
  
  const imageUrl = image || '/placeholder-venue.jpg';
  const delay = (id || 0) * 50;
  
  return (
    <div 
      className="snap-start w-[240px] md:w-[280px] shrink-0 cursor-pointer fade-in-card"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0
      }}
    >
      <div className={`relative aspect-[2/3] rounded-2xl overflow-hidden border border-gray-800/50 bg-gradient-to-br ${bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/30`}>
        {/* Image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-venue.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-all duration-300" />
        </div>

        {/* Top badges */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {tag && (
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/20 bg-black/70 backdrop-blur-sm text-white font-medium shadow-lg transition-all duration-300 hover:bg-emerald-600/80">
              {tag === 'Disponible Hoy' ? <Calendar className="h-3.5 w-3.5" /> : 
               tag === 'Próximamente' ? <Clock className="h-3.5 w-3.5" /> : 
               <Sparkles className="h-3.5 w-3.5" />} 
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

        {/* Capacity/Date info for venues/events */}
        {(capacity || date) && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1.5 text-xs bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-emerald-400 border border-emerald-400/20 shadow-lg">
              {capacity ? (
                <>
                  <Users className="h-3.5 w-3.5" />
                  <span className="font-medium">{capacity} personas</span>
                </>
              ) : (
                <>
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="font-medium">{date}</span>
                </>
              )}
            </div>
          </div>
        )}

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
const nearbyVenues: VenueCard[] = getNearbyVenues()
  .slice(0, 10)
  .map((venue) => ({
    id: venue.id,
    title: venue.name,
    meta: `${venue.category} • ${venue.distance} km`,
    image: venue.image,
    price: venue.price,
    rating: venue.rating,
    capacity: venue.capacity,
    tag: parseFloat(venue.distance) < 5 ? "Cerca de ti" : undefined,
  }));

const topVenues: VenueCard[] = getTopRatedVenues()
  .slice(0, 10)
  .map((venue) => ({
    id: venue.id,
    title: venue.name,
    meta: `${venue.category} • Capacidad ${venue.capacity}`,
    image: venue.image,
    price: venue.price,
    rating: venue.rating,
    capacity: venue.capacity,
    tag: "Top Rated",
  }));

const upcomingEvents: EventCard[] = getUpcomingEvents()
  .map((event) => ({
    id: event.id,
    title: event.name,
    meta: `${event.category} • ${event.attendees} asistentes`,
    image: event.image,
    price: event.price,
    rating: event.rating,
    date: event.date,
    tag: "Próximamente",
  }));

const featuredCategories: CategoryCard[] = categories
  .slice(0, 8)
  .map((category) => ({
    id: category.id,
    title: category.name,
    meta: `${category.count} lugares`,
    image: category.image,
    variant: "category" as const,
  }));

// --- Page Component
export default function LugaresYEventosPage() {
  const city = "Bogotá";

  const Filters = useMemo(() => (
    <div className="flex flex-wrap gap-3 animate-fade-in-up">
      <FilterPill label="Ubicación" />
      <FilterPill label="Capacidad" />
      <FilterPill label="Tipo de Evento" />
      <FilterPill label="Presupuesto" />
      <FilterPill label="Disponibilidad" />
      <FilterPill label="Servicios" />
    </div>
  ), []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* HERO Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,rgba(16,185,129,0.3),transparent),radial-gradient(40%_60%_at_80%_0%,rgba(6,182,212,0.25),transparent),radial-gradient(50%_70%_at_20%_80%,rgba(34,197,94,0.2),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        </div>
        
        <div className="relative w-full px-6 pt-12 pb-8 md:pt-20 md:pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Location indicator */}
              <div className="inline-flex items-center gap-2 text-sm text-gray-400 animate-fade-in-up">
                <div className="relative">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                Descubre lugares y eventos en <span className="font-semibold text-white">{city}</span>
              </div>
              
              {/* Main title */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-3xl md:text-6xl font-bold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                    El espacio perfecto
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                    para tu evento
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
                  Encuentra salones, auditorios, espacios al aire libre y eventos únicos. 
                  <span className="text-white font-medium"> Filtra por capacidad, ubicación y servicios.</span>
                  <br className="hidden md:block" />
                  <span className="text-emerald-300"> Reserva el lugar ideal para tu celebración.</span>
                </p>
              </div>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="relative flex-1 max-w-2xl group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors duration-200" />
                  <input 
                    disabled 
                    placeholder="Buscar salones, auditorios, espacios..." 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-700 bg-black/40 backdrop-blur-sm text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 hover:border-gray-600"
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
              <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Info className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-emerald-200">
                  <span className="font-medium">Vista demo:</span> En producción incluirá disponibilidad en tiempo real, tours virtuales, sistema de reservas y gestión de pagos integrada.
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
              subtitle="Encuentra el lugar perfecto según tus necesidades específicas."
              action={
                <span className="text-xs text-emerald-400 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Sparkles className="h-3 w-3" />
                  Próximamente interactivo
                </span>
              }
            />
            {Filters}
          </div>
        </div>
      </section>

      {/* LUGARES CERCANOS */}
      <section className="w-full px-6 pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Lugares cerca de ti"
            subtitle="Espacios y venues disponibles en tu zona, ordenados por proximidad."
            action={
              <button className="text-sm px-4 py-2 rounded-full border border-gray-700 text-white hover:bg-gray-800 hover:border-emerald-500 transition-all duration-200">
                Ver todos
              </button>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-nearby" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {nearbyVenues.map((v, i) => (
              <PosterCard 
                key={v.id || i} 
                id={v.id}
                title={v.title} 
                meta={v.meta} 
                tag={v.tag} 
                image={v.image}
                rating={v.rating}
                price={v.price}
                capacity={v.capacity}
                variant="venue" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* TOP VENUES */}
      <section className="w-full px-6 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Lugares mejor valorados"
            subtitle="Los espacios con mejores reseñas y calificaciones de nuestros usuarios."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Star className="h-4 w-4 fill-amber-400" />
                Top Rated
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-top" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {topVenues.map((v, i) => (
              <PosterCard 
                key={v.id || i} 
                id={v.id}
                title={v.title} 
                meta={v.meta} 
                tag={v.tag} 
                image={v.image}
                rating={v.rating}
                price={v.price}
                capacity={v.capacity}
                variant="venue" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* EVENTOS PRÓXIMOS */}
      <section className="w-full px-6 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Eventos próximos"
            subtitle="Descubre eventos y actividades programadas en la ciudad."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-orange-400 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                <Calendar className="h-4 w-4" />
                Próximamente
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-events" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {upcomingEvents.map((e, i) => (
              <PosterCard 
                key={e.id || i} 
                id={e.id}
                title={e.title} 
                meta={e.meta} 
                tag={e.tag} 
                image={e.image}
                rating={e.rating}
                price={e.price}
                date={e.date}
                variant="event" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="w-full px-6 pt-12 md:pt-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Explora por categorías"
            subtitle="Descubre espacios organizados por tipo de evento y ocasión."
            action={
              <button className="text-sm px-4 py-2 rounded-full border border-gray-700 text-white hover:bg-gray-800 hover:border-emerald-500 transition-all duration-200">
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
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Demostración del interfaz
            </div>
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              Esta es una vista previa del diseño. En la versión final incluirá tours virtuales 360°, 
              calendario de disponibilidad, cotizaciones instantáneas y sistema de reservas completo.
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
    </div>
  );
}