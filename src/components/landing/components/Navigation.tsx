'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import { Home, Users, Calendar, MapPin, ShoppingBag, LogIn, UserPlus } from 'lucide-react';

const menuItems = [
  { name: 'Inicio', route: '/inicio', icon: <Home className="w-5 h-5" /> },
  { name: 'Artistas', route: '/artistas', icon: <Users className="w-5 h-5" /> },
  { name: 'Eventos', route: '/eventos', icon: <Calendar className="w-5 h-5" /> },
  { name: 'Lugares', route: '/lugares', icon: <MapPin className="w-5 h-5" /> },
  { name: 'Tienda', route: '/tienda', icon: <ShoppingBag className="w-5 h-5" /> }
];

const authItems = [
  { name: 'Ingresar', route: '/login', icon: <LogIn className="w-5 h-5" /> },
  { name: 'Registrarse', route: '/register', icon: <UserPlus className="w-5 h-5" /> }
];

export default function Navigation() {
  const { activeSection, setActiveSection } = useNavigation();

  useEffect(() => {
    // Manejar el scroll suave y actualizar la sección activa
    const handleScroll = () => {
      const sections = menuItems.map(item => item.route.replace('/', ''));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleNavClick = (route: string) => {
    const section = route.replace('/', '');
    setActiveSection(section);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BuscArt
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
              {menuItems.map((item) => (
                <Link
                  key={item.route}
                  href={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.route.replace('/', '')
                      ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 pl-2">
              {authItems.map((item) => (
                <Link
                  key={item.route}
                  href={item.route}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}