// // // src/components/StoryViewer.jsx
// // import React from 'react';
// // import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
// // import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

// // const StoryViewer = ({ 
// //   users, 
// //   currentUserIndex,
// //   currentStoryIndex,
// //   isOpen, 
// //   onClose, 
// //   onNavigateUser,
// //   onNavigateStory,
// //   onLike,
// //   seenStories,
// //   onMarkAsSeen
// // }) => {
// //   if (!isOpen || !users || users.length === 0) return null;

// //   const currentUser = users[currentUserIndex];
// //   const currentStory = currentUser?.stories[currentStoryIndex];
// //   const totalUsers = users.length;
// //   const totalStoriesInCurrentUser = currentUser?.stories.length || 0;

// //   if (!currentStory) return null;

// //   // Mark as seen when story opens
// //   React.useEffect(() => {
// //     if (currentUser && onMarkAsSeen) {
// //       onMarkAsSeen(currentUser.userId);
// //     }
// //   }, [currentUser, onMarkAsSeen]);

// //   // Get next and previous users for preview
// //   const nextUser = users[(currentUserIndex + 1) % totalUsers];
// //   const prevUser = users[(currentUserIndex - 1 + totalUsers) % totalUsers];

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black/100 backdrop-blur-sm">
// //       {/* Desktop Preview - Next User (Right Side) */}
// //       {nextUser && (
// //         <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20">
// //           <div 
// //             onClick={() => onNavigateUser(1)}
// //             className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
// //           >
// //             <img
// //               src={nextUser.avatar}
// //               alt={nextUser.author}
// //               className="w-full h-full object-cover"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
// //             <div className="absolute bottom-1 left-1 right-1 text-white text-xs text-center truncate">
// //               {nextUser.author}
// //             </div>
// //             {!seenStories?.has(nextUser.userId) && (
// //               <div className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
// //             )}
// //           </div>
// //           <div className="text-white text-xs text-center mt-2 opacity-70">
// //             Next
// //           </div>
// //         </div>
// //       )}

// //       {/* Desktop Preview - Previous User (Left Side) */}
// //       {prevUser && (
// //         <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20">
// //           <div 
// //             onClick={() => onNavigateUser(-1)}
// //             className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
// //           >
// //             <img
// //               src={prevUser.avatar}
// //               alt={prevUser.author}
// //               className="w-full h-full object-cover"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
// //             <div className="absolute bottom-1 left-1 right-1 text-white text-xs text-center truncate">
// //               {prevUser.author}
// //             </div>
// //             {seenStories?.has(prevUser.userId) && (
// //               <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
// //             )}
// //           </div>
// //           <div className="text-white text-xs text-center mt-2 opacity-70">
// //             Previous
// //           </div>
// //         </div>
// //       )}

// //       {/* Mobile Preview - Bottom Bar */}
// //       <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
// //         <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-2xl p-2">
// //           {users.slice(0, 5).map((user, index) => (
// //             <div
// //               key={user.userId}
// //               onClick={() => onNavigateUser(index - currentUserIndex)}
// //               className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110 ${
// //                 index === currentUserIndex 
// //                   ? 'border-white scale-110' 
// //                   : !seenStories?.has(user.userId) 
// //                   ? 'border-indigo-500' 
// //                   : 'border-gray-400'
// //               }`}
// //             >
// //               <img
// //                 src={user.avatar}
// //                 alt={user.author}
// //                 className="w-full h-full rounded-full object-cover"
// //               />
// //             </div>
// //           ))}
// //           {users.length > 5 && (
// //             <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">
// //               +{users.length - 5}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Main Story Container */}
// //       <div className="flex items-center justify-center h-full py-4">
// //         <div className="bg-white dark:bg-gray-800 rounded-sm max-w-2xl w-full mx-auto shadow-2xl h-[85vh] flex flex-col">
// //           {/* User Progress Bars */}
// //           {totalStoriesInCurrentUser > 1 && (
// //             <div className="flex gap-1 p-3">
// //               {currentUser.stories.map((_, index) => (
// //                 <div
// //                   key={index}
// //                   className={`flex-1 h-1 rounded-full transition-all duration-300 ${
// //                     index === currentStoryIndex 
// //                       ? 'bg-indigo-600' 
// //                       : index < currentStoryIndex 
// //                       ? 'bg-green-500'
// //                       : 'bg-gray-300 dark:bg-gray-600'
// //                   }`}
// //                 />
// //               ))}
// //             </div>
// //           )}

// //           {/* Header */}
// //           <div className="flex items-center gap-3 p-4">
// //             <img
// //               src={currentUser.avatar}
// //               alt={currentUser.author}
// //               className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
// //             />
// //             <div className="flex-1">
// //               <div className="font-medium text-gray-900 dark:text-white">
// //                 {currentUser.author}
// //               </div>
// //               <div className="text-xs text-gray-500 dark:text-gray-400">
// //                 {currentStory.era}
// //               </div>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
// //             >
// //               <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
// //             </button>
// //           </div>

// //           {/* Main Content */}
// //           <div className="flex-1 relative min-h-0">
// //             {/* Navigation between stories */}
// //             {totalStoriesInCurrentUser > 1 && (
// //               <>
// //                 <button
// //                   onClick={() => onNavigateStory(-1)}
// //                   disabled={currentStoryIndex === 0}
// //                   className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
// //                 >
// //                   <ChevronLeftIcon className="w-4 h-4" />
// //                 </button>

// //                 <button
// //                   onClick={() => onNavigateStory(1)}
// //                   disabled={currentStoryIndex === totalStoriesInCurrentUser - 1}
// //                   className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
// //                 >
// //                   <ChevronRightIcon className="w-4 h-4" />
// //                 </button>
// //               </>
// //             )}

// //             {/* Media */}
// //             {currentStory.mediaType === 'video' ? (
// //               <video
// //                 src={currentStory.mediaUrl}
// //                 className="w-full h-full object-contain"
// //                 controls
// //                 autoPlay
// //                 muted
// //               />
// //             ) : (
// //               <img
// //                 src={currentStory.coverImage}
// //                 alt={currentStory.title}
// //                 className="w-full h-full object-contain"
// //               />
// //             )}
// //           </div>

// //           {/* Footer */}
// //           <div className="p-4 border-t border-gray-200 dark:border-gray-700">
// //             <div className="flex items-start justify-between mb-3">
// //               <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
// //                 {currentStory.title}
// //               </h3>
// //               <button 
// //                 onClick={() => onLike(currentStory.$id)}
// //                 className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex-shrink-0"
// //               >
// //                 {currentStory.isLiked ? (
// //                   <HeartSolid className="w-5 h-5 text-red-500" />
// //                 ) : (
// //                   <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
// //                 )}
// //                 <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
// //                   {currentStory.likes}
// //                 </span>
// //               </button>
// //             </div>

// //             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic mb-2">
// //               {currentStory.poeticTeaser}
// //             </p>

// //             <div className="text-xs text-gray-500 dark:text-gray-400">
// //               {currentStoryIndex + 1} of {totalStoriesInCurrentUser} • {currentUserIndex + 1} of {totalUsers} users
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Navigation Arrows for Mobile */}
// //       {totalUsers > 1 && (
// //         <>
// //           <button
// //             onClick={() => onNavigateUser(-1)}
// //             disabled={currentUserIndex === 0}
// //             className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50 md:hidden"
// //           >
// //             <ChevronLeftIcon className="w-6 h-6" />
// //           </button>

// //           <button
// //             onClick={() => onNavigateUser(1)}
// //             disabled={currentUserIndex === totalUsers - 1}
// //             className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50 md:hidden"
// //           >
// //             <ChevronRightIcon className="w-6 h-6" />
// //           </button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default StoryViewer;

// src/components/StoryViewer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import StoryLikeButton from './StoryLikeButton';
import { useStoryLikes } from '../hooks/useStoryLikes';

const StoryViewer = ({ 
  users, 
  currentUserIndex,
  currentStoryIndex,
  isOpen, 
  onClose, 
  onNavigateUser,
  onNavigateStory,
  onLike,
  seenStories,
  onMarkAsSeen
}) => {
  // ALL HOOKS AT THE TOP
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [direction, setDirection] = useState(null);
  const containerRef = useRef(null);
  const { toggleLike, addReaction, likingStories } = useStoryLikes();



  // Mark as seen when story opens
  useEffect(() => {
    if (isOpen && currentUserIndex !== null && users && users[currentUserIndex]) {
      const currentUser = users[currentUserIndex];
      if (currentUser && onMarkAsSeen) {
        onMarkAsSeen(currentUser.userId);
      }
    }
  }, [isOpen, currentUserIndex, users, onMarkAsSeen]);

  // Now safe to do conditional returns
  if (!isOpen || !users || users.length === 0) return null;

  const currentUser = users[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const totalUsers = users.length;
  const totalStoriesInCurrentUser = currentUser?.stories.length || 0;

  if (!currentStory) return null;

  // Improved swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setDirection(null);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // Minimum swipe distance
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      setDirection(isLeftSwipe ? 'next' : 'prev');
      if (isLeftSwipe) {
        // Next story or next user
        if (currentStoryIndex < totalStoriesInCurrentUser - 1) {
          onNavigateStory(1);
        } else if (currentUserIndex < totalUsers - 1) {
          onNavigateUser(1);
          onNavigateStory(-currentStoryIndex); // Reset to first story
        }
      } else {
        // Previous story or previous user
        if (currentStoryIndex > 0) {
          onNavigateStory(-1);
        } else if (currentUserIndex > 0) {
          const prevUser = users[currentUserIndex - 1];
          const prevUserStoriesCount = prevUser?.stories.length || 0;
          onNavigateUser(-1);
          onNavigateStory(prevUserStoriesCount - 1); // Go to last story of previous user
        }
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Click handlers for mobile
  const handleClick = (e) => {
    if (window.innerWidth >= 768) return;
    
    const clickX = e.clientX;
    const containerWidth = containerRef.current?.clientWidth || 0;
    
    if (clickX < containerWidth / 3) {
      // Left click - previous
      setDirection('prev');
      if (currentStoryIndex > 0) {
        onNavigateStory(-1);
      } else if (currentUserIndex > 0) {
        const prevUser = users[currentUserIndex - 1];
        const prevUserStoriesCount = prevUser?.stories.length || 0;
        onNavigateUser(-1);
        onNavigateStory(prevUserStoriesCount - 1);
      }
    } else if (clickX > (containerWidth * 2) / 3) {
      // Right click - next
      setDirection('next');
      if (currentStoryIndex < totalStoriesInCurrentUser - 1) {
        onNavigateStory(1);
      } else if (currentUserIndex < totalUsers - 1) {
        onNavigateUser(1);
        onNavigateStory(-currentStoryIndex);
      }
    }
  };

  // Get next and previous users for desktop preview
  const nextUser = users[(currentUserIndex + 1) % totalUsers];
  const prevUser = users[(currentUserIndex - 1 + totalUsers) % totalUsers];

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir === 'next' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: (dir) => ({
      x: dir === 'next' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    })
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/100 backdrop-blur-sm">
      {/* Desktop Preview - Next User (Right Side) */}
      {nextUser && (
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <div 
            onClick={() => {
              setDirection('next');
              onNavigateUser(1);
              onNavigateStory(-currentStoryIndex);
            }}
            className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <img
              src={nextUser.avatar}
              alt={nextUser.author}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-1 left-1 right-1 text-white text-xs text-center truncate">
              {nextUser.author}
            </div>
            {!seenStories?.has(nextUser.userId) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
            )}
          </div>
          <div className="text-white text-xs text-center mt-2 opacity-70">
            Next
          </div>
        </div>
      )}

      {/* Desktop Preview - Previous User (Left Side) */}
      {prevUser && (
        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20">
          <div 
            onClick={() => {
              setDirection('prev');
              const prevUserStoriesCount = prevUser?.stories.length || 0;
              onNavigateUser(-1);
              onNavigateStory(prevUserStoriesCount - 1);
            }}
            className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <img
              src={prevUser.avatar}
              alt={prevUser.author}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-1 left-1 right-1 text-white text-xs text-center truncate">
              {prevUser.author}
            </div>
            {seenStories?.has(prevUser.userId) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
          <div className="text-white text-xs text-center mt-2 opacity-70">
            Previous
          </div>
        </div>
      )}

      {/* Mobile Preview - Bottom Bar */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-2xl p-2">
          {users.slice(0, 5).map((user, index) => (
            <div
              key={user.userId}
              onClick={() => {
                const newDirection = index > currentUserIndex ? 'next' : 'prev';
                setDirection(newDirection);
                onNavigateUser(index - currentUserIndex);
                onNavigateStory(-currentStoryIndex);
              }}
              className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                index === currentUserIndex 
                  ? 'border-white scale-110' 
                  : !seenStories?.has(user.userId) 
                  ? 'border-indigo-500' 
                  : 'border-gray-400'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.author}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ))}
          {users.length > 5 && (
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">
              +{users.length - 5}
            </div>
          )}
        </div>
      </div>

      {/* Main Story Container */}
      <div 
        ref={containerRef}
        className="flex items-center justify-center h-full py-4 px-1 "
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-white dark:bg-gray-800 rounded-sm max-w-2xl w-full mx-auto shadow-2xl h-[85vh] flex flex-col">
          {/* User Progress Bars */}
          {totalStoriesInCurrentUser > 1 && (
            <div className="flex gap-1 p-3">
              {currentUser.stories.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                    index === currentStoryIndex 
                      ? 'bg-indigo-600' 
                      : index < currentStoryIndex 
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-3 p-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.author}
              className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {currentUser.author}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {currentStory.era}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            </button>
          </div>

          {/* Main Content with Animation */}
          <div className="flex-1 relative min-h-0 cursor-pointer overflow-hidden">
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:block">
              {(currentStoryIndex > 0 || currentUserIndex > 0) && (
                <button
                  onClick={() => {
                    setDirection('prev');
                    if (currentStoryIndex > 0) {
                      onNavigateStory(-1);
                    } else {
                      const prevUser = users[currentUserIndex - 1];
                      const prevUserStoriesCount = prevUser?.stories.length || 0;
                      onNavigateUser(-1);
                      onNavigateStory(prevUserStoriesCount - 1);
                    }
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
              )}
              {(currentStoryIndex < totalStoriesInCurrentUser - 1 || currentUserIndex < totalUsers - 1) && (
                <button
                  onClick={() => {
                    setDirection('next');
                    if (currentStoryIndex < totalStoriesInCurrentUser - 1) {
                      onNavigateStory(1);
                    } else {
                      onNavigateUser(1);
                      onNavigateStory(-currentStoryIndex);
                    }
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Animated Content */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`${currentUserIndex}-${currentStoryIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full flex items-center justify-center absolute top-0 left-0"
              >
                {currentStory.mediaType === 'video' ? (
                  <video
                    src={currentStory.mediaUrl}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                  />
                ) : (
                  <img
                    src={currentStory.coverImage}
                    alt={currentStory.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Mobile Swipe Hint */}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {/* <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
                {currentStory.title}
              </h3>
              <button 
                onClick={() => onLike(currentStory.$id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex-shrink-0"
              >
                {currentStory.isLiked ? (
                  <HeartSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                  {currentStory.likes}
                </span>
              </button>
            </div> */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
              {currentStory.title}
              </h3>
              <div className="group">
              <StoryLikeButton
                storyId={currentStory.$id}
                initialLikes={currentStory.likes || 0}
                initialIsLiked={currentStory.isLiked || false}
                onLike={toggleLike}
                onReaction={addReaction}
                isLiking={likingStories.has(currentStory.$id)}
              />
              </div>
            </div>


            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic mb-2">
              {currentStory.poeticTeaser}
            </p>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              {currentStoryIndex + 1} of {totalStoriesInCurrentUser} • {currentUserIndex + 1} of {totalUsers} users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;