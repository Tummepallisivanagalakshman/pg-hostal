import React from 'react';
import { Property } from '../types';
import { formatCurrency } from '../utils/formatters';
import { MapPin, Bed, Bath, DotSquare as SquareFootage, Calendar, X, Check, Phone, Mail } from 'lucide-react';
import { Button } from './ui/Button';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  isOpen: boolean;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose, isOpen }) => {
  if (!isOpen) return null;

  const {
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    squareFeet,
    imageUrl,
    available,
    availableFrom,
    amenities,
    propertyType,
  } = property;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <div className="h-64 sm:h-80 md:h-96 bg-gray-200">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin size={18} className="mr-1" />
                <span>{location}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:text-right">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(price)}<span className="text-lg font-normal">/month</span></div>
              <div className={`mt-1 font-medium ${available ? 'text-green-600' : 'text-amber-600'}`}>
                {available ? 'Available Now' : 'Coming Soon'}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-t border-b border-gray-200 py-4">
            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Bed size={20} className="mr-2" />
                <span className="font-medium">{bedrooms === 0 ? 'Studio' : `${bedrooms} Bed${bedrooms !== 1 ? 's' : ''}`}</span>
              </div>
              <div className="text-xs text-gray-500">Bedrooms</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Bath size={20} className="mr-2" />
                <span className="font-medium">{bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="text-xs text-gray-500">Bathrooms</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center text-gray-700 mb-1">
                <SquareFootage size={20} className="mr-2" />
                <span className="font-medium">{squareFeet}</span>
              </div>
              <div className="text-xs text-gray-500">Square Feet</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center text-gray-700 mb-1">
                <Calendar size={20} className="mr-2" />
                <span className="font-medium">{new Date(availableFrom).toLocaleDateString()}</span>
              </div>
              <div className="text-xs text-gray-500">Available From</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <Check size={16} className="mr-2 text-green-500" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Property Type</h3>
            <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
              {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Landlord</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                leftIcon={<Phone size={16} />}
                variant="primary"
                className="flex-1"
              >
                Call Landlord
              </Button>
              <Button
                leftIcon={<Mail size={16} />}
                variant="outline"
                className="flex-1"
              >
                Email Inquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;