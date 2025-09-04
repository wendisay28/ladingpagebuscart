"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface WelcomeModalProps {
  onComplete: () => void;
}

const WelcomeModal = ({ onComplete }: WelcomeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    console.log('Montando WelcomeModal');
    setIsClient(true);
    
    // Mostrar el modal siempre después de 1 segundo
    console.log('Mostrando modal en 1 segundo...');
    const timer = setTimeout(() => {
      console.log('Mostrando modal ahora');
      setIsOpen(true);
    }, 1000);
    
    return () => {
      console.log('Limpiando timer');
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete();
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem("hasSeenWelcomeModal", "true");
    }
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem("hasSeenWelcomeModal", "true");
    }
  };

  console.log('Renderizando WelcomeModal, isOpen:', isOpen, 'isClient:', isClient);

  // No renderizar nada hasta que estemos en el cliente
  if (!isClient || !isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-0.5 shadow-2xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-300 hover:bg-pink-900/50 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center">
            <h2 className="mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              ¡Bienvenido a BuscArt!
            </h2>
            <div className="mb-8 space-y-4 text-gray-300">
              <p className="text-lg">
                Descubre un mundo de creatividad y conexiones artísticas
              </p>
              <p className="text-sm text-gray-400">
                Explora, conecta y crea con nuestra comunidad de artistas talentosos
              </p>
            </div>
            <button
              onClick={handleStartClick}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300"
            >
              Comenzar experiencia
            </button>
          </div>

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
