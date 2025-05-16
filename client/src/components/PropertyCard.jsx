import React from 'react';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const {
    _id,
    title,
    price,
    listingType,
    propertyType,
    address,
    area,
    features,
    media,
  } = property;

  const image = `../uploads/${media[0]}`;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#1a1a1a] hover:shadow-2xl transition-shadow duration-300 border border-[#252525]">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
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
        <Link
          to={`/property/${_id}`}
          className="mt-4 block w-full bg-[#703BF7] hover:bg-[#5f2cc6] text-white py-2 text-center rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
