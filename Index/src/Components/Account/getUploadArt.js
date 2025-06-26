import { databases, Query } from '../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

export const getCollectionCount = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const res = await databases.listDocuments(
      DATABASE_ID,
      METADATA_COLLECTION_ID,
      [Query.equal('userId', userId)]
    );

    return res.total; // Return the total number of documents (artworks) for the user
  } catch (err) {
    console.error('Error getting collection count:', err);
    throw new Error(`Failed to get collection count: ${err.message}`);
  }
};