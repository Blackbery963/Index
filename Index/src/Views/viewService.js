import { databases, ID, Query } from '../appwriteConfig';
import Cookies from 'js-cookie'; // For session management

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const VIEWS_COLLECTION = import.meta.env.VITE_APPWRITE_VIEWS_COLLECTION_ID;
const METADATA_COLLECTION = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

// Helper: Generate or retrieve a session ID for anonymous users
const getSessionId = () => {
  let sessionId = Cookies.get('sessionId');
  if (!sessionId) {
    sessionId = ID.unique();
    Cookies.set('sessionId', sessionId, { expires: 1 }); // Expires in 1 day
  }
  return sessionId;
};

// Helper: Check if a view exists for a user or session
export const checkArtworkView = async (userId, artworkId, sessionId) => {
  const docId = userId 
    ? `${userId}_${artworkId}`.slice(0, 36) 
    : `${sessionId}_${artworkId}`.slice(0, 36);

  try {
    await databases.getDocument(DATABASE_ID, VIEWS_COLLECTION, docId);
    return true;
  } catch (err) {
    if (err.code === 404) return false;
    throw new Error(`Failed to check view: ${err.message}`);
  }
};

// Record a view
export const recordArtworkView = async (userId, artworkId) => {
  if (!artworkId) {
    throw new Error('Artwork ID is required');
  }

  // Generate session ID for anonymous users
  const sessionId = userId ? null : getSessionId();

  // Check if the user or session has already viewed the artwork
  const hasViewed = await checkArtworkView(userId, artworkId, sessionId);
  if (hasViewed) {
    return false; // View already recorded
  }

  const docId = userId 
    ? `${userId}_${artworkId}`.slice(0, 36) 
    : `${sessionId}_${artworkId}`.slice(0, 36);

  try {
    // Start a transaction-like operation: record view and update view count
    // 1. Create view document
    await databases.createDocument(DATABASE_ID, VIEWS_COLLECTION, docId, {
      userId: userId || null,
      artworkId,
      sessionId: userId ? null : sessionId,
      createdAt: new Date().toISOString(),
    });

    // 2. Update view count in METADATA_COLLECTION
    const artworkDoc = await databases.getDocument(DATABASE_ID, METADATA_COLLECTION, artworkId);
    const currentViewCount = artworkDoc.viewCount || 0;
    await databases.updateDocument(DATABASE_ID, METADATA_COLLECTION, artworkId, {
      viewCount: currentViewCount + 1,
    });

    return true; // View recorded successfully
  } catch (err) {
    if (err.code === 409) {
      return false; // View already exists (race condition)
    }
    throw new Error(`Failed to record view: ${err.message}`);
  }
};

// Get total view count
export const getArtworkViewCount = async (artworkId) => {
  if (!artworkId) {
    throw new Error('Artwork ID is required');
  }

  try {
    // Fetch view count from METADATA_COLLECTION
    const artworkDoc = await databases.getDocument(DATABASE_ID, METADATA_COLLECTION, artworkId);
    return artworkDoc.viewCount || 0;
  } catch (err) {
    throw new Error(`Failed to get view count: ${err.message}`);
  }
};