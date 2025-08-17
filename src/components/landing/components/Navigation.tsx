'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, Compass, BookOpen, ShoppingBag, LogIn, UserPlus } from 'lucide-react';

// Tipos locales
type SectionType = 'hero' | 'explorar' | 'lugares' | 'tienda';

// Constantes locales
const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register'
} as const;

const menuItems = [
  { name: 'Home', section: 'hero' as SectionType, icon: <Home className="w-5 h-5" /> },
  { name: 'Explorar', section: 'explorar' as SectionType, icon: <Compass className="w-5 h-5" /> },
  { name: 'Lugares', section: 'lugares' as SectionType, icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Tienda', section: 'tienda' as SectionType, icon: <ShoppingBag className="w-5 h-5" /> }
];

const authItems = [
  { name: 'Ingresar', section: 'login', icon: <LogIn className="w-5 h-5" /> },
  { name: 'Registrarse', section: 'register', icon: <UserPlus className="w-5 h-5" /> }
];

// Componente de navegación del lado del cliente
function ClientNavigation() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>('hero');

  useEffect(() => {
    setIsMounted(true);
    
    // Observer para detectar la sección activa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as SectionType;
            if (menuItems.some(item => item.section === sectionId)) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    // Observar todas las secciones
    menuItems.forEach(item => {
      const element = document.getElementById(item.section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo mejorado */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-200">
                BuscArt
              </span>
            </Link>
          </div>
          
          {/* Navegación principal para desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Menú principal */}
            <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
              {menuItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleSectionClick(item.section)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.section
                      ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            
            {/* Botones de autenticación */}
            <div className="flex items-center space-x-2 pl-2">
              {authItems.map((item) => (
                <Link
                  key={item.section}
                  href={item.section === 'login' ? AUTH_ROUTES.LOGIN : AUTH_ROUTES.REGISTER}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navegación móvil (hamburger menu) */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente principal de navegación que maneja el renderizado del servidor
export default function Navigation() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // En el servidor, renderizar una versión simplificada
  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo para SSR */}
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                BuscArt
              </span>
            </div>
            
            {/* Navegación simplificada para SSR */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
                {menuItems.map((item) => (
                  <a
                    key={item.section}
                    href={`#${item.section}`}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 pl-2">
                {authItems.map((item) => (
                  <a
                    key={item.section}
                    href={item.section === 'login' ? AUTH_ROUTES.LOGIN : AUTH_ROUTES.REGISTER}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // En el cliente, renderizar la navegación completa
  return <ClientNavigation />;
}