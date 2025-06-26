// import React from 'react';
// import { 
//   FaFacebook, 
//   FaWhatsapp, 
//   FaLinkedin,
//   FaLink,
// } from 'react-icons/fa';
// import { PiShareFatLight } from 'react-icons/pi';
// import {FaXTwitter}from 'react-icons/fa6'
// import { toast } from 'react-toastify';

// const ShareButton = ({ artwork }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
  
//   const shareUrl = `${window.location.origin}/artwork/${artwork.$id}`;
//   const shareText = `Check out this artwork: ${artwork.title}`;
//   const encodedText = encodeURIComponent(shareText);
//   const encodedUrl = encodeURIComponent(shareUrl);

//   const shareOptions = [
//     {
//       name: 'Facebook',
//       icon: <FaFacebook className="text-blue-600" size={20} />,
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
//     },
//     {
//       name: 'Twitter',
//       icon: <FaXTwitter className="text-blue-400" size={20} />,
//       url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
//     },
//     {
//       name: 'WhatsApp',
//       icon: <FaWhatsapp className="text-green-500" size={20} />,
//       url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
//     },
//     {
//       name: 'LinkedIn',
//       icon: <FaLinkedin className="text-blue-700" size={20} />,
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
//     },
//     {
//       name: 'Copy Link',
//       icon: <FaLink className="text-gray-600" size={20} />,
//       action: () => {
//         navigator.clipboard.writeText(shareUrl);
//         toast.success('Link copied to clipboard!');
//       }
//     }
//   ];

//   const handleShare = (option) => {
//     if (option.action) {
//       option.action();
//     } else {
//       window.open(option.url, '_blank', 'width=600,height=400');
//     }
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//         aria-label="Share"
//       >
//         <PiShareFatLight className="text-gray-600 dark:text-gray-300" />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
//           <div className="py-1">
//             {shareOptions.map((option) => (
//               <button
//                 key={option.name}
//                 onClick={() => handleShare(option)}
//                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 <span className="mr-3">{option.icon}</span>
//                 <span>{option.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShareButton;

import React, { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaWhatsapp, 
  FaLinkedin, 
  FaLink 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { PiShareFatLight } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { recordShare, getShareCount } from '../Share/shareService';
import { account } from '../appwriteConfig'; // ✅ Required

const ShareButton = ({ artwork }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  const shareUrl = `${window.location.origin}/artwork/${artwork.$id}`;
  const shareText = `Check out this artwork: ${artwork.title}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-blue-600" size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: 'Twitter',
      icon: <FaXTwitter className="text-black" size={20} />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500" size={20} />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-blue-700" size={20} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: 'Copy Link',
      icon: <FaLink className="text-gray-600" size={20} />,
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    }
  ];

  useEffect(() => {
    const loadShareCount = async () => {
      const count = await getShareCount(artwork.$id);
      setShareCount(count);
    };
    loadShareCount();
  }, [artwork.$id]);

  const handleShare = async (option) => {
    if (option.action) {
      option.action();
    } else {
      window.open(option.url, '_blank', 'width=600,height=400');
    }

    setIsVisible(false);

    try {
      const user = await account.get().catch(() => null);
      const newCount = await recordShare(
        artwork.$id,
        option.name,
        user?.$id || null
      );
      setShareCount(newCount);
    } catch (err) {
      console.error('Error recording share:', err);
    }
  };

  return (
    <div className="relative flex">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className=" rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="Share"
      >
        <PiShareFatLight className="text-gray-600 dark:text-gray-300" />
      </button>

      {isVisible && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl p-2 flex gap-3 z-50">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option)}
              className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
            >
              {option.icon}
              <span>{option.name.split(" ")[0]}</span>
            </button>
          ))}

        </div>
      )}

      {/* Optional: Show share count */}
        <div className="text-center text-[16px] text-gray-500 dark:text-gray-400">
        {shareCount}
      </div>
    </div>
  );
};

export default ShareButton;
