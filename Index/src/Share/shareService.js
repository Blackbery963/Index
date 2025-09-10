// import { databases, ID } from '../appwriteConfig';

// const SHARES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_SHARE_COLLECTION_ID;
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const METADATA_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID

// // Helper to get or create session ID
// const getSessionId = () => {
//   let sessionId = localStorage.getItem('shareSessionId');
//   if (!sessionId) {
//     sessionId = ID.unique();
//     localStorage.setItem('shareSessionId', sessionId);
//   }
//   return sessionId;
// };

// // Record a share event
// export const recordShare = async (artworkId, platform, userId = null) => {
//   try {
//     await databases.createDocument(
//       DATABASE_ID,
//       SHARES_COLLECTION_ID,
//       ID.unique(),
//       {
//         artworkId,
//         userId,
//         sessionId: userId ? null : getSessionId(),
//         platform,
//         createdAt: new Date().toISOString()
//       }
//     );
    
//     // Update share count in metadata collection
//     const artworkDoc = await databases.getDocument(
//       DATABASE_ID,
//       METADATA_ID, // Your metadata collection
//       artworkId
//     );
    
//     const currentShares = artworkDoc.shares || 0;
//     await databases.updateDocument(
//       DATABASE_ID,
//       METADATA_ID,
//       artworkId,
//       { shares: currentShares + 1 }
//     );
    
//     return currentShares + 1;
//   } catch (error) {
//     console.error('Error recording share:', error);
//     throw error;
//   }
// };

// // Get share count for an artwork
// export const getShareCount = async (artworkId) => {
//   try {
//     const artworkDoc = await databases.getDocument(
//       DATABASE_ID,
//       METADATA_ID,
//       artworkId
//     );
//     return artworkDoc.shares || 0;
//   } catch (error) {
//     console.error('Error getting share count:', error);
//     return 0;
//   }
// };

// // Get shares by platform (for analytics)
// export const getSharesByPlatform = async (artworkId) => {
//   try {
//     const response = await databases.listDocuments(
//       DATABASE_ID,
//       SHARES_COLLECTION_ID,
//       [Query.equal('artworkId', artworkId)]
//     );
    
//     return response.documents.reduce((acc, share) => {
//       acc[share.platform] = (acc[share.platform] || 0) + 1;
//       return acc;
//     }, {});
//   } catch (error) {
//     console.error('Error getting shares by platform:', error);
//     return {};
//   }
// };



// import { databases, ID, Query } from '../appwriteConfig';

// const SHARES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_SHARE_COLLECTION_ID;
// const TEMPORARY_SHARES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TEMPORARY_SHARES_COLLECTION_ID;
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const METADATA_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

// // Helper to get or create session ID
// const getSessionId = () => {
//   let sessionId = localStorage.getItem('shareSessionId');
//   if (!sessionId) {
//     sessionId = ID.unique();
//     localStorage.setItem('shareSessionId', sessionId);
//   }
//   return sessionId;
// };

// // Record a share event
// export const recordShare = async (artworkId, platform, userId = null, expiresInHours = null) => {
//   try {
//     await databases.createDocument(
//       DATABASE_ID,
//       SHARES_COLLECTION_ID,
//       ID.unique(),
//       {
//         artworkId,
//         userId,
//         sessionId: userId ? null : getSessionId(),
//         platform,
//         expiresInHours,
//         createdAt: new Date().toISOString()
//       }
//     );
    
//     // Update share count in metadata collection
//     const artworkDoc = await databases.getDocument(
//       DATABASE_ID,
//       METADATA_ID,
//       artworkId
//     );
    
//     const currentShares = artworkDoc.shares || 0;
//     await databases.updateDocument(
//       DATABASE_ID,
//       METADATA_ID,
//       artworkId,
//       { shares: currentShares + 1 }
//     );
    
//     return currentShares + 1;
//   } catch (error) {
//     console.error('Error recording share:', error);
//     throw error;
//   }
// };

// // Get share count for an artwork
// export const getShareCount = async (artworkId) => {
//   try {
//     const artworkDoc = await databases.getDocument(
//       DATABASE_ID,
//       METADATA_ID,
//       artworkId
//     );
//     return artworkDoc.shares || 0;
//   } catch (error) {
//     console.error('Error getting share count:', error);
//     return 0;
//   }
// };

// // Get shares by platform (for analytics)
// export const getSharesByPlatform = async (artworkId) => {
//   try {
//     const response = await databases.listDocuments(
//       DATABASE_ID,
//       SHARES_COLLECTION_ID,
//       [Query.equal('artworkId', artworkId)]
//     );
    
//     return response.documents.reduce((acc, share) => {
//       acc[share.platform] = (acc[share.platform] || 0) + 1;
//       return acc;
//     }, {});
//   } catch (error) {
//     console.error('Error getting shares by platform:', error);
//     return {};
//   }
// };

// // Create a temporary share link with expiration
// export const createTemporaryShare = async (artworkId, expiresInHours = 24) => {
//   try {
//     // Create a unique token for the temporary share
//     const token = ID.unique();
//     const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString();
    
//     // Store in Appwrite database
//     await databases.createDocument(
//       DATABASE_ID,
//       TEMPORARY_SHARES_COLLECTION_ID,
//       token,
//       {
//         artworkId,
//         expiresAt,
//         token,
//         createdAt: new Date().toISOString()
//       }
//     );
    
//     return {
//       token,
//       url: `${window.location.origin}/share/${token}`,
//       expiresAt
//     };
//   } catch (error) {
//     console.error('Error creating temporary share:', error);
//     throw error;
//   }
// };

// // Validate a temporary share token
// export const validateTemporaryShare = async (token) => {
//   try {
//     const shareDoc = await databases.getDocument(
//       DATABASE_ID,
//       TEMPORARY_SHARES_COLLECTION_ID,
//       token
//     );
    
//     const now = new Date();
//     const expiresAt = new Date(shareDoc.expiresAt);
    
//     if (now > expiresAt) {
//       // Delete expired share
//       await databases.deleteDocument(
//         DATABASE_ID,
//         TEMPORARY_SHARES_COLLECTION_ID,
//         token
//       );
//       return { valid: false, artworkId: null };
//     }
    
//     return { valid: true, artworkId: shareDoc.artworkId };
//   } catch (error) {
//     console.error('Error validating temporary share:', error);
//     return { valid: false, artworkId: null };
//   }
// };

// // Clean up expired temporary shares (can be run as a scheduled function)
// export const cleanupExpiredShares = async () => {
//   try {
//     const now = new Date().toISOString();
//     const expiredShares = await databases.listDocuments(
//       DATABASE_ID,
//       TEMPORARY_SHARES_COLLECTION_ID,
//       [Query.lessThan('expiresAt', now)]
//     );
    
//     // Delete all expired shares
//     const deletePromises = expiredShares.documents.map(doc => 
//       databases.deleteDocument(DATABASE_ID, TEMPORARY_SHARES_COLLECTION_ID, doc.$id)
//     );
    
//     await Promise.all(deletePromises);
//     return { deleted: expiredShares.documents.length };
//   } catch (error) {
//     console.error('Error cleaning up expired shares:', error);
//     throw error;
//   }
// };

// // Get temporary share info
// export const getTemporaryShareInfo = async (token) => {
//   try {
//     const shareDoc = await databases.getDocument(
//       DATABASE_ID,
//       TEMPORARY_SHARES_COLLECTION_ID,
//       token
//     );
    
//     return {
//       artworkId: shareDoc.artworkId,
//       expiresAt: shareDoc.expiresAt,
//       createdAt: shareDoc.createdAt,
//       isValid: new Date() < new Date(shareDoc.expiresAt)
//     };
//   } catch (error) {
//     console.error('Error getting temporary share info:', error);
//     return null;
//   }
// };



import { databases, ID, Query } from '../appwriteConfig';

const SHARES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_SHARE_COLLECTION_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const METADATA_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

// Helper to get or create session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('shareSessionId');
  if (!sessionId) {
    sessionId = ID.unique();
    localStorage.setItem('shareSessionId', sessionId);
  }
  return sessionId;
};

// Record a share event
export const recordShare = async (artworkId, platform, userId = null) => {
  try {
    await databases.createDocument(
      DATABASE_ID,
      SHARES_COLLECTION_ID,
      ID.unique(),
      {
        artworkId,
        userId,
        sessionId: userId ? null : getSessionId(),
        platform,
        createdAt: new Date().toISOString()
      }
    );
    
    // Update share count in metadata collection
    const artworkDoc = await databases.getDocument(
      DATABASE_ID,
      METADATA_ID,
      artworkId
    );
    
    const currentShares = artworkDoc.shares || 0;
    await databases.updateDocument(
      DATABASE_ID,
      METADATA_ID,
      artworkId,
      { shares: currentShares + 1 }
    );
    
    return currentShares + 1;
  } catch (error) {
    console.error('Error recording share:', error);
    throw error;
  }
};

// Get share count for an artwork
export const getShareCount = async (artworkId) => {
  try {
    const artworkDoc = await databases.getDocument(
      DATABASE_ID,
      METADATA_ID,
      artworkId
    );
    return artworkDoc.shares || 0;
  } catch (error) {
    console.error('Error getting share count:', error);
    return 0;
  }
};

// Get shares by platform (for analytics)
export const getSharesByPlatform = async (artworkId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SHARES_COLLECTION_ID,
      [Query.equal('artworkId', artworkId)]
    );
    
    return response.documents.reduce((acc, share) => {
      acc[share.platform] = (acc[share.platform] || 0) + 1;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error getting shares by platform:', error);
    return {};
  }
};