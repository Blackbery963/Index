// import React, { useState, useEffect } from 'react';
// import { 
//   FaFacebook, 
//   FaWhatsapp, 
//   FaLinkedin, 
//   FaLink,
//   FaRegTimesCircle
// } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { PiShareFatLight } from 'react-icons/pi';
// import { toast } from 'react-toastify';
// import { recordShare, getShareCount } from '../Share/shareService';
// import { account } from '../appwriteConfig';

// const ShareButton = ({ artwork }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [shareCount, setShareCount] = useState(0);

//   const shareUrl = `${window.location.origin}/gallery/${artwork.$id}`;
//   const shareText = `Check out this artwork: ${artwork.title}`;
//   const encodedText = encodeURIComponent(shareText);
//   const encodedUrl = encodeURIComponent(shareUrl);

//   const shareOptions = [
//     {
//       name: 'Facebook',
//       icon: <FaFacebook className="text-blue-600" size={24} />,
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
//       color: 'hover:bg-blue-50'
//     },
//     {
//       name: 'Twitter',
//       icon: <FaXTwitter className="text-black" size={24} />,
//       url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
//       color: 'hover:bg-gray-100'
//     },
//     {
//       name: 'WhatsApp',
//       icon: <FaWhatsapp className="text-green-500" size={24} />,
//       url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
//       color: 'hover:bg-green-50'
//     },
//     {
//       name: 'LinkedIn',
//       icon: <FaLinkedin className="text-blue-700" size={24} />,
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
//       color: 'hover:bg-blue-50'
//     },
//     {
//       name: 'Copy Link',
//       icon: <FaLink className="text-gray-600" size={24} />,
//       action: () => {
//         navigator.clipboard.writeText(shareUrl);
//         toast.success('Link copied to clipboard!');
//       },
//       color: 'hover:bg-gray-50'
//     }
//   ];

//   useEffect(() => {
//     const loadShareCount = async () => {
//       const count = await getShareCount(artwork.$id);
//       setShareCount(count);
//     };
//     loadShareCount();
//   }, [artwork.$id]);

//   const handleShare = async (option) => {
//     if (option.action) {
//       option.action();
//     } else {
//       window.open(option.url, '_blank', 'width=600,height=400');
//     }

//     setIsVisible(false);

//     try {
//       const user = await account.get().catch(() => null);
//       const newCount = await recordShare(
//         artwork.$id,
//         option.name,
//         user?.$id || null
//       );
//       setShareCount(newCount);
//     } catch (err) {
//       console.error('Error recording share:', err);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsVisible(!isVisible)}
//         className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//         aria-label="Share"
//       >
//         <PiShareFatLight className="text-gray-600 dark:text-gray-300" size={18} />
//         {shareCount > 0 && (
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {shareCount}
//           </span>
//         )}
//       </button>

//       {/* Overlay */}
//       {isVisible && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsVisible(false)}
//         />
//       )}

//       {/* Share Popup */}
//       {isVisible && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 p-4 transform transition-all">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 Share this artwork
//               </h3>
//               <button 
//                 onClick={() => setIsVisible(false)}
//                 className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 <FaRegTimesCircle size={20} />
//               </button>
//             </div>
            
//             <div className="grid grid-cols-3 gap-3 mb-4">
//               {shareOptions.map((option) => (
//                 <button
//                   key={option.name}
//                   onClick={() => handleShare(option)}
//                   className={`flex flex-col items-center justify-center p-3 rounded-lg ${option.color} transition`}
//                 >
//                   <div className="mb-2">
//                     {option.icon}
//                   </div>
//                   <span className="text-xs text-gray-700 dark:text-gray-200">
//                     {option.name}
//                   </span>
//                 </button>
//               ))}
//             </div>
            
//             <div className="relative">
//               <input
//                 type="text"
//                 value={shareUrl}
//                 readOnly
//                 className="w-full p-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//               />
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(shareUrl);
//                   toast.success('Link copied to clipboard!');
//                 }}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 <FaLink size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShareButton;









// import React, { useState, useEffect } from 'react';
// import { 
//   FaFacebook, 
//   FaWhatsapp, 
//   FaLinkedin, 
//   FaLink,
//   FaRegTimesCircle,
//   FaPinterest,
//   FaReddit,
//   FaEnvelope
// } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { PiShareFatLight } from 'react-icons/pi';
// import { toast } from 'react-toastify';
// import { recordShare, getShareCount } from '../Share/shareService';
// import { account } from '../appwriteConfig';

// const ShareButton = ({ artwork }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [shareCount, setShareCount] = useState(0);
//   const [isCopied, setIsCopied] = useState(false);

//   // Generate proper share URL and text
//   const shareUrl = `${window.location.origin}/gallery/${artwork.$id}`;
//   const shareTitle = `"${artwork.title}" by ${artwork.artist || 'Unknown Artist'}`;
//   const shareDescription = artwork.description 
//     ? `${artwork.description.substring(0, 100)}...` 
//     : 'Check out this amazing artwork!';
  
//   const encodedUrl = encodeURIComponent(shareUrl);
//   const encodedTitle = encodeURIComponent(shareTitle);
//   const encodedDescription = encodeURIComponent(shareDescription);

//   const shareOptions = [
//     {
//       name: 'Facebook',
//       icon: <FaFacebook className="text-blue-600" size={24} />,
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
//       color: 'hover:bg-blue-50'
//     },
//     {
//       name: 'Twitter',
//       icon: <FaXTwitter className="text-black" size={24} />,
//       url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
//       color: 'hover:bg-gray-100'
//     },
//     {
//       name: 'WhatsApp',
//       icon: <FaWhatsapp className="text-green-500" size={24} />,
//       url: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedUrl}`,
//       color: 'hover:bg-green-50'
//     },
//     {
//       name: 'LinkedIn',
//       icon: <FaLinkedin className="text-blue-700" size={24} />,
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
//       color: 'hover:bg-blue-50'
//     },
//     {
//       name: 'Pinterest',
//       icon: <FaPinterest className="text-red-600" size={24} />,
//       url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${artwork.imageUrl || ''}&description=${encodedTitle}`,
//       color: 'hover:bg-red-50'
//     },
//     {
//       name: 'Reddit',
//       icon: <FaReddit className="text-orange-500" size={24} />,
//       url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
//       color: 'hover:bg-orange-50'
//     },
//     {
//       name: 'Email',
//       icon: <FaEnvelope className="text-gray-600" size={24} />,
//       url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
//       color: 'hover:bg-gray-50'
//     },
//     {
//       name: 'Copy Link',
//       icon: <FaLink className="text-gray-600" size={24} />,
//       action: 'copy',
//       color: 'hover:bg-gray-50'
//     }
//   ];

//   useEffect(() => {
//     const loadShareCount = async () => {
//       try {
//         const count = await getShareCount(artwork.$id);
//         setShareCount(count);
//       } catch (err) {
//         console.error('Error loading share count:', err);
//       }
//     };
//     loadShareCount();
//   }, [artwork.$id]);

//   const handleShare = async (option) => {
//     try {
//       // Handle copy action separately
//       if (option.action === 'copy') {
//         await navigator.clipboard.writeText(shareUrl);
//         setIsCopied(true);
//         toast.success('Link copied to clipboard!');
//         setTimeout(() => setIsCopied(false), 2000);
//       } else {
//         // Open share window for social platforms
//         const width = 600;
//         const height = 400;
//         const left = (window.innerWidth - width) / 2;
//         const top = (window.innerHeight - height) / 2;
        
//         window.open(
//           option.url, 
//           '_blank', 
//           `width=${width},height=${height},top=${top},left=${left}`
//         );
//       }

//       // Record the share
//       try {
//         const user = await account.get().catch(() => null);
//         const newCount = await recordShare(
//           artwork.$id,
//           option.name,
//           user?.$id || null
//         );
//         setShareCount(newCount);
//       } catch (err) {
//         console.error('Error recording share:', err);
//       }
//     } catch (err) {
//       console.error('Error sharing:', err);
//       toast.error('Failed to share. Please try again.');
//     }
//   };

//   // Native sharing if available
//   const handleNativeShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: shareTitle,
//           text: shareDescription,
//           url: shareUrl,
//         });
        
//         // Record the share
//         try {
//           const user = await account.get().catch(() => null);
//           const newCount = await recordShare(
//             artwork.$id,
//             'Native Share',
//             user?.$id || null
//           );
//           setShareCount(newCount);
//         } catch (err) {
//           console.error('Error recording share:', err);
//         }
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           console.error('Error using native share:', err);
//         }
//       }
//     } else {
//       // Fallback to custom share dialog
//       setIsVisible(true);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={handleNativeShare}
//         className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//         aria-label="Share"
//       >
//         <PiShareFatLight className="text-gray-600 dark:text-gray-300" size={18} />
//         {shareCount > 0 && (
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {shareCount}
//           </span>
//         )}
//       </button>

//       {/* Overlay */}
//       {isVisible && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//           onClick={() => setIsVisible(false)}
//         />
//       )}

//       {/* Share Popup */}
//       {isVisible && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-auto p-5 transform transition-all">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 Share this artwork
//               </h3>
//               <button 
//                 onClick={() => setIsVisible(false)}
//                 className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
//                 aria-label="Close share dialog"
//               >
//                 <FaRegTimesCircle size={20} />
//               </button>
//             </div>
            
//             {/* Artwork preview */}
//             <div className="flex items-center mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//               {artwork.imageUrl && (
//                 <img 
//                   src={artwork.imageUrl} 
//                   alt={artwork.title}
//                   className="w-12 h-12 object-cover rounded mr-3"
//                 />
//               )}
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
//                   {artwork.title}
//                 </p>
//                 <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
//                   by {artwork.artist || 'Unknown Artist'}
//                 </p>
//               </div>
//             </div>
            
//             {/* Share options grid */}
//             <div className="grid grid-cols-4 gap-3 mb-4">
//               {shareOptions.map((option) => (
//                 <button
//                   key={option.name}
//                   onClick={() => handleShare(option)}
//                   className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${option.color} hover:scale-105 active:scale-95`}
//                   aria-label={`Share via ${option.name}`}
//                 >
//                   <div className="mb-2">
//                     {option.icon}
//                   </div>
//                   <span className="text-xs text-gray-700 dark:text-gray-200">
//                     {option.name}
//                   </span>
//                 </button>
//               ))}
//             </div>
            
//             {/* Link copy section */}
//             <div className="relative">
//               <input
//                 type="text"
//                 value={shareUrl}
//                 readOnly
//                 className="w-full p-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 truncate"
//                 aria-label="Shareable link"
//               />
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(shareUrl);
//                   setIsCopied(true);
//                   toast.success('Link copied to clipboard!');
//                   setTimeout(() => setIsCopied(false), 2000);
//                 }}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
//                 aria-label="Copy link"
//               >
//                 <FaLink size={16} />
//                 {isCopied && (
//                   <span className="absolute -top-6 -right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
//                     Copied!
//                   </span>
//                 )}
//               </button>
//             </div>
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
  FaLink,
  FaRegTimesCircle
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { PiShareFatLight } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { recordShare, getShareCount } from '../Share/shareService';
import { account } from '../appwriteConfig';

const ShareButton = ({ artwork }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  // Generate share URL that will highlight the specific artwork
  const shareUrl = `${window.location.origin}/gallery?highlight=${artwork.$id}`;
  const shareText = `Check out "${artwork.title}" by ${artwork.artist || 'Unknown Artist'}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-blue-600" size={24} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-50'
    },
    {
      name: 'Twitter',
      icon: <FaXTwitter className="text-black" size={24} />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'hover:bg-gray-100'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500" size={24} />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'hover:bg-green-50'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-blue-700" size={24} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-50'
    },
    {
      name: 'Copy Link',
      icon: <FaLink className="text-gray-600" size={24} />,
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      },
      color: 'hover:bg-gray-50'
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
    <div className="relative">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="Share"
      >
        <PiShareFatLight className="text-gray-600 dark:text-gray-300" size={18} />
        {shareCount > 0 && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {shareCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* Share Popup */}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 p-4 transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Share this artwork
              </h3>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaRegTimesCircle size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg ${option.color} transition`}
                >
                  <div className="mb-2">
                    {option.icon}
                  </div>
                  <span className="text-xs text-gray-700 dark:text-gray-200">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full p-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.success('Link copied to clipboard!');
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaLink size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;