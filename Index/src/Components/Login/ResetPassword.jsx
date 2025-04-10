
import React, { useState } from 'react';

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(''); // Added to state

  const sendOtp = () => {
    if (!email.trim()) {
      setMessage('Please enter an email.');
      return;
    }

    setLoading(true);
    try {
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);

      // Simulated API call
      console.log(`Sending OTP ${randomOtp} to ${email}`);
      setTimeout(() => {
        setMessage('OTP sent successfully! Check your email.');
        setStep(2);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
      setLoading(false);
    }
  };

  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      if (otp === generatedOtp) {
        setMessage('OTP verified successfully!');
        setStep(3);
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const resetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      if (newPassword === confirmPassword) {
        console.log(`Resetting password for ${email} to ${newPassword}`);
        setMessage('Password reset successfully!');
        // Redirect or handle success as needed
      } else {
        setMessage('Passwords do not match.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-800 to-blue-900 flex flex-col items-center justify-center p-4">
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
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50"
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