'use client';

import { useEffect, useState, ReactNode } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  let root = document.getElementById('modal-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'modal-root';
    document.body.appendChild(root);
  }

  return createPortal(children, root);
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl shadow-2xl border border-gray-700">
          <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-purple-800 to-pink-700 rounded-t-2xl">
            {title && <h2 className="text-white font-bold text-sm md:text-base">{title}</h2>}
            <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors" aria-label="Cerrar modal">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 text-white">{children}</div>
        </div>
      </div>
    </Portal>
  );
}

interface ConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConstructionModal({ isOpen, onClose }: ConstructionModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setEmail('');
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4">El futuro del arte está a punto de nacer.</h1>
          <p className="text-gray-300 mb-8">Estamos creando una plataforma que transformará la forma de conectar artistas con el mundo. Únete a nuestra lista de espera para ser de los primeros en descubrir la mejor forma de gestionar tu talento y conseguir nuevos proyectos.</p>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 transition mb-4 bg-gray-800 text-white"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-800 to-pink-700 text-white rounded-xl hover:opacity-90 disabled:opacity-70"
                >
                  {isSubmitting ? 'Enviando...' : '¡Quiero mi lugar en la galería!'}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-4 p-4 bg-green-800 border border-green-600 rounded-xl text-green-200">¡Gracias! Te avisaremos cuando esté listo.</div>
          )}
          <p className="mt-4 text-sm text-gray-400">Únete a la comunidad de fundadores.</p>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-800 to-pink-700 items-center justify-center p-8 relative">
          <div className="text-center text-white opacity-95">
            <h3 className="text-lg md:text-xl font-bold mb-4">Próximas características</h3>
            <ul className="space-y-3 text-left text-white/90 max-w-xs mx-auto">
              <li className="flex items-center gap-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">✓</span>
                Perfil de artista completo
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">✓</span>
                Gestión de eventos
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">✓</span>
                Sistema de pagos seguro
              </li>
            </ul>
            <p className="mt-6 text-sm bg-white/10 p-3 rounded-lg">Acceso exclusivo y anticipado. Participa en las primeras pruebas (Beta).</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
