import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import backgroundImage from './Image/pexels-eberhardgross-31979793.jpg';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { Client, Account, ID } from 'appwrite'; // Import Appwrite Client SDK



// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // e.g., 'https://cloud.appwrite.io/v1'
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agreeToTerms: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Real-time validation
    if (name === 'name' && !value) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
    } else if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: '' }));
    }

    if (name === 'email') {
      if (!value) {
        setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }

    if (name === 'phone' && value && !/^[\d\s+-]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }));
    } else if (name === 'phone') {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }

    if (name === 'password') {
      if (!value) {
        setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      } else if (value.length < 8) {
        setErrors((prev) => ({ ...prev, password: 'Minimum 8 characters' }));
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          password: 'Password must contain at least one letter and one number',
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }

    if (name === 'agreeToTerms' && !checked) {
      setErrors((prev) => ({ ...prev, agreeToTerms: 'You must agree to the terms' }));
    } else if (name === 'agreeToTerms') {
      setErrors((prev) => ({ ...prev, agreeToTerms: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      setErrors((prev) => ({ ...prev, agreeToTerms: 'You must agree to the terms' }));
      toast.error('Please agree to the terms of service');
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setErrors((prev) => ({
        ...prev,
        name: !formData.name ? 'Name is required' : '',
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
      }));
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.phone && !/^[\d\s+-]+$/.test(formData.phone)) {
      setErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }));
      toast.error('Please enter a valid phone number');
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must contain at least one letter and one number',
      }));
      toast.error('Password must contain at least one letter and one number');
      return;
    }

    setIsLoading(true);

    try {
      // Create a new user
      await account.create(
        ID.unique(), // Unique user ID
        formData.email,
        formData.password,
        formData.name
      );

      // Create a session for immediate login
      await account.createEmailPasswordSession(formData.email, formData.password);

      toast.success('Account created successfully!', { autoClose: 3000 });
      navigate('/Account'); // Redirect to Profile after successful signup
    } catch (err) {
      console.error('Appwrite error:', err);
      const errorMessage =
        err.code === 409
          ? 'Email already exists'
          : err.message || 'Failed to create account';
      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants for staggered form fields
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const spanVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-4xl lg:max-w-[80vw] flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Left Side - Greeting Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 h-[40vh] lg:h-[80vh] bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative"
        >
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#1f7d53] mb-4 font-Eagle absolute top-3 left-4">
            Painters' Diary
          </h1>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-4 flex flex-col font-Quicksand">
              <span>The Canvas</span>
              <span className="font-bold">Eagerly Awaits Your</span>
              <span>First Stroke</span>
            </h1>
            <motion.h6
              className="text-[14px] xs:text-[16px] sm:text-lg md:text-xl xl:text-3xl italic text-gray-800 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm font-Nano flex flex-col items-center justify-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 py-3 xs:py-4 sm:py-5 md:py-6 lg:py-7 rounded-lg leading-relaxed"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={spanVariants}>
                Join our creative community to
              </motion.span>
              <motion.span variants={spanVariants}>
                share your artistic journey
              </motion.span>
              <motion.span variants={spanVariants}>
                with like-minded painters.
              </motion.span>
            </motion.h6>
          </div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 h-auto lg:h-[80vh] bg-gradient-to-b from-[#1f7d53]/90 to-[#145c3e]/90 backdrop-blur-lg flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas.png')]"></div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 font-Playfair">
            Create Your Masterpiece
          </h1>

          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-sm lg:max-w-md space-y-5 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fieldVariants}>
              <label
                htmlFor="name"
                className="text-lg lg:text-xl font-semibold font-Playfair text-white mb-2 block"
              >
                Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <FaUser className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-gradient-to-r from-white/50 to-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md ${
                    errors.name ? 'border-red-500 border-2' : ''
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-red-300 text-sm mt-1 font-Quicksand">{errors.name}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label
                htmlFor="email"
                className="text-lg lg:text-xl font-semibold font-Playfair text-white mb-2 block"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <FaEnvelope className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-gradient-to-r from-white/50 to-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md ${
                    errors.email ? 'border-red-500 border-2' : ''
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm mt-1 font-Quicksand">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label
                htmlFor="phone"
                className="text-lg lg:text-xl font-semibold font-Playfair text-white mb-2 block"
              >
                Phone Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <FaPhone className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-gradient-to-r from-white/50 to-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md ${
                    errors.phone ? 'border-red-500 border-2' : ''
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <p className="text-red-300 text-sm mt-1 font-Quicksand">{errors.phone}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label
                htmlFor="password"
                className="text-lg lg:text-xl font-semibold font-Playfair text-white mb-2 block"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <FaLock className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a Password"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-gradient-to-r from-white/50 to-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md ${
                    errors.password ? 'border-red-500 border-2' : ''
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-1 font-Quicksand">{errors.password}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded focus:ring-white text-[#1f7d53]"
                disabled={isLoading}
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm lg:text-base text-white font-GreatVibes">
                I've read and agree with{' '}
                <Link to="/terms" className="font-semibold hover:underline">
                  terms of service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-semibold hover:underline">
                  privacy policy
                </Link>
              </label>
            </motion.div>
            {errors.agreeToTerms && (
              <p className="text-red-300 text-sm mt-1 font-Quicksand">{errors.agreeToTerms}</p>
            )}

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)',
                backgroundImage: 'linear-gradient(to right, #a7f3d0, #1f7d53)',
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-green-300 to-[#1f7d53] text-[#1f7d53] py-2 sm:py-3 lg:py-4 px-4 rounded-lg font-bold relative overflow-hidden transition-all mt-4 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center font-Quicksand">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#1f7d53]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'SIGN UP'
                )}
              </span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-white/50 transform origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.div variants={fieldVariants} className="text-center text-white mt-4">
              Already a member?{' '}
              <Link to="/login" className="font-bold hover:underline font-Quicksand">
                Log in
              </Link>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Signup;