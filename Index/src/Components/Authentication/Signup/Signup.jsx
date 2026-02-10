import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, Paintbrush, ArrowRight, Sparkles } from 'lucide-react';
import { Client, Account, ID } from 'appwrite';
import backgroundImage from './Image/pexels-eberhardgross-31979793.jpg';
import { databases, Permission, Role } from '../../../appwriteConfig';
// import logo from './../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg           '
import logo from "../../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- Validation & Submit Logic (Same as before) ---
  const validateField = (name, value, formData) => {
    if (name === 'name') return !value.trim() ? 'Name is required' : '';
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
      if (value.length < 12) return 'Minimum 12 characters';
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{12,}$/;
      return !strongPasswordRegex.test(value)
        ? 'Must include uppercase, lowercase, number, & symbol'
        : '';
    }
    if (name === 'confirmPassword') return value !== formData.password ? 'Passwords do not match' : '';
    if (name === 'agreeToTerms') return !value ? 'You must agree to the terms' : '';
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue, { ...formData, [name]: newValue }) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      toast.error('Please fix the errors');
      setIsLoading(false);
      return;
    }

    try {
      const user = await account.create(ID.unique(), formData.email, formData.password, formData.name);
      await account.createEmailPasswordSession(formData.email, formData.password);
      
      localStorage.setItem('userProfile', JSON.stringify({
        $id: user.$id,
        username: formData.name,
        email: formData.email,
        isVerified: false
      }));

      try {
        await databases.createDocument(
          DATABASE_ID, 
          USER_COLLECTION_ID, 
          user.$id,
          {
            userId: user.$id,
            username: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            isVerified: false,
            verificationCode: null,
            createdAt: new Date().toISOString()
          },
          [Permission.read(Role.user(user.$id)), Permission.update(Role.user(user.$id)), Permission.delete(Role.user(user.$id))]
        );
      } catch (dbErr) {
        console.error('Database error:', dbErr);
      }

      navigate('/Authentication/Verification/EmailVerification', { state: { email: formData.email, userId: user.$id } });
      toast.success('Account created!');

    } catch (err) {
      console.error('Appwrite error:', err);
      toast.error(err.code === 409 ? 'Email already exists' : err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Animation ---
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-['Quicksand'] relative overflow-x-hidden lg:overflow-hidden lg:flex">
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />

      {/* ==============================================
          SECTION 1: MOBILE BACKGROUND (lg:hidden)
          The "Parallax Header" for mobile only
         ============================================== */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[35vh] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage || 'https://via.placeholder.com/800x600'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        
        {/* Mobile Brand Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-12 text-white">
          {/* <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 mb-3"
          >
            <Paintbrush className="w-8 h-8 text-white" />
          </motion.div> */}
          <div className="bg-[#1f7d53] p-1 rounded-lg h-10 w-10 flex items-center justify-center overflow-hidden">
              {/* <Paintbrush className="w-6 h-6" /> */}
              <img src={logo} alt="" className=' rounded-lg' />
            </div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold font-Eagle tracking-wide shadow-black drop-shadow-lg "
          >
            Painters' Diary
          </motion.h1>
        </div>
      </div>

      {/* ==============================================
          SECTION 2: DESKTOP SIDEBAR (hidden lg:block)
          The "Split Screen" Image for Desktop only
         ============================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url(${backgroundImage || 'https://via.placeholder.com/1920x1080'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="relative z-10 w-full p-16 flex flex-col justify-between h-full text-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#1f7d53] p-1 rounded-lg h-10 w-10 flex items-center justify-center overflow-hidden">
              {/* <Paintbrush className="w-6 h-6" /> */}
              <img src={logo} alt="" className=' rounded-lg' />
            </div>
            <span className="text-xl font-bold tracking-wide font-Eagle">Painters' Diary</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Turn your <span className="text-[#1f7d53]">imagination</span> into reality.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Join a community of creators. Track your progress, share your masterpieces, and find inspiration every day.
            </p>
          </div>
          
          <div className="text-sm text-gray-400">
            © 2025 Painters' Diary. All rights reserved.
          </div>
        </div>
      </div>

      {/* ==============================================
          SECTION 3: FORM CONTENT (Shared Logic)
          Adapts container style based on breakpoint
         ============================================== */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        {/* Mobile Spacer (pushes sheet down) */}
        <div className="h-[28vh] lg:hidden" />

        {/* MAIN CONTAINER 
            Mobile: Rounded top sheet, shadow-up, bg-white
            Desktop: Full height, centered, no shadow, transparent/white
        */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 bg-white dark:bg-gray-950 rounded-t-[1.5rem] lg:rounded-none shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] lg:shadow-none p-6 sm:p-10 lg:p-20 flex flex-col justify-center"
        >
          <div className="w-full max-w-lg mx-auto">
            
            {/* Header Text */}
            <div className="mb-8 lg:mb-10 text-center lg:text-left">
              {/* Mobile Handle Bar */}
              <div className="lg:hidden w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" /> 
              
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center lg:justify-start gap-2">
                Create Account <Sparkles className="w-5 h-5 text-[#1f7d53] hidden lg:block" />
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm lg:text-base">
                Join the community and start tracking your art.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              
              {/* Name */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border ${errors.name ? 'border-red-400' : 'border-transparent lg:border-gray-200 dark:lg:border-gray-700'} rounded-2xl lg:rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200`}
                />
                {errors.name && <p className="absolute right-2 top-3.5 text-xs text-red-500 font-medium">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border ${errors.email ? 'border-red-400' : 'border-transparent lg:border-gray-200 dark:lg:border-gray-700'} rounded-2xl lg:rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200`}
                />
                {errors.email && <p className="absolute right-2 top-3.5 text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (Optional)"
                  className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border ${errors.phone ? 'border-red-400' : 'border-transparent lg:border-gray-200 dark:lg:border-gray-700'} rounded-2xl lg:rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200`}
                />
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`block w-full pl-11 pr-10 py-3.5 bg-gray-50 dark:bg-gray-800 border ${errors.password ? 'border-red-400' : 'border-transparent lg:border-gray-200 dark:lg:border-gray-700'} rounded-2xl lg:rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm"
                    className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border ${errors.confirmPassword ? 'border-red-400' : 'border-transparent lg:border-gray-200 dark:lg:border-gray-700'} rounded-2xl lg:rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200`}
                  />
                </div>
              </div>
              {/* Password Errors Display */}
              {(errors.password || errors.confirmPassword) && (
                 <div className="text-xs text-red-500 px-2">
                   {errors.password && <p>{errors.password}</p>}
                   {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                 </div>
              )}

              {/* Terms */}
              <label className="flex items-start gap-3 p-1 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 dark:border-gray-600 transition-all checked:border-[#1f7d53] checked:bg-[#1f7d53]"
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  I agree to the <Link to="/Legal/Terms_Conditions" className="text-[#1f7d53] font-semibold hover:underline">Terms</Link> & <Link to="/Legal/Privacy_Policy" className="text-[#1f7d53] font-semibold hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-xs text-red-500 ml-1">{errors.agreeToTerms}</p>}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl lg:rounded-xl font-bold text-white shadow-lg shadow-[#1f7d53]/30 flex items-center justify-center gap-3 transition-all ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1f7d53] hover:bg-[#186642] hover:shadow-[#1f7d53]/40'
                }`}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-5 h-5" /></>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-[#1f7d53] font-bold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
            
            {/* Extra bottom spacing for mobile scroll */}
            <div className="h-8 lg:hidden" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;