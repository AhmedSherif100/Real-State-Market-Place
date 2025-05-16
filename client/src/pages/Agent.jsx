import React, { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiStar, FiCalendar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    minRating: '',
    minExperience: '',
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('search', searchTerm);
      if (location) queryParams.append('city', location);
      if (filters.minRating) queryParams.append('minRating', filters.minRating);
      if (filters.minExperience) queryParams.append('minExperience', filters.minExperience);

      const response = await axios.get(`http://localhost:8000/api/agents?${queryParams.toString()}`);
      const agentsData = response.data.data.agents;
      setAgents(agentsData);
      setFilteredAgents(agentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching agents:', error);
      setLoading(false);
    }
  };

  // Client-side filtering
  useEffect(() => {
    if (searchTerm.trim() === '' && location.trim() === '' && !filters.minRating && !filters.minExperience) {
      setFilteredAgents(agents);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const lowerLocation = location.toLowerCase();

    const filtered = agents.filter((agent) => {
      try {
        const searchFields = [
          `${agent.firstName} ${agent.lastName}`,
          agent.role || '',
          agent.bio || '',
          agent.languagesSpoken?.join(' ') || '',
        ];

        const matchesSearch = searchTerm === '' || searchFields.some(field => 
          field.toLowerCase().includes(lowerSearch)
        );

        const matchesLocation = location === '' || 
          (agent.location && agent.location.toLowerCase().includes(lowerLocation));

        const matchesRating = !filters.minRating || 
          (agent.rating && agent.rating >= parseInt(filters.minRating));

        const matchesExperience = !filters.minExperience || 
          (agent.yearsOfExperience && agent.yearsOfExperience >= parseInt(filters.minExperience));

        return matchesSearch && matchesLocation && matchesRating && matchesExperience;
      } catch (err) {
        console.error('Error filtering agent:', agent, err);
        return false;
      }
    });

    setFilteredAgents(filtered);
  }, [searchTerm, location, filters, agents]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchAgents();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="bg-[#121212] min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#703BF7]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-[#fff] min-h-screen">
      <Navbar />
      
      {/* Hero Section with Search */}
      <section className="relative py-16 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find a <span className="text-[#703BF7]">Real Estate Agent</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Connect with top-rated agents in your area
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter city, neighborhood, or ZIP"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#252525] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                  />
                </div>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by agent name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#252525] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FiStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="minRating"
                    value={filters.minRating}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#252525] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                  >
                    <option value="">Minimum Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="minExperience"
                    value={filters.minExperience}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#252525] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] outline-none"
                  >
                    <option value="">Minimum Experience</option>
                    <option value="5">5+ Years</option>
                    <option value="3">3+ Years</option>
                    <option value="1">1+ Year</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  type="submit"
                  className="w-full bg-[#703BF7] text-white py-3 rounded-lg hover:bg-[#5f2cc6] transition-colors font-semibold"
                >
                  Find Agents
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Agents List */}
      <section className="py-12 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgents.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No agents found matching your criteria. Try adjusting your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <div key={agent._id} className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={agent.profilePicture || 'https://via.placeholder.com/100'}
                        alt={`${agent.firstName} ${agent.lastName}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#703BF7]"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{agent.firstName} {agent.lastName}</h3>
                        <p className="text-[#703BF7] font-medium">{agent.role}</p>
                        <div className="flex items-center mt-2">
                          <div className="text-yellow-400 flex">
                            {'★'.repeat(Math.floor(agent.rating || 0))}
                          </div>
                          <span className="ml-2 text-gray-400">({agent.reviewCount || 0} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-400 line-clamp-2">{agent.bio}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <span className="block">Experience</span>
                        <span className="font-semibold text-white">{agent.yearsOfExperience || 0} years</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <span className="block">Languages</span>
                        <span className="font-semibold text-white">{agent.languagesSpoken?.join(', ') || 'English'}</span>
                      </div>
                      <button className="bg-[#703BF7] px-6 py-2 rounded-lg hover:bg-[#5f2cc6] transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Agent; 