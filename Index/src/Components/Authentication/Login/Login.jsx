// import { useState, useEffect } from 'react';
// import Background from './Image/background.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// // import { account } from '../../appwriteConfig';
// import { account } from '../../../appwriteConfig';
// import { motion } from 'framer-motion';
// import { FaEnvelope, FaLock, FaPalette, FaBrush } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Check for existing session on mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         await account.getSession('current');
//         const user = await account.get();
//         console.log('Active session found:', user.email);
//         navigate('/Account');
//       } catch (err) {
//         console.log('No valid session:', err.message);
//         try {
//           await account.deleteSession('current');
//         } catch (deleteErr) {
//           console.log('No session to delete');
//         }
//       }
//     };
//     checkSession();
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // Clear any existing session first
//       try {
//         await account.deleteSession('current');
//       } catch (deleteErr) {
//         console.log('No existing session to delete');
//       }

//       // Create new session
//       await account.createEmailPasswordSession(formData.email, formData.password);
//       const user = await account.get();

//       toast.success(`Welcome back, ${user.name || user.email}`);
//       navigate('/Account');
//     } catch (err) {
//       console.error('Login error:', err);
      
//       let errorMessage = 'Login failed. Please try again.';
//       if (err.code === 401) errorMessage = 'Invalid email or password';
//       if (err.code === 429) errorMessage = 'Too many attempts. Please wait.';
      
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6, ease: 'easeOut' },
//     },
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, delay: 0.2 },
//     },
//   };

//   const formVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 },
//     },
//   };

//   const fieldVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: 'easeOut' },
//     },
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#2e1414] via-[#3a1a1a] to-[#532929]">
//       <motion.div
//         className="h-[90vh] w-[90vw] sm:w-[80vw] rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row shadow-2xl relative"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Decorative paint splatters */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -left-10 -top-10 w-24 h-24 sm:w-40 sm:h-40 bg-[#ff6b6b] opacity-15 rounded-full filter blur-xl"></div>
//           <div className="absolute -right-5 -bottom-5 w-32 h-32 sm:w-60 sm:h-60 bg-[#4ecdc4] opacity-10 rounded-full filter blur-xl"></div>
//           <div className="absolute right-10 top-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-[#ffe66d] opacity-10 rounded-full filter blur-xl"></div>
//         </div>

//         {/* Left Side - Visual Section */}
//         <motion.div
//           className="h-[40vh] lg:h-full lg:w-[55%] relative overflow-hidden"
//           variants={sectionVariants}
//         >
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{ backgroundImage: `url(${Background})` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-t from-[#2e1414]/90 via-transparent to-[#1a0b0b]/90"></div>
//           </div>

//           {/* Artistic overlay */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="relative w-full max-w-sm sm:max-w-md p-4 sm:p-8">
//               <motion.div
//                 className="mb-4 sm:mb-8"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <FaPalette className="text-white text-3xl sm:text-5xl mx-auto mb-2 sm:mb-4" />
//                 <h1 className="text-2xl sm:text-4xl font-bold text-center text-white font-Playfair tracking-wide">
//                   Welcome!
//                 </h1>
//                 <p className="text-sm sm:text-lg text-center text-white/80 mt-1 sm:mt-2 font-Quicksand">
//                   We are really excited to have you back.
//                 </p>
//               </motion.div>

//               <motion.div
//                 className="flex justify-center space-x-2 sm:space-x-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
//                   <FaBrush className="text-white text-sm sm:text-xl" />
//                 </div>
//                 <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
//                   <FaPalette className="text-white text-sm sm:text-xl" />
//                 </div>
//                 <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
//                   <FaBrush className="text-white text-sm sm:text-xl" />
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right Side - Login Form */}
//         <motion.div
//           className="h-[50vh] lg:h-full lg:w-[45%] flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative bg-gradient-to-b from-[#2e1414]/95 to-[#1a0b0b]/95 backdrop-blur-lg"
//           variants={sectionVariants}
//         >
//           {/* Subtle texture */}
//           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas.png')]"></div>

//           {/* Logo/Header */}
//           <motion.div
//             className="text-center mb-4 sm:mb-8"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h1 className="text-xl sm:text-3xl font-bold text-white font-Eagle tracking-wider">
//               Painters' Diary
//             </h1>
//             <p className="text-[16px] md:text-[23px] text-white/80 font-cookie">
//               The Diary of Every Artist
//             </p>
//           </motion.div>

//           <motion.form
//             onSubmit={handleLogin}
//             className="w-full max-w-md space-y-4 sm:space-y-6"
//             variants={formVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Email Field */}
//             <motion.div variants={fieldVariants}>
//               <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1 font-Quicksand">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaEnvelope className="h-5 w-5 text-white/90" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/30 transition-all duration-200 font-Quicksand ${
//                     isLoading ? 'opacity-70 cursor-not-allowed' : ''
//                   }`}
//                   placeholder="artist@example.com"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//             </motion.div>

//             {/* Password Field */}
//             <motion.div variants={fieldVariants}>
//               <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1 font-Quicksand">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="h-5 w-5 text-white/90" />
//                 </div>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/30 transition-all duration-200 font-Quicksand ${
//                     isLoading ? 'opacity-70 cursor-not-allowed' : ''
//                   }`}
//                   placeholder="••••••••"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//             </motion.div>

//             {/* Forgot Password */}
//             <motion.div variants={fieldVariants} className="flex justify-end">
//               <Link to="/Login/ResetPassword">
//                 <p className="text-white/70 hover:text-white hover:underline font-Quicksand text-xs sm:text-sm transition-colors">
//                   Forgot Password?
//                 </p>
//               </Link>
//             </motion.div>

//             {/* Error Message */}
//             {error && (
//               <motion.div
//                 className="px-3 py-1 sm:px-4 sm:py-2 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200 text-xs sm:text-sm font-Quicksand text-center"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 {error}
//               </motion.div>
//             )}

//             {/* Login Button */}
//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-3 sm:py-3 px-4 rounded-lg font-bold relative overflow-hidden transition-all ${
//                 isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] text-[#2e1414] hover:from-[#ffffff] hover:to-[#f1f3f5]'
//               } shadow-md`}
//               whileHover={!isLoading ? { 
//                 scale: 1.02,
//                 boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
//               } : {}}
//               whileTap={!isLoading ? { scale: 0.98 } : {}}
//               variants={fieldVariants}
//             >
//               <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
//                 {isLoading ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-4 sm:w-4 text-[#2e1414]"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : (
//                   'Log In'
//                 )}
//               </span>
//               <span className="absolute bottom-0 left-0 w-full h-1 bg-white/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//             </motion.button>

//             {/* Sign Up Link */}
//             <motion.div
//               variants={fieldVariants}
//               className="text-center text-white/80 font-Quicksand text-xs sm:text-sm"
//             >
//               Don't have an account?{' '}
//               <Link to="/Signup">
//                 <span className="text-white font-semibold hover:underline transition-colors">
//                   Sign Up
//                 </span>
//               </Link>
//             </motion.div>
//           </motion.form>
//         </motion.div>
//       </motion.div>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Paintbrush, Sparkles, AlertCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../../../appwriteConfig'; // Ensure this path is correct
import Background from './Image/background.jpg'; // Ensure you have this image
import logo from "../../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- Logic remains exactly the same ---
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.getSession('current');
        const user = await account.get();
        console.log('Active session found:', user.email);
        navigate('/Account');
      } catch (err) {
        // No active session, stay on login
        try {
          await account.deleteSession('current');
        } catch (deleteErr) {
          // Ignore
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error on typing
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      try {
        await account.deleteSession('current');
      } catch (e) {
        // Ignore if no session exists
      }

      await account.createEmailPasswordSession(formData.email, formData.password);
      const user = await account.get();

      toast.success(`Welcome back, ${user.name || 'Artist'}`);
      navigate('/Account');
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed. Please try again.';
      if (err.code === 401) errorMessage = 'Invalid email or password';
      if (err.code === 429) errorMessage = 'Too many attempts. Please wait.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Animation Variants ---
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-['Quicksand'] relative overflow-x-hidden lg:overflow-hidden lg:flex">
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />

      {/* ==============================================
          SECTION 1: MOBILE BACKGROUND (lg:hidden)
          "Parallax Header" for mobile only
         ============================================== */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[35vh] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Background || 'https://via.placeholder.com/800x600'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        
        {/* Mobile Brand Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-12 text-white">
          {/* <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 mb-3 shadow-xl"
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
            className="text-2xl font-bold font-Eagle tracking-wide drop-shadow-md"
          >
            Painters' Diary
          </motion.h1>
        </div>
      </div>

      {/* ==============================================
          SECTION 2: DESKTOP SIDEBAR (hidden lg:flex)
          "Split Screen" Image for Desktop only
         ============================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url(${Background || 'https://via.placeholder.com/1920x1080'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="relative z-10 w-full p-16 flex flex-col justify-between h-full text-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#1f7d53] p-1 rounded-lg h-10 w-10 flex items-center justify-center overflow-hidden">
                          {/* <Paintbrush className="w-6 h-6" /> */}
                          <img src={logo} alt="" className=' rounded-lg' />
                        </div>
            <span className="text-xl font-bold tracking-wide font-Eagle">Painters' Diary</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6 font-Quicksand">
              Welcome back to your <span className="text-[#1f7d53]">studio</span>.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-Quicksand">
              "Every artist was first an amateur." Continue your journey where you left off.
            </p>
          </div>
          
          <div className="text-sm text-gray-400 font-Quicksand">
            © 2025 Painters' Diary.
          </div>
        </div>
      </div>

      {/* ==============================================
          SECTION 3: FORM CONTENT
          Adapts container style based on breakpoint
         ============================================== */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        {/* Mobile Spacer (pushes sheet down) */}
        <div className="h-[28vh] lg:hidden" />

        {/* MAIN CONTAINER / SHEET */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 bg-white dark:bg-gray-950 rounded-t-[1.5rem] lg:rounded-none shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] lg:shadow-none p-6 sm:p-10 lg:p-20 flex flex-col justify-center"
        >
          <div className="w-full max-w-md mx-auto">
            
            {/* Header Text */}
            <div className="mb-8 lg:mb-10 text-center lg:text-left">
              <div className="lg:hidden w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" /> 
              
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center lg:justify-start gap-2 font-Playfair">
                Log In <Sparkles className="w-5 h-5 text-[#1f7d53] hidden lg:block" />
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm lg:text-base font-Quicksand">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-300 font-medium font-Quicksand">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="artist@example.com"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200 font-Quicksand"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200 font-Quicksand"
                  />
                </div>
                </div>
                <div className="flex items-center justify-between mt-1.5 hover:underline ">
                  <Link 
                    to="/Login/ResetPassword" 
                    className="text-xs sm:text-sm font-semibold text-[#1f7d53] hover:underline hover:text-[#155a3b] transition-colors "
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-[#1f7d53]/20 flex items-center justify-center gap-2 transition-all font-Quicksand text-lg mt-4 ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1f7d53] hover:bg-[#186642] hover:shadow-[#1f7d53]/40'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    Sign In
                    <LogIn className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <motion.div 
              variants={contentVariants} 
              className="mt-8 text-center"
            >
              <p className="text-gray-500 dark:text-gray-400 font-Quicksand">
                Don't have an account yet?{' '}
                <Link to="/Signup" className="text-[#1f7d53] font-bold hover:underline">
                  Create Account
                </Link>
              </p>
            </motion.div>
            
            {/* Extra bottom spacing for mobile scroll */}
            <div className="h-8 lg:hidden" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;