'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryData {
  category: string;
  subcategories: {
    name: string;
    specialties: string[];
  }[];
}

const categoriesData: CategoryData[] = [
  {
    category: 'Artes Visuales y Plásticas',
    subcategories: [
      {
        name: 'Pintores',
        specialties: ['Pintor al óleo', 'Pintor acrílico', 'Acuarelista', 'Pintor retratista']
      },
      {
        name: 'Escultores',
        specialties: ['Escultor en madera', 'Escultor en piedra', 'Escultor en metal']
      },
      {
        name: 'Fotografía artística',
        specialties: ['Fotógrafo artístico', 'Fotógrafo experimental']
      },
      {
        name: 'Arte urbano',
        specialties: ['Grafitero', 'Muralista', 'Street artist']
      },
      {
        name: 'Artesanías',
        specialties: ['Artesano textil', 'Artesano en cerámica', 'Artesano en madera']
      }
    ]
  },
  {
    category: 'Moda y Modelaje',
    subcategories: [
      {
        name: 'Diseñadores de moda',
        specialties: ['Diseñador de alta costura', 'Diseñador de ropa urbana', 'Diseñador de accesorios']
      },
      {
        name: 'Modelaje',
        specialties: ['Modelo de pasarela', 'Modelo fotográfico', 'Modelo comercial']
      },
      {
        name: 'Estilismo',
        specialties: ['Maquillador artístico', 'Peluquero de moda', 'Asesor de imagen']
      }
    ]
  },
  {
    category: 'Cultura y Turismo',
    subcategories: [
      {
        name: 'Patrimonio cultural',
        specialties: ['Guía de patrimonio', 'Restaurador', 'Museógrafo']
      },
      {
        name: 'Turismo cultural',
        specialties: ['Guía turístico cultural', 'Promotor de turismo', 'Curador de experiencias']
      },
      {
        name: 'Gastronomía cultural',
        specialties: ['Chef tradicional', 'Repostero artesanal', 'Experto en cocina típica']
      }
    ]
  },
  {
    category: 'Artes Escénicas',
    subcategories: [
      {
        name: 'Teatro',
        specialties: ['Actor de teatro', 'Director teatral', 'Dramaturgo']
      },
      {
        name: 'Danza',
        specialties: ['Bailarín clásico', 'Bailarín contemporáneo', 'Bailarín folclórico', 'Coreógrafo']
      },
      {
        name: 'Música',
        specialties: ['Cantante', 'Instrumentista', 'Compositor', 'Director musical']
      },
      {
        name: 'Circo y performance',
        specialties: ['Malabarista', 'Acróbata', 'Payaso', 'Artista de performance']
      }
    ]
  },
  {
    category: 'Medios Audiovisuales',
    subcategories: [
      {
        name: 'Cine y TV',
        specialties: ['Director de cine', 'Productor', 'Guionista', 'Actor de cine/TV']
      },
      {
        name: 'Radio y podcast',
        specialties: ['Locutor', 'Productor de radio', 'Podcaster']
      },
      {
        name: 'Fotografía comercial',
        specialties: ['Fotógrafo de moda', 'Fotógrafo publicitario', 'Fotógrafo editorial']
      },
      {
        name: 'Nuevos medios',
        specialties: ['Streamer', 'Youtuber', 'Creador de contenido audiovisual']
      }
    ]
  },
  {
    category: 'Artes Digitales y Publicidad',
    subcategories: [
      {
        name: 'Diseño gráfico',
        specialties: ['Diseñador gráfico', 'Ilustrador digital', 'Retocador fotográfico', 'Motion graphics']
      },
      {
        name: 'Publicidad y branding',
        specialties: ['Director creativo', 'Copywriter', 'Estratega de marca']
      },
      {
        name: 'Marketing digital',
        specialties: ['Gestor de redes', 'Especialista en SEO/SEM', 'Estratega de contenidos']
      },
      {
        name: 'Marketing de contenidos',
        specialties: ['Influencer', 'Creadora UGC', 'Tiktoker', 'Youtuber', 'Streamer', 'Podcaster']
      },
      {
        name: 'Producción multimedia',
        specialties: ['Animador 2D/3D', 'Diseñador web', 'Experto en RA/RV']
      },
      {
        name: 'Fotografía comercial',
        specialties: ['Fotógrafo de producto', 'Fotógrafo lifestyle', 'Fotógrafo publicitario']
      },
      {
        name: 'Producción audiovisual',
        specialties: ['Editor de video', 'Director de arte para campañas', 'Realizador de comerciales']
      }
    ]
  },
  {
    category: 'Otros Servicios Creativos',
    subcategories: [
      {
        name: 'Literatura',
        specialties: ['Escritor', 'Poeta', 'Ensayista', 'Editor']
      },
      {
        name: 'Artes aplicadas',
        specialties: ['Diseñador industrial', 'Diseñador de interiores', 'Diseñador de mobiliario']
      },
      {
        name: 'Educación artística',
        specialties: ['Docente de artes', 'Tallerista', 'Mediador cultural']
      },
      {
        name: 'Innovación cultural',
        specialties: ['Gestor cultural', 'Investigador', 'Productor cultural']
      }
    ]
  }
];

export default function CategoriesModal({ isOpen, onClose }: CategoriesModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4 sm:p-0">
        <div 
          className="relative transform overflow-hidden rounded-2xl bg-gray-900 border border-gray-700 text-left shadow-xl transition-all w-full max-w-5xl max-h-[90vh] my-8 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Todas las Categorías
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-8">
              {categoriesData.map((category, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-xl font-semibold text-white">{category.category}</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-800/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Subcategoría
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Especialidad
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900/50 divide-y divide-gray-800">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <tr key={subIndex} className="hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {subcategory.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-300">
                              <div className="flex flex-wrap gap-2">
                                {subcategory.specialties.map((specialty, specIndex) => (
                                  <span 
                                    key={specIndex}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-200 border border-purple-800/50"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-4 border-t border-gray-800 bg-gray-900/80">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
