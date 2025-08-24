// Tipos de datos
export type Artist = {
    id: number;
    name: string;
    category: string;
    image: string;
    rating: number;
    distance?: string;
    price: string;
    featured?: boolean;
    topRated?: boolean;
    new?: boolean;
  };
  
  export type Category = {
    id: number;
    name: string;
    image: string;
    count: number;
  };
  
  // URLs de imágenes de placeholder
  const getRandomImage = (id: number, width = 400, height = 600, isCategory = false) => {
    if (isCategory) {
      // Para categorías, usamos imágenes temáticas de Unsplash con ID único
      const categoryThemes = [
        'music', 'concert', 'singer', 'guitar', 'piano', 'violin', 'drums', 'band', 
        'art', 'painting', 'drawing', 'sculpture', 'design', 'photography', 'theater', 
        'dance', 'ballet', 'magic', 'comedy', 'performance', 'actor', 'actress', 'show',
        'film', 'movie', 'cinema', 'book', 'literature', 'poetry', 'food', 'chef', 'artist'
      ];
      const theme = categoryThemes[id % categoryThemes.length];
      return `https://source.unsplash.com/featured/${width}x${height}/?${theme},art&sig=${id}`;
    }
    // Para artistas, usamos fotos de perfil de personas únicas
    const gender = id % 2 === 0 ? 'men' : 'women';
    const uniqueId = id * 13 % 100; // Aseguramos que sea único
    return `https://randomuser.me/api/portraits/med/${gender}/${uniqueId}.jpg`;
  }
  
  // Artistas de ejemplo
  export const demoArtists: Artist[] = [
    {
      id: 1,
      name: 'María González',
      category: 'Cantante',
      image: getRandomImage(1, 400, 600, false),
      rating: 4.8,
      distance: '2.5',
      price: '120,000',
      featured: true,
      topRated: true
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      category: 'Guitarrista',
      image: getRandomImage(2, 400, 600, false),
      rating: 4.9,
      distance: '1.2',
      price: '150,000',
      topRated: true
    },
    {
      id: 3,
      name: 'Ana Martínez',
      category: 'Pintora',
      image: getRandomImage(3, 400, 600, false),
      rating: 4.7,
      distance: '3.1',
      price: '180,000',
      featured: true
    },
    {
      id: 4,
      name: 'Diego López',
      category: 'Bailarín',
      image: getRandomImage(4, 400, 600, false),
      rating: 4.6,
      distance: '0.8',
      price: '200,000',
      new: true
    },
    {
      id: 5,
      name: 'Laura Torres',
      category: 'Actriz',
      image: getRandomImage(5, 400, 600, false),
      rating: 4.9,
      distance: '2.3',
      price: '250,000',
      topRated: true
    },
    {
      id: 6,
      name: 'Javier Méndez',
      category: 'Mago',
      image: getRandomImage(6, 400, 600, false),
      rating: 4.5,
      distance: '1.7',
      price: '170,000'
    },
    {
      id: 7,
      name: 'Sofía Ramírez',
      category: 'Pianista',
      image: getRandomImage(7, 400, 600, false),
      rating: 4.8,
      distance: '3.5',
      price: '190,000',
      featured: true
    },
    {
      id: 8,
      name: 'Miguel Ángel',
      category: 'Escultor',
      image: getRandomImage(8, 400, 600, false),
      rating: 4.7,
      distance: '4.2',
      price: '220,000'
    },
    {
      id: 9,
      name: 'Valentina Ruiz',
      category: 'Cantante',
      image: getRandomImage(9, 400, 600, false),
      rating: 4.6,
      distance: '1.1',
      price: '140,000',
      new: true
    },
    {
      id: 10,
      name: 'Andrés Castro',
      category: 'Trompetista',
      image: getRandomImage(10, 400, 600, false),
      rating: 4.4,
      distance: '2.8',
      price: '160,000'
    },
    {
      id: 11,
      name: 'Camila Vargas',
      category: 'Bailarina',
      image: getRandomImage(11, 400, 600, false),
      rating: 4.9,
      distance: '1.5',
      price: '230,000',
      topRated: true
    },
    {
      id: 12,
      name: 'Ricardo Peña',
      category: 'Payaso',
      image: getRandomImage(12, 400, 600, false),
      rating: 4.3,
      distance: '3.7',
      price: '150,000'
    },
    {
      id: 13,
      name: 'Daniela Morales',
      category: 'Violinista',
      image: getRandomImage(13, 400, 600, false),
      rating: 4.7,
      distance: '0.5',
      price: '175,000',
      featured: true
    },
    {
      id: 14,
      name: 'Fernando Gutiérrez',
      category: 'Mimo',
      image: getRandomImage(14, 400, 600, false),
      rating: 4.2,
      distance: '2.1',
      price: '130,000'
    },
    {
      id: 15,
      name: 'Gabriela Ríos',
      category: 'Cantante',
      image: getRandomImage(15, 400, 600, false),
      rating: 4.8,
      distance: '1.8',
      price: '195,000',
      new: true
    },
    {
      id: 16,
      name: 'Oscar Díaz',
      category: 'Malabarista',
      image: getRandomImage(16, 400, 600, false),
      rating: 4.5,
      distance: '3.9',
      price: '145,000'
    },
    {
      id: 17,
      name: 'Patricia Soto',
      category: 'Pintora',
      image: getRandomImage(17, 400, 600, false),
      rating: 4.6,
      distance: '2.4',
      price: '210,000',
      featured: true
    },
    {
      id: 18,
      name: 'Raúl Mendoza',
      category: 'Trovador',
      image: getRandomImage(18, 400, 600, false),
      rating: 4.3,
      distance: '1.3',
      price: '125,000'
    },
    {
      id: 19,
      name: 'Tatiana López',
      category: 'Bailarina',
      image: getRandomImage(19, 400, 600, false),
      rating: 4.7,
      distance: '2.9',
      price: '180,000',
      topRated: true
    },
    {
      id: 20,
      name: 'Sergio Ramírez',
      category: 'Actor',
      image: getRandomImage(20, 400, 600, false),
      rating: 4.4,
      distance: '1.9',
      price: '160,000',
      new: true
    }
  ];
  
  // Categorías de ejemplo
  export const categories: Category[] = [
    { id: 1, name: 'Música', image: getRandomImage(101, 400, 300, true), count: 250 },
    { id: 2, name: 'Arte Visual', image: getRandomImage(102, 400, 300, true), count: 180 },
    { id: 3, name: 'Teatro', image: getRandomImage(103, 400, 300, true), count: 120 },
    { id: 4, name: 'Baile', image: getRandomImage(104, 400, 300, true), count: 150 },
    { id: 5, name: 'Magia', image: getRandomImage(105, 400, 300, true), count: 80 },
    { id: 6, name: 'Comedia', image: getRandomImage(106, 400, 300, true), count: 90 },
    { id: 7, name: 'Gastronomía', image: getRandomImage(107, 400, 300, true), count: 60 },
    { id: 8, name: 'Fotografía', image: getRandomImage(108, 400, 300, true), count: 110 },
    { id: 9, name: 'Cine', image: getRandomImage(109, 400, 300, true), count: 95 },
    { id: 10, name: 'Literatura', image: getRandomImage(110, 400, 300, true), count: 70 },
    { id: 11, name: 'Escultura', image: getRandomImage(111, 400, 300, true), count: 55 },
    { id: 12, name: 'Diseño', image: getRandomImage(112, 400, 300, true), count: 85 }
  ];
  
  // Funciones para obtener datos filtrados
  export const getFeaturedArtists = (): Artist[] => {
    return demoArtists.filter(artist => artist.featured);
  };
  
  export const getTopRatedArtists = (): Artist[] => {
    return [...demoArtists]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  };
  
  export const getNewArtists = (): Artist[] => {
    return [...demoArtists]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  };
  
  export const getArtistsByCategory = (categoryName: string): Artist[] => {
    return demoArtists.filter(artist => 
      artist.category.toLowerCase() === categoryName.toLowerCase()
    );
  };
  