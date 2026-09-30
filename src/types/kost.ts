export type GenderCategory = 'putra' | 'putri' | 'campur';

export interface Location {
  city: string;
  address: string;
  googleMapsUrl: string;
  clusterName?: string;
}

export interface Owner {
  name: string;
  whatsapp: string; // Format: "628xxxxxxxxxx"
}

export interface Kost {
  id: string;
  slug: string;
  title: string;
  gender: GenderCategory;
  priceMonthly: number;
  location: Location;
  owner: Owner;
  facilities: string[];
  images: string[];
  isFeatured?: boolean;
  availableRooms: number;
  nearCampus?: string;
}

export interface FilterState {
  searchQuery: string;
  gender: GenderCategory | 'all';
  nearCampus: string;
  facilities: string[];
}
