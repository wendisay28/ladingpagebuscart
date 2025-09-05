'use client';

import { useEffect, useState, ReactNode } from 'react';
import { X, Star, Sparkles, ArrowRight, CheckCircle, Mail } from 'lucide-react';
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
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-fuchsia-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800/50">
          {title && (
            <div className="sticky top-0 flex items-center justify-between p-6 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50 rounded-t-2xl">
              <h2 className="text-white font-bold text-lg">{title}</h2>
              <button 
                onClick={onClose} 
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300" 
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}
          {!title && (
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-10 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300" 
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          )}
          <div className="text-white">{children}</div>
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

  const features = [
    {
      icon: <Star className="w-5 h-5" />,
      text: 'Perfil de artista completo',
      color: 'text-emerald-300'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: 'Gestión de eventos',
      color: 'text-fuchsia-300'
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: 'Sistema de pagos seguro',
      color: 'text-purple-300'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col lg:flex-row w-full rounded-2xl overflow-hidden">
        {/* Left Content */}
        <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center relative">
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 right-1/6 w-2 h-2 bg-emerald-300/60 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-fuchsia-300/60 rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bounce delay-1100"></div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-400/5 border border-emerald-400/15 px-4 py-2 rounded-full mb-8 backdrop-blur-sm w-fit">
            <Sparkles className="w-4 h-4 text-emerald-300/80" />
            <span className="text-emerald-200/90 text-sm font-medium">Próximamente</span>
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">El futuro del</span>
            <span className="block bg-gradient-to-r from-emerald-300 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent mt-2">
              ARTE DIGITAL
            </span>
            <span className="text-white block">está naciendo</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Estamos creando una plataforma revolucionaria que transformará la forma de conectar artistas con el mundo. Únete a nuestra lista de espera para ser de los primeros en descubrir la mejor forma de gestionar tu talento.
          </p>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-300/50 focus:border-emerald-300/50 transition-all duration-300"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full px-6 py-4 bg-gradient-to-r from-emerald-400 to-purple-400 text-white font-semibold rounded-xl hover:from-emerald-300 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        ¡Quiero mi lugar en la galería!
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-emerald-300">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold text-lg">¡Genial! Te avisaremos cuando esté listo.</span>
              </div>
              <p className="text-emerald-200/80 mt-2">Te has unido a la comunidad de fundadores exclusiva.</p>
            </div>
          )}

          <p className="mt-6 text-sm text-gray-500 flex items-center gap-2">
            <Star className="w-4 h-4 text-emerald-300/60" />
            Únete a la comunidad de fundadores exclusiva
          </p>
        </div>

        {/* Right Features Panel */}
        <div className="w-full lg:w-2/5 bg-gradient-to-br from-gray-900/60 to-gray-800/80 backdrop-blur-lg border-l border-gray-800/50 p-8 lg:p-12 flex flex-col justify-center relative">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-fuchsia-400 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400/10 to-purple-400/10 border border-emerald-400/20 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-emerald-300" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">Características exclusivas</h3>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-800/30 border border-gray-700/30 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${
                    index === 0 ? 'bg-emerald-400/8 text-emerald-300' :
                    index === 1 ? 'bg-fuchsia-400/8 text-fuchsia-300' :
                    'bg-purple-400/8 text-purple-300'
                  }`}>
                    {feature.icon}
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl backdrop-blur-sm border" style={{backgroundImage: 'linear-gradient(to right, #bb00aa10, #a855f710, #ec489910)', borderColor: '#bb00aa30'}}>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5" style={{color: '#bb00aa'}} />
                <span className="font-semibold" style={{color: '#bb00aa'}}>Acceso Beta Exclusivo</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Participa en las primeras pruebas, da tu feedback y ayúdanos a crear la plataforma perfecta para artistas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}