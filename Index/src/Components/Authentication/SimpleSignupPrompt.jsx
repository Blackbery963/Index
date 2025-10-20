
// import React from 'react';
// import { useAuth } from './AuthContext';

// const StrictSignupPrompt = () => {
//     const { 
//         isAuthenticated, 
//         showStrictPrompt, 
//         siteBlocked, 
//         forceSignup, 
//         forceExit 
//     } = useAuth();

//     // Don't show if authenticated
//     if (isAuthenticated) return null;

//     // 🟥 Site blocked state
//     if (siteBlocked) {
//         return (
//             <div className="fixed inset-0 bg-gradient-to-tr from-red-600 to-pink-700 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
//                     <div className="text-6xl mb-4">🔒</div>
//                     <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                         Account Required
//                     </h2>
//                     <p className="text-gray-600 mb-6 text-lg">
//                         To keep our community safe and personalized, we ask every visitor to create a free account.  
//                         It only takes a few seconds!
//                     </p>
//                     <div className="space-y-4">
//                         <button
//                             onClick={forceSignup}
//                             className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition-colors font-bold text-lg"
//                         >
//                             🌟 Create Free Account
//                         </button>
//                         <button
//                             onClick={forceExit}
//                             className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors font-medium"
//                         >
//                             🚪 Maybe Later
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // 🕐 Soft strict prompt
//     if (showStrictPrompt) {
//         return (
//             <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
//                     <div className="text-4xl mb-4">🎨</div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                         Enjoying the Art?
//                     </h2>
//                     <p className="text-gray-600 mb-2">
//                         You’ve been exploring for a while — we love that! 💖  
//                         To continue your creative journey and access more content:
//                     </p>
//                     <p className="text-blue-600 font-semibold mb-6">
//                         Please create a free account or come back later.
//                     </p>

//                     <div className="space-y-4">
//                         <button
//                             onClick={forceSignup}
//                             className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold text-lg shadow-lg"
//                         >
//                             ✨ Create My Free Account
//                         </button>
//                         <button
//                             onClick={forceExit}
//                             className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-medium"
//                         >
//                             🚪 I’ll Visit Later
//                         </button>
//                     </div>

//                     <p className="text-xs text-gray-500 mt-6">
//                         You have 10 seconds before access is paused — don’t miss out on more inspiration ✨
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return null;
// };

// export default StrictSignupPrompt;


import React from 'react';
import { useAuth } from './AuthContext';

// Diwali Greeting Component
const DiwaliGreeting = () => {
  const { skipGreeting } = useAuth();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-900 via-purple-900 to-blue-900 flex items-center justify-center z-50 p-4">
      {/* Animated Diyas */}
      <div className="absolute top-10 left-10 text-4xl animate-pulse">🪔</div>
      <div className="absolute top-10 right-10 text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>🪔</div>
      <div className="absolute bottom-10 left-10 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🪔</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse" style={{ animationDelay: '1.5s' }}>🪔</div>
      
      {/* Floating Rangoli elements */}
      <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce">✨</div>
      <div className="absolute top-1/3 right-1/4 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="absolute bottom-1/4 left-1/3 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>✨</div>
      
      <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl max-w-2xl w-full">
        <div className="text-6xl mb-6 animate-pulse">🪔</div>
        
        <h1 className="text-5xl font-bold text-yellow-300 mb-4 font-serif">
          Happy Diwali!
        </h1>
        
        <div className="text-white text-xl mb-6 leading-relaxed">
          <p className="mb-2">May the divine light of Diwali</p>
          <p className="mb-2">fill your life with</p>
          <p className="text-2xl font-bold text-yellow-200">Joy, Prosperity and Happiness</p>
        </div>
        
        <p className="text-yellow-100 text-lg mb-8 italic">
          "Wishing you and your family a sparkling Diwali!"
        </p>
        
        <button
          onClick={skipGreeting}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Continue to Explore 🎨
        </button>
        
        <div className="mt-6 text-yellow-200 text-sm">
          <p>Experience the magic of creativity this festive season</p>
        </div>
      </div>
    </div>
  );
};

// Main Strict Signup Prompt Component
const StrictSignupPrompt = () => {
    const { 
        isAuthenticated, 
        showStrictPrompt, 
        siteBlocked, 
        showDiwaliGreeting,
        forceSignup, 
        forceExit 
    } = useAuth();

    // Show Diwali greeting for new visitors
    if (showDiwaliGreeting && !isAuthenticated) {
        return <DiwaliGreeting />;
    }

    // Don't show if authenticated
    if (isAuthenticated) return null;

    // 🟥 Site blocked state - Diwali Themed
    if (siteBlocked) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 flex items-center justify-center z-50 p-4">
                {/* Animated Diyas */}
                <div className="absolute top-6 left-6 text-3xl animate-pulse">🪔</div>
                <div className="absolute top-6 right-6 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>🪔</div>
                
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border-4 border-yellow-400">
                    <div className="text-5xl mb-4 animate-bounce">🔒</div>
                    <div className="text-3xl mb-2">🪔</div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 font-serif">
                        Diwali Special Access
                    </h2>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        This festive season, join our creative family! 
                        <span className="block text-orange-600 font-semibold mt-1">
                            Light up your creativity with a free account!
                        </span>
                    </p>
                    
                    <div className="space-y-4">
                        <button
                            onClick={forceSignup}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
                        >
                            🪔 Join Festive Community
                        </button>
                        <button
                            onClick={forceExit}
                            className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-medium"
                        >
                            🚪 Celebrate Elsewhere
                        </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-4">
                        May your Diwali be filled with light and creativity! ✨
                    </p>
                </div>
            </div>
        );
    }

    // 🕐 Soft strict prompt - Diwali Themed
    if (showStrictPrompt) {
        return (
            <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
                {/* Floating Diyas and Sparkles */}
                <div className="absolute top-8 left-8 text-3xl animate-pulse">🪔</div>
                <div className="absolute top-8 right-8 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>🪔</div>
                <div className="absolute bottom-8 left-8 text-2xl animate-bounce">✨</div>
                <div className="absolute bottom-8 right-8 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>✨</div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border-4 border-yellow-300 relative">
                    {/* Header with Diya */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="text-5xl animate-pulse">🪔</div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-orange-800 mb-4 mt-4 font-serif">
                        Diwali Greetings! 🎇
                    </h2>
                    
                    <p className="text-gray-700 mb-3 leading-relaxed">
                        You've been enjoying the creative spark! 
                        <span className="block text-orange-600 font-semibold mt-1">
                            Like the lasting light of a diya, join our community!
                        </span>
                    </p>
                    
                    <p className="text-blue-600 font-semibold mb-6 text-lg">
                        Create your free account to continue the celebration!
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={forceSignup}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
                        >
                            ✨ Join the Festival Fun
                        </button>
                        <button
                            onClick={forceExit}
                            className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-medium"
                        >
                            🪔 Maybe Later
                        </button>
                    </div>

                    <p className="text-xs text-gray-600 mt-6 flex items-center justify-center">
                        <span className="animate-pulse mr-1">🪔</span>
                        Limited time - Join before the fireworks end! 
                        <span className="animate-pulse ml-1">✨</span>
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default StrictSignupPrompt;