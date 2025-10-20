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
//   const [showStrictPrompt, setShowStrictPrompt] = useState(false);
//   const [siteBlocked, setSiteBlocked] = useState(false);
  
//   const promptTimerRef = useRef(null);
//   const siteBlockTimerRef = useRef(null);

//   // 🔹 1. Check user authentication status
//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const userData = await account.get();
//         setUser(userData);
//         setShowStrictPrompt(false);
//         setSiteBlocked(false);
//       } catch (error) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   // 🔹 2. Setup strict prompt timer (30 seconds)
//   useEffect(() => {
//     // Clear any existing timers
//     if (promptTimerRef.current) {
//       clearTimeout(promptTimerRef.current);
//     }
//     if (siteBlockTimerRef.current) {
//       clearTimeout(siteBlockTimerRef.current);
//     }

//     // Only set up timer if user is not authenticated
//     if (!user && !loading) {
//       console.log("Strict mode: Setting up 30-second timer...");
      
//       promptTimerRef.current = setTimeout(() => {
//         console.log("30 seconds elapsed - showing strict prompt");
//         setShowStrictPrompt(true);
        
//         // Block the site after showing prompt
//         siteBlockTimerRef.current = setTimeout(() => {
//           console.log("Site blocked - user didn't sign up");
//           setSiteBlocked(true);
//         }, 10000); // Block site after 10 seconds of prompt showing
//       }, 30000); // Show prompt after 30 seconds
//     }

//     // Cleanup function
//     return () => {
//       if (promptTimerRef.current) {
//         clearTimeout(promptTimerRef.current);
//       }
//       if (siteBlockTimerRef.current) {
//         clearTimeout(siteBlockTimerRef.current);
//       }
//     };
//   }, [user, loading]);

//   // 🔹 3. Authentication functions
//   const login = async (email, password) => {
//     try {
//       await account.createEmailPasswordSession(email, password);
//       const userData = await account.get();
//       setUser(userData);
//       setShowStrictPrompt(false);
//       setSiteBlocked(false);
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
//       // Reset timers for next visitor
//       setShowStrictPrompt(false);
//       setSiteBlocked(false);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const forceSignup = () => {
//     window.location.href = '/signup';
//   };

//   const forceExit = () => {
//     // Redirect to external site or close window
//     window.location.href = 'https://google.com';
//     // Or show blocked message
//     setSiteBlocked(true);
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     forceSignup,
//     forceExit,
//     showStrictPrompt,
//     siteBlocked,
//     isAuthenticated: !!user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { account } from "../../appwriteConfig";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStrictPrompt, setShowStrictPrompt] = useState(false);
  const [siteBlocked, setSiteBlocked] = useState(false);
  const [showDiwaliGreeting, setShowDiwaliGreeting] = useState(false);
  
  const promptTimerRef = useRef(null);
  const siteBlockTimerRef = useRef(null);
  const greetingTimerRef = useRef(null);

  // 🔹 1. Check user authentication status
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        setShowStrictPrompt(false);
        setSiteBlocked(false);
      } catch (error) {
        setUser(null);
        // Show Diwali greeting for new visitors
        setShowDiwaliGreeting(true);
        
        // Auto hide greeting after 5 seconds
        greetingTimerRef.current = setTimeout(() => {
          setShowDiwaliGreeting(false);
        }, 5000);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // 🔹 2. Setup strict prompt timer (30 seconds)
  useEffect(() => {
    // Clear any existing timers
    if (promptTimerRef.current) {
      clearTimeout(promptTimerRef.current);
    }
    if (siteBlockTimerRef.current) {
      clearTimeout(siteBlockTimerRef.current);
    }

    // Only set up timer if user is not authenticated
    if (!user && !loading) {
      console.log("Strict mode: Setting up 30-second timer...");
      
      promptTimerRef.current = setTimeout(() => {
        console.log("30 seconds elapsed - showing strict prompt");
        setShowStrictPrompt(true);
        
        // Block the site after showing prompt
        siteBlockTimerRef.current = setTimeout(() => {
          console.log("Site blocked - user didn't sign up");
          setSiteBlocked(true);
        }, 10000); // Block site after 10 seconds of prompt showing
      }, 30000); // Show prompt after 30 seconds
    }

    // Cleanup function
    return () => {
      if (promptTimerRef.current) {
        clearTimeout(promptTimerRef.current);
      }
      if (siteBlockTimerRef.current) {
        clearTimeout(siteBlockTimerRef.current);
      }
      if (greetingTimerRef.current) {
        clearTimeout(greetingTimerRef.current);
      }
    };
  }, [user, loading]);

  // 🔹 3. Authentication functions
  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      setShowStrictPrompt(false);
      setSiteBlocked(false);
      setShowDiwaliGreeting(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      await account.create("unique()", email, password, name);
      await login(email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      // Reset timers for next visitor
      setShowStrictPrompt(false);
      setSiteBlocked(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const skipGreeting = () => {
    setShowDiwaliGreeting(false);
  };

  const forceSignup = () => {
    window.location.href = '/signup';
  };

  const forceExit = () => {
    window.location.href = 'https://google.com';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forceSignup,
    forceExit,
    skipGreeting,
    showStrictPrompt,
    siteBlocked,
    showDiwaliGreeting,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};