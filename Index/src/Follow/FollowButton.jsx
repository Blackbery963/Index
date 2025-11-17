import { useState, useEffect, useCallback } from "react";
import { followService } from "./FollowService";
import { account } from "../appwriteConfig";
import { FiUserPlus, FiCheck, FiUserMinus } from "react-icons/fi";
import { LuLoader } from "react-icons/lu";

function FollowButton({ 
  targetUserId, 
  onFollowChange = () => {}, 
  variant = "default",
  size = "md"
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Memoized user fetch
  const getCurrentUser = useCallback(async () => {
    try {
      const user = await account.get();
      setCurrentUserId(user.$id);
      return user.$id;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }, []);

  // Memoized status check
  const checkFollowStatus = useCallback(async (userId, targetId) => {
    if (!userId || !targetId) return false;
    try {
      return await followService.checkFollowStatus(userId, targetId);
    } catch (error) {
      console.error("Error checking follow status:", error);
      return false;
    }
  }, []);

  // Initialize user and status
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const userId = await getCurrentUser();
      if (!mounted || !userId || !targetUserId) return;

      const status = await checkFollowStatus(userId, targetUserId);
      if (mounted) {
        setIsFollowing(status);
        setHasInitialized(true);
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [targetUserId, getCurrentUser, checkFollowStatus]);

  // Optimized follow handler with immediate feedback
  const handleFollow = async () => {
    if (!currentUserId || isLoading || !hasInitialized) return;

    const newStatus = !isFollowing;
    
    // Immediate UI update
    setIsFollowing(newStatus);
    setIsLoading(true);
    onFollowChange(newStatus);

    try {
      if (newStatus) {
        await followService.followUser(currentUserId, targetUserId);
      } else {
        await followService.unfollowUser(currentUserId, targetUserId);
      }
    } catch (error) {
      console.error("Follow toggle failed:", error);
      
      // Revert on error and re-verify actual status
      const actualStatus = await checkFollowStatus(currentUserId, targetUserId);
      setIsFollowing(actualStatus);
      onFollowChange(actualStatus);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render until initialized
  if (!hasInitialized) {
    return (
      <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg opacity-50">
        <LuLoader className="animate-spin text-sm" />
      </div>
    );
  }

  if (!currentUserId) return null;
  
  if (currentUserId === targetUserId) {
    return (
      <span className="text-xs text-gray-500 italic px-3 py-1.5">
        This is you
      </span>
    );
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      button: "px-3 py-1 text-xs gap-1",
      icon: "text-xs",
      text: "text-xs"
    },
    md: {
      button: "px-4 py-1.5 text-sm gap-1.5", 
      icon: "text-sm",
      text: "text-sm"
    },
    lg: {
      button: "px-5 py-2 text-base gap-2",
      icon: "text-base",
      text: "text-base"
    }
  };

  // Variant configurations with better visual distinction
  const variantConfig = {

    default: {
     following: {
    // ✅ Glassmorphic "Following" state
    bg: "bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/25 dark:hover:bg-white/20",
    text: "text-gray-900 dark:text-gray-100",
    border: "border border-white/30 dark:border-white/20",
    icon: FiCheck
    },
    notFollowing: {
    // ✅ Soft blue frosted style
    bg: "bg-blue-500/20 dark:bg-blue-500/10 backdrop-blur-md hover:bg-blue-500/30 dark:hover:bg-blue-500/20 shadow-sm",
    text: "text-blue-900 dark:text-blue-100",
    border: "border border-blue-400/40 dark:border-blue-500/30",
    icon: FiUserPlus
    }
    },

    
    outline: {
      following: {
        bg: "bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        border: "border border-green-500",
        icon: FiCheck
      },
      notFollowing: {
        bg: "bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400", 
        border: "border border-blue-500",
        icon: FiUserPlus
      }
    },
    
    minimal: {
      following: {
        bg: "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50",
        text: "text-green-700 dark:text-green-300",
        border: "",
        icon: FiCheck
      },
      notFollowing: {
        bg: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        text: "text-gray-700 dark:text-gray-300",
        border: "",
        icon: FiUserPlus
      }
    },
    
    icon: {
      following: {
        bg: "bg-green-500 hover:bg-green-600",
        text: "text-white",
        border: "",
        icon: FiCheck
      },
      notFollowing: {
        bg: "bg-blue-500 hover:bg-blue-600",
        text: "text-white", 
        border: "",
        icon: FiUserPlus
      }
    },

    ghost: {
      following: {
        bg: "hover:bg-green-50 dark:hover:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        border: "",
        icon: FiCheck
      },
      notFollowing: {
        bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20", 
        text: "text-blue-600 dark:text-blue-400",
        border: "",
        icon: FiUserPlus
      }
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];
  const stateConfig = isFollowing ? currentVariant.following : currentVariant.notFollowing;
  const IconComponent = stateConfig.icon;

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-lg font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/50
    disabled:opacity-50 disabled:cursor-not-allowed
    ${currentSize.button}
    ${stateConfig.bg}
    ${stateConfig.text}
    ${stateConfig.border}
  `.trim();

  // Render different content based on variant
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <LuLoader className={`animate-spin ${currentSize.icon}`} />
          {variant !== "icon" && <span className={currentSize.text}>Loading</span>}
        </>
      );
    }

    if (variant === "icon") {
      return <IconComponent className={currentSize.icon} />;
    }

    return (
      <>
        <IconComponent className={currentSize.icon} />
        <span className={currentSize.text}>
          {isFollowing ? "Following" : "Follow"}
        </span>
      </>
    );
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={baseClasses}
      aria-label={isFollowing ? `Unfollow user` : `Follow user`}
      title={isFollowing ? "Click to unfollow" : "Click to follow"}
    >
      {renderContent()}
    </button>
  );
}

export default FollowButton;


// import { useState, useEffect, useCallback } from "react";
// import { followService } from "./FollowService";
// import { account } from "../appwriteConfig";
// import { FiUserPlus, FiCheck, FiUserMinus } from "react-icons/fi";
// import { LuLoader } from "react-icons/lu";

// function FollowButton({ 
//   targetUserId, 
//   onFollowChange = () => {}, 
//   onCountsUpdate = () => {},
//   variant = "default",
//   size = "md",
//   showCounts = false,
//   className = "",
// }) {
//   const [isFollowing, setIsFollowing] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [hasInitialized, setHasInitialized] = useState(false);
//   const [counts, setCounts] = useState({ followers: 0, following: 0 });

//   // Memoized user fetch
//   const getCurrentUser = useCallback(async () => {
//     try {
//       const user = await account.get();
//       setCurrentUserId(user.$id);
//       return user.$id;
//     } catch (error) {
//       console.error("Error getting current user:", error);
//       return null;
//     }
//   }, []);

//   // Memoized status check
//   const checkFollowStatus = useCallback(async (userId, targetId) => {
//     if (!userId || !targetId) return false;
//     try {
//       return await followService.checkFollowStatus(userId, targetId);
//     } catch (error) {
//       console.error("Error checking follow status:", error);
//       return false;
//     }
//   }, []);

//   // Load user counts
//   const loadUserCounts = useCallback(async (userId) => {
//     if (!userId) return;
//     try {
//       const userCounts = await followService.getUserCounts(userId);
//       setCounts(userCounts);
//       onCountsUpdate(userCounts);
//     } catch (error) {
//       console.error("Error loading user counts:", error);
//     }
//   }, [onCountsUpdate]);

//   // Initialize user, status, and counts
//   useEffect(() => {
//     let mounted = true;

//     const initialize = async () => {
//       const userId = await getCurrentUser();
//       if (!mounted || !userId || !targetUserId) return;

//       const [status, userCounts] = await Promise.all([
//         checkFollowStatus(userId, targetUserId),
//         followService.getUserCounts(targetUserId)
//       ]);

//       if (mounted) {
//         setIsFollowing(status);
//         setCounts(userCounts);
//         setHasInitialized(true);
//       }
//     };

//     initialize();

//     return () => {
//       mounted = false;
//     };
//   }, [targetUserId, getCurrentUser, checkFollowStatus]);

//   // Optimized follow handler with immediate feedback and count updates
//   const handleFollow = async () => {
//     if (!currentUserId || isLoading || !hasInitialized) return;

//     const newStatus = !isFollowing;
    
//     // Immediate UI update
//     setIsFollowing(newStatus);
//     setIsLoading(true);
//     onFollowChange(newStatus);

//     try {
//       let success;
//       if (newStatus) {
//         success = await followService.followUser(currentUserId, targetUserId);
//       } else {
//         success = await followService.unfollowUser(currentUserId, targetUserId);
//       }

//       if (success) {
//         // Refresh counts after successful follow/unfollow
//         const updatedCounts = await followService.getUserCounts(targetUserId);
//         setCounts(updatedCounts);
//         onCountsUpdate(updatedCounts);
//       } else {
//         // Revert if operation failed
//         const actualStatus = await checkFollowStatus(currentUserId, targetUserId);
//         setIsFollowing(actualStatus);
//         onFollowChange(actualStatus);
//       }
//     } catch (error) {
//       console.error("Follow toggle failed:", error);
      
//       // Revert on error and re-verify actual status
//       const actualStatus = await checkFollowStatus(currentUserId, targetUserId);
//       setIsFollowing(actualStatus);
//       onFollowChange(actualStatus);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Manual refresh function
//   const refreshData = async () => {
//     if (!currentUserId || !targetUserId) return;
    
//     followService.refreshUserCounts(targetUserId);
//     const [status, userCounts] = await Promise.all([
//       checkFollowStatus(currentUserId, targetUserId),
//       followService.getUserCounts(targetUserId)
//     ]);
    
//     setIsFollowing(status);
//     setCounts(userCounts);
//   };

//   // Don't render until initialized
//   if (!hasInitialized) {
//     return (
//       <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg opacity-50">
//         <LuLoader className="animate-spin text-sm" />
//       </div>
//     );
//   }

//   if (!currentUserId) return null;
  
//   if (currentUserId === targetUserId) {
//     return (
//       <div className="flex items-center gap-2">
//         <span className="text-xs text-gray-500 italic px-3 py-1.5">
//           This is you
//         </span>
//         {showCounts && (
//           <div className="flex gap-4 text-xs text-gray-500">
//             <span>{counts.followers} followers</span>
//             <span>{counts.following} following</span>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Size configurations
//   const sizeConfig = {
//     sm: {
//       button: "px-3 py-1 text-xs gap-1",
//       icon: "text-xs",
//       text: "text-xs",
//       count: "text-xs"
//     },
//     md: {
//       button: "px-4 py-1.5 text-sm gap-1.5", 
//       icon: "text-sm",
//       text: "text-sm",
//       count: "text-xs"
//     },
//     lg: {
//       button: "px-5 py-2 text-base gap-2",
//       icon: "text-base",
//       text: "text-base",
//       count: "text-sm"
//     }
//   };

//   // Variant configurations
//   const variantConfig = {
//     default: {
//       following: {
//         bg: "bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/25 dark:hover:bg-white/20",
//         text: "text-gray-900 dark:text-gray-100",
//         border: "border border-white/30 dark:border-white/20",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-blue-500/20 dark:bg-blue-500/10 backdrop-blur-md hover:bg-blue-500/30 dark:hover:bg-blue-500/20 shadow-sm",
//         text: "text-blue-900 dark:text-blue-100",
//         border: "border border-blue-400/40 dark:border-blue-500/30",
//         icon: FiUserPlus
//       }
//     },
//     outline: {
//       following: {
//         bg: "bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20",
//         text: "text-green-600 dark:text-green-400",
//         border: "border border-green-500",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20",
//         text: "text-blue-600 dark:text-blue-400", 
//         border: "border border-blue-500",
//         icon: FiUserPlus
//       }
//     },
//     minimal: {
//       following: {
//         bg: "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50",
//         text: "text-green-700 dark:text-green-300",
//         border: "",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
//         text: "text-gray-700 dark:text-gray-300",
//         border: "",
//         icon: FiUserPlus
//       }
//     },
//     solid: {
//       following: {
//         bg: "bg-green-500 hover:bg-green-600",
//         text: "text-white",
//         border: "",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-blue-500 hover:bg-blue-600",
//         text: "text-white", 
//         border: "",
//         icon: FiUserPlus
//       }
//     },
//     ghost: {
//       following: {
//         bg: "hover:bg-green-50 dark:hover:bg-green-900/20",
//         text: "text-green-600 dark:text-green-400",
//         border: "",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20", 
//         text: "text-blue-600 dark:text-blue-400",
//         border: "",
//         icon: FiUserPlus
//       }
//     }
//   };

//   const currentSize = sizeConfig[size];
//   const currentVariant = variantConfig[variant];
//   const stateConfig = isFollowing ? currentVariant.following : currentVariant.notFollowing;
//   const IconComponent = stateConfig.icon;

//   const baseClasses = `
//     inline-flex items-center justify-center
//     rounded-lg font-medium transition-all duration-200
//     focus:outline-none focus:ring-2 focus:ring-blue-500/50
//     disabled:opacity-50 disabled:cursor-not-allowed
//     ${currentSize.button}
//     ${stateConfig.bg}
//     ${stateConfig.text}
//     ${stateConfig.border}
//     ${className}
//   `.trim();

//   // Render different content based on variant
//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <>
//           <LuLoader className={`animate-spin ${currentSize.icon}`} />
//           {variant !== "icon" && <span className={currentSize.text}>Loading</span>}
//         </>
//       );
//     }

//     if (variant === "icon") {
//       return <IconComponent className={currentSize.icon} />;
//     }

//     return (
//       <>
//         <IconComponent className={currentSize.icon} />
//         <span className={currentSize.text}>
//           {isFollowing ? "Following" : "Follow"}
//         </span>
//       </>
//     );
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <button
//         onClick={handleFollow}
//         disabled={isLoading}
//         className={baseClasses}
//         aria-label={isFollowing ? `Unfollow user` : `Follow user`}
//         title={isFollowing ? "Click to unfollow" : "Click to follow"}
//       >
//         {renderContent()}
//       </button>

//       {showCounts && (
//         <div className={`flex gap-4 ${currentSize.count} text-gray-500 dark:text-gray-400`}>
//           <span>{counts.followers} followers</span>
//           <span>{counts.following} following</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FollowButton;

// import { useState, useEffect, useCallback } from "react";
// import { followService } from "./FollowService";
// import { account } from "../appwriteConfig";
// import { FiUserPlus, FiCheck, FiUserMinus } from "react-icons/fi";
// import { LuLoader } from "react-icons/lu";

// function FollowButton({ 
//   targetUserId, 
//   onFollowChange = () => {}, 
//   onCountsUpdate = () => {},
//   variant = "default",
//   size = "md",
//   showCounts = false,
//   className = "",
// }) {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [hasInitialized, setHasInitialized] = useState(false);
//   const [counts, setCounts] = useState({ followers: 0, following: 0 });

//   // Memoized user fetch
//   const getCurrentUser = useCallback(async () => {
//     try {
//       const user = await account.get();
//       setCurrentUserId(user.$id);
//       return user.$id;
//     } catch (error) {
//       console.error("Error getting current user:", error);
//       return null;
//     }
//   }, []);

//   // Memoized status check
//   const checkFollowStatus = useCallback(async (userId, targetId) => {
//     if (!userId || !targetId) return false;
//     try {
//       return await followService.checkFollowStatus(userId, targetId);
//     } catch (error) {
//       console.error("Error checking follow status:", error);
//       return false;
//     }
//   }, []);

//   // Load user counts with safe defaults
//   const loadUserCounts = useCallback(async (userId) => {
//     if (!userId) return { followers: 0, following: 0 };
//     try {
//       const userCounts = await followService.getUserCounts(userId);
//       // Ensure we always have an object with both properties
//       const safeCounts = {
//         followers: userCounts?.followers ?? 0,
//         following: userCounts?.following ?? 0
//       };
//       setCounts(safeCounts);
//       onCountsUpdate(safeCounts);
//       return safeCounts;
//     } catch (error) {
//       console.error("Error loading user counts:", error);
//       const fallbackCounts = { followers: 0, following: 0 };
//       setCounts(fallbackCounts);
//       onCountsUpdate(fallbackCounts);
//       return fallbackCounts;
//     }
//   }, [onCountsUpdate]);

//   // Initialize user, status, and counts
//   useEffect(() => {
//     let mounted = true;

//     const initialize = async () => {
//       const userId = await getCurrentUser();
//       if (!mounted || !userId || !targetUserId) return;

//       try {
//         const [status, userCounts] = await Promise.all([
//           checkFollowStatus(userId, targetUserId),
//           loadUserCounts(targetUserId) // Use the safe function
//         ]);

//         if (mounted) {
//           setIsFollowing(status);
//           setHasInitialized(true);
//         }
//       } catch (error) {
//         console.error("Error initializing follow button:", error);
//         if (mounted) {
//           setHasInitialized(true);
//         }
//       }
//     };

//     initialize();

//     return () => {
//       mounted = false;
//     };
//   }, [targetUserId, getCurrentUser, checkFollowStatus, loadUserCounts]);

//   // Optimized follow handler with immediate feedback and count updates
//   const handleFollow = async () => {
//     if (!currentUserId || isLoading || !hasInitialized) return;

//     const newStatus = !isFollowing;
    
//     // Immediate UI update
//     setIsFollowing(newStatus);
//     setIsLoading(true);
//     onFollowChange(newStatus);

//     try {
//       let success;
//       if (newStatus) {
//         success = await followService.followUser(currentUserId, targetUserId);
//       } else {
//         success = await followService.unfollowUser(currentUserId, targetUserId);
//       }

//       if (success) {
//         // Refresh counts after successful follow/unfollow
//         await loadUserCounts(targetUserId);
//       } else {
//         // Revert if operation failed
//         const actualStatus = await checkFollowStatus(currentUserId, targetUserId);
//         setIsFollowing(actualStatus);
//         onFollowChange(actualStatus);
//       }
//     } catch (error) {
//       console.error("Follow toggle failed:", error);
      
//       // Revert on error and re-verify actual status
//       const actualStatus = await checkFollowStatus(currentUserId, targetUserId);
//       setIsFollowing(actualStatus);
//       onFollowChange(actualStatus);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Manual refresh function
//   const refreshData = async () => {
//     if (!currentUserId || !targetUserId) return;
    
//     followService.refreshUserCounts(targetUserId);
//     const [status, userCounts] = await Promise.all([
//       checkFollowStatus(currentUserId, targetUserId),
//       loadUserCounts(targetUserId) // Use the safe function
//     ]);
    
//     setIsFollowing(status);
//   };

//   // Don't render until initialized
//   if (!hasInitialized) {
//     return (
//       <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg opacity-50">
//         <LuLoader className="animate-spin text-sm" />
//       </div>
//     );
//   }

//   if (!currentUserId) return null;
  
//   if (currentUserId === targetUserId) {
//     return (
//       <div className="flex items-center gap-2">
//         <span className="text-xs text-gray-500 italic px-3 py-1.5">
//           This is you
//         </span>
//         {showCounts && (
//           <div className="flex gap-4 text-xs text-gray-500">
//             <span>{counts.followers} followers</span>
//             <span>{counts.following} following</span>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Size configurations
//   const sizeConfig = {
//     sm: {
//       button: "px-3 py-1 text-xs gap-1",
//       icon: "text-xs",
//       text: "text-xs",
//       count: "text-xs"
//     },
//     md: {
//       button: "px-4 py-1.5 text-sm gap-1.5", 
//       icon: "text-sm",
//       text: "text-sm",
//       count: "text-xs"
//     },
//     lg: {
//       button: "px-5 py-2 text-base gap-2",
//       icon: "text-base",
//       text: "text-base",
//       count: "text-sm"
//     }
//   };

//   // Variant configurations
//   const variantConfig = {
//     default: {
//       following: {
//         bg: "bg-white/20 dark:bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/25 dark:hover:bg-white/20",
//         text: "text-gray-900 dark:text-gray-100",
//         border: "border border-white/30 dark:border-white/20",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-blue-500/20 dark:bg-blue-500/10 backdrop-blur-md hover:bg-blue-500/30 dark:hover:bg-blue-500/20 shadow-sm",
//         text: "text-blue-900 dark:text-blue-100",
//         border: "border border-blue-400/40 dark:border-blue-500/30",
//         icon: FiUserPlus
//       }
//     },
//     outline: {
//       following: {
//         bg: "bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20",
//         text: "text-green-600 dark:text-green-400",
//         border: "border border-green-500",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20",
//         text: "text-blue-600 dark:text-blue-400", 
//         border: "border border-blue-500",
//         icon: FiUserPlus
//       }
//     },
//     minimal: {
//       following: {
//         bg: "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50",
//         text: "text-green-700 dark:text-green-300",
//         border: "",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
//         text: "text-gray-700 dark:text-gray-300",
//         border: "",
//         icon: FiUserPlus
//       }
//     },
//     solid: {
//       following: {
//         bg: "bg-green-500 hover:bg-green-600",
//         text: "text-white",
//         border: "",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "bg-blue-500 hover:bg-blue-600",
//         text: "text-white", 
//         border: "",
//         icon: FiUserPlus
//       }
//     },
//     ghost: {
//       following: {
//         bg: "hover:bg-green-50 dark:hover:bg-green-900/20",
//         text: "text-green-600 dark:text-green-400",
//         border: "",
//         icon: FiCheck
//       },
//       notFollowing: {
//         bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20", 
//         text: "text-blue-600 dark:text-blue-400",
//         border: "",
//         icon: FiUserPlus
//       }
//     }
//   };

//   const currentSize = sizeConfig[size];
//   const currentVariant = variantConfig[variant];
//   const stateConfig = isFollowing ? currentVariant.following : currentVariant.notFollowing;
//   const IconComponent = stateConfig.icon;

//   const baseClasses = `
//     inline-flex items-center justify-center
//     rounded-lg font-medium transition-all duration-200
//     focus:outline-none focus:ring-2 focus:ring-blue-500/50
//     disabled:opacity-50 disabled:cursor-not-allowed
//     ${currentSize.button}
//     ${stateConfig.bg}
//     ${stateConfig.text}
//     ${stateConfig.border}
//     ${className}
//   `.trim();

//   // Render different content based on variant
//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <>
//           <LuLoader className={`animate-spin ${currentSize.icon}`} />
//           {variant !== "icon" && <span className={currentSize.text}>Loading</span>}
//         </>
//       );
//     }

//     if (variant === "icon") {
//       return <IconComponent className={currentSize.icon} />;
//     }

//     return (
//       <>
//         <IconComponent className={currentSize.icon} />
//         <span className={currentSize.text}>
//           {isFollowing ? "Following" : "Follow"}
//         </span>
//       </>
//     );
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <button
//         onClick={handleFollow}
//         disabled={isLoading}
//         className={baseClasses}
//         aria-label={isFollowing ? `Unfollow user` : `Follow user`}
//         title={isFollowing ? "Click to unfollow" : "Click to follow"}
//       >
//         {renderContent()}
//       </button>

//       {showCounts && (
//         <div className={`flex gap-4 ${currentSize.count} text-gray-500 dark:text-gray-400`}>
//           <span>{counts.followers} followers</span>
//           <span>{counts.following} following</span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FollowButton;