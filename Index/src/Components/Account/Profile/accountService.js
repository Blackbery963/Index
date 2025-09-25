// services/accountService.js
import { account, databases, storage, ID } from '../../../appwriteConfig';
import { followService } from '../../../Follow/FollowService';
import { getCollectionCount } from '../getUploadArt';
import { uploadImage, updateUserImages } from '../uploadImage';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const PROFILE_BUCKET = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;
const COVER_BUCKET = import.meta.env.VITE_APPWRITE_COVER_BUCKET_ID;

export const accountService = {
  // Get current user session
  async getCurrentUser() {
    return await account.get();
  },

  // Get user profile data
  async getUserProfile(userId) {
    return await databases.getDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId
    );
  },

  // Update user images
  async updateUserImages(userId, imageData) {
    return await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId,
      imageData
    );
  },

  // Upload image to storage
  async uploadImage(file, bucketId) {
    const fileId = ID.unique();
    const result = await storage.createFile(bucketId, fileId, file);
    return storage.getFilePreview(bucketId, result.$id);
  },

  // Get social stats
  async getSocialStats(userId) {
    const [followers, following, collections] = await Promise.all([
      followService.getFollowerCount(userId),
      followService.getFollowingCount(userId),
      getCollectionCount(userId)
    ]);
    
    return { followers, following, collections };
  },

  // Logout user
  async logout() {
    await account.deleteSession('current');
    localStorage.clear();
  },

  // Validate image file
  validateImage(file, maxSizeMB) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }
    if (file.size >= maxSizeMB * 1024 * 1024) {
      throw new Error(`File size must be less than ${maxSizeMB}MB`);
    }
    return true;
  }
};