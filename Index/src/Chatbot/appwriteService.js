import { Client, Databases, Account, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export const appwriteService = {
  getUser: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.log('No user logged in');
      return null;
    }
  },

  fetchChatHistory: async (userId = null, limit = 10) => {
    try {
      // Build query array
      const queries = [
        Query.orderDesc('$createdAt'), 
        Query.limit(limit), 
        Query.equal("deleted", false)
      ];
      
      // Only add user filter if userId is provided
      if (userId) {
        queries.push(Query.equal("userId", userId));
      }
      
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
        queries
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  },

  saveChat: async (messages, title, chatId = null, userId = null) => {
    try {
      // If no userId provided, try to get current user
      if (!userId) {
        const user = await account.get();
        userId = user?.$id;
      }
      
      if (!userId) {
        console.error('No user ID available for saving chat');
        return null;
      }

      const data = {
        userId: userId, // ✅ Crucial: Associate chat with user
        title: title,
        messages: JSON.stringify(messages),
        messageCount: messages.length,
        deleted: false
      };

      let response;
      if (chatId) {
        // Update existing chat - verify user owns this chat
        response = await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
          chatId,
          data
        );
      } else {
        // Create new chat
        response = await databases.createDocument(
          import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
          ID.unique(),
          data
        );
      }
      
      return response;
    } catch (error) {
      console.error('Error saving chat to database:', error);
      return null;
    }
  },

  deleteChat: async (chatId, userId = null) => {
    try {
      // Optional: Verify user owns this chat before deleting
      if (userId) {
        const chat = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
          chatId
        );
        
        if (chat.userId !== userId) {
          throw new Error('User does not own this chat');
        }
      }
      
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
        chatId,
        { 
          deleted: true,
          deletedAt: new Date().toISOString()
        }
      );
      return true;
    } catch (error) {
      console.error('Error deleting chat from database:', error);
      return false;
    }
  }
};