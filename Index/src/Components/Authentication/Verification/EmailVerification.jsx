// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion } from 'framer-motion';
// import { CheckCircle, XCircle, Mail, ArrowRight, RotateCcw, Paintbrush } from 'lucide-react';
// import { databases } from '../../../appwriteConfig';
// import { useEmailService } from '../EmailService/useEmailService';

// const backgroundImage = 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// // ---------------------- utils ----------------------

// /** Secure 6-digit code */
// function generateSecureCode() {
//   const cryptoObj = window.crypto || globalThis.crypto;
//   const buf = new Uint32Array(1);
//   cryptoObj.getRandomValues(buf);
//   return ((buf[0] % 900000) + 100000).toString();
// }

// /** SHA-256 hex */
// async function sha256Hex(input) {
//   const enc = new TextEncoder().encode(input);
//   const hash = await crypto.subtle.digest('SHA-256', enc);
//   return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
// }

// /** ISO timestamps */
// const nowISO = () => new Date().toISOString();
// const inMinutesISO = (mins) => new Date(Date.now() + mins * 60 * 1000).toISOString();

// /** Cooldown check */
// function secondsLeftSince(lastISO, minSeconds) {
//   if (!lastISO) return 0;
//   const elapsed = (Date.now() - new Date(lastISO).getTime()) / 1000;
//   return Math.max(0, Math.ceil(minSeconds - elapsed));
// }

// // ---------------------- component ----------------------

// const EmailVerification = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { email, userId, username } = location.state || {};
//   const { sendVerificationEmail } = useEmailService();

//   const [code, setCode] = useState('');
//   const [isVerified, setIsVerified] = useState(false);
//   const [isBusy, setIsBusy] = useState(false);
//   const [error, setError] = useState('');
//   const [countdown, setCountdown] = useState(0);

//   const resendWindowSeconds = 60;
//   const codeTTLMinutes = 10;
//   const maxVerifyAttempts = 5;

//   // countdown ticker
//   useEffect(() => {
//     if (countdown > 0) {
//       const t = setTimeout(() => setCountdown((s) => s - 1), 1000);
//       return () => clearTimeout(t);
//     }
//   }, [countdown]);

//   // auto-send code first time
//   useEffect(() => {
//     if (email && userId) {
//       (async () => {
//         try {
//           const doc = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, userId);
//           const left = secondsLeftSince(doc?.lastVerificationCodeSentAt, resendWindowSeconds);
//           setCountdown(left);
//           if (!left) await sendVerificationCode();
//         } catch {
//           await sendVerificationCode();
//         }
//       })();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [email, userId]);

//   // ---------------------- actions ----------------------

//   async function sendVerificationCode() {
//     if (!email || !userId) return;

//     setIsBusy(true);
//     setError('');

//     try {
//       const doc = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, userId);
//       const left = secondsLeftSince(doc?.lastVerificationCodeSentAt, resendWindowSeconds);
//       if (left > 0) {
//         setCountdown(left);
//         toast.info(`Please wait ${left}s before resending.`);
//         return;
//       }

//       const plainCode = generateSecureCode();
//       const hashed = await sha256Hex(plainCode);

//       await databases.updateDocument(DATABASE_ID, USER_COLLECTION_ID, userId, {
//         verificationCode: hashed,
//         verificationCodeExpiry: inMinutesISO(codeTTLMinutes),
//         lastVerificationCodeSentAt: nowISO(),
//         verificationAttemptCount: 0,
//       });

//       const ok = await sendVerificationEmail(email, plainCode, username);
//       if (!ok) throw new Error('Email provider failed');

//       setCountdown(resendWindowSeconds);
//       toast.success('Verification code sent!');
//     } catch (err) {
//       console.error('sendVerificationCode error:', err);
//       toast.error('Failed to send verification code. Try again.');
//     } finally {
//       setIsBusy(false);
//     }
//   }

//   async function handleVerify(e) {
//     e.preventDefault();
//     if (code.length !== 6) return;

//     setIsBusy(true);
//     setError('');

//     try {
//       const doc = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, userId);

//       const attempts = Number(doc.verificationAttemptCount || 0);
//       if (attempts >= maxVerifyAttempts) {
//         throw new Error('Too many attempts. Resend a new code.');
//       }

//       if (!doc.verificationCodeExpiry || new Date() > new Date(doc.verificationCodeExpiry)) {
//         throw new Error('Code expired. Please resend.');
//       }

//       const inputHash = await sha256Hex(code);
//       if (inputHash !== doc.verificationCode) {
//         await databases.updateDocument(DATABASE_ID, USER_COLLECTION_ID, userId, {
//           verificationAttemptCount: attempts + 1,
//         });
//         throw new Error('Invalid code. Try again.');
//       }

//       await databases.updateDocument(DATABASE_ID, USER_COLLECTION_ID, userId, {
//         isVerified: true,
//         verificationCode: null,
//         verificationCodeExpiry: null,
//         lastVerificationCodeSentAt: null,
//         verificationAttemptCount: 0,
//       });

//       const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
//       localStorage.setItem('userProfile', JSON.stringify({ ...userProfile, isVerified: true }));

//       setIsVerified(true);
//       toast.success('Email verified! Redirecting…');
//       setTimeout(() => navigate('/Account'), 1500);
//     } catch (err) {
//       console.error('verify error:', err);
//       setError(err.message || 'Verification failed.');
//     } finally {
//       setIsBusy(false);
//     }
//   }

//   async function handleResend() {
//     if (countdown > 0 || isBusy) return;
//     await sendVerificationCode();
//     setCode('');
//   }

//   // ---------------------- guard ----------------------

//   if (!email || !userId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
//           <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Invalid Request</h1>
//           <p className="text-gray-600 dark:text-gray-300 mb-6">Please complete signup first to verify your email.</p>
//           <button
//             onClick={() => navigate('/signup')}
//             className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//           >
//             Go to Signup
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ---------------------- UI ----------------------

//   return (
//     // <div
//     //   className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900"
//     //   style={{
//     //     backgroundImage: `url(${backgroundImage})`,
//     //     backgroundSize: 'cover',
//     //     backgroundPosition: 'center',
//     //     backgroundAttachment: 'fixed',
//     //   }}
//     // >
//     //   <Link to="/account" className="absolute top-2 left-2 text-sm text-gray-500 hover:underline">
//     //     Skip For Now
//     //   </Link>
//     //   <motion.div
//     //     initial={{ opacity: 0, scale: 0.95 }}
//     //     animate={{ opacity: 1, scale: 1 }}
//     //     transition={{ duration: 0.6, ease: 'easeOut' }}
//     //     className="w-full max-w-md bg-gradient-to-b from-[#1f7d53]/95 to-[#145c3e]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
//     //   >
//     //     <div className="p-8">
//     //       <div className="text-center mb-2">
//     //         <Paintbrush className="w-12 h-12 text-white mx-auto mb-2" />
//     //         <h1 className="text-xl font-bold text-white font-Eagle">Painters' Diary</h1>
//     //       </div>

//     //       {!isVerified ? (
//     //         <>
//     //           <div className="text-center mb-8">
//     //             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//     //               <Mail className="w-8 h-8 text-white" />
//     //             </div>
//     //             <h1 className="text-2xl font-bold text-white mb-2 font-['Playfair_Display']">Verify Your Email</h1>
//     //             <p className="text-white/80">
//     //               We've sent a 6-digit code to <span className="font-semibold text-white">{email}</span>
//     //             </p>
//     //             <p className="text-white/60 text-sm mt-2">Check spam folder if you don't see it</p>
//     //           </div>

//     //           <form onSubmit={handleVerify} className="space-y-6" autoComplete="one-time-code">
//     //             <div>
//     //               <label htmlFor="code" className="block text-lg font-semibold text-white mb-2 font-['Playfair_Display']">
//     //                 Verification Code
//     //               </label>
//     //               <input
//     //                 id="code"
//     //                 inputMode="numeric"
//     //                 pattern="\d{6}"
//     //                 type="text"
//     //                 aria-label="Enter 6-digit verification code"
//     //                 value={code}
//     //                 onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//     //                 placeholder="Enter 6-digit code"
//     //                 className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/50 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 transition-all duration-200"
//     //                 required
//     //                 maxLength={6}
//     //                 disabled={isBusy}
//     //               />
//     //             </div>

//     //             {error && (
//     //               <div className="flex items-center gap-2 text-red-300 bg-red-500/20 p-3 rounded-lg">
//     //                 <XCircle className="w-5 h-5" />
//     //                 <span className="text-sm">{error}</span>
//     //               </div>
//     //             )}

//     //             <button
//     //               type="submit"
//     //               disabled={isBusy || code.length !== 6}
//     //               className="w-full bg-white text-[#1f7d53] py-3 px-4 rounded-lg font-bold hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-['Quicksand']"
//     //             >
//     //               {isBusy ? (
//     //                 <>
//     //                   <div className="w-5 h-5 border-2 border-[#1f7d53] border-t-transparent rounded-full animate-spin" />
//     //                   Verifying...
//     //                 </>
//     //               ) : (
//     //                 <>
//     //                   Verify Email
//     //                   <ArrowRight className="w-5 h-5" />
//     //                 </>
//     //               )}
//     //             </button>
//     //           </form>

//     //           <div className="mt-6 text-center">
//     //             <button
//     //               type="button"
//     //               onClick={handleResend}
//     //               disabled={isBusy || countdown > 0}
//     //               className="text-white hover:text-gray-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 mx-auto"
//     //             >
//     //               <RotateCcw className="w-4 h-4" />
//     //               {countdown > 0 ? `Resend in ${countdown}s` : "Didn't receive the code? Resend"}
//     //             </button>
//     //           </div>
//     //         </>
//     //       ) : (
//     //         <div className="text-center py-8">
//     //           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//     //             <CheckCircle className="w-8 h-8 text-white" />
//     //           </div>
//     //           <h1 className="text-2xl font-bold text-white mb-2 font-['Playfair_Display']">Email Verified!</h1>
//     //           <p className="text-white/80 mb-6">Your email has been successfully verified. Redirecting…</p>
//     //           <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
//     //         </div>
//     //       )}
//     //     </div>

//     //     <div className="bg-white/10 px-8 py-4 border-t border-white/20">
//     //       <p className="text-xs text-white/60 text-center">Need help? Contact support@paintersdiary.com</p>
//     //     </div>
//     //   </motion.div>

//     //   <ToastContainer position="top-right" autoClose={3000} theme="colored" />
//     // </div>

//     <div
//     className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900"
//     style={{
//       backgroundImage: `url(${backgroundImage})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundAttachment: 'fixed',
//     }}
//   >
//     <Link
//       to="/account"
//       className="absolute top-3 left-3 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md hover:bg-white/30 transition-all"
//     >
//       Skip For Now
//     </Link>

//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className="w-full max-w-md bg-gradient-to-b from-[#1f7d53]/95 to-[#145c3e]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20"
//     >
//       <div className="p-8 text-center">
//         <div className="mb-4">
//           <Paintbrush className="w-12 h-12 text-white mx-auto mb-2" />
//           <h1 className="text-xl font-bold text-white font-Eagle">Painters' Diary</h1>
//         </div>

//         <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 animate-pulse">
//           <Mail className="w-10 h-10 text-white" />
//         </div>

//         <h2 className="text-2xl font-bold text-white mb-2 font-Playfair">
//           Email Verification — Coming Soon!
//         </h2>
//         <p className="text-white/80 mb-4">
//           This feature is currently under development. You’ll be notified when it’s ready.
//         </p>

//         <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
//           <p className="text-white/90 text-sm">
//             For now, you can <span className="font-semibold text-yellow-300">skip this step</span> and continue exploring your account.  
//             We’ll alert you once the email verification system is live.
//           </p>
//         </div>

//         <button
//           onClick={() => navigate('/account')}
//           className="w-full bg-white text-[#1f7d53] py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
//         >
//           Continue to Account
//           <ArrowRight className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="bg-white/10 px-8 py-4 border-t border-white/20 text-center">
//         <p className="text-xs text-white/60">
//           Need help? Contact <span className="text-white font-medium">support@paintersdiary.com</span>
//         </p>
//       </div>
//     </motion.div>

//     {/* <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}
//   </div>
//   );
// };

// export default EmailVerification;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Paintbrush, ArrowRight, Hammer, BellRing, Sparkles } from 'lucide-react';

const backgroundImage = 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg';

const EmailVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-2 relative font-Quicksand">
      
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-[#1f7d53]/40 backdrop-blur-[4px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Skip Link (Optional, since the main button does the same, but good for UX) */}
        <div className="absolute top-4 right-4">
            <Link to="/Account" className="text-xs text-white/50 hover:text-white transition-colors font-semibold uppercase tracking-wider">
                Skip
            </Link>
        </div>

        <div className="p-8 sm:p-10 text-center">
          
          {/* Brand Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-[#1f7d53] rounded-xl mb-4 shadow-lg shadow-[#1f7d53]/30">
              <Paintbrush className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white font-Eagle tracking-wide">Painters' Diary</h1>
          </div>

          {/* Icon Animation */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-full h-full bg-white/10 border border-white/20 rounded-full flex items-center justify-center shadow-inner">
                <Hammer className="w-8 h-8 text-yellow-300" />
            </div>
            <div className="absolute -top-1 -right-1 bg-[#1f7d53] p-1.5 rounded-full border border-black/20">
                <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-3 font-Playfair">
              Under Development
            </h2>
            
            <p className="text-white/80 leading-relaxed mb-6 text-sm">
              We are currently crafting a secure verification system for you. 
              This feature will be available in the next update.
            </p>

            {/* Notification Badge */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 flex items-start gap-3 text-left">
                <BellRing className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <p className="text-xs text-white/70">
                    <span className="text-white font-semibold">Don't worry!</span> Your account is fully active now and it's completely secured with us. You can skip this step and start exploring your canvas immediately.
                </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/Account')}
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-[#1f7d53] hover:bg-[#145c3e] hover:shadow-[#1f7d53]/50 transition-all flex items-center justify-center gap-2 group"
            >
              Continue to Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="bg-black/20 p-4 text-center border-t border-white/5">
          <p className="text-white/40 text-xs">
            Status: <span className="text-yellow-400/80 font-mono">Building...</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;