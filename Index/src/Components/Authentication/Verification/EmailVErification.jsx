// import { useState, useRef, useEffect } from 'react';
// import { CheckCircle, XCircle, Mail, ArrowRight } from 'lucide-react';
// import { ToastContainer, toast } from 'react-toastify';


// const EmailVerification = () => {
//   const [email] = useState('user@example.com'); // Assuming email is passed or from context
//   const [codes, setCodes] = useState(['', '', '', '', '', '']);
//   const [isVerified, setIsVerified] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   const handleCodeChange = (index, value) => {
//     if (value.length > 1) return;
//     const newCodes = [...codes];
//     newCodes[index] = value.toUpperCase(); // Optional: uppercase for style
//     setCodes(newCodes);

//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !codes[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, 6);
//     const newCodes = paste.split('');
//     while (newCodes.length < 6) newCodes.push('');
//     setCodes(newCodes);
//     inputRefs.current[Math.min(paste.length - 1, 5)].focus();
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const code = codes.join('');
//     if (code.length !== 6) return;

//     setIsLoading(true);
//     setError('');

//     // Simulate API call
//     setTimeout(() => {
//       if (code === '123456') { // Demo code
//         setIsVerified(true);
//         setError('');
//       } else {
//         setError('Invalid verification code. Please try again.');
//       }
//       setIsLoading(false);
//     }, 1500);
//   };

//   const handleResendCode = () => {
//     setIsLoading(true);
//     // Simulate resend code
//     setTimeout(() => {
//       toast.success('Verification code sent to your email!');
//       setIsLoading(false);
//       setCodes(['', '', '', '', '', '']);
//       inputRefs.current[0].focus();
//     }, 1000);
//   };

//   const isCodeComplete = codes.every((c) => c !== '');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//         <ToastContainer/>
//       <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6">
//           {!isVerified ? (
//             <>
//               <div className="text-center mb-6">
//                 <Mail className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
//                 <h1 className="text-xl font-semibold text-gray-900 mb-1">
//                   Verify Your Email
//                 </h1>
//                 <p className="text-sm text-gray-600">
//                   Enter the 6-digit code sent to{' '}
//                   <span className="font-medium">{email}</span>
//                 </p>
//               </div>

//               <form onSubmit={handleVerify} onPaste={handlePaste}>
//                 <div className="flex justify-between mb-6">
//                   {codes.map((code, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => (inputRefs.current[index] = el)}
//                       type="text"
//                       value={code}
//                       onChange={(e) => handleCodeChange(index, e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(index, e)}
//                       maxLength={1}
//                       className="w-10 h-10 text-center text-lg font-medium border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
//                       autoComplete="off"
//                     />
//                   ))}
//                 </div>

//                 {error && (
//                   <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-md mb-4 text-sm">
//                     <XCircle className="w-4 h-4" />
//                     {error}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isLoading || !isCodeComplete}
//                   className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Verifying
//                     </>
//                   ) : (
//                     <>
//                       Verify
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
//               </form>

//               <div className="mt-4 text-center">
//                 <button
//                   onClick={handleResendCode}
//                   disabled={isLoading}
//                   className="text-indigo-600 hover:text-indigo-700 text-sm disabled:opacity-50"
//                 >
//                   Resend Code
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-4">
//               <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
//               <h1 className="text-xl font-semibold text-gray-900 mb-1">
//                 Verified!
//               </h1>
//               <p className="text-sm text-gray-600 mb-4">
//                 Your email is verified. Proceed to your account.
//               </p>
//               <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-all text-sm">
//                 Go to Dashboard
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailVerification;





import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail, ArrowRight, RotateCcw } from 'lucide-react';
// import { client, account } from '../../../appwriteConfig';
import { Account, Client } from 'appwrite';
// import backgroundImage from './Image/pexels-eberhardgross-31979793.jpg';

const backgroundImage = "https://images.pexels.com/photos/33008787/pexels-photo-33008787.jpeg"

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);


const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId } = location.state || {};
  
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Start countdown for resend code
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Verify the email with the code
      await account.updateVerification(userId, code);
      
      // Update user document in database to mark as verified
      await databases.updateDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId,
        { isVerified: true }
      );
      
      setIsVerified(true);
      toast.success('Email verified successfully!', { autoClose: 3000 });
      
      // Redirect to account page after a delay
      setTimeout(() => {
        navigate('/Account');
      }, 3000);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      // Create a new verification session
      await account.createVerification('http://www.thepaintersdiary.com/Authentication/Verification/EmailVerification');
      setCountdown(60); // 60 seconds countdown
      toast.info('Verification code sent to your email!', { autoClose: 3000 });
    } catch (err) {
      console.error('Resend error:', err);
      toast.error('Failed to send verification code. Please try again.', { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Verification Request
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please complete the registration process to verify your email.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900"
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
        className="w-full max-w-md bg-gradient-to-b from-[#1f7d53]/95 to-[#145c3e]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-8">
          {!isVerified ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 font-['Playfair_Display']">
                  Verify Your Email
                </h1>
                <p className="text-white/80">
                  We've sent a 6-digit code to{' '}
                  <span className="font-semibold text-white">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-lg font-semibold text-white mb-2 font-['Playfair_Display']">
                    Verification Code
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 transition-all duration-200"
                    required
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-300 bg-red-500/20 p-3 rounded-lg">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || code.length !== 6}
                  className="w-full bg-white text-[#1f7d53] py-3 px-4 rounded-lg font-bold hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-['Quicksand']"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#1f7d53] border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Email
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={handleResendCode}
                  disabled={isLoading || countdown > 0}
                  className="text-white hover:text-gray-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 mx-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  {countdown > 0 ? `Resend in ${countdown}s` : "Didn't receive the code? Resend"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2 font-['Playfair_Display']">
                Email Verified!
              </h1>
              <p className="text-white/80 mb-6">
                Your email has been successfully verified. You will be redirected to your account shortly.
              </p>
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}
        </div>

        <div className="bg-white/10 px-8 py-4 border-t border-white/20">
          <p className="text-xs text-white/60 text-center">
            Need help? Contact support@example.com
          </p>
        </div>
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

export default EmailVerification;