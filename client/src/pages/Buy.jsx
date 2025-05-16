import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import PropertyDetail from './PropertyDetail';

function Buy() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:8000/api/properties')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.properties && Array.isArray(data.data.properties)) {
          const saleProperties = data.data.properties.filter(
            (property) => property.listingType === 'sale'
          );
          setProperties(saleProperties);
          setFilteredProperties(saleProperties);
        } else {
          setProperties([]);
          setFilteredProperties([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProperties(properties);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = properties.filter((property) =>
      [
        property.title || '',
        property.description || '',
        property.propertyType || '',
        property.address?.city || '',
        property.price?.toString() || '',
      ].some((field) => field.toLowerCase().includes(lowerSearch))
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="bg-[#121212] text-[#fff] min-h-screen">
        <Navbar />
        <div className="px-6 md:px-16 py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-[#1a1a1a] rounded w-1/2 mb-6 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="h-48 bg-[#252525] rounded-lg mb-4"></div>
                  <div className="h-6 bg-[#252525] rounded w-3/4 mb-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#121212] text-[#fff] min-h-screen">
        <Navbar />
        <div className="px-6 md:px-16 py-20 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="bg-[#121212] text-[#fff] min-h-screen">
      <Navbar />
      <section
        className="relative flex flex-col items-center justify-center px-6 md:px-16 py-24 bg-[#121212] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#703BF7] to-[#121212] opacity-70"></div>
        <div className="relative max-w-3xl space-y-8 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Own Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff]">
              Forever Home
            </span>
          </h1>
          <div className="flex items-center justify-center mt-6">
            <SearchBar onSearch={handleSearch} />
            <button className="ml-2 bg-gradient-to-r from-[#703BF7] to-[#5f2cc6] px-8 py-4 rounded-full font-semibold text-white hover:from-[#5f2cc6] hover:to-[#703BF7] transition-all duration-300 transform hover:scale-105">
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse Properties for Sale
        </h2>
        {properties.length === 0 ? (
          <p className="text-center text-gray-400">
            No properties for sale are currently available.
          </p>
        ) : filteredProperties.length === 0 ? (
          <p className="text-center text-gray-400">
            No properties match your search.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentProperties.map((property, index) => (
                <div
                  key={property._id}
                  className="animate-fadeInScale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard
                    property={property}
                    onViewDetails={setSelectedProperty}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-2xl text-white hover:text-[#703BF7] transition-colors duration-300 disabled:opacity-50"
              >
                ←
              </button>
              <div className="relative flex space-x-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                        currentPage === page
                          ? 'text-[#703BF7]'
                          : 'text-gray-400 hover:text-[#5f2cc6]'
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                      {currentPage === page && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#703BF7] transform scale-x-100 transition-transform duration-300 origin-left"></span>
                      )}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-2xl text-white hover:text-[#703BF7] transition-colors duration-300 disabled:opacity-50"
              >
                →
              </button>
            </div>
          </>
        )}
      </section>
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-8 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-[#252525] shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl font-bold"
              onClick={() => setSelectedProperty(null)}
            >
              ×
            </button>
            <PropertyDetail property={selectedProperty} />
          </div>
        </div>
      )}
      <footer className="bg-[#1a1a1a] py-6 text-center text-gray-400">
        <p>© 2025 Tamalk. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Buy;
