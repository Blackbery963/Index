import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRedo } from 'react-icons/fa';

const InputArea = ({ 
  inputText, 
  setInputText, 
  isLoading, 
  // connectionError,
  handleSendMessage, 
  handleKeyPress,
  messages 
}) => {
  const quickActions = [
    'Tell me an art joke',
    'Give me an art tip',
    'Share an interesting fact',
    'Inspire me with a quote'
  ];
  const [connectionError, setConnectionError] = useState(false);

  return (
    <>
      {/* Quick action buttons above input */}
      {messages.length > 0 && (
        <div className="px-4 pt-3 pb-1 bg-white/90 dark:bg-gray-900/90 border-t border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickActions.map((action, index) => (
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
  );
};

export default InputArea;