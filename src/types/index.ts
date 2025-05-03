export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  available: boolean;
  availableFrom: string; // ISO date string
  amenities: string[];
  featured?: boolean;
  propertyType: 'apartment' | 'house' | 'studio' | 'shared';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  location: string;
  available: boolean | null;
  bedrooms: number | null;
  propertyType: string | null;
  searchTerm: string;
}