import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import { properties, priceRange } from '../data/properties';
import { Property, FilterOptions } from '../types';
import { Star, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  // State for filters
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [priceRange.min, priceRange.max],
    location: '',
    available: null,
    bedrooms: null,
    propertyType: null,
    searchTerm: '',
  });
  
  // State for sorting
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'price' | 'available'>('price');
  
  // State for selected property
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Apply filters and sorting
  const filteredProperties = properties.filter((property) => {
    // Check price range
    if (
      property.price < filters.priceRange[0] ||
      property.price > filters.priceRange[1]
    ) {
      return false;
    }
    
    // Check location
    if (filters.location && property.location !== filters.location) {
      return false;
    }
    
    // Check availability
    if (filters.available !== null && property.available !== filters.available) {
      return false;
    }
    
    // Check bedrooms
    if (filters.bedrooms !== null && property.bedrooms !== filters.bedrooms) {
      return false;
    }
    
    // Check property type
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }
    
    // Check search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        property.title.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else {
      // Sort by availability (available first, then coming soon)
      if (a.available === b.available) {
        return 0;
      }
      if (sortOrder === 'asc') {
        return a.available ? -1 : 1;
      } else {
        return a.available ? 1 : -1;
      }
    }
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, sortOrder]);
  
  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };
  
  // Handle property modal close
  const handleCloseModal = () => {
    setSelectedProperty(null);
  };
  
  // Handle sorting
  const handleSort = (by: 'price' | 'available') => {
    if (sortBy === by) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(by);
      setSortOrder('asc');
    }
  };
  
  // Handle login success
  const handleLoginSuccess = () => {
    // You can add additional logic here if needed
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onLoginSuccess={handleLoginSuccess} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Student Accommodation</h1>
          <p className="text-lg text-gray-600 mb-6">Browse through our collection of student-friendly rental properties</p>
          
          <FilterBar 
            onFilterChange={setFilters} 
            initialFilters={filters} 
          />
          
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{sortedProperties.length}</span> properties
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('price')}
                rightIcon={sortBy === 'price' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                className={`${sortBy === 'price' ? 'bg-gray-100' : ''}`}
              >
                Price
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('available')}
                rightIcon={sortBy === 'available' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                className={`${sortBy === 'available' ? 'bg-gray-100' : ''}`}
              >
                Availability
              </Button>
            </div>
          </div>
          
          {paginatedProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => handlePropertySelect(property)}
                  />
                ))}
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Star size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No properties found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more options.</p>
              <Button variant="outline" onClick={() => setFilters({
                priceRange: [priceRange.min, priceRange.max],
                location: '',
                available: null,
                bedrooms: null,
                propertyType: null,
                searchTerm: '',
              })}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">StudentRent</h3>
              <p className="text-gray-400">
                Find your perfect student accommodation with ease. Browse through our collection of curated properties.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">123 Student Street<br />University District, City</p>
              <p className="text-gray-400 mb-2">info@studentrent.com</p>
              <p className="text-gray-400">(123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            © 2025 StudentRent. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Property Detail Modal */}
      <PropertyDetailModal 
        property={selectedProperty as Property} 
        isOpen={!!selectedProperty} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Home;