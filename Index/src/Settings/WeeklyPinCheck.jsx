import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, ArrowRight, AlertCircle, LogOut 
} from 'lucide-react';

// Using the same security-themed image for consistency
const SECURITY_BG = "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg";

const WeeklyPinCheck = ({ onVerify, onLogout }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInput = (index, value) => {
    if (isNaN(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if filled
    if (index === 5 && value && newPin.every(d => d !== '')) {
      handleVerify(newPin.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (code) => {
    setLoading(true);
    // Mock API Check
    setTimeout(() => {
      // Replace '123456' with actual user PIN check
      if (code === '123456') {
        onVerify(); // Success callback
      } else {
        setError('Incorrect PIN. Please try again.');
        setLoading(false);
        setPin(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-['Quicksand'] relative overflow-x-hidden lg:overflow-hidden lg:flex">
      
      {/* ================= SECTION 1: MOBILE BACKGROUND ================= */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[35vh] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SECURITY_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-12 text-white">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1f7d53] p-3 rounded-2xl mb-4 shadow-lg shadow-[#1f7d53]/40"
          >
            <Lock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold font-Eagle tracking-wide drop-shadow-lg">
            Security Check
          </h1>
        </div>
      </div>

      {/* ================= SECTION 2: DESKTOP SIDEBAR ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 hover:scale-105 transition-transform duration-[30s]"
          style={{ backgroundImage: `url(${SECURITY_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="relative z-10 w-full p-16 flex flex-col justify-between h-full text-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#1f7d53] p-1.5 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide font-Eagle">Painters' Diary</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Weekly <br/><span className="text-[#1f7d53]">Verification</span>.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              It's been 7 days since your last login check. Please confirm your identity to continue accessing your private gallery.
            </p>
          </div>
          
          <div className="text-sm text-gray-400 font-medium">
            Protected by Painters' Security
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: FORM CONTENT ================= */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        {/* Mobile Spacer */}
        <div className="h-[28vh] lg:hidden" />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white dark:bg-gray-950 rounded-t-[1.5rem] lg:rounded-none shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] lg:shadow-none p-6 sm:p-10 lg:p-20 flex flex-col justify-center min-h-[60vh]"
        >
          <div className="w-full max-w-md mx-auto">
            
            {/* Mobile Handle */}
            <div className="lg:hidden w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-10" /> 

            <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome Back</h2>
               <p className="text-gray-500 dark:text-gray-400">
                 Please enter your <strong>6-digit PIN</strong> to unlock your session.
               </p>
            </div>

            {/* PIN INPUTS */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="password"
                  maxLength={1}
                  value={digit}
                  disabled={loading}
                  onChange={e => handleInput(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  className={`
                    w-10 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl 
                    bg-gray-50 dark:bg-gray-800 outline-none text-gray-900 dark:text-white transition-all
                    ${error 
                      ? 'border-2 border-red-500 bg-red-50 dark:bg-red-900/10' 
                      : 'border border-gray-200 dark:border-gray-700 focus:border-[#1f7d53] focus:ring-4 focus:ring-[#1f7d53]/20'
                    }
                  `}
                />
              ))}
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-red-500 text-sm font-bold mb-6"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}

            {/* VERIFY BUTTON */}
            <button 
               onClick={() => handleVerify(pin.join(''))}
               disabled={pin.join('').length < 6 || loading}
               className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-[#1f7d53]/30 flex items-center justify-center gap-3 transition-all ${
                 pin.join('').length < 6 || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1f7d53] hover:bg-[#186642]'
               }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Unlock Gallery <ArrowRight size={20} /></>
              )}
            </button>

            {/* FOOTER ACTIONS */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <button className="text-sm text-[#1f7d53] font-bold hover:underline">
                Forgot PIN?
              </button>
              
              <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-2" />
              
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-sm"
              >
                <LogOut size={14} /> Not you? Log Out
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeeklyPinCheck;