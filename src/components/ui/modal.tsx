'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import Portal from './portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm">
        <div 
          className="fixed inset-0" 
          onClick={onClose}
          aria-hidden="true"
        />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-end p-4 bg-gradient-to-r from-purple-600 to-pink-600">
              <button
                onClick={onClose}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Contenido */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

// Componente específico para el mensaje de "En construcción"
interface ConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function ConstructionModal({ isOpen, onClose, featureName }: ConstructionModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el envío del formulario
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title=""
    >
      {/* Cambiado: mejor estructura del contenedor principal */}
      <div className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 py-8 md:px-8">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Sé de los primeros en probar nuestra plataforma
          </h1>
          
          <p className="text-lg mb-10 text-gray-600 max-w-2xl mx-auto">
            Estamos terminando los últimos detalles. Déjanos tu correo y te notificaremos cuando esté lista.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Nombre" 
              className="w-full border border-gray-300 rounded-2xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full border border-gray-300 rounded-2xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-2xl p-4 text-base shadow-lg hover:opacity-90 transition-opacity"
            >
              Unirme a la lista
            </button>
          </form>
          
          <p className="mt-16 italic text-base text-gray-500 max-w-2xl mx-auto">
            "Nuestra misión es facilitar que las empresas conecten fácilmente con artistas y eventos cercanos"
          </p>
        </div>
      </div>
    </Modal>
  );
}