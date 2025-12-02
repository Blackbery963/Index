import { databases, storage, ID, DATABASE_ID, COLLECTIONS, BUCKETS, account } from './appwrite';
// import databases from './appwrite'

class EntryService {
  // Create new entry
  async createEntry(userId, entryData) {
    try {
      const entry = {
        userId,
        title: entryData.title,
        content: entryData.content,
        type: entryData.type,
        emotion: entryData.emotion,
        location: entryData.location,
        weather: entryData.weather,
        tags: entryData.tags,
        // images: entryData.images, // Array of image URLs
        images: entryData.images.map(img => {
            // If it's an object with a 'url' property, return the url
            if (typeof img === 'object' && img.url) return img.url; 
            // If it's already a string, return it as is
            return img;
        }),
        isPublished: entryData.isPublished || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        ID.unique(),
        entry
      );
    } catch (error) {
      console.error('Error creating entry:', error);
      throw error;
    }
  }

  // Upload image to storage
  async uploadImage(file) {
    try {
      return await storage.createFile(
        BUCKETS.IMAGES,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Get image preview URL
  getImagePreview(fileId) {
    return storage.getFilePreview(BUCKETS.IMAGES, fileId);
  }

  // Get user's entries
  async getUserEntries(userId, limit = 50) {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        [
          `userId=${userId}`,
          `order(createdAt, desc)`,
          `limit(${limit})`
        ]
      );
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  }

  // Update entry
  async updateEntry(entryId, updates) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        entryId,
        {
          ...updates,
          updatedAt: new Date().toISOString()
        }
      );
    } catch (error) {
      console.error('Error updating entry:', error);
      throw error;
    }
  }

  // Delete entry
  async deleteEntry(entryId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.ENTRIES,
        entryId
      );
    } catch (error) {
      console.error('Error deleting entry:', error);
      throw error;
    }
  }

  // Auto-save draft
  async saveDraft(userId, draftData) {
    try {
      // Store in localStorage as fallback
      localStorage.setItem(`draft_${userId}`, JSON.stringify({
        ...draftData,
        savedAt: new Date().toISOString()
      }));
      
      // Optionally save to Appwrite too
      return await this.createEntry(userId, {
        ...draftData,
        isPublished: false
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  }

  // Load draft
  async loadDraft(userId) {
    try {
      const draft = localStorage.getItem(`draft_${userId}`);
      return draft ? JSON.parse(draft) : null;
    } catch (error) {
      console.error('Error loading draft:', error);
      return null;
    }
  }
}

export default new EntryService();


