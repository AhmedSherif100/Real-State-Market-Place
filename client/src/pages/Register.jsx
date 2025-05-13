import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const formVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1], // smooth cubic bezier
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
  });

  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '', age: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? 'login' : 'signup';
      const response = await axios.post(
        `http://localhost:4000/users/${endpoint}`,
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-center text-orange-300 mb-6">
              {isLogin ? 'Login' : 'Sign Up'}
            </h1>

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-orange-300 placeholder-orange-300"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-orange-300 placeholder-orange-300"
                />
              </>
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-orange-300 placeholder-orange-300"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-orange-300 placeholder-orange-300"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-orange-300 py-2 rounded hover:bg-orange-500 hover:text-black transition duration-200"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <p className="text-center text-sm text-orange-300 mt-2">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={toggleForm}
                className="text-orange-400 underline hover:text-orange-200 transition"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>

            {message && (
              <p className="text-center text-sm text-orange-400 mt-2">
                {message}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;
