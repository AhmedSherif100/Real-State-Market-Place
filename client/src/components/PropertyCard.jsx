import React from 'react';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image';

const PropertyCard = ({ property }) => {
  const {
    title,
    price,
    listingType,
    propertyType,
    address,
    area,
    features,
    media,
  } = property;

  console.log(`Property "${title}" Media:`, media);

  const backendBaseUrl = 'http://localhost:8000';
  const imagePath = media && Array.isArray(media) && media[0] ? media[0] : '';
  const image = imagePath
    ? `${backendBaseUrl}/api/uploads/${imagePath}`
    : placeholderImage;

  console.log(`Property "${title}" Image URL:`, image);

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#1a1a1a] hover:shadow-2xl transition-shadow duration-300 border border-[#252525]">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
        onError={(e) => {
          console.error(`Failed to load image: ${image}`);
          e.target.src = placeholderImage;
        }}
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-500" />
          {address.city}, {address.state}, {address.country}
        </p>
        <p className="text-lg font-bold text-[#703BF7]">
          ${price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 capitalize">
          {listingType} | {propertyType}
        </p>
        <div className="flex justify-between text-sm text-gray-300 mt-3">
          <div className="flex items-center gap-1">
            <FaBed /> {features.bedrooms} Beds
          </div>
          <div className="flex items-center gap-1">
            <FaBath /> {features.bathrooms} Baths
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined /> {area.sqft} sqft
          </div>
        </div>
        <button className="mt-4 w-full bg-[#703BF7] hover:bg-[#5f2cc6] text-white py-2 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
