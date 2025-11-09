// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   User, 
//   Laugh, 
//   Lightbulb, 
//   Quote, 
//   CloudSun, 
//   Palette, 
//   AlertTriangle, 
//   Info,
//   Bot,
//   Copy
// } from 'lucide-react';

// const MessageBubble = ({ message, displayedText }) => {
//   const getMessageIcon = (type) => {
//     switch (type) {
//       case 'joke': return <Laugh className="text-yellow-500" size={18} />;
//       case 'fact': return <Lightbulb className="text-blue-500" size={18} />;
//       case 'quote': return <Quote className="text-purple-500" size={18} />;
//       case 'motivation': return <Quote className="text-indigo-500" size={18} />;
//       case 'weather': return <CloudSun className="text-teal-500" size={18} />;
//       case 'art-tip': return <Palette className="text-green-500" size={18} />;
//       case 'artwork': return <Palette className="text-red-400" size={18} />;
//       case 'vocabulary': return <Lightbulb className="text-amber-500" size={18} />;
//       case 'greeting': return <Palette className="text-pink-400" size={18} />;
//       case 'error': return <AlertTriangle className="text-red-500" size={18} />;
//       case 'info': return <Info className="text-blue-400" size={18} />;
//       case 'ai': return <Bot className="text-indigo-400" size={18} />;
//       default: return <Palette className="text-cyan-500" size={18} />;
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//     >
//       <div className={`max-w-[85%] p-4 rounded-2xl backdrop-blur-md border border-white/30 dark:border-gray-600/30 shadow-lg
//         ${message.sender === 'user' 
//           ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-gray-800 dark:text-gray-100' 
//           : 'bg-white/40 dark:bg-gray-800/40 text-gray-800 dark:text-gray-100'
//         }`}>
//         <div className="flex items-start gap-3">
//           {message.sender === 'bot' && (
//             <div className="p-2 bg-white/50 dark:bg-gray-700/50 rounded-full mt-0.5 flex-shrink-0">
//               {getMessageIcon(message.type)}
//             </div>
//           )}
//           {message.sender === 'user' && (
//             <div className="p-2 bg-cyan-500/20 rounded-full mt-0.5 flex-shrink-0">
//               <User className="text-cyan-600 dark:text-cyan-400" size={18} />
//             </div>
//           )}
//           <div className="flex-1 min-w-0">
//             <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
//               {message.sender === 'user' 
//                 ? message.text 
//                 : (displayedText || '')}
              
//               {message.sender === 'bot' && 
//               displayedText && 
//               displayedText.length < message.text.length && (
//                 <span className="inline-block w-2 h-4 bg-current animate-blink ml-1 align-middle">|</span>
//               )}
//             </p>
            
//             {/* Additional data for specific types */}
//             {message.sender === 'bot' && message.rawData && (
//               <div className="mt-2 text-xs opacity-70">
//                 {message.rawData.author && (
//                   <p>— {message.rawData.author}</p>
//                 )}
//                 {message.rawData.title && (
//                   <p className="font-medium">{message.rawData.title}</p>
//                 )}
//               </div>
//             )}
            
//             {/* Message actions for bot messages */}
//             {message.sender === 'bot' && (
//               <div className="flex items-center gap-1 mt-3">
//                 <button
//                   onClick={() => copyToClipboard(message.text)}
//                   className="p-1.5 rounded-full text-gray-400 hover:text-cyan-500 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
//                   aria-label="Copy message"
//                 >
//                   <Copy size={14} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default MessageBubble;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Laugh, 
  Lightbulb, 
  Quote, 
  CloudSun, 
  Palette, 
  AlertTriangle, 
  Info,
  Bot,
  Copy,
  Check
} from 'lucide-react';

const MessageBubble = ({ message, displayedText }) => {
  const [copied, setCopied] = useState(false); // 👈 state for copied feedback

  const getMessageIcon = (type) => {
    switch (type) {
      case 'joke': return <Laugh className="text-yellow-500" size={18} />;
      case 'fact': return <Lightbulb className="text-blue-500" size={18} />;
      case 'quote': return <Quote className="text-purple-500" size={18} />;
      case 'motivation': return <Quote className="text-indigo-500" size={18} />;
      case 'weather': return <CloudSun className="text-teal-500" size={18} />;
      case 'art-tip': return <Palette className="text-green-500" size={18} />;
      case 'artwork': return <Palette className="text-red-400" size={18} />;
      case 'vocabulary': return <Lightbulb className="text-amber-500" size={18} />;
      case 'greeting': return <Palette className="text-pink-400" size={18} />;
      case 'error': return <AlertTriangle className="text-red-500" size={18} />;
      case 'info': return <Info className="text-blue-400" size={18} />;
      case 'ai': return <Bot className="text-indigo-400" size={18} />;
      default: return <Palette className="text-cyan-500" size={18} />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true); // 👈 set state to true
    setTimeout(() => setCopied(false), 1500); // reset after 1.5s
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] p-4 rounded-2xl backdrop-blur-md border border-white/30 dark:border-gray-600/30 shadow-lg
        ${message.sender === 'user' 
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-gray-800 dark:text-gray-100' 
          : 'bg-white/40 dark:bg-gray-800/40 text-gray-800 dark:text-gray-100'
        }`}
      >
        <div className="flex items-start gap-3">
          {message.sender === 'bot' && (
            <div className="p-2 bg-white/50 dark:bg-gray-700/50 rounded-full mt-0.5 flex-shrink-0">
              {getMessageIcon(message.type)}
            </div>
          )}
          {message.sender === 'user' && (
            <div className="p-2 bg-cyan-500/20 rounded-full mt-0.5 flex-shrink-0">
              <User className="text-cyan-600 dark:text-cyan-400" size={18} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.sender === 'user' 
                ? message.text 
                : (displayedText || '')}
              
              {message.sender === 'bot' && 
              displayedText && 
              displayedText.length < message.text.length && (
                <span className="inline-block w-2 h-4 bg-current animate-blink ml-1 align-middle">|</span>
              )}
            </p>

            {/* Additional data for specific types */}
            {message.sender === 'bot' && message.rawData && (
              <div className="mt-2 text-xs opacity-70">
                {message.rawData.author && <p>— {message.rawData.author}</p>}
                {message.rawData.title && <p className="font-medium">{message.rawData.title}</p>}
              </div>
            )}

            {/* Message actions for bot messages */}
            {message.sender === 'bot' && (
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => copyToClipboard(message.text)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-cyan-500 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors backdrop-blur-sm relative"
                  aria-label="Copy message"
                >
                  {copied ? (
                    <Check size={14} className="text-cyan-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
                {copied && (
                  <span className="text-xs text-cyan-500 font-medium transition-all">
                    Copied!
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
