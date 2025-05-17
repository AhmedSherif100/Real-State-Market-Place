import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Navbar from './Navbar';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [hover, setHover] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchAgents();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/agents');
      const data = await response.json();
      if (data.status === 'success') {
        setAgents(data.data.agents);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      setError('Failed to load agents. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedAgent || !rating || !reviewText || !reviewerName) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          agent: selectedAgent,
          reviewerName,
          rating,
          reviewText,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSuccess('Review submitted successfully!');
        setRating(0);
        setReviewText('');
        setReviewerName('');
        setSelectedAgent('');
        // Redirect to reviews page after 2 seconds
        setTimeout(() => {
          navigate('/reviews');
        }, 2000);
      } else {
        setError(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again later.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121212] text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <p className="text-xl mb-4">Please log in to write a review</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-[#703BF7] text-white px-6 py-2 rounded-lg hover:bg-[#5f2cc6] transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff]">
            Write a Review
          </span>
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Select Agent</label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#703BF7]"
              required
            >
              <option value="">Select an agent</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.firstName} {agent.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#703BF7]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Rating</label>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="text-2xl cursor-pointer"
                    color={ratingValue <= (hover || rating) ? '#FFD700' : '#4B5563'}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Your Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#703BF7] min-h-[150px]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#703BF7] to-[#5f2cc6] text-white py-3 rounded-lg hover:from-[#5f2cc6] hover:to-[#703BF7] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm; 