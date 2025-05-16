import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const steps = ['Basic Info', 'Address & Area', 'Media & Price', 'Features'];

export default function Sell() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    listingType: 'sale',
    propertyType: 'residential',
    subType: '',
    street: '',
    city: '',
    state: '',
    country: '',
    sqft: '',
    sqm: '',
    media: [], // Will store file paths from server
    buildDate: '',
    price: '',
    status: 'active',
    bedrooms: '',
    bathrooms: '',
    garage: '',
    pool: false,
    yard: false,
    pets: false,
    furnished: 'none',
    airConditioning: false,
    internet: false,
    electricity: false,
    water: false,
    gas: false,
    wifi: false,
    security: false,
  });

  const inputClass =
    'w-full p-4 bg-[#1a1a1a] text-white placeholder-gray-400 rounded-2xl shadow-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-600';
  const selectClass = inputClass;
  const fileButtonClass =
    'w-full p-4 bg-gradient-to-r from-purple-700 to-purple-400 text-white rounded-full border-2 border-purple-500 shadow-xl cursor-pointer';
  const checkboxClass =
    'h-6 w-6 border-2 border-gray-600 rounded-lg checked:bg-gradient-to-r checked:from-purple-600 checked:to-purple-400';

  const handleChange = async (e) => {
    const { name, type, files, value, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const formDataToSend = new FormData();
      Array.from(files).forEach((file) => {
        formDataToSend.append('media', file);
      });

      try {
        const res = await axios.post(
          'http://127.0.0.1:8000/api/uploads',
          formDataToSend,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        const filePaths = res.data.files.map((file) => file.path); // Expect file.path
        setFormData((prev) => ({
          ...prev,
          media: [...prev.media, ...filePaths],
        }));
        alert('Images uploaded successfully!');
      } catch (err) {
        console.error('Upload error:', err.response?.data || err.message);
        alert('Failed to upload images. Please try again.');
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const next = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const userId = 'Null';

    const payload = {
      title: formData.title,
      description: formData.description,
      listingType: formData.listingType,
      propertyType: formData.propertyType,
      subType: formData.subType,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      area: {
        sqft: Number(formData.sqft) || 0,
        sqm: Number(formData.sqm) || 0,
      },
      media: formData.media,
      buildDate: formData.buildDate,
      price: Number(formData.price) || 0,
      status: formData.status,
      user: userId,
      features: {
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        garage: Number(formData.garage) || 0,
        pool: formData.pool,
        yard: formData.yard,
        pets: formData.pets,
        furnished: formData.furnished,
        airConditioning: formData.airConditioning,
        internet: formData.internet,
        electricity: formData.electricity,
        water: formData.water,
        gas: formData.gas,
        wifi: formData.wifi,
        security: formData.security,
      },
    };

    try {
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));
      //upload images//
      alert('Property successfully listed!');
      navigate('/buy');
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert(
        `Error ${err.response?.status || 'Unknown'}: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <input
              className={inputClass}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Listing Title"
            />
            <textarea
              className={`${inputClass} h-32`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed Description"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <select
                className={selectClass}
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
              >
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
              <select
                className={selectClass}
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
              <input
                className={inputClass}
                name="subType"
                value={formData.subType}
                onChange={handleChange}
                placeholder="Sub-Type (e.g. Apartment)"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <input
              className={inputClass}
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
            />
            <div className="grid md:grid-cols-3 gap-4">
              <input
                className={inputClass}
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
              <input
                className={inputClass}
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
              />
              <input
                className={inputClass}
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className={inputClass}
                name="sqft"
                type="number"
                value={formData.sqft}
                onChange={handleChange}
                placeholder="Area (sqft)"
              />
              <input
                className={inputClass}
                name="sqm"
                type="number"
                value={formData.sqm}
                onChange={handleChange}
                placeholder="Area (sqm)"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="relative">
              <button type="button" className={fileButtonClass}>
                Choose Media Files
              </button>
              <input
                className="absolute inset-0 opacity-0 cursor-pointer"
                name="media"
                type="file"
                multiple
                accept="image/jpeg,image/png"
                onChange={handleChange}
              />
              {formData.media.length > 0 && (
                <div className="mt-4">
                  <p>Uploaded files:</p>
                  <ul className="list-disc pl-5">
                    {formData.media.map((path, idx) => (
                      <li key={idx}>{path}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <input
              className={inputClass}
              name="buildDate"
              type="date"
              value={formData.buildDate}
              onChange={handleChange}
            />
            <input
              className={inputClass}
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Listing Price"
            />
            <select
              className={selectClass}
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {['bedrooms', 'bathrooms', 'garage'].map((key) => (
                <input
                  key={key}
                  className={inputClass}
                  name={key}
                  type="number"
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {['pool', 'yard', 'pets'].map((key) => (
                <label
                  key={key}
                  className="flex items-center p-4 bg-[#1a1a1a] rounded-2xl shadow-md cursor-pointer"
                >
                  <input
                    className={checkboxClass}
                    name={key}
                    type="checkbox"
                    checked={formData[key]}
                    onChange={handleChange}
                  />
                  <span className="ml-2 capitalize">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
              ))}
              <select
                className={selectClass}
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
              >
                <option value="fully">Fully Furnished</option>
                <option value="partly">Partly Furnished</option>
                <option value="none">Unfurnished</option>
              </select>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                'airConditioning',
                'internet',
                'electricity',
                'water',
                'gas',
                'wifi',
                'security',
              ].map((key) => (
                <label
                  key={key}
                  className="flex items-center p-4 bg-[#1a1a1a] rounded-2xl shadow-md cursor-pointer"
                >
                  <input
                    className={checkboxClass}
                    name={key}
                    type="checkbox"
                    checked={formData[key]}
                    onChange={handleChange}
                  />
                  <span className="ml-2">
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .charAt(0)
                      .toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#121212] text-white w-full min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-white leading-[2]">
          List Your Property
        </h2>
        <div className="mb-8">
          <div className="flex items-center gap-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 relative">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx <= currentStep
                      ? 'bg-gradient-to-r from-purple-600 to-purple-300'
                      : 'bg-gray-700'
                  }`}
                />
                <span
                  className={`absolute -top-6 text-xs ${
                    idx <= currentStep ? 'text-purple-400' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
        {renderStep()}
        <div className="flex justify-between mt-10">
          <button
            onClick={back}
            disabled={currentStep === 0}
            className="px-10 py-3 rounded-full bg-gray-700 text-gray-400 disabled:opacity-50 hover:bg-gray-600 transition"
          >
            Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={next}
              className="px-10 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-10 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
