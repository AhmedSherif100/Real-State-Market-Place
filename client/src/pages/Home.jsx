import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-orange-300 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold">Health Assistant</h1>
        <button onClick={toggleProfile}>
          <FaUserCircle className="text-3xl hover:text-orange-400 transition" />
        </button>
      </header>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute top-16 right-6 bg-gray-800 rounded-lg shadow-md p-4 w-48 z-10">
          <p className="font-semibold">User Profile</p>
          <hr className="my-2 border-gray-600" />
          <p>Name: TillBackend</p>
          <p>Email: tillbackend</p>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-8">
        <h2 className="text-4xl font-bold">Welcome to Your Health Dashboard</h2>
        <p className="text-lg text-orange-200 max-w-xl">
          Start a new diagnosis or open the chat to ask health-related questions anytime.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate('/crud')}
            className="px-6 py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition"
          >
            Go to Diagnosis
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="px-6 py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition"
          >
            Open Chat
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4 text-sm text-orange-200">
        &copy; {new Date().getFullYear()} Health Assistant. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
