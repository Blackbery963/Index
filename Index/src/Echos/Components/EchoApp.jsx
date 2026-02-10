// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
// import { RiCameraLensFill } from "react-icons/ri";
// import { useStories } from '../hooks/useStories';
// import StoryCard from './StoryCard';
// import StoryViewer from './StoryViewer';
// import CreateStoryModal from './CreateStoryModal';

// const EchoApp = () => {
//   const [selectedUserIndex, setSelectedUserIndex] = useState(0);
//   const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
//   const [isViewerOpen, setIsViewerOpen] = useState(false);
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [seenStories, setSeenStories] = useState(new Set());
//   const { stories, loading, createStory, uploadFile, toggleLike, likingStories, scrollRef } = useStories();

//   // Load seen stories from localStorage on component mount
//   useEffect(() => {
//     const savedSeenStories = localStorage.getItem('seenStories');
//     if (savedSeenStories) {
//       try {
//         const parsedSeenStories = JSON.parse(savedSeenStories);
//         setSeenStories(new Set(parsedSeenStories));
//       } catch (error) {
//         console.error('Error loading seen stories from localStorage:', error);
//       }
//     }
//   }, []);

//   // Save seen stories to localStorage whenever it changes
//   useEffect(() => {
//     if (seenStories.size > 0) {
//       localStorage.setItem('seenStories', JSON.stringify([...seenStories]));
//     }
//   }, [seenStories]);

//   // Group stories by user and track seen status
//   const groupedStories = stories.reduce((acc, story) => {
//     const existingUser = acc.find(user => user.userId === story.userId);
//     if (existingUser) {
//       existingUser.stories.push(story);
//     } else {
//       acc.push({
//         userId: story.userId,
//         author: story.author,
//         avatar: story.avatar,
//         stories: [story],
//         hasUnseen: !seenStories.has(story.userId) // Use persisted seen status
//       });
//     }
//     return acc;
//   }, []);

//   // Separate seen and unseen users
//   const seenUsers = groupedStories.filter(user => !user.hasUnseen);
//   const unseenUsers = groupedStories.filter(user => user.hasUnseen);

//   // Reorder: unseen first, then seen
//   const orderedStories = [...unseenUsers, ...seenUsers];

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const scrollAmount = 280;
//     scrollRef.current.scrollBy({ 
//       left: direction * scrollAmount, 
//       behavior: 'smooth' 
//     });
//   };

//   const openViewer = (userIndex, storyIndex = 0) => {
//     const actualIndex = orderedStories.findIndex((_, idx) => idx === userIndex);
//     setSelectedUserIndex(actualIndex);
//     setSelectedStoryIndex(storyIndex);
//     setIsViewerOpen(true);
//   };

//   const closeViewer = () => {
//     setIsViewerOpen(false);
//   };

//   const navigateUser = (direction) => {
//     const newUserIndex = (selectedUserIndex + direction + orderedStories.length) % orderedStories.length;
//     setSelectedUserIndex(newUserIndex);
//     setSelectedStoryIndex(0);
    
//     // Mark user as seen when navigating to them
//     const currentUserId = orderedStories[newUserIndex]?.userId;
//     if (currentUserId) {
//       setSeenStories(prev => {
//         const newSet = new Set([...prev, currentUserId]);
//         return newSet;
//       });
//     }
//   };

//   const navigateStory = (direction) => {
//     const currentUserStories = orderedStories[selectedUserIndex]?.stories || [];
//     const newStoryIndex = (selectedStoryIndex + direction + currentUserStories.length) % currentUserStories.length;
//     setSelectedStoryIndex(newStoryIndex);
//   };

//   // const handleLike = (storyId) => {
//   //   console.log('Like story:', storyId);
//   // };

//   const handleCreateStory = async (storyData) => {
//     await createStory(storyData);
//   };

//   // Mark story as seen when viewer opens
//   useEffect(() => {
//     if (isViewerOpen && orderedStories[selectedUserIndex]) {
//       const userId = orderedStories[selectedUserIndex].userId;
//       setSeenStories(prev => {
//         const newSet = new Set([...prev, userId]);
//         return newSet;
//       });
//     }
//   }, [isViewerOpen, selectedUserIndex]);

//   // Clear all seen stories (optional - for testing)
//   const clearSeenStories = () => {
//     setSeenStories(new Set());
//     localStorage.removeItem('seenStories');
//   };


// const handleLike = async (storyId, currentLikes, currentIsLiked) => {
//   try {
//     const result = await toggleLike(storyId, currentLikes, currentIsLiked);
    
//     // Update local state if needed
//     if (result) {
//       // You might want to update your stories state here
//       console.log('Like updated:', result);
//     }
//   } catch (error) {
//     console.error('Like failed:', error);
//   }
// };


//   if (loading) {
//     return (
//       <section className="bg-gray-100 dark:bg-[#000705] py-6 border-b border-gray-100 dark:border-gray-800 w-full">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-center h-40">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-gray-100 dark:bg-[#000705] py-6 border-b border-gray-100 dark:border-gray-800 w-full max-w-7xl mx-auto">
//       <div className="w-full px-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <RiCameraLensFill className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//             <h2 className="text-xl font-medium text-gray-900 dark:text-white">Glimpse</h2>
//             <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
//               {unseenUsers.length} new • {groupedStories.length} users
//             </span>
//             {/* Optional: Clear cache button for testing */}
//           </div>
          
//           <div className="flex gap-2">
//             <button
//               onClick={() => scroll(-1)}
//               className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
//               aria-label="Scroll left"
//             >
//               <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             </button>
//             <button
//               onClick={() => scroll(1)}
//               className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
//               aria-label="Scroll right"
//             >
//               <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             </button>
//           </div>
//         </div>

//         {/* Stories Grid */}
//         <div className="relative">
//           <div
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
//           >
//             {/* Create New Card */}
//             <div 
//               onClick={() => setIsCreateOpen(true)}
//               className="flex-shrink-0 w-40 h-56 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-100 group"
//             >
//               <div className="transform group-hover:scale-110 transition-transform duration-300">
//                 <PlusIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
//                 New Story
//               </p>
//             </div>

//             {/* User Story Cards - One per user */}
//             {orderedStories.map((user, userIndex) => (
//               <div key={user.userId} className="flex-shrink-0 w-40">
//                 <StoryCard
//                   user={user}
//                   onCardClick={() => openViewer(userIndex, 0)}
//                   onLike={handleLike}
//                   userIndex={userIndex}
//                   hasUnseen={user.hasUnseen}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {/* <StoryViewer
//         users={orderedStories}
//         currentUserIndex={selectedUserIndex}
//         currentStoryIndex={selectedStoryIndex}
//         isOpen={isViewerOpen}
//         onClose={closeViewer}
//         onNavigateUser={navigateUser}
//         onNavigateStory={navigateStory}
//         onLike={handleLike}
//         seenStories={seenStories}
//         onMarkAsSeen={(userId) => setSeenStories(prev => new Set([...prev, userId]))}
//       /> */}
//       <StoryViewer
//   users={orderedStories}
//   currentUserIndex={selectedUserIndex}
//   currentStoryIndex={selectedStoryIndex}
//   isOpen={isViewerOpen}
//   onClose={closeViewer}
//   onNavigateUser={navigateUser}
//   onNavigateStory={navigateStory}
//   onLike={handleLike} // Keep this for backward compatibility
//   seenStories={seenStories}
//   onMarkAsSeen={(userId) => setSeenStories(prev => new Set([...prev, userId]))}
// />

//       <CreateStoryModal
//         isOpen={isCreateOpen}
//         onClose={() => setIsCreateOpen(false)}
//         onCreateStory={handleCreateStory}
//         onUploadFile={uploadFile}
//       />

//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default EchoApp;


import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { RiCameraLensFill } from "react-icons/ri";
import { useStories } from '../hooks/useStories';
import StoryCard from './StoryCard';
import StoryViewer from './StoryViewer';
import CreateStoryModal from './CreateStoryModal';

const AddGlimpseCard = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group flex-shrink-0 w-40"
    >
      <div className="relative w-40 h-56 rounded-2xl overflow-hidden transition-all duration-500 ease-out transform hover:scale-105">
        {/* Animated gradient background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 transition-all duration-700 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-90'
          }`}
        />
        
        {/* Animated particles overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" 
               style={{ animationDuration: '2s', animationDelay: '0s' }} />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping" 
               style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-ping" 
               style={{ animationDuration: '3s', animationDelay: '1s' }} />
        </div>
        
        {/* Glowing border effect */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isHovered ? 'shadow-[0_0_40px_rgba(168,85,247,0.6)]' : 'shadow-[0_0_20px_rgba(168,85,247,0.3)]'
        }`} />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4 z-10">
          {/* Icon container with pulse effect */}
          <div className="relative mb-3">
            <div className={`absolute inset-0 bg-white rounded-full blur-xl transition-all duration-500 ${
              isHovered ? 'opacity-60 scale-150' : 'opacity-30 scale-100'
            }`} />
            <div className="relative bg-white/20 backdrop-blur-sm p-4 rounded-full border-2 border-white/40">
              {isHovered ? (
                <Zap className="w-8 h-8 text-white animate-pulse" />
              ) : (
                <Sparkles className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
          
          {/* Text */}
          <div className="text-center">
            <p className="text-white font-bold text-lg mb-1 tracking-wide">
              Create
            </p>
            <p className="text-white/90 text-sm font-medium">
              Glimpse
            </p>
          </div>
          
          {/* Animated underline */}
          <div className={`mt-3 h-0.5 bg-white/60 rounded-full transition-all duration-500 ${
            isHovered ? 'w-16' : 'w-8'
          }`} />
        </div>
        
        {/* Corner accent */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
      </div>
      
      {/* Floating ring effect on hover */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-purple-400/50 transition-all duration-700 ${
        isHovered ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
      }`} />
    </button>
  );
};

const MinimalStoryCard = ({ user, onCardClick, hasUnseen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const latestStory = user.stories[user.stories.length - 1];
  
  return (
    <div 
      onClick={onCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-40 cursor-pointer group"
    >
      <div className="relative w-40 h-56 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
        {/* Image */}
        <img
          src={latestStory.media}
          alt={user.author}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        
        {/* Border - conditional based on seen status */}
        <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
          hasUnseen 
            ? 'border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
            : 'border-gray-300/30 dark:border-gray-600/30'
        }`} />
        
        {/* Hover glow */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-purple-500/20" />
        )}
        
        {/* Avatar */}
        <div className="absolute top-3 left-3">
          <div className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            hasUnseen ? 'border-indigo-400' : 'border-white/60'
          }`}>
            <img
              src={user.avatar}
              alt={user.author}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        
        {/* Author name */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white text-sm font-medium truncate drop-shadow-lg">
            {user.author}
          </p>
        </div>
        
        {/* Corner decorations - subtle */}
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 rounded-tr-md" />
      </div>
    </div>
  );
};

const EchoApp = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [seenStories, setSeenStories] = useState(new Set());
  const { stories, loading, createStory, uploadFile, toggleLike, likingStories, scrollRef } = useStories();

  useEffect(() => {
    const savedSeenStories = localStorage.getItem('seenStories');
    if (savedSeenStories) {
      try {
        const parsedSeenStories = JSON.parse(savedSeenStories);
        setSeenStories(new Set(parsedSeenStories));
      } catch (error) {
        console.error('Error loading seen stories from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (seenStories.size > 0) {
      localStorage.setItem('seenStories', JSON.stringify([...seenStories]));
    }
  }, [seenStories]);

  const groupedStories = stories.reduce((acc, story) => {
    const existingUser = acc.find(user => user.userId === story.userId);
    if (existingUser) {
      existingUser.stories.push(story);
    } else {
      acc.push({
        userId: story.userId,
        author: story.author,
        avatar: story.avatar,
        stories: [story],
        hasUnseen: !seenStories.has(story.userId)
      });
    }
    return acc;
  }, []);

  const seenUsers = groupedStories.filter(user => !user.hasUnseen);
  const unseenUsers = groupedStories.filter(user => user.hasUnseen);
  const orderedStories = [...unseenUsers, ...seenUsers];

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({ 
      left: direction * scrollAmount, 
      behavior: 'smooth' 
    });
  };

  const openViewer = (userIndex, storyIndex = 0) => {
    const actualIndex = orderedStories.findIndex((_, idx) => idx === userIndex);
    setSelectedUserIndex(actualIndex);
    setSelectedStoryIndex(storyIndex);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  const navigateUser = (direction) => {
    const newUserIndex = (selectedUserIndex + direction + orderedStories.length) % orderedStories.length;
    setSelectedUserIndex(newUserIndex);
    setSelectedStoryIndex(0);
    
    const currentUserId = orderedStories[newUserIndex]?.userId;
    if (currentUserId) {
      setSeenStories(prev => {
        const newSet = new Set([...prev, currentUserId]);
        return newSet;
      });
    }
  };

  const navigateStory = (direction) => {
    const currentUserStories = orderedStories[selectedUserIndex]?.stories || [];
    const newStoryIndex = (selectedStoryIndex + direction + currentUserStories.length) % currentUserStories.length;
    setSelectedStoryIndex(newStoryIndex);
  };

  const handleCreateStory = async (storyData) => {
    await createStory(storyData);
  };

  useEffect(() => {
    if (isViewerOpen && orderedStories[selectedUserIndex]) {
      const userId = orderedStories[selectedUserIndex].userId;
      setSeenStories(prev => {
        const newSet = new Set([...prev, userId]);
        return newSet;
      });
    }
  }, [isViewerOpen, selectedUserIndex]);

  const handleLike = async (storyId, currentLikes, currentIsLiked) => {
    try {
      const result = await toggleLike(storyId, currentLikes, currentIsLiked);
      if (result) {
        console.log('Like updated:', result);
      }
    } catch (error) {
      console.error('Like failed:', error);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-100 dark:bg-[#000705] py-6 border-b border-gray-100 dark:border-gray-800 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 dark:bg-[#000705] py-6 border-b border-gray-100 dark:border-gray-800 w-full max-w-7xl mx-auto">
      <div className="w-full px-4">
        {/* Header - Minimal */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <RiCameraLensFill className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Glimpse</h2>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {unseenUsers.length} new
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {/* Unique Create Card */}
            <AddGlimpseCard onClick={() => setIsCreateOpen(true)} />

            {/* Minimal Story Cards */}
            {orderedStories.map((user, userIndex) => (
              <MinimalStoryCard
                key={user.userId}
                user={user}
                onCardClick={() => openViewer(userIndex, 0)}
                hasUnseen={user.hasUnseen}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <StoryViewer
        users={orderedStories}
        currentUserIndex={selectedUserIndex}
        currentStoryIndex={selectedStoryIndex}
        isOpen={isViewerOpen}
        onClose={closeViewer}
        onNavigateUser={navigateUser}
        onNavigateStory={navigateStory}
        onLike={handleLike}
        seenStories={seenStories}
        onMarkAsSeen={(userId) => setSeenStories(prev => new Set([...prev, userId]))}
      />

      <CreateStoryModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateStory={handleCreateStory}
        onUploadFile={uploadFile}
      />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default EchoApp;