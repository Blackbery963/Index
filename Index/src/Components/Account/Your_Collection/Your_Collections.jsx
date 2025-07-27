// import React, { useState, useEffect } from "react";
// import { FaThumbsUp, FaRegThumbsUp, FaEllipsisV, FaArrowLeft, FaArrowRight, FaRegComment, FaRegHeart, FaRegEye, FaPlay, FaTrophy } from "react-icons/fa";
// import { FiDownload, FiMaximize } from "react-icons/fi";
// import { MdPhoto, MdVideocam, MdBook, MdErrorOutline } from "react-icons/md";
// import { IoClose } from "react-icons/io5";
// import { PiShareFatLight } from 'react-icons/pi';
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { databases, storage, account, Query, config } from '../../../appwriteConfig';
// import LikeButton from '../../../EngagementService/likeButton'; // Adjust path as needed
// import { engagementService } from '../../../EngagementService/engagementService'; // Adjust path as needed
// import { recordArtworkView, getArtworkViewCount } from '../../../Views/viewService';
// import ArtworkViewTracker from "../../../Views/viewsTracker";
// import ShareButton from "../../../Share/ShareFunction";
// import DownloadService from "../../../Downloads/downloadService";

// // Custom image component for Appwrite storage
// function AppwriteImage({ fileId, bucketId, alt, className, ...props }) {
//   const [error, setError] = useState(false);

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
//     <img
//       src={src}
//       alt={alt}
//       className={className}
//       loading="lazy"
//       onError={(e) => {
//         console.error(`Failed to load image ${fileId}:`, e);
//         setError(true);
//       }}
//       {...props}
//     />
//   );
// }

// function Your_Collections({userId}) {


//   const navigate = useNavigate();
//   const [activeButton, setActiveButton] = useState("Photos");
//   const [uploads, setUploads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lightbox, setLightbox] = useState({ open: false, index: 0 });

//   const handleButtonClick = (buttonName) => {
//     setActiveButton(buttonName);
//   };

//   // Lightbox controls
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
//     const fetchUploads = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // const user = await account.get();
//         // const userId = user.$id;

//         const mediumFilters = {
//           Photos: [
//             "Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", "Charcoal", "Pastel",
//             "Pencil Drawing", "Graphite Drawing", "Tempera", "Fresco Painting", "Mosaic Art",
//             "Glass Art", "Fiber Art", "Sand Art", "Digital Art", "Digital Painting", "Vector Art",
//             "Pixel Art", "3D Modeling", "Photography", "Mixed Media", "Collage", "Printmaking",
//             "AI-Generated Art", "Augmented Reality Art", "Virtual Reality Art", "NFT Art",
//             "Data Visualization Art", "Calligraphy", "Typography Design", "Sculpture", "Ceramic",
//             "Installation Art", "Kinetic Art", "Light Art", "Performance Art", "Sound Art", "Bio Art",
//             "Graphic Design", "Industrial Design", "Fashion Design", "Interior Design",
//             "Architectural Drawing", "Game Design",  "Portrait Photography","Landscape Photography","Street Photography",
//             "Conceptual Photography","Documentary Photography","Micro Photography","Other"
//           ],
//           Videos: ["Video"],
//           // Diary: ["Other"],
//           Masterpieces:["Masterpieces"]

//         };

//         const response = await databases.listDocuments(
//           config.databaseId,
//           config.collectionId,
//           [
//             Query.equal("userId", userId),
//             Query.orderDesc("uploadDate"),
//             Query.limit(20),
//             Query.select(["$id", "title", "description", "fileId", "medium", "tag", "userId", "uploadDate"]),
//             ...(mediumFilters[activeButton] ? [Query.equal("medium", mediumFilters[activeButton])] : []),
//           ]
//         );

//         // console.log("Fetched documents:", response.documents);

//         const uploadsWithMedia = await Promise.all(
//           response.documents.map(async (doc) => {
//             if (!doc.fileId) {
//               console.warn(`Document ${doc.$id} missing fileId`);
//             }
//             // Fetch the like count for each upload
//             const likeCount = await engagementService.getEngagementCount(doc.$id, 'like');
//             const viewCount = await getArtworkViewCount(doc.$id);
//             return {
//               ...doc,
//               mediaUrl: doc.fileId
//                 ? `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${doc.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`
//                 : null,
//               isImage: ["Photos", "Diary"].includes(activeButton),
//               isVideo: activeButton === "Videos",
//               formattedDate: new Date(doc.uploadDate).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               }),
//               likeCount, // Store the like count
//               viewCount
//             };
//           })
//         );

//         setUploads(uploadsWithMedia);
//       } catch (err) {
//         console.error("Fetch error:", {
//           message: err.message,
//           code: err.code,
//           type: err.type,
//         });
//         if (err.code === 401) {
//           toast.error("Please log in to view your collections.");
//           navigate("/login");
//         } else if (err.code === 404) {
//           setError("Collection or bucket not found. Check Appwrite configuration.");
//           toast.error("Collection or bucket not found.");
//         } else if (err.code === 403) {
//           setError("Permission denied. Ensure you have access to the collection.");
//           toast.error("Permission denied.");
//         } else {
//           setError(`Failed to load collections: ${err.message}`);
//           toast.error("Failed to load your collections.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUploads();
//   }, [activeButton, navigate]);


//   //fetching users 
//   const [currentUserId, setCurrentUserId] = useState(null);

// useEffect(() => {
//   const fetchCurrentUser = async () => {
//     try {
//       const user = await account.get();
//       setCurrentUserId(user.$id);
//     } catch (error) {
//       console.error("Not logged in or unable to fetch user.");
//     }
//   };

//   fetchCurrentUser();
// }, []);


//   const ImagePlaceholder = ({ type }) => (
//     <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 p-4 rounded-lg">
//       {type === "error" ? (
//         <>
//           <MdErrorOutline className="text-4xl mb-2" />
//           <p className="text-center text-sm">Media unavailable</p>
//         </>
//       ) : (
//         <>
//           {activeButton === "Photos" && <MdPhoto className="text-4xl mb-2" />}
//           {activeButton === "Videos" && <MdVideocam className="text-4xl mb-2" />}
//           {/* {activeButton === "Diary" && <MdBook className="text-4xl mb-2" />} */}
//           {activeButton === "Masterpieces" && <FaTrophy className="text-4xl mb-2"/>}
//           <p className="text-center text-sm">No media available</p>
//         </>
//       )}
//     </div>
//   );

//   // Lightbox animation variants
//   const lightboxVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
//   };

//   // Tooltip component
//   const Tooltip = ({ content, children }) => (
//     <div className="relative group">
//       {children}
//       <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
//         {content}
//         <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800 border-solid"></div>
//       </div>
//     </div>
//   );

//   // Action button component
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

//       {/* Navigation Tabs */}
//       <nav className="w-full max-w-7xl mx-auto px-4 py-4 bg-white dark:bg-gray-800 shadow-sm overflow-auto">
//         <div className="flex gap-4">
//           {["Photos", "Videos", "Masterpieces"].map((buttonName) => (
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
//               {buttonName === "Photos" && <MdPhoto className="text-lg" />}
//               {buttonName === "Videos" && <MdVideocam className="text-lg" />}
//               {/* {buttonName === "Diary" && <MdBook className="text-lg" />} */}
//               {buttonName === "Masterpieces" && <FaTrophy className="text-lg" />}
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

//       {/* Main Content */}
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
//         ) : uploads.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 dark:text-gray-400 text-lg font-Quicksand mb-4">
//               No {activeButton.toLowerCase()} found in your collection.
//             </p>
//             {/* <motion.button
//               onClick={() => navigate("/Account/Upload")}
//               className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Upload Your First {activeButton.slice(0, -1)}
//             </motion.button> */}
//             {currentUserId === userId && (
//             <motion.button
//             onClick={() => navigate("/Account/Upload")}
//             className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             >
//             Upload Your First {activeButton.slice(0, -1)}
//             </motion.button>
//            )}

//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {uploads.map((upload, index) => (
//               <motion.div
//                 key={upload.$id}
//                 className="relative flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-200"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {/* Image/Video Container */}
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
                  
//                   {/* Hover action buttons */}
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                     <button 
//                       onClick={() => openLightbox(index)}
//                       className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition-all"
//                       aria-label="View fullscreen"
//                     >
//                       <FiMaximize className="text-gray-800" />
//                     </button>
//                   </div>
                  
//                   {/* Tag Badge */}
//                   {/* {upload.tag && (
//                     <span className="absolute top-2 right-2 bg-violet-600 dark:bg-violet-500 text-white text-xs font-medium px-2 py-1 rounded-full capitalize">
//                       {upload.tag}
//                     </span>
//                   )} */}
//                   {upload.tag === "Masterpiece" && (
//                   <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
//                   <FaTrophy className="mr-1" />
//                   <span>Masterpiece</span>
//                   </div>
//                   )}
//                 </div>
                
//                 {/* Metadata Container */}
//                 <div className="p-3 md:p-4 flex flex-col gap-2">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
//                         {upload.title || "Untitled"}
//                       </h3>
//                       <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
//                         {upload.description || "No description"}
//                       </p>
//                     </div>
//                     <button className="text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 p-1">
//                       <FaEllipsisV size={14} />
//                     </button>
//                   </div>
                  
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-xs text-gray-400">
//                       {upload.formattedDate}
//                     </span>
                    
//                     <div className="flex gap-4">
//                       {/* Compact action buttons for smaller screens */}
//                         <Tooltip content="Views">
//                         <button 
//                           className="flex items-center gap-1 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"
//                         >
//                           <FaRegEye size={16} />
//                           <span className="text-xs">{upload.viewCount || 0}</span>
//                         </button>
//                       </Tooltip>
//                     </div>
//                   </div>
                  
//                   {/* Expanded action buttons for larger screens */}
//                   <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
//                       {/* Replace static like button with LikeButton */}
//                       <LikeButton targetId={upload.$id} targetType="artwork" />
//                     {/* download */}
//                     <div>
//                       <DownloadService artwork={upload} />
//                     </div>
//                     <ActionButton 
//                       icon={<FaRegComment />} 
//                       count={0}
//                       tooltip="Comments"
//                       onClick={() => toast.info("Comment functionality coming soon!")}
//                     />
//                     <div className="flex items-center space-x-2">
//                      <ShareButton artwork={upload} />
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Lightbox Modal */}
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
//               variants={lightboxVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {uploads[lightbox.index].isImage ? (
//                 <AppwriteImage
//                   fileId={uploads[lightbox.index].fileId}
//                   bucketId={config.bucketId}
//                   alt={uploads[lightbox.index].title || "Uploaded image"}
//                   className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
//                 />
//               ) : uploads[lightbox.index].isVideo ? (
//                 <video
//                   src={uploads[lightbox.index].mediaUrl}
//                   controls
//                   autoPlay
//                   className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
//                   onError={(e) => console.warn(`Failed to load video ${uploads[lightbox.index].fileId}:`, e)}
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
//                 <p className="text-lg">{uploads[lightbox.index].title || "Untitled"}</p>
//                 <p className="text-sm">{lightbox.index + 1} / {uploads.length}</p>
//                   <div className="absolute inset-0" onClick={() => openLightbox(index)}>
//                   <ArtworkViewTracker artworkId={uploads.$id} silent />
//                   </div>
//                   <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center">
//                   <FaRegEye className="mr-2" />
//                   <ArtworkViewTracker 
//                   artworkId={uploads[lightbox.index].$id}
//                   onViewUpdated={(count) => {
//                   // Update the local state to reflect new view count
//                   setUploads(prev => prev.map(u => 
//                   u.$id === uploads[lightbox.index].$id ? {...u, viewCount: count} : u
//                   ))}
//                   }
//                   />
//                   </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default




import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaArrowLeft, FaArrowRight, FaRegComment, FaRegHeart, FaRegEye, FaPlay, FaAward, FaTrophy } from "react-icons/fa";
import { FiMaximize } from "react-icons/fi";
import { MdPhoto, MdVideocam, MdBook, MdErrorOutline, MdMonetizationOn } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { PiShareFatLight } from 'react-icons/pi';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { databases, storage, account, Query, config } from '../../../appwriteConfig';
import LikeButton from '../../../EngagementService/likeButton';
import { engagementService } from '../../../EngagementService/engagementService';
import { recordArtworkView, getArtworkViewCount } from '../../../Views/viewService';
import ArtworkViewTracker from "../../../Views/viewsTracker";
import ShareButton from "../../../Share/ShareFunction";
import DownloadService from "../../../Downloads/downloadService";

const commercialDb = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
const sellerCollection = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;

function AppwriteImage({ fileId, bucketId, price, alt, className, ...props }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error || !fileId) {
    return (
      <div className={`${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg`}>
        <MdErrorOutline className="text-gray-400 dark:text-gray-500 text-3xl" />
        <span className="sr-only">Error loading image</span>
      </div>
    );
  }

  const src = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`;

  return (
    <>
      {loading && (
        <div className={`${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg`}>
          <div className="animate-pulse rounded-full h-10 w-10 bg-gray-300 dark:bg-gray-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'hidden' : 'block'}`}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={(e) => {
          console.error(`Failed to load image ${fileId}:`, e);
          setError(true);
        }}
        {...props}
      />
    </>
  );
}

function Your_Collections({ userId }) {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Photos");
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index > 0 ? prev.index - 1 : uploads.length - 1,
  }));
  const nextImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index < uploads.length - 1 ? prev.index + 1 : 0,
  }));

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (error) {
        console.error("Not logged in or unable to fetch user.");
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        setLoading(true);
        setError(null);

        // Base query for all documents
        const queries = [
          Query.equal("userId", userId),
          Query.orderDesc("uploadDate"),
          Query.limit(50),
          Query.select(["$id", "title", "description", "fileId", "medium", "tag", "userId", "uploadDate", "price", "status", 'awards'])
        ];

        const response = await databases.listDocuments(
          config.databaseId,
          config.collectionId,
          queries
        );

        const uploadsWithMedia = await Promise.all(
          response.documents.map(async (doc) => {
            const likeCount = await engagementService.getEngagementCount(doc.$id, 'like');
            const viewCount = await getArtworkViewCount(doc.$id);
            
            return {
              ...doc,
              mediaUrl: doc.fileId
                ? `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${doc.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`
                : null,
              isImage: ["Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", "Charcoal", "Pastel",
            "Pencil Drawing", "Graphite Drawing", "Tempera", "Fresco Painting", "Mosaic Art",
            "Glass Art", "Fiber Art", "Sand Art", "Digital Art", "Digital Painting", "Vector Art",
            "Pixel Art", "3D Modeling", "Photography", "Mixed Media", "Collage", "Printmaking",
            "AI-Generated Art", "Augmented Reality Art", "Virtual Reality Art", "NFT Art",
            "Data Visualization Art", "Calligraphy", "Typography Design", "Sculpture", "Ceramic",
            "Installation Art", "Kinetic Art", "Light Art", "Performance Art", "Sound Art", "Bio Art",
            "Graphic Design", "Industrial Design", "Fashion Design", "Interior Design",
            "Architectural Drawing", "Game Design", "Portrait Photography", "Landscape Photography", 
            "Street Photography", "Conceptual Photography", "Documentary Photography", "Micro Photography", "Other"].includes(doc.medium),
              isVideo: doc.medium === "Video",
              forSale: doc.price && doc.price > 0,
              isAward: doc.awards,
              awardName: doc.awardName || "Award Winner",
              formattedDate: new Date(doc.uploadDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              likeCount,
              viewCount
            };
          })
        );

        setUploads(uploadsWithMedia);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Failed to load collections: ${err.message}`);
        toast.error("Failed to load your collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [activeButton, navigate, userId]);

  const handleMarkAsSold = async (productId) => {
    try {
      await databases.updateDocument(
        commercialDb,
        sellerCollection,
        productId,
        {
          status: "sold",
          price: 0
        }
      );
      
      setUploads(prev => prev.map(u => 
        u.$id === productId ? {...u, status: "sold", price: 0} : u
      ));
      
      toast.success("Artwork marked as sold!");
    } catch (error) {
      console.error("Error marking as sold:", error);
      toast.error("Failed to mark as sold");
    }
  };

  const ImagePlaceholder = ({ type }) => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 p-4 rounded-lg">
      {type === "error" ? (
        <>
          <MdErrorOutline className="text-4xl mb-2" />
          <p className="text-center text-sm">Media unavailable</p>
        </>
      ) : (
        <>
          {activeButton === "Photos" && <MdPhoto className="text-4xl mb-2" />}
          {activeButton === "Videos" && <MdVideocam className="text-4xl mb-2" />}
          {activeButton === "Awards" && <FaAward className="text-4xl mb-2"/>}
          {activeButton === "Sell" && <MdMonetizationOn className="text-4xl mb-2"/>}
          <p className="text-center text-sm">No media available</p>
        </>
      )}
    </div>
  );

  // Filter artworks based on active tab
  const filteredUploads = uploads.filter(upload => {
    switch (activeButton) {
      case "Photos":
        return upload.isImage;
      case "Videos":
        return upload.isVideo;
      case "Awards":
        return upload.isAward;
      case "Sell":
        return upload.forSale;
      default:
        return true;
    }
  });

  const Tooltip = ({ content, children }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800 border-solid"></div>
      </div>
    </div>
  );

  const ActionButton = ({ icon, count, tooltip, onClick }) => (
    <Tooltip content={tooltip}>
      <button 
        onClick={onClick}
        className="flex flex-row gap-2 items-center text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 text-[15px]"
      >
        {icon}
        <span>{count}</span>
      </button>
    </Tooltip>
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-[#040d1200] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={5000} theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} />

      <nav className="w-full max-w-7xl mx-auto px-4 py-4 bg-white dark:bg-gray-800 shadow-sm overflow-auto">
        <div className="flex gap-4">
          {["Photos", "Videos", "Awards", "Sell"].map((buttonName) => (
            <motion.button
              key={buttonName}
              className={`relative px-4 py-2 flex items-center gap-2 text-sm font-medium font-Quicksand rounded-md transition-colors duration-200 ${
                activeButton === buttonName
                  ? "bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleButtonClick(buttonName)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {buttonName === "Photos" && <MdPhoto className="text-lg" />}
              {buttonName === "Videos" && <MdVideocam className="text-lg" />}
              {buttonName === "Awards" && <FaAward className="text-lg" />}
              {buttonName === "Sell" && <MdMonetizationOn className="text-lg" />}
              <span>{buttonName}</span>
              {activeButton === buttonName && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 dark:bg-violet-400"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 text-lg font-Quicksand mb-4">{error}</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry
            </motion.button>
          </div>
        ) : filteredUploads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg font-Quicksand mb-4">
              {activeButton === "Sell" 
                ? "No items listed for sale. Add a price to your artworks to sell them."
                : `No ${activeButton.toLowerCase()} found in your collection.`}
            </p>
            {currentUserId === userId && (
              <motion.button
                onClick={() => navigate("/Account/Upload")}
                className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeButton === "Sell" 
                  ? "Upload Artwork to Sell"
                  : `Upload Your First ${activeButton.slice(0, -1)}`}
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredUploads.map((upload, index) => (
              <motion.div
                key={upload.$id}
                className="relative flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden group">
                  {upload.mediaUrl && upload.isImage ? (
                    <AppwriteImage
                      fileId={upload.fileId}
                      bucketId={config.bucketId}
                      alt={upload.title || "Uploaded image"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : upload.mediaUrl && upload.isVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        src={upload.mediaUrl}
                        className="w-full h-full object-cover"
                        onError={(e) => console.warn(`Failed to load video ${upload.fileId}:`, e)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                        <FaPlay className="text-white text-2xl opacity-80" />
                      </div>
                    </div>
                  ) : (
                    <ImagePlaceholder type="error" />
                  )}
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => openLightbox(index)}
                      className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                      aria-label="View fullscreen"
                    >
                      <FiMaximize className="text-gray-800" />
                    </button>
                  </div>
                  
                  {upload.tag === "Award" && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
                      <FaAward className="mr-1" />
                      <span>Award</span>
                    </div>
                  )}
                </div>
                
                <div className="p-3 md:p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm md:text-base text-gray-900 dark:text-gray-100 line-clamp-1 font-Quicksand">
                        {upload.title || "Untitled"}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 font-Playfair">
                        {upload.description || "No description"}
                      </p>
                      <h1 className="font-Playfair">
                       <span> {upload.awards}</span>
                      </h1>
                    </div>
                    <button className="text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 p-1">
                      <FaEllipsisV size={14} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    {upload.price ? (
                      <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                        ₹{upload.price.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">
                        {upload.formattedDate}
                      </span>
                    )}
                    
                    <div className="flex gap-4">
                      <Tooltip content="Views">
                        <button 
                          className="flex items-center gap-1 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"
                        >
                          <FaRegEye size={16} />
                          <span className="text-xs">{upload.viewCount || 0}</span>
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
                    <LikeButton targetId={upload.$id} targetType="artwork" />
                    <DownloadService artwork={upload} />
                    <ActionButton 
                      icon={<FaRegComment />} 
                      count={0}
                      tooltip="Comments"
                      onClick={() => toast.info("Comment functionality coming soon!")}
                    />
                    <ShareButton artwork={upload} />
                  </div>

                  {activeButton === "Sell" && (
                    <div className="mt-2 flex gap-2">
                      {upload.price ? (
                        <>
                          <button 
                            onClick={() => handleMarkAsSold(upload.$id)}
                            className="flex-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Mark as Sold
                          </button>
                          <button 
                            onClick={() => navigate(`/Account/Edit/${upload.$id}`)}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => navigate(`/Account/Edit/${upload.$id}`)}
                          className="w-full px-3 py-1 text-sm bg-violet-600 text-white rounded hover:bg-violet-700"
                        >
                          Set Price
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative max-w-6xl w-full"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredUploads[lightbox.index].isImage ? (
                <AppwriteImage
                  fileId={filteredUploads[lightbox.index].fileId}
                  bucketId={config.bucketId}
                  alt={filteredUploads[lightbox.index].title || "Uploaded image"}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
              ) : filteredUploads[lightbox.index].isVideo ? (
                <video
                  src={filteredUploads[lightbox.index].mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  onError={(e) => console.warn(`Failed to load video ${filteredUploads[lightbox.index].fileId}:`, e)}
                />
              ) : (
                <ImagePlaceholder type="error" />
              )}
              <motion.button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-md hover:bg-black/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose size={16} />
              </motion.button>
              <motion.button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowLeft size={20} />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowRight size={20} />
              </motion.button>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white font-Quicksand">
                <p className="text-lg">{filteredUploads[lightbox.index].title || "Untitled"}</p>
                <p className="text-sm">{lightbox.index + 1} / {filteredUploads.length}</p>
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center">
                  <FaRegEye className="mr-2" />
                  <ArtworkViewTracker 
                    artworkId={filteredUploads[lightbox.index].$id}
                    onViewUpdated={(count) => {
                      setUploads(prev => prev.map(u => 
                        u.$id === filteredUploads[lightbox.index].$id ? {...u, viewCount: count} : u
                      ));
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Your_Collections;