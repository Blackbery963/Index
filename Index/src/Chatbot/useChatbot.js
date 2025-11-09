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
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
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
  // useEffect(() => {
  //   const loadData = async () => {
  //     if (isOpen) {
  //       try {
  //         const userData = await appwriteService.getUser();
  //         setUser(userData);
          
  //         if (userData) {
  //           const history = await appwriteService.fetchChatHistory();
  //           setChatHistory(history || []); // Ensure it's always an array
  //         }
  //       } catch (error) {
  //         console.error('Error loading data:', error);
  //         setChatHistory([]); // Set empty array on error
  //       }
  //     }
  //   };
  //   loadData();
  // }, [isOpen]);

  useEffect(() => {
  const loadData = async () => {
    if (isOpen) {
      setIsHistoryLoading(true);
      try {
        const userData = await appwriteService.getUser();
        setUser(userData);
        
        if (userData) {
          const history = await appwriteService.fetchChatHistory(userData.$id);
          setChatHistory(history);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setChatHistory([]);
      } finally {
        setIsHistoryLoading(false);
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


  // Chat history management
  // const loadChatFromHistory = (chat) => {
  //   try {
  //     if (!chat || !chat.messages) {
  //       throw new Error('Invalid chat data');
  //     }

  //     const parsedMessages = JSON.parse(chat.messages);
      
  //     // Validate parsed messages
  //     if (!Array.isArray(parsedMessages)) {
  //       throw new Error('Messages is not an array');
  //     }

  //     setMessages(parsedMessages);
  //     setChatTitle(chat.title || 'Untitled Chat');
  //     setChatId(chat.$id);
  //     setShowHistory(false);
      
  //     // Initialize displayed texts for all messages
  //     const initialDisplayedTexts = {};
  //     parsedMessages.forEach(msg => {
  //       if (msg && msg.id && msg.text) {
  //         initialDisplayedTexts[msg.id] = msg.sender === 'bot' ? '' : msg.text;
  //       }
  //     });
  //     setDisplayedTexts(initialDisplayedTexts);
  //   } catch (error) {
  //     console.error('Error loading chat:', error);
  //     // Optionally show an error message to the user
  //   }
  // };// Chat history management - COMPLETE FIX

  // Chat history management - COMBINED & IMPROVED VERSION
const loadChatFromHistory = (chat) => {
  try {
    // Validate the chat data
    if (!chat || !chat.messages) {
      throw new Error('Invalid chat data');
    }

    // Check if this chat belongs to the current user (security)
    if (user && chat.userId !== user.$id) {
      console.warn('⚠️ User tried to load chat that does not belong to them');
      // Optional: Show error message to user
      return;
    }

    const parsedMessages = JSON.parse(chat.messages);
    
    // Validate parsed messages
    if (!Array.isArray(parsedMessages)) {
      throw new Error('Messages is not an array');
    }

    console.log(`🔄 Loading chat: "${chat.title}" with ${parsedMessages.length} messages`);

    // ✅ Set all messages at once (replaces current conversation)
    setMessages(parsedMessages);
    setChatTitle(chat.title || 'Untitled Chat');
    setChatId(chat.$id);
    setShowHistory(false);
    
    // ✅ Initialize displayed texts for ALL messages
    // For loaded chats, show ALL messages immediately (no typewriter effect)
    const initialDisplayedTexts = {};
    parsedMessages.forEach(msg => {
      if (msg && msg.id && msg.text) {
        // Show FULL TEXT immediately for all messages in loaded chats
        initialDisplayedTexts[msg.id] = msg.text;
      }
    });
    
    setDisplayedTexts(initialDisplayedTexts);

    console.log('✅ Successfully loaded chat:', {
      title: chat.title,
      chatId: chat.$id,
      totalMessages: parsedMessages.length,
      userMessages: parsedMessages.filter(m => m.sender === 'user').length,
      botMessages: parsedMessages.filter(m => m.sender === 'bot').length,
      belongsToUser: user ? chat.userId === user.$id : 'No user logged in'
    });
    
  } catch (error) {
    console.error('❌ Error loading chat:', error);
    // Optional: Show user-friendly error message
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

  // In useChatbot.js - Updated version

// Load user and history - FIXED
useEffect(() => {
  const loadData = async () => {
    if (isOpen) {
      const userData = await appwriteService.getUser();
      setUser(userData);
      
      if (userData) {
        // ✅ Pass user ID to only get their chats
        const history = await appwriteService.fetchChatHistory(userData.$id);
        setChatHistory(history);
      } else {
        // If no user, clear history or show only local chats
        setChatHistory([]);
      }
    }
  };
  loadData();
}, [isOpen]);

// Main message handler - FIXED
const handleSendMessage = async () => {
  if (inputText.trim() === '' || isLoading) return;

  const requestId = Date.now();
  currentRequestId.current = requestId;

  const userMessage = {
    id: requestId,
    text: inputText,
    sender: 'user',
    type: 'text',
    timestamp: new Date().toISOString()
  };

  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setDisplayedTexts(prev => ({ ...prev, [userMessage.id]: userMessage.text }));
  setInputText('');

  if (messages.filter(m => m.sender === 'user').length === 0) {
    const newTitle = messageService.generateChatTitle(inputText);
    setChatTitle(newTitle);
  }

  setIsLoading(true);
  setConnectionError(false);

  try {
    const botResponse = await messageService.processMessage(inputText, updatedMessages);
    
    if (currentRequestId.current !== requestId) return;

    const botMessage = {
      id: requestId + 1,
      text: botResponse.content,
      sender: 'bot',
      type: botResponse.type,
      options: messageService.getOptionsForType(botResponse.type),
      rawData: botResponse,
      timestamp: new Date().toISOString()
    };
    
    const finalMessages = [...updatedMessages, botMessage];
    setMessages(finalMessages);

    // Save to database - FIXED: Pass user ID
    if (user) {
      await appwriteService.saveChat(finalMessages, chatTitle, chatId, user.$id);
      // Reload only this user's history
      const history = await appwriteService.fetchChatHistory(user.$id);
      setChatHistory(history);
    }
  } catch (error) {
    if (currentRequestId.current === requestId) {
      console.error('Error sending message:', error);
      setConnectionError(true);
    }
  } finally {
    if (currentRequestId.current === requestId) {
      setIsLoading(false);
    }
  }
};

// Fixed delete function - FIXED
const deleteLocalChat = async (chatIdToDelete) => {
  try {
    // ✅ Pass user ID to ensure they can only delete their own chats
    const success = await appwriteService.deleteChat(chatIdToDelete, user?.$id);
    
    if (success) {
      setChatHistory(prev => prev.filter(chat => chat.$id !== chatIdToDelete));
      
      if (chatId === chatIdToDelete) {
        setMessages([]);
        setChatTitle('New Chat');
        setChatId(null);
      }
      
      setDeleteConfirm(null);
      setShowDeleteSuccess(true);
      setTimeout(() => setShowDeleteSuccess(false), 3000);
    } else {
      console.error('Failed to delete chat from database');
    }
  } catch (error) {
    console.error('Error deleting chat:', error);
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
    isHistoryLoading,

    // Actions
    handleSendMessage,
    handleKeyPress,
    startNewChat,
    loadChatFromHistory,
    deleteLocalChat
  };
};