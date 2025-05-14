import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

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

const Register = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    setMessage("");
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
        // Direct API call for login
        response = await axios.post("http://localhost:8000/api/auth/login", formData);
      } else {
        // Direct API call for registration
       axios.post('http://localhost:8000/api/auth/register', formData, { withCredentials: true });
 
      }

      if (response.status === 200 || response.status === 201) {
        if (isLogin) {
          navigate("/dashboard");
        } else {
          setIsLogin(true); // Switch to login mode
          setMessage("Registration successful. Please log in.");
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 transition-colors duration-300 p-4 relative">
      <ThemeToggle />

      <div className="rounded-xl shadow-lg w-full max-w-md p-6 overflow-hidden border border-base-300 bg-base-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <h1 className="text-3xl font-semibold text-center text-base-content mb-6">
              {isLogin ? "Login" : "Sign Up"}
            </h1>

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                />
              </>
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered w-full"
            />

            <button onClick={handleSubmit} className="btn btn-primary w-full">
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <div className="text-center text-sm text-base-content mt-2 space-y-1">
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={toggleForm}
                  className="text-primary underline hover:text-primary-focus transition"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
              {isLogin && (
                <button
                  onClick={() => navigate("/forget-password")}
                  className="text-primary underline hover:text-primary-focus transition"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            {message && (
              <p className="text-center text-sm text-secondary mt-2">
                {message}
              </p>
            )}
            <p> hello worlds </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;
