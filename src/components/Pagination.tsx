import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Create a window of visible page numbers
  const getVisiblePageNumbers = () => {
    const delta = 1; // Number of pages to show on each side of current page
    let range = [];
    
    // Always include first and last page
    // Then add a window around the current page
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }
    
    // Add ellipses where needed
    let withEllipsis = [];
    let prev = 0;
    
    for (const i of range) {
      if (prev && i - prev > 1) {
        withEllipsis.push('ellipsis');
      }
      withEllipsis.push(i);
      prev = i;
    }
    
    return withEllipsis;
  };
  
  const visiblePageNumbers = getVisiblePageNumbers();
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex items-center justify-center space-x-1 md:space-x-2 my-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`
          p-2 rounded-md transition-colors flex items-center justify-center
          ${currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'}
        `}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      
      {visiblePageNumbers.map((page, index) => (
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="text-gray-400">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`
              min-w-[32px] h-8 flex items-center justify-center rounded-md transition-colors
              ${currentPage === page
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded-md transition-colors flex items-center justify-center
          ${currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'}
        `}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;