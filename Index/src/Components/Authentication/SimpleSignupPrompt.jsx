// import React, { useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import { X, Sparkles, Lock, Unlock, Star, Zap, Palette } from 'lucide-react';

// const CuriosityTeaser = () => {
//   const { isAuthenticated, showTeaser, previewFeatures } = useAuth();
//   const [visible, setVisible] = useState(false);
//   const [currentHint, setCurrentHint] = useState(0);

//   const hints = [
//     "🎨 There's a whole studio waiting for you...",
//     "✨ Imagine what you could create with AI magic",
//     "🌟 Your personal art gallery is just one click away",
//     "🚀 Premium tools that make art creation effortless",
//     "💫 Filters that transform your artwork instantly"
//   ];

//   useEffect(() => {
//     if (showTeaser && !isAuthenticated) {
//       setVisible(true);
//       const hintInterval = setInterval(() => {
//         setCurrentHint((prev) => (prev + 1) % hints.length);
//       }, 3000);
//       return () => clearInterval(hintInterval);
//     }
//   }, [showTeaser, isAuthenticated]);

//   if (!visible || isAuthenticated) return null;

//   return (
//     <div className="fixed bottom-6 right-6 z-40 animate-float">
//       <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4 rounded-2xl shadow-2xl max-w-sm border border-white/20 backdrop-blur-sm">
//         <div className="flex items-start gap-3">
//           <Sparkles className="flex-shrink-0 mt-1" size={20} />
//           <div className="flex-1">
//             <p className="font-semibold mb-1">Curious About the Magic? ✨</p>
//             <p className="text-sm text-white/90 mb-2 min-h-[40px] flex items-center">
//               {hints[currentHint]}
//             </p>
//             <div className="flex gap-2">
//               <button 
//                 onClick={() => window.location.href = '/signup'}
//                 className="flex-1 bg-white text-purple-600 py-2 px-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
//               >
//                 Show Me!
//               </button>
//               <button 
//                 onClick={() => setVisible(false)}
//                 className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeatureUnlockExperience = () => {
//   const { isAuthenticated, showUnlock, previewFeatures } = useAuth();
//   const [currentFeature, setCurrentFeature] = useState(0);
//   const [revealed, setRevealed] = useState(false);

//   useEffect(() => {
//     if (showUnlock && !isAuthenticated) {
//       const featureInterval = setInterval(() => {
//         setCurrentFeature((prev) => {
//           if (prev < previewFeatures.length - 1) return prev + 1;
//           setRevealed(true);
//           return prev;
//         });
//       }, 800);
      
//       return () => clearInterval(featureInterval);
//     }
//   }, [showUnlock, isAuthenticated, previewFeatures]);

//   if (!showUnlock || isAuthenticated) return null;

//   return (
//     <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
//       <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 max-w-2xl w-full text-center shadow-2xl">
//         {/* Animated Header */}
//         <div className="flex items-center justify-center gap-3 mb-6">
//           <Lock className="text-yellow-400" size={24} />
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//             Unlock Your Creative Potential
//           </h2>
//           <Unlock className="text-yellow-400" size={24} />
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
//           <div 
//             className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-800"
//             style={{ width: `${((currentFeature + 1) / previewFeatures.length) * 100}%` }}
//           ></div>
//         </div>

//         {/* Feature Reveal Animation */}
//         <div className="min-h-[200px] flex items-center justify-center mb-6">
//           {!revealed ? (
//             <div className="text-center">
//               <Zap className="mx-auto mb-4 text-yellow-400 animate-pulse" size={48} />
//               <p className="text-xl text-gray-300 mb-2">Unlocking Feature...</p>
//               <p className="text-2xl font-bold text-white animate-pulse">
//                 {previewFeatures[currentFeature]}
//               </p>
//             </div>
//           ) : (
//             <div className="text-center">
//               <Star className="mx-auto mb-4 text-yellow-400 animate-bounce" size={48} />
//               <p className="text-2xl font-bold text-white mb-2">🎉 All Features Unlocked!</p>
//               <p className="text-gray-300">Your creative journey begins now</p>
//             </div>
//           )}
//         </div>

//         {/* Feature Grid */}
//         {revealed && (
//           <div className="grid grid-cols-2 gap-3 mb-8">
//             {previewFeatures.map((feature, index) => (
//               <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 text-left">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span className="text-white text-sm">{feature}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="space-y-4">
//           <button
//             onClick={() => window.location.href = '/signup'}
//             className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
//           >
//             <Palette size={20} />
//             Start Creating Now - It's Free!
//             <Sparkles size={20} />
//           </button>
          
//           <p className="text-gray-400 text-sm">
//             Join thousands of artists already creating magic ✨
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MiniPreviewOverlay = () => {
//   const { isAuthenticated } = useAuth();
//   const [showPreview, setShowPreview] = useState(false);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       const timer = setTimeout(() => setShowPreview(true), 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [isAuthenticated]);

//   if (!showPreview || isAuthenticated) return null;

//   return (
//     <div className="fixed top-4 right-4 z-30">
//       <div className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-xl border border-white/20">
//         <div className="flex items-center gap-2 text-sm">
//           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//           <span>Artists Online: 1.2k+</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main export that combines all components
// export const CreativeAuthExperience = () => {
//   return (
//     <>
//       <CuriosityTeaser />
//       <FeatureUnlockExperience />
//       <MiniPreviewOverlay />
//     </>
//   );
// };

// export default CreativeAuthExperience;

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ArrowRight, UserPlus, ShieldAlert, Activity } from 'lucide-react';

const AuthWall = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4); // 4 Second Countdown
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/login', '/signup', '/landing'];

  useEffect(() => {
    if (loading || isAuthenticated || publicRoutes.includes(location.pathname)) {
      setIsLocked(false);
      return;
    }

    // Countdown Timer logic
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsLocked(true); // LOCK THE SCREEN
          document.body.style.overflow = 'hidden';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [isAuthenticated, loading, location]);

  if (!isLocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }} // Heavy blur to block content
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-full max-w-md p-4"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden relative group">
            
            {/* 1. PSYCHOLOGICAL TRIGGER: "Access Denied" Header */}
            <div className="bg-red-500/10 border-b border-red-500/20 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Guest Preview Ended</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 Session Closed
              </div>
            </div>

            <div className="p-8">
              
              {/* 2. THE "TEASER" (What they are missing) */}
              <div className="relative mb-8 bg-zinc-950 rounded-xl p-4 border border-zinc-800/50">
                 {/* Blurred content simulation */}
                 <div className="flex items-center gap-4 filter blur-[6px] opacity-50 select-none">
                    <div className="w-12 h-12 bg-zinc-700 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                       <div className="h-3 bg-zinc-700 rounded w-3/4"></div>
                       <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                    </div>
                 </div>
                 
                 {/* The Lock Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-zinc-800 p-3 rounded-full shadow-lg border border-zinc-700 group-hover:scale-110 transition-transform duration-300">
                       <Lock className="text-white w-5 h-5" />
                    </div>
                 </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Continue your discovery?
                </h2>
                <p className="text-zinc-400 text-sm mb-6">
                  You've hit the limit for unregistered guests. <br/>
                  <span className="text-zinc-300 font-medium">Create a free account to unlock full profiles and save your history.</span>
                </p>

                {/* 3. SOCIAL PROOF (Fear of Missing Out) */}
                <div className="flex items-center justify-center gap-2 mb-6 text-xs font-medium text-emerald-400 bg-emerald-400/10 py-1.5 px-3 rounded-full w-fit mx-auto">
                   <Activity size={14} />
                   <span>128 artists are active right now</span>
                </div>
                {/* 4. USER REVIEWS */}
<div className="mt-8 mb-6">

  <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wide">
    What artists say
  </p>

  <div className="space-y-4">
     
     {/* Review 1 */}
     <div className="flex items-start gap-3 bg-zinc-800/40 p-3 rounded-xl border border-zinc-700/40">
        <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-white font-bold">
           R
        </div>
        <div>
          <p className="text-zinc-300 text-sm">
            “I uploaded my first artwork and got 42 views within a day.”
          </p>
          <p className="text-xs text-zinc-500 mt-1">— Riya, Digital Artist</p>
        </div>
     </div>

     {/* Review 2 */}
     <div className="flex items-start gap-3 bg-zinc-800/40 p-3 rounded-xl border border-zinc-700/40">
        <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-white font-bold">
           A
        </div>
        <div>
          <p className="text-zinc-300 text-sm">
            “The feedback from this community improved my portraits a lot.”
          </p>
          <p className="text-xs text-zinc-500 mt-1">— Arjun, Portrait Artist</p>
        </div>
     </div>

     {/* Review 3 */}
     <div className="flex items-start gap-3 bg-zinc-800/40 p-3 rounded-xl border border-zinc-700/40">
        <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-white font-bold">
           M
        </div>
        <div>
          <p className="text-zinc-300 text-sm">
            “Painters’ Diary gave my art a genuine audience. Love it!”
          </p>
          <p className="text-xs text-zinc-500 mt-1">— Mehul, Concept Artist</p>
        </div>
     </div>

  </div>
</div>


                {/* Buttons */}
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full py-3.5 px-6 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mb-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  <UserPlus size={18} />
                  Restore Access - Sign Up Free
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 px-6 text-zinc-500 hover:text-white text-sm font-medium transition-colors"
                >
                  I already have an account
                </button>
              </div>
            </div>

            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthWall;