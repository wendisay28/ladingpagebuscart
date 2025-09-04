"use client";
import React, { useMemo, useEffect, useRef } from "react";
import { MapPin, SlidersHorizontal, Star, Sparkles, ChevronLeft, ChevronRight, Search, Info, ShoppingCart, Heart, Eye, Award, Package } from "lucide-react";

// Mock data para productos/obras de arte
const demoProducts = [
  { id: 1, name: "Pintura al Óleo - Amanecer Andino", category: "Pintura", artist: "María González", price: "1200000", rating: 4.8, stock: 1, image: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg", description: "Obra original en óleo sobre lienzo que captura la belleza de los Andes al amanecer.", featured: true },
  { id: 2, name: "Acuarela - Paisaje Urbano", category: "Pintura", artist: "Carlos Rivera", price: "850000", rating: 4.9, stock: 2, image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg", description: "Técnica mixta sobre papel de acuarela 300gr.", featured: true },
  { id: 3, name: "Retrato al Carboncillo", category: "Dibujo", artist: "Laura Méndez", price: "650000", rating: 5.0, stock: 1, image: "https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg", description: "Retrato realista en papel canson 180gr.", featured: true },
  { id: 4, name: "Escultura en Bronce - Bailarina", category: "Escultura", artist: "Diego Ramírez", price: "2500000", rating: 4.7, stock: 1, image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg", description: "Edición limitada, firma del artista incluida.", featured: true },
  { id: 5, name: "Libro de Arte - Técnicas de Acuarela", category: "Libro", artist: "Editorial Artística", price: "125000", rating: 4.8, stock: 12, image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg", description: "Guía completa con técnicas profesionales.", featured: true },
  { id: 6, name: "Set de Pinceles Profesionales", category: "Materiales", artist: "Arte & Diseño", price: "320000", rating: 4.9, stock: 7, image: "https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg", description: "Set de 12 pinceles de pelo de marta.", featured: true },
  { id: 7, name: "Fotografía - Serie Urbana", category: "Fotografía", artist: "Ana Torres", price: "380000", rating: 4.6, stock: 3, image: "https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg", description: "Edición limitada, impresión en papel de algodón.", featured: true },
  { id: 8, name: "Acrílico sobre Lienzo - Abstracción", category: "Pintura", artist: "Sofía Vargas", price: "950000", rating: 4.7, stock: 1, image: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg", description: "Obra abstracta en acrílico, 80x120cm.", featured: true },
  { id: 9, name: "Libro - Historia del Arte Moderno", category: "Libro", artist: "Editorial Contemporánea", price: "145000", rating: 4.8, stock: 9, image: "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg", description: "Análisis profundo del arte moderno." },
  { id: 10, name: "Acuarela - Atardecer en la Ciudad", category: "Pintura", artist: "Roberto Sánchez", price: "720000", rating: 4.9, stock: 1, image: "https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg", description: "Técnica mixta sobre papel de acuarela." },
  { id: 11, name: "Escultura en Madera - Naturaleza", category: "Escultura", artist: "Miguel Ángel Rojas", price: "1850000", rating: 5.0, stock: 1, image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg", description: "Tallado en madera de roble, pieza única." },
  { id: 12, name: "Set de Acrílicos Profesionales", category: "Materiales", artist: "Arte & Diseño", price: "285000", rating: 4.7, stock: 6, image: "https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg", description: "Set de 24 colores de alta calidad." }
];

const categories = [
  { id: 1, name: "Pinturas Originales", count: 145, image: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
  { id: 2, name: "Instrumentos Musicales", count: 89, image: "https://images.pexels.com/photos/1648359/pexels-photo-1648359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
  { id: 3, name: "Fotografía de Arte", count: 67, image: "https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
  { id: 4, name: "Materiales de Arte", count: 98, image: "https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
  { id: 5, name: "Joyería Artesanal", count: 34, image: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" },
  { id: 6, name: "Esculturas", count: 56, image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" }
];

// Define interfaces
interface ProductCardType {
  id: number;
  title: string;
  meta: string;
  image: string;
  price: string;
  rating: number;
  tag?: string;
  stock?: number;
  artist?: string;
}

interface CategoryCardType {
  id: number;
  title: string;
  meta: string;
  image: string;
  variant: "category";
}

// Helper functions
const getFeaturedProducts = () => demoProducts.filter(p => p.featured);
const getBestSellers = () => [...demoProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0));
const getNewArrivals = () => [...demoProducts].slice().reverse().slice(0, 8);

// --- Helper Components
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
    const el = typeof document !== 'undefined' ? document.getElementById(id || "") : null;
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
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:bg-black/90 hover:border-rose-500/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
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
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:bg-black/90 hover:border-rose-500/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

// Add global styles for animations (safely in client)
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
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

// FilterPill: Defined here to fix the ReferenceError
const FilterPill: React.FC<{ label: string; disabled?: boolean }> = ({ label, disabled = true }) => (
  <button 
    disabled={disabled} 
    className={`inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-full border border-gray-700 bg-gray-900/60 text-gray-400 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} backdrop-blur-sm hover:border-gray-600 transition-colors duration-200`}
  >
    <SlidersHorizontal className="h-4 w-4" />
    {label}
  </button>
);

const ProductCard: React.FC<{
  id?: number;
  title: string;
  meta?: string;
  tag?: string;
  image?: string;
  rating?: number;
  price?: string;
  stock?: number;
  artist?: string;
  variant?: "product" | "category";
}> = ({ id, title, meta, tag, image, rating, price, stock, artist, variant = "product" }) => {
  const bg = {
    product: "from-rose-600/40 via-pink-500/30 to-fuchsia-600/30",
    category: "from-slate-600/40 via-zinc-500/30 to-stone-600/30",
  }[variant];
  
  const imageUrl = image || '/placeholder-product.jpg';
  const delay = (id || 0) * 50;
  
  return (
    <div 
      className="snap-start w-[240px] md:w-[280px] shrink-0 cursor-pointer fade-in-card"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0
      }}
    >
      <div className={`relative aspect-[2/3] rounded-2xl overflow-hidden border border-gray-800/50 bg-gradient-to-br ${bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/10 hover:border-rose-500/30`}>
        {/* Image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-all duration-300" />
        </div>

        {/* Top badges */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {tag && (
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/20 bg-black/70 backdrop-blur-sm text-white font-medium shadow-lg transition-all duration-300 hover:bg-rose-600/80">
              {tag === 'Destacado' ? <Award className="h-3.5 w-3.5" /> : 
               tag === 'Nuevo' ? <Sparkles className="h-3.5 w-3.5" /> : 
               tag === 'Bestseller' ? <Star className="h-3.5 w-3.5" /> :
               <Package className="h-3.5 w-3.5" />} 
              {tag}
            </span>
          )}
          {rating !== undefined && (
            <div className="flex items-center gap-1.5 text-xs bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-amber-400 border border-amber-400/20 shadow-lg">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Stock info */}
        {stock !== undefined && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${
              stock > 0 ? 'bg-black/70 text-green-400' : 'bg-red-900/70 text-red-300'
            } backdrop-blur-sm`}>
              {stock > 0 ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  {stock} en stock
                </>
              ) : 'Agotado'}
            </div>
          </div>
        )}

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{title}</h3>
              {artist && (
                <p className="text-xs text-gray-300 truncate">por {artist}</p>
              )}
              {meta && (
                <p className="text-xs text-gray-300/90 line-clamp-1">
                  {meta}
                </p>
              )}
            </div>
            {price && (
              <div className="ml-2 flex flex-col items-end">
                <span className="text-sm text-gray-300 line-through">
                  ${(parseInt(price) * 1.2).toLocaleString('es-CO')}
                </span>
                <span className="text-lg font-bold text-white">
                  ${parseInt(price).toLocaleString('es-CO')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate data
const featuredProducts: ProductCardType[] = getFeaturedProducts()
  .map((product) => ({
    id: product.id,
    title: product.name,
    meta: product.category,
    image: product.image,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    artist: product.artist,
    tag: "Destacado",
  }));

const bestSellers: ProductCardType[] = getBestSellers()
  .slice(0, 10)
  .map((product) => ({
    id: product.id,
    title: product.name,
    meta: `${product.category} • ${product.stock} disponible${product.stock !== 1 ? 's' : ''}`,
    image: product.image,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    artist: product.artist,
    tag: "Bestseller",
  }));

const newArrivals: ProductCardType[] = getNewArrivals()
  .map((product) => ({
    id: product.id,
    title: product.name,
    meta: product.category,
    image: product.image,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    artist: product.artist,
    tag: "Nuevo",
  }));

const featuredCategories: CategoryCardType[] = categories
  .slice(0, 8)
  .map((category) => ({
    id: category.id,
    title: category.name,
    meta: `${category.count} productos`,
    image: category.image,
    variant: "category" as const,
  }));

// --- Page Component
export default function TiendaArtistasPage() {
  const city = "Bogotá";

  const Filters = useMemo(() => (
    <div className="flex flex-wrap gap-3 animate-fade-in-up">
      <FilterPill label="Categoría" />
      <FilterPill label="Precio" />
      <FilterPill label="Artista" />
      <FilterPill label="Disponibilidad" />
      <FilterPill label="Valoración" />
    </div>
  ), []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* HERO Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,rgba(244,63,94,0.3),transparent),radial-gradient(40%_60%_at_80%_0%,rgba(236,72,153,0.25),transparent),radial-gradient(50%_70%_at_20%_80%,rgba(192,38,211,0.2),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        </div>
        
        <div className="relative w-full px-6 pt-12 pb-8 md:pt-20 md:pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Location indicator */}
              <div className="inline-flex items-center gap-2 text-sm text-gray-400 animate-fade-in-up">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 text-rose-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                </div>
                Tienda de artistas locales en <span className="font-semibold text-white">{city}</span>
              </div>
              
              {/* Main title */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-3xl md:text-6xl font-bold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-rose-200 to-pink-200 bg-clip-text text-transparent">
                    Tienda de
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                    Artistas
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
                  Descubre obras únicas, instrumentos artesanales y materiales de arte. 
                  <span className="text-white font-medium"> Compra directamente de los artistas locales.</span>
                  <br className="hidden md:block" />
                  <span className="text-rose-300"> Apoya el talento y llévate piezas auténticas.</span>
                </p>
              </div>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="relative flex-1 max-w-2xl group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-rose-400 transition-colors duration-200" />
                  <input 
                    disabled 
                    placeholder="Buscar obras, instrumentos, materiales..." 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-700 bg-black/40 backdrop-blur-sm text-white placeholder:text-gray-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 hover:border-gray-600"
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
              <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Info className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-rose-200">
                  <span className="font-medium">Vista demo:</span> En producción incluirá carrito de compras, pagos seguros, envíos, sistema de reseñas y chat directo con artistas.
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
              subtitle="Encuentra exactamente lo que buscas con nuestros filtros especializados."
              action={
                <span className="text-xs text-rose-400 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                  <Sparkles className="h-3 w-3" />
                  Próximamente interactivo
                </span>
              }
            />
            {Filters}
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="w-full px-6 pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Productos destacados"
            subtitle="Obras y productos seleccionados por su calidad y originalidad."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Award className="h-4 w-4" />
                Destacados
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-featured" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {featuredProducts.map((p, i) => (
              <ProductCard 
                key={p.id || i} 
                id={p.id}
                title={p.title} 
                meta={p.meta} 
                tag={p.tag} 
                image={p.image}
                rating={p.rating}
                price={p.price}
                stock={p.stock}
                artist={p.artist}
                variant="product" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="w-full px-6 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Más vendidos"
            subtitle="Los productos favoritos de nuestros clientes con mejores valoraciones."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Star className="h-4 w-4 fill-amber-400" />
                Bestseller
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-bestsellers" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {bestSellers.map((p, i) => (
              <ProductCard 
                key={p.id || i} 
                id={p.id}
                title={p.title} 
                meta={p.meta} 
                tag={p.tag} 
                image={p.image}
                rating={p.rating}
                price={p.price}
                stock={p.stock}
                artist={p.artist}
                variant="product" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* NUEVOS PRODUCTOS */}
      <section className="w-full px-6 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Nuevos productos"
            subtitle="Las últimas incorporaciones de nuestros artistas colaboradores."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-rose-400 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <Sparkles className="h-4 w-4" />
                Nuevo
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-new" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {newArrivals.map((p, i) => (
              <ProductCard 
                key={p.id || i} 
                id={p.id}
                title={p.title} 
                meta={p.meta} 
                tag={p.tag} 
                image={p.image}
                rating={p.rating}
                price={p.price}
                stock={p.stock}
                artist={p.artist}
                variant="product" 
              />
            ))}
          </ScrollRow>
        </div>
      </section>

      {/* CATEGORÍAS DESTACADAS */}
      <section className="w-full px-6 pt-12 md:pt-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Categorías destacadas"
            subtitle="Explora según el tipo de arte o producto que más te interese."
            action={
              <div className="inline-flex items-center gap-1.5 text-sm text-gray-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <MapPin className="h-4 w-4" />
                Explorar
              </div>
            }
            className="animate-fade-in-up"
          />
          <ScrollRow id="row-categories" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {featuredCategories.map((c, i) => (
              <ProductCard
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
    </div>
  );
}
