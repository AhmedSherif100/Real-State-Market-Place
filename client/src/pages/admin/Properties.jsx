import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const properties = [
  {
    id: 1,
    title: 'Modern Apartment in Downtown',
    type: 'Apartment',
    status: 'For Sale',
    price: '$450,000',
    location: 'New York, NY',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,200 sqft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
  },
  {
    id: 2,
    title: 'Luxury Villa with Pool',
    type: 'Villa',
    status: 'For Rent',
    price: '$3,500/mo',
    location: 'Los Angeles, CA',
    bedrooms: 4,
    bathrooms: 3,
    area: '3,500 sqft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  },
  {
    id: 3,
    title: 'Cozy Studio Apartment',
    type: 'Studio',
    status: 'For Sale',
    price: '$250,000',
    location: 'Chicago, IL',
    bedrooms: 1,
    bathrooms: 1,
    area: '600 sqft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
  },
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Title and Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Properties Management</h1>
        <button className="btn btn-primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Property
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search properties..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
        </div>
        <select className="select select-bordered w-full md:w-48">
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="studio">Studio</option>
        </select>
        <select className="select select-bordered w-full md:w-48">
          <option value="">All Status</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title">{property.title}</h2>
                <span
                  className={`badge ${
                    property.status === 'For Sale'
                      ? 'badge-primary'
                      : 'badge-secondary'
                  }`}
                >
                  {property.status}
                </span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="flex items-center text-sm">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {property.location}
                </div>
                <div className="flex items-center text-sm">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  {property.price}
                </div>
                <div className="flex items-center text-sm">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  {property.bedrooms} beds • {property.bathrooms} baths •{' '}
                  {property.area}
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-ghost btn-sm">
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
                <button className="btn btn-ghost btn-sm text-error">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-base-content/70">
          Showing 1 to 3 of 3 properties
        </div>
        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm">»</button>
        </div>
      </div>
    </div>
  );
};

export default Properties; 