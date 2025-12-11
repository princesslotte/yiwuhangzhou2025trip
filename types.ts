

export type Language = 'zh' | 'ko';

export type EventCategory = 'sightseeing' | 'food' | 'shopping' | 'transport' | 'hotel';

export interface TravelEvent {
  id: string;
  time: string;
  location: string;
  notes: string;
  category: EventCategory;
  lat?: number; // Optional for map integration mock
  lng?: number; // Optional for map integration mock
  mapQuery?: string; // Optional override for map search query
  hideMap?: boolean; // Optional: if true, hides the navigation button
}

export interface DayItinerary {
  id: string;
  dateStr: string; // YYYY-MM-DD
  dayLabel: string; // e.g., "Day 1"
  events: TravelEvent[];
}

export interface FlightDetails {
  flightNo: string;
  from: string;
  fromTerm: string;
  to: string;
  toTerm: string;
  time: string;
}

export interface FlightInfo {
  zh: {
    outbound: FlightDetails[];
    inbound: FlightDetails[];
  };
  ko: {
    outbound: FlightDetails[];
    inbound: FlightDetails[];
  };
}

export interface PrepItem {
  text: string;
  imgUrls?: string[];
}

export interface InfoItem {
  label: string;
  value: string;
  url?: string;
}

export interface Translation {
  title: string;
  myTrip: string;
  addEvent: string;
  editEvent: string;
  delete: string;
  save: string;
  cancel: string;
  time: string;
  location: string;
  notes: string;
  category: string;
  categories: Record<EventCategory, string>;
  generateAi: string;
  generating: string;
  navigate: string;
  copyAddress: string;
  emptyState: string;
  yiwu: string;
  hangzhou: string;
  // Menu items
  menuHotel: string;
  menuPrep: string;
  menuInfo: string;
  menuCurrency: string;
  // Actions
  book: string;
  openMap: string;
  // Currency
  exchangeRate: string;
  checkXe: string;
}