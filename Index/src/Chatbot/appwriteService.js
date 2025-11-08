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


  deleteChat: async (chatId) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
        chatId,
        { 
          deleted: true,
          deletedAt: new Date().toISOString() // Optional: track when it was deleted
        }
      );
      return true;
    } catch (error) {
      console.error('Error deleting chat from database:', error);
      return false;
    }
  },

  // Update fetchChatHistory to only fetch non-deleted chats
  fetchChatHistory: async (limit = 10) => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'), 
          Query.limit(limit), 
          Query.equal("deleted", false) // Only get non-deleted chats
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  },

  // fetchChatHistory: async (limit = 10) => {
  //   try {
  //     const response = await databases.listDocuments(
  //       import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
  //       import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
  //       [Query.orderDesc('$createdAt'), Query.limit(limit), Query.equal("deleted", false)]
  //     );
  //     return response.documents;
  //   } catch (error) {
  //     console.error('Error fetching chat history:', error);
  //     return [];
  //   }
  // },

  saveChat: async (messages, title, chatId = null) => {
    try {
      const user = await account.get();
      if (!user) return null;

      const data = {
        userId: user.$id,
        title,
        messages: JSON.stringify(messages),
        messageCount: messages.length,
        deleted: false
      };

      if (chatId) {
        // Update existing chat
        return await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
          chatId,
          data
        );
      } else {
        // Create new chat
        return await databases.createDocument(
          import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
          ID.unique(),
          data
        );
      }
    } catch (error) {
      console.error('Error saving chat:', error);
      return null;
    }
  },

  deleteChat: async (chatId) => {
  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
      chatId
    );
    return true;
  } catch (error) {
    console.error('Error deleting chat:', error);
    return false;
  }
}

};