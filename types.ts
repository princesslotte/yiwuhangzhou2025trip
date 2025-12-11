
export type Language = 'zh' | 'ko';

export interface TravelEvent {
  id: string;
  time: string;
  location: string;
  notes: string;
  category: 'sightseeing' | 'food' | 'shopping' | 'transport' | 'hotel';
  mapQuery?: string;
  hideMap?: boolean;
}

export interface DayItinerary {
  id: string;
  dateStr: string;
  dayLabel: string;
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
  zh: { outbound: FlightDetails[]; inbound: FlightDetails[] };
  ko: { outbound: FlightDetails[]; inbound: FlightDetails[] };
}

export interface PrepItem {
  text: string;
  imgUrls?: string[];
}

export interface InfoItem {
  label: string;
  value: string;
  url: string;
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
  categories: Record<string, string>;
  generateAi: string;
  generating: string;
  navigate: string;
  copyAddress: string;
  emptyState: string;
  yiwu: string;
  hangzhou: string;
  menuHotel: string;
  menuPrep: string;
  menuInfo: string;
  menuCurrency: string;
  book: string;
  openMap: string;
  exchangeRate: string;
  checkXe: string;
}
