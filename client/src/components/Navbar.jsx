import { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth check
  const userRole = 'agent'; 

  return (
    <nav className="bg-[#141414] text-[#fff] px-6 py-4 flex items-center justify-between shadow-lg font-urbanist">
      <div className="w-full max-w-7xl flex items-center justify-between mx-auto">
       
        {/* Left Nav Links */}
        <ul className="flex gap-4 items-center text-sm font-medium">
          <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Buy</li>
          <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Rent</li>
          <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Sell</li>
          <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Find an Agent</li>
          <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Notifications</li>
        </ul>

        {/* Centered Logo with More Space */}
        <div className="text-3xl font-bold text-[#703BF7]">
          Tamalak
        </div>

        {/* Right Nav Links */}
        <ul className="flex gap-4 items-center text-sm font-medium">
          {(userRole === 'agent' || userRole === 'admin') && (
            <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Manage Properties</li>
          )}
          <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">About Us</li>
          {!isLoggedIn ? (
            <>
              <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Login</li>
              <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Sign Up</li>
              <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Help</li>
            </>
          ) : (
            <li className="hover:text-[#703BF7] cursor-pointer px-2 py-2">Profile</li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
