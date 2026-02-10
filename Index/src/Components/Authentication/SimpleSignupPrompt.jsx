import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, UserCheck, X } from 'lucide-react';

const AuthWall = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showWall, setShowWall] = useState(false);
  const [mode, setMode] = useState(null); // 'soft' | 'hard' | null
  
  const navigate = useNavigate();
  const location = useLocation();

  // --- CONFIGURATION ---
  const SOFT_LIMIT = 30; // Seconds
  const HARD_LIMIT = 120; // Seconds
  const SAFE_ROUTES = ['/login', '/signup', '/verify', '/reset-password', '/landing', '/Authentication/Verification/EmailVerification'];

  // --- PERSISTENT TIMER LOGIC ---
  useEffect(() => {
    // 1. Check if we should even run the timer
    const isSafeRoute = SAFE_ROUTES.some(route => location.pathname.toLowerCase().startsWith(route.toLowerCase()));
    
    if (loading || isAuthenticated || isSafeRoute) {
      setShowWall(false);
      return;
    }

    // 2. Initialize or Get Session Start Time from LocalStorage
    let startTime = localStorage.getItem('guest_session_start');
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem('guest_session_start', startTime);
    }

    // 3. The Heartbeat Timer
    const checkTime = () => {
      const elapsedSeconds = (Date.now() - parseInt(startTime, 10)) / 1000;

      if (elapsedSeconds >= HARD_LIMIT) {
        setMode('hard');
        setShowWall(true);
      } else if (elapsedSeconds >= SOFT_LIMIT) {
        // Only show soft wall if we haven't dismissed it in this specific session instance
        // (Optional: you could persist dismissal too, but usually soft wall shows once per load is fine)
        if (mode !== 'dismissed' && mode !== 'hard') {
          setMode('soft');
          setShowWall(true);
        }
      }
    };

    // Run immediately and then interval
    checkTime();
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, loading, location, mode]);

  const handleDismissSoft = () => {
    setMode('dismissed');
    setShowWall(false);
  };

  if (!showWall || !mode || mode === 'dismissed') return null;

  const isHard = mode === 'hard';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${
          isHard 
            ? "bg-zinc-950/95 backdrop-blur-lg" // Hard: Opaque, blocks everything
            : "bg-black/40 backdrop-blur-sm"    // Soft: See-through, gentle
        }`}
      >
        <motion.div
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-md relative"
        >
          {/* Close button for Soft Wall Only */}
          {!isHard && (
            <button 
              onClick={handleDismissSoft}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              Close <X size={20} />
            </button>
          )}

          <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-xl overflow-hidden">
            
            {/* --- VISUAL HEADER --- */}
            <div className="relative h-48 overflow-hidden">
              {/* Blurred abstract art background represents "hidden value" */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb39279c38?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center filter blur-md scale-110 opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-semibold text-white mb-4">
                  {isHard ? <Lock size={12} /> : <UserCheck size={12} />}
                  <span>{isHard ? "Limit Reached" : "Guest Preview"}</span>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight leading-none">
                  {isHard ? "Join the inner circle." : "Don't lose your inspiration."}
                </h2>
              </div>
            </div>

            {/* --- CONTENT BODY --- */}
            <div className="p-8 pt-4">
              <p className="text-zinc-400 text-base leading-relaxed mb-8">
                {isHard 
                  ? "You've explored as a guest, but the real experience happens inside. Join thousands of artists tracking their journey."
                  : "You're browsing as a guest. Create a free account now to save your favorite pieces and track your creative progress."
                }
              </p>

              {/* --- ACTION BUTTONS --- */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/signup')}
                  className="group w-full py-4 bg-white text-black rounded-xl font-bold text-base hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Create Free Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-4 bg-zinc-800 text-zinc-300 rounded-xl font-semibold text-sm hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700"
                >
                  Already have an account? Log In
                </button>
              </div>

              {/* --- FOOTER TRUST SIGNAL --- */}
              <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
                <p className="text-xs text-zinc-500">
                  Join a community of <span className="text-zinc-300">creators & dreamers</span>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthWall;