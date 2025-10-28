// // src/hooks/useAuth.js
// import { useState, useEffect } from 'react';
// import { account, databases, ID, Query } from '../utils/appwrite.config';

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getCurrentUser = async () => {
//     try {
//       const currentUser = await account.get();
//       setUser(currentUser);
//       return currentUser;
//     } catch (error) {
//       setUser(null);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     await account.createEmailSession(email, password);
//     return await getCurrentUser();
//   };

//   const register = async (email, password, name) => {
//     await account.create(ID.unique(), email, password, name);
//     return await login(email, password);
//   };

//   const logout = async () => {
//     await account.deleteSession('current');
//     setUser(null);
//   };

//   useEffect(() => {
//     getCurrentUser();
//   }, []);

//   return {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     getCurrentUser
//   };
// };

// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { account, databases, storage, ID, DATABASE_ID, USERS_COLLECTION_ID, PROFILE_BUCKET_ID } from '../utils/appwrite.config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const current = await account.get();
      // Fetch or create user doc
      let doc;
      try {
        doc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, current.$id);
      } catch {
        doc = await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, current.$id, {
          name: current.name || 'Anonymous',
          avatarFileId: null
        });
      }
      const profileImageUrl = doc.avatarFileId 
        ? storage.getFilePreview(PROFILE_BUCKET_ID, doc.avatarFileId)
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=random`;
      const enrichedUser = { ...current, name: doc.name, profileImageUrl };
      setUser(enrichedUser);
      return enrichedUser;
    } catch (error) {
      console.error('Get current user error:', error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      return await getCurrentUser();
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  };

  const register = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      return await login(email, password);
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return {
    user,
    loading,
    login,
    register,
    logout,
    getCurrentUser
  };
};