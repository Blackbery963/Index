// // import React, { useState, useEffect } from 'react';
// // import { 
// //   FaFacebook, 
// //   FaWhatsapp, 
// //   FaLinkedin, 
// //   FaLink,
// //   FaRegTimesCircle
// // } from 'react-icons/fa';
// // import { FaXTwitter } from 'react-icons/fa6';
// // import { PiShareFatLight } from 'react-icons/pi';
// // import { RiTelegram2Line } from "react-icons/ri";
// // import { toast } from 'react-toastify';
// // import { recordShare, getShareCount } from '../Share/shareService';
// // import { account } from '../appwriteConfig';

// // const ShareButton = ({ artwork }) => {
// //   const [isVisible, setIsVisible] = useState(false);
// //   const [shareCount, setShareCount] = useState(0);

// //   // Generate share URL that will highlight the specific artwork
// //   const shareUrl = `${window.location.origin}/gallery?highlight=${artwork.$id}`;
// //   const shareText = `Check out "${artwork.title}" by ${artwork.artist || 'Unknown Artist'}`;
// //   const encodedText = encodeURIComponent(shareText);
// //   const encodedUrl = encodeURIComponent(shareUrl);

// //   const shareOptions = [
// //     {
// //       name: 'Facebook',
// //       icon: <FaFacebook className="text-blue-600" size={24} />,
// //       url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
// //       color: 'hover:bg-blue-50'
// //     },
// //     {
// //       name: 'Twitter',
// //       icon: <FaXTwitter className="text-black" size={24} />,
// //       url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
// //       color: 'hover:bg-gray-100'
// //     },
// //     {
// //       name: 'WhatsApp',
// //       icon: <FaWhatsapp className="text-green-500" size={24} />,
// //       url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
// //       color: 'hover:bg-green-50'
// //     },
// //     {
// //       name: 'LinkedIn',
// //       icon: <FaLinkedin className="text-blue-700" size={24} />,
// //       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
// //       color: 'hover:bg-blue-50'
// //     },
// //     {
// //       name: 'Copy Link',
// //       icon: <FaLink className="text-gray-600" size={24} />,
// //       action: () => {
// //         navigator.clipboard.writeText(shareUrl);
// //         toast.success('Link copied to clipboard!');
// //       },
// //       color: 'hover:bg-gray-50'
// //     }
// //   ];

// //   useEffect(() => {
// //     const loadShareCount = async () => {
// //       const count = await getShareCount(artwork.$id);
// //       setShareCount(count);
// //     };
// //     loadShareCount();
// //   }, [artwork.$id]);

// //   const handleShare = async (option) => {
// //     if (option.action) {
// //       option.action();
// //     } else {
// //       window.open(option.url, '_blank', 'width=600,height=400');
// //     }

// //     setIsVisible(false);

// //     try {
// //       const user = await account.get().catch(() => null);
// //       const newCount = await recordShare(
// //         artwork.$id,
// //         option.name,
// //         user?.$id || null
// //       );
// //       setShareCount(newCount);
// //     } catch (err) {
// //       console.error('Error recording share:', err);
// //     }
// //   };

// //   return (
// //     <div className="relative">
// //       <button
// //         onClick={() => setIsVisible(!isVisible)}
// //         className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
// //         aria-label="Share"
// //       >
// //         {/* <PiShareFatLight className="text-gray-600 dark:text-gray-300" size={18} /> */}
// //         <RiTelegram2Line className="text-gray-600 dark:text-gray-300" size={18} />
// //         {shareCount > 0 && (
// //           <span className="text-xs text-gray-500 dark:text-gray-400">
// //             {shareCount}
// //           </span>
// //         )}
// //       </button>

// //       {/* Overlay */}
// //       {isVisible && (
// //         <div 
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40"
// //           onClick={() => setIsVisible(false)}
// //         />
// //       )}

// //       {/* Share Popup */}
// //       {isVisible && (
// //         <div className="fixed inset-0 flex items-center justify-center z-50">
// //           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 p-4 transform transition-all">
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
// //                 Share this artwork
// //               </h3>
// //               <button 
// //                 onClick={() => setIsVisible(false)}
// //                 className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// //               >
// //                 <FaRegTimesCircle size={20} />
// //               </button>
// //             </div>
            
// //             <div className="grid grid-cols-3 gap-3 mb-4">
// //               {shareOptions.map((option) => (
// //                 <button
// //                   key={option.name}
// //                   onClick={() => handleShare(option)}
// //                   className={`flex flex-col items-center justify-center p-3 rounded-lg ${option.color} transition`}
// //                 >
// //                   <div className="mb-2">
// //                     {option.icon}
// //                   </div>
// //                   <span className="text-xs text-gray-700 dark:text-gray-200">
// //                     {option.name}
// //                   </span>
// //                 </button>
// //               ))}
// //             </div>
            
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 value={shareUrl}
// //                 readOnly
// //                 className="w-full p-2 pr-10 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
// //               />
// //               <button
// //                 onClick={() => {
// //                   navigator.clipboard.writeText(shareUrl);
// //                   toast.success('Link copied to clipboard!');
// //                 }}
// //                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// //               >
// //                 <FaLink size={16} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ShareButton;


// ShareBottomSheet.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaLink,
  FaRegTimesCircle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiTelegram2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { recordShare, getShareCount } from "../Share/shareService";
import { account } from "../appwriteConfig";

/**
 * ShareBottomSheet
 * Props:
 *  - artwork: object (expects artwork.$id, artwork.title, artwork.artist)
 *  - triggerClassName?: string (optional className for the trigger button)
 */
const ShareBottomSheet = ({ artwork, triggerClassName = "" }) => {
  const [open, setOpen] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/gallery?highlight=${artwork.$id}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(
    `Check out "${artwork.title}" by ${artwork.artist || "Unknown Artist"}`
  );

  const shareOptions = [
    {
      name: "Facebook",
      icon: <FaFacebook size={26} className="text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      icon: <FaXTwitter size={26} className="text-black" />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={26} className="text-green-500" />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={26} className="text-blue-700" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: <RiTelegram2Line size={26} className="text-sky-500" />,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "Copy Link",
      icon: <FaLink size={24} className="text-gray-700" />,
      action: () => handleCopy(),
    },
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const c = await getShareCount(artwork.$id);
        if (mounted) setShareCount(c || 0);
      } catch (err) {
        console.error("getShareCount error", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [artwork.$id]);

  // prevent background scroll when open
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      // reset copied badge after a bit
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Unable to copy link");
    }
  };

  const handleShareOption = async (option) => {
    // trigger action or open url
    try {
      if (option.action) {
        option.action();
      } else if (option.url) {
        window.open(option.url, "_blank", "noopener,noreferrer,width=700,height=500");
      }
    } catch (err) {
      console.error("share open error", err);
    }

    // close sheet
    setOpen(false);

    // record share
    try {
      const user = await account.get().catch(() => null);
      const newCount = await recordShare(artwork.$id, option.name, user?.$id || null);
      if (typeof newCount === "number") setShareCount(newCount);
    } catch (err) {
      console.error("recordShare error", err);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition ${triggerClassName}`}
        aria-label="Share"
      >
        <RiTelegram2Line className="text-gray-700 dark:text-gray-300" size={18} />
        {shareCount > 0 && <span className="text-xs text-gray-500 dark:text-gray-400">{shareCount}</span>}
      </button>

      {/* Bottom sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.section
              className="fixed left-0 right-0 bottom-0 z-[80] p-4 sm:mx-auto sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:bottom-10 sm:max-w-md"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 500 }}
                dragElastic={0.18}
                onDragEnd={(event, info) => {
                  // if user swiped down enough, close
                  if (info.offset.y > 120 || info.velocity.y > 500) {
                    setOpen(false);
                  }
                }}
                className="w-full rounded-t-2xl overflow-hidden relative"
              >
                {/* Glass container */}
                <div
                  className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/20 dark:ring-white/10 border border-white/10 dark:border-gray-700/20"
                  style={{ backdropFilter: "saturate(140%) blur(10px)" }}
                >
                  {/* Glow accent */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-40 blur-xl pointer-events-none" />

                  {/* handle */}
                  <div className="w-full flex items-center justify-center p-3">
                    <div className="w-10 h-1.5 rounded-full bg-white/60 dark:bg-gray-700/60" />
                  </div>

                  {/* header */}
                  <div className="px-5 pb-2">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this artwork</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Share to friends or copy link
                        </p>
                      </div>

                      <button
                        onClick={() => setOpen(false)}
                        className="p-1 rounded-lg hover:bg-white/30 dark:hover:bg-gray-800/30 transition"
                        aria-label="Close share"
                      >
                        <FaRegTimesCircle size={20} className="text-gray-700 dark:text-gray-200" />
                      </button>
                    </div>

                    {/* grid of actions */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {shareOptions.map((opt) => (
                        <button
                          key={opt.name}
                          onClick={() => handleShareOption(opt)}
                          className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition"
                          aria-label={opt.name}
                        >
                          <div className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/10 dark:border-gray-700/20">
                            {opt.icon}
                          </div>
                          <span className="text-xs text-gray-700 dark:text-gray-200">{opt.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* copy link */}
                    <div className="relative">
                      <input
                        readOnly
                        value={shareUrl}
                        className="w-full p-3 pr-12 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        aria-label="Share link"
                      />
                      <button
                        onClick={() => {
                          handleCopy();
                          // record as 'Copy Link' share too
                          (async () => {
                            try {
                              const user = await account.get().catch(() => null);
                              const newCount = await recordShare(artwork.$id, "Copy Link", user?.$id || null);
                              if (typeof newCount === "number") setShareCount(newCount);
                            } catch (err) {
                              console.error(err);
                            }
                          })();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/30 dark:hover:bg-gray-700/30 transition"
                        aria-label="Copy link"
                      >
                        <FaLink size={16} className="text-gray-700 dark:text-gray-200" />
                      </button>
                    </div>

                    {/* small footer */}
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                      Shares: <span className="font-semibold text-gray-700 dark:text-gray-200">{shareCount}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShareBottomSheet;


// // ShareBottomSheet.jsx
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaFacebook,
//   FaWhatsapp,
//   FaLinkedin,
//   FaLink,
//   FaRegTimesCircle,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { RiTelegram2Line } from "react-icons/ri";
// import { toast } from "react-toastify";

// const ShareBottomSheet = ({ artwork, isOpen, onClose, triggerClassName = "" }) => {
//   const [shareCount, setShareCount] = useState(0);
//   const [copied, setCopied] = useState(false);

//   const shareUrl = `${window.location.origin}/gallery?highlight=${artwork.$id}`;
//   const encodedUrl = encodeURIComponent(shareUrl);
//   const encodedText = encodeURIComponent(
//     `Check out "${artwork.title}" by ${artwork.artist || "Unknown Artist"}`
//   );

//   const shareOptions = [
//     {
//       name: "Facebook",
//       icon: <FaFacebook size={26} className="text-blue-600" />,
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
//     },
//     {
//       name: "X",
//       icon: <FaXTwitter size={26} className="text-black" />,
//       url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
//     },
//     {
//       name: "WhatsApp",
//       icon: <FaWhatsapp size={26} className="text-green-500" />,
//       url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
//     },
//     {
//       name: "LinkedIn",
//       icon: <FaLinkedin size={26} className="text-blue-700" />,
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
//     },
//     {
//       name: "Telegram",
//       icon: <RiTelegram2Line size={26} className="text-sky-500" />,
//       url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
//     },
//     {
//       name: "Copy Link",
//       icon: <FaLink size={24} className="text-gray-700" />,
//       action: () => handleCopy(),
//     },
//   ];

//   // Prevent background scroll when open
//   useEffect(() => {
//     if (typeof window === "undefined") return;
    
//     if (isOpen) {
//       document.documentElement.style.overflow = "hidden";
//       document.body.style.overflow = "hidden";
//     } else {
//       document.documentElement.style.overflow = "";
//       document.body.style.overflow = "";
//     }
    
//     return () => {
//       document.documentElement.style.overflow = "";
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       toast.success("Link copied to clipboard!");
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       toast.error("Unable to copy link");
//     }
//   };

//   const handleShareOption = async (option) => {
//     try {
//       if (option.action) {
//         option.action();
//       } else if (option.url) {
//         window.open(option.url, "_blank", "noopener,noreferrer,width=700,height=500");
//       }
//     } catch (err) {
//       console.error("share open error", err);
//     }
    
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Bottom Sheet */}
//           <motion.div
//             className="fixed left-0 right-0 bottom-0 z-[101] p-4 max-w-md mx-auto"
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
//               {/* Handle */}
//               <div className="flex justify-center p-3">
//                 <div className="w-12 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
//               </div>

//               {/* Header */}
//               <div className="px-6 pb-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Share this artwork
//                     </h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Share with friends or copy link
//                     </p>
//                   </div>

//                   <button
//                     onClick={onClose}
//                     className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                   >
//                     <FaRegTimesCircle size={20} className="text-gray-600 dark:text-gray-400" />
//                   </button>
//                 </div>

//                 {/* Share Options Grid */}
//                 <div className="grid grid-cols-3 gap-4 mb-6">
//                   {shareOptions.map((option) => (
//                     <button
//                       key={option.name}
//                       onClick={() => handleShareOption(option)}
//                       className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//                     >
//                       <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
//                         {option.icon}
//                       </div>
//                       <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
//                         {option.name}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 {/* Copy Link Section */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Share link
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       readOnly
//                       value={shareUrl}
//                       className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
//                     />
//                     <button
//                       onClick={handleCopy}
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                     >
//                       Copy
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ShareBottomSheet;