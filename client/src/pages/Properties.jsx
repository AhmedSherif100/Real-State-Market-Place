import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';
import { FiSearch } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/properties')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.data.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#121212] text-[#fff] min-h-screen">
        <Navbar />

        {/* Loading Skeleton */}
        <div className="px-6 md:px-16 py-20">
          <div className="animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="mb-16">
              <div className="h-12 bg-[#1a1a1a] rounded w-1/2 mb-6"></div>
              <div className="h-6 bg-[#1a1a1a] rounded w-3/4 mb-8"></div>
              <div className="flex">
                <div className="h-12 bg-[#1a1a1a] rounded-l-full w-full"></div>
                <div className="h-12 bg-[#703BF7] rounded-r-full w-32"></div>
              </div>
            </div>

            {/* Properties Grid Skeleton */}
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

  return (
    <div className="bg-[#121212] text-[#fff] min-h-screen">
      <Navbar />

      {/* Hero Section with Search */}
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
            Discover Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff]">
              Dream Home
            </span>
          </h1>

          <div className="flex items-center justify-center mt-6">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search by address, city, or ZIP code"
                className="w-full px-5 py-4 pl-14 pr-4 rounded-full text-black bg-white/90 backdrop-blur-sm outline-none border-none focus:ring-2 focus:ring-[#703BF7] transition-all duration-300 hover:shadow-lg hover:shadow-[#703BF Cornish]/30"
              />
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
            </div>
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

      {/* Featured Properties */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-6 text-center text-gray-400">
        <p>© 2025 Tamalk. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Properties;
