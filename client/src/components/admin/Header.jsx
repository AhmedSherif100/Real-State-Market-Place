import { useState } from 'react';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-base-100 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center">
          <button
            className="btn btn-ghost btn-sm lg:hidden"
            onClick={onMenuClick}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          {/* Search */}
          <div className="hidden md:flex items-center ml-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-64 pl-10"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <BellIcon className="h-6 w-6" />
                <span className="badge badge-sm badge-primary indicator-item">3</span>
              </div>
            </label>
            <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80">
              <div className="p-2">
                <h3 className="font-semibold">Notifications</h3>
                <div className="divider my-2"></div>
                <div className="space-y-2">
                  <div className="flex items-center p-2 hover:bg-base-200 rounded-lg">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                        <span>JD</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">John Doe added a new property</p>
                      <p className="text-xs text-base-content/70">2 minutes ago</p>
                    </div>
                  </div>
                  {/* Add more notifications here */}
                </div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://ui-avatars.com/api/?name=Admin+User" alt="Admin" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 