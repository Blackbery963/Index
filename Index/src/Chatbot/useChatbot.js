// import { useState, useRef, useEffect, useCallback } from 'react';
// import { messageService } from './messageService';
// import { appwriteService } from './appwriteService';

// export const useChatbot = () => {
//   // State
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [displayedTexts, setDisplayedTexts] = useState({});
//   const [connectionError, setConnectionError] = useState(false);
//   const [user, setUser] = useState(null);
//   const [chatTitle, setChatTitle] = useState('New Chat');
//   const [chatId, setChatId] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [hasNotification, setHasNotification] = useState(true);

//   // Add this ref to track current request
//   const currentRequestId = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Initialize with greeting
//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       const greetingMessage = {
//         id: Date.now(),
//         text: user 
//           ? `Welcome back, ${user.name}! What's your creative mood today?` 
//           : "Hi there! I'm Palette, your modern AI art assistant. How can I help you today?",
//         sender: 'bot',
//         type: 'greeting',
//         options: ['Tell me a joke', 'Art tip', 'Interesting fact', 'Inspirational quote']
//       };
//       setMessages([greetingMessage]);
//       setDisplayedTexts(prev => ({ ...prev, [greetingMessage.id]: '' }));
//     }
//   }, [isOpen, user]);

//   // Load user and history
//   useEffect(() => {
//     const loadData = async () => {
//       if (isOpen) {
//         const userData = await appwriteService.getUser();
//         setUser(userData);
        
//         if (userData) {
//           const history = await appwriteService.fetchChatHistory();
//           setChatHistory(history);
//         }
//       }
//     };
//     loadData();
//   }, [isOpen]);

//   // Scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, displayedTexts]);

//   // FIXED: Typewriter effect - no infinite loop
//   useEffect(() => {
//     const botMessages = messages.filter(msg => msg.sender === 'bot');
//     const lastBotMessage = botMessages[botMessages.length - 1];
    
//     if (!lastBotMessage) return;

//     const messageId = lastBotMessage.id;
//     const fullText = lastBotMessage.text;
//     const currentDisplay = displayedTexts[messageId] || '';

//     // Only start typewriter if we haven't completed this message
//     if (currentDisplay.length < fullText.length) {
//       const timer = setTimeout(() => {
//         setDisplayedTexts(prev => ({
//           ...prev,
//           [messageId]: fullText.slice(0, (prev[messageId] || '').length + 1)
//         }));
//       }, 20);

//       return () => clearTimeout(timer);
//     }
//   }, [messages, displayedTexts]); // Proper dependencies


//   // // Initialize displayed texts for new bot messages
//   // useEffect(() => {
//   //   const newBotMessages = messages.filter(
//   //     msg => msg.sender === 'bot' && !displayedTexts[msg.id]
//   //   );
    
//   //   if (newBotMessages.length > 0) {
//   //     const newDisplayedTexts = { ...displayedTexts };
//   //     newBotMessages.forEach(msg => {
//   //       newDisplayedTexts[msg.id] = '';
//   //     });
//   //     setDisplayedTexts(newDisplayedTexts);
//   //   }
//   // }, [messages]); // Only depend on messages, not displayedTexts
//   // FIXED: Typewriter effect - no infinite loop
// useEffect(() => {
//   const botMessages = messages.filter(msg => msg.sender === 'bot');
//   const lastBotMessage = botMessages[botMessages.length - 1];
  
//   if (!lastBotMessage) return;

//   const messageId = lastBotMessage.id;
//   const fullText = typeof lastBotMessage.text === 'string' ? lastBotMessage.text : ''; // Fallback to empty string
//   const currentDisplay = displayedTexts[messageId] || '';

//   // Skip if no text to type
//   if (fullText.length === 0 || currentDisplay.length >= fullText.length) {
//     return;
//   }

//   const timer = setTimeout(() => {
//     setDisplayedTexts(prev => ({
//       ...prev,
//       [messageId]: fullText.slice(0, (prev[messageId] || '').length + 1)
//     }));
//   }, 20);

//   return () => clearTimeout(timer);
// }, [messages, displayedTexts]); // Proper dependencies

//   // Main message handler - FIXED: Prevent multiple simultaneous requests
//   const handleSendMessage = async () => {
//     if (inputText.trim() === '' || isLoading) return;

//     // Generate unique request ID to prevent race conditions
//     const requestId = Date.now();
//     currentRequestId.current = requestId;

//     // Add user message
//     const userMessage = {
//       id: requestId,
//       text: inputText,
//       sender: 'user',
//       type: 'text',
//       timestamp: new Date().toISOString()
//     };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setDisplayedTexts(prev => ({ ...prev, [userMessage.id]: userMessage.text }));
//     setInputText('');

//     // Generate title if first user message
//     if (messages.filter(m => m.sender === 'user').length === 0) {
//       const newTitle = messageService.generateChatTitle(inputText);
//       setChatTitle(newTitle);
//     }

//     setIsLoading(true);
//     setConnectionError(false);

//     try {
//       // Get bot response
//       const botResponse = await messageService.processMessage(inputText, updatedMessages);
      
//       // Check if this is still the current request (prevent race conditions)
//       if (currentRequestId.current !== requestId) {
//         console.log('Request was cancelled or superseded');
//         return;
//       }

//       const botMessage = {
//         id: requestId + 1, // Ensure unique ID
//         text: botResponse.content,
//         sender: 'bot',
//         type: botResponse.type,
//         options: messageService.getOptionsForType(botResponse.type),
//         rawData: botResponse,
//         timestamp: new Date().toISOString()
//       };
      
//       const finalMessages = [...updatedMessages, botMessage];
//       setMessages(finalMessages);
//       // Don't set displayedText here - let the useEffect handle it

//       // Save to database
//       if (user) {
//         await appwriteService.saveChat(finalMessages, chatTitle, chatId);
//         const history = await appwriteService.fetchChatHistory();
//         setChatHistory(history);
//       }
//     } catch (error) {
//       // Only show error if this is still the current request
//       if (currentRequestId.current === requestId) {
//         console.error('Error sending message:', error);
//         setConnectionError(true);
//       }
//     } finally {
//       // Only clear loading if this is still the current request
//       if (currentRequestId.current === requestId) {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Chat history management
//   const loadChatFromHistory = (chat) => {
//     try {
//       const parsedMessages = JSON.parse(chat.messages);
//       setMessages(parsedMessages);
//       setChatTitle(chat.title);
//       setChatId(chat.$id);
//       setShowHistory(false);
      
//       // Initialize displayed texts for all bot messages
//       const initialDisplayedTexts = {};
//       parsedMessages.forEach(msg => {
//         if (msg.sender === 'bot') {
//           initialDisplayedTexts[msg.id] = msg.text; // Show full text immediately for loaded chats
//         } else {
//           initialDisplayedTexts[msg.id] = msg.text;
//         }
//       });
//       setDisplayedTexts(initialDisplayedTexts);
//     } catch (error) {
//       console.error('Error loading chat:', error);
//     }
//   };

//     // Fixed delete function - delete from both local state AND database
//   const deleteLocalChat = async (chatIdToDelete) => {
//     try {
//       // 1. Delete from database first
//       const success = await appwriteService.deleteChat(chatIdToDelete);
      
//       if (success) {
//         // 2. Only remove from local state if database deletion was successful
//         setChatHistory(prev => prev.filter(chat => chat.$id !== chatIdToDelete));
        
//         // 3. If the currently loaded chat is the one being deleted, clear the chat
//         if (chatId === chatIdToDelete) {
//           setMessages([]);
//           setChatTitle('New Chat');
//           setChatId(null);
//         }
        
//         setDeleteConfirm(null);
//         setShowDeleteSuccess(true);
        
//         // Hide success message after 3 seconds
//         setTimeout(() => {
//           setShowDeleteSuccess(false);
//         }, 3000);
//       } else {
//         // Handle database deletion failure
//         console.error('Failed to delete chat from database');
//         // You might want to show an error message to the user here
//       }
//     } catch (error) {
//       console.error('Error deleting chat:', error);
//       // Handle error - show error message to user
//     }
//   };


//   const startNewChat = () => {
//     setMessages([]);
//     setChatTitle('New Chat');
//     setChatId(null);
//     setShowHistory(false);
//     setDisplayedTexts({}); // Clear displayed texts
//     currentRequestId.current = null; // Reset request ID
//   };

//   // const deleteLocalChat = (chatIdToDelete) => {
//   //   setChatHistory(prev => prev.filter(chat => chat.$id !== chatIdToDelete));
    
//   //   if (chatId === chatIdToDelete) {
//   //     setMessages([]);
//   //     setChatTitle('New Chat');
//   //     setChatId(null);
//   //     setDisplayedTexts({});
//   //   }
    
//   //   setDeleteConfirm(null);
//   //   setShowDeleteSuccess(true);
//   //   setTimeout(() => setShowDeleteSuccess(false), 3000);
//   // };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return {
//     // State
//     isOpen,
//     setIsOpen,
//     messages,
//     inputText,
//     setInputText,
//     isLoading,
//     displayedTexts,
//     connectionError,
//     user,
//     chatTitle,
//     chatId,
//     showHistory,
//     setShowHistory,
//     chatHistory,
//     deleteConfirm,
//     setDeleteConfirm,
//     showDeleteSuccess,
//     messagesEndRef,
//     isHovered,
//     setIsHovered,
//     hasNotification,
//     setHasNotification,

//     // Actions
//     handleSendMessage,
//     handleKeyPress,
//     startNewChat,
//     loadChatFromHistory,
//     deleteLocalChat
//   };
// };

import { useState, useRef, useEffect, useCallback } from 'react';
import { messageService } from './messageService';
import { appwriteService } from './appwriteService';

export const useChatbot = () => {
  // State
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
  const [isHovered, setIsHovered] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  // Add this ref to track current request
  const currentRequestId = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessage = {
        id: Date.now(),
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

  // Load user and history
  useEffect(() => {
    const loadData = async () => {
      if (isOpen) {
        try {
          const userData = await appwriteService.getUser();
          setUser(userData);
          
          if (userData) {
            const history = await appwriteService.fetchChatHistory();
            setChatHistory(history || []); // Ensure it's always an array
          }
        } catch (error) {
          console.error('Error loading data:', error);
          setChatHistory([]); // Set empty array on error
        }
      }
    };
    loadData();
  }, [isOpen]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedTexts]);

  // FIXED: Typewriter effect with proper error handling
  useEffect(() => {
    const botMessages = messages.filter(msg => 
      msg && msg.sender === 'bot' && msg.text && typeof msg.text === 'string'
    );
    
    const lastBotMessage = botMessages[botMessages.length - 1];
    
    if (!lastBotMessage) return;

    const messageId = lastBotMessage.id;
    const fullText = lastBotMessage.text || ''; // Fallback to empty string
    const currentDisplay = displayedTexts[messageId] || '';

    // Only start typewriter if we have text and haven't completed
    if (fullText && currentDisplay.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedTexts(prev => ({
          ...prev,
          [messageId]: fullText.slice(0, (prev[messageId] || '').length + 1)
        }));
      }, 20);

      return () => clearTimeout(timer);
    }
  }, [messages, displayedTexts]);

  // Initialize displayed texts for new bot messages
  useEffect(() => {
    const newBotMessages = messages.filter(
      msg => msg && msg.sender === 'bot' && msg.text && !displayedTexts[msg.id]
    );
    
    if (newBotMessages.length > 0) {
      const newDisplayedTexts = { ...displayedTexts };
      newBotMessages.forEach(msg => {
        if (msg.id && msg.text) {
          newDisplayedTexts[msg.id] = '';
        }
      });
      setDisplayedTexts(newDisplayedTexts);
    }
  }, [messages]); // Only depend on messages, not displayedTexts

  // Main message handler - FIXED: Prevent multiple simultaneous requests
  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    // Generate unique request ID to prevent race conditions
    const requestId = Date.now();
    currentRequestId.current = requestId;

    // Add user message
    const userMessage = {
      id: requestId,
      text: inputText,
      sender: 'user',
      type: 'text',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setDisplayedTexts(prev => ({ 
      ...prev, 
      [userMessage.id]: userMessage.text 
    }));
    setInputText('');

    // Generate title if first user message
    if (messages.filter(m => m.sender === 'user').length === 0) {
      const newTitle = messageService.generateChatTitle(inputText);
      setChatTitle(newTitle);
    }

    setIsLoading(true);
    setConnectionError(false);

    try {
      // Get bot response
      const botResponse = await messageService.processMessage(inputText, updatedMessages);
      
      // Check if this is still the current request (prevent race conditions)
      if (currentRequestId.current !== requestId) {
        console.log('Request was cancelled or superseded');
        return;
      }

      // Validate bot response
      if (!botResponse || !botResponse.content) {
        throw new Error('Invalid bot response');
      }

      const botMessage = {
        id: requestId + 1,
        text: botResponse.content,
        sender: 'bot',
        type: botResponse.type || 'ai',
        options: messageService.getOptionsForType(botResponse.type),
        rawData: botResponse,
        timestamp: new Date().toISOString()
      };
      
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      // Save to database
      if (user) {
        try {
          await appwriteService.saveChat(finalMessages, chatTitle, chatId);
          const history = await appwriteService.fetchChatHistory();
          setChatHistory(history || []);
        } catch (dbError) {
          console.error('Error saving to database:', dbError);
          // Don't throw here, just log the error
        }
      }
    } catch (error) {
      // Only show error if this is still the current request
      if (currentRequestId.current === requestId) {
        console.error('Error sending message:', error);
        setConnectionError(true);
        
        // Add error message to chat
        const errorMessage = {
          id: requestId + 1,
          text: "Sorry, I encountered an error. Please try again.",
          sender: 'bot',
          type: 'error',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      // Only clear loading if this is still the current request
      if (currentRequestId.current === requestId) {
        setIsLoading(false);
      }
    }
  };

  // Chat history management
  const loadChatFromHistory = (chat) => {
    try {
      if (!chat || !chat.messages) {
        throw new Error('Invalid chat data');
      }

      const parsedMessages = JSON.parse(chat.messages);
      
      // Validate parsed messages
      if (!Array.isArray(parsedMessages)) {
        throw new Error('Messages is not an array');
      }

      setMessages(parsedMessages);
      setChatTitle(chat.title || 'Untitled Chat');
      setChatId(chat.$id);
      setShowHistory(false);
      
      // Initialize displayed texts for all messages
      const initialDisplayedTexts = {};
      parsedMessages.forEach(msg => {
        if (msg && msg.id && msg.text) {
          initialDisplayedTexts[msg.id] = msg.sender === 'bot' ? '' : msg.text;
        }
      });
      setDisplayedTexts(initialDisplayedTexts);
    } catch (error) {
      console.error('Error loading chat:', error);
      // Optionally show an error message to the user
    }
  };

  // Fixed delete function - delete from both local state AND database
  const deleteLocalChat = async (chatIdToDelete) => {
    try {
      // 1. Delete from database first
      const success = await appwriteService.deleteChat(chatIdToDelete);
      
      if (success) {
        // 2. Only remove from local state if database deletion was successful
        setChatHistory(prev => prev.filter(chat => chat && chat.$id !== chatIdToDelete));
        
        // 3. If the currently loaded chat is the one being deleted, clear the chat
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
      } else {
        console.error('Failed to delete chat from database');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setChatTitle('New Chat');
    setChatId(null);
    setShowHistory(false);
    setDisplayedTexts({});
    currentRequestId.current = null;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    // State
    isOpen,
    setIsOpen,
    messages,
    inputText,
    setInputText,
    isLoading,
    displayedTexts,
    connectionError,
    user,
    chatTitle,
    chatId,
    showHistory,
    setShowHistory,
    chatHistory,
    deleteConfirm,
    setDeleteConfirm,
    showDeleteSuccess,
    messagesEndRef,
    isHovered,
    setIsHovered,
    hasNotification,
    setHasNotification,

    // Actions
    handleSendMessage,
    handleKeyPress,
    startNewChat,
    loadChatFromHistory,
    deleteLocalChat
  };
};