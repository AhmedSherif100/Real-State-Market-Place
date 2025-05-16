import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const formVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function Register() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const inputClass =
    'w-full p-4 bg-[#1a1a1a] text-white placeholder-gray-400 rounded-2xl shadow-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-600';
  const buttonClass =
    'w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white font-semibold shadow-xl transition';

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isLogin) {
        response = await axios.post(
          'http://localhost:8000/api/auth/login',
          formData
        );
      } else {
        response = await axios.post(
          'http://localhost:8000/api/auth/register',
          formData,
          { withCredentials: true }
        );
      }

      if (response.status === 200 || response.status === 201) {
        if (isLogin) {
          navigate('/dashboard'); //
        } else {
          setIsLogin(true);
          setMessage('Registration successful. Please log in.');
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-xl p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-white">
              {isLogin ? 'Login' : 'Sign Up'}
            </h1>

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={inputClass}
                />
              </>
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={inputClass}
            />

            <button onClick={handleSubmit} className={buttonClass}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <div className="text-center text-sm text-gray-400">
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}{' '}
                <button
                  onClick={toggleForm}
                  className="underline text-purple-400 hover:text-purple-300 transition"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
              {isLogin && (
                <button
                  onClick={() => navigate('/forget-password')}
                  className="mt-2 underline text-purple-400 hover:text-purple-300 transition"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            {message && (
              <p className="text-center text-sm text-red-500">{message}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
