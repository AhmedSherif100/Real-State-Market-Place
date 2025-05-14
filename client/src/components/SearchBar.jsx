import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ searchParams, setSearchParams }) {
  const [localSearchQuery, setLocalSearchQuery] = useState(
    searchParams.search || ''
  );
  const [showModal, setShowModal] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    minPrice: searchParams.minPrice || '',
    maxPrice: searchParams.maxPrice || '',
    bedrooms: searchParams.bedrooms || '',
    listingType: searchParams.listingType || '',
    propertyType: searchParams.propertyType || '',
  });

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    setSearchParams((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const handleSearch = () => {
    setSearchParams((prev) => ({ ...prev, search: localSearchQuery }));
  };

  const handleApplyFilters = () => {
    setSearchParams((prev) => ({ ...prev, ...tempFilters }));
    setShowModal(false);
  };

  const handleResetFilters = () => {
    setTempFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      listingType: '',
      propertyType: '',
    });
    setSearchParams((prev) => ({
      ...prev,
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      listingType: '',
      propertyType: '',
    }));
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by address, city, or ZIP code"
          className="w-96 px-5 py-3 pl-10 rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-[#703BF7] transition-all duration-300 hover:shadow-lg hover:shadow-[#703BF7]/30"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
      </div>
      <select
        className="px-4 py-3 rounded-full bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#703BF7]"
        value={`${searchParams.sortBy || 'price'}-${
          searchParams.sortOrder || 'asc'
        }`}
        onChange={handleSortChange}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="bedrooms-asc">Bedrooms: Low to High</option>
        <option value="bedrooms-desc">Bedrooms: High to Low</option>
      </select>
      <button
        className="px-4 py-3 rounded-full bg-[#703BF7] text-white hover:bg-[#5f2cc6] transition-all duration-300"
        onClick={() => setShowModal(true)}
      >
        Filters
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-lg w-96 text-white">
            <h2 className="text-2xl mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block mb-2">Min Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-[#252525] rounded outline-none focus:ring-2 focus:ring-[#703BF7]"
                value={tempFilters.minPrice}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Max Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-[#252525] rounded outline-none focus:ring-2 focus:ring-[#703BF7]"
                value={tempFilters.maxPrice}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Bedrooms</label>
              <select
                className="w-full px-3 py-2 bg-[#252525] rounded outline-none focus:ring-2 focus:ring-[#703BF7]"
                value={tempFilters.bedrooms}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    bedrooms: e.target.value,
                  }))
                }
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Listing Type</label>
              <select
                className="w-full px-3 py-2 bg-[#252525] rounded outline-none focus:ring-2 focus:ring-[#703BF7]"
                value={tempFilters.listingType}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    listingType: e.target.value,
                  }))
                }
              >
                <option value="">Any</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Property Type</label>
              <select
                className="w-full px-3 py-2 bg-[#252525] rounded outline-none focus:ring-2 focus:ring-[#703BF7]"
                value={tempFilters.propertyType}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    propertyType: e.target.value,
                  }))
                }
              >
                <option value="">Any</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-all"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-all"
                onClick={handleResetFilters}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 bg-[#703BF7] rounded hover:bg-[#5f2cc6] transition-all"
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
