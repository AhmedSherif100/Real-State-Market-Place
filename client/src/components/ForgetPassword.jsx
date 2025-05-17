import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // First verify if the email exists using the login endpoint
      const loginResponse = await axios.post('http://localhost:8000/api/auth/login', {
        email: email.trim(),
        password: 'dummy' // We don't care about the password, we just want to check if email exists
      });

      // If we get here, the email exists (login endpoint would have thrown 401 if email didn't exist)
      // Now proceed with password reset
      const resetResponse = await axios.post('http://localhost:8000/api/auth/forget-password', { email });

      if (resetResponse.data.status === 'success') {
        setMessage('Password reset link has been sent to your email.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        
        try {
          const resetResponse = await axios.post('http://localhost:8000/api/auth/forget-password', { email });
          if (resetResponse.data.status === 'success') {
            setMessage('Password reset link has been sent to your email.');
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          }
        } catch (resetError) {
          setMessage(resetError.response?.data?.message || 'Failed to send reset link. Please try again.');
        }
      } else if (error.response?.status === 404) {
        setMessage('Email not found. Please check your email address.');
      } else {
        setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg w-full max-w-md border border-[#2b2b2b]">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Forget Password</h1>

        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-2 bg-[#2a2a2a] border border-[#444] rounded text-white placeholder-gray-400 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <p className="text-center text-sm text-purple-300 mt-2">{message}</p>}

        <div className="text-center text-sm text-gray-400 mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-purple-400 underline hover:text-purple-300 transition"
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
