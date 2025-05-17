import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if there's an error, we should still redirect to login
      navigate('/login');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] text-[#fff] px-6 py-5 flex items-center justify-between shadow-[0_4px_12px_rgba(112,59,247,0.2)] font-urbanist sticky top-0 z-50">
      <div className="w-full max-w-7xl flex items-center justify-between mx-auto">
        {/* Left Nav Links */}
        <ul className="flex gap-6 items-center text-sm font-semibold">
          <li
            onClick={() => navigate('/buy')}
            className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
          >
            Buy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li
            onClick={() => navigate('/rent')}
            className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
          >
            Rent
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li
            onClick={() => navigate('/sell')}
            className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
          >
            Sell
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li
            onClick={() => navigate('/agent')}
            className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
          >
            Find an Agent
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        {/* Centered Logo */}
        <div 
          onClick={() => navigate('/')}
          className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff] transform hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          Tamalak
        </div>

        {/* Right Nav Links */}
        <ul className="flex gap-6 items-center text-sm font-semibold">
          {user && (user.role === 'agent' || user.role === 'admin') && (
            <li
              onClick={() => navigate('/manage-properties')}
              className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
            >
              Manage Properties
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
            </li>
          )}
          <li
            onClick={() => navigate('/about')}
            className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          {!user ? (
            <>
              <li
                onClick={() => navigate('/login')}
                className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
              >
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li
                onClick={() => navigate('/register')}
                className="relative px-3 py-2 transition-all duration-300 bg-[#703BF7] text-white rounded-full px-4 hover:bg-[#5f2cc6] cursor-pointer group"
              >
                Sign Up
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fff] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li
                onClick={() => navigate('/bagent')}
                className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
              >
                Become an Agent
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
            </>
          ) : (
            <li className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 px-3 py-2 hover:text-[#703BF7] transition-all duration-300"
              >
                <span>{user?.firstName || 'User'}</span>
                <div className="w-8 h-8 rounded-full bg-[#703BF7] flex items-center justify-center">
                  {user?.firstName || 'U'}
                </div>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => navigate('/profile')}
                    className="block w-full text-left px-4 py-2 hover:bg-[#2a2a2a] transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate('/settings')}
                    className="block w-full text-left px-4 py-2 hover:bg-[#2a2a2a] transition-colors duration-200"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[#2a2a2a] transition-colors duration-200 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
