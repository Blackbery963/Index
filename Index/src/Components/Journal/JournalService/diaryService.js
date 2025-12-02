
import { databases, ID, DATABASE_ID, COLLECTIONS } from "../DiaryService/AppwriteService/appwrite";
import { Query } from "appwrite"; // <--- Add this import

class DiaryService {
  
  // Get all published diaries
  async getCommunityDiaries(limit = 50) {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        [
          // 2. Use Query objects, not strings
          Query.equal('isPublished', true),
          Query.orderDesc('createdAt'),
          Query.limit(limit)
        ]
      );
    } catch (error) {
      console.error('Error fetching community diaries:', error);
      throw error;
    }
  }

  async getUserDiaries(userId, limit = 50) {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        [
          Query.equal('userId', userId),
          Query.orderDesc('createdAt'),
          Query.limit(limit)
        ]
      );
    } catch (error) {
      console.error('Error fetching user diaries:', error);
      throw error;
    }
  }

  async searchDiaries(query, limit = 20) {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        [
          Query.equal('isPublished', true),
          Query.orderDesc('createdAt'),
          // Appwrite usually supports one fulltext search at a time efficiently, 
          // or requires specific configuration. This is the correct syntax:
          Query.search('title', query), 
          Query.limit(limit)
        ]
      );
    } catch (error) {
      console.error('Error searching diaries:', error);
      throw error;
    }
  }
  
  // ... rest of your methods (update getPopularDiaries similarly)
   // Get popular diaries (most viewed/liked - you'll need to add these fields)
  async getPopularDiaries(limit = 10) {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        [
          'isPublished=true',
          'order(createdAt, desc)', // You can change this to 'order(viewCount, desc)' when you add viewCount
          `limit(${limit})`
        ]
      );
    } catch (error) {
      console.error('Error fetching popular diaries:', error);
      throw error;
    }
  }

  // Get diary by ID
  async getDiaryById(diaryId) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        diaryId
      );
    } catch (error) {
      console.error('Error fetching diary:', error);
      throw error;
    }
  }

  // Increment view count
  async incrementViewCount(diaryId) {
    try {
      const diary = await this.getDiaryById(diaryId);
      const currentViews = diary.viewCount || 0;
      
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        diaryId,
        {
          viewCount: currentViews + 1,
          updatedAt: new Date().toISOString()
        }
      );
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  }

  // Toggle like
  async toggleLike(diaryId, userId) {
    try {
      const diary = await this.getDiaryById(diaryId);
      const likedBy = diary.likedBy || [];
      const isLiked = likedBy.includes(userId);
      
      if (isLiked) {
        // Remove like
        const updatedLikedBy = likedBy.filter(id => id !== userId);
        return await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.ENTRIES,
          diaryId,
          {
            likedBy: updatedLikedBy,
            likeCount: (diary.likeCount || 0) - 1,
            updatedAt: new Date().toISOString()
          }
        );
      } else {
        // Add like
        const updatedLikedBy = [...likedBy, userId];
        return await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.ENTRIES,
          diaryId,
          {
            likedBy: updatedLikedBy,
            likeCount: (diary.likeCount || 0) + 1,
            updatedAt: new Date().toISOString()
          }
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }
}

export default new DiaryService();