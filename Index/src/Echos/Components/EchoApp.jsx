// // // src/components/EchoApp.jsx
// import React, { useState, useRef } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
// import { useStories } from '../hooks/useStories';
// import StoryCard from './StoryCard';
// import StoryViewer from './StoryViewer';
// import CreateStoryModal from './CreateStoryModal';

// const EchoApp = () => {
//   const [selectedUserIndex, setSelectedUserIndex] = useState(0);
//   const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
//   const [isViewerOpen, setIsViewerOpen] = useState(false);
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
  
//   const scrollRef = useRef(null);
//   const { stories, loading, createStory, uploadFile } = useStories();

//   // Group stories by user
//   const groupedStories = stories.reduce((acc, story) => {
//     const existingUser = acc.find(user => user.userId === story.userId);
//     if (existingUser) {
//       existingUser.stories.push(story);
//     } else {
//       acc.push({
//         userId: story.userId,
//         author: story.author,
//         avatar: story.avatar,
//         stories: [story]
//       });
//     }
//     return acc;
//   }, []);

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const scrollAmount = 280;
//     scrollRef.current.scrollBy({ 
//       left: direction * scrollAmount, 
//       behavior: 'smooth' 
//     });
//   };

//   const openViewer = (userIndex, storyIndex = 0) => {
//     setSelectedUserIndex(userIndex);
//     setSelectedStoryIndex(storyIndex);
//     setIsViewerOpen(true);
//   };

//   const closeViewer = () => {
//     setIsViewerOpen(false);
//   };

//   const navigateUser = (direction) => {
//     const newUserIndex = (selectedUserIndex + direction + groupedStories.length) % groupedStories.length;
//     setSelectedUserIndex(newUserIndex);
//     setSelectedStoryIndex(0); // Reset to first story when changing user
//   };

//   const navigateStory = (direction) => {
//     const currentUserStories = groupedStories[selectedUserIndex]?.stories || [];
//     const newStoryIndex = (selectedStoryIndex + direction + currentUserStories.length) % currentUserStories.length;
//     setSelectedStoryIndex(newStoryIndex);
//   };

//   const handleLike = (storyId) => {
//     // Implement like functionality
//     console.log('Like story:', storyId);
//   };

//   const handleCreateStory = async (storyData) => {
//     await createStory(storyData);
//   };

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
//             <BookOpenIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//             <h2 className="text-xl font-medium text-gray-900 dark:text-white">My Stories</h2>
//             <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
//               {groupedStories.length} users • {stories.length} stories
//             </span>
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
//               className="flex-shrink-0 w-40 h-56 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 group"
//             >
//               <div className="transform group-hover:scale-110 transition-transform duration-300">
//                 <PlusIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
//                 New Story
//               </p>
//             </div>

//             {/* User Story Cards - One per user */}
//             {groupedStories.map((user, userIndex) => (
//               <div key={user.userId} className="flex-shrink-0 w-40">
//                 <StoryCard
//                   user={user}
//                   onCardClick={() => openViewer(userIndex, 0)}
//                   onLike={handleLike}
//                   userIndex={userIndex}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <StoryViewer
//         users={groupedStories}
//         currentUserIndex={selectedUserIndex}
//         currentStoryIndex={selectedStoryIndex}
//         isOpen={isViewerOpen}
//         onClose={closeViewer}
//         onNavigateUser={navigateUser}
//         onNavigateStory={navigateStory}
//         onLike={handleLike}
//       />

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



// // src/components/EchoApp.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { useStories } from '../hooks/useStories';
import StoryCard from './StoryCard';
import StoryViewer from './StoryViewer';
import CreateStoryModal from './CreateStoryModal';

const EchoApp = () => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [seenStories, setSeenStories] = useState(new Set());
  
  const scrollRef = useRef(null);
  const { stories, loading, createStory, uploadFile } = useStories();

  // Group stories by user and track seen status
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

  // Separate seen and unseen users
  const seenUsers = groupedStories.filter(user => !user.hasUnseen);
  const unseenUsers = groupedStories.filter(user => user.hasUnseen);

  // Reorder: unseen first, then seen
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
    
    // Mark user as seen when navigating to them
    const currentUserId = orderedStories[newUserIndex]?.userId;
    if (currentUserId) {
      setSeenStories(prev => new Set([...prev, currentUserId]));
    }
  };

  const navigateStory = (direction) => {
    const currentUserStories = orderedStories[selectedUserIndex]?.stories || [];
    const newStoryIndex = (selectedStoryIndex + direction + currentUserStories.length) % currentUserStories.length;
    setSelectedStoryIndex(newStoryIndex);
  };

  const handleLike = (storyId) => {
    console.log('Like story:', storyId);
  };

  const handleCreateStory = async (storyData) => {
    await createStory(storyData);
  };

  // Mark story as seen when viewer opens
  useEffect(() => {
    if (isViewerOpen && orderedStories[selectedUserIndex]) {
      const userId = orderedStories[selectedUserIndex].userId;
      setSeenStories(prev => new Set([...prev, userId]));
    }
  }, [isViewerOpen, selectedUserIndex]);

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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Stories</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {unseenUsers.length} new • {groupedStories.length} users
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {/* Create New Card */}
            <div 
              onClick={() => setIsCreateOpen(true)}
              className="flex-shrink-0 w-40 h-56 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-100 group"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <PlusIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                New Story
              </p>
            </div>

            {/* User Story Cards - One per user */}
            {orderedStories.map((user, userIndex) => (
              <div key={user.userId} className="flex-shrink-0 w-40">
                <StoryCard
                  user={user}
                  onCardClick={() => openViewer(userIndex, 0)}
                  onLike={handleLike}
                  userIndex={userIndex}
                  hasUnseen={user.hasUnseen}
                />
              </div>
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
