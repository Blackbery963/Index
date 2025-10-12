// import { useState, useEffect } from "react";
// import { followService } from "./FollowService";
// import { account } from "../appwriteConfig";
// import { FiUserPlus, FiCheck } from "react-icons/fi";
// import { ImSpinner2 } from "react-icons/im";

//  function FollowButton({ targetUserId, onFollowChange = () => {} }) {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   // Fetch current user on mount
//   useEffect(() => {
//     const getCurrentUser = async () => {
//       try {
//         const user = await account.get();
//         setCurrentUserId(user.$id);
//       } catch (error) {
//         console.error("Error getting current user:", error);
//       }
//     };
//     getCurrentUser();
//   }, []);

//   // Check follow status
//   useEffect(() => {
//     if (!currentUserId || !targetUserId) return;

//     const checkStatus = async () => {
//       try {
//         const status = await followService.checkFollowStatus(currentUserId, targetUserId);
//         setIsFollowing(status);
//       } catch (error) {
//         console.error("Error checking follow status:", error);
//       }
//     };

//     checkStatus();
//   }, [currentUserId, targetUserId]);

//   // const handleFollow = async () => {
//   //   if (!currentUserId || isLoading) return;

//   //   setIsLoading(true);
//   //   try {
//   //     if (isFollowing) {
//   //       await followService.unfollowUser(currentUserId, targetUserId);
//   //     } else {
//   //       await followService.followUser(currentUserId, targetUserId);
//   //     }

//   //     const updatedStatus = await followService.checkFollowStatus(currentUserId, targetUserId);
//   //     setIsFollowing(updatedStatus);
//   //     onFollowChange(updatedStatus);
//   //   } catch (error) {
//   //     console.error("Error updating follow status:", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

// const handleFollow = async () => {
//   if (!currentUserId || isLoading) return;
//   setIsLoading(true);
  
//   try {
//     const newStatus = !isFollowing;
//     if (newStatus) {
//       await followService.followUser(currentUserId, targetUserId);
//     } else {
//       await followService.unfollowUser(currentUserId, targetUserId);
//     }
//     setIsFollowing(newStatus);
//     onFollowChange(newStatus);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   if (!currentUserId) return null;
//   if (currentUserId === targetUserId) {
//     return <span className="text-xs text-gray-500 italic">This is you</span>;
//   }

//   return (
//     <button
//       onClick={handleFollow}
//       disabled={isLoading}
//       className={`
//         flex items-center gap-1 px-2 py-1 rounded-xl font-medium shadow-sm transition-all duration-200
//         border focus:outline-none focus:ring-2 focus:ring-offset-1
//         ${
//           isFollowing
//             ? "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 focus:ring-gray-300"
//             : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-400"
//         }
//         disabled:opacity-70 disabled:cursor-not-allowed
//       `}
//     >
//       {isLoading ? (
//         <ImSpinner2 className="animate-spin text-sm" />
//       ) : isFollowing ? (
//         <>
//           {/* <FiCheck className="text-sm" /> */}
//           Following
//         </>
//       ) : (
//         <>
//           <FiUserPlus className="text-sm" />
//           Follow
//         </>
//       )}
//     </button>
//   );
// }

// export default FollowButton

import { useState, useEffect } from "react";
import { followService } from "./FollowService";
import { account } from "../appwriteConfig";
import { FiUserPlus, FiCheck } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { LuLoader } from "react-icons/lu";

function FollowButton({ targetUserId, onFollowChange = () => {} }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    };
    getCurrentUser();
  }, []);

  // Check follow status ONCE when components mount or IDs change
  useEffect(() => {
    if (!currentUserId || !targetUserId) return;

    const checkStatus = async () => {
      try {
        const status = await followService.checkFollowStatus(currentUserId, targetUserId);
        setIsFollowing(status);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkStatus();
  }, [currentUserId, targetUserId]);

  // In your handleFollow, check status only when needed
const handleFollow = async () => {
  if (!currentUserId || isLoading) return;
  
  setIsLoading(true);
  
  try {
    // Check current status first
    const currentStatus = await followService.checkFollowStatus(currentUserId, targetUserId);
    const newStatus = !currentStatus;
    
    if (newStatus) {
      await followService.followUser(currentUserId, targetUserId);
    } else {
      await followService.unfollowUser(currentUserId, targetUserId);
    }
    
    setIsFollowing(newStatus);
    onFollowChange(newStatus);
  } catch (error) {
    console.error('Error:', error);
    // Re-check status on error
    const actualStatus = await followService.checkFollowStatus(currentUserId, targetUserId);
    setIsFollowing(actualStatus);
  } finally {
    setIsLoading(false);
  }
};

  if (!currentUserId) return null;
  if (currentUserId === targetUserId) {
    return <span className="text-xs text-gray-500 italic">This is you</span>;
  }

  return (
<button
onClick={handleFollow}
disabled={isLoading}
  className={`
    inline-flex items-center justify-center gap-1.5 px-4 py-1.5 
    rounded-lg text-sm font-medium 
    transition-all duration-200 
    backdrop-blur-md border
    ${
      isFollowing
        ? "bg-white/20 text-gray-900 dark:text-gray-100 border-white/30 hover:bg-white/30"
        : "bg-blue-500/30 text-blue-50 dark:text-blue-800 border-blue-400/30 hover:bg-blue-500/40"
    }
    focus:outline-none focus:ring-2 focus:ring-blue-300/40
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
>
  {isLoading ? (
    <LuLoader className="animate-spin text-sm" />
  ) : isFollowing ? (
    <span className="text-sm">Following</span>
  ) : (
    <>
      <FiUserPlus className="text-sm" />
      <span className="text-sm">Follow</span>
    </>
  )}
</button>


  );
}

export default FollowButton;