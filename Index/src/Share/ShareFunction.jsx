
// import React, { useState, useEffect } from 'react';
// import { 
//   FaFacebook, 
//   FaWhatsapp, 
//   FaLinkedin, 
//   FaLink 
// } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { PiShareFatLight } from 'react-icons/pi';
// import { toast } from 'react-toastify';
// import { recordShare, getShareCount } from '../Share/shareService';
// import { account } from '../appwriteConfig'; // ✅ Required

// const ShareButton = ({ artwork }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [shareCount, setShareCount] = useState(0);

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
//       icon: <FaXTwitter className="text-black" size={20} />,
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
//     <div className="relative flex">
//       <button
//         onClick={() => setIsVisible(!isVisible)}
//         className=" rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//         aria-label="Share"
//       >
//         <PiShareFatLight className="text-gray-600 dark:text-gray-300" />
//       </button>

//       {isVisible && (
//         <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl p-2 flex gap-3 z-50">
//           {shareOptions.map((option) => (
//             <button
//               key={option.name}
//               onClick={() => handleShare(option)}
//               className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
//             >
//               {option.icon}
//               <span>{option.name.split(" ")[0]}</span>
//             </button>
//           ))}

//         </div>
//       )}

//       {/* Optional: Show share count */}
//         <div className="text-center text-[16px] text-gray-500 dark:text-gray-400">
//         {shareCount}
//       </div>
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

  const shareUrl = `${window.location.origin}/gallery/${artwork.$id}`;
  const shareText = `Check out this artwork: ${artwork.title}`;
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