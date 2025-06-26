// import { databases,ID, Query } from '../appwriteConfig';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const ENGAGEMENTS_COLLECTION = import.meta.env.VITE_APPWRITE_ENGAGEMENT_COLLECTION_ID;
// const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_USER_ACTIVITY_COLLECTION_ID;

// const createDocId = (userId, targetId, type) => {
//   const clean = `${userId}_${targetId}_${type}`
//     .replace(/[^a-zA-Z0-9_]/g, '') // remove unsupported characters
//     .replace(/^_+/, '')            // no leading underscores
//     .slice(0, 36);                 // max 36 chars
//   return clean;
// };

// export const engagementService = {
//   // Record an engagement
//   recordEngagement: async (userId, targetType, targetId, engagementType, metadata = {}) => {
//     // const docId = `${userId}_${targetId}_${engagementType}`;
//     // const docId = ID.unique()
//     const docId = createDocId(userId, targetId, engagementType);

//     try {
//       await databases.createDocument(
//         DATABASE_ID,
//         ENGAGEMENTS_COLLECTION,
//         docId,
//         {
//           userId,
//           targetType,
//           targetId,
//           engagementType,
//           createdAt: new Date().toISOString(),
//           metadata: JSON.stringify(metadata)
//         }
//       );
//     } catch (error) {
//       if (error.code !== 409) {
//         console.error('Error recording engagement:', error);
//         throw error;
//       }
//       // If already exists (409 conflict), ignore
//     }

//     // Optionally update user stats
//     if (targetType === 'user') {
//       const fieldMap = {
//         like: 'artworkLikesReceived',
//         favorite: 'artworkFavoritesReceived',
//         share: 'sharesReceived',
//         download: 'downloadsReceived',
//       };

//       const fieldName = fieldMap[engagementType];
//       if (fieldName) {
//         const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION, targetId);
//         const currentCount = userDoc[fieldName] || 0;

//         await databases.updateDocument(
//           DATABASE_ID,
//           USERS_COLLECTION,
//           targetId,
//           { [fieldName]: currentCount + 1 }
//         );
//       }
//     }
//   },

//   // Remove an engagement
//   removeEngagement: async (userId, targetType, targetId, engagementType) => {
//     // const docId = `${userId}_${targetId}_${engagementType}`;
//         // const docId = ID.unique()
//     const docId = createDocId(userId, targetId, engagementType);

//     try {
//       await databases.deleteDocument(DATABASE_ID, ENGAGEMENTS_COLLECTION, docId);
//     } catch (error) {
//       if (error.code !== 404) {
//         console.error('Error removing engagement:', error);
//         throw error;
//       }
//     }

//     // Optionally update user stats
//     if (targetType === 'user') {
//       const fieldMap = {
//         like: 'artworkLikesReceived',
//         favorite: 'artworkFavoritesReceived',
//         share: 'sharesReceived',
//         download: 'downloadsReceived',
//       };

//       const fieldName = fieldMap[engagementType];
//       if (fieldName) {
//         const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION, targetId);
//         const currentCount = userDoc[fieldName] || 0;

//         await databases.updateDocument(
//           DATABASE_ID,
//           USERS_COLLECTION,
//           targetId,
//           { [fieldName]: Math.max(0, currentCount - 1) }
//         );
//       }
//     }
//   },

//   // Check if engagement exists
//   checkEngagement: async (userId, targetId, engagementType) => {
//     // const docId = `${userId}_${targetId}_${engagementType}`;
//     // const docId = ID.unique()
//     const docId = createDocId(userId, targetId, engagementType);

//     try {
//       await databases.getDocument(DATABASE_ID, ENGAGEMENTS_COLLECTION, docId);
//       return true;
//     } catch (error) {
//       if (error.code === 404) return false;
//       console.error('Error checking engagement:', error);
//       throw error;
//     }
//   },

//   // Count total engagements for a target (e.g., likes)
//   getEngagementCount: async (targetId, engagementType) => {
//     const result = await databases.listDocuments(
//       DATABASE_ID,
//       ENGAGEMENTS_COLLECTION,
//       [
//         Query.equal('targetId', targetId),
//         Query.equal('engagementType', engagementType)
//       ]
//     );
//     return result.total;
//   },

//   // Toggle like
//   toggleLike: async (userId, targetId) => {
//     const targetType = 'artwork';

//     try {
//       const isLiked = await engagementService.checkEngagement(userId, targetId, 'like');

//       if (isLiked) {
//         await engagementService.removeEngagement(userId, targetType, targetId, 'like');
//         return { liked: false, countChange: -1 };
//       } else {
//         await engagementService.recordEngagement(userId, targetType, targetId, 'like');
//         return { liked: true, countChange: 1 };
//       }
//     } catch (error) {
//       console.error('Error toggling like:', error);
//       throw error;
//     }
//   }
// };



import { databases, ID, Query } from '../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const ENGAGEMENTS_COLLECTION = import.meta.env.VITE_APPWRITE_ENGAGEMENT_COLLECTION_ID;
const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_USER_ACTIVITY_COLLECTION_ID;

// Helper to create safe, valid document ID
const createDocId = (userId, targetId, type) => {
  const clean = `${userId}_${targetId}_${type}`
    .replace(/[^a-zA-Z0-9_]/g, '') // Remove unsupported characters
    .replace(/^_+/, '')            // No leading underscores
    .slice(0, 36);                 // Max 36 characters
  return clean;
};

export const engagementService = {
  // Record an engagement
  recordEngagement: async (userId, targetType, targetId, engagementType, metadata = {}) => {
    const docId = createDocId(userId, targetId, engagementType);
    let created = false;

    try {
      await databases.createDocument(
        DATABASE_ID,
        ENGAGEMENTS_COLLECTION,
        docId,
        {
          userId,
          targetType,
          targetId,
          engagementType,
          createdAt: new Date().toISOString(),
          metadata: JSON.stringify(metadata)
        }
      );
      created = true;
    } catch (error) {
      if (error.code !== 409) {
        console.error('Error recording engagement:', error);
        throw error;
      }
      // 409 = already exists, so skip stat update
    }

    // Update stats only if engagement was newly created
    if (created && targetType === 'user') {
      const fieldMap = {
        like: 'artworkLikesReceived',
        favorite: 'artworkFavoritesReceived',
        share: 'sharesReceived',
        download: 'downloadsReceived',
      };

      const fieldName = fieldMap[engagementType];
      if (fieldName) {
        const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION, targetId);
        const currentCount = userDoc[fieldName] || 0;

        await databases.updateDocument(
          DATABASE_ID,
          USERS_COLLECTION,
          targetId,
          { [fieldName]: currentCount + 1 }
        );
      }
    }
  },

  // Remove an engagement
  removeEngagement: async (userId, targetType, targetId, engagementType) => {
    const docId = createDocId(userId, targetId, engagementType);

    try {
      await databases.deleteDocument(DATABASE_ID, ENGAGEMENTS_COLLECTION, docId);
    } catch (error) {
      if (error.code !== 404) {
        console.error('Error removing engagement:', error);
        throw error;
      }
    }

    // Optionally update user stats
    if (targetType === 'user') {
      const fieldMap = {
        like: 'artworkLikesReceived',
        favorite: 'artworkFavoritesReceived',
        share: 'sharesReceived',
        download: 'downloadsReceived',
      };

      const fieldName = fieldMap[engagementType];
      if (fieldName) {
        const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION, targetId);
        const currentCount = userDoc[fieldName] || 0;

        await databases.updateDocument(
          DATABASE_ID,
          USERS_COLLECTION,
          targetId,
          { [fieldName]: Math.max(0, currentCount - 1) }
        );
      }
    }
  },

  // Check if engagement exists
  checkEngagement: async (userId, targetId, engagementType) => {
    const docId = createDocId(userId, targetId, engagementType);

    try {
      await databases.getDocument(DATABASE_ID, ENGAGEMENTS_COLLECTION, docId);
      return true;
    } catch (error) {
      if (error.code === 404) return false;
      console.error('Error checking engagement:', error);
      throw error;
    }
  },

  // Count total engagements for a target (e.g., likes)
  getEngagementCount: async (targetId, engagementType) => {
    const result = await databases.listDocuments(
      DATABASE_ID,
      ENGAGEMENTS_COLLECTION,
      [
        Query.equal('targetId', targetId),
        Query.equal('engagementType', engagementType)
      ]
    );
    return result.total;
  },

  // Toggle like
  toggleLike: async (userId, targetId) => {
    const targetType = 'artwork';

    try {
      const isLiked = await engagementService.checkEngagement(userId, targetId, 'like');

      if (isLiked) {
        await engagementService.removeEngagement(userId, targetType, targetId, 'like');
        return { liked: false, countChange: -1 };
      } else {
        await engagementService.recordEngagement(userId, targetType, targetId, 'like');
        return { liked: true, countChange: 1 };
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }
};
