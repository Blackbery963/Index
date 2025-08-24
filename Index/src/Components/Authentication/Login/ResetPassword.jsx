
import React, { useState } from 'react';
import { Functions, Account } from 'appwrite';
import {client } from "../../../appwriteConfig"
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [recoveryData, setRecoveryData] = useState({ userId: '', secret: '' }); // Store recovery tokens

  const functions = new Functions(client);
  const account = new Account(client);

  const sendOtp = async () => {
    if (!email.trim()) {
      setMessage('Please enter an email.');
      return;
    }

    setLoading(true);
    try {
      // Initiate Appwrite password recovery
      const recovery = await account.createRecovery(
        email,
        'http://localhost:3000/reset-password' // Redirect URL (not used here, but required)
      );
      setRecoveryData({ userId: recovery.userId, secret: recovery.secret });

      // Call generateOTP function
      const response = await functions.createExecution(
        'generateOTP',
        JSON.stringify({ email }),
        false
      );
      const result = JSON.parse(response.responseBody);

      if (result.success) {
        setMessage('OTP sent successfully! Check your email.');
        setStep(2);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage(
        error.code === 404
          ? 'No account found with this email.'
          : `Error sending OTP: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) {
      setMessage('Please enter the OTP.');
      return;
    }

    setLoading(true);
    try {
      // Call verifyOTP function
      const response = await functions.createExecution(
        'verifyOTP',
        JSON.stringify({ email, otp }),
        false
      );
      const result = JSON.parse(response.responseBody);

      if (result.success) {
        setMessage('OTP verified successfully!');
        setStep(3);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage(`Error verifying OTP: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Please enter both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Update password using recovery tokens
      await account.updateRecovery(
        recoveryData.userId,
        recoveryData.secret,
        newPassword,
        confirmPassword
      );
      setMessage('Password reset successfully!');
      setTimeout(() => {
        navigate('/login'); // Redirect to login
      }, 1000);
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage(
        error.code === 401
          ? 'Invalid recovery data. Please start over.'
          : `Error resetting password: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4" style={{
      backgroundImage: `url(https://img.freepik.com/free-photo/swan-feathers-elegantly-glide-reflective-scene-crafting-serene-poetic-tableau_157027-2583.jpg?uid=R164504650&ga=GA1.1.955884625.1725872001&semt=ais_hybrid&w=740)`,
     backgroundPosition:'center',
     backgroundSize:'cover'
    }}>
      <header className="fixed top-4 h-[90px] w-full text-[30px] lg:text-[35px] font-bold font-Eagle text-black md:text-center text-left pl-4">
        Painters' Diary
      </header>
      <div className="bg-[#ffffff7c] backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        {/* Step Indicator */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full mx-1 ${
                step >= s ? 'bg-blue-500' : 'bg-gray-300'
              } transition-colors duration-300`}
            />
          ))}
        </div>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50"
              disabled={loading}
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 font-semibold"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50 text-center tracking-widest"
              disabled={loading}
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 font-semibold"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50"
              disabled={loading}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50"
              disabled={loading}
            />
            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 font-semibold"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium transition-all duration-200 ${
              message.includes('successfully')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        {/* Back to Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="text-blue-900 hover:underline">
            Login
          </a>
        </p>
      </div>

      {/* Custom CSS for Animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ResetPassword;