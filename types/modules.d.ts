// Type definitions for local modules
declare module '@/app/busco-artistas/data' {
  import { Benefit, ArtistCategory, HowItWorksStep } from '@/app/busco-artistas/types';
  export const benefits: Benefit[];
  export const artistCategories: ArtistCategory[];
  export const howItWorks: HowItWorksStep[];
}

declare module '@/app/busco-artistas/components/Benefits' {
  import { FC } from 'react';
  import { Benefit } from '@/app/busco-artistas/types';
  interface BenefitsProps {
    benefits: Benefit[];
  }
  const Benefits: FC<BenefitsProps>;
  export default Benefits;
}

declare module '@/app/busco-artistas/components/LiveArtistSection' {
  import { FC } from 'react';
  import { ArtistCategory } from '@/app/busco-artistas/types';
  interface LiveArtistSectionProps {
    onFindArtists: () => void;
    categories: ArtistCategory[];
  }
  const LiveArtistSection: FC<LiveArtistSectionProps>;
  export default LiveArtistSection;
}

declare module '@/app/busco-artistas/components/EmergencyArtistSection' {
  import { FC } from 'react';
  interface EmergencyArtistSectionProps {
    onEmergencyRequest: (data: { 
      location: string; 
      eventType: string; 
      budget: string; 
      details: string 
    }) => void;
    isSearching: boolean;
    timeLeft: number;
    artistsFound: number;
  }
  const EmergencyArtistSection: FC<EmergencyArtistSectionProps>;
  export default EmergencyArtistSection;
}

declare module '@/app/busco-artistas/components/HowItWorks' {
  import { FC } from 'react';
  import { HowItWorksStep } from '@/app/busco-artistas/types';
  interface HowItWorksProps {
    steps: HowItWorksStep[];
  }
  const HowItWorks: FC<HowItWorksProps>;
  export default HowItWorks;
}
