// import React, { createContext, useContext, useState, useEffect, useRef } from "react";
// import { account } from "../../appwriteConfig";

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showTeaser, setShowTeaser] = useState(false);
//   const [showUnlock, setShowUnlock] = useState(false);
//   const [previewFeatures, setPreviewFeatures] = useState([]);
  
//   const teaserTimerRef = useRef(null);
//   const unlockTimerRef = useRef(null);

//   // Preview features that get revealed
//   const availableFeatures = [
//     "🎨 Personal Art Gallery",
//     "✨ AI Art Assistant", 
//     "🌟 Exclusive Art Tools",
//     "🚀 Premium Brushes",
//     "💫 Magic Filters",
//     "🎯 Smart Composition",
//     "🌈 Color Wizard",
//     "📱 Mobile Studio",
//     "🌙 Dark Canvas Mode",
//     "⚡ Instant Export"
//   ];

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const userData = await account.get();
//         setUser(userData);
//         setShowTeaser(false);
//         setShowUnlock(false);
//       } catch (error) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   // Progressive engagement timer
//   useEffect(() => {
//     if (teaserTimerRef.current) clearTimeout(teaserTimerRef.current);
//     if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

//     if (!user && !loading) {
//       console.log("Engagement mode: Setting up progressive timers...");
      
//       // Show teaser after 20 seconds
//       teaserTimerRef.current = setTimeout(() => {
//         console.log("Showing teaser prompt");
//         setShowTeaser(true);
        
//         // Show unlock screen after another 20 seconds
//         unlockTimerRef.current = setTimeout(() => {
//           console.log("Showing unlock experience");
//           setShowUnlock(true);
//           // Reveal random preview features
//           const shuffled = [...availableFeatures].sort(() => 0.5 - Math.random());
//           setPreviewFeatures(shuffled.slice(0, 5));
//         }, 20000);
//       }, 20000);
//     }

//     return () => {
//       if (teaserTimerRef.current) clearTimeout(teaserTimerRef.current);
//       if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
//     };
//   }, [user, loading]);

//   const login = async (email, password) => {
//     try {
//       await account.createEmailPasswordSession(email, password);
//       const userData = await account.get();
//       setUser(userData);
//       setShowTeaser(false);
//       setShowUnlock(false);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const register = async (email, password, name) => {
//     try {
//       await account.create("unique()", email, password, name);
//       await login(email, password);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = async () => {
//     try {
//       await account.deleteSession("current");
//       setUser(null);
//       setShowTeaser(false);
//       setShowUnlock(false);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     showTeaser,
//     showUnlock,
//     previewFeatures,
//     isAuthenticated: !!user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import { account } from "../../appwriteConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simple check on mount
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkUser(); // Refresh user state
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      await account.create("unique()", email, password, name);
      await login(email, password); // Auto login after register
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};