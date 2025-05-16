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

  useEffect(() => {
    fetch('http://localhost:8000/api/properties')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('API Response:', data);
        if (data?.data?.properties && Array.isArray(data.data.properties)) {
          const saleProperties = data.data.properties.filter(
            (property) => property.listingType === 'sale'
          );
          console.log('Sale Properties:', saleProperties);
          setProperties(saleProperties);
          setFilteredProperties(saleProperties);
          if (saleProperties.length === 0) {
            console.warn('No properties with listingType "sale" found.');
          }
        } else {
          console.warn('Invalid or empty properties in API response:', data);
          setProperties([]);
          setFilteredProperties([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProperties(properties);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = properties.filter((property) => {
      try {
        const mainFields = [
          property.title || '',
          property.description || '',
          property.propertyType || '',
          property.subType || '',
          property.address
            ? `${property.address.street || ''} ${
                property.address.city || ''
              } ${property.address.state || ''} ${
                property.address.country || ''
              }`
            : '',
          property.area?.sqft?.toString() || '',
          property.area?.sqm?.toString() || '',
          property.price?.toString() || '',
          property.buildDate?.toString() || '',
          property.status || '',
        ];

        const featureFields = property.features
          ? [
              property.features.bedrooms?.toString() || '',
              property.features.bathrooms?.toString() || '',
              property.features.garage?.toString() || '',
              property.features.pool?.toString() || '',
              property.features.yard?.toString() || '',
              property.features.pets?.toString() || '',
              property.features.furnished || '',
              property.features.airConditioning?.toString() || '',
              property.features.internet?.toString() || '',
              property.features.electricity?.toString() || '',
              property.features.water?.toString() || '',
              property.features.gas?.toString() || '',
              property.features.wifi?.toString() || '',
              property.features.security?.toString() || '',
            ]
          : [];

        return [...mainFields, ...featureFields].some((field) =>
          field.toLowerCase().includes(lowerSearch)
        );
      } catch (err) {
        console.error('Error filtering property:', property, err);
        return false;
      }
    });

    setFilteredProperties(filtered);
    console.log('Filtered Properties:', filtered);
  }, [searchTerm, properties]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="bg-[#121212] text-[#fff] min-h-screen">
        <Navbar />
        <div className="px-6 md:px-16 py-20">
          <div className="animate-pulse">
            <div className="mb-16">
              <div className="h-12 bg-[#1a1a1a] rounded w-1/2 mb-6"></div>
              <div className="h-6 bg-[#1a1a1a] rounded w-3/4 mb-8"></div>
              <div className="flex">
                <div className="h-12 bg-[#1a1a1a] rounded-l-full w-full"></div>
                <div className="h-12 bg-[#703BF7] rounded-r-full w-32"></div>
              </div>
            </div>
            <h2 className="h-10 bg-[#1a1a1a] rounded w-1/3 mx-auto mb-10"></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="h-48 bg-[#252525] rounded-lg mb-4"></div>
                  <div className="h-6 bg-[#252525] rounded w-3/4 mb-2"></div>
                  <div className="h-5 bg-[#703BF7] rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-[#252525] rounded-lg w-full"></div>
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-[#703BF7]/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-[#fff]/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
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
            No properties match your search. Try adjusting your search terms.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onViewDetails={setSelectedProperty}
              />
            ))}
          </div>
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
