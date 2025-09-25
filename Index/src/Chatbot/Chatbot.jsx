import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaComment, FaPaperPlane, FaUser, FaLightbulb, FaLaugh, FaQuoteLeft, FaCloudSun, FaPalette, FaExclamationTriangle, FaRedo, FaRegCopy, FaRegThumbsDown, FaRegThumbsUp, FaHistory, FaTrash, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Client, Databases, Account, ID, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

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
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const messagesEndRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  // Get API URL based on environment
  const getApiUrl = () => {
    // For production - use your actual domain
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return 'https://www.thepaintersdiary.com/chat';
    }
    // For local development
    return 'http://localhost:3001/chat';
  };

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
          [Query.orderDesc('$createdAt'), Query.limit(10),  Query.equal("deleted", false),]
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
  messageCount: messages.length,
  deleted: false
};


      let response;
      if (chatId) {
        // Update existing chat
        await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_AI_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID,
      chatId,
      { deleted: true }
    );
    setChatHistory(prev => prev.filter(chat => chat.$id !== chatId)); // remove from frontend


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
      const apiUrl = getApiUrl();
      console.log('Sending request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
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
        }, 20);

        return () => clearTimeout(timer);
      }
    }
  }, [messages, displayedTexts]);

  const handleQuickReply = (option) => {
    if (option === 'Retry connection') {
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
    try {
      setMessages(JSON.parse(chat.messages));
      setChatTitle(chat.title);
      setChatId(chat.$id);
      setShowHistory(false);
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  // Start a new chat
  const startNewChat = () => {
    setMessages([]);
    setChatTitle('New Chat');
    setChatId(null);
    setShowHistory(false);
  };

  // Delete chat from local history (not database)
  const deleteLocalChat = (chatIdToDelete) => {
    setChatHistory(prev => prev.filter(chat => chat.$id !== chatIdToDelete));
    
    // If the currently loaded chat is the one being deleted, clear the chat
    if (chatId === chatIdToDelete) {
      setMessages([]);
      setChatTitle('New Chat');
      setChatId(null);
    }
    
    setDeleteConfirm(null);
    setShowDeleteSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowDeleteSuccess(false);
    }, 3000);
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

  // Resizable sidebar
  const [width, setWidth] = useState(384);
  const sidebarRef = useRef(null);

  // Detect screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) { // md breakpoint
        setWidth(window.innerWidth);
      } else {
        setWidth(Math.max(280, Math.min(700, width))); // Clamp for larger screens
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [width]);

  const startResize = (e) => {
    // Only allow resize on larger screens
    if (window.innerWidth < 768) return;

    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = width;
    const startBodyOverflow = document.body.style.overflow;

    // Prevent scrolling during resize
    document.body.style.overflow = 'hidden';

    const onMouseMove = (e) => {
      const newWidth = startWidth + (startX - e.clientX); // Fixed: + instead of - for right sidebar
      setWidth(Math.max(280, Math.min(700, newWidth)));
    };

    const onMouseUp = () => {
      document.body.style.overflow = startBodyOverflow;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Chatbot toggle button */}
    <div className="fixed lg:bottom-6 bottom-[70px] lg:right-6 right-2 z-50">
      {/* Notification badge */}
      {hasNotification && (
        <div className="absolute -top-1 -right-1 z-10">
          <span className="flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </span>
        </div>
      )}
      {/* from-blue-500 to-purple-600 */}
      {/* Main button */}
<motion.button
  className="relative p-4 rounded-xl flex items-center justify-center overflow-hidden"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => {
    setIsOpen(!isOpen);
    setHasNotification(false);
  }}
  onHoverStart={() => setIsHovered(true)}
  onHoverEnd={() => setIsHovered(false)}
  aria-label="Palette AI Assistant"
>
  {/* Spinning Gradient Border */}
  <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-400 animate-spin-slow">
    <div className="w-full h-full bg-gray-900 rounded-[10px]" />
  </div>

  {/* Icon inside */}
  <AnimatePresence mode="wait">
    {isOpen ? (
      <motion.div
        key="close"
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <FaTimes className="text-2xl text-white" />
      </motion.div>
    ) : (
      <motion.div
        key="chat"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <FaPalette className="text-2xl text-cyan-400" />
      </motion.div>
    )}
  </AnimatePresence>
</motion.button>

{/* Hover tooltip */}
<AnimatePresence>
  {isHovered && (
    <motion.div
      className="absolute right-20 top-1/3 -translate-y-1/2 bg-gray-900 text-white text-sm text-nowrap px-2 py-1.5 rounded-md shadow-lg border border-gray-700"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
    >
      Chat with Palette AI
    </motion.div>
  )}
</AnimatePresence>

</div>


      {/* Chatbot sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 z-[1001] h-full bg-white/95 dark:bg-gray-900/95 shadow-2xl overflow-hidden flex flex-col border-l border-gray-200/30 dark:border-gray-700/30 backdrop-blur-xl"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            ref={sidebarRef}
            style={{ width: isMobile ? '100%' : `${width}px` }}
          >
            {/* resize handle - only visible and functional on md+ */}
            {!isMobile && (
              <div
                onMouseDown={startResize}
                className="absolute top-0 left-0 h-full w-1 cursor-ew-resize bg-transparent hover:bg-indigo-300/30 dark:hover:bg-indigo-600/30 transition-colors z-10"
              />
            )}
            
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between shadow-md border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative p-2 bg-white/10 rounded-full">
                  <FaPalette className="text-xl" />
                  {connectionError && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse border border-white"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">Palette AI</h3>
                  <p className="text-xs opacity-90 font-medium">{chatTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  aria-label="Show chat history"
                >
                  <FaHistory size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  aria-label="Close chat"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
            
            {/* Connection error banner */}
            {connectionError && (
              <div className="bg-red-100/90 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 flex items-center justify-between backdrop-blur-sm border-b border-red-200/50 dark:border-red-700/30">
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle className="flex-shrink-0" />
                  <span className="text-sm font-medium">Connection issue</span>
                </div>
                <button 
                  onClick={() => setConnectionError(false)}
                  className="text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 p-1 rounded-full hover:bg-red-200/50 dark:hover:bg-red-700/30"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}

            {/* Delete success notification */}
            <AnimatePresence>
              {showDeleteSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-100/90 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-3 flex items-center justify-between backdrop-blur-sm border-b border-green-200/50 dark:border-green-700/30"
                >
                  <div className="flex items-center gap-2">
                    <FaCheck className="flex-shrink-0" />
                    <span className="text-sm font-medium">Chat removed from history</span>
                  </div>
                  <button 
                    onClick={() => setShowDeleteSuccess(false)}
                    className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 p-1 rounded-full hover:bg-green-200/50 dark:hover:bg-green-700/30"
                  >
                    <FaTimes size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat history panel */}
            {showHistory && (
              <div className="flex-1 overflow-y-auto bg-gray-50/90 dark:bg-gray-800/90 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Recent Chats</h4>
                  <button
                    onClick={startNewChat}
                    className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-xl transition-colors shadow-sm font-medium"
                  >
                    New Chat
                  </button>
                </div>
                {chatHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-white/80 dark:bg-gray-700/80 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
                      <FaHistory className="text-gray-400 dark:text-gray-500 text-3xl mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">No chat history yet</p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start a conversation to see it here!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatHistory.map(chat => (
                      <div
                        key={chat.$id}
                        className={`p-4 rounded-2xl cursor-pointer transition-all flex justify-between items-center group ${
                          chatId === chat.$id
                            ? 'bg-indigo-100/70 dark:bg-indigo-900/30 border border-indigo-300/50 dark:border-indigo-700/30 shadow-md'
                            : 'bg-white/80 dark:bg-gray-700/80 hover:bg-gray-100/80 dark:hover:bg-gray-600/80 shadow-sm border border-gray-200/50 dark:border-gray-600/50'
                        } backdrop-blur-sm`}
                      >
                        <div onClick={() => loadChatFromHistory(chat)} className="flex-1 min-w-0">
                          <h5 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                            {chat.title}
                          </h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(chat.$createdAt).toLocaleDateString()} • {chat.messageCount} messages
                          </p>
                        </div>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(chat.$id);
                            }}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-100/50 dark:hover:bg-red-900/20 transition-colors"
                            aria-label="Delete chat locally"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Messages container (only show when not viewing history) */}
            {!showHistory && (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white/5 to-gray-50/5 dark:from-gray-900/5 dark:to-gray-800/5 space-y-4 backdrop-blur-sm">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center p-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm max-w-md">
                        <FaPalette className="text-indigo-500 text-4xl mx-auto mb-4" />
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2">Welcome to Palette AI</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          I'm your art assistant! Ask me for jokes, tips, facts, or inspiration.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {['Art tip', 'Tell me a joke', 'Interesting fact', 'Inspirational quote'].map((action, index) => (
                            <motion.button
                              key={index}
                              onClick={() => {
                                setInputText(action);
                                setTimeout(() => handleSendMessage(), 100);
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-xs bg-indigo-50/70 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-xl transition-all shadow-sm border border-indigo-200/50 dark:border-indigo-700/30 hover:bg-indigo-100/70 dark:hover:bg-indigo-800/30 font-medium"
                            >
                              {action}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
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
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                              : `bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 backdrop-blur-md ${getMessageBorderColor(message.type)} border border-gray-200/30 dark:border-gray-700/30`
                          }`}>
                            <div className="flex items-start gap-3">
                              {message.sender === 'bot' && (
                                <span className="mt-0.5 flex-shrink-0">
                                  {getMessageIcon(message.type)}
                                </span>
                              )}
                              {message.sender === 'user' && (
                                <div className="p-1.5 bg-white/20 rounded-full mt-0.5 flex-shrink-0">
                                  <FaUser className="text-white text-sm" />
                                </div>
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
                                  <div className="flex items-center gap-1">
                                    {message.sender === 'bot' && (
                                      <>
                                        <button
                                          onClick={() => rateMessage(message.id, 'like')}
                                          className={`p-1.5 rounded-full transition-colors ${
                                            message.rating === 'like' 
                                              ? 'text-green-500 bg-green-100/50 dark:bg-green-900/20' 
                                              : 'text-gray-400 hover:text-green-500 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                                          }`}
                                          aria-label="Like message"
                                        >
                                          <FaRegThumbsUp size={12} />
                                        </button>
                                        <button
                                          onClick={() => rateMessage(message.id, 'dislike')}
                                          className={`p-1.5 rounded-full transition-colors ${
                                            message.rating === 'dislike' 
                                              ? 'text-red-500 bg-red-100/50 dark:bg-red-900/20' 
                                              : 'text-gray-400 hover:text-red-500 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                                          }`}
                                          aria-label="Dislike message"
                                        >
                                          <FaRegThumbsDown size={12} />
                                        </button>
                                        <button
                                          onClick={() => copyToClipboard(message.text)}
                                          className="p-1.5 rounded-full text-gray-400 hover:text-indigo-500 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                                          aria-label="Copy message"
                                        >
                                          <FaRegCopy size={12} />
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
                          <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-2xl max-w-[85%] shadow-sm backdrop-blur-md border-l-4 border-indigo-400 border border-gray-200/30 dark:border-gray-700/30">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full">
                                <FaPalette className="text-indigo-500 text-sm" />
                              </div>
                              <div className="flex space-x-1.5">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Palette is thinking...</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick action buttons above input */}
                {messages.length > 0 && (
                  <div className="px-4 pt-3 pb-1 bg-white/90 dark:bg-gray-900/90 border-t border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
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
                          className="text-xs bg-indigo-50/70 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-xl transition-all shadow-sm border border-indigo-200/50 dark:border-indigo-700/30 hover:bg-indigo-100/70 dark:hover:bg-indigo-800/30 font-medium"
                        >
                          {action}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input area */}
                <div className="p-4 bg-white/90 dark:bg-gray-900/90 border-t border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Palette for art tips, jokes, facts, quotes..."
                        className="w-full px-4 py-3 border border-gray-300/30 dark:border-gray-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800/70 dark:text-white text-sm shadow-sm pr-12 backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-400"
                        disabled={isLoading}
                      />
                      {connectionError && (
                        <button
                          onClick={() => setConnectionError(false)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 dark:hover:text-red-300 p-1.5 rounded-full hover:bg-red-100/50 dark:hover:bg-red-900/20"
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
                      className="bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
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

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
              {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <FaInfoCircle className="text-red-500 text-xl" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Remove from History?</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      This chat will be permanently removed from your history. Once deleted, it cannot be restored.
                    </p>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteLocalChat(deleteConfirm)}
                        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors font-medium flex items-center gap-2"
                      >
                        <FaTrash size={12} />
                        Remove from History
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
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
