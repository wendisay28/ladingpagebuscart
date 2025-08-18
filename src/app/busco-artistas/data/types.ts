import { ReactNode } from 'react';

export interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ArtistCategory {
  name: string;
  count: number;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
}
