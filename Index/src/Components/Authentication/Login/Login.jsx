// import { useState, useEffect } from 'react';
// import Background from './Image/background.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// import { Client, } from 'appwrite';
// import { account, } from '../../appwriteConfig';
// import { motion } from 'framer-motion';
// import { FaEnvelope, FaLock, FaPalette, FaBrush } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Initialize Appwrite client
// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  
// // const account = new Account(client);

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   // Check for existing session on mount
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const user = await account.get();
//         console.log('Active session found:', user);
//         navigate('/Account');
//       } catch (err) {
//         console.log('No active session:', err.message);
//       }
//     };
//     checkSession();
//   }, [navigate]);

//   const handleLogin = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const session = await account.createEmailPasswordSession(formData.email, formData.password);

//       console.log('Session created:', session); // Log the session
//       const user = await account.get();
//       console.log('User data:', user); // Log the user data
//       toast.success(`Login Successful! Welcome back, ${user.name || 'User'}(ID: ${user.$id})`);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Full error object:', err); // Log the entire error
//       console.error('Error type:', err.type);
//       console.error('Error code:', err.code);
//       console.error('Error message:', err.message);
//       setError(
//         err.code === 401
//           ? 'Invalid Email or Password'
//           : err.code === 404
//           ? 'No account found. Please sign up.'
//           : err.code === 429
//           ? 'Too many requests. Please try again later.'
//           : `Login failed: ${err.message}`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };


// //   const handleLogin = async () => {
// //   setIsLoading(true);
// //   setError('');
// //   try {
// //     await account.createEmailPasswordSession(email, password);
// //     const user = await account.get();
// //     toast.success(`Welcome back, ${user.name || 'User'}`);
// //     navigate('/dashboard');
// //   } catch (err) {
// //     console.error('Login failed:', err);
// //     setError(err.message || 'Login failed');
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };


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
//                 We are really exited to have you back.
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
//             <p className=" text-[16px] md:text-[23px] text text-white/80 font-cookie">
//               The Diary of Every Artist
//             </p>
//           </motion.div>

//           <motion.div
//             className="w-full max-w-md space-y-4 sm:space-y-6"
//             variants={formVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {/* Email Field */}
//      {/* Email Field */}
//           <motion.div variants={fieldVariants} className="relative">
//           <label
//           htmlFor="email"
//            className="block text-sm font-medium text-white/80 mb-1 font-Quicksand"
//             >
//             Email Address
//             </label>
//             <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//            <FaEnvelope className="h-5 w-5 text-white/90" />
//             </div>
//             <input
//             type="email"
//             id="email"
//             placeholder="artist@example.com"
//              className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/30 transition-all duration-200 font-Quicksand ${
//             isLoading ? 'opacity-70 cursor-not-allowed' : ''
//             }`}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}

//             // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             disabled={isLoading}
//             />
//             </div>
//             </motion.div>

//             {/* Password Field */}
//             <motion.div variants={fieldVariants} className="relative mt-4">
//             <label
//             htmlFor="password"
//             className="block text-sm font-medium text-white/80 mb-1 font-Quicksand"
//             >
//             Password
//             </label>
//             <div className="relative">
//              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//              <FaLock className="h-5 w-5 text-white/90" />
//              </div>
//             <input
//              type="password"
//              id="password"
//              placeholder="••••••••"
//              className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/30 transition-all duration-200 font-Quicksand ${
//              isLoading ? 'opacity-70 cursor-not-allowed' : ''
//              }`}
//              value={password}
//              onChange={(e) => setPassword(e.target.value)}
//             // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//              disabled={isLoading}
//              />
//             </div>
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
//               onClick={handleLogin}
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
//           </motion.div>
//         </motion.div>
//       </motion.div>
//        <ToastContainer
//               position="top-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="colored"
//             />
//     </div>
//   );
// }

// export default Login;

import { useState, useEffect } from 'react';
import Background from './Image/background.jpg';
import { Link, useNavigate } from 'react-router-dom';
// import { account } from '../../appwriteConfig';
import { account } from '../../../appwriteConfig';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaPalette, FaBrush } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.getSession('current');
        const user = await account.get();
        console.log('Active session found:', user.email);
        navigate('/Account');
      } catch (err) {
        console.log('No valid session:', err.message);
        try {
          await account.deleteSession('current');
        } catch (deleteErr) {
          console.log('No session to delete');
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Clear any existing session first
      try {
        await account.deleteSession('current');
      } catch (deleteErr) {
        console.log('No existing session to delete');
      }

      // Create new session
      await account.createEmailPasswordSession(formData.email, formData.password);
      const user = await account.get();

      toast.success(`Welcome back, ${user.name || user.email}`);
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#2e1414] via-[#3a1a1a] to-[#532929]">
      <motion.div
        className="h-[90vh] w-[90vw] sm:w-[80vw] rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row shadow-2xl relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative paint splatters */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-10 -top-10 w-24 h-24 sm:w-40 sm:h-40 bg-[#ff6b6b] opacity-15 rounded-full filter blur-xl"></div>
          <div className="absolute -right-5 -bottom-5 w-32 h-32 sm:w-60 sm:h-60 bg-[#4ecdc4] opacity-10 rounded-full filter blur-xl"></div>
          <div className="absolute right-10 top-1/4 w-20 h-20 sm:w-32 sm:h-32 bg-[#ffe66d] opacity-10 rounded-full filter blur-xl"></div>
        </div>

        {/* Left Side - Visual Section */}
        <motion.div
          className="h-[40vh] lg:h-full lg:w-[55%] relative overflow-hidden"
          variants={sectionVariants}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e1414]/90 via-transparent to-[#1a0b0b]/90"></div>
          </div>

          {/* Artistic overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md p-4 sm:p-8">
              <motion.div
                className="mb-4 sm:mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FaPalette className="text-white text-3xl sm:text-5xl mx-auto mb-2 sm:mb-4" />
                <h1 className="text-2xl sm:text-4xl font-bold text-center text-white font-Playfair tracking-wide">
                  Welcome!
                </h1>
                <p className="text-sm sm:text-lg text-center text-white/80 mt-1 sm:mt-2 font-Quicksand">
                  We are really excited to have you back.
                </p>
              </motion.div>

              <motion.div
                className="flex justify-center space-x-2 sm:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <FaBrush className="text-white text-sm sm:text-xl" />
                </div>
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <FaPalette className="text-white text-sm sm:text-xl" />
                </div>
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <FaBrush className="text-white text-sm sm:text-xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          className="h-[50vh] lg:h-full lg:w-[45%] flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative bg-gradient-to-b from-[#2e1414]/95 to-[#1a0b0b]/95 backdrop-blur-lg"
          variants={sectionVariants}
        >
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas.png')]"></div>

          {/* Logo/Header */}
          <motion.div
            className="text-center mb-4 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-xl sm:text-3xl font-bold text-white font-Eagle tracking-wider">
              Painters' Diary
            </h1>
            <p className="text-[16px] md:text-[23px] text-white/80 font-cookie">
              The Diary of Every Artist
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleLogin}
            className="w-full max-w-md space-y-4 sm:space-y-6"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Email Field */}
            <motion.div variants={fieldVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1 font-Quicksand">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-white/90" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/30 transition-all duration-200 font-Quicksand ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  placeholder="artist@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={fieldVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1 font-Quicksand">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-white/90" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/30 transition-all duration-200 font-Quicksand ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            {/* Forgot Password */}
            <motion.div variants={fieldVariants} className="flex justify-end">
              <Link to="/Login/ResetPassword">
                <p className="text-white/70 hover:text-white hover:underline font-Quicksand text-xs sm:text-sm transition-colors">
                  Forgot Password?
                </p>
              </Link>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="px-3 py-1 sm:px-4 sm:py-2 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200 text-xs sm:text-sm font-Quicksand text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-3 px-4 rounded-lg font-bold relative overflow-hidden transition-all ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] text-[#2e1414] hover:from-[#ffffff] hover:to-[#f1f3f5]'
              } shadow-md`}
              whileHover={!isLoading ? { 
                scale: 1.02,
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
              } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              variants={fieldVariants}
            >
              <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-4 sm:w-4 text-[#2e1414]"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Log In'
                )}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-white/50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </motion.button>

            {/* Sign Up Link */}
            <motion.div
              variants={fieldVariants}
              className="text-center text-white/80 font-Quicksand text-xs sm:text-sm"
            >
              Don't have an account?{' '}
              <Link to="/Signup">
                <span className="text-white font-semibold hover:underline transition-colors">
                  Sign Up
                </span>
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

export default Login;