import { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth check
  const userRole = 'agent';

  return (
    <nav className="bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] text-[#fff] px-6 py-5 flex items-center justify-between shadow-[0_4px_12px_rgba(112,59,247,0.2)] font-urbanist sticky top-0 z-50">
      <div className="w-full max-w-7xl flex items-center justify-between mx-auto">
        {/* Left Nav Links */}
        <ul className="flex gap-6 items-center text-sm font-semibold">
          <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
            Buy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
            Rent
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
            Sell
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
            Find an Agent
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
            Notifications
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        {/* Centered Logo with More Space */}
        <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#703BF7] to-[#fff] transform hover:scale-105 transition-transform duration-300">
          Tamalak
        </div>

        {/* Right Nav Links */}
        <ul className="flex gap-6 items-center text-sm font-semibold">
          {(userRole === 'agent' || userRole === 'admin') && (
            <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
              Manage Properties
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
            </li>
          )}
          <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative px-3 py-2 transition-all duration-300 bg-[#703BF7] text-white rounded-full px-4 hover:bg-[#5f2cc6] cursor-pointer group">
                Sign Up
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fff] transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
                Help
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
              </li>
            </>
          ) : (
            <li className="relative px-3 py-2 transition-all duration-300 hover:text-[#703BF7] cursor-pointer group">
              Profile
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#703BF7] transition-all duration-300 group-hover:w-full"></span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
