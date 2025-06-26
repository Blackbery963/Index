import { databases, ID } from '../appwriteConfig';

const SHARES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_SHARE_COLLECTION_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const METADATA_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID

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
      METADATA_ID, // Your metadata collection
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