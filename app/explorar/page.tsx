"use client";
import ArtistCategories from '../../src/components/landing/components/ArtistCategories';
import ArtistsCarousel from '../../src/components/landing/components/ArtistsCarousel';

export default function ExplorarPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
              Descubre Talentos
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Explora artistas excepcionales por categoría y encuentra el talento perfecto para tu proyecto
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <ArtistCategories onViewArtists={() => {}} />
        </div>
      </section>
      
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <ArtistsCarousel />
        </div>
      </section>
    </div>
  );
}
