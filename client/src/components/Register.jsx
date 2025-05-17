import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register as registerService } from '../services/authService';
import Navbar from '../components/Navbar';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Submitting registration form with data:', formData);
      const response = await registerService(formData);
      console.log('Registration response:', response);

      if (response.status === 'success') {
        // Update auth context with user data
        login(response.data.user, response.data.token);
        
        setSuccess(true);
        setMessage('Registration successful! Redirecting...');
        
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSuccess(false);
      setMessage(error.response?.data?.message || error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Navbar />
      <section
        className="relative flex flex-col items-center justify-center px-6 md:px-16 py-24 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#703BF7] to-[#121212] opacity-70"></div>
        <div className="relative w-full max-w-lg z-10 space-y-6 bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl p-10">
          <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-4 bg-[#252525] text-white placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-4 bg-[#252525] text-white placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 bg-[#252525] text-white placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 bg-[#252525] text-white placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <div className="text-sm text-gray-400">
              <p>Password must be at least 8 characters long and contain:</p>
              <ul className="list-disc list-inside mt-1">
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white font-semibold shadow-xl transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
          {message && (
            <p
              className={`text-center text-sm ${
                success ? 'text-green-400' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="underline text-purple-400 hover:text-purple-300 transition"
            >
              Log In
            </button>
          </div>
        </div>
      </section>
      <footer className="bg-[#1a1a1a] py-6 text-center text-gray-400">
        <p>© 2025 Tamalk. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Register;
