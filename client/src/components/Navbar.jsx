import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] text-[#fff] px-6 py-5 shadow-[0_4px_12px_rgba(112,59,247,0.2)] font-urbanist sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
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
          className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff] transform hover:scale-105 transition-transform duration-300 cursor-pointer absolute left-1/2 -translate-x-1/2"
        >
          Tamalak
        </div>

        {/* Right Nav Links */}
        <ul className="flex gap-6 items-center text-sm font-semibold">
          {!isAuthenticated ? (
            <>
              <li
                onClick={() => navigate('/bagent')}
                className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group"
              >
                Become an Agent
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li
                onClick={() => navigate('/notifications')}
                className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group flex items-center gap-2"
              >
                <FaBell className="text-lg" />
                Notifications
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
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
            </>
          ) : (
            <>
              <li
                onClick={() => navigate('/notifications')}
                className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group flex items-center gap-2"
              >
                <FaBell className="text-lg" />
                Notifications
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li
                onClick={() => navigate('/profile')}
                className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group flex items-center gap-2"
              >
                <FaUser className="text-lg" />
                {user?.firstName || 'Profile'}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li
                onClick={handleLogout}
                className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group flex items-center gap-2"
              >
                <FaSignOutAlt className="text-lg" />
                Logout
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;