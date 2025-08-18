// // src/services/followService.js
// import { databases, account, Query } from '../appwriteConfig';

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
//       await databases.getDocument(
//         DATABASE_ID,
//         FOLLOWS_COLLECTION,
//         `${currentUserId}_${targetUserId}`
//       );
//       return true;
//     } catch (error) {
//       if (error.code !== 404) { // Only log if it's not a "not found" error
//         console.error('Error checking follow status:', error);
//       }
//       return false;
//     }
//   },

//   // Follow a user
//   followUser: async (currentUserId, targetUserId) => {
//     return databases.createDocument(
//       DATABASE_ID,
//       FOLLOWS_COLLECTION,
//       `${currentUserId}_${targetUserId}`,
//       {
//         follower: currentUserId,
//         following: targetUserId,
//         createdAt: new Date().toISOString()
//       }
//     );
//   },

//   // Unfollow a user
//   unfollowUser: async (currentUserId, targetUserId) => {
//     return databases.deleteDocument(
//       DATABASE_ID,
//       FOLLOWS_COLLECTION,
//       `${currentUserId}_${targetUserId}`
//     );
//   },

//   // Get follower count for a user
//   getFollowerCount: async (userId) => {
//     const response = await databases.listDocuments(
//       DATABASE_ID,
//       FOLLOWS_COLLECTION,
//       [Query.equal('following', userId)]
//     );
//     return response.total;
//   },

//   // Get following count for a user
//   getFollowingCount: async (userId) => {
//     const response = await databases.listDocuments(
//       DATABASE_ID,
//       FOLLOWS_COLLECTION,
//       [Query.equal('follower', userId)]
//     );
//     return response.total;
//   },

//   // Update cached counts after follow/unfollow
//   updateUserCounts: async (followerId, followingId, isFollowing) => {
//     const change = isFollowing ? 1 : -1;
    
//     try {
//       // Update follower's following count
//       await databases.updateDocument(
//         DATABASE_ID,
//         USERS_COLLECTION,
//         followerId,
//         { followingCount: Query.increment(change) }
//       );
      
//       // Update following user's follower count
//       await databases.updateDocument(
//         DATABASE_ID,
//         USERS_COLLECTION,
//         followingId,
//         { followerCount: Query.increment(change) }
//       );
//     } catch (error) {
//       console.error('Error updating user counts:', error);
//       throw error; // Re-throw to handle in calling function
//     }
//   }
// };



import { databases, account, Query, ID } from '../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const FOLLOWS_COLLECTION = import.meta.env.VITE_APPWRITE_FOLLOWER_COLLECTION_ID;
const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

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
      // Already following, do nothing
      console.warn('User already followed');
      return;
    }

    // Otherwise, create new follow doc
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

    // Update counts
    await followService.updateUserCounts(currentUserId, targetUserId, true);
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
        // Update follower and following counts
        await followService.updateUserCounts(currentUserId, targetUserId, false);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  },

  // Get follower count
  getFollowerCount: async (userId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [Query.equal('following', userId)]
      );
      return response.total;
    } catch (error) {
      console.error('Error getting follower count:', error);
      return 0;
    }
  },

  // Get following count
  getFollowingCount: async (userId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        FOLLOWS_COLLECTION,
        [Query.equal('follower', userId)]
      );
      return response.total;
    } catch (error) {
      console.error('Error getting following count:', error);
      return 0;
    }
  },

  // Update follower & following counts manually
  updateUserCounts: async (followerId, followingId, isFollowing) => {
    const change = isFollowing ? 1 : -1;

    try {
      // Fetch follower and following user documents
      const followerDocPromise = databases.getDocument(DATABASE_ID, USERS_COLLECTION, followerId);
      const followingDocPromise = databases.getDocument(DATABASE_ID, USERS_COLLECTION, followingId);

      const [followerDoc, followingDoc] = await Promise.all([followerDocPromise, followingDocPromise]);

      // Update follower count for the target user (followingId)
      const newFollowerCount = Math.max(0, (followingDoc.followerCount || 0) + change);
      await databases.updateDocument(DATABASE_ID, USERS_COLLECTION, followingId, {
        followerCount: newFollowerCount
      });

      // Update following count for the current user (followerId)
      const newFollowingCount = Math.max(0, (followerDoc.followingCount || 0) + change);
      await databases.updateDocument(DATABASE_ID, USERS_COLLECTION, followerId, {
        followingCount: newFollowingCount
      });
    } catch (error) {
      console.error('Error updating user counts:', error);
      throw error;
    }
  }
};