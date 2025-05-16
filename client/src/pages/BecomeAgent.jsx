import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const formVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function BecomeAgent() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 for credentials, 2 for agent info
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [agentInfo, setAgentInfo] = useState({
    phoneNumber: '',
    licenseNumber: '',
    experience: '',
    bio: '',
    languagesSpoken: '',
    totalSales: ''
  });
  const [message, setMessage] = useState('');

  const inputClass =
    'w-full p-4 bg-[#1a1a1a] text-white placeholder-gray-400 rounded-2xl shadow-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-600';
  const buttonClass =
    'w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white font-semibold shadow-xl transition';

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleAgentInfoChange = (e) => {
    const { name, value } = e.target;
    setAgentInfo(prev => ({ ...prev, [name]: value }));
  };

  const verifyCredentials = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        credentials,
        { withCredentials: true }
      );

      if (response.status === 201) {
        // Check user role from the login response
        const userRole = response.data.data.user?.role;
        
        if (userRole === 'agent') {
          setMessage('You are already an agent!');
          setTimeout(() => {
            navigate('/agents');
          }, 2000);
        } else {
          setStep(2);
          setMessage('');
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/become-agent',
        {
          ...credentials,
          ...agentInfo
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMessage('Successfully became an agent!');
        setTimeout(() => {
          navigate('/agents');
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-xl p-8">
        <motion.div
          variants={formVariants}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-white">
            Become an Agent
          </h1>
          
          {step === 1 ? (
            <>
              <p className="text-center text-gray-400 text-sm">
                Please verify your account credentials first
              </p>

              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleCredentialChange}
                placeholder="Email"
                className={inputClass}
                required
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleCredentialChange}
                placeholder="Password"
                className={inputClass}
                required
              />

              <button onClick={verifyCredentials} className={buttonClass}>
                Verify Credentials
              </button>
            </>
          ) : (
            <>
              <p className="text-center text-gray-400 text-sm">
                Fill out the form below to become an agent
              </p>

              <input
                type="tel"
                name="phoneNumber"
                value={agentInfo.phoneNumber}
                onChange={handleAgentInfoChange}
                placeholder="Phone Number"
                className={inputClass}
                required
              />
              <input
                type="text"
                name="licenseNumber"
                value={agentInfo.licenseNumber}
                onChange={handleAgentInfoChange}
                placeholder="Real Estate License Number"
                className={inputClass}
                required
              />
              <select
                name="experience"
                value={agentInfo.experience}
                onChange={handleAgentInfoChange}
                className={inputClass}
                required
              >
                <option value="">Select Years of Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
              <input
                type="text"
                name="languagesSpoken"
                value={agentInfo.languagesSpoken}
                onChange={handleAgentInfoChange}
                placeholder="Languages Spoken (e.g., English, Spanish, French)"
                className={inputClass}
                required
              />
              <input
                type="number"
                name="totalSales"
                value={agentInfo.totalSales}
                onChange={handleAgentInfoChange}
                placeholder="Total Number of Properties Sold"
                className={inputClass}
                required
                min="0"
              />
              <textarea
                name="bio"
                value={agentInfo.bio}
                onChange={handleAgentInfoChange}
                placeholder="Tell us about yourself and your experience in real estate"
                className={`${inputClass} h-32 resize-none`}
                required
              />

              <button onClick={handleSubmit} className={buttonClass}>
                Become an Agent
              </button>
            </>
          )}

          <div className="text-center text-sm text-gray-400">
            <button
              onClick={() => navigate('/agent')}
              className="underline text-purple-400 hover:text-purple-300 transition"
            >
              Back to Agents
            </button>
          </div>

          {message && (
            <p className={`text-center text-sm ${message.includes('Successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
} 

