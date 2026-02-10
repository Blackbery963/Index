// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast, ToastContainer } from "react-toastify";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
// // import { FiAward, FiX } from "react-icons/fi";
// // import { MdOutlineSell } from "react-icons/md";
// // import { FaArrowLeft, FaArrowRight, FaRegEye } from "react-icons/fa";
// // import { YourCollectionsService } from "./YourCollectionsService";
// // import { ArtworkCard } from "./ArtworkCard";
// // import { ImagePlaceholder } from "./MediaComponents";
// // import ArtworkViewTracker from "../../../Views/viewsTracker";
// // import "react-toastify/dist/ReactToastify.css";

// // const TABS = [
// //   { key: "Arts&Crafts", label: "Arts & Crafts", icon: IoImageOutline },
// //   { key: "Videos", label: "Videos", icon: IoVideocamOutline },
// //   { key: "Awards", label: "Awards", icon: FiAward },
// //   { key: "Sell", label: "Sell", icon: MdOutlineSell }
// // ];

// // function YourCollections({ userId }) {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState("Arts&Crafts");
// //   const [uploads, setUploads] = useState([]);
// //   const [filteredUploads, setFilteredUploads] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [currentUserId, setCurrentUserId] = useState(null);
// //   const [lightbox, setLightbox] = useState({ open: false, index: 0 });
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };

// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   // Load current user only once on component mount
// //   useEffect(() => {
// //     const fetchCurrentUser = async () => {
// //       const user = await YourCollectionsService.fetchCurrentUser();
// //       setCurrentUserId(user?.$id);
// //     };
// //     fetchCurrentUser();
// //   }, []);

// //   // Load uploads when tab changes or userId changes
// //   useEffect(() => {
// //     loadUploads();
// //   }, [activeTab, userId]);

// //   const loadUploads = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const data = await YourCollectionsService.fetchUserUploads(userId, activeTab);
// //       setUploads(data);
// //       setFilteredUploads(data);
// //     } catch (err) {
// //       setError(err.message);
// //       toast.error("Failed to load collections");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const openLightbox = (index) => setLightbox({ open: true, index });
// //   const closeLightbox = () => setLightbox({ open: false, index: 0 });

// //   const navigateImages = (direction) => {
// //     setLightbox(prev => ({
// //       ...prev,
// //       index:
// //         direction === "next"
// //           ? (prev.index + 1) % filteredUploads.length
// //           : (prev.index - 1 + filteredUploads.length) % filteredUploads.length
// //     }));
// //   };

// //   const handleMarkAsSold = async (productId) => {
// //     try {
// //       await YourCollectionsService.markAsSold(productId);
// //       setUploads(prev =>
// //         prev.map(u =>
// //           u.$id === productId ? { ...u, status: "sold", price: 0 } : u
// //         )
// //       );
// //       // Update filtered uploads as well
// //       setFilteredUploads(prev =>
// //         prev.map(u =>
// //           u.$id === productId ? { ...u, status: "sold", price: 0 } : u
// //         )
// //       );
// //       toast.success("Artwork marked as sold!");
// //     } catch (error) {
// //       toast.error("Failed to mark as sold");
// //     }
// //   };

// //   const TabButton = ({ tab }) => {
// //     const Icon = tab.icon;
// //     const isActive = activeTab === tab.key;

// //     return (
// //       <motion.button
// //         onClick={() => setActiveTab(tab.key)}
// //         className={`relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 group
// //           ${isActive 
// //             ? "text-violet-600 dark:text-violet-400" 
// //             : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
// //           }`}
// //         whileHover={{ scale: 1.02 }}
// //         whileTap={{ scale: 0.98 }}
// //         disabled={loading}
// //       >
// //         {/* Icon */}
// //         <motion.div
// //           className={`transition-colors duration-300 ${
// //             isActive ? "text-violet-600 dark:text-violet-400" : "text-current"
// //           }`}
// //         >
// //           <Icon className={`text-lg ${isActive ? 'scale-110' : ''}`} />
// //         </motion.div>

// //         {/* Label - Hidden on mobile */}
// //         {!isMobile && (
// //           <motion.span
// //             className="font-medium whitespace-nowrap"
// //             initial={{ opacity: 1 }}
// //             animate={{ opacity: 1 }}
// //           >
// //             {tab.label}
// //           </motion.span>
// //         )}

// //         {/* Mobile Tooltip */}
// //         {isMobile && (
// //           <div className="absolute bottom-full mb-2 hidden group-hover:flex items-center justify-center">
// //             <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
// //               {tab.label}
// //             </div>
// //           </div>
// //         )}

// //         {/* Animated Underline */}
// //         {isActive && (
// //           <motion.div
// //             className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400"
// //             layoutId="activeTabUnderline"
// //             initial={false}
// //             transition={{
// //               type: "spring",
// //               stiffness: 500,
// //               damping: 35,
// //               duration: 0.3
// //             }}
// //           />
// //         )}

// //         {/* Hover Effect */}
// //         {!isActive && (
// //           <motion.div
// //             className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-gray-300 dark:bg-gray-600"
// //             initial={{ width: 0 }}
// //             whileHover={{ 
// //               width: "100%", 
// //               left: 0, 
// //               right: 0,
// //               transition: { duration: 0.2 }
// //             }}
// //           />
// //         )}

// //         {/* Loading indicator for active tab */}
// //         {isActive && loading && (
// //           <motion.div
// //             className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full"
// //             animate={{ scale: [1, 1.5, 1] }}
// //             transition={{ duration: 1, repeat: Infinity }}
// //           />
// //         )}
// //       </motion.button>
// //     );
// //   };

// //   const ContentArea = () => {
// //     if (loading) {
// //       return (
// //         <motion.div
// //           className="flex justify-center items-center py"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //         >
// //           <div className="flex flex-col items-center gap-4">
// //             <motion.div
// //               className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full"
// //               animate={{ rotate: 360 }}
// //               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// //             />
// //             <p className="text-gray-600 dark:text-gray-400 text-sm">
// //               Loading {activeTab.toLowerCase()}...
// //             </p>
// //           </div>
// //         </motion.div>
// //       );
// //     }

// //     if (error) {
// //       return (
// //         <motion.div
// //           className="text-center py-12"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //         >
// //           <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
// //             <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
// //             <motion.button
// //               onClick={loadUploads}
// //               className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               Try Again
// //             </motion.button>
// //           </div>
// //         </motion.div>
// //       );
// //     }

// //     if (filteredUploads.length === 0) {
// //       return (
// //         <motion.div
// //           className="text-center py-16"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //         >
// //           <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
// //             <ImagePlaceholder activeTab={activeTab} className="h-24 mx-auto mb-4" />
// //             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
// //               No {activeTab.toLowerCase()} found
// //             </h3>
// //             <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
// //               {activeTab === "Sell"
// //                 ? "Add prices to your artworks to see them here"
// //                 : `You haven't uploaded any ${activeTab.toLowerCase()} yet`}
// //             </p>
// //             {currentUserId === userId && (
// //               <motion.button
// //                 onClick={() => navigate("/Account/Upload")}
// //                 className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 Upload Now
// //               </motion.button>
// //             )}
// //           </div>
// //         </motion.div>
// //       );
// //     }

// //     return (
// //       <>
// //         {/* Enhanced Stats */}
// //         <motion.div 
// //           className="mb-8 flex justify-center"
// //           initial={{ opacity: 0, y: -10 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.1 }}
// //         >
// //           <div className="flex gap-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
// //             <span className="flex items-center gap-1">
// //               <span className="font-semibold">{filteredUploads.length}</span> items
// //             </span>
// //             <span className="flex items-center gap-1">
// //               <FaRegEye className="text-violet-500" />
// //               <span className="font-semibold">
// //                 {filteredUploads.reduce((s, u) => s + (u.viewCount || 0), 0)}
// //               </span> views
// //             </span>
// //             <span className="flex items-center gap-1">
// //               <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
// //               <span className="font-semibold">
// //                 {filteredUploads.reduce((s, u) => s + (u.likeCount || 0), 0)}
// //               </span> likes
// //             </span>
// //           </div>
// //         </motion.div>

// //         {/* Artwork Grid */}
// //         <motion.div
// //           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
// //           layout
// //         >
// //           <AnimatePresence mode="popLayout">
// //             {filteredUploads.map((upload, index) => (
// //               <ArtworkCard
// //                 key={upload.$id}
// //                 upload={upload}
// //                 activeTab={activeTab}
// //                 onImageClick={() => openLightbox(index)}
// //                 onMarkAsSold={handleMarkAsSold}
// //                 onEdit={(id) => navigate(`/Account/Edit/${id}`)}
// //                 currentUserId={currentUserId}
// //               />
// //             ))}
// //           </AnimatePresence>
// //         </motion.div>
// //       </>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
// //       <ToastContainer 
// //         position="top-right" 
// //         autoClose={5000}
// //         theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
// //       />

// //       {/* Fixed Tabs Header - Always visible */}
// //       <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6">
// //           <div className="flex items-center justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
// //             <nav className="flex items-center space-x-1 py-2">
// //               {TABS.map((tab) => (
// //                 <TabButton key={tab.key} tab={tab} />
// //               ))}
// //             </nav>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Content Area - Changes based on loading state */}
// //       <div className="max-w-full mx-auto px-0 sm:px-0 py-8">
// //         <ContentArea />
// //       </div>

// //       {/* Lightbox */}
// //       <AnimatePresence>
// //         {lightbox.open && filteredUploads[lightbox.index] && (
// //           <motion.div
// //             className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div
// //               className="relative max-w-6xl w-full max-h-[90vh]"
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               transition={{ type: "spring", damping: 25 }}
// //             >
// //               {/* Media */}
// //               <img
// //                 src={YourCollectionsService.getImageUrl(
// //                   filteredUploads[lightbox.index].fileId
// //                 )}
// //                 alt={filteredUploads[lightbox.index].title}
// //                 className="w-full h-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
// //               />

// //               {/* Navigation Controls */}
// //               <button
// //                 onClick={closeLightbox}
// //                 className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
// //               >
// //                 <FiX size={20} />
// //               </button>
              
// //               <button
// //                 onClick={() => navigateImages("prev")}
// //                 className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
// //               >
// //                 <FaArrowLeft size={18} />
// //               </button>
              
// //               <button
// //                 onClick={() => navigateImages("next")}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
// //               >
// //                 <FaArrowRight size={18} />
// //               </button>

// //               {/* Info Panel */}
// //               <motion.div 
// //                 className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-lg rounded-xl p-4 text-white border border-white/10"
// //                 initial={{ y: 20, opacity: 0 }}
// //                 animate={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.2 }}
// //               >
// //                 <h3 className="text-lg font-semibold mb-2 truncate">
// //                   {filteredUploads[lightbox.index].title}
// //                 </h3>
// //                 <div className="flex items-center justify-between text-sm">
// //                   <span className="text-white/80">
// //                     {lightbox.index + 1} of {filteredUploads.length}
// //                   </span>
// //                   <div className="flex items-center gap-2 text-white/80">
// //                     <FaRegEye />
// //                     <ArtworkViewTracker
// //                       artworkId={filteredUploads[lightbox.index].$id}
// //                       onViewUpdated={(count) => {
// //                         setUploads(prev =>
// //                           prev.map(u =>
// //                             u.$id === filteredUploads[lightbox.index].$id
// //                               ? { ...u, viewCount: count }
// //                               : u
// //                           )
// //                         );
// //                         setFilteredUploads(prev =>
// //                           prev.map(u =>
// //                             u.$id === filteredUploads[lightbox.index].$id
// //                               ? { ...u, viewCount: count }
// //                               : u
// //                           )
// //                         );
// //                       }}
// //                     />
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// // export default YourCollections;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoImageOutline, IoVideocamOutline, IoClose } from 'react-icons/io5';
// import { FiAward } from "react-icons/fi";
// import { MdOutlineSell } from "react-icons/md";
// import { FaArrowLeft, FaArrowRight, FaRegEye, FaRegComment, FaHeart } from "react-icons/fa";
// import { YourCollectionsService } from "./YourCollectionsService";
// import { ArtworkCard } from "./ArtworkCard";
// import ArtworkViewTracker from "../../../Views/viewsTracker";
// import LikeButton from "../../../EngagementService/likeButton";
// import ShareButton from "../../../Share/ShareFunction";
// import DownloadService from "../../../Downloads/downloadService";
// import "react-toastify/dist/ReactToastify.css";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const TABS = [
//   { key: "Arts&Crafts", label: "Arts & Crafts", icon: IoImageOutline },
//   { key: "Videos", label: "Videos", icon: IoVideocamOutline },
//   { key: "Awards", label: "Awards", icon: FiAward },
//   { key: "Sell", label: "Sell", icon: MdOutlineSell }
// ];

// function YourCollections({ userId }) {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("Arts&Crafts");
//   const [uploads, setUploads] = useState([]);
//   const [filteredUploads, setFilteredUploads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
 
//   // Lightbox State
//   const [lightbox, setLightbox] = useState({ open: false, itemIndex: 0, mediaIndex: 0 });
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const user = await YourCollectionsService.fetchCurrentUser();
//       setCurrentUserId(user?.$id);
//     };
//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     loadUploads();
//   }, [activeTab, userId]);

//   const loadUploads = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await YourCollectionsService.fetchUserUploads(userId, activeTab);
//       setUploads(data);
//       setFilteredUploads(data);
//     } catch (err) {
//       setError(err.message);
//       toast.error("Failed to load collections");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open lightbox at specific item AND specific media index
//   const openLightbox = (itemIndex, specificMediaIndex = 0) => {
//     setLightbox({ open: true, itemIndex, mediaIndex: specificMediaIndex });
//   };
 
//   const closeLightbox = () => setLightbox({ open: false, itemIndex: 0, mediaIndex: 0 });

//   // Helper to get media array for a specific item
//   const getMediaForItem = (index) => {
//     const item = filteredUploads[index];
//     if (!item) return [];
    
//     if (activeTab === "Videos") {
//       return [item.fileId]; // Single video
//     }
//     // For image-based tabs
//     return item.images && item.images.length > 0 ? item.images : [item.fileId];
//   };

//   // SMART NAVIGATION LOGIC (works across items and multi-media)
//   const handleNavigation = (direction) => {
//     const currentItemMedia = getMediaForItem(lightbox.itemIndex);
   
//     if (direction === "next") {
//       if (lightbox.mediaIndex < currentItemMedia.length - 1) {
//         setLightbox(prev => ({ ...prev, mediaIndex: prev.mediaIndex + 1 }));
//       } else {
//         const nextItemIndex = (lightbox.itemIndex + 1) % filteredUploads.length;
//         setLightbox({ open: true, itemIndex: nextItemIndex, mediaIndex: 0 });
//       }
//     } else {
//       if (lightbox.mediaIndex > 0) {
//         setLightbox(prev => ({ ...prev, mediaIndex: prev.mediaIndex - 1 }));
//       } else {
//         const prevItemIndex = (lightbox.itemIndex - 1 + filteredUploads.length) % filteredUploads.length;
//         const prevItemMedia = getMediaForItem(prevItemIndex);
//         setLightbox({ open: true, itemIndex: prevItemIndex, mediaIndex: prevItemMedia.length - 1 });
//       }
//     }
//   };

//   const handleMarkAsSold = async (productId) => {
//     try {
//       await YourCollectionsService.markAsSold(productId);
//       const updateData = (list) => list.map(u =>
//         u.$id === productId ? { ...u, status: "sold", price: 0, forSale: false } : u
//       );
//       setUploads(prev => updateData(prev));
//       setFilteredUploads(prev => updateData(prev));
//       toast.success("Artwork marked as sold!");
//     } catch (error) {
//       toast.error("Failed to mark as sold");
//     }
//   };

//   const TabButton = ({ tab }) => {
//     const Icon = tab.icon;
//     const isActive = activeTab === tab.key;
//     return (
//       <motion.button
//         onClick={() => setActiveTab(tab.key)}
//         className={`relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 group rounded-sm
//           ${isActive ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"}`}
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         disabled={loading}
//       >
//         <Icon className={`text-lg ${isActive ? 'scale-110' : ''}`} />
//         {!isMobile && <span>{tab.label}</span>}
//         {isActive && (
//           <motion.div
//             className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400"
//             layoutId="activeTabUnderline"
//           />
//         )}
//       </motion.button>
//     );
//   };

//   const ContentArea = () => {
//     if (loading) return (
//       <div className="flex justify-center py-20">
//         <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//     if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
//     if (filteredUploads.length === 0) return (
//       <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-sm max-w-md mx-auto">
//         <p className="text-gray-600 dark:text-gray-400">No content found.</p>
//         {currentUserId === userId && (
//           <button onClick={() => navigate("/Account/Upload")} className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-sm">
//             Upload Now
//           </button>
//         )}
//       </div>
//     );
//     return (
//       <div className="w-full px- sm:px-4">
//         <motion.div
//           className="columns-2 md:columns-3 lg:columns-4 gap-[1px] space-y-[1px] mx-auto h-full w-full"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           {filteredUploads.map((upload, index) => (
//             <ArtworkCard
//               key={upload.$id}
//               upload={upload}
//               onImageClick={(clickedMediaIndex) => openLightbox(index, clickedMediaIndex)}
//             />
//           ))}
//         </motion.div>
//       </div>
//     );
//   };

//   // Current lightbox data
//   const currentItem = filteredUploads[lightbox.itemIndex];
//   const currentItemMedia = getMediaForItem(lightbox.itemIndex);
//   const activeMediaId = currentItemMedia[lightbox.mediaIndex];
//   const isVideo = activeTab === "Videos" || (currentItem && currentItem.type === "video"); // fallback if you add type field

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
//       <ToastContainer position="top-right" theme="dark" />
//       {/* Header */}
//       <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 flex justify-center">
//           <nav className="flex items-center space-x-1 py-2">
//             {TABS.map((tab) => <TabButton key={tab.key} tab={tab} />)}
//           </nav>
//         </div>
//       </div>
//       <div className="w-full max-w-[1920px] mx-auto py-2 sm:py-8">
//         <ContentArea />
//       </div>

//       {/* RICH LIGHTBOX WITH IMAGE + VIDEO SUPPORT */}
//       <AnimatePresence>
//         {lightbox.open && currentItem && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 sm:bg-black/90 p-0 sm:p-4 "
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={(e) => e.target === e.currentTarget && closeLightbox()}
//           >
//             <motion.div
//               className="bg-white dark:bg-zinc-900 w-full h-full sm:h-[90vh] sm:max-w-[90vw] md:max-w-6xl rounded-none sm:rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row relative border border-gray-200/50 dark:border-zinc-800/50"
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button onClick={closeLightbox} className="absolute top-4 right-4 z-50 md:hidden bg-black/60 text-white p-2 rounded-full backdrop-blur-sm">
//                 <IoClose size={24} />
//               </button>

//               {/* LEFT SIDE: MEDIA VIEWER */}
//               <div className="w-full h-[60%] md:h-full md:w-2/3 bg-black flex flex-col items-center justify-center relative group">
//                 <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
//                   {/* PREV BUTTON */}
//                   <button
//                     onClick={() => handleNavigation("prev")}
//                     className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 text-white rounded-full hover:bg-white/20 transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-20"
//                   >
//                     <ChevronLeft />
//                   </button>

//                   {/* MEDIA RENDERER */}
//                   {isVideo ? (
//                     <video
//                       key={activeMediaId}
//                       src={YourCollectionsService.getImageUrl(activeMediaId)} // assuming same URL function works for videos
//                       controls
//                       autoPlay
//                       muted={false}
//                       loop={false}
//                       className="w-full h-full object-contain"
//                     />
//                   ) : (
//                     <img
//                       key={activeMediaId}
//                       src={YourCollectionsService.getImageUrl(activeMediaId)}
//                       alt={currentItem.title}
//                       className="w-full h-full object-contain"
//                     />
//                   )}

//                   {/* NEXT BUTTON */}
//                   <button
//                     onClick={() => handleNavigation("next")}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 text-white rounded-full hover:bg-white/20 transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-20"
//                   >
//                     <ChevronRight />
//                   </button>
//                 </div>

//                 {/* THUMBNAILS (Only for multi-image items) */}
//                 {!isVideo && currentItemMedia.length > 1 && (
//                   <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-30">
//                     <div className="bg-black/50 backdrop-blur-md p-2 rounded-sm flex gap-2 overflow-x-auto max-w-full">
//                       {currentItemMedia.map((imgId, idx) => (
//                         <button
//                           key={imgId}
//                           onClick={() => setLightbox(prev => ({ ...prev, mediaIndex: idx }))}
//                           className={`relative w-12 h-12 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
//                             lightbox.mediaIndex === idx ? 'border-violet-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
//                           }`}
//                         >
//                           <img
//                             src={YourCollectionsService.getImageUrl(imgId)}
//                             alt={`View ${idx}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* RIGHT SIDE: METADATA & INTERACTIONS */}
//               <div className="w-full h-[40%] md:h-full md:w-1/3 flex flex-col border-l dark:border-zinc-800 bg-white dark:bg-zinc-900">
//                 <div className="p-4 sm:p-6 border-b dark:border-zinc-800 flex justify-between items-start shrink-0">
//                   <div className="w-full">
//                     <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
//                       {currentItem.title || "Untitled"}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                       Uploaded on {currentItem.formattedDate}
//                     </p>
//                   </div>
//                   <button onClick={closeLightbox} className="hidden md:block text-gray-500 hover:text-gray-900 dark:hover:text-white">
//                     <IoClose size={28} />
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
//                   <div className="flex items-center justify-between sm:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400">
//                      <div className="flex items-center gap-2">
//                        <FaRegEye /> {currentItem.viewCount || 0}
//                      </div>
//                      <div className="flex items-center gap-2">
//                        <FaHeart className="text-pink-500" /> {currentItem.likeCount || 0}
//                      </div>
//                   </div>
//                   <div>
//                     <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1">Description</h3>
//                     <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
//                       {currentItem.description || "No description provided."}
//                     </p>
//                   </div>
//                   {currentItem.awards && currentItem.awards.length > 0 && (
//                     <div>
//                       <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">Awards</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {currentItem.awards.map((award, i) => (
//                           <span key={i} className="px-2 py-1 text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full flex items-center gap-1">
//                             <FiAward /> {award}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {(currentItem.forSale || currentItem.status === 'sold') && (
//                     <div className="bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-sm">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
//                         <span className="text-base font-bold text-gray-900 dark:text-white">
//                           {currentItem.status === 'sold' ? 'Sold Out' : `₹${currentItem.price?.toLocaleString()}`}
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-4 sm:p-6 border-t dark:border-zinc-800 mt-auto shrink-0 safe-area-bottom">
//                   <div className="flex items-center justify-between gap-4 mb-4">
//                     <LikeButton targetId={currentItem.$id} targetType="artwork" />
//                     <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition">
//                        <FaRegComment size={20} className="text-gray-600 dark:text-gray-400" />
//                     </button>
//                     <ShareButton artwork={currentItem} />
//                     <DownloadService artwork={currentItem} />
//                   </div>
//                   {currentUserId === userId && activeTab === "Sell" && currentItem.forSale && (
//                     <div className="flex gap-2 sm:gap-3">
//                       <button
//                         onClick={() => navigate(`/Account/Edit/${currentItem.$id}`)}
//                         className="flex-1 py-2 rounded-sm border border-gray-300 dark:border-gray-600 text-xs sm:text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
//                       >
//                         Edit Details
//                       </button>
//                       <button
//                         onClick={() => handleMarkAsSold(currentItem.$id)}
//                         className="flex-1 py-2 rounded-sm bg-violet-600 text-white text-xs sm:text-sm font-medium hover:bg-violet-700 transition"
//                       >
//                         Mark Sold
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default YourCollections;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoImageOutline, IoVideocamOutline, IoClose } from 'react-icons/io5';
// import { FiAward } from "react-icons/fi";
// import { MdOutlineSell } from "react-icons/md";
// import { FaRegEye, FaHeart, FaRegComment, FaInfoCircle } from "react-icons/fa";
// import { ChevronLeft, ChevronRight, Download, Share2, Heart, Info, Tag } from "lucide-react";

// import { YourCollectionsService } from "./YourCollectionsService";
// import { ArtworkCard } from "./ArtworkCard";
// import LikeButton from "../../../EngagementService/likeButton";
// import ShareButton from "../../../Share/ShareFunction";
// import DownloadService from "../../../Downloads/downloadService";
// import "react-toastify/dist/ReactToastify.css";

// // 1. ICONS RESTORED IN TABS
// const TABS = [
//   { key: "Arts&Crafts", label: "Artworks", icon: IoImageOutline },
//   { key: "Videos", label: "Videos", icon: IoVideocamOutline },
//   { key: "Awards", label: "Awards", icon: FiAward },
//   { key: "Sell", label: "Store", icon: MdOutlineSell }
// ];

// function YourCollections({ userId }) {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("Arts&Crafts");
//   const [uploads, setUploads] = useState([]);
//   const [filteredUploads, setFilteredUploads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUserId, setCurrentUserId] = useState(null);
 
//   // Lightbox State
//   const [lightbox, setLightbox] = useState({ open: false, itemIndex: 0, mediaIndex: 0 });
//   const [showMobileInfo, setShowMobileInfo] = useState(false); // New state for mobile metadata

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       const user = await YourCollectionsService.fetchCurrentUser();
//       setCurrentUserId(user?.$id);
//     };
//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     loadUploads();
//   }, [activeTab, userId]);

//   const loadUploads = async () => {
//     try {
//       setLoading(true);
//       const data = await YourCollectionsService.fetchUserUploads(userId, activeTab);
//       setUploads(data);
//       setFilteredUploads(data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Could not load items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open lightbox at specific item AND specific media index (from card carousel)
//   const openLightbox = (itemIndex, specificMediaIndex = 0) => {
//     setLightbox({ open: true, itemIndex, mediaIndex: specificMediaIndex });
//     setShowMobileInfo(false); // Reset mobile info state
//   };
 
//   const closeLightbox = () => setLightbox({ open: false, itemIndex: 0, mediaIndex: 0 });

//   const getMediaForItem = (index) => {
//     const item = filteredUploads[index];
//     if (!item) return [];
//     if (activeTab === "Videos") return [item.fileId];
//     return item.images && item.images.length > 0 ? item.images : [item.fileId];
//   };

//   // --- LIGHTBOX NAVIGATION (BETWEEN POSTS) ---
//   const handlePostNavigation = (direction) => {
//     if (direction === "next") {
//         const nextItemIndex = (lightbox.itemIndex + 1) % filteredUploads.length;
//         setLightbox({ open: true, itemIndex: nextItemIndex, mediaIndex: 0 });
//     } else {
//         const prevItemIndex = (lightbox.itemIndex - 1 + filteredUploads.length) % filteredUploads.length;
//         setLightbox({ open: true, itemIndex: prevItemIndex, mediaIndex: 0 });
//     }
//   };

//   // --- SUB-COMPONENTS ---

//   const FilterTab = ({ tab }) => {
//     const isActive = activeTab === tab.key;
//     const Icon = tab.icon;
//     return (
//       <button
//         onClick={() => setActiveTab(tab.key)}
//         className={`relative flex items-center gap-1 px-2 py-2 text-sm font-semibold transition-colors duration-200 
//           ${isActive ? "text-black dark:text-white" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}
//         `}
//       >
//         <Icon size={16} />
//         <span>{tab.label}</span>
//         {isActive && (
//           <motion.div
//             layoutId="tab-underline"
//             className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
//           />
//         )}
//       </button>
//     );
//   };

//   const FeedGrid = () => {
//     if (loading) return <div className="py-20 flex justify-center"><div className="animate-spin h-6 w-6 border-2 border-zinc-500 rounded-full border-t-transparent"/></div>;
    
//     if (filteredUploads.length === 0) return (
//       <div className="py-20 text-center text-zinc-400 text-sm">No items found.</div>
//     );

//     return (
//       <div className="w-full">
//         {/* Tight Masonry Grid */}
//         <motion.div
//           className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           {filteredUploads.map((upload, index) => (
//             <div key={upload.$id} className="break-inside-avoid">
//                <ArtworkCard
//                  upload={upload}
//                  // Pass the index of the image user clicked on
//                  onImageClick={(clickedMediaIndex) => openLightbox(index, clickedMediaIndex)}
//                />
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     );
//   };

//   const currentItem = filteredUploads[lightbox.itemIndex];
//   const currentItemMedia = getMediaForItem(lightbox.itemIndex);
//   const activeMediaId = currentItemMedia[lightbox.mediaIndex];
//   const isVideo = activeTab === "Videos" || currentItem?.isVideo;

//   return (
//     <div className="w-full bg-white dark:bg-zinc-950 min-h-[500px]">
//       <ToastContainer position="bottom-right" theme="dark" hideProgressBar />

//       {/* 1. Filter Bar (Icons Restored, Gaps Reduced) */}
//       <div className="flex items-center gap-1 mb-4 border-b border-zinc-100 dark:border-zinc-900 pb-1 overflow-x-auto no-scrollbar">
//         {TABS.map((tab) => <FilterTab key={tab.key} tab={tab} />)}
//       </div>

//       {/* 2. Feed */}
//       <FeedGrid />

//       {/* 3. Immersive Lightbox */}
//       <AnimatePresence>
//         {lightbox.open && currentItem && (
//           <motion.div
//             className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={closeLightbox}
//           >
//             {/* Top Bar Controls */}
//             <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 pointer-events-none">
//                {/* 4. PRICE TAG IN LIGHTBOX (Visible on all screens) */}
//                {currentItem.forSale && (
//                  <div className="pointer-events-auto bg-green-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
//                     <Tag size={14} /> 
//                     ₹{currentItem.price.toLocaleString()}
//                  </div>
//                )}
               
//                <div className="flex items-center gap-4 pointer-events-auto">
//                   {/* Mobile Info Toggle */}
//                   <button 
//                     onClick={(e) => { e.stopPropagation(); setShowMobileInfo(!showMobileInfo); }}
//                     className="lg:hidden text-white/80 hover:text-white p-2"
//                   >
//                     <Info size={24} />
//                   </button>
//                   <button onClick={closeLightbox} className="text-white/80 hover:text-white p-2">
//                     <IoClose size={28} />
//                   </button>
//                </div>
//             </div>

//             <div className="flex w-full h-full max-w-[1800px] mx-auto" onClick={(e) => e.stopPropagation()}>
                
//                 {/* --- LEFT: MEDIA VIEWER --- */}
//                 <div className="flex-1 relative flex items-center justify-center bg-black group">
                   
//                    {/* Post Navigation (Prev) */}
//                    <button onClick={() => handlePostNavigation("prev")} className="absolute left-4 p-3 rounded-full bg-zinc-900/50 text-white hover:bg-zinc-800 transition z-20">
//                       <ChevronLeft />
//                    </button>

//                    {/* Media Content */}
//                    <div className="w-full h-full p-0 md:p-4 flex flex-col items-center justify-center relative">
//                       {isVideo ? (
//                         <video
//                           src={YourCollectionsService.getImageUrl(activeMediaId)}
//                           controls autoPlay className="max-h-full max-w-full object-contain shadow-2xl"
//                         />
//                       ) : (
//                         <img 
//                           src={YourCollectionsService.getImageUrl(activeMediaId)}
//                           alt="Detail"
//                           className="max-h-full max-w-full object-contain shadow-2xl"
//                         />
//                       )}

//                       {/* MULTI-IMAGE DOTS (Inside Lightbox) */}
//                       {!isVideo && currentItemMedia.length > 1 && (
//                         <div className="absolute bottom-6 flex gap-2 z-30">
//                            {currentItemMedia.map((_, idx) => (
//                              <button
//                                key={idx}
//                                onClick={() => setLightbox(prev => ({ ...prev, mediaIndex: idx }))}
//                                className={`w-2 h-2 rounded-full transition-all ${lightbox.mediaIndex === idx ? 'bg-white scale-125' : 'bg-white/30'}`}
//                              />
//                            ))}
//                         </div>
//                       )}
//                    </div>

//                    {/* Post Navigation (Next) */}
//                    <button onClick={() => handlePostNavigation("next")} className="absolute right-4 p-3 rounded-full bg-zinc-900/50 text-white hover:bg-zinc-800 transition z-20">
//                       <ChevronRight />
//                    </button>
//                 </div>

//                 {/* --- RIGHT: INFO PANEL (Desktop: Side, Mobile: Overlay Sheet) --- */}
//                 <AnimatePresence>
//                   {(showMobileInfo || window.innerWidth >= 1024) && (
//                     <motion.div 
//                       initial={{ x: '100%' }}
//                       animate={{ x: 0 }}
//                       exit={{ x: '100%' }}
//                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                       className={`
//                         w-full lg:w-[400px] bg-zinc-900 border-l border-zinc-800 flex flex-col
//                         fixed lg:static inset-0 lg:inset-auto z-[60] lg:z-auto
//                       `}
//                     >
//                         {/* Mobile Header */}
//                         <div className="lg:hidden p-4 border-b border-zinc-800 flex justify-between items-center">
//                            <h3 className="font-bold text-white">Details</h3>
//                            <button onClick={() => setShowMobileInfo(false)}><IoClose className="text-white" size={24}/></button>
//                         </div>

//                         {/* Metadata Content */}
//                         <div className="p-6 border-b border-zinc-800">
//                           <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{currentItem.title || "Untitled"}</h2>
//                           <div className="flex items-center justify-between">
//                              <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">{currentItem.formattedDate}</p>
//                              {currentItem.isAward && <span className="text-yellow-500 flex items-center gap-1 text-xs font-bold"><FiAward /> Award Winner</span>}
//                           </div>
//                         </div>

//                         <div className="flex-1 overflow-y-auto p-6 text-zinc-300 text-sm leading-7 whitespace-pre-wrap">
//                           {currentItem.description || "No description provided."}
                          
//                           {/* Stats Row */}
//                           <div className="mt-8 py-4 border-y border-zinc-800 flex items-center justify-around text-zinc-400">
//                               <div className="flex flex-col items-center">
//                                  <span className="text-lg font-bold text-white">{currentItem.viewCount}</span>
//                                  <span className="text-xs uppercase">Views</span>
//                               </div>
//                               <div className="flex flex-col items-center">
//                                  <span className="text-lg font-bold text-white">{currentItem.likeCount}</span>
//                                  <span className="text-xs uppercase">Likes</span>
//                               </div>
//                           </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="p-6 border-t border-zinc-800 grid grid-cols-4 gap-3 bg-zinc-950/50">
//                             <div className="col-span-1"><LikeButton targetId={currentItem.$id} targetType="artwork" /></div>
//                             <button className="col-span-1 flex items-center justify-center bg-zinc-800 text-zinc-400 hover:text-white rounded-lg h-10 transition-colors"><FaRegComment /></button>
//                             <div className="col-span-1 flex items-center justify-center bg-zinc-800 rounded-lg h-10"><ShareButton artwork={currentItem} /></div>
//                             <div className="col-span-1 flex items-center justify-center bg-zinc-800 rounded-lg h-10"><DownloadService artwork={currentItem} /></div>
//                         </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default YourCollections;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { IoImageOutline, IoVideocamOutline, IoClose } from 'react-icons/io5';
import { FiAward } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";
import { FaRegEye, FaRegComment } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Share2, Heart, Info, Tag, Download, SquarePlay, TagIcon, Images, Image } from "lucide-react";

import { YourCollectionsService } from "./YourCollectionsService";
import { ArtworkCard } from "./ArtworkCard";
import LikeButton from "../../../EngagementService/likeButton";
import ShareButton from "../../../Share/ShareFunction";
import DownloadService from "../../../Downloads/downloadService";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  { key: "Arts&Crafts", label: "Artworks", icon: Image},
  { key: "Videos", label: "Videos", icon: SquarePlay },
  // { key: "Awards", label: "Awards", icon: FiAward },
  { key: "Sell", label: "Store", icon: TagIcon }
];

function YourCollections({ userId }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Arts&Crafts");
  const [uploads, setUploads] = useState([]);
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
 
  // Lightbox State
  const [lightbox, setLightbox] = useState({ open: false, itemIndex: 0, mediaIndex: 0 });
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await YourCollectionsService.fetchCurrentUser();
      setCurrentUserId(user?.$id);
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    loadUploads();
  }, [activeTab, userId]);

  const loadUploads = async () => {
    try {
      setLoading(true);
      const data = await YourCollectionsService.fetchUserUploads(userId, activeTab);
      setUploads(data);
      setFilteredUploads(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not load items");
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (itemIndex, specificMediaIndex = 0) => {
    setLightbox({ open: true, itemIndex, mediaIndex: specificMediaIndex });
    setShowMobileInfo(false);
  };
 
  const closeLightbox = () => setLightbox({ open: false, itemIndex: 0, mediaIndex: 0 });

  const getMediaForItem = (index) => {
    const item = filteredUploads[index];
    if (!item) return [];
    if (activeTab === "Videos") return [item.fileId];
    return item.images && item.images.length > 0 ? item.images : [item.fileId];
  };

  const handlePostNavigation = (direction) => {
    if (direction === "next") {
        const nextItemIndex = (lightbox.itemIndex + 1) % filteredUploads.length;
        setLightbox({ open: true, itemIndex: nextItemIndex, mediaIndex: 0 });
    } else {
        const prevItemIndex = (lightbox.itemIndex - 1 + filteredUploads.length) % filteredUploads.length;
        setLightbox({ open: true, itemIndex: prevItemIndex, mediaIndex: 0 });
    }
  };

  const FilterTab = ({ tab }) => {
    const isActive = activeTab === tab.key;
    const Icon = tab.icon;
    return (
      <button
        onClick={() => setActiveTab(tab.key)}
        className={`relative flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors duration-200 
          ${isActive ? "text-black dark:text-white" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}
        `}
      >
        <Icon size={16} />
        <span>{tab.label}</span>
        {isActive && (
          <motion.div
            layoutId="tab-underline"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
          />
        )}
      </button>
    );
  };

  // const FeedGrid = () => {
  //   if (loading) return <div className="py-20 flex justify-center"><div className="animate-spin h-6 w-6 border-2 border-zinc-500 rounded-full border-t-transparent"/></div>;
    
  //   if (filteredUploads.length === 0) return (
  //     <div className="py-20 text-center text-zinc-400 text-sm">No items found.</div>
  //   );

  //   return (
  //     <div className="w-full">
  //       <motion.div
  //         className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //       >
  //         {filteredUploads.map((upload, index) => (
  //           <div key={upload.$id} className="break-inside-avoid">
  //              <ArtworkCard
  //                upload={upload}
  //                onImageClick={(clickedMediaIndex) => openLightbox(index, clickedMediaIndex)}
  //              />
  //           </div>
  //         ))}
  //       </motion.div>
  //     </div>
  //   );
  // };

  const FeedGrid = () => {
  if (loading) return <div className="py-20 flex justify-center"><div className="animate-spin h-6 w-6 border-2 border-zinc-500 rounded-full border-t-transparent"/></div>;
  
  if (filteredUploads.length === 0) return (
    <div className="py-20 text-center text-zinc-400 text-sm italic">No items found in this collection.</div>
  );

  return (
    <div className="w-full">
      <motion.div
        /* Base 2 columns on mobile, 4 columns on desktop */
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-1 auto-rows-[180px] md:auto-rows-[220px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredUploads.map((upload, index) => {
          // BENTO LOGIC: Assign spans based on index patterns or item properties
          // Pattern: Large item every 5th element, Tall item every 3rd
          let spanClass = "col-span-1 row-span-1"; 
          
          if (index % 7 === 0) {
            spanClass = "md:col-span-2 md:row-span-2 col-span-2 row-span-2"; // Feature Square
          } else if (index % 4 === 1) {
            spanClass = "md:row-span-2 row-span-2"; // Tall Portrait
          } else if (index % 6 === 3) {
            spanClass = "md:col-span-2 col-span-2"; // Wide Landscape
          }

          return (
            <motion.div 
              key={upload.$id} 
              className={`${spanClass} overflow-hidden rounded-sm border border-zinc-100 dark:border-zinc-900 shadow-sm hover:shadow-md transition-shadow`}
            >
               <ArtworkCard
                 upload={upload}
                 isBento={true} // New prop to handle height
                 onImageClick={(clickedMediaIndex) => openLightbox(index, clickedMediaIndex)}
               />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};


  const currentItem = filteredUploads[lightbox.itemIndex];
  const currentItemMedia = getMediaForItem(lightbox.itemIndex);
  const activeMediaId = currentItemMedia[lightbox.mediaIndex];
  const isVideo = activeTab === "Videos" || currentItem?.isVideo;

  // Reusable Info Panel Content
  const InfoPanelContent = ({ isMobileView }) => (
    <div className="flex flex-col h-full bg-zinc-900">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex justify-between items-start shrink-0">
            <div>
                <h2 className="text-xl font-bold text-white leading-tight">{currentItem.title || "Untitled"}</h2>
                <p className="text-xs text-zinc-500 mt-1 font-mono">{currentItem.formattedDate}</p>
            </div>
            {isMobileView && (
                <button onClick={() => setShowMobileInfo(false)} className="p-1 bg-zinc-800 rounded-full text-zinc-400">
                    <IoClose size={20} />
                </button>
            )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Description */}
            <p className="text-zinc-300 text-sm leading-7 whitespace-pre-wrap">
                {currentItem.description || "No description provided."}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 py-4 border-y border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400">
                    <FaRegEye size={16} /> <span className="text-sm font-medium">{currentItem.viewCount} Views</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                    <Heart size={16} /> <span className="text-sm font-medium">{currentItem.likeCount} Likes</span>
                </div>
            </div>

            {/* Price (Mobile: Inside Content, Desktop: Top Right of Content) */}
            {currentItem.forSale && (
                <div className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50">
                    <div className="bg-green-600 p-2 rounded-full text-white">
                        <Tag size={16} />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Price</p>
                        <p className="text-lg font-bold text-white">₹{currentItem.price.toLocaleString()}</p>
                    </div>
                </div>
            )}

            {/* Awards */}
            {currentItem.isAward && (
                <div className="flex flex-wrap gap-2">
                    {currentItem.awards.map((award, i) => (
                        <span key={i} className="px-3 py-1 bg-yellow-900/30 text-yellow-500 border border-yellow-700/30 text-xs font-bold rounded-full flex items-center gap-1">
                            <FiAward /> {award}
                        </span>
                    ))}
                </div>
            )}
        </div>

        {/* Actions Footer */}
        <div className="p-5 border-t border-zinc-800 bg-zinc-950/30 shrink-0">
            <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1"><LikeButton targetId={currentItem.$id} targetType="artwork" /></div>
                <button className="col-span-1 flex items-center justify-center bg-zinc-800 text-zinc-400 hover:text-white rounded-lg h-10 transition-colors"><FaRegComment size={18}/></button>
                <div className="col-span-1 flex items-center justify-center bg-zinc-800 rounded-lg h-10"><ShareButton artwork={currentItem} /></div>
                <div className="col-span-1 flex items-center justify-center bg-zinc-800 rounded-lg h-10"><DownloadService artwork={currentItem} /></div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="w-full bg-white dark:bg-zinc-950 min-h-[500px]">
      <ToastContainer position="bottom-right" theme="dark" hideProgressBar />

      {/* Filter Bar */}
      <div className="flex items-center gap-1 mb-4 border-b border-zinc-100 dark:border-zinc-900 pb-1 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => <FilterTab key={tab.key} tab={tab} />)}
      </div>

      <FeedGrid />

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {lightbox.open && currentItem && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-0 md:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div 
                className="bg-black md:bg-zinc-900 w-full h-full md:w-[80vw] md:h-[95vh] md:max-w-6xl md:rounded-lg overflow-hidden flex flex-col md:flex-row relative shadow-2xl border border-zinc-800"
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* --- LEFT: MEDIA VIEWER --- */}
                <div className="flex-1 bg-black relative flex items-center justify-center group overflow-hidden">
                   
                   {/* Top Bar Controls (Floating inside media area) */}
                   <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
                        {/* Mobile Info Toggle */}
                        <button 
                            onClick={() => setShowMobileInfo(true)}
                            className="md:hidden p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                        >
                            <Info size={20} />
                        </button>
                        {/* Close Button */}
                        <button 
                            onClick={closeLightbox} 
                            className="p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                        >
                            <IoClose size={22} />
                        </button>
                   </div>

                   {/* Nav Buttons */}
                   <button onClick={(e) => { e.stopPropagation(); handlePostNavigation("prev"); }} className="absolute left-4 p-3 rounded-full bg-black/50 text-white hover:bg-zinc-800 transition z-20">
                      <ChevronLeft size={20}/>
                   </button>
                   <button onClick={(e) => { e.stopPropagation(); handlePostNavigation("next"); }} className="absolute right-4 p-3 rounded-full bg-black/50 text-white hover:bg-zinc-800 transition z-20">
                      <ChevronRight size={20}/>
                   </button>

                   {/* Media Content */}
                   <div className="w-full h-full flex flex-col items-center justify-center p-0 md:p-4">
                      {isVideo ? (
                        <video
                          src={YourCollectionsService.getImageUrl(activeMediaId)}
                          controls autoPlay className="max-h-full max-w-full object-contain shadow-2xl"
                        />
                      ) : (
                        <img 
                          src={YourCollectionsService.getImageUrl(activeMediaId)}
                          alt="Detail"
                          className="max-h-full max-w-full object-contain shadow-2xl"
                        />
                      )}

                      {/* Dots Indicator */}
                      {!isVideo && currentItemMedia.length > 1 && (
                        <div className="absolute bottom-6 flex gap-2 z-30">
                           {currentItemMedia.map((_, idx) => (
                             <button
                               key={idx}
                               onClick={(e) => { e.stopPropagation(); setLightbox(prev => ({ ...prev, mediaIndex: idx })); }}
                               className={`w-2 h-2 rounded-full transition-all ${lightbox.mediaIndex === idx ? 'bg-white scale-125' : 'bg-white/30'}`}
                             />
                           ))}
                        </div>
                      )}
                   </div>
                </div>

                {/* --- RIGHT: INFO PANEL --- */}
                
                {/* 1. Desktop Sidebar (Hidden on Mobile) */}
                <div className="hidden md:flex w-[350px] border-l border-zinc-800 flex-col bg-zinc-900">
                    <InfoPanelContent isMobileView={false} />
                </div>

                {/* 2. Mobile Bottom Sheet (Visible when toggled) */}
                <AnimatePresence>
                  {showMobileInfo && (
                    <motion.div 
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-x-0 bottom-0 top-20 z-[60] md:hidden rounded-t-2xl overflow-hidden shadow-2xl"
                    >
                       <InfoPanelContent isMobileView={true} />
                    </motion.div>
                  )}
                </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default YourCollections;