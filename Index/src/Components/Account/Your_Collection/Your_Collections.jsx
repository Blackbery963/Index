// import React, { useState, useEffect } from "react";
// import { FaEllipsisV, FaArrowLeft, FaArrowRight, FaRegComment, FaRegHeart, FaRegEye, FaPlay, FaAward } from "react-icons/fa";
// import { FiMaximize } from "react-icons/fi";
// import { MdPhoto, MdVideocam, MdErrorOutline, MdMonetizationOn } from "react-icons/md";
// import { IoClose } from "react-icons/io5";
// import { PiShareFatLight } from 'react-icons/pi';
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { databases, storage, account, Query, config } from '../../../appwriteConfig';
// import LikeButton from '../../../EngagementService/likeButton';
// import { engagementService } from '../../../EngagementService/engagementService';
// import { recordArtworkView, getArtworkViewCount } from '../../../Views/viewService';
// import ArtworkViewTracker from "../../../Views/viewsTracker";
// import ShareButton from "../../../Share/ShareFunction";
// import DownloadService from "../../../Downloads/downloadService";

// const commercialDb = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
// const sellerCollection = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;

// function AppwriteImage({ fileId, bucketId, price, alt, className, ...props }) {
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(true);

//   if (error || !fileId) {
//     return (
//       <div className={`${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg`}>
//         <MdErrorOutline className="text-gray-400 dark:text-gray-500 text-3xl" />
//         <span className="sr-only">Error loading image</span>
//       </div>
//     );
//   }

//   const src = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`;

//   return (
//     <>
//       {loading && (
//         <div className={`${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg`}>
//           <div className="animate-pulse rounded-full h-10 w-10 bg-gray-300 dark:bg-gray-600"></div>
//         </div>
//       )}
//       <img
//         src={src}
//         alt={alt}
//         className={`${className} ${loading ? 'hidden' : 'block'}`}
//         loading="lazy"
//         onLoad={() => setLoading(false)}
//         onError={(e) => {
//           console.error(`Failed to load image ${fileId}:`, e);
//           setError(true);
//         }}
//         {...props}
//       />
//     </>
//   );
// }

// function Your_Collections({ userId }) {
//   const navigate = useNavigate();
//   const [activeButton, setActiveButton] = useState("Arts&Crafts");
//   const [uploads, setUploads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lightbox, setLightbox] = useState({ open: false, index: 0 });
//   const [currentUserId, setCurrentUserId] = useState(null);

//   const handleButtonClick = (buttonName) => {
//     setActiveButton(buttonName);
//   };

//   const openLightbox = (index) => setLightbox({ open: true, index });
//   const closeLightbox = () => setLightbox({ open: false, index: 0 });
//   const prevImage = () => setLightbox((prev) => ({
//     ...prev,
//     index: prev.index > 0 ? prev.index - 1 : uploads.length - 1,
//   }));
//   const nextImage = () => setLightbox((prev) => ({
//     ...prev,
//     index: prev.index < uploads.length - 1 ? prev.index + 1 : 0,
//   }));

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const user = await account.get();
//         setCurrentUserId(user.$id);
//       } catch (error) {
//         console.error("Not logged in or unable to fetch user:", error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Base query for all documents
//         const queries = [
//           Query.equal("userId", userId),
//           Query.orderDesc("uploadDate"),
//           Query.limit(50),
//           Query.select(["$id", "title", "description", "fileId", "medium", "tag", "userId", "uploadDate", "price", "status", "awards"])
//         ];

//         const response = await databases.listDocuments(
//           config.databaseId,
//           config.collectionId,
//           queries
//         );

//         const uploadsWithMedia = await Promise.all(
//           response.documents.map(async (doc) => {
//             const likeCount = await engagementService.getEngagementCount(doc.$id, 'like');
//             const viewCount = await getArtworkViewCount(doc.$id);

//             return {
//               ...doc,
//               mediaUrl: doc.fileId
//                 ? `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${doc.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`
//                 : null,
//               isImage: ["Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", "Charcoal", "Pastel",
//                 "Pencil Drawing", "Graphite Drawing", "Tempera", "Fresco Painting", "Mosaic Art",
//                 "Glass Art", "Fiber Art", "Sand Art", "Digital Art", "Digital Painting", "Vector Art",
//                 "Pixel Art", "3D Modeling", "Photography", "Mixed Media", "Collage", "Printmaking",
//                 "AI-Generated Art", "Augmented Reality Art", "Virtual Reality Art", "NFT Art",
//                 "Data Visualization Art", "Calligraphy", "Typography Design", "Sculpture", "Ceramic",
//                 "Installation Art", "Kinetic Art", "Light Art", "Performance Art", "Sound Art", "Bio Art",
//                 "Graphic Design", "Industrial Design", "Fashion Design", "Interior Design",
//                 "Architectural Drawing", "Game Design", "Portrait Photography", "Landscape Photography",
//                 "Street Photography", "Conceptual Photography", "Documentary Photography", "Micro Photography", "Other"].includes(doc.medium),
//               isVideo: doc.medium === "Video",
//               forSale: doc.price && doc.price > 0,
//               isAward: doc.awards && doc.awards.length > 0, // Fixed: Check for non-empty awards array
//               formattedDate: new Date(doc.uploadDate).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               }),
//               likeCount,
//               viewCount
//             };
//           })
//         );

//         setUploads(uploadsWithMedia);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(`Failed to load collections: ${err.message}`);
//         toast.error("Failed to load your collections.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUploads();
//   }, [activeButton, navigate, userId]);

//   const handleMarkAsSold = async (productId) => {
//     try {
//       await databases.updateDocument(
//         commercialDb,
//         sellerCollection,
//         productId,
//         {
//           status: "sold",
//           price: 0
//         }
//       );

//       setUploads(prev => prev.map(u =>
//         u.$id === productId ? { ...u, status: "sold", price: 0 } : u
//       ));

//       toast.success("Artwork marked as sold!");
//     } catch (error) {
//       console.error("Error marking as sold:", error);
//       toast.error("Failed to mark as sold");
//     }
//   };

//   const ImagePlaceholder = ({ type }) => (
//     <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 p-4 rounded-lg">
//       {type === "error" ? (
//         <>
//           <MdErrorOutline className="text-4xl mb-2" />
//           <p className="text-center text-sm">Media unavailable</p>
//         </>
//       ) : (
//         <>
//           {activeButton === "Arts&Crafts" && <MdPhoto className="text-4xl mb-2" />}
//           {activeButton === "Videos" && <MdVideocam className="text-4xl mb-2" />}
//           {activeButton === "Awards" && <FaAward className="text-4xl mb-2" />}
//           {activeButton === "Sell" && <MdMonetizationOn className="text-4xl mb-2" />}
//           <p className="text-center text-sm">No media available</p>
//         </>
//       )}
//     </div>
//   );

//   // Filter artworks based on active tab
//   const filteredUploads = uploads.filter(upload => {
//     switch (activeButton) {
//       case "Arts&Crafts":
//         return upload.isImage;
//       case "Videos":
//         return upload.isVideo;
//       case "Awards":
//         return upload.isAward; // Fixed: Only show uploads with awards
//       case "Sell":
//         return upload.forSale;
//       default:
//         return true;
//     }
//   });

//   const Tooltip = ({ content, children }) => (
//     <div className="relative group">
//       {children}
//       <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
//         {content}
//         <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800 border-solid"></div>
//       </div>
//     </div>
//   );

//   const ActionButton = ({ icon, count, tooltip, onClick }) => (
//     <Tooltip content={tooltip}>
//       <button
//         onClick={onClick}
//         className="flex flex-row gap-2 items-center text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 text-[15px]"
//       >
//         {icon}
//         <span>{count}</span>
//       </button>
//     </Tooltip>
//   );

//   return (
//     <div className="min-h-screen w-full bg-gray-100 dark:bg-[#040d1200] text-gray-900 dark:text-gray-100 transition-colors duration-300">
//       <ToastContainer position="top-right" autoClose={5000} theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} />

//       <nav className="w-full max-w-7xl mx-auto px-4 py-4 bg-white dark:bg-gray-800 shadow-sm overflow-auto">
//         <div className="flex gap-4">
//           {["Arts&Crafts", "Videos", "Awards", "Sell"].map((buttonName) => (
//             <motion.button
//               key={buttonName}
//               className={`relative px-4 py-2 flex items-center gap-2 text-sm font-medium font-Quicksand rounded-md transition-colors duration-200 ${
//                 activeButton === buttonName
//                   ? "bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300"
//                   : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//               }`}
//               onClick={() => handleButtonClick(buttonName)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {buttonName === "Arts&Crafts" && <MdPhoto className="text-lg" />}
//               {buttonName === "Videos" && <MdVideocam className="text-lg" />}
//               {buttonName === "Awards" && <FaAward className="text-lg" />}
//               {buttonName === "Sell" && <MdMonetizationOn className="text-lg" />}
//               <span>{buttonName}</span>
//               {activeButton === buttonName && (
//                 <motion.span
//                   className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 dark:bg-violet-400"
//                   layoutId="underline"
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//             </motion.button>
//           ))}
//         </div>
//       </nav>

//       <div className="w-full max-w-7xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <motion.div
//               className="rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             />
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <p className="text-red-500 dark:text-red-400 text-lg font-Quicksand mb-4">{error}</p>
//             <motion.button
//               onClick={() => window.location.reload()}
//               className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Retry
//             </motion.button>
//           </div>
//         ) : filteredUploads.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 dark:text-gray-400 text-lg font-Quicksand mb-4">
//               {activeButton === "Sell"
//                 ? "No items listed for sale. Add a price to your artworks to sell them."
//                 : `No ${activeButton.toLowerCase()} found in your collection.`}
//             </p>
//             {currentUserId === userId && (
//               <motion.button
//                 onClick={() => navigate("/Account/Upload")}
//                 className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {activeButton === "Sell"
//                   ? "Upload Artwork to Sell"
//                   : `Upload Your First ${activeButton.slice(0, -1)}`}
//               </motion.button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {filteredUploads.map((upload, index) => (
//               <motion.div
//                 key={upload.$id}
//                 className="relative flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-200"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="relative w-full aspect-[4/3] overflow-hidden group">
//                   {upload.mediaUrl && upload.isImage ? (
//                     <AppwriteImage
//                       fileId={upload.fileId}
//                       bucketId={config.bucketId}
//                       alt={upload.title || "Uploaded image"}
//                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                   ) : upload.mediaUrl && upload.isVideo ? (
//                     <div className="relative w-full h-full">
//                       <video
//                         src={upload.mediaUrl}
//                         className="w-full h-full object-cover"
//                         onError={(e) => console.warn(`Failed to load video ${upload.fileId}:`, e)}
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
//                         <FaPlay className="text-white text-2xl opacity-80" />
//                       </div>
//                     </div>
//                   ) : (
//                     <ImagePlaceholder type="error" />
//                   )}

//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                     <button
//                       onClick={() => openLightbox(index)}
//                       className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition-all"
//                       aria-label="View fullscreen"
//                     >
//                       <FiMaximize className="text-gray-800" />
//                     </button>
//                   </div>

//                   {upload.isAward && (
//                     <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
//                       <FaAward className="mr-1" />
//                       <span>Award</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-3 md:p-4 flex flex-col gap-2">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-sm md:text-base text-gray-900 dark:text-gray-100 line-clamp-1 font-Quicksand">
//                         {upload.title || "Untitled"}
//                       </h3>
//                       <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 font-Playfair">
//                         {upload.description || "No description"}
//                       </p>
//                       {upload.isAward && (
//                         <div className="mt-2 flex flex-wrap gap-2">
//                           {upload.awards.map((award, i) => (
//                             <span
//                               key={i}
//                               className="inline-flex px-2 py-1 bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-teal-200 rounded-full text-xs font-Playfair"
//                             >
//                               {award}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     <button className="text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 p-1">
//                       <FaEllipsisV size={14} />
//                     </button>
//                   </div>

//                   <div className="flex justify-between items-center mt-2">
//                     {upload.price ? (
//                       <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
//                         ₹{upload.price.toLocaleString()}
//                       </span>
//                     ) : (
//                       <span className="text-xs text-gray-400">
//                         {upload.formattedDate}
//                       </span>
//                     )}

//                     <div className="flex gap-4">
//                       <Tooltip content="Views">
//                         <button
//                           className="flex items-center gap-1 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"
//                         >
//                           <FaRegEye size={16} />
//                           <span className="text-xs">{upload.viewCount || 0}</span>
//                         </button>
//                       </Tooltip>
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
//                     <LikeButton targetId={upload.$id} targetType="artwork" />
//                     <DownloadService artwork={upload} />
//                     <ActionButton
//                       icon={<FaRegComment />}
//                       count={0}
//                       tooltip="Comments"
//                       onClick={() => toast.info("Comment functionality coming soon!")}
//                     />
//                     <ShareButton artwork={upload} />
//                   </div>

//                   {activeButton === "Sell" && (
//                     <div className="mt-2 flex gap-2">
//                       {upload.price ? (
//                         <>
//                           <button
//                             onClick={() => handleMarkAsSold(upload.$id)}
//                             className="flex-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
//                           >
//                             Mark as Sold
//                           </button>
//                           {/* <button
//                             onClick={() => navigate(`/Account/Edit/${upload.$id}`)}
//                             className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//                           >
//                             Edit
//                           </button> */}
//                         </>
//                       ) : (
//                         <button
//                           onClick={() => navigate(`/Account/Edit/${upload.$id}`)}
//                           className="w-full px-3 py-1 text-sm bg-violet-600 text-white rounded hover:bg-violet-700"
//                         >
//                           Set Price
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {lightbox.open && (
//           <motion.div
//             className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <motion.div
//               className="relative max-w-6xl w-full"
//               variants={{
//                 hidden: { opacity: 0, scale: 0.8 },
//                 visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
//                 exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
//               }}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {filteredUploads[lightbox.index].isImage ? (
//                 <AppwriteImage
//                   fileId={filteredUploads[lightbox.index].fileId}
//                   bucketId={config.bucketId}
//                   alt={filteredUploads[lightbox.index].title || "Uploaded image"}
//                   className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
//                 />
//               ) : filteredUploads[lightbox.index].isVideo ? (
//                 <video
//                   src={filteredUploads[lightbox.index].mediaUrl}
//                   controls
//                   autoPlay
//                   className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
//                   onError={(e) => console.warn(`Failed to load video ${filteredUploads[lightbox.index].fileId}:`, e)}
//                 />
//               ) : (
//                 <ImagePlaceholder type="error" />
//               )}
//               <motion.button
//                 onClick={closeLightbox}
//                 className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-md hover:bg-black/70"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <IoClose size={16} />
//               </motion.button>
//               <motion.button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <FaArrowLeft size={20} />
//               </motion.button>
//               <motion.button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <FaArrowRight size={20} />
//               </motion.button>
//               <div className="absolute bottom-4 left-0 right-0 text-center text-white font-Quicksand">
//                 <p className="text-lg">{filteredUploads[lightbox.index].title || "Untitled"}</p>
//                 {filteredUploads[lightbox.index].isAward && (
//                   <div className="mt-2 flex flex-wrap justify-center gap-2">
//                     {filteredUploads[lightbox.index].awards.map((award, i) => (
//                       <span
//                         key={i}
//                         className="inline-flex px-2 py-1 bg-teal-700 text-white rounded-full text-xs font-Playfair"
//                       >
//                         {award}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//                 <p className="text-sm mt-2">{lightbox.index + 1} / {filteredUploads.length}</p>
//                 <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center">
//                   <FaRegEye className="mr-2" />
//                   <ArtworkViewTracker
//                     artworkId={filteredUploads[lightbox.index].$id}
//                     onViewUpdated={(count) => {
//                       setUploads(prev => prev.map(u =>
//                         u.$id === filteredUploads[lightbox.index].$id ? { ...u, viewCount: count } : u
//                       ));
//                     }}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Your_Collections;


// // 8670001818


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { MdPhoto, MdVideocam } from "react-icons/md";
// import { FiAward, FiMonitor, FiX } from "react-icons/fi";
// import { MdOutlineSell } from "react-icons/md";
// import { FaArrowLeft, FaArrowRight, FaRegEye } from "react-icons/fa";
// import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
// import { YourCollectionsService } from "./YourCollectionsService";
// import { ArtworkCard } from "./ArtworkCard";
// import { ImagePlaceholder } from "./MediaComponents";
// import ArtworkViewTracker from "../../../Views/viewsTracker";
// import "react-toastify/dist/ReactToastify.css";

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
//   const [lightbox, setLightbox] = useState({ open: false, index: 0 });

//   useEffect(() => {
//     const initialize = async () => {
//       const user = await YourCollectionsService.fetchCurrentUser();
//       setCurrentUserId(user?.$id);
//       await loadUploads();
//     };
//     initialize();
//   }, [userId, activeTab]);

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

//   const openLightbox = (index) => setLightbox({ open: true, index });
//   const closeLightbox = () => setLightbox({ open: false, index: 0 });

//   const navigateImages = (direction) => {
//     setLightbox(prev => ({
//       ...prev,
//       index:
//         direction === "next"
//           ? (prev.index + 1) % filteredUploads.length
//           : (prev.index - 1 + filteredUploads.length) % filteredUploads.length
//     }));
//   };

//   const handleMarkAsSold = async (productId) => {
//     try {
//       await YourCollectionsService.markAsSold(productId);
//       setUploads(prev =>
//         prev.map(u =>
//           u.$id === productId ? { ...u, status: "sold", price: 0 } : u
//         )
//       );
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
//         whileTap={{ scale: 0.95 }}
//         className={`flex-shrink-0 flex items-center  gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
//           ${isActive
//             ? "bg-violet-500 text-white shadow"
//             : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
//       >
//         <Icon className="text-base" />
//         <span className="truncate">{tab.label}</span>
//       </motion.button>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <motion.div
//           className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <ToastContainer position="top-right" autoClose={5000} />

//       {/* Tabs */}
//       <div className="bg-white dark:bg-gray-800 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-6xl mx-auto px-0">
//           <div className="flex items-center justify-between overflow-x-auto gap-2 py-3 scrollbar-hide">
//             {TABS.map(tab => (
//               <TabButton key={tab.key} tab={tab} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-full mx-auto px-0 py-6">
//         {error ? (
//           <div className="text-center py-12">
//             <p className="text-red-500 mb-4">{error}</p>
//             <button
//               onClick={loadUploads}
//               className="px-5 py-2 bg-violet-500 text-white rounded-lg"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : filteredUploads.length === 0 ? (
//           <div className="text-center py-16">
//             <ImagePlaceholder activeTab={activeTab} className="h-24 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold mb-2">
//               No {activeTab.toLowerCase()} found
//             </h3>
//             <p className="text-gray-500 text-sm mb-6">
//               {activeTab === "Sell"
//                 ? "Add prices to your artworks to see them here"
//                 : `You haven’t uploaded any ${activeTab.toLowerCase()} yet`}
//             </p>
//             {currentUserId === userId && (
//               <button
//                 onClick={() => navigate("/Account/Upload")}
//                 className="px-5 py-2 bg-violet-500 text-white rounded-lg"
//               >
//                 Upload Now
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Stats */}
//             <div className="mb-6 flex justify-center">
//               <div className="flex gap-6 bg-white dark:bg-gray-800 px-6 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-400 shadow-sm">
//                 <span>Total: {filteredUploads.length}</span>
//                 <span>Views: {filteredUploads.reduce((s, u) => s + (u.viewCount || 0), 0)}</span>
//                 <span>Likes: {filteredUploads.reduce((s, u) => s + (u.likeCount || 0), 0)}</span>
//               </div>
//             </div>

//             {/* Grid */}
//             <motion.div
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
//               layout
//             >
//               <AnimatePresence>
//                 {filteredUploads.map((upload, index) => (
//                   <ArtworkCard
//                     key={upload.$id}
//                     upload={upload}
//                     activeTab={activeTab}
//                     onImageClick={() => openLightbox(index)}
//                     onMarkAsSold={handleMarkAsSold}
//                     onEdit={(id) => navigate(`/Account/Edit/${id}`)}
//                     currentUserId={currentUserId}
//                   />
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           </>
//         )}
//       </div>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightbox.open && (
//           <motion.div
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative max-w-6xl w-full max-h-[90vh]"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <img
//                 src={YourCollectionsService.getImageUrl(
//                   filteredUploads[lightbox.index].fileId
//                 )}
//                 alt={filteredUploads[lightbox.index].title}
//                 className="w-full h-full max-h-[70vh] object-contain rounded-xl"
//               />

//               {/* Controls */}
//               <button
//                 onClick={closeLightbox}
//                 className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-lg"
//               >
//                 <FiX size={18} />
//               </button>
//               <button
//                 onClick={() => navigateImages("prev")}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-lg"
//               >
//                 <FaArrowLeft size={18} />
//               </button>
//               <button
//                 onClick={() => navigateImages("next")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 rounded-lg"
//               >
//                 <FaArrowRight size={18} />
//               </button>

//               {/* Info */}
//               <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
//                 <h3 className="text-base font-semibold mb-1">
//                   {filteredUploads[lightbox.index].title}
//                 </h3>
//                 <div className="flex items-center justify-between text-sm">
//                   <span>{lightbox.index + 1} / {filteredUploads.length}</span>
//                   <div className="flex items-center gap-2">
//                     <FaRegEye />
//                     <ArtworkViewTracker
//                       artworkId={filteredUploads[lightbox.index].$id}
//                       onViewUpdated={(count) => {
//                         setUploads(prev =>
//                           prev.map(u =>
//                             u.$id === filteredUploads[lightbox.index].$id
//                               ? { ...u, viewCount: count }
//                               : u
//                           )
//                         );
//                       }}
//                     />
//                   </div>
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


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
import { FiAward, FiX } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";
import { FaArrowLeft, FaArrowRight, FaRegEye } from "react-icons/fa";
import { YourCollectionsService } from "./YourCollectionsService";
import { ArtworkCard } from "./ArtworkCard";
import { ImagePlaceholder } from "./MediaComponents";
import ArtworkViewTracker from "../../../Views/viewsTracker";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  { key: "Arts&Crafts", label: "Arts & Crafts", icon: IoImageOutline },
  { key: "Videos", label: "Videos", icon: IoVideocamOutline },
  { key: "Awards", label: "Awards", icon: FiAward },
  { key: "Sell", label: "Sell", icon: MdOutlineSell }
];

function YourCollections({ userId }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Arts&Crafts");
  const [uploads, setUploads] = useState([]);
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load current user only once on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await YourCollectionsService.fetchCurrentUser();
      setCurrentUserId(user?.$id);
    };
    fetchCurrentUser();
  }, []);

  // Load uploads when tab changes or userId changes
  useEffect(() => {
    loadUploads();
  }, [activeTab, userId]);

  const loadUploads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await YourCollectionsService.fetchUserUploads(userId, activeTab);
      setUploads(data);
      setFilteredUploads(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const navigateImages = (direction) => {
    setLightbox(prev => ({
      ...prev,
      index:
        direction === "next"
          ? (prev.index + 1) % filteredUploads.length
          : (prev.index - 1 + filteredUploads.length) % filteredUploads.length
    }));
  };

  const handleMarkAsSold = async (productId) => {
    try {
      await YourCollectionsService.markAsSold(productId);
      setUploads(prev =>
        prev.map(u =>
          u.$id === productId ? { ...u, status: "sold", price: 0 } : u
        )
      );
      // Update filtered uploads as well
      setFilteredUploads(prev =>
        prev.map(u =>
          u.$id === productId ? { ...u, status: "sold", price: 0 } : u
        )
      );
      toast.success("Artwork marked as sold!");
    } catch (error) {
      toast.error("Failed to mark as sold");
    }
  };

  const TabButton = ({ tab }) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.key;

    return (
      <motion.button
        onClick={() => setActiveTab(tab.key)}
        className={`relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-300 group
          ${isActive 
            ? "text-violet-600 dark:text-violet-400" 
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {/* Icon */}
        <motion.div
          className={`transition-colors duration-300 ${
            isActive ? "text-violet-600 dark:text-violet-400" : "text-current"
          }`}
        >
          <Icon className={`text-lg ${isActive ? 'scale-110' : ''}`} />
        </motion.div>

        {/* Label - Hidden on mobile */}
        {!isMobile && (
          <motion.span
            className="font-medium whitespace-nowrap"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {tab.label}
          </motion.span>
        )}

        {/* Mobile Tooltip */}
        {isMobile && (
          <div className="absolute bottom-full mb-2 hidden group-hover:flex items-center justify-center">
            <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              {tab.label}
            </div>
          </div>
        )}

        {/* Animated Underline */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400"
            layoutId="activeTabUnderline"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              duration: 0.3
            }}
          />
        )}

        {/* Hover Effect */}
        {!isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-gray-300 dark:bg-gray-600"
            initial={{ width: 0 }}
            whileHover={{ 
              width: "100%", 
              left: 0, 
              right: 0,
              transition: { duration: 0.2 }
            }}
          />
        )}

        {/* Loading indicator for active tab */}
        {isActive && loading && (
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>
    );
  };

  const ContentArea = () => {
    if (loading) {
      return (
        <motion.div
          className="flex justify-center items-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Loading {activeTab.toLowerCase()}...
            </p>
          </div>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
            <motion.button
              onClick={loadUploads}
              className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      );
    }

    if (filteredUploads.length === 0) {
      return (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <ImagePlaceholder activeTab={activeTab} className="h-24 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No {activeTab.toLowerCase()} found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              {activeTab === "Sell"
                ? "Add prices to your artworks to see them here"
                : `You haven't uploaded any ${activeTab.toLowerCase()} yet`}
            </p>
            {currentUserId === userId && (
              <motion.button
                onClick={() => navigate("/Account/Upload")}
                className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload Now
              </motion.button>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <>
        {/* Enhanced Stats */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
            <span className="flex items-center gap-1">
              <span className="font-semibold">{filteredUploads.length}</span> items
            </span>
            <span className="flex items-center gap-1">
              <FaRegEye className="text-violet-500" />
              <span className="font-semibold">
                {filteredUploads.reduce((s, u) => s + (u.viewCount || 0), 0)}
              </span> views
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              <span className="font-semibold">
                {filteredUploads.reduce((s, u) => s + (u.likeCount || 0), 0)}
              </span> likes
            </span>
          </div>
        </motion.div>

        {/* Artwork Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredUploads.map((upload, index) => (
              <ArtworkCard
                key={upload.$id}
                upload={upload}
                activeTab={activeTab}
                onImageClick={() => openLightbox(index)}
                onMarkAsSold={handleMarkAsSold}
                onEdit={(id) => navigate(`/Account/Edit/${id}`)}
                currentUserId={currentUserId}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer 
        position="top-right" 
        autoClose={5000}
        theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
      />

      {/* Fixed Tabs Header - Always visible */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <nav className="flex items-center space-x-1 py-2">
              {TABS.map((tab) => (
                <TabButton key={tab.key} tab={tab} />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content Area - Changes based on loading state */}
      <div className="max-w-full mx-auto px-0 sm:px-0 py-8">
        <ContentArea />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && filteredUploads[lightbox.index] && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Media */}
              <img
                src={YourCollectionsService.getImageUrl(
                  filteredUploads[lightbox.index].fileId
                )}
                alt={filteredUploads[lightbox.index].title}
                className="w-full h-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* Navigation Controls */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
              >
                <FiX size={20} />
              </button>
              
              <button
                onClick={() => navigateImages("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
              >
                <FaArrowLeft size={18} />
              </button>
              
              <button
                onClick={() => navigateImages("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
              >
                <FaArrowRight size={18} />
              </button>

              {/* Info Panel */}
              <motion.div 
                className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-lg rounded-xl p-4 text-white border border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {filteredUploads[lightbox.index].title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">
                    {lightbox.index + 1} of {filteredUploads.length}
                  </span>
                  <div className="flex items-center gap-2 text-white/80">
                    <FaRegEye />
                    <ArtworkViewTracker
                      artworkId={filteredUploads[lightbox.index].$id}
                      onViewUpdated={(count) => {
                        setUploads(prev =>
                          prev.map(u =>
                            u.$id === filteredUploads[lightbox.index].$id
                              ? { ...u, viewCount: count }
                              : u
                          )
                        );
                        setFilteredUploads(prev =>
                          prev.map(u =>
                            u.$id === filteredUploads[lightbox.index].$id
                              ? { ...u, viewCount: count }
                              : u
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default YourCollections;