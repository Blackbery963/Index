

// import React, { useState, useEffect } from 'react';
// import { Account } from 'appwrite';
// import { client } from '../../../appwriteConfig';
// import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';

// function ResetPassword() {
//   const account = new Account(client);
//   const [step, setStep] = useState('email');
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [userId, setUserId] = useState('');
//   const [secret, setSecret] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [fade, setFade] = useState(false);

//   // Smooth transition between steps
//   useEffect(() => {
//     setFade(true);
//     const timer = setTimeout(() => setFade(false), 300);
//     return () => clearTimeout(timer);
//   }, [step]);

//   // Check URL params on mount
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const uid = urlParams.get('userId');
//     const sec = urlParams.get('secret');
//     if (uid && sec) {
//       setUserId(uid);
//       setSecret(sec);
//       setStep('new-password');
//       setMessage('Enter your new password to complete the reset.');
//     }
//   }, []);

//   const handleSendRecovery = async () => {
//     if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       setMessage('Please enter a valid email address.');
//       return;
//     }

//     setLoading(true);
//     setMessage('');
//     try {
//       await account.createRecovery(email, `${window.location.origin}/Login/ResetPassword`);
//       setMessage('✓ Recovery email sent! Please check your inbox (and spam folder).');
//       setEmail('');
//     } catch (error) {
//       console.error(error);
//       setMessage(`✗ ${error.message || 'Failed to send recovery email. Please try again.'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdatePassword = async () => {
//     if (!newPassword || newPassword.length < 8) {
//       setMessage('New password must be at least 8 characters long.');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     setLoading(true);
//     setMessage('');
//     try {
//       await account.updateRecovery(userId, secret, newPassword, confirmPassword);
//       setMessage('✓ Password reset successfully! You are now logged in.');
//       setNewPassword('');
//       setConfirmPassword('');
//       setStep('success');
//       setTimeout(() => {
//         window.location.href = '/dashboard';
//       }, 3000);
//     } catch (error) {
//       console.error(error);
//       setMessage(`✗ ${error.message || 'Invalid or expired link. Please request a new recovery email.'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (step === 'success') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
//         <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-500 scale-100 hover:scale-105">
//           <div className="flex justify-center mb-6">
//             <div className="bg-green-100 p-4 rounded-full">
//               <CheckCircleIcon className="h-16 w-16 text-green-600" />
//             </div>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Password Reset Successful!</h2>
//           <p className="text-gray-600 mb-2">Your password has been updated successfully.</p>
//           <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
//           <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
//             <div className="bg-green-600 h-2 rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
//           <div className="flex items-center space-x-3">
//             <div className="bg-white/20 p-2 rounded-lg">
//               <LockIcon className="h-6 w-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold">
//                 {step === 'email' ? 'Reset Your Password' : 'Create New Password'}
//               </h1>
//               <p className="text-blue-100 text-sm mt-1">
//                 {step === 'email' 
//                   ? 'Enter your email to receive a reset link' 
//                   : 'Enter your new password below'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="bg-gray-100 px-6 py-2">
//           <div className="flex items-center justify-between text-xs text-gray-600">
//             <span className={step === 'email' ? 'font-semibold text-blue-600' : ''}>Enter Email</span>
//             <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
//             <span className={step === 'new-password' ? 'font-semibold text-blue-600' : ''}>New Password</span>
//             <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
//             <span className={step === 'success' ? 'font-semibold text-blue-600' : ''}>Complete</span>
//           </div>
//           <div className="w-full bg-gray-300 rounded-full h-1.5 mt-2">
//             <div 
//               className={`bg-blue-600 h-1.5 rounded-full transition-all duration-500 ${
//                 step === 'email' ? 'w-1/3' : step === 'new-password' ? 'w-2/3' : 'w-full'
//               }`}
//             ></div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-8">
//           {message && (
//             <div className={`mb-6 p-4 rounded-lg border-l-4 ${
//               message.includes('✗') || message.includes('must') || message.includes('match')
//                 ? 'bg-red-50 border-red-500 text-red-700'
//                 : 'bg-green-50 border-green-500 text-green-700'
//             }`}>
//               <p className="text-sm font-medium">{message}</p>
//             </div>
//           )}

//           <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
//             {step === 'email' ? (
//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <MailIcon className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="email"
//                       type="email"
//                       placeholder="Enter your email address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       aria-required="true"
//                     />
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleSendRecovery}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
//                       <span>Sending Recovery Link...</span>
//                     </div>
//                   ) : (
//                     'Send Recovery Email'
//                   )}
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <LockIcon className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="newPassword"
//                         type={showNewPassword ? 'text' : 'password'}
//                         placeholder="Enter new password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         aria-required="true"
//                         minLength={8}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPassword(!showNewPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                         aria-label={showNewPassword ? 'Hide password' : 'Show password'}
//                       >
//                         {showNewPassword ? 
//                           <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" /> : 
//                           <EyeIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
//                         }
//                       </button>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
//                   </div>

//                   <div className="relative">
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <LockIcon className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         id="confirmPassword"
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         placeholder="Confirm your new password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                         aria-required="true"
//                         minLength={8}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                         aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
//                       >
//                         {showConfirmPassword ? 
//                           <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" /> : 
//                           <EyeIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
//                         }
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleUpdatePassword}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
//                       <span>Updating Password...</span>
//                     </div>
//                   ) : (
//                     'Reset Password'
//                   )}
//                 </button>

//                 <button
//                   onClick={() => setStep('email')}
//                   className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 py-3 px-4 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors font-medium"
//                 >
//                   <ArrowLeftIcon className="h-4 w-4" />
//                   <span>Back to Email</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Help Text */}
//           <div className="mt-8 text-center">
//             <p className="text-sm text-gray-600">
//               Need help?{' '}
//               <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
//                 Contact support
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

import React, { useState, useEffect } from 'react';
import { Account } from 'appwrite';
import { client } from '../../../appwriteConfig'; // Ensure path is correct
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowLeft, 
  CheckCircle, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle,
  ArrowRight,
  Send
} from 'lucide-react';
import Background from './Image/background.jpg'; // Ensure you have this image

function ResetPassword() {
  const account = new Account(client);
  const [step, setStep] = useState('email'); // 'email', 'new-password', 'success'
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'error' | 'success'
  const [loading, setLoading] = useState(false);

  // Check URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('userId');
    const sec = urlParams.get('secret');
    if (uid && sec) {
      setUserId(uid);
      setSecret(sec);
      setStep('new-password');
      setMessage({ text: 'Please create a new strong password.', type: 'success' });
    }
  }, []);

  const handleSendRecovery = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      await account.createRecovery(email, `${window.location.origin}/Login/ResetPassword`);
      setMessage({ text: 'Recovery link sent! Check your email inbox.', type: 'success' });
      setEmail('');
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message || 'Failed to send email.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters.', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      await account.updateRecovery(userId, secret, newPassword, confirmPassword);
      setStep('success');
      setTimeout(() => {
        window.location.href = '/login'; // Changed to redirect to login
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message || 'Invalid link. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // --- Animation Variants ---
  const slideVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-['Quicksand'] overflow-hidden">
      
      {/* --- Background --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Background || 'https://via.placeholder.com/1920x1080'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-[#1f7d53]/30 backdrop-blur-[3px]" />
      </div>

      {/* --- Card Container --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-4"
      >
        <div className="bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Header */}
          <div className="p-8 pb-4 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-[#1f7d53] to-[#145c3e] rounded-2xl mb-6 shadow-lg shadow-[#1f7d53]/30">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white font-Eagle mb-2 tracking-wide">
              {step === 'email' ? 'Forgot Password?' : step === 'new-password' ? 'Reset Password' : 'All Done!'}
            </h1>
            <p className="text-white/70 text-sm font-medium">
              {step === 'email' 
                ? 'Don\'t worry, we\'ll help you get back in.' 
                : step === 'new-password' 
                  ? 'Create a new secure password.'
                  : 'Your account is secure again.'}
            </p>
          </div>

          {/* Dynamic Content Area */}
          <div className="p-8 pt-2 flex-1 flex flex-col justify-center">
            
            {/* Notification Banner */}
            <AnimatePresence mode="wait">
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, height: 0, mb: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, mb: 0 }}
                  className={`rounded-xl p-3 flex items-start gap-3 border backdrop-blur-md ${
                    message.type === 'error' 
                      ? 'bg-red-500/20 border-red-500/30 text-red-100' 
                      : 'bg-green-500/20 border-green-500/30 text-green-100'
                  }`}
                >
                  {message.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle className="w-5 h-5 shrink-0" />}
                  <span className="text-sm font-medium">{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              
              {/* STEP 1: EMAIL REQUEST */}
              {step === 'email' && (
                <motion.form 
                  key="step-email"
                  variants={slideVariants}
                  initial="hidden" animate="visible" exit="exit"
                  onSubmit={handleSendRecovery}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="artist@example.com"
                        className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-black/40 focus:border-[#1f7d53] focus:ring-1 focus:ring-[#1f7d53] transition-all duration-200"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-[#1f7d53] hover:bg-[#186642] hover:shadow-[#1f7d53]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Send Recovery Link <Send className="w-4 h-4" /></>
                    )}
                  </button>

                  <a href="/login" className="flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm transition-colors mt-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                  </a>
                </motion.form>
              )}

              {/* STEP 2: NEW PASSWORD */}
              {step === 'new-password' && (
                <motion.form
                  key="step-password"
                  variants={slideVariants}
                  initial="hidden" animate="visible" exit="exit"
                  onSubmit={handleUpdatePassword}
                  className="space-y-5"
                >
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider ml-1">New Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors" />
                      </div>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="block w-full pl-11 pr-12 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-black/40 focus:border-[#1f7d53] focus:ring-1 focus:ring-[#1f7d53] transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider ml-1">Confirm Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-white/60 group-focus-within:text-white transition-colors" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="block w-full pl-11 pr-12 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-black/40 focus:border-[#1f7d53] focus:ring-1 focus:ring-[#1f7d53] transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-[#1f7d53] hover:bg-[#186642] hover:shadow-[#1f7d53]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Reset Password <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </motion.form>
              )}

              {/* STEP 3: SUCCESS */}
              {step === 'success' && (
                <motion.div
                  key="step-success"
                  variants={slideVariants}
                  initial="hidden" animate="visible" exit="exit"
                  className="text-center space-y-6 py-4"
                >
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Password Updated!</h3>
                    <p className="text-white/70">
                      You can now log in with your new credentials.
                    </p>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "100%" }} 
                      transition={{ duration: 3 }}
                      className="bg-[#1f7d53] h-full"
                    />
                  </div>
                  <p className="text-xs text-white/50">Redirecting to login...</p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPassword;