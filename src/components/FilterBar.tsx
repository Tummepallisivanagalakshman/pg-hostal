import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Search, MapPin, X, Home } from 'lucide-react';
import { Button } from './ui/Button';
import { locations, propertyTypes, priceRange } from '../data/properties';
import { FilterOptions } from '../types';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, initialFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialFilters.searchTerm);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle search term debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setFilters(prev => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }, 300);
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [debouncedSearchTerm]);
  
  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      priceRange: [priceRange.min, priceRange.max],
      location: '',
      available: null,
      bedrooms: null,
      propertyType: null,
      searchTerm: '',
    });
    setDebouncedSearchTerm('');
  };
  
  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by property name or description..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={debouncedSearchTerm}
            onChange={(e) => setDebouncedSearchTerm(e.target.value)}
          />
          {debouncedSearchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setDebouncedSearchTerm('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {/* Toggle Filters Button */}
        <div className="flex-shrink-0">
          <Button
            variant="outline"
            leftIcon={<Sliders size={16} />}
            onClick={toggleExpand}
            className={isExpanded ? 'bg-gray-100' : ''}
          >
            Filters
          </Button>
        </div>
      </div>
      
      {/* Expanded Filters */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 hidden'
        }`}
      >
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">${filters.priceRange[0]}</span>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={50}
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-500 text-sm">${filters.priceRange[1]}</span>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={50}
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={16} className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home size={16} className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.propertyType || ''}
              onChange={(e) => handleFilterChange('propertyType', e.target.value || null)}
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.bedrooms === null ? '' : filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Any</option>
            <option value="0">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>
        
        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.available === null ? '' : filters.available.toString()}
            onChange={(e) => {
              const value = e.target.value;
              handleFilterChange('available', value === '' ? null : value === 'true');
            }}
          >
            <option value="">All</option>
            <option value="true">Available Now</option>
            <option value="false">Coming Soon</option>
          </select>
        </div>
        
        {/* Reset Filters */}
        <div className="md:col-span-3 lg:col-span-4 flex justify-end mt-2">
          <Button variant="outline" size="sm" onClick={resetFilters} leftIcon={<X size={14} />}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;