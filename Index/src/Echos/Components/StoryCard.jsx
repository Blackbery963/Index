// // // src/components/StoryCard.jsx
// // import React from 'react';
// // import { HeartIcon } from '@heroicons/react/24/outline';
// // import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

// // const StoryCard = ({ story, onCardClick, onLike, index }) => {
// //   const timeLeft = Math.max(0, new Date(story.expiresAt) - new Date());
// //   const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  
// //   return (
// //     <div
// //       onClick={() => onCardClick(story, index)}
// //       className="flex-shrink-0 w-40 h-56 rounded-xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
// //     >
// //       {/* Cover Image */}
// //       <img
// //         src={story.coverImage}
// //         alt={story.title}
// //         className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
// //         loading="lazy"
// //       />

// //       {/* Gradient Overlay */}
// //       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

// //       {/* Content */}
// //       <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
// //         <h3 className="font-medium text-sm mb-1 line-clamp-2">
// //           {story.title}
// //         </h3>
// //         <p className="text-xs text-gray-300 line-clamp-1">
// //           {story.era}
// //         </p>
// //         <div className="flex items-center justify-between mt-2">
// //           <span className="text-xs bg-black/50 px-2 py-1 rounded">
// //             {hoursLeft}h left
// //           </span>
// //         </div>
// //       </div>

// //       {/* Like Button */}
// //       <button 
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           onLike(story.$id);
// //         }}
// //         className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-all duration-200 transform hover:scale-110"
// //       >
// //         {story.isLiked ? (
// //           <HeartSolid className="w-4 h-4 text-red-400" />
// //         ) : (
// //           <HeartIcon className="w-4 h-4 text-white" />
// //         )}
// //       </button>

// //       {/* Hover Overlay */}
// //       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
// //     </div>
// //   );
// // };

// // export default StoryCard;

import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const StoryCard = ({ user, onCardClick, onLike, userIndex, hasUnseen }) => {
  const latestStory = user.stories[0];
  const totalStories = user.stories.length;
  
  const timeLeft = Math.max(0, new Date(latestStory.expiresAt) - new Date());
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));

  return (
    <div
      onClick={() => onCardClick(userIndex)}
      className="flex-shrink-0 w-40 h-56 rounded-xl overflow-hidden cursor-pointer relative shadow-sm transition-all duration-300 hover:scale-100"
    >
      {/* Unseen Indicator Ring */}
      {hasUnseen && (
        <div className="absolute inset-0 rounded-xl border-2 border-indigo-500 z-10 pointer-events-none" />
      )}

      {/* Cover Image */}
      <img
        src={latestStory.coverImage}
        alt={latestStory.title}
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Story Count Badge */}
      {totalStories > 1 && (
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {totalStories}
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <h3 className="font-medium text-sm mb-1 line-clamp-2">
          {user.author}
        </h3>
        <p className="text-xs text-gray-300 line-clamp-1">
          {latestStory.era}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs bg-black/50 px-2 py-1 rounded">
            {hoursLeft}h left
          </span>
          {hasUnseen && (
            <span className="text-xs bg-indigo-500 px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
      </div>

      {/* Like Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onLike(latestStory.$id);
        }}
        className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-all duration-200 transform hover:scale-110"
      >
        {latestStory.isLiked ? (
          <HeartSolid className="w-4 h-4 text-red-400" />
        ) : (
          <HeartIcon className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
    </div>
  );
};

export default StoryCard;