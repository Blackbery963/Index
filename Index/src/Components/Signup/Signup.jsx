

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Client, Account, ID } from 'appwrite';
import backgroundImage from './Image/pexels-eberhardgross-31979793.jpg'
import { databases, Permission, Role } from '../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value, formData) => {
    if (name === 'name') {
      return !value.trim() ? 'Name is required' : '';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
    }
    if (name === 'phone') {
      if (value && !/^\+?[\d\s-]{10,}$/.test(value)) return 'Invalid phone number';
      return '';
    }
    if (name === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Minimum 8 characters';
      return !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
        ? 'Password must contain at least one letter and one number'
        : '';
    }
    if (name === 'confirmPassword') {
      return value !== formData.password ? 'Passwords do not match' : '';
    }
    if (name === 'agreeToTerms') {
      return !value ? 'You must agree to the terms' : '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue, { ...formData, [name]: newValue }) }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // Validate all fields
  //   const newErrors = {
  //     name: validateField('name', formData.name, formData),
  //     email: validateField('email', formData.email, formData),
  //     phone: validateField('phone', formData.phone, formData),
  //     password: validateField('password', formData.password, formData),
  //     confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
  //     agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
  //   };

  //   setErrors(newErrors);
  //   if (Object.values(newErrors).some((error) => error)) {
  //     toast.error('Please fix the errors in the form');
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const user = await account.create(
  //       ID.unique(),
  //       formData.email,
  //       formData.password,
  //       formData.name);
  //     await account.createEmailPasswordSession(formData.email, formData.password);
       
      
  //     const userData = {
  //     userId: user.$id,
  //     username: formData.name,
  //     email: formData.email,
  //     createdAt: new Date().toISOString()
  //     };


  //     // Store minimal user data in localStorage
  //      localStorage.setItem('userProfile', JSON.stringify({
  //      $id: user.$id,
  //      username: formData.name,
  //      email: formData.email
  //      }));

  //     toast.success('Account created successfully!', { autoClose: 3000 });
  //     navigate('/Account');
  //     // After successful signup
  //     try {
  //     // Create a phone session for MFA (if using phone verification)
  //     // Or prepare for authenticator app enrollment
  //     const token = await account.createMFAChallenge(); // This is a simplified example
      
  //     // Store the token in state or temporary storage
  //     localStorage.setItem('mfaToken', token);

  //     // Redirect to MFA verification page
  //     navigate('/verify-mfa', { 
  //       state: { 
  //         email: formData.email,
  //         password: formData.password,
  //         mfaToken: token 
  //       } 
  //     });
  //     return;
  //   } catch (mfaErr) {
  //     console.error('MFA setup error:', mfaErr);
  //     toast.error('Failed to set up MFA');
  //     throw mfaErr; // This will be caught by the outer catch
  //   }

  //   // 1. Store in database (via Appwrite)
  //     try {
  //       await databases.createDocument(
  //         DATABASE_ID,
  //         USER_COLLECTION_ID,
  //         user.$id,// Using user ID as document ID
  //         {
  //         userId: user.$id,
  //         username: formData.name,
  //         email: formData.email,
  //         createdAt: new Date().toISOString()
  //         },
  //         // userData,
  //         [
  //           Permission.read(Role.user(user.$id)),
  //           Permission.update(Role.user(user.$id)),
  //           Permission.delete(Role.user(user.$id))
  //         ]
  // );

  //   } catch (dbErr) {
  //     console.error('Database error:', dbErr);
  //     toast.error('Account created but failed to store profile.');
  //   }

  //   } catch (err) {
  //     console.error('Appwrite error:', err);
  //     const errorMessage =
  //       err.code === 409 ? 'Email already exists' : err.message || 'Failed to create account';
  //     toast.error(errorMessage, { autoClose: 3000 });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Validate fields
  const newErrors = {
    name: validateField('name', formData.name, formData),
    email: validateField('email', formData.email, formData),
    phone: validateField('phone', formData.phone, formData),
    password: validateField('password', formData.password, formData),
    confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
    agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
  };

  setErrors(newErrors);
  if (Object.values(newErrors).some((error) => error)) {
    toast.error('Please fix the errors in the form');
    setIsLoading(false);
    return;
  }

  try {
    // 1. Create the user account
    const user = await account.create(
      ID.unique(),
      formData.email,
      formData.password,
      formData.name
    );

    try {
      // 2. Try to create session
      await account.createEmailPasswordSession(formData.email, formData.password);

      // 3. No MFA required, proceed to create document
      await databases.createDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        user.$id,
        {
          userId: user.$id,
          username: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      localStorage.setItem(
        'userProfile',
        JSON.stringify({
          $id: user.$id,
          username: formData.name,
          email: formData.email,
        })
      );

      toast.success('Account created successfully!');
      navigate('/Account');
    } catch (err) {
      // 4. Check if MFA is required
      if (
        err.code === 401 &&
        err.response &&
        err.response.headers['x-appwrite-mfa']
      ) {
        // MFA is required, create challenge
        const challenge = await account.createMfaChallenge();

        // Redirect to MFA verification page
        navigate('/Signup/Multi-Factor_Authentication', {
          state: {
            email: formData.email,
            password: formData.password,
            challengeId: challenge.challengeId,
          },
        });
        return;
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.error('Signup error:', err);
    const errorMessage =
      err.code === 409
        ? 'Email already exists'
        : err.message || 'Failed to create account';
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const spanVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-100 dark:bg-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage || 'https://via.placeholder.com/1920x1080'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-4xl lg:max-w-[80vw] flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        {/* Left Side - Greeting Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 h-[40vh] lg:h-[85vh] bg-white/50 dark:bg-gray-800/50 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative"
        >
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#1f7d53] mb-4 font-Eagle absolute top-3 left-4">
            Painters' Diary
          </h1>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 dark:text-white mb-4 flex flex-col font-['Quicksand']">
              <span>The Canvas</span>
              <span className="font-bold">Eagerly Awaits Your</span>
              <span>First Stroke</span>
            </h1>
            <motion.h6
              className="text-sm sm:text-lg md:text-xl xl:text-2xl italic text-gray-800 dark:text-gray-200 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 shadow-sm font-['Quicksand'] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg leading-relaxed"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={spanVariants}>Join our creative community to</motion.span>
              <motion.span variants={spanVariants}>share your artistic journey</motion.span>
              <motion.span variants={spanVariants}>with like-minded painters.</motion.span>
            </motion.h6>
          </div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 h-auto lg:h-[85vh] bg-gradient-to-b from-[#1f7d53]/95 to-[#145c3e]/95 backdrop-blur-lg flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas.png')]"></div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 font-['Playfair_Display']">
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
              <label htmlFor="name" className="text-lg lg:text-xl font-semibold font-['Playfair_Display'] text-white mb-2 block">
                Name
              </label>
              <div className="relative flex items-center">
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
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
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border ${errors.name ? 'border-red-500' : 'border-white/50'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md`}
                  required
                  disabled={isLoading}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-red-300 text-sm mt-1 font-['Quicksand']">{errors.name}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="email" className="text-lg lg:text-xl font-semibold font-['Playfair_Display'] text-white mb-2 block">
                Email Address
              </label>
              <div className="relative flex items-center">
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
                 <FaEnvelope className=" h-6 w-6 text-white drop-shadow-sm" />
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
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border ${errors.email ? 'border-red-500' : 'border-white/50'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md`}
                  required
                  disabled={isLoading}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-300 text-sm mt-1 font-['Quicksand']">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="phone" className="text-lg lg:text-xl font-semibold font-['Playfair_Display'] text-white mb-2 block">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
                <FaPhone className=" h-6 w-6 text-white drop-shadow-sm" />
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
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border ${errors.phone ? 'border-red-500' : 'border-white/50'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md`}
                  disabled={isLoading}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
              </div>
              {errors.phone && (
                <p id="phone-error" className="text-red-300 text-sm mt-1 font-['Quicksand']">{errors.phone}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="password" className="text-lg lg:text-xl font-semibold font-['Playfair_Display'] text-white mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
                  <FaLock className=" h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a Password"
                  className={`w-full pl-12 pr-10 py-3 rounded-lg bg-white/20 backdrop-blur-md border ${errors.password ? 'border-red-500' : 'border-white/50'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md`}
                  required
                  disabled={isLoading}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-300 text-sm mt-1 font-['Quicksand']">{errors.password}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="confirmPassword" className="text-lg lg:text-xl font-semibold font-['Playfair_Display'] text-white mb-2 block">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 z-10'>
                  <FaLock className=" h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full pl-12 pr-10 py-3 rounded-lg bg-white/20 backdrop-blur-md border ${errors.confirmPassword ? 'border-red-500' : 'border-white/50'} text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md`}
                  required
                  disabled={isLoading}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  aria-label={showPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-red-300 text-sm mt-1 font-['Quicksand']">{errors.confirmPassword}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded focus:ring-white text-[#1f7d53] bg-white/20 border-white/50"
                disabled={isLoading}
                aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm lg:text-base text-white font-['GreatVibes']">
                I agree to the{' '}
                <Link to="/Legal/Terms_Conditions" className="font-semibold hover:underline text-white/80">
                  terms of service
                </Link>{' '}
                and{' '}
                <Link to="/Legal/Privacy_Policy" className="font-semibold hover:underline text-white/80">
                  privacy policy
                </Link>
              </label>
            </motion.div>
            {errors.agreeToTerms && (
              <p id="terms-error" className="text-red-300 text-sm mt-1 font-['Quicksand']">{errors.agreeToTerms}</p>
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
              className={`w-full bg-gradient-to-r from-green-300 to-[#1f7d53] text-white py-3 lg:py-4 px-4 rounded-lg font-bold font-['Quicksand'] relative overflow-hidden transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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

            <motion.div variants={fieldVariants} className="text-center text-white mt-4 font-['Quicksand']">
              Already a member?{' '}
              <Link to="/login" className="font-bold hover:underline text-white/80">
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
}

export default Signup;
