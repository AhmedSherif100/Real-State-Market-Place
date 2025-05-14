import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from previous page

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/reset-password', {
        email,
        newPassword,
      });

      if (response.data.success) {
        setMessage('Password has been successfully reset!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage('Failed to reset password. Try again.');
      }
    } catch (error) {
      console.error('Reset error:', error);
      setMessage('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p>No email provided. Please go back to the{' '}
            <a href="/forget-password" className="underline text-purple-400 hover:text-purple-300">
              Forget Password
            </a>{' '}
            page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg w-full max-w-md border border-[#2b2b2b]">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Reset Password</h1>

        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handlePasswordChange}
            className="w-full p-2 bg-[#2a2a2a] border border-[#444] rounded text-white placeholder-gray-400 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
