import { Shield, Handshake, Tag, MessageSquare, Star, Award, CalendarCheck, FileSignature, Mic2 } from 'lucide-react';
import { Benefit, ArtistCategory } from './types';

export const benefits: Benefit[] = [
  {
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    title: "Pago Seguro",
    description: "Tu pago está protegido hasta que el servicio sea completado satisfactoriamente."
  },
  {
    icon: <Handshake className="w-6 h-6 text-purple-400" />,
    title: "Contrato Digital",
    description: "Acuerdos claros y legales para proteger a ambas partes."
  },
  {
    icon: <Tag className="w-6 h-6 text-purple-400" />,
    title: "Mejor Precio",
    description: "Compara entre múltiples ofertas y elige la que mejor se ajuste a tu presupuesto."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
    title: "Chat en Tiempo Real",
    description: "Comunícate directamente con los artistas para aclarar dudas."
  },
  {
    icon: <Star className="w-6 h-6 text-purple-400" />,
    title: "Reseñas Verificadas",
    description: "Lee opiniones reales de otros organizadores de eventos."
  },
  {
    icon: <Award className="w-6 h-6 text-purple-400" />,
    title: "Artistas Verificados",
    description: "Todos los artistas pasan por un proceso de verificación."
  }
];

export const artistCategories: ArtistCategory[] = [
  { name: 'Músicos', count: 24 },
  { name: 'DJs', count: 18 },
  { name: 'Payasos', count: 9 },
  { name: 'Otros', count: 15 }
];

export const howItWorks = [
  {
    number: 1,
    title: "Describe tu evento",
    description: "Cuéntanos qué necesitas y cuál es tu presupuesto."
  },
  {
    number: 2,
    title: "Recibe ofertas",
    description: "Los artistas interesados te enviarán sus propuestas."
  },
  {
    number: 3,
    title: "Compara y elige",
    description: "Revisa perfiles, portafolios y comentarios."
  },
  {
    number: 4,
    title: "Contrata seguro",
    description: "Firma el contrato digital y realiza el pago protegido."
  }
];
