// import React, { useEffect, useState } from 'react';
// import { recordArtworkView, getArtworkViewCount } from '../Views/viewService';
// import { account } from '../appwriteConfig'; // Make sure this is properly imported
// import { FaRegEye } from 'react-icons/fa';

// const ArtworkViewTracker = ({ artworkId }) => {
//   const [viewCount, setViewCount] = useState(0);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   // Fetch user ID on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const user = await account.get();
//         setCurrentUserId(user.$id);
//       } catch (error) {
//         console.warn('User not logged in');
//         setCurrentUserId(null); // Guest view
//       }
//     };

//     fetchUser();
//   }, []);

//   // Record the view and fetch view count
//   useEffect(() => {
//     const handleView = async () => {
//       try {
//         await recordArtworkView(currentUserId, artworkId); // Accepts null for guest
//         const count = await getArtworkViewCount(artworkId);
//         setViewCount(count);
//       } catch (error) {
//         console.error('Error recording or fetching view:', error);
//       }
//     };

//     if (artworkId) handleView();
//   }, [artworkId, currentUserId]);

//   return (
//    <div className='flex items-center gap-2'>
//     <FaRegEye/>
//     <span>{viewCount}</span>
//    </div>
//   );
// };

// export default ArtworkViewTracker;

// import React, { useEffect, useState } from 'react';
// import { recordArtworkView, getArtworkViewCount } from '../Views/viewService';
// import { account } from '../appwriteConfig';
// import { FaRegEye } from 'react-icons/fa';

// const ArtworkViewTracker = ({ artworkId }) => {
//   const [viewCount, setViewCount] = useState(0);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user status
//   useEffect(() => {
//     let isMounted = true;
    
//     const fetchUser = async () => {
//       try {
//         const user = await account.get();
//         if (isMounted) setCurrentUserId(user.$id);
//       } catch {
//         if (isMounted) setCurrentUserId(null);
//       } finally {
//         if (isMounted) setIsLoading(false);
//       }
//     };

//     fetchUser();
//     return () => { isMounted = false; };
//   }, []);

//   // Record view
//   useEffect(() => {
//     let isMounted = true;
    
//     const handleView = async () => {
//       try {
//         const count = await recordArtworkView(currentUserId, artworkId);
//         if (isMounted) setViewCount(count);
//       } catch (error) {
//         console.error('View recording failed:', error);
//         // Fallback: Just get current count
//         const count = await getArtworkViewCount(artworkId);
//         if (isMounted) setViewCount(count);
//       }
//     };

//     if (artworkId && !isLoading) handleView();
//     return () => { isMounted = false; };
//   }, [artworkId, currentUserId, isLoading]);

//   if (isLoading) return <div className="h-4 w-8 animate-pulse bg-gray-200 rounded" />;

//   return (
//     <div className="flex items-center gap-2 text-gray-600">
//       <FaRegEye className="text-sm" />
//       <span className=" text-sm font-medium">{viewCount.toLocaleString()}</span>
//     </div>
//   );
// };

// export default ArtworkViewTracker;

import React, { useEffect, useState } from 'react';
import { recordArtworkView, getArtworkViewCount } from './viewService';
import { account } from '../appwriteConfig';

const ArtworkViewTracker = ({ artworkId }) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const trackView = async () => {
      try {
        // Get the current user (if logged in)
        const user = await account.get().catch(() => null);
        const userId = user ? user.$id : null;

        // Record the view
        const viewRecorded = await recordArtworkView(userId, artworkId);
        if (viewRecorded) {
          // Fetch the updated view count if a new view was recorded
          const updatedViewCount = await getArtworkViewCount(artworkId);
          setViewCount(updatedViewCount);
        } else {
          // Fetch the current view count if no new view was recorded
          const currentViewCount = await getArtworkViewCount(artworkId);
          setViewCount(currentViewCount);
        }
      } catch (err) {
        console.error('Error tracking view:', err);
      }
    };

    if (artworkId) {
      trackView();
    }
  }, [artworkId]);

  return (
    <div className="flex items-center space-x-1 text-white">
      <span className="text-sm font-Quicksand">{viewCount} views</span>
    </div>
  );
};

export default ArtworkViewTracker;