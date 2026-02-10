
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Share2, X, ChevronRight, SmilePlus } from 'lucide-react';
// import { SOCIAL_ICONS } from '../utils/constants';

// const SocialIcons = ({ profileData }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Filter only active links
//   const socialLinks = [
//     {
//       platform: 'facebook',
//       icon: SOCIAL_ICONS.facebook,
//       url: profileData.facebook ? `https://www.facebook.com/${profileData.facebook}` : null,
//       color: "hover:text-blue-600",
//       bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
//     },
//     {
//       platform: 'instagram',
//       icon: SOCIAL_ICONS.instagram,
//       url: profileData.instagram ? `https://www.instagram.com/${profileData.instagram}` : null,
//       color: "hover:text-pink-600",
//       bg: "hover:bg-pink-50 dark:hover:bg-pink-900/20"
//     },
//     {
//       platform: 'twitter',
//       icon: SOCIAL_ICONS.twitter,
//       url: profileData.twitter ? `https://twitter.com/${profileData.twitter}` : null,
//       color: "hover:text-sky-500",
//       bg: "hover:bg-sky-50 dark:hover:bg-sky-900/20"
//     },
//     {
//       platform: 'linkedin',
//       icon: SOCIAL_ICONS.linkedin,
//       url: profileData.linkedin ? `https://www.linkedin.com/${profileData.linkedin}` : null,
//       color: "hover:text-blue-700",
//       bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
//     }
//   ].filter(link => link.url); // Only show existing links

//   if (socialLinks.length === 0) return null;

//   return (
//     <div className="relative z-20">
//       <motion.div 
//         className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700"
//         initial={false}
//         animate={{ width: isOpen ? "auto" : "110px" }} // Compact width vs Auto
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       >
//         {/* Trigger Button */}
//         <button 
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
//         >
//           {isOpen ? <X size={16} /> : <SmilePlus size={16} />}
//           <span>{isOpen ? 'Close' : 'Connect'}</span>
//         </button>

//         {/* Expandable Links Area */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -10 }}
//               className="flex items-center pr-2 pl-1 gap-1 border-l border-zinc-200 dark:border-zinc-700"
//             >
//               {socialLinks.map((social, index) => (
//                 <a
//                   key={social.platform}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`p-2 rounded-full transition-all duration-200 text-zinc-500 dark:text-zinc-400 ${social.color} ${social.bg}`}
//                 >
//                    {/* Assuming SOCIAL_ICONS returns an SVG/Component, if it returns a string, adjust accordingly */}
//                    <span className="w-5 h-5 block">{social.icon}</span>
//                 </a>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default SocialIcons;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmilePlus, X } from 'lucide-react';
import { SOCIAL_ICONS } from '../utils/constants';

const SocialIcons = ({ profileData }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter only active links
  const socialLinks = [
    {
      platform: 'facebook',
      icon: SOCIAL_ICONS.facebook,
      url: profileData.facebook ? `https://www.facebook.com/${profileData.facebook}` : null,
      color: "hover:text-blue-600",
      bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    },
    {
      platform: 'instagram',
      icon: SOCIAL_ICONS.instagram,
      url: profileData.instagram ? `https://www.instagram.com/${profileData.instagram}` : null,
      color: "hover:text-pink-600",
      bg: "hover:bg-pink-50 dark:hover:bg-pink-900/20"
    },
    {
      platform: 'twitter',
      icon: SOCIAL_ICONS.twitter,
      url: profileData.twitter ? `https://twitter.com/${profileData.twitter}` : null,
      color: "hover:text-sky-500",
      bg: "hover:bg-sky-50 dark:hover:bg-sky-900/20"
    },
    {
      platform: 'linkedin',
      icon: SOCIAL_ICONS.linkedin,
      url: profileData.linkedin ? `https://www.linkedin.com/${profileData.linkedin}` : null,
      color: "hover:text-blue-700",
      bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    }
  ].filter(link => link.url); 

  if (socialLinks.length === 0) return null;

  return (
    <div className="relative z-20">
      <motion.div 
        layout
        initial={false}
        animate={{ width: isOpen ? "auto" : "120px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex items-center overflow-hidden h-9 shadow-sm border transition-colors duration-300
          ${isOpen 
            ? 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 pr-1 rounded-full' 
            : 'bg-zinc-100 dark:bg-zinc-800/50 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 rounded-full'
          }
        `}
      >
        {/* Trigger Button */}
        <motion.button 
          layout="position"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 px-3.5 h-full text-xs font-bold tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0"
        >
          {/* Rotating Icon Swap */}
          <div className="relative w-4 h-4">
             <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="close"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        className="absolute inset-0"
                    >
                        <X size={16} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                        className="absolute inset-0"
                    >
                        <SmilePlus size={16} />
                    </motion.div>
                )}
             </AnimatePresence>
          </div>
          <motion.span layout="position">
             {isOpen ? 'Close' : 'Connect'}
          </motion.span>
        </motion.button>

        {/* Expandable Links Area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-1 pl-2 border-l border-zinc-200 dark:border-zinc-700"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1.5 rounded-full transition-colors text-zinc-500 dark:text-zinc-400 ${social.color} ${social.bg}`}
                >
                   <span className="w-4 h-4 flex items-center justify-center">{social.icon}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SocialIcons;