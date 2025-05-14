import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: '',
    bedrooms: '',
  });
  const [sortBy, setSortBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      ...filters,
      sortBy,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          className="w-full px-4 py-3 pl-12 pr-4 rounded-full text-black outline-none focus:ring-2 focus:ring-[#703BF7]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <select
          className="px-4 py-2 rounded-full bg-white text-black"
          value={filters.propertyType}
          onChange={(e) =>
            setFilters({ ...filters, propertyType: e.target.value })
          }
        >
          <option value="all">All Properties</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>

        <select
          className="px-4 py-2 rounded-full bg-white text-black"
          value={filters.priceRange}
          onChange={(e) =>
            setFilters({ ...filters, priceRange: e.target.value })
          }
        >
          <option value="">Price Range</option>
          <option value="0-100000">$0 - $100,000</option>
          <option value="100000-200000">$100,000 - $200,000</option>
          <option value="200000-500000">$200,000 - $500,000</option>
          <option value="500000+">$500,000+</option>
        </select>

        <select
          className="px-4 py-2 rounded-full bg-white text-black"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest Listings</option>
        </select>

        <button
          type="submit"
          className="bg-[#703BF7] px-6 py-2 rounded-full hover:bg-[#5f2cc6] transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
