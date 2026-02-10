// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaTimes, FaPalette, FaHistory } from 'react-icons/fa';
// import { useChatbot } from './useChatbot';
// import MessageBubble from './MessageBubble';
// import ChatHistory from './ChatHistory';
// import InputArea from './InputArea';

// const ChatbotUI = () => {
//   const {
//     isOpen,
//     setIsOpen,
//     messages,
//     inputText,
//     setInputText,
//     isLoading,
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
//     handleSendMessage,
//     handleKeyPress,
//     startNewChat,
//     loadChatFromHistory,
//     deleteLocalChat,
//     displayedTexts
//   } = useChatbot();

//   const showLoadingIndicator = isLoading && 
//     messages.filter(msg => msg.sender === 'bot' && 
//       displayedTexts[msg.id] !== msg.text).length === 0;


//   if (!isOpen) {
//     return (
//       <div className="fixed lg:bottom-6 bottom-[70px] lg:right-6 right-2 z-50">
//         {hasNotification && (
//           <div className="absolute -top-1 -right-1 z-10">
//             <span className="flex h-4 w-4">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
//             </span>
//           </div>
//         )}
        
//         <motion.button
//           className="relative p-4 rounded-xl flex items-center justify-center overflow-hidden"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => {
//             setIsOpen(true);
//             setHasNotification(false);
//           }}
//           onHoverStart={() => setIsHovered(true)}
//           onHoverEnd={() => setIsHovered(false)}
//           aria-label="Palette AI Assistant"
//         >
//           <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-yellow-400 animate-spin-slow">
//             <div className="w-full h-full bg-gray-900 rounded-[10px]" />
//           </div>
//           <FaPalette className="text-2xl text-cyan-400" />
//         </motion.button>

        // <AnimatePresence>
        //   {isHovered && (
        //     <motion.div
        //       className="absolute right-20 top-1/3 -translate-y-1/2 bg-gray-900 text-white text-sm text-nowrap px-2 py-1.5 rounded-md shadow-lg border border-gray-700"
        //       initial={{ opacity: 0, x: 10 }}
        //       animate={{ opacity: 1, x: 0 }}
        //       exit={{ opacity: 0, x: 10 }}
        //     >
        //       Chat with Palette AI
        //     </motion.div>
        //   )}
        // </AnimatePresence>
//       </div>
//     );
//   }

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed top-0 right-0 z-[1001] h-full bg-white/95 dark:bg-gray-900/95 shadow-2xl overflow-hidden flex flex-col border-l border-gray-200/30 dark:border-gray-700/30 backdrop-blur-xl hide-scrollbar"
//         initial={{ opacity: 0, x: '100%' }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: '100%' }}
//         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//         style={{ width: '100%', maxWidth: '400px' }}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between shadow-md border-b border-white/10 hide-scrollbar">
//           <div className="flex items-center gap-3">
//             <div className="relative p-2 bg-white/10 rounded-full">
//               <FaPalette className="text-xl" />
//               {connectionError && (
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse border border-white"></span>
//               )}
//             </div>
//             <div>
//               <h3 className="font-bold text-lg tracking-wide">Palette AI</h3>
//               <p className="text-xs opacity-90 font-medium">{chatTitle}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setShowHistory(!showHistory)}
//               className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
//               aria-label="Show chat history"
//             >
//               <FaHistory size={16} />
//             </button>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
//               aria-label="Close chat"
//             >
//               <FaTimes size={16} />
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         {showHistory ? (
//           <ChatHistory
//             chatHistory={chatHistory}
//             chatId={chatId}
//             loadChatFromHistory={loadChatFromHistory}
//             startNewChat={startNewChat}
//             deleteConfirm={deleteConfirm}
//             setDeleteConfirm={setDeleteConfirm}
//             showDeleteSuccess={showDeleteSuccess}
//             deleteLocalChat={deleteLocalChat}
//           />
//         ) : (
//           <>
//             {/* Messages */}
//             <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white/5 to-gray-50/5 dark:from-gray-900/5 dark:to-gray-800/5 space-y-4 backdrop-blur-sm">
//               {messages.length === 0 ? (
//                 <div className="h-full flex items-center justify-center">
//                   <div className="text-center p-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-sm border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm max-w-md">
//                     <FaPalette className="text-indigo-500 text-4xl mx-auto mb-4" />
//                     <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2">Welcome to Palette AI</h3>
//                     <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
//                       I'm your art assistant! Ask me for jokes, tips, facts, or inspiration.
//                     </p>
//                     <div className="flex flex-wrap gap-2 justify-center">
//                       {['Art tip', 'Tell me a joke', 'Interesting fact', 'Inspirational quote'].map((action, index) => (
//                         <motion.button
//                           key={index}
//                           onClick={() => {
//                             setInputText(action);
//                             setTimeout(() => handleSendMessage(), 100);
//                           }}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="text-xs bg-indigo-50/70 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-xl transition-all shadow-sm border border-indigo-200/50 dark:border-indigo-700/30 hover:bg-indigo-100/70 dark:hover:bg-indigo-800/30 font-medium"
//                         >
//                           {action}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   {messages.map((message) => (
//                     <MessageBubble
//                       key={message.id}
//                       message={message}
//                       displayedText={displayedTexts[message.id]}
//                     />
//                   ))}
                  
//                   {/* FIXED: Only show ONE loading indicator */}
//                   {showLoadingIndicator && (
//                     <motion.div 
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       className="flex justify-start"
//                     >
//                       <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-2xl max-w-[85%] shadow-sm backdrop-blur-md border-l-4 border-indigo-400 border border-gray-200/30 dark:border-gray-700/30">
//                         <div className="flex items-center gap-3">
//                           <div className="p-1.5 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full">
//                             <FaPalette className="text-indigo-500 text-sm" />
//                           </div>
//                           <div className="flex space-x-1.5">
//                             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
//                             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
//                             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
//                           </div>
//                           <span className="text-sm text-gray-500 dark:text-gray-400">Palette is thinking...</span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             <InputArea
//               inputText={inputText}
//               setInputText={setInputText}
//               isLoading={isLoading}
//               connectionError={connectionError}
//               handleSendMessage={handleSendMessage}
//               handleKeyPress={handleKeyPress}
//               messages={messages}
//             />
//           </>
//         )}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ChatbotUI;


import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Palette, 
  History, 
  GripVertical,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useChatbot } from './useChatbot';
import MessageBubble from './MessageBubble';
import ChatHistory from './ChatHistory';
import InputArea from './InputArea';

const ChatbotUI = () => {
  const {
    isOpen,
    setIsOpen,
    messages,
    inputText,
    setInputText,
    isLoading,
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
    handleSendMessage,
    handleKeyPress,
    startNewChat,
    loadChatFromHistory,
    deleteLocalChat,
    displayedTexts,
    isHistoryLoading
    
  } = useChatbot();

  // Resizable sidebar state
  const [width, setWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  const showLoadingIndicator = isLoading && 
    messages.filter(msg => msg.sender === 'bot' && 
      displayedTexts[msg.id] !== msg.text).length === 0;

  // Resize handler - Fixed direction (right to left)
  const startResizing = (e) => {
    if (window.innerWidth < 768) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e) => {
      const newWidth = Math.max(320, Math.min(600, startWidth - (e.clientX - startX)));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Background image styles for different modes
  const backgroundStyles = {
    light: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2306b6d4' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    },
    dark: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%238b5cf6' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    }
  };



  if (!isOpen) {
    return (
      <div className="fixed lg:bottom-24 bottom-32 lg:right-8 right-4 z-50">
        {hasNotification && (
          <div className="absolute -top-1 -right-1 z-10">
            <span className="flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
            </span>
          </div>
        )}
        
        <motion.button
          className="relative p-4 rounded-2xl flex items-center justify-center overflow-hidden group bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hide-scrollbar"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setHasNotification(false);
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          aria-label="Chat with Palette AI"
        >
          <Palette className="text-2xl text-cyan-400" />
        </motion.button>

        
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
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 right-0 z-[1001] h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col border-l border-gray-200/30 dark:border-gray-700/30 hide-scrollbar"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ 
          type: 'spring', 
          damping: 30, 
          stiffness: 300
        }}
        ref={sidebarRef}
        style={{ 
          width: window.innerWidth < 768 ? '100%' : `${width}px`,
          maxWidth: window.innerWidth < 768 ? '100%' : '600px',
          minWidth: window.innerWidth < 768 ? '100%' : '320px'
        }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={backgroundStyles.light}
        />
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none dark:block hidden"
          style={backgroundStyles.dark}
        />

        {/* Resize Handle - Only on desktop */}
        {window.innerWidth >= 768 && (
          <div
            className={`absolute top-0 left-0 h-full w-2 cursor-ew-resize transition-colors z-20 flex items-center justify-center
              ${isResizing 
                ? 'bg-cyan-400' 
                : 'bg-transparent hover:bg-cyan-400/30'
              }`}
            onMouseDown={startResizing}
          >
            <GripVertical size={12} className="text-gray-400 opacity-60" />
          </div>
        )}

        {/* Header */}
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl shadow-lg">
              <Palette className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Palette AI</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {chatTitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
              aria-label="Show chat history"
            >
              <History size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        {showHistory ? (
          // <ChatHistory
          //   chatHistory={chatHistory}
          //   chatId={chatId}
          //   loadChatFromHistory={loadChatFromHistory}
          //   startNewChat={startNewChat}
          //   deleteConfirm={deleteConfirm}
          //   setDeleteConfirm={setDeleteConfirm}
          //   showDeleteSuccess={showDeleteSuccess}
          //   deleteLocalChat={deleteLocalChat}
          // />
          // In your ChatbotUI component, pass the loading state:
          <ChatHistory
          chatHistory={chatHistory}
          chatId={chatId}
          loadChatFromHistory={loadChatFromHistory}
          startNewChat={startNewChat}
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
          showDeleteSuccess={showDeleteSuccess}
          deleteLocalChat={deleteLocalChat}
          isLoading={isHistoryLoading} // Add this prop
          />
        ) : (
          <>
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 hide-scrollbar">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center p-4">
                  <div className="text-center p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-md w-full">
                    <div className="relative mb-6">
                      <Palette className="text-5xl text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text mx-auto mb-2" />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xl mb-3">
                      Welcome to Palette AI
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                      Your creative companion for art techniques, inspiration, and creative guidance.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['Art tip', 'Tell me a joke', 'Interesting fact', 'Inspiration'].map((action, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setInputText(action);
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-all shadow-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-600/80 font-medium backdrop-blur-sm"
                        >
                          {action}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <MessageBubble
                        message={message}
                        displayedText={displayedTexts[message.id]}
                        onRegenerate={(msg) => console.log("Regenerate:", msg)}
                      />
                    </motion.div>
                  ))}
                  
                  {/* Loading Indicator */}
                  {showLoadingIndicator && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 rounded-2xl max-w-[85%] shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full shadow-lg">
                            <Sparkles className="text-white" size={16} />
                          </div>
                          <div className="flex space-x-1.5">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}} />
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}} />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Thinking...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <InputArea
              inputText={inputText}
              setInputText={setInputText}
              isLoading={isLoading}
              connectionError={connectionError}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
              messages={messages}
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotUI;