export interface Artist {
  name: string;
  profession: string;
  image: string;
  description?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  pricePerHour?: number;
  joinedDate?: string;
  categories?: string[];
}

export interface Event {
  id: string;
  title: string;
  type: string;
  image: string;
  location: string;
  date: string;
  description?: string;
  price?: number;
  category?: string;
  featured?: boolean;
}

export interface Category {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FilterOptions {
  searchQuery: string;
  location: string;
  minRating: number;
  sortBy: 'popular' | 'newest' | 'rating';
  priceRange: [number, number];
}

export type ViewMode = 'grid' | 'list';
