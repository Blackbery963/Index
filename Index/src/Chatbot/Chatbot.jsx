// import React, { useState, useRef, useEffect } from 'react';
// import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaLightbulb, FaLaugh, FaQuoteLeft, FaCloudSun, FaPalette, FaExclamationTriangle, FaRedo } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hi there! I'm Palette, your modern AI art assistant. I can inspire with jokes, facts, quotes, art tips, and more! How can I help you today?",
//       sender: 'bot',
//       type: 'greeting',
//       options: ['Tell me a joke', 'Art tip', 'Interesting fact', 'Inspirational quote']
//     }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [displayedTexts, setDisplayedTexts] = useState({});
//   const [connectionError, setConnectionError] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom of chat
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, displayedTexts]);

//   const sendMessageToAPI = async (message) => {
//     setIsLoading(true);
//     setConnectionError(false);
    
//     try {
//       const response = await fetch('http://localhost:3001/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           message: message,
//           conversationHistory: messages
//             .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
//             .map(msg => ({
//               role: msg.sender === 'user' ? 'user' : 'assistant',
//               content: msg.text
//             }))
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (!data.success) {
//         throw new Error(data.content || 'Request failed');
//       }

//       return {
//         type: data.type || 'text',
//         message: data.content,
//         options: getOptionsForType(data.type),
//         rawData: data
//       };
//     } catch (error) {
//       console.error('API Error:', error);
//       setConnectionError(true);
//       return {
//         type: 'error',
//         message: "I'm having trouble connecting to the server. Please check if the backend is running.",
//         options: ['Retry connection', 'Art tip', 'Joke']
//       };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getOptionsForType = (type) => {
//     switch (type) {
//       case 'joke': return ['Another joke', 'Art tip', 'Interesting fact'];
//       case 'fact': return ['Another fact', 'Art tip', 'Tell me a joke'];
//       case 'quote': return ['Another quote', 'Art tip', 'Interesting fact'];
//       case 'motivation': return ['More motivation', 'Art tip', 'Quote'];
//       case 'art-tip': return ['Another tip', 'Tell me a joke', 'Interesting fact'];
//       case 'weather': return ['Art tip', 'Tell me a joke', 'Interesting fact'];
//       case 'artwork': return ['Another artwork', 'Art tip', 'Tell me a joke'];
//       case 'vocabulary': return ['Another word', 'Art tip', 'Interesting fact'];
//       case 'greeting': return ['Art tip', 'Tell me a joke', 'Interesting fact'];
//       default: return ['Art tip', 'Tell me a joke', 'Interesting fact', 'Inspirational quote'];
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputText.trim() === '' || isLoading) return;

//     // Add user message
//     const userMessage = {
//       id: Date.now(),
//       text: inputText,
//       sender: 'user',
//       type: 'text'
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setDisplayedTexts(prev => ({ ...prev, [userMessage.id]: userMessage.text }));
//     setInputText('');

//     // Get bot response
//     const botResponse = await sendMessageToAPI(inputText);
    
//     const botMessage = {
//       id: Date.now() + 1,
//       text: botResponse.message,
//       sender: 'bot',
//       type: botResponse.type,
//       options: botResponse.options,
//       rawData: botResponse.rawData
//     };
    
//     setMessages(prev => [...prev, botMessage]);
//     setDisplayedTexts(prev => ({ ...prev, [botMessage.id]: '' }));
//   };

//   // Typewriter effect for bot messages
//   useEffect(() => {
//     const botMessages = messages.filter(msg => msg.sender === 'bot');
//     const lastBotMessage = botMessages[botMessages.length - 1];
    
//     if (lastBotMessage) {
//       const messageId = lastBotMessage.id;
//       const fullText = lastBotMessage.text;
//       const currentDisplay = displayedTexts[messageId] || '';
      
//       if (currentDisplay.length < fullText.length) {
//         const timer = setTimeout(() => {
//           setDisplayedTexts(prev => ({
//             ...prev,
//             [messageId]: fullText.slice(0, (prev[messageId] || '').length + 1)
//           }));
//         }, 20); // Typing speed: 20ms per character

//         return () => clearTimeout(timer);
//       }
//     }
//   }, [messages, displayedTexts]);

//   const handleQuickReply = (option) => {
//     if (option === 'Retry connection') {
//       // Reset connection error and resend last message
//       setConnectionError(false);
//       const lastUserMessage = messages.filter(msg => msg.sender === 'user').pop();
//       if (lastUserMessage) {
//         setInputText(lastUserMessage.text);
//         setTimeout(() => handleSendMessage(), 100);
//       }
//       return;
//     }
    
//     setInputText(option);
//     setTimeout(() => handleSendMessage(), 100);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   // Get appropriate icon for message type
//   const getMessageIcon = (type) => {
//     switch (type) {
//       case 'joke': return <FaLaugh className="text-yellow-500 text-lg" />;
//       case 'fact': return <FaLightbulb className="text-blue-500 text-lg" />;
//       case 'quote': return <FaQuoteLeft className="text-purple-500 text-lg" />;
//       case 'motivation': return <FaQuoteLeft className="text-indigo-500 text-lg" />;
//       case 'weather': return <FaCloudSun className="text-teal-500 text-lg" />;
//       case 'art-tip': return <FaPalette className="text-green-500 text-lg" />;
//       case 'artwork': return <FaPalette className="text-red-400 text-lg" />;
//       case 'vocabulary': return <FaLightbulb className="text-amber-500 text-lg" />;
//       case 'greeting': return <FaPalette className="text-pink-400 text-lg" />;
//       case 'error': return <FaExclamationTriangle className="text-red-500 text-lg" />;
//       default: return <FaPalette className="text-pink-500 text-lg" />;
//     }
//   };

//   const getMessageBorderColor = (type) => {
//     switch (type) {
//       case 'joke': return 'border-l-yellow-400';
//       case 'fact': return 'border-l-blue-400';
//       case 'quote': return 'border-l-purple-400';
//       case 'motivation': return 'border-l-indigo-400';
//       case 'weather': return 'border-l-teal-400';
//       case 'art-tip': return 'border-l-green-400';
//       case 'artwork': return 'border-l-red-300';
//       case 'vocabulary': return 'border-l-amber-400';
//       case 'greeting': return 'border-l-pink-300';
//       case 'error': return 'border-l-red-400';
//       default: return 'border-l-pink-400';
//     }
//   };

//   return (
//     <>
//       {/* Chatbot toggle button */}
//       <motion.button
//         className="fixed bottom-8 right-8 z-[1001] bg-gradient-to-br from-pink-500 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center transition-all duration-300 group"
//         whileHover={{ scale: 1.15, rotate: 5 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="Toggle Palette AI Assistant"
//       >
//         {isOpen ? (
//           <FaTimes size={24} />
//         ) : (
//           <div className="relative">
//             <FaPalette size={28} />
//             {connectionError && (
//               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
//             )}
//           </div>
//         )}
//       </motion.button>

//       {/* Chatbot sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed top-0 right-0 z-[1001] w-96 h-full max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col border-l border-gray-200/50 dark:border-gray-700/50"
//             initial={{ opacity: 0, x: '100%' }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-br from-pink-500 to-orange-500 text-white p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <FaPalette className="text-2xl" />
//                   {connectionError && (
//                     <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg">Palette AI Assistant</h3>
//                   <p className="text-xs opacity-80">Powered by Art Intelligence</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-white hover:text-pink-200 transition-colors p-1 rounded-full hover:bg-white/10"
//                 aria-label="Close chat"
//               >
//                 <FaTimes size={18} />
//               </button>
//             </div>

//             {/* Connection error banner */}
//             {connectionError && (
//               <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <FaExclamationTriangle />
//                   <span className="text-sm">Connection issue</span>
//                 </div>
//                 <button 
//                   onClick={() => setConnectionError(false)}
//                   className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
//                 >
//                   <FaTimes size={14} />
//                 </button>
//               </div>
//             )}

//             {/* Messages container */}
//             <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 space-y-4">
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm border-l-4 ${
//                     message.sender === 'user' 
//                       ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' 
//                       : `bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 backdrop-blur-sm ${getMessageBorderColor(message.type)}`
//                   }`}>
//                     <div className="flex items-start gap-3">
//                       {message.sender === 'bot' && (
//                         <span className="mt-0.5 flex-shrink-0">
//                           {getMessageIcon(message.type)}
//                         </span>
//                       )}
//                       {message.sender === 'user' && (
//                         <FaUser className="mt-0.5 text-white flex-shrink-0" />
//                       )}
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
//                           {message.sender === 'user' 
//                             ? message.text 
//                             : (displayedTexts[message.id] || '')}
                          
//                           {message.sender === 'bot' && 
//                            displayedTexts[message.id] && 
//                            displayedTexts[message.id].length < message.text.length && (
//                             <span className="inline-block w-2 h-4 bg-current animate-blink ml-1 align-middle">|</span>
//                           )}
//                         </p>
                        
//                         {/* Additional data for specific types */}
//                         {message.sender === 'bot' && message.rawData && (
//                           <div className="mt-2 text-xs opacity-70">
//                             {message.rawData.author && (
//                               <p>— {message.rawData.author}</p>
//                             )}
//                             {message.rawData.title && (
//                               <p className="font-medium">{message.rawData.title}</p>
//                             )}
//                           </div>
//                         )}
                        
//                         {/* Quick reply options */}
//                         {message.options && message.sender === 'bot' && 
//                          displayedTexts[message.id] === message.text && (
//                           <div className="mt-3 flex flex-wrap gap-2">
//                             {message.options.map((option, index) => (
//                               <motion.button
//                                 key={index}
//                                 onClick={() => handleQuickReply(option)}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="text-xs bg-pink-100 dark:bg-pink-900/40 hover:bg-pink-200 dark:hover:bg-pink-800/60 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full transition-all shadow-sm border border-pink-200 dark:border-pink-700/50"
//                               >
//                                 {option}
//                               </motion.button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
              
//               {isLoading && (
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-2xl max-w-[85%] shadow-sm backdrop-blur-sm border-l-4 border-pink-400">
//                     <div className="flex items-center gap-3">
//                       <FaPalette className="text-pink-500" />
//                       <div className="flex space-x-1.5">
//                         <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
//                         <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
//                         <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
//                       </div>
//                       <span className="text-sm text-gray-500 dark:text-gray-400">Palette is thinking...</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
              
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input area */}
//             <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900">
//               <div className="flex items-center gap-3">
//                 <div className="relative flex-1">
//                   <input
//                     type="text"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Ask Palette for art tips, jokes, facts, quotes..."
//                     className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white text-sm shadow-sm pr-12"
//                     disabled={isLoading}
//                   />
//                   {connectionError && (
//                     <button
//                       onClick={() => setConnectionError(false)}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 dark:hover:text-red-300 p-1"
//                       title="Retry connection"
//                     >
//                       <FaRedo size={14} />
//                     </button>
//                   )}
//                 </div>
//                 <motion.button
//                   onClick={handleSendMessage}
//                   disabled={!inputText.trim() || isLoading}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="bg-gradient-to-br from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center flex-shrink-0"
//                   aria-label="Send message"
//                 >
//                   {isLoading ? (
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     <FaPaperPlane size={18} />
//                   )}
//                 </motion.button>
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
//                AI can make mistakes. Always verify critical info!
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Add styles for animations */}
//       <style>
//         {`
//           @keyframes blink {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0; }
//           }
//           .animate-blink {
//             animation: blink 1s step-end infinite;
//           }
//           @keyframes bounce {
//             0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
//             40% { transform: translateY(-6px); }
//             60% { transform: translateY(-3px); }
//           }
//           .animate-bounce {
//             animation: bounce 2s infinite;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Chatbot;


import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaLightbulb, FaLaugh, FaQuoteLeft, FaCloudSun, FaPalette, FaExclamationTriangle, FaRedo, FaHeart, FaRegHeart, FaRegCopy, FaRegThumbsDown, FaRegThumbsUp, FaHistory } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Client, Databases, Account, ID, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

const databases = new Databases(client);
const account = new Account(client);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedTexts, setDisplayedTexts] = useState({});
  const [connectionError, setConnectionError] = useState(false);
  const [user, setUser] = useState(null);
  const [chatTitle, setChatTitle] = useState('New Chat');
  const [chatId, setChatId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage = {
        id: 1,
        text: user 
          ? `Welcome back, ${user.name}! What's your creative mood today?` 
          : "Hi there! I'm Palette, your modern AI art assistant. How can I help you today?",
        sender: 'bot',
        type: 'greeting',
        options: ['Tell me a joke', 'Art tip', 'Interesting fact', 'Inspirational quote']
      };
      setMessages([greetingMessage]);
      setDisplayedTexts(prev => ({ ...prev, [greetingMessage.id]: '' }));
    }
  }, [isOpen, user]);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.log('No user logged in or error fetching user:', error);
      }
    };
    
    if (isOpen) {
      getUser();
    }
  }, [isOpen]);

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
          [Query.orderDesc('$createdAt'), Query.limit(10)]
        );
        setChatHistory(response.documents);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (isOpen && user) {
      fetchChatHistory();
    }
  }, [isOpen, user]);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedTexts]);

  // Save chat to Appwrite
  const saveChatToDatabase = async (messages, title) => {
    try {
      if (!user) return null;

      const data = {
        userId: user.$id,
        title: title,
        messages: JSON.stringify(messages),
        messageCount: messages.length
      };

      let response;
      if (chatId) {
        // Update existing chat
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
        setChatId(response.$id);
        setChatHistory(prev => [response, ...prev]);
      }
      
      return response;
    } catch (error) {
      console.error('Error saving chat to database:', error);
      return null;
    }
  };

  // Generate a title based on the first user message
  const generateChatTitle = (userMessage) => {
    if (userMessage.toLowerCase().includes('joke')) return 'Art Jokes';
    if (userMessage.toLowerCase().includes('tip')) return 'Art Tips';
    if (userMessage.toLowerCase().includes('fact')) return 'Art Facts';
    if (userMessage.toLowerCase().includes('quote')) return 'Inspirational Quotes';
    if (userMessage.toLowerCase().includes('weather')) return 'Weather for Artists';
    if (userMessage.toLowerCase().includes('artwork')) return 'Artwork Inspiration';
    
    // Default title based on first few words
    const words = userMessage.split(' ');
    if (words.length > 4) {
      return `${words.slice(0, 3).join(' ')}...`;
    }
    return userMessage;
  };

  const sendMessageToAPI = async (message) => {
    setIsLoading(true);
    setConnectionError(false);
    
    try {
      const response = await fetch('https://www.thepaintersdiary.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message,
          conversationHistory: messages
            .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
            .map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.content || 'Request failed');
      }

      return {
        type: data.type || 'text',
        message: data.content,
        options: getOptionsForType(data.type),
        rawData: data
      };
    } catch (error) {
      console.error('API Error:', error);
      setConnectionError(true);
      return {
        type: 'error',
        message: "I'm having trouble connecting to the server. Please check if the backend is running.",
        options: ['Retry connection', 'Art tip', 'Joke']
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getOptionsForType = (type) => {
    switch (type) {
      case 'joke': return ['Another joke', 'Art tip', 'Interesting fact'];
      case 'fact': return ['Another fact', 'Art tip', 'Tell me a joke'];
      case 'quote': return ['Another quote', 'Art tip', 'Interesting fact'];
      case 'motivation': return ['More motivation', 'Art tip', 'Quote'];
      case 'art-tip': return ['Another tip', 'Tell me a joke', 'Interesting fact'];
      case 'weather': return ['Art tip', 'Tell me a joke', 'Interesting fact'];
      case 'artwork': return ['Another artwork', 'Art tip', 'Tell me a joke'];
      case 'vocabulary': return ['Another word', 'Art tip', 'Interesting fact'];
      case 'greeting': return ['Art tip', 'Tell me a joke', 'Interesting fact'];
      default: return ['Art tip', 'Tell me a joke', 'Interesting fact', 'Inspirational quote'];
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      type: 'text',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setDisplayedTexts(prev => ({ ...prev, [userMessage.id]: userMessage.text }));
    setInputText('');

    // Generate title if this is the first user message
    if (messages.filter(m => m.sender === 'user').length === 0) {
      const newTitle = generateChatTitle(inputText);
      setChatTitle(newTitle);
    }

    // Get bot response
    const botResponse = await sendMessageToAPI(inputText);
    
    const botMessage = {
      id: Date.now() + 1,
      text: botResponse.message,
      sender: 'bot',
      type: botResponse.type,
      options: botResponse.options,
      rawData: botResponse.rawData,
      timestamp: new Date().toISOString()
    };
    
    const finalMessages = [...updatedMessages, botMessage];
    setMessages(finalMessages);
    setDisplayedTexts(prev => ({ ...prev, [botMessage.id]: '' }));

    // Save to database
    if (user) {
      await saveChatToDatabase(finalMessages, chatTitle);
    }
  };

  // Typewriter effect for bot messages
  useEffect(() => {
    const botMessages = messages.filter(msg => msg.sender === 'bot');
    const lastBotMessage = botMessages[botMessages.length - 1];
    
    if (lastBotMessage) {
      const messageId = lastBotMessage.id;
      const fullText = lastBotMessage.text;
      const currentDisplay = displayedTexts[messageId] || '';
      
      if (currentDisplay.length < fullText.length) {
        const timer = setTimeout(() => {
          setDisplayedTexts(prev => ({
            ...prev,
            [messageId]: fullText.slice(0, (prev[messageId] || '').length + 1)
          }));
        }, 20); // Typing speed: 20ms per character

        return () => clearTimeout(timer);
      }
    }
  }, [messages, displayedTexts]);

  const handleQuickReply = (option) => {
    if (option === 'Retry connection') {
      // Reset connection error and resend last message
      setConnectionError(false);
      const lastUserMessage = messages.filter(msg => msg.sender === 'user').pop();
      if (lastUserMessage) {
        setInputText(lastUserMessage.text);
        setTimeout(() => handleSendMessage(), 100);
      }
      return;
    }
    
    setInputText(option);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Load a chat from history
  const loadChatFromHistory = (chat) => {
    setMessages(JSON.parse(chat.messages));
    setChatTitle(chat.title);
    setChatId(chat.$id);
    setShowHistory(false);
  };

  // Start a new chat
  const startNewChat = () => {
    setMessages([]);
    setChatTitle('New Chat');
    setChatId(null);
    setShowHistory(false);
  };

  // Copy message to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Copied to clipboard');
    });
  };

  // Like/Dislike a message
  const rateMessage = (messageId, rating) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
    
    // In a real app, you would also save this to the database
  };

  // Get appropriate icon for message type
  const getMessageIcon = (type) => {
    switch (type) {
      case 'joke': return <FaLaugh className="text-yellow-500 text-lg" />;
      case 'fact': return <FaLightbulb className="text-blue-500 text-lg" />;
      case 'quote': return <FaQuoteLeft className="text-purple-500 text-lg" />;
      case 'motivation': return <FaQuoteLeft className="text-indigo-500 text-lg" />;
      case 'weather': return <FaCloudSun className="text-teal-500 text-lg" />;
      case 'art-tip': return <FaPalette className="text-green-500 text-lg" />;
      case 'artwork': return <FaPalette className="text-red-400 text-lg" />;
      case 'vocabulary': return <FaLightbulb className="text-amber-500 text-lg" />;
      case 'greeting': return <FaPalette className="text-pink-400 text-lg" />;
      case 'error': return <FaExclamationTriangle className="text-red-500 text-lg" />;
      default: return <FaPalette className="text-pink-500 text-lg" />;
    }
  };

  const getMessageBorderColor = (type) => {
    switch (type) {
      case 'joke': return 'border-l-yellow-400';
      case 'fact': return 'border-l-blue-400';
      case 'quote': return 'border-l-purple-400';
      case 'motivation': return 'border-l-indigo-400';
      case 'weather': return 'border-l-teal-400';
      case 'art-tip': return 'border-l-green-400';
      case 'artwork': return 'border-l-red-300';
      case 'vocabulary': return 'border-l-amber-400';
      case 'greeting': return 'border-l-pink-300';
      case 'error': return 'border-l-red-400';
      default: return 'border-l-pink-400';
    }
  };

  // Resizable sidebarr
  const [width, setWidth] = useState(384); // default 96 = md:w-96
  const sidebarRef = useRef(null);

  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e) => {
      const newWidth = startWidth - (e.clientX - startX);
      setWidth(Math.min(Math.max(newWidth, 280), 700)); // clamp between 280px and 700px
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        className="fixed lg:bottom-8 lg:right-8 bottom-4 right-4 z-[1001] bg-gradient-to-br from-pink-500 to-orange-500 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center transition-all duration-300 group"
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Palette AI Assistant"
      >
        {isOpen ? (
          <FaTimes size={24} />
        ) : (
          <div className="relative">
            <FaPalette size={24} />
            {connectionError && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </div>
        )}
      </motion.button>

      {/* Chatbot sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 z-[1001] md:w-96 w-full h-full max-w-[100vw] bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col border-l border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            ref={sidebarRef}
            style={{ width: width }}
          >
            {/* resize part */}
           <div
           onMouseDown={startResize}
           className="hidden md:block absolute top-0 left-0 h-full w-1 cursor-ew-resize bg-transparent hover:bg-gray-300/30 dark:hover:bg-gray-600/30"
           />
            {/* Header */}
            <div className="bg-gradient-to-br from-pink-500 to-orange-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FaPalette className="text-2xl" />
                  {connectionError && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">Palette AI Assistant</h3>
                  <p className="text-xs opacity-80">{chatTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-white hover:text-pink-200 transition-colors p-1 rounded-full hover:bg-white/10"
                  aria-label="Show chat history"
                >
                  <FaHistory size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-pink-200 transition-colors p-1 rounded-full hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>
            
            {/* Connection error banner */}
            {connectionError && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle />
                  <span className="text-sm">Connection issue</span>
                </div>
                <button 
                  onClick={() => setConnectionError(false)}
                  className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}

            {/* Chat history panel */}
            {showHistory && (
              <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Chat History</h4>
                  <button
                    onClick={startNewChat}
                    className="text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full transition-colors"
                  >
                    New Chat
                  </button>
                </div>
                {chatHistory.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No chat history yet. Start a conversation!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {chatHistory.map(chat => (
                      <div
                        key={chat.$id}
                        onClick={() => loadChatFromHistory(chat)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          chatId === chat.$id
                            ? 'bg-pink-100 dark:bg-pink-900/30 border border-pink-300 dark:border-pink-700'
                            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <h5 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                          {chat.title}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(chat.$createdAt).toLocaleDateString()} • {chat.messageCount} messages
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Messages container (only show when not viewing history) */}
            {!showHistory && (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm border-l-4 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' 
                          : `bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 backdrop-blur-sm ${getMessageBorderColor(message.type)}`
                      }`}>
                        <div className="flex items-start gap-3">
                          {message.sender === 'bot' && (
                            <span className="mt-0.5 flex-shrink-0">
                              {getMessageIcon(message.type)}
                            </span>
                          )}
                          {message.sender === 'user' && (
                            <FaUser className="mt-0.5 text-white flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                              {message.sender === 'user' 
                                ? message.text 
                                : (displayedTexts[message.id] || '')}
                              
                              {message.sender === 'bot' && 
                              displayedTexts[message.id] && 
                              displayedTexts[message.id].length < message.text.length && (
                                <span className="inline-block w-2 h-4 bg-current animate-blink ml-1 align-middle">|</span>
                              )}
                            </p>
                            
                            {/* Additional data for specific types */}
                            {message.sender === 'bot' && message.rawData && (
                              <div className="mt-2 text-xs opacity-70">
                                {message.rawData.author && (
                                  <p>— {message.rawData.author}</p>
                                )}
                                {message.rawData.title && (
                                  <p className="font-medium">{message.rawData.title}</p>
                                )}
                              </div>
                            )}
                            
                            {/* Message actions */}
                            <div className="flex items-center justify-between mt-3">
                              {/* Quick reply options */}
                              {/* {message.options && message.sender === 'bot' && 
                              displayedTexts[message.id] === message.text && (
                                <div className="flex flex-wrap gap-2">
                                  {message.options.map((option, index) => (
                                    <motion.button
                                      key={index}
                                      onClick={() => handleQuickReply(option)}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="text-xs bg-pink-100 dark:bg-pink-900/40 hover:bg-pink-200 dark:hover:bg-pink-800/60 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full transition-all shadow-sm border border-pink-200 dark:border-pink-700/50"
                                    >
                                      {option}
                                    </motion.button>
                                  ))}
                                </div>
                              )} */}
                              
                              {/* Action buttons */}
                              <div className="flex items-center gap-1">
                                {/* <button
                                  onClick={() => copyToClipboard(message.text)}
                                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                  aria-label="Copy message"
                                >
                                  <FaRegCopy size={12} />
                                </button> */}
                                {message.sender === 'bot' && (
                                  <>
                                    <button
                                      onClick={() => rateMessage(message.id, 'like')}
                                      className={`p-1 transition-colors ${
                                        message.rating === 'like' 
                                          ? 'text-green-500' 
                                          : 'text-gray-400 hover:text-green-500'
                                      }`}
                                      aria-label="Like message"
                                    >
                                      <FaRegThumbsUp size={12} />
                                    </button>
                                    <button
                                      onClick={() => rateMessage(message.id, 'dislike')}
                                      className={`p-1 transition-colors ${
                                        message.rating === 'dislike' 
                                          ? 'text-red-500' 
                                          : 'text-gray-400 hover:text-red-500'
                                      }`}
                                      aria-label="Dislike message"
                                    >
                                      <FaRegThumbsDown size={12} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-2xl max-w-[85%] shadow-sm backdrop-blur-sm border-l-4 border-pink-400">
                        <div className="flex items-center gap-3">
                          <FaPalette className="text-pink-500" />
                          <div className="flex space-x-1.5">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Palette is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick action buttons above input */}
                <div className="px-4 pt-3 pb-1 bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {[
                      'Tell me an art joke',
                      'Give me an art tip',
                      'Share an interesting fact',
                      'Inspire me with a quote'
                    ].map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setInputText(action);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full transition-all shadow-sm border border-pink-200 dark:border-pink-700/50 hover:from-pink-100 hover:to-orange-100 dark:hover:from-pink-800/30 dark:hover:to-orange-800/30"
                      >
                        {action}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input area */}
                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Palette for art tips, jokes, facts, quotes..."
                        className="w-full px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white text-sm shadow-sm pr-12"
                        disabled={isLoading}
                      />
                      {connectionError && (
                        <button
                          onClick={() => setConnectionError(false)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 dark:hover:text-red-300 p-1"
                          title="Retry connection"
                        >
                          <FaRedo size={14} />
                        </button>
                      )}
                    </div>
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-br from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center flex-shrink-0"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FaPaperPlane size={18} />
                      )}
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  AI can make mistakes. Always verify critical info!
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add styles for animations */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s step-end infinite;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
            60% { transform: translateY(-3px); }
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }
        `}
      </style>
    </>
  );
};

export default Chatbot;

