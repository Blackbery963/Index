// // src/components/StoryViewer.jsx
// import React from 'react';
// import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

// const StoryViewer = ({ 
//   story, 
//   isOpen, 
//   onClose, 
//   onNavigate, 
//   currentIndex, 
//   totalStories,
//   onLike 
// }) => {
//   if (!isOpen || !story) return null;

//   const timeLeft = Math.max(0, new Date(story.expiresAt) - new Date());
//   const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform scale-100 opacity-100 transition-all duration-300"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Navigation Arrows */}
//         {totalStories > 1 && (
//           <>
//             <button
//               onClick={() => onNavigate(-1)}
//               className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
//             >
//               <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6" />
//             </button>

//             <button
//               onClick={() => onNavigate(1)}
//               className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
//             >
//               <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6" />
//             </button>
//           </>
//         )}

//         {/* Header */}
//         <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex-1">
//             <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
//               {story.era} • {hoursLeft}h left
//             </div>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
//               {story.title}
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110 ml-4"
//           >
//             <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-4 sm:p-6">
//           <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
//             <img
//               src={story.avatar}
//               alt={story.author}
//               className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
//             />
//             <div>
//               <div className="font-medium text-gray-900 dark:text-white">{story.author}</div>
//               <div className="text-sm text-gray-500 dark:text-gray-400">Story Weaver</div>
//             </div>
//           </div>

//           <div className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 italic leading-relaxed">
//             "{story.poeticTeaser}"
//           </div>

//           <div className="relative rounded-xl overflow-hidden mb-4 sm:mb-6 group">
//             <img
//               src={story.coverImage}
//               alt={story.title}
//               className="w-full h-48 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//           </div>

//           <div className="flex items-center justify-between">
//             <button 
//               onClick={() => onLike(story.$id)}
//               className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
//             >
//               {story.isLiked ? (
//                 <HeartSolid className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
//               ) : (
//                 <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
//               )}
//               <span className="font-medium text-gray-700 dark:text-gray-300">
//                 {story.likes}
//               </span>
//             </button>
            
//             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl text-sm sm:text-base">
//               Continue Reading
//             </button>
//           </div>

//           {/* Progress Indicator */}
//           {totalStories > 1 && (
//             <div className="flex justify-center mt-4 sm:mt-6">
//               <div className="flex gap-1.5">
//                 {Array.from({ length: totalStories }).map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       index === currentIndex 
//                         ? 'bg-indigo-600 w-4 sm:w-6' 
//                         : 'bg-gray-300 dark:bg-gray-600'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryViewer;

// import React from 'react';
// import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

// const StoryViewer = ({ 
//   story, 
//   isOpen, 
//   onClose, 
//   onNavigate, 
//   currentIndex, 
//   totalStories,
//   onLike 
// }) => {
//   if (!isOpen || !story) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/100 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-auto shadow-2xl transform scale-100 opacity-100 transition-all duration-300"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Navigation Arrows */}
//         {totalStories > 1 && (
//           <>
//             <button
//               onClick={() => onNavigate(-1)}
//               className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
//             >
//               <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6" />
//             </button>

//             <button
//               onClick={() => onNavigate(1)}
//               className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
//             >
//               <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6" />
//             </button>
//           </>
//         )}

//         {/* Header with User Info */}
//         <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
//           <img
//             src={story.avatar}
//             alt={story.author}
//             className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
//           />
//           <div className="flex-1">
//             <div className="font-medium text-gray-900 dark:text-white">{story.author}</div>
//             <div className="text-xs text-gray-500 dark:text-gray-400">{story.era}</div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
//           >
//             <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
//           </button>
//         </div>

//         {/* Main Content Area - Fixed Height */}
//         <div className="h-[85vh] flex flex-col">
//           {/* Media Container - Adjusts to aspect ratio */}
//           <div className="flex-1 relative min-h-0">
//             {story.mediaType === 'video' ? (
//               <video
//                 src={story.mediaUrl}
//                 className="w-full h-full object-contain"
//                 controls
//                 autoPlay
//                 muted
//               />
//             ) : (
//               <img
//                 src={story.coverImage}
//                 alt={story.title}
//                 className="w-full h-full object-contain"
//               />
//             )}
//           </div>

//           {/* Content Below Media */}
//           <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//             {/* Title and Likes */}
//             <div className="flex items-start justify-between mb-3">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
//                 {story.title}
//               </h3>
//               <button 
//                 onClick={() => onLike(story.id)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex-shrink-0"
//               >
//                 {story.isLiked ? (
//                   <HeartSolid className="w-5 h-5 text-red-500" />
//                 ) : (
//                   <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//                 )}
//                 <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
//                   {story.likes}
//                 </span>
//               </button>
//             </div>

//             {/* Poetic Teaser */}
//             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
//               {story.poeticTeaser}
//             </p>
//           </div>
//         </div>

//         {/* Progress Indicator */}
//         {totalStories > 1 && (
//           <div className="flex justify-center p-4 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex gap-1.5">
//               {Array.from({ length: totalStories }).map((_, index) => (
//                 <div
//                   key={index}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     index === currentIndex 
//                       ? 'bg-indigo-600 w-6' 
//                       : 'bg-gray-300 dark:bg-gray-600'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StoryViewer;

// // src/components/StoryViewer.jsx
// import React from 'react';
// import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

// const StoryViewer = ({ 
//   users, 
//   currentUserIndex,
//   currentStoryIndex,
//   isOpen, 
//   onClose, 
//   onNavigateUser,
//   onNavigateStory,
//   onLike 
// }) => {
//   if (!isOpen || !users || users.length === 0) return null;

//   const currentUser = users[currentUserIndex];
//   const currentStory = currentUser?.stories[currentStoryIndex];
//   const totalUsers = users.length;
//   const totalStoriesInCurrentUser = currentUser?.stories.length || 0;

//   if (!currentStory) return null;

//   // Calculate visible users for left and right
//   const visibleLeftUsers = users.slice(0, currentUserIndex);
//   const visibleRightUsers = users.slice(currentUserIndex + 1);

//   return (
//     <div className="fixed inset-0 z-50 bg-black/100 backdrop-blur-sm">
//       {/* Left Side - Seen Users */}
//       {visibleLeftUsers.length > 0 && (
//         <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 space-y-3">
//           {visibleLeftUsers.map((user, index) => (
//             <div
//               key={user.userId}
//               className="w-12 h-12 rounded-full border-2 border-green-500 p-0.5 cursor-pointer hover:scale-110 transition-transform"
//               onClick={() => onNavigateUser(index - currentUserIndex)}
//             >
//               <img
//                 src={user.avatar}
//                 alt={user.author}
//                 className="w-full h-full rounded-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Right Side - Unseen Users */}
//       {visibleRightUsers.length > 0 && (
//         <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 space-y-3">
//           {visibleRightUsers.map((user, index) => (
//             <div
//               key={user.userId}
//               className="w-12 h-12 rounded-full border-2 border-gray-400 p-0.5 cursor-pointer hover:scale-110 transition-transform"
//               onClick={() => onNavigateUser(currentUserIndex + index + 1 - currentUserIndex)}
//             >
//               <img
//                 src={user.avatar}
//                 alt={user.author}
//                 className="w-full h-full rounded-full object-cover grayscale"
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Main Story Container */}
//       <div className="flex items-center justify-center h-full py-4 px-1">
//         <div className="bg-white dark:bg-gray-800 rounded-md max-w-2xl w-full mx-auto shadow-2xl h-[90vh] flex flex-col">
//           {/* User Progress Bars - Multiple stories from same user */}
//           {totalStoriesInCurrentUser > 1 && (
//             <div className="flex gap-1 p-3">
//               {currentUser.stories.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`flex-1 h-1 rounded-full transition-all duration-300 ${
//                     index === currentStoryIndex 
//                       ? 'bg-white' 
//                       : index < currentStoryIndex 
//                       ? 'bg-green-500'
//                       : 'bg-gray-600'
//                   }`}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Header with User Info */}
//           <div className="flex items-center gap-3 p-4">
//             <img
//               src={currentUser.avatar}
//               alt={currentUser.author}
//               className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
//             />
//             <div className="flex-1">
//               <div className="font-medium text-gray-900 dark:text-white">
//                 {currentUser.author}
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 {currentStory.era}
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
//             >
//               <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
//             </button>
//           </div>

//           {/* Main Content Area */}
//           <div className="flex-1 relative min-h-0">
//             {/* Navigation between user's stories */}
//             {totalStoriesInCurrentUser > 1 && (
//               <>
//                 <button
//                   onClick={() => onNavigateStory(-1)}
//                   disabled={currentStoryIndex === 0}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
//                 >
//                   <ChevronLeftIcon className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={() => onNavigateStory(1)}
//                   disabled={currentStoryIndex === totalStoriesInCurrentUser - 1}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
//                 >
//                   <ChevronRightIcon className="w-4 h-4" />
//                 </button>
//               </>
//             )}

//             {/* Media Container */}
//             {currentStory.mediaType === 'video' ? (
//               <video
//                 src={currentStory.mediaUrl}
//                 className="w-full h-full object-contain"
//                 controls
//                 autoPlay
//                 muted
//               />
//             ) : (
//               <img
//                 src={currentStory.coverImage}
//                 alt={currentStory.title}
//                 className="w-full h-full object-contain"
//               />
//             )}
//           </div>

//           {/* Content Below Media */}
//           <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//             {/* Title and Likes */}
//             <div className="flex items-start justify-between mb-3">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
//                 {currentStory.title}
//               </h3>
//               <button 
//                 onClick={() => onLike(currentStory.$id)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex-shrink-0"
//               >
//                 {currentStory.isLiked ? (
//                   <HeartSolid className="w-5 h-5 text-red-500" />
//                 ) : (
//                   <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//                 )}
//                 <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
//                   {currentStory.likes}
//                 </span>
//               </button>
//             </div>

//             {/* Poetic Teaser */}
//             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic mb-2">
//               {currentStory.poeticTeaser}
//             </p>

//             {/* Story Counter */}
//             <div className="text-xs text-gray-500 dark:text-gray-400">
//               {currentStoryIndex + 1} of {totalStoriesInCurrentUser} • {currentUserIndex + 1} of {totalUsers} users
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation between users */}
//       {totalUsers > 1 && (
//         <>
//           <button
//             onClick={() => onNavigateUser(-1)}
//             disabled={currentUserIndex === 0}
//             className="absolute left-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
//           >
//             <ChevronLeftIcon className="w-6 h-6" />
//           </button>

//           <button
//             onClick={() => onNavigateUser(1)}
//             disabled={currentUserIndex === totalUsers - 1}
//             className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
//           >
//             <ChevronRightIcon className="w-6 h-6" />
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default StoryViewer;


// src/components/StoryViewer.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

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
  if (!isOpen || !users || users.length === 0) return null;

  const currentUser = users[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const totalUsers = users.length;
  const totalStoriesInCurrentUser = currentUser?.stories.length || 0;

  if (!currentStory) return null;

  // Mark as seen when story opens
  React.useEffect(() => {
    if (currentUser && onMarkAsSeen) {
      onMarkAsSeen(currentUser.userId);
    }
  }, [currentUser, onMarkAsSeen]);

  // Get next and previous users for preview
  const nextUser = users[(currentUserIndex + 1) % totalUsers];
  const prevUser = users[(currentUserIndex - 1 + totalUsers) % totalUsers];

  return (
    <div className="fixed inset-0 z-50 bg-black/100 backdrop-blur-sm">
      {/* Desktop Preview - Next User (Right Side) */}
      {nextUser && (
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <div 
            onClick={() => onNavigateUser(1)}
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
            onClick={() => onNavigateUser(-1)}
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
              onClick={() => onNavigateUser(index - currentUserIndex)}
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
      <div className="flex items-center justify-center h-full p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-auto shadow-2xl h-[85vh] flex flex-col">
          {/* User Progress Bars */}
          {totalStoriesInCurrentUser > 1 && (
            <div className="flex gap-1 p-3">
              {currentUser.stories.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
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

          {/* Main Content */}
          <div className="flex-1 relative min-h-0">
            {/* Navigation between stories */}
            {totalStoriesInCurrentUser > 1 && (
              <>
                <button
                  onClick={() => onNavigateStory(-1)}
                  disabled={currentStoryIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateStory(1)}
                  disabled={currentStoryIndex === totalStoriesInCurrentUser - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Media */}
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
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
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

      {/* Navigation Arrows for Mobile */}
      {totalUsers > 1 && (
        <>
          <button
            onClick={() => onNavigateUser(-1)}
            disabled={currentUserIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50 md:hidden"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={() => onNavigateUser(1)}
            disabled={currentUserIndex === totalUsers - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm disabled:opacity-50 md:hidden"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default StoryViewer;