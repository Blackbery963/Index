// import React, { useState, useRef, useEffect } from 'react';
// import { HeartIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
// import { motion, AnimatePresence } from 'framer-motion';

// const StoryLikeButton = ({ 
//   storyId, 
//   initialLikes, 
//   initialIsLiked, 
//   onLike, 
//   onReaction,
//   isLiking 
// }) => {
//   const [localLikes, setLocalLikes] = useState(initialLikes);
//   const [localIsLiked, setLocalIsLiked] = useState(initialIsLiked);
//   const [showEmojis, setShowEmojis] = useState(false);
//   const [reaction, setReaction] = useState(null);
//   const touchTimerRef = useRef(null);
//   const hideTimerRef = useRef(null); // For delay on hide
//   const containerRef = useRef(null);

//   const emojis = ['❤️', '🔥', '😍', '👏', '🎉', '🤩'];

//   const handleLikeClick = async () => {
//     if (isLiking) return;
    
//     const result = await onLike(storyId, localLikes, localIsLiked);
//     if (result) {
//       setLocalLikes(result.newLikes);
//       setLocalIsLiked(result.newIsLiked);
//       setReaction('❤️');
//       setTimeout(() => setReaction(null), 800);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (window.innerWidth >= 768) {
//       if (hideTimerRef.current) {
//         clearTimeout(hideTimerRef.current);
//       }
//       setShowEmojis(true);
//     }
//   };

//   const delayHideEmojis = () => {
//     if (window.innerWidth >= 768) {
//       hideTimerRef.current = setTimeout(() => {
//         setShowEmojis(false);
//       }, 150); // Small delay to allow smooth mouse movement to picker
//     }
//   };

//   const handleMouseLeave = (e) => {
//     const relatedTarget = e.relatedTarget;
//     if (window.innerWidth >= 768 && containerRef.current && !containerRef.current.contains(relatedTarget)) {
//       delayHideEmojis();
//     }
//   };

//   const handleTouchStart = () => {
//     touchTimerRef.current = setTimeout(() => {
//       setShowEmojis(true);
//     }, 500); // Reduced from 3000ms to 500ms for better UX
//   };

//   const handleTouchEnd = () => {
//     if (touchTimerRef.current) {
//       clearTimeout(touchTimerRef.current);
//     }
//     if (!showEmojis) {
//       handleLikeClick();
//     }
//   };

//   const handleEmojiSelect = async (emoji) => {
//     setShowEmojis(false);
//     setReaction(emoji);
    
//     const result = await onReaction(storyId, localLikes, emoji);
//     if (result) {
//       setLocalLikes(result.newLikes);
//       setLocalIsLiked(result.newIsLiked);
//     }
//     setTimeout(() => setReaction(null), 800);
//   };

//   // Cleanup timers on unmount
//   useEffect(() => {
//     return () => {
//       if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
//       if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
//     };
//   }, []);

//   return (
//     <div 
//       className="relative" 
//       ref={containerRef}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Main Like Button */}
//       <motion.button
//         className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
//           localIsLiked 
//             ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
//             : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
//         } ${isLiking ? 'opacity-50' : ''}`}
//         onClick={handleLikeClick}
//         onMouseEnter={handleMouseEnter}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//         whileTap={{ scale: 0.95 }}
//       >
//         {localIsLiked ? (
//           <motion.div
//             animate={{ scale: [1, 1.3, 1] }}
//             transition={{ duration: 0.5 }}
//           >
//             <HeartSolid className="w-5 h-5" />
//           </motion.div>
//         ) : (
//           <HeartIcon className="w-5 h-5" />
//         )}
//         <span className="font-medium text-sm min-w-[20px]">
//           {localLikes}
//         </span>
//       </motion.button>

//       {/* Floating Reaction */}
//       <AnimatePresence>
//         {reaction && (
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1, y: -40 }}
//             exit={{ scale: 0, opacity: 0 }}
//             transition={{ duration: 0.6 }}
//             className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl pointer-events-none"
//           >
//             {reaction}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Emoji Picker */}
//       <AnimatePresence>
//         {showEmojis && (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onMouseEnter={() => {
//               if (hideTimerRef.current) {
//                 clearTimeout(hideTimerRef.current);
//               }
//             }}
//             onMouseLeave={delayHideEmojis}
//             className={`absolute bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 p-2 z-50 ${
//               window.innerWidth < 768 
//                 ? 'right-10 bottom-0'  // Position to right on mobile
//                 : 'left-1/2 -translate-x-1/2 bottom-12'  // Center on desktop, closer positioning
//             }`}
//           >
//             <div className="flex gap-1">
//               {emojis.map((emoji) => (
//                 <button
//                   key={emoji}
//                   className="w-8 h-8 text-lg hover:scale-110 transition-transform active:scale-95"
//                   onClick={() => handleEmojiSelect(emoji)}
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default StoryLikeButton;

import React, { useState, useRef, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const StoryLikeButton = ({
  storyId,
  initialLikes,
  onLike,
  onReaction,
  isLiking
}) => {
  const [localLikes, setLocalLikes] = useState(initialLikes);
  const [localIsLiked, setLocalIsLiked] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [reaction, setReaction] = useState(null);

  const touchTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const containerRef = useRef(null);

  const emojis = ['❤️', '🔥', '😍', '👏', '🎉', '🤩'];

  // Load liked stories from localStorage on mount
  useEffect(() => {
    const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
    if (likedStories.includes(storyId)) {
      setLocalIsLiked(true);
    }
  }, [storyId]);

  // Save liked stories whenever like status changes
  const updateLocalStorage = (liked) => {
    let likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
    if (liked) {
      if (!likedStories.includes(storyId)) likedStories.push(storyId);
    } else {
      likedStories = likedStories.filter((id) => id !== storyId);
    }
    localStorage.setItem('likedStories', JSON.stringify(likedStories));
  };

  const handleLikeClick = async () => {
    if (isLiking) return;

    const result = await onLike(storyId, localLikes, localIsLiked);
    if (result) {
      setLocalLikes(result.newLikes);
      setLocalIsLiked(result.newIsLiked);
      updateLocalStorage(result.newIsLiked);
      setReaction(result.newIsLiked ? '❤️' : '💔');
      setTimeout(() => setReaction(null), 800);
    }
  };

  // === Desktop Hover Emoji Picker ===
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setShowEmojis(true);
    }
  };

  const delayHideEmojis = () => {
    if (window.innerWidth >= 768) {
      hideTimerRef.current = setTimeout(() => setShowEmojis(false), 250);
    }
  };

  const handleMouseLeave = (e) => {
    const relatedTarget = e.relatedTarget;
    if (
      window.innerWidth >= 768 &&
      containerRef.current &&
      !containerRef.current.contains(relatedTarget)
    ) {
      delayHideEmojis();
    }
  };

  // === Mobile Long Press Picker ===
  const handleTouchStart = () => {
    touchTimerRef.current = setTimeout(() => {
      setShowEmojis(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    if (!showEmojis) handleLikeClick();
  };

  // === Emoji Reaction ===
  const handleEmojiSelect = async (emoji) => {
    setShowEmojis(false);
    setReaction(emoji);

    const result = await onReaction(storyId, localLikes, emoji);
    if (result) {
      setLocalLikes(result.newLikes);
      setLocalIsLiked(result.newIsLiked);
      updateLocalStorage(true);
    }

    setTimeout(() => setReaction(null), 800);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} onMouseLeave={handleMouseLeave} className="relative">
      {/* Like Button */}
      <motion.button
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
          localIsLiked
            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
        } ${isLiking ? 'opacity-50' : ''}`}
        onClick={handleLikeClick}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        whileTap={{ scale: 0.95 }}
      >
        {localIsLiked ? (
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }}>
            <HeartSolid className="w-5 h-5" />
          </motion.div>
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
        <span className="font-medium text-sm min-w-[20px]">{localLikes}</span>
      </motion.button>

      {/* Floating Reaction Animation */}
      <AnimatePresence>
        {reaction && (
          <motion.div
            key={reaction}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 1.3, opacity: 1, y: -30 }}
            exit={{ scale: 0.8, opacity: 0, y: -60 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl pointer-events-none"
          >
            {reaction}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmojis && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => {
              if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            }}
            onMouseLeave={delayHideEmojis}
            className={`absolute bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 p-2 z-50 ${
              window.innerWidth < 768
                ? 'right-0 bottom-12' // visible on mobile (to right)
                : 'left-1/2 -translate-x-1/2 bottom-12'
            }`}
          >
            <div className="flex gap-1">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  className="w-8 h-8 text-lg hover:scale-110 transition-transform active:scale-95"
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryLikeButton;
