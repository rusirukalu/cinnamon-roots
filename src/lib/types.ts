export interface PhotoItem {
  id: string;
  image: string;
  page: string;
  author: string;
  alt: string;
  caption: string;
  position?: string;
}

export interface ItineraryItem {
  title: string;
  minutes: string;
  text: string;
  featured?: boolean;
}

export interface JourneyStage {
  title: string;
  text: string;
  tag: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BookingFormData {
  experience: string;
  date: string;
  guests: string;
  name: string;
  email: string;
  notes: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;
