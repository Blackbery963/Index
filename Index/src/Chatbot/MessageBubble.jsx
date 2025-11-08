// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaUser, FaLaugh, FaLightbulb, FaQuoteLeft, FaCloudSun, 
//   FaPalette, FaExclamationTriangle, FaRegCopy, 
//   FaRegThumbsUp, FaRegThumbsDown, FaInfoCircle, FaRobot 
// } from 'react-icons/fa';

// const MessageBubble = ({ message, displayedText }) => {
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
//       case 'info': return <FaInfoCircle className="text-blue-400 text-lg" />;
//       case 'ai': return <FaRobot className="text-indigo-400 text-lg" />;
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
//       case 'info': return 'border-l-blue-300';
//       case 'ai': return 'border-l-indigo-300';
//       default: return 'border-l-pink-400';
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Copied to clipboard');
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//     >
//       <div className={`max-w-[85%] p-4 rounded-lg shadow-sm border-l-4 ${
//         message.sender === 'user' 
//           ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
//           : `bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 backdrop-blur-md ${getMessageBorderColor(message.type)} border border-gray-200/30 dark:border-gray-700/30`
//       }`}>
//         <div className="flex items-start gap-3">
//           {message.sender === 'bot' && (
//             <span className="mt-0.5 flex-shrink-0">
//               {getMessageIcon(message.type)}
//             </span>
//           )}
//           {message.sender === 'user' && (
//             <div className="p-1.5 bg-white/20 rounded-full mt-0.5 flex-shrink-0">
//               <FaUser className="text-white text-sm" />
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
//                   className="p-1.5 rounded-full text-gray-400 hover:text-indigo-500 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
//                   aria-label="Copy message"
//                 >
//                   <FaRegCopy size={12} />
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


import React from 'react';
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
  Copy
} from 'lucide-react';

const MessageBubble = ({ message, displayedText }) => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] p-4 rounded-2xl backdrop-blur-md border border-white/30 dark:border-gray-600/30 shadow-lg
        ${message.sender === 'user' 
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-gray-800 dark:text-gray-100' 
          : 'bg-white/40 dark:bg-gray-800/40 text-gray-800 dark:text-gray-100'
        }`}>
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
                {message.rawData.author && (
                  <p>— {message.rawData.author}</p>
                )}
                {message.rawData.title && (
                  <p className="font-medium">{message.rawData.title}</p>
                )}
              </div>
            )}
            
            {/* Message actions for bot messages */}
            {message.sender === 'bot' && (
              <div className="flex items-center gap-1 mt-3">
                <button
                  onClick={() => copyToClipboard(message.text)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-cyan-500 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
                  aria-label="Copy message"
                >
                  <Copy size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;