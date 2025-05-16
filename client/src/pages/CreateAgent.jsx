import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const CreateAgent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: {
      first: '',
      last: ''
    },
    email: '',
    password: '',
    phoneNumber: '',
    contactEmail: '',
    role: 'agent',
    authType: 'local',
    
    // Agent specific fields
    licenseNumber: '',
    yearsOfExperience: 0,
    languagesSpoken: '',
    about: '',
    website: '',
    ratings: {
      averageRating: 0,
      totalReviews: 0
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'yearsOfExperience' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert languagesSpoken string to array
      const agentData = {
        ...formData,
        languagesSpoken: formData.languagesSpoken.split(',').map(lang => lang.trim()).filter(lang => lang)
      };

      console.log('Sending data:', agentData); // Debug log

      const response = await axios.post('http://localhost:8000/api/agents', agentData);
      
      if (response.data.success) {
        navigate('/agent');
      } else {
        setError(response.data.message || 'Failed to create agent');
      }
    } catch (err) {
      console.error('Error details:', err.response?.data); // Debug log
      
      if (err.response?.data?.error?.errors) {
        // Handle Mongoose validation errors
        const validationErrors = Object.values(err.response.data.error.errors)
          .map(error => error.message)
          .join(', ');
        setError(`Validation error: ${validationErrors}`);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 409) {
        setError('An agent with this email already exists');
      } else {
        setError('An error occurred while creating the agent. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121212] text-[#fff] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Agent Profile</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#1a1a1a] p-8 rounded-xl">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#703BF7]">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="name.first"
                  value={formData.name.first}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="name.last"
                  value={formData.name.last}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#703BF7]">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Languages Spoken (comma-separated)</label>
              <input
                type="text"
                name="languagesSpoken"
                value={formData.languagesSpoken}
                onChange={handleChange}
                placeholder="English, Spanish, French"
                className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 bg-[#252525] rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#703BF7] text-white py-3 rounded-lg hover:bg-[#5f2cc6] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Agent...' : 'Create Agent Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgent; 