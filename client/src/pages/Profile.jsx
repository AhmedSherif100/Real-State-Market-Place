import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data
    fetch('http://localhost:8000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setUser(data.data.user);
          setFormData({
            firstName: data.data.user.firstName || '',
            lastName: data.data.user.lastName || '',
            email: data.data.user.email || '',
          });
          
          // Fetch user's properties
          return fetch('http://localhost:8000/api/properties', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
      })
      .then(res => res?.json())
      .then(data => {
        if (data?.status === 'success') {
          // Filter properties to only show those owned by the current user
          const userProps = data.data.properties.filter(
            prop => prop.user === user?._id
          );
          setUserProperties(userProps);
        }
      })
      .catch(err => console.error('Error fetching data:', err))
      .finally(() => setLoading(false));
  }, [navigate, user?._id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/api/auth/updateMe', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUser(data.data.user);
        setEditMode(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleUpdateProperty = async (propertyId, updatedData) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8000/api/properties/${propertyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUserProperties(prevProps =>
          prevProps.map(prop =>
            prop._id === propertyId ? data.data.property : prop
          )
        );
        alert('Property updated successfully!');
      }
    } catch (err) {
      console.error('Error updating property:', err);
      alert('Failed to update property. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-[#121212] text-[#fff] min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-700 rounded mb-8"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-700 rounded"></div>
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff]">
          Profile Settings
        </h1>
        
        {/* User Information Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8 shadow-lg border border-[#252525] hover:shadow-2xl transition-shadow duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff]">
              Personal Information
            </h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-[#703BF7] text-white px-4 py-2 rounded-full hover:bg-[#5f2cc6] transition-all duration-300 transform hover:scale-105"
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-[#252525] border border-gray-700 focus:border-[#703BF7] focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-[#252525] border border-gray-700 focus:border-[#703BF7] focus:outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded bg-[#252525] border border-gray-700 focus:border-[#703BF7] focus:outline-none transition-colors duration-300"
                />
              </div>
              <button
                type="submit"
                className="bg-[#703BF7] text-white px-6 py-2 rounded-full hover:bg-[#5f2cc6] transition-all duration-300 transform hover:scale-105"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">First Name:</span>
                <p className="text-lg text-white">{user?.firstName}</p>
              </div>
              <div>
                <span className="text-gray-400">Last Name:</span>
                <p className="text-lg text-white">{user?.lastName}</p>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <p className="text-lg text-white">{user?.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* User's Properties Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg border border-[#252525] hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff]">
            My Listed Properties
          </h2>
          {userProperties.length === 0 ? (
            <p className="text-gray-400 text-center py-8">You haven't listed any properties yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userProperties.map(property => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onUpdate={handleUpdateProperty}
                  isEditable={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 