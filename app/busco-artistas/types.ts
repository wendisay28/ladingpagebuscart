import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ArtistCategory {
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FormData {
  eventType: string;
  eventDate: string;
  budget: string;
  description: string;
}

export interface EmergencyRequest {
  location: string;
  eventType: string;
  budget: string;
  details: string;
}
