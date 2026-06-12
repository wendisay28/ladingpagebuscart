'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, Workflow, BookOpen, Mail, LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import { ConstructionModal } from '../../ui/modal';
import { useTheme } from '../../../context/ThemeContext';

// Botón de cambio claro/oscuro reutilizable
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-105"
      style={{
        background: isDark ? 'rgba(255,255,255,0.10)' : '#f3e8ff',
        border: isDark ? '1px solid rgba(255,255,255,0.28)' : '1px solid #e9d5ff',
        color: isDark ? '#fde68a' : '#7c3aed',
      }}
    >
      {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}

// Tipos locales
type SectionType = 'hero' | 'nosotros' | 'como-funciona' | 'contacto';

const menuItems = [
  { name: 'Home', section: 'hero' as SectionType, icon: <Home className="w-5 h-5" /> },
  { name: 'Nosotros', section: 'nosotros' as SectionType, icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Cómo funciona', section: 'como-funciona' as SectionType, icon: <Workflow className="w-5 h-5" /> },
  { name: 'Contacto', section: 'contacto' as SectionType, icon: <Mail className="w-5 h-5" /> }
];

const authItems = [
  { name: 'Ingresar', section: 'login', icon: <LogIn className="w-5 h-5" /> },
  { name: 'Registrarse', section: 'register', icon: <UserPlus className="w-5 h-5" /> }
];

// Componente de navegación del lado del cliente
interface ClientNavigationProps {
  activeSection?: string;
}

function ClientNavigation({ activeSection = '' }: ClientNavigationProps) {
  const { isDark } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionType>('hero');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [, setAuthModalTitle] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Observer para detectar la sección activa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as SectionType;
            if (menuItems.some(item => item.section === sectionId)) {
              setCurrentSection(sectionId);
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

  const handleNavClick = (section: SectionType) => {
    setCurrentSection(section);
    setMobileMenuOpen(false);
    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionClick = (section: SectionType) => {
    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentSection(section);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md shadow-lg border-b transition-colors duration-300"
      style={{
        backgroundColor: isDark ? 'rgba(10,6,24,0.85)' : 'rgba(240,235,255,0.90)',
        borderColor: isDark ? 'rgba(255,255,255,0.10)' : '#e9d5ff',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent hover:from-[#8b5cf6] hover:to-[#3b82f6] transition-colors duration-200">
                BuscArt
              </span>
            </Link>
          </div>

          {/* Navegación principal para desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Menú principal */}
            <div className="flex items-center space-x-2 border-r border-[#d8b4fe] pr-4">
              {menuItems.map((item) => (
                <Link
                  key={item.section}
                  href={`/${item.section === 'hero' ? '' : item.section}`}
                  onClick={() => handleSectionClick(item.section)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center rounded-md ${
                    (activeSection || currentSection) === item.section
                      ? 'text-white bg-[#7c3aed]'
                      : isDark
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-[#6b7280] hover:text-[#1f2937] hover:bg-[#f3e8ff]'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-2">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Botones de autenticación */}
            <div className="flex items-center space-x-2">
              {authItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    setAuthModalTitle(item.name);
                    setShowAuthModal(true);
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center rounded-md ${
                    item.section === 'login'
                      ? isDark
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-[#6b7280] hover:text-[#1f2937] hover:bg-[#f3e8ff]'
                      : 'bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white hover:from-[#8b5cf6] hover:to-[#3b82f6]'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-2">
                    {item.icon}
                  </span>
                  {item.name}
                </button>
              ))}
              {/* Toggle claro/oscuro */}
              <ThemeToggle />
            </div>
          </div>

          {/* Menú móvil desplegable */}
          <div className={`md:hidden absolute top-16 left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div
              className="mx-4 mt-2 px-2 py-4 space-y-2 backdrop-blur-lg shadow-2xl border rounded-lg"
              style={{
                background: isDark ? 'rgba(20,14,40,0.97)' : 'rgba(255,255,255,0.95)',
                borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#e9d5ff',
              }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.section}
                  href={`/${item.section === 'hero' ? '' : item.section}`}
                  onClick={() => {
                    handleNavClick(item.section);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    (activeSection || currentSection) === item.section
                      ? 'bg-[#7c3aed]/20 text-[#a78bfa]'
                      : isDark
                        ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                        : 'text-[#6b7280] hover:bg-[#f3e8ff] hover:text-[#1f2937]'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-3">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t my-2" style={{ borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#e9d5ff' }}></div>

              {authItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    setAuthModalTitle(item.name);
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
                    item.section === 'login'
                      ? isDark
                        ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                        : 'text-[#6b7280] hover:bg-[#f3e8ff] hover:text-[#1f2937]'
                      : 'text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] hover:from-[#8b5cf6] hover:to-[#3b82f6]'
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-3">
                    {item.icon}
                  </span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Toggle + botón de menú móvil */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c3aed] transition-colors duration-200 ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-[#6b7280] hover:text-[#1f2937]'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg className={`h-6 w-6 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de autenticación en construcción */}
      <ConstructionModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </nav>
  );
}

// Componente principal de navegación que maneja el renderizado del servidor
interface NavigationProps {
  activeSection?: string;
}

export default function Navigation({ activeSection = '' }: NavigationProps) {
  const [isClient, setIsClient] = useState(false);
  const [, setShowAuthModal] = useState(false);
  const [, setAuthModalTitle] = useState('');
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // En el servidor, renderizar una versión simplificada
  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f0ebff]/90 backdrop-blur-md border-b border-[#e9d5ff]">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo para SSR */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent">
                BuscArt
              </span>
            </div>
            
            {/* Navegación simplificada para SSR */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 border-r border-[#d8b4fe] pr-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.section}
                    href={`/${item.section === 'hero' ? '' : item.section}`}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-[#6b7280] hover:text-[#1f2937] rounded-md transition-colors duration-200"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 pl-2">
                {authItems.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => {
                      setAuthModalTitle(item.name);
                      setShowAuthModal(true);
                    }}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-[#6b7280] hover:text-[#1f2937] rounded-md transition-colors duration-200"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // En el cliente, mover la lógica del modal al ClientNavigation
  return <ClientNavigation activeSection={activeSection} />;
}