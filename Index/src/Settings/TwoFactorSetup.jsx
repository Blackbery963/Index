import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Mail, Lock, CheckCircle, 
  KeyRound, ArrowRight, ChevronLeft, Fingerprint, Sparkles 
} from 'lucide-react';

// Use the same image or a specific security-themed one
// For now using a placeholder that matches the artistic vibe
const SECURITY_BG = "https://images.pexels.com/photos/792034/pexels-photo-792034.jpeg";

const TwoFactorSetup = ({ onComplete }) => {
  // Steps: 0: Intro, 1: Email, 2: Create PIN, 3: Confirm PIN, 4: Success
  const [step, setStep] = useState(0); 
  
  const [emailCode, setEmailCode] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const inputRefs = useRef([]);

  // --- Logic Helpers ---
  const handleInput = (index, value, setter, currentValues) => {
    if (isNaN(value)) return;
    const newValues = [...currentValues];
    newValues[index] = value;
    setter(newValues);
    setError('');
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if(nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e, currentValues) => {
    if (e.key === 'Backspace' && !currentValues[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`);
      if(prevInput) prevInput.focus();
    }
  };

  // --- Actions ---
  const handleNextStep = (nextStep) => {
    setLoading(true);
    // Mock API delay to feel like "Processing"
    setTimeout(() => {
      setLoading(false);
      setStep(nextStep);
    }, 600);
  };

  const handleConfirmPin = () => {
    const p1 = pin.join('');
    const p2 = confirmPin.join('');

    if (p1 === p2 && p1.length === 6) {
      console.log("PIN Saved:", p1);
      handleNextStep(4);
    } else {
      setError("PINs do not match or are incomplete.");
      setConfirmPin(['', '', '', '', '', '']);
      document.getElementById('pin-input-0')?.focus();
    }
  };

  // --- Animation Variants ---
  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-['Quicksand'] relative overflow-x-hidden lg:overflow-hidden lg:flex">
      
      {/* ==============================================
          SECTION 1: MOBILE BACKGROUND (lg:hidden)
         ============================================== */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[35vh] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SECURITY_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-12 text-white">
          <div className="bg-[#1f7d53] p-2 rounded-xl mb-3 shadow-lg shadow-[#1f7d53]/40">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-Eagle tracking-wide shadow-black drop-shadow-lg">
            Security Checkup
          </h1>
        </div>
      </div>

      {/* ==============================================
          SECTION 2: DESKTOP SIDEBAR (hidden lg:flex)
         ============================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[20s] hover:scale-105"
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
              Protect your <span className="text-[#1f7d53]">Masterpieces</span>.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Enable Two-Factor Authentication to add an unbreakable layer of security to your artwork and personal data.
            </p>
          </div>
          
          <div className="flex gap-6 text-xs text-gray-400 font-semibold tracking-wider uppercase">
             <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#1f7d53]" /> Encrypted</div>
             <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#1f7d53]" /> Private</div>
          </div>
        </div>
      </div>

      {/* ==============================================
          SECTION 3: WIZARD CONTENT
         ============================================== */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        {/* Mobile Spacer */}
        <div className="h-[28vh] lg:hidden" />

        <div className="flex-1 bg-white dark:bg-gray-950 rounded-t-[1.5rem] lg:rounded-none shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] lg:shadow-none p-6 sm:p-10 lg:p-20 flex flex-col justify-center min-h-[60vh]">
          
          {/* Back Button (If step > 0) */}
          {step > 0 && step < 4 && (
            <button 
              onClick={() => setStep(step - 1)} 
              className="absolute top-8 left-6 lg:left-20 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </button>
          )}

          <div className="w-full max-w-lg mx-auto">
            
            {/* Mobile Handle */}
            <div className="lg:hidden w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-8" /> 

            {/* --- ANIMATED CONTENT AREA --- */}
            <AnimatePresence mode='wait'>
              
              {/* === STEP 0: INTRO === */}
              {step === 0 && (
                <motion.div key="intro" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                   <div className="text-center lg:text-left mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Enable 2FA</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Secure your account with a <strong>Weekly PIN</strong>. Even if your password is stolen, your art remains safe.
                      </p>
                   </div>

                   <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 mb-8 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-[#1f7d53]">
                          <Fingerprint size={24} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-gray-900 dark:text-white">Weekly PIN Check</h4>
                          <p className="text-xs text-gray-500">Activates every 7 days</p>
                        </div>
                      </div>
                      
                      {/* TOGGLE BUTTON */}
                      <button 
                        onClick={() => handleNextStep(1)}
                        className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none group"
                      >
                        <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 group-hover:scale-95 group-active:scale-90" />
                      </button>
                   </div>

                   <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl text-sm flex gap-3">
                      <Sparkles className="shrink-0 w-5 h-5" />
                      <p>Turning this on will immediately ask you to verify your email and set your unique PIN.</p>
                   </div>
                </motion.div>
              )}

              {/* === STEP 1: EMAIL VERIFY === */}
              {step === 1 && (
                <motion.div key="email" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                   <div className="text-center mb-10">
                      <div className="w-16 h-16 bg-[#1f7d53]/10 text-[#1f7d53] rounded-2xl flex items-center justify-center mx-auto mb-6">
                         <Mail size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check your Inbox</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        We sent a verification code to <br/> <span className="text-gray-900 dark:text-white font-semibold">user@example.com</span>
                      </p>
                   </div>

                   <div className="mb-8">
                     <input 
                       autoFocus
                       type="text" 
                       maxLength={6}
                       value={emailCode}
                       onChange={(e) => setEmailCode(e.target.value)}
                       placeholder="000000"
                       className="block w-full text-center text-4xl font-bold tracking-[0.5em] py-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200"
                     />
                   </div>

                   <button 
                      onClick={() => handleNextStep(2)}
                      disabled={emailCode.length < 6 || loading}
                      className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-[#1f7d53]/30 flex items-center justify-center gap-3 transition-all ${
                        emailCode.length < 6 || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1f7d53] hover:bg-[#186642]'
                      }`}
                   >
                     {loading ? "Verifying..." : "Verify Code"} <ArrowRight size={20} />
                   </button>
                </motion.div>
              )}

              {/* === STEP 2: SET PIN === */}
              {step === 2 && (
                <motion.div key="set-pin" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                   <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#1f7d53]/10 text-[#1f7d53] rounded-2xl flex items-center justify-center mx-auto mb-6">
                         <KeyRound size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create PIN</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Set a 6-digit PIN. Do not use generic numbers like 123456.
                      </p>
                   </div>

                   <div className="flex justify-center gap-2 sm:gap-4 mb-8">
                      {pin.map((digit, index) => (
                        <input
                          key={index}
                          id={`pin-input-${index}`}
                          type="password"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleInput(index, e.target.value, setPin, pin)}
                          onKeyDown={e => handleKeyDown(index, e, pin)}
                          className="w-10 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-[#1f7d53] focus:ring-4 focus:ring-[#1f7d53]/20 outline-none text-gray-900 dark:text-white transition-all"
                        />
                      ))}
                   </div>

                   <button 
                      onClick={() => handleNextStep(3)}
                      disabled={pin.join('').length < 6 || loading}
                      className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-[#1f7d53]/30 flex items-center justify-center gap-3 transition-all ${
                        pin.join('').length < 6 || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1f7d53] hover:bg-[#186642]'
                      }`}
                   >
                     Continue <ArrowRight size={20} />
                   </button>
                </motion.div>
              )}

              {/* === STEP 3: CONFIRM PIN === */}
              {step === 3 && (
                <motion.div key="confirm-pin" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                   <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#1f7d53]/10 text-[#1f7d53] rounded-2xl flex items-center justify-center mx-auto mb-6">
                         <Lock size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Confirm PIN</h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Re-enter your PIN to confirm accuracy.
                      </p>
                   </div>

                   <div className="flex justify-center gap-2 sm:gap-4 mb-4">
                      {confirmPin.map((digit, index) => (
                        <input
                          key={index}
                          id={`pin-input-${index}`}
                          type="password"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleInput(index, e.target.value, setConfirmPin, confirmPin)}
                          onKeyDown={e => handleKeyDown(index, e, confirmPin)}
                          className={`w-10 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl bg-gray-50 dark:bg-gray-800 outline-none text-gray-900 dark:text-white transition-all
                            ${error ? 'border-red-500 border-2' : 'border border-gray-200 dark:border-gray-700 focus:border-[#1f7d53] focus:ring-4 focus:ring-[#1f7d53]/20'}
                          `}
                        />
                      ))}
                   </div>

                   {error && <p className="text-red-500 text-sm text-center font-bold mb-6">{error}</p>}

                   <button 
                      onClick={handleConfirmPin}
                      disabled={confirmPin.join('').length < 6 || loading}
                      className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-[#1f7d53]/30 flex items-center justify-center gap-3 transition-all ${
                        confirmPin.join('').length < 6 || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1f7d53] hover:bg-[#186642]'
                      }`}
                   >
                     {loading ? "Activating..." : "Confirm & Activate"}
                   </button>
                </motion.div>
              )}

              {/* === STEP 4: SUCCESS === */}
              {step === 4 && (
                <motion.div key="success" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                   <div className="relative inline-block mb-8 mt-4">
                      <div className="absolute inset-0 bg-[#1f7d53] blur-3xl opacity-20 rounded-full" />
                      <div className="relative w-24 h-24 bg-[#1f7d53]/10 text-[#1f7d53] rounded-full flex items-center justify-center">
                        <CheckCircle size={48} strokeWidth={2.5} />
                      </div>
                   </div>
                   
                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                     You're Protected!
                   </h2>
                   <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xs mx-auto leading-relaxed">
                     Two-Factor Authentication is active. Your first Weekly Check will occur in <span className="font-bold text-[#1f7d53]">7 days</span>.
                   </p>

                   <button 
                     onClick={onComplete}
                     className="px-10 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                   >
                     Done
                   </button>
                </motion.div>
              )}

            </AnimatePresence>
            
            {/* Extra bottom spacing for mobile */}
            <div className="h-8 lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetup;