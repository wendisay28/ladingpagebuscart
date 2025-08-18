export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ArtistCategory {
  name: string;
  count: number;
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
