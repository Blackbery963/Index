// import React, { useState } from 'react';
// import { Account } from 'appwrite';
// import { client } from '../../../appwriteConfig'; // Your existing config

// function ResetPassword() {
//   const account = new Account(client);
//   const [step, setStep] = useState('email'); // 'email' or 'new-password'
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [userId, setUserId] = useState('');
//   const [secret, setSecret] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Check URL params on mount (for recovery link)
//   React.useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const uid = urlParams.get('userId');
//     const sec = urlParams.get('secret');
//     if (uid && sec) {
//       setUserId(uid);
//       setSecret(sec);
//       setStep('new-password');
//       setMessage('Enter your new password to complete reset.');
//     }
//   }, []);

//   const handleSendRecovery = async () => {
//     if (!email) {
//       setMessage('Please enter your email.');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Replace '/reset-password' with your recovery page URL
//       await account.createRecovery(email, `${window.location.origin}/Login/ResetPassword`);
//       setMessage('Recovery email sent! Check your inbox.');
//       setEmail('');
//     } catch (error) {
//       console.error(error);
//       setMessage(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdatePassword = async () => {
//     if (!newPassword || newPassword.length < 8) {
//       setMessage('New password must be at least 8 characters.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await account.updateRecovery(userId, secret, newPassword);
//       setMessage('Password reset successfully! You are now logged in.');
//       setNewPassword('');
//       setStep('success'); // Optionally redirect to login/dashboard
//     } catch (error) {
//       console.error(error);
//       setMessage(`Error: ${error.message || 'Invalid or expired link.'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (step === 'success') {
//     return (
//       <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold">Success!</h2>
//         <p className="text-center mt-2">Password updated. Redirecting...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <h2 className="text-2xl font-bold">
//         {step === 'email' ? 'Forgot Password?' : 'Set New Password'}
//       </h2>
      
//       {step === 'email' ? (
//         <>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//           <button
//             onClick={handleSendRecovery}
//             disabled={loading}
//             className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? 'Sending...' : 'Send Recovery Email'}
//           </button>
//         </>
//       ) : (
//         <>
//           <input
//             type="password"
//             placeholder="New password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//           <button
//             onClick={handleUpdatePassword}
//             disabled={loading}
//             className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? 'Updating...' : 'Reset Password'}
//           </button>
//         </>
//       )}
      
//       {message && <p className="text-center mt-2">{message}</p>}
      
//       {step === 'new-password' && (
//         <button
//           onClick={() => setStep('email')}
//           className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//         >
//           Back to Email
//         </button>
//       )}
//     </div>
//   );
// }

// export default ResetPassword;

import React, { useState, useEffect } from 'react';
import { Account } from 'appwrite';
import { client } from '../../../appwriteConfig';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';

function ResetPassword() {
  const account = new Account(client);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  // Smooth transition between steps
  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => setFade(false), 300);
    return () => clearTimeout(timer);
  }, [step]);

  // Check URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('userId');
    const sec = urlParams.get('secret');
    if (uid && sec) {
      setUserId(uid);
      setSecret(sec);
      setStep('new-password');
      setMessage('Enter your new password to complete the reset.');
    }
  }, []);

  const handleSendRecovery = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await account.createRecovery(email, `${window.location.origin}/Login/ResetPassword`);
      setMessage('✓ Recovery email sent! Please check your inbox (and spam folder).');
      setEmail('');
    } catch (error) {
      console.error(error);
      setMessage(`✗ ${error.message || 'Failed to send recovery email. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      setMessage('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await account.updateRecovery(userId, secret, newPassword, confirmPassword);
      setMessage('✓ Password reset successfully! You are now logged in.');
      setNewPassword('');
      setConfirmPassword('');
      setStep('success');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage(`✗ ${error.message || 'Invalid or expired link. Please request a new recovery email.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-500 scale-100 hover:scale-105">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircleIcon className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-2">Your password has been updated successfully.</p>
          <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
          <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <LockIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {step === 'email' ? 'Reset Your Password' : 'Create New Password'}
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                {step === 'email' 
                  ? 'Enter your email to receive a reset link' 
                  : 'Enter your new password below'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 px-6 py-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className={step === 'email' ? 'font-semibold text-blue-600' : ''}>Enter Email</span>
            <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
            <span className={step === 'new-password' ? 'font-semibold text-blue-600' : ''}>New Password</span>
            <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
            <span className={step === 'success' ? 'font-semibold text-blue-600' : ''}>Complete</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-1.5 mt-2">
            <div 
              className={`bg-blue-600 h-1.5 rounded-full transition-all duration-500 ${
                step === 'email' ? 'w-1/3' : step === 'new-password' ? 'w-2/3' : 'w-full'
              }`}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 ${
              message.includes('✗') || message.includes('must') || message.includes('match')
                ? 'bg-red-50 border-red-500 text-red-700'
                : 'bg-green-50 border-green-500 text-green-700'
            }`}>
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <div className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {step === 'email' ? (
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      aria-required="true"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleSendRecovery}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                      <span>Sending Recovery Link...</span>
                    </div>
                  ) : (
                    'Send Recovery Email'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        aria-required="true"
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? 
                          <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" /> : 
                          <EyeIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                        }
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
                  </div>

                  <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        aria-required="true"
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? 
                          <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" /> : 
                          <EyeIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                        }
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleUpdatePassword}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </button>

                <button
                  onClick={() => setStep('email')}
                  className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 py-3 px-4 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors font-medium"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Back to Email</span>
                </button>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;