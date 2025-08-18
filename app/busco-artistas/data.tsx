import React from 'react';
import { Search, CalendarCheck, Handshake, Shield, Tag, MessageSquare, Star, Award, FileSignature, Music, Mic2, Users, Paintbrush, Sparkles } from 'lucide-react';
import { Benefit, ArtistCategory, HowItWorksStep } from './types';

// Create a mapping of icon names to components
const iconComponents = {
  Search,
  CalendarCheck,
  Handshake,
  Shield,
  Tag,
  MessageSquare,
  Star,
  Award,
  FileSignature,
  Music,
  Mic2,
  Users,
  Paintbrush,
  Sparkles
};

// Helper to create a benefit with proper typing
const createBenefit = (iconName: keyof typeof iconComponents, color: string, title: string, description: string): Benefit => {
  const Icon = iconComponents[iconName];
  const iconElement = React.createElement(Icon, { className: `w-6 h-6 ${color}` });
  return {
    icon: iconElement,
    title,
    description,
  };
};

export const benefits: Benefit[] = [
  createBenefit('Search', 'text-purple-400', 
    'Búsqueda Inteligente',
    'Encuentra al artista perfecto con nuestro sistema de búsqueda avanzada que filtra por ubicación, disponibilidad y estilo.'
  ),
  createBenefit('CalendarCheck', 'text-pink-400',
    'Disponibilidad en Tiempo Real',
    'Visualiza la disponibilidad de los artistas en tiempo real y reserva con solo unos clics.'
  ),
  createBenefit('Handshake', 'text-purple-400',
    'Reservas Directas',
    'Sin intermediarios. Contacta y contrata directamente a los artistas que más te gusten.'
  ),
  createBenefit('Shield', 'text-pink-400',
    'Pago Seguro',
    'Tu pago está protegido hasta que el servicio sea completado según lo acordado.'
  ),
  createBenefit('Tag', 'text-purple-400',
    'Mejor Precio Garantizado',
    'Compara precios y encuentra las mejores ofertas de artistas en tu zona.'
  ),
  createBenefit('MessageSquare', 'text-pink-400',
    'Chat en Tiem Real',
    'Comunícate directamente con los artistas para resolver dudas y acordar detalles.'
  ),
  createBenefit('Star', 'text-purple-400',
    'Reseñas Verificadas',
    'Lee opiniones reales de otros organizadores de eventos para tomar la mejor decisión.'
  ),
  createBenefit('Award', 'text-pink-400',
    'Artistas Verificados',
    'Todos nuestros artistas pasan por un riguroso proceso de verificación.'
  ),
  createBenefit('FileSignature', 'text-purple-400',
    'Contrato Digital',
    'Acuerdos claros y seguros para ambas partes con nuestro contrato digital.'
  )
];

// Helper to create artist category with proper typing
const createArtistCategory = (name: string, count: number, iconName: keyof typeof iconComponents): ArtistCategory => ({
  name,
  count,
  icon: iconComponents[iconName]
});

export const artistCategories: ArtistCategory[] = [
  createArtistCategory('Músicos', 42, 'Music'),
  createArtistCategory('DJs', 28, 'Mic2'),
  createArtistCategory('Grupos Musicales', 15, 'Users'),
  createArtistCategory('Artistas Visuales', 9, 'Paintbrush'),
  createArtistCategory('Performers', 12, 'Sparkles'),
  createArtistCategory('Magos', 7, 'Sparkles')
];

export const howItWorks: HowItWorksStep[] = [
  {
    title: 'Cuéntanos sobre tu evento',
    description: 'Completa nuestro sencillo formulario con los detalles de tu evento: fecha, ubicación, tipo de artista que buscas y presupuesto.',
    icon: Search
  },
  {
    title: 'Recibe ofertas de artistas',
    description: 'Los artistas disponibles en tu área te enviarán sus propuestas personalizadas. Revisa sus perfiles, videos y reseñas.',
    icon: MessageSquare
  },
  {
    title: 'Selecciona a tu favorito',
    description: 'Compara las diferentes opciones y elige al artista que mejor se adapte a tu evento. ¡Puedes chatear con ellos antes de decidir!',
    icon: Handshake
  },
  {
    title: 'Confirma y disfruta',
    description: 'Realiza el pago seguro a través de nuestra plataforma y recibe la confirmación. ¡Solo queda disfrutar de un espectáculo increíble!',
    icon: Award
  }
];
