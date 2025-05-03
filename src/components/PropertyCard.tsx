import React from 'react';
import { Property } from '../types';
import { MapPin, Bed, Bath, DotSquare as SquareFootage, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const {
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    squareFeet,
    imageUrl,
    available,
    availableFrom,
    featured,
  } = property;

  return (
    <div 
      className={`
        bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300
        border border-gray-100 flex flex-col h-full cursor-pointer
        ${featured ? 'ring-2 ring-accent-300 ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/70 to-transparent p-4">
          <div className="text-white font-bold text-xl">{formatCurrency(price)}<span className="text-sm font-normal">/month</span></div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <div className="flex items-center text-primary-600 mb-3">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Bed size={16} className="mr-1" />
              <span className="text-sm">{bedrooms === 0 ? 'Studio' : `${bedrooms} Bed${bedrooms !== 1 ? 's' : ''}`}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath size={16} className="mr-1" />
              <span className="text-sm">{bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <SquareFootage size={16} className="mr-1" />
              <span className="text-sm">{squareFeet} ft²</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-1" />
            <span className="text-sm text-gray-600">Available: {new Date(availableFrom).toLocaleDateString()}</span>
          </div>
          
          <div className={`mt-2 text-sm font-medium ${available ? 'text-accent-600' : 'text-primary-600'}`}>
            {available ? 'Available Now' : 'Coming Soon'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;