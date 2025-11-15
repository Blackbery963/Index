// import { databases, account, Query, ID } from '../appwriteConfig';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const FOLLOWS_COLLECTION = import.meta.env.VITE_APPWRITE_FOLLOWER_COLLECTION_ID;
// const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

// export const followService = {
//   // Get current user ID
//   getCurrentUserId: async () => {
//     try {
//       const user = await account.get();
//       return user.$id;
//     } catch (error) {
//       console.error('Error getting current user:', error);
//       return null;
//     }
//   },

//   // Check if current user is following target user
//   checkFollowStatus: async (currentUserId, targetUserId) => {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         FOLLOWS_COLLECTION,
//         [
//           Query.equal('follower', currentUserId),
//           Query.equal('following', targetUserId)
//         ]
//       );
//       return response.total > 0;
//     } catch (error) {
//       console.error('Error checking follow status:', error);
//       return false;
//     }
//   },

//   // Follow a user
// followUser: async (currentUserId, targetUserId) => {
//   try {
//     // Check if already following
//     const existing = await databases.listDocuments(
//       DATABASE_ID,
//       FOLLOWS_COLLECTION,
//       [
//         Query.equal('follower', currentUserId),
//         Query.equal('following', targetUserId)
//       ]
//     );

//     if (existing.total > 0) {
//       // Already following, do nothing
//       console.warn('User already followed');
//       return;
//     }

//     // Otherwise, create new follow doc
//     await databases.createDocument(
//       DATABASE_ID,
//       FOLLOWS_COLLECTION,
//       ID.unique(),
//       {
//         follower: currentUserId,
//         following: targetUserId,
//         createdAt: new Date().toISOString()
//       }
//     );

//     // Update counts
//     await followService.updateUserCounts(currentUserId, targetUserId, true);
//   } catch (error) {
//     console.error('Error following user:', error);
//     throw error;
//   }
// },


//   // Unfollow a user
//   unfollowUser: async (currentUserId, targetUserId) => {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         FOLLOWS_COLLECTION,
//         [
//           Query.equal('follower', currentUserId),
//           Query.equal('following', targetUserId)
//         ]
//       );
//       if (response.total > 0) {
//         const documentId = response.documents[0].$id;
//         await databases.deleteDocument(
//           DATABASE_ID,
//           FOLLOWS_COLLECTION,
//           documentId
//         );
//         // Update follower and following counts
//         await followService.updateUserCounts(currentUserId, targetUserId, false);
//       }
//     } catch (error) {
//       console.error('Error unfollowing user:', error);
//       throw error;
//     }
//   },

//   // Get follower count
//   getFollowerCount: async (userId) => {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         FOLLOWS_COLLECTION,
//         [Query.equal('following', userId)]
//       );
//       return response.total;
//     } catch (error) {
//       console.error('Error getting follower count:', error);
//       return 0;
//     }
//   },

//   // Get following count
//   getFollowingCount: async (userId) => {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         FOLLOWS_COLLECTION,
//         [Query.equal('follower', userId)]
//       );
//       return response.total;
//     } catch (error) {
//       console.error('Error getting following count:', error);
//       return 0;
//     }
//   },

//   // Update follower & following counts manually
//   updateUserCounts: async (followerId, followingId, isFollowing) => {
//     const change = isFollowing ? 1 : -1;

//     try {
//       // Fetch follower and following user documents
//       const followerDocPromise = databases.getDocument(DATABASE_ID, USERS_COLLECTION, followerId);
//       const followingDocPromise = databases.getDocument(DATABASE_ID, USERS_COLLECTION, followingId);

//       const [followerDoc, followingDoc] = await Promise.all([followerDocPromise, followingDocPromise]);

//       // Update follower count for the target user (followingId)
//       const newFollowerCount = Math.max(0, (followingDoc.followerCount || 0) + change);
//       await databases.updateDocument(DATABASE_ID, USERS_COLLECTION, followingId, {
//         followerCount: newFollowerCount
//       });

//       // Update following count for the current user (followerId)
//       const newFollowingCount = Math.max(0, (followerDoc.followingCount || 0) + change);
//       await databases.updateDocument(DATABASE_ID, USERS_COLLECTION, followerId, {
//         followingCount: newFollowingCount
//       });
//     } catch (error) {
//       console.error('Error updating user counts:', error);
//       throw error;
//     }
//   }
// };

import { databases, account, Query, ID } from '../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const FOLLOWS_COLLECTION = import.meta.env.VITE_APPWRITE_FOLLOWER_COLLECTION_ID;
const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

// Cache for user counts to reduce database calls
const userCountsCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

export const followService = {
  // Get current user ID
  getCurrentUserId: async () => {
    try {
      const user = await account.get();
      return user.$id;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Check if current user is following target user
  checkFollowStatus: async (currentUserId, targetUserId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [
          Query.equal('follower', currentUserId),
          Query.equal('following', targetUserId)
        ]
      );
      return response.total > 0;
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  },

  getFollowersWithDetails: async (userId, limit = 50) => {
    try {
      const followers = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [
          Query.equal('following', userId),
          Query.limit(limit),
          Query.orderDesc('createdAt')
        ]
      );

      // Get user details for each follower
      const followerDetails = await Promise.all(
        followers.documents.map(async (follow) => {
          try {
            const user = await databases.getDocument(
              DATABASE_ID,
              USERS_COLLECTION,
              follow.follower
            );
            return {
              id: user.$id,
              name: user.name || user.username,
              username: user.username,
              profileImage: user.profileImageUrl,
              bio: user.bio,
              followedAt: follow.createdAt
            };
          } catch (error) {
            console.error('Error fetching follower details:', error);
            return null;
          }
        })
      );

      return followerDetails.filter(Boolean);
    } catch (error) {
      console.error('Error getting followers with details:', error);
      return [];
    }
  },

  // Get following with user details


  // Follow a user
  followUser: async (currentUserId, targetUserId) => {
    try {
      // Check if already following
      const existing = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [
          Query.equal('follower', currentUserId),
          Query.equal('following', targetUserId)
        ]
      );

      if (existing.total > 0) {
        console.warn('User already followed');
        return;
      }

      // Create new follow document
      await databases.createDocument(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        ID.unique(),
        {
          follower: currentUserId,
          following: targetUserId,
          createdAt: new Date().toISOString()
        }
      );

      // Invalidate cache for both users
      userCountsCache.delete(currentUserId);
      userCountsCache.delete(targetUserId);

      return true;
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  },

  // Unfollow a user
  unfollowUser: async (currentUserId, targetUserId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [
          Query.equal('follower', currentUserId),
          Query.equal('following', targetUserId)
        ]
      );
      
      if (response.total > 0) {
        const documentId = response.documents[0].$id;
        await databases.deleteDocument(
          DATABASE_ID,
          FOLLOWS_COLLECTION,
          documentId
        );

        // Invalidate cache for both users
        userCountsCache.delete(currentUserId);
        userCountsCache.delete(targetUserId);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  },

  // Get follower count with caching
  getFollowerCount: async (userId) => {
    try {
      const cacheKey = `follower_${userId}`;
      const cached = userCountsCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.count;
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [Query.equal('following', userId)]
      );
      
      const count = response.total;
      userCountsCache.set(cacheKey, { count, timestamp: Date.now() });
      
      return count;
    } catch (error) {
      console.error('Error getting follower count:', error);
      return 0;
    }
  },

  // Get following count with caching
  getFollowingCount: async (userId) => {
    try {
      const cacheKey = `following_${userId}`;
      const cached = userCountsCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.count;
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [Query.equal('follower', userId)]
      );
      
      const count = response.total;
      userCountsCache.set(cacheKey, { count, timestamp: Date.now() });
      
      return count;
    } catch (error) {
      console.error('Error getting following count:', error);
      return 0;
    }
  },

  // Get both counts in one call (optimized)
  getUserCounts: async (userId) => {
    try {
      const [followers, following] = await Promise.all([
        followService.getFollowerCount(userId),
        followService.getFollowingCount(userId)
      ]);
      
      return { followers, following };
    } catch (error) {
      console.error('Error getting user counts:', error);
      return { followers: 0, following: 0 };
    }
  },

  // Get followers list
  getFollowers: async (userId, limit = 20) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [
          Query.equal('following', userId),
          Query.limit(limit),
          Query.orderDesc('createdAt')
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error getting followers:', error);
      return [];
    }
  },

  // Get following list
  getFollowing: async (userId, limit = 20) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [
          Query.equal('follower', userId),
          Query.limit(limit),
          Query.orderDesc('createdAt')
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error getting following:', error);
      return [];
    }
  },

  // Clear cache (useful for testing or manual refresh)
  clearCache: () => {
    userCountsCache.clear();
  },

  // Force refresh counts for a user
  refreshUserCounts: (userId) => {
    userCountsCache.delete(`follower_${userId}`);
    userCountsCache.delete(`following_${userId}`);
  }
};

  getFollowingWithDetails: async (userId, limit = 50) => {
    try {
      const following = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [
          Query.equal('follower', userId),
          Query.limit(limit),
          Query.orderDesc('createdAt')
        ]
      );

      // Get user details for each followed user
      const followingDetails = await Promise.all(
        following.documents.map(async (follow) => {
          try {
            const user = await databases.getDocument(
              DATABASE_ID,
              USERS_COLLECTION,
              follow.following
            );
            return {
              id: user.$id,
              name: user.name || user.username,
              username: user.username,
              profileImage: user.profileImageUrl,
              bio: user.bio,
              followedAt: follow.createdAt
            };
          } catch (error) {
            console.error('Error fetching following details:', error);
            return null;
          }
        })
      );

      return followingDetails.filter(Boolean);
    } catch (error) {
      console.error('Error getting following with details:', error);
      return [];
    }
  };

  // Check mutual follow status
  checkMutualFollow: async (currentUserId, targetUserId) => {
    try {
      const [isFollowing, isFollowedBy] = await Promise.all([
        followService.checkFollowStatus(currentUserId, targetUserId),
        followService.checkFollowStatus(targetUserId, currentUserId)
      ]);
      
      return { isFollowing, isFollowedBy };
    } catch (error) {
      console.error('Error checking mutual follow:', error);
      return { isFollowing: false, isFollowedBy: false };
    
  
}
}































// import { databases, account, Query, ID } from '../appwriteConfig';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const FOLLOWS_COLLECTION = import.meta.env.VITE_APPWRITE_FOLLOWER_COLLECTION_ID;
// const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

// export const followService = {
//   // ... your existing methods ...

//   // Get followers with user details
//   getFollowersWithDetails: async (userId, limit = 50) => {
//     try {
//       const followers = await databases.listDocuments(
//         DATABASE_ID,
//         FOLLOWS_COLLECTION,
//         [
//           Query.equal('following', userId),
//           Query.limit(limit),
//           Query.orderDesc('createdAt')
//         ]
//       );

//       // Get user details for each follower
//       const followerDetails = await Promise.all(
//         followers.documents.map(async (follow) => {
//           try {
//             const user = await databases.getDocument(
//               DATABASE_ID,
//               USERS_COLLECTION,
//               follow.follower
//             );
//             return {
//               id: user.$id,
//               name: user.name || user.username,
//               username: user.username,
//               profileImage: user.profileImageUrl,
//               bio: user.bio,
//               followedAt: follow.createdAt
//             };
//           } catch (error) {
//             console.error('Error fetching follower details:', error);
//             return null;
//           }
//         })
//       );

//       return followerDetails.filter(Boolean);
//     } catch (error) {
//       console.error('Error getting followers with details:', error);
//       return [];
//     }
//   },

//   // Get following with user details
//   getFollowingWithDetails: async (userId, limit = 50) => {
//     try {
//       const following = await databases.listDocuments(
//         DATABASE_ID,
//         FOLLOWS_COLLECTION,
//         [
//           Query.equal('follower', userId),
//           Query.limit(limit),
//           Query.orderDesc('createdAt')
//         ]
//       );

//       // Get user details for each followed user
//       const followingDetails = await Promise.all(
//         following.documents.map(async (follow) => {
//           try {
//             const user = await databases.getDocument(
//               DATABASE_ID,
//               USERS_COLLECTION,
//               follow.following
//             );
//             return {
//               id: user.$id,
//               name: user.name || user.username,
//               username: user.username,
//               profileImage: user.profileImageUrl,
//               bio: user.bio,
//               followedAt: follow.createdAt
//             };
//           } catch (error) {
//             console.error('Error fetching following details:', error);
//             return null;
//           }
//         })
//       );

//       return followingDetails.filter(Boolean);
//     } catch (error) {
//       console.error('Error getting following with details:', error);
//       return [];
//     }
//   },

//   // Check mutual follow status
//   checkMutualFollow: async (currentUserId, targetUserId) => {
//     try {
//       const [isFollowing, isFollowedBy] = await Promise.all([
//         followService.checkFollowStatus(currentUserId, targetUserId),
//         followService.checkFollowStatus(targetUserId, currentUserId)
//       ]);
      
//       return { isFollowing, isFollowedBy };
//     } catch (error) {
//       console.error('Error checking mutual follow:', error);
//       return { isFollowing: false, isFollowedBy: false };
//     }
//   }
// };