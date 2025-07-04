// import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { FaThumbsUp, FaRegThumbsUp, FaShare } from "react-icons/fa";
// import { BiCommentEdit } from "react-icons/bi";
// import { FiDownload, FiGrid } from "react-icons/fi";
// import { IoClose, IoEyeOutline, IoInformationCircleOutline } from "react-icons/io5";
// import { PiShareFatThin } from 'react-icons/pi';
// import ShareButton from '../../Share/ShareFunction';
// import DownloadService from '../../Downloads/downloadService';
// import FollowButton from '../../Follow/FollowButton';
// import LikeButton from '../../EngagementService/likeButton';
// import ArtworkViewTracker from '../../Views/viewsTracker';

// const images = [
//   "/Image-of-Collection/abstract.jpg",
//   "/Image-of-Collection/pexels-eberhardgross-1367192.jpg",
//   "/Image-of-Collection/pexels-philippedonn-1133957.jpg",
//   "/Image-of-Collection/pexels-pixabay-147411.jpg",
//   "/Image-of-Collection/pexels-rafael-guajardo-194140-604684.jpg",
//   "/Image-of-Collection/pexels-singkham-178541-1108572.jpg",
//   "/Image-of-Collection/blossoms.jpg",
//   "/Image-of-Collection/city.jpg",
//   "/Image-of-Collection/digital.jpg",
//   "/Image-of-Collection/dino.jpg",
//   "/Image-of-Collection/dream.jpg",
//   "/Image-of-Collection/pexels-dax-dexter-delada-2150239947-31090348.jpg",
//   "/Image-of-Collection/pexels-shaosong-sun-503031340-16100671.jpg",
//   "/Image-of-Collection/pexels-lyulog-26794592.jpg",
//   "/Image-of-Collection/pexels-efrem-efre-2786187-28965971.jpg"
// ];

// // Responsive heights for different screen sizes
// const heights = {
//   mobile: [150, 200, 180, 250, 220, 150, 200, 200, 200, 280, 260, 150, 200, 220, 200],
//   tablet: [180, 250, 220, 300, 280, 180, 250, 250, 250, 350, 320, 180, 250, 280, 250],
//   desktop: [200, 300, 250, 400, 350, 200, 300, 300, 300, 450, 415, 200, 300, 350, 300]
// };

// function Grid() {
//   const [hoveredButton, setHoveredButton] = useState(null);
//   const [likedImages, setLikedImages] = useState({});
//   const [lovedImages, setLovedImages] = useState(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
//     const initialLoved = {};
//     images.forEach((img, index) => {
//       initialLoved[index] = storedFavorites.includes(img);
//     });
//     return initialLoved;
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   // Get appropriate heights based on screen size
//   const getHeights = () => {
//     if (windowSize.width < 640) return heights.mobile;
//     if (windowSize.width < 1024) return heights.tablet;
//     return heights.desktop;
//   };

//   const currentHeights = getHeights();

//   const toggleLike = useCallback((index) => {
//     setLikedImages((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   }, []);

//   const toggleLove = useCallback((index) => {
//     setLovedImages((prev) => {
//       const isCurrentlyLoved = prev[index];
//       const updatedLovedImages = { 
//         ...prev, 
//         [index]: !isCurrentlyLoved 
//       };

//       const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
//       let updatedFavorites;
//       if (!isCurrentlyLoved) {
//         if (!storedFavorites.includes(images[index])) {
//           updatedFavorites = [...storedFavorites, images[index]];
//         } else {
//           updatedFavorites = storedFavorites;
//         }
//       } else {
//         updatedFavorites = storedFavorites.filter(img => img !== images[index]);
//       }

//       localStorage.setItem("favoriteImages", JSON.stringify([...new Set(updatedFavorites)]));
//       return updatedLovedImages;
//     });
//   }, []);

//   const downloadImage = useCallback((src) => {
//     const link = document.createElement('a');
//     link.href = src;
//     link.download = src.split("/").pop();
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }, []);

//   const handleShare = useCallback(async () => {
//     const shareData = {
//       title: "Check out this artwork!",
//       text: "I found this amazing artwork on Painters' Diary. Take a look!",
//       url: window.location.href,
//     };
  
//     try {
//       if (!navigator.share) {
//         const fallbackMessage = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
//         await navigator.clipboard.writeText(fallbackMessage);
//         alert("Share not supported. Link copied to clipboard instead!");
//         return;
//       }
  
//       await navigator.share(shareData);
//     } catch (error) {
//       if (error.name !== "AbortError") {
//         try {
//           await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
//           alert("Sharing failed, but the link was copied to your clipboard!");
//         } catch (clipError) {
//           alert("Sharing unavailable. Please copy the URL manually: " + shareData.url);
//         }
//       }
//     }
//   }, []);

//   // Close modal on Escape key press
//   const handleKeyDown = useCallback((e) => {
//     if (e.key === "Escape" && selectedImage) {
//       setSelectedImage(null);
//     }
//   }, [selectedImage]);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Add/remove event listener for Escape key
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleKeyDown]);

//   useEffect(() => {
//     AOS.init({ 
//       duration: 800,
//       once: true // Animations only happen once
//     });
//   }, []);

//   // Sync favorites from localStorage
//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
//     const syncedLoved = {};
//     images.forEach((img, index) => {
//       syncedLoved[index] = storedFavorites.includes(img);
//     });
//     setLovedImages(syncedLoved);
//   }, []);

//   return (
//     <>
//       <div className="columns-1 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-5 gap-3 bg-maroon py-6 px-3 sm:px-4">
//         {images.map((src, index) => (
//           <div
//             key={index}
//             className="relative rounded-lg shadow-lg group overflow-hidden break-inside-avoid mb-3"
//             data-aos="fade-up"
//             style={{
//               backgroundImage: `url(${src})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: `${currentHeights[index]}px`,
//             }}
//           >
//             {/* Gradient overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
//             {/* Love button */}
//         {/*    <button
//               className="absolute top-2 right-2 h-8 w-8 bg-white/50 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors z-10"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleLove(index);
//               }}
//               onMouseEnter={() => setHoveredButton(`love-${index}`)}
//               onMouseLeave={() => setHoveredButton(null)}
//               aria-label={lovedImages[index] ? "Unlove this image" : "Love this image"}
//             >
//               {lovedImages[index] ? (
//                 <AiFillHeart className="text-red-600 text-xl" />
//               ) : (
//                 <AiOutlineHeart className="text-gray-800 text-xl" />
//               )}
//               {hoveredButton === `love-${index}` && (
//                 <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
//                   {lovedImages[index] ? "Loved" : "Love"}
//                 </div>
//               )}
//             </button>*/}

//             {/* Info button */}
//             <button
//               className="absolute top-2 right-2 h-8 w-8 bg-white/50 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors z-10"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImage(src);
//                 setSelectedImageIndex(index);
//               }}
//               onMouseEnter={() => setHoveredButton(`info-${index}`)}
//               onMouseLeave={() => setHoveredButton(null)}
//               aria-label="View image details"
//             >
//               <IoInformationCircleOutline className="text-gray-800 text-xl" />
//               {hoveredButton === `info-${index}` && (
//                 <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
//                   Info
//                 </div>
//               )}
//             </button>

//             {/* Bottom action buttons */}
//             <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center z-10">
//               <Link to="/Account" className="flex-shrink-0">
//                 <div 
//                   className="h-10 w-10 bg-red-500 rounded-full"
//                   onMouseEnter={() => setHoveredButton(`profile-${index}`)}
//                   onMouseLeave={() => setHoveredButton(null)}
//                   aria-label="View profile"
//                 >
//                   {hoveredButton === `profile-${index}` && (
//                     <div className="absolute bottom-full mb-2 font-bold w-max bg-black text-white text-sm rounded px-2 py-1">
//                       Profile
//                     </div>
//                   )}
//                 </div>
//               </Link>
              
//               <div className="flex items-center gap-1 sm:gap-2">
//                 {/* <button
//                   className={`h-8 w-8 rounded flex items-center justify-center relative ${
//                     likedImages[index] ? "bg-gray-500" : "hover:bg-gray-600"
//                   }`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleLike(index);
//                   }}
//                   onMouseEnter={() => setHoveredButton(`like-${index}`)}
//                   onMouseLeave={() => setHoveredButton(null)}
//                   aria-label={likedImages[index] ? "Unlike this image" : "Like this image"}
//                 >
//                   {likedImages[index] ? (
//                     <FaThumbsUp size={16} className="text-white" />
//                   ) : (
//                     <FaRegThumbsUp size={16} className="text-white" />
//                   )}
//                   {hoveredButton === `like-${index}` && (
//                     <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
//                       {likedImages[index] ? "Liked" : "Like"}
//                     </div>
//                   )}
//                 </button> */}

//                 <button
//                   className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-600 relative"
//                   onMouseEnter={() => setHoveredButton(`comment-${index}`)}
//                   onMouseLeave={() => setHoveredButton(null)}
//                   aria-label="Comment on this image"
//                 >
//                   <BiCommentEdit size={18} className="text-white" />
//                   {hoveredButton === `comment-${index}` && (
//                     <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
//                       Comment
//                     </div>
//                   )}
//                 </button>

//                 <button
//                   className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-600 relative"
//                   onMouseEnter={() => setHoveredButton(`similar-${index}`)}
//                   onMouseLeave={() => setHoveredButton(null)}
//                   aria-label="View similar images"
//                 >
//                   <FiGrid size={16} className="text-white" />
//                   {hoveredButton === `similar-${index}` && (
//                     <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
//                       Similar
//                     </div>
//                   )}
//                 </button>

//                 <button
//                   className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-600 relative"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     downloadImage(src);
//                   }}
//                   onMouseEnter={() => setHoveredButton(`download-${index}`)}
//                   onMouseLeave={() => setHoveredButton(null)}
//                   aria-label="Download this image"
//                 >
//                   <FiDownload size={16} className="text-white" />
//                   {hoveredButton === `download-${index}` && (
//                     <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
//                       Download
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Enhanced Lightbox Modal */}
//       {selectedImage && (
//         <div 
//           className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-y-auto p-4"
//           onClick={() => setSelectedImage(null)}
//         >
//           <div 
//             className="bg-[#edf2fa] rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <button
//               className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
//               onClick={() => setSelectedImage(null)}
//               aria-label="Close lightbox"
//             >
//               <IoClose className="text-gray-800 text-2xl" />
//             </button>

//             {/* Modal content */}
//             <div className="flex flex-col lg:flex-row h-full">
//               {/* Image section - takes full width on mobile, 2/3 on desktop */}
//               <div className="lg:w-2/3 w-full p-4 flex items-center justify-center bg-gray-100">
//                 <img 
//                   className="max-h-[70vh] w-auto object-contain" 
//                   src={selectedImage} 
//                   alt="Selected artwork" 
//                   loading="eager"
//                 />
//               </div>

//               {/* Info section - takes full width on mobile, 1/3 on desktop */}
//               <div className="lg:w-1/3 w-full p-4 flex flex-col">
//                 {/* User info */}
//                 <div className="flex items-center gap-3 mb-4">
//                  <Link to={'/account'}>
//                     <div className="w-16 h-16 rounded-full bg-black flex-shrink-0"></div>
//                  </Link>
//                   <div>
//                     <h2 className="text-xl font-bold">Username</h2>
//                     <button className="text-sm border border-gray-500 rounded px-2 py-1 hover:bg-gray-200 transition-colors">
//                       Follow
//                     </button>
//                       {/* <div className=' pl-3'>
//                         <FollowButton targetUserId={allImages.user?.id || image.$id} />
//                       </div> */}
//                   </div>
//                 </div>

//                 {/* Image info */}
//                 <div className="mb-4">
//                   <h1 className="text-2xl font-bold mb-2">Artwork Title</h1>
//                   <p className="text-gray-700">
//                     This is a detailed description of the artwork. It might include the inspiration behind it, 
//                     techniques used, or any other relevant information the artist wants to share.
//                   </p>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 gap-2 mb-4">
//                   <div className="bg-white rounded-lg p-2 text-center">
//                     <IoEyeOutline className="inline-block mr-1" />
//                     <span>1.2K Views</span>
//                   </div>
//                   <div className="bg-white rounded-lg p-2 text-center">
//                     <FaRegThumbsUp className="inline-block mr-1" />
//                     <span>856 Likes</span>
//                   </div>
//                   <div className="bg-white rounded-lg p-2 text-center">
//                     <FiDownload className="inline-block mr-1" />
//                     <span>432 Downloads</span>
//                   </div>
//                   <div className="bg-white rounded-lg p-2 text-center">
//                     <PiShareFatThin className="inline-block mr-1" />
//                     <span>128 Shares</span>
//                   </div>
//                 </div>

//                 {/* Date */}
//                 <div className="text-sm text-gray-500 mb-4">
//                   Updated: {new Date().toLocaleDateString()}
//                 </div>

//                 {/* Action buttons */}
//                 <div className="flex flex-wrap gap-2 mt-auto">
//                   <button
//                     className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
//                       lovedImages[selectedImageIndex] 
//                         ? "bg-red-100 border-red-300 text-red-600" 
//                         : "border-gray-500 hover:bg-gray-100"
//                     }`}
//                     onClick={() => toggleLove(selectedImageIndex)}
//                   >
//                     {lovedImages[selectedImageIndex] ? (
//                       <AiFillHeart className="text-red-600" />
//                     ) : (
//                       <AiOutlineHeart />
//                     )}
//                     <span>Favorite</span>
//                   </button>

//                   <button
//                     className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-500 hover:bg-gray-100"
//                     onClick={() => downloadImage(selectedImage)}
//                   >
//                     <FiDownload />
//                     <span>Download</span>
//                   </button>

//                   <button
//                     className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-500 hover:bg-gray-100"
//                     onClick={handleShare}
//                   >
//                     <PiShareFatThin />
//                     <span>Share</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Grid;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FiHeart, FiDownload, FiShare2 } from "react-icons/fi";
// import { IoMdInformationCircleOutline } from "react-icons/io";

// const images = [
//   { src: "/Image-of-Collection/abstract.jpg", title: "Abstract Harmony", artist: "Jane Doe" },
//   { src: "/Image-of-Collection/pexels-eberhardgross-1367192.jpg", title: "Mountain Dawn", artist: "John Smith" },
//   { src: "/Image-of-Collection/pexels-philippedonn-1133957.jpg", title: "Forest Light", artist: "Emma Wilson" },
//   { src: "/Image-of-Collection/pexels-pixabay-147411.jpg", title: "Urban Geometry", artist: "Michael Chen" },
//   { src: "/Image-of-Collection/pexels-rafael-guajardo-194140-604684.jpg", title: "Street Moments", artist: "Sarah Johnson" },
//   { src: "/Image-of-Collection/pexels-singkham-178541-1108572.jpg", title: "Portrait Study", artist: "David Kim" },
// ];

// function Grid() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [savedImages, setSavedImages] = useState([]);

//   // Toggle save image
//   const toggleSave = (index) => {
//     const newSaved = [...savedImages];
//     if (newSaved.includes(index)) {
//       setSavedImages(newSaved.filter(i => i !== index));
//     } else {
//       setSavedImages([...newSaved, index]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <h1 className="text-3xl font-light text-gray-900 mb-2">Art Collection</h1>
//         <p className="text-gray-600">Discover and explore creative works</p>
//       </div>

//       {/* Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {images.map((img, index) => (
//           <div 
//             key={index}
//             className="relative group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             {/* Image */}
//             <div className="aspect-square overflow-hidden">
//               <img
//                 src={img.src}
//                 alt={img.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 loading="lazy"
//               />
//             </div>

//             {/* Overlay */}
//             <div 
//               className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
//                 hoveredIndex === index ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               <h3 className="text-white font-medium text-lg">{img.title}</h3>
//               <p className="text-white/80 text-sm">{img.artist}</p>
//             </div>

//             {/* Quick Actions */}
//             <div className="absolute top-3 right-3 flex space-x-2">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleSave(index);
//                 }}
//                 className={`p-2 rounded-full backdrop-blur-sm transition-all ${
//                   savedImages.includes(index) 
//                     ? 'bg-red-500/90 text-white' 
//                     : 'bg-white/80 text-gray-800 hover:bg-white'
//                 }`}
//               >
//                 <FiHeart className={`transition-transform ${
//                   savedImages.includes(index) ? 'fill-current' : ''
//                 }`} />
//               </button>
              
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedImage(img);
//                 }}
//                 className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white transition-all"
//               >
//                 <IoMdInformationCircleOutline />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

      // {/* Lightbox */}
      // {selectedImage && (
      //   <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      //     <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden">
      //       <div className="relative">
      //         {/* Close button */}
      //         <button
      //           onClick={() => setSelectedImage(null)}
      //           className="absolute top-4 right-4 bg-white/90 rounded-full p-2 z-10 hover:bg-white transition-all"
      //         >
      //           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      //           </svg>
      //         </button>

      //         {/* Image */}
      //         <div className="aspect-video bg-gray-100 flex items-center justify-center">
      //           <img
      //             src={selectedImage.src}
      //             alt={selectedImage.title}
      //             className="max-h-[70vh] w-auto object-contain"
      //           />
      //         </div>

      //         {/* Info */}
      //         <div className="p-6">
      //           <div className="flex justify-between items-start mb-4">
      //             <div>
      //               <h2 className="text-2xl font-light text-gray-900">{selectedImage.title}</h2>
      //               <p className="text-gray-600">by {selectedImage.artist}</p>
      //             </div>
      //             <div className="flex space-x-2">
      //               <button
      //                 onClick={() => toggleSave(images.findIndex(img => img.src === selectedImage.src))}
      //                 className={`p-3 rounded-lg flex items-center space-x-2 ${
      //                   savedImages.includes(images.findIndex(img => img.src === selectedImage.src)) 
      //                     ? 'bg-red-50 text-red-600' 
      //                     : 'bg-gray-100 text-gray-800'
      //                 }`}
      //               >
      //                 <FiHeart className={savedImages.includes(images.findIndex(img => img.src === selectedImage.src)) ? 'fill-current' : ''} />
      //                 <span>Save</span>
      //               </button>
      //               <button className="p-3 rounded-lg bg-gray-100 text-gray-800 flex items-center space-x-2">
      //                 <FiDownload />
      //                 <span>Download</span>
      //               </button>
      //               <button className="p-3 rounded-lg bg-gray-100 text-gray-800 flex items-center space-x-2">
      //                 <FiShare2 />
      //                 <span>Share</span>
      //               </button>
      //             </div>
      //           </div>

      //           <div className="pt-4 border-t border-gray-200">
      //             <h3 className="font-medium mb-2">About this artwork</h3>
      //             <p className="text-gray-600">
      //               This piece explores the relationship between color and form. The artist used 
      //               acrylic paints on canvas to create this vibrant composition.
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// }

// export default Grid;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiDownload, FiShare2 } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";

const images = [
  { src: "/Image-of-Collection/abstract.jpg", title: "Abstract Harmony", artist: "Jane Doe", aspect: "portrait" },
  { src: "/Image-of-Collection/pexels-eberhardgross-1367192.jpg", title: "Mountain Dawn", artist: "John Smith", aspect: "landscape" },
  { src: "/Image-of-Collection/pexels-philippedonn-1133957.jpg", title: "Forest Light", artist: "Emma Wilson", aspect: "square" },
  { src: "/Image-of-Collection/pexels-pixabay-147411.jpg", title: "Urban Geometry", artist: "Michael Chen", aspect: "portrait" },
  { src: "/Image-of-Collection/pexels-rafael-guajardo-194140-604684.jpg", title: "Street Moments", artist: "Sarah Johnson", aspect: "landscape" },
  { src: "/Image-of-Collection/pexels-singkham-178541-1108572.jpg", title: "Portrait Study", artist: "David Kim", aspect: "portrait" },
  { src: "/Image-of-Collection/blossoms.jpg", title: "Spring Blossoms", artist: "Lisa Wong", aspect: "landscape" },
  { src: "/Image-of-Collection/city.jpg", title: "Metropolis", artist: "Carlos Mendez", aspect: "landscape" },
  { src: "/Image-of-Collection/digital.jpg", title: "Digital Dreams", artist: "Aisha Patel", aspect: "square" },
  { src: "/Image-of-Collection/dino.jpg", title: "Prehistoric", artist: "Tom Hanks", aspect: "portrait" },
  { src: "/Image-of-Collection/dream.jpg", title: "Surreal Vision", artist: "Sophie Martin", aspect: "landscape" },
  { src: "/Image-of-Collection/pexels-dax-dexter-delada-2150239947-31090348.jpg", title: "Lonely Road", artist: "Dax Dexter", aspect: "portrait" },
];

function Grid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [savedImages, setSavedImages] = useState([]);

  const toggleSave = (index) => {
    const newSaved = [...savedImages];
    if (newSaved.includes(index)) {
      setSavedImages(newSaved.filter(i => i !== index));
    } else {
      setSavedImages([...newSaved, index]);
    }
  };

  // Get aspect ratio class
  const getAspectClass = (aspect) => {
    switch(aspect) {
      case "portrait": return "aspect-[3/4]";
      case "landscape": return "aspect-[4/3]";
      default: return "aspect-square";
    }
  };

    const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      {/* <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-3">Art Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover inspiring works from talented artists around the world
        </p>
      </div> */}

      {/* Enhanced Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`relative group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
              index % 5 === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container */}
            <div className={`w-full h-full ${getAspectClass(img.aspect)} ${
              index % 5 === 0 ? "lg:aspect-[5/4]" : ""
            }`}>
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Floating Info Panel */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
              flex flex-col justify-end p-5 transition-all duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0 translate-y-2"
              }`}
            >
              <div className="transform transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-white font-medium text-lg mb-1">{img.title}</h3>
                <p className="text-white/80 text-sm">{img.artist}</p>
              </div>
            </div>

            {/* Floating Action Buttons */}
            <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
              hoveredIndex === index ? "opacity-100" : "opacity-0 translate-y-2"
            }`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(index);
                }}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  savedImages.includes(index) 
                    ? 'bg-red-500/90 text-white shadow-md' 
                    : 'bg-white/90 text-gray-800 hover:bg-white'
                }`}
              >
                <FiHeart className={`text-lg ${savedImages.includes(index) ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                }}
                className="p-2 rounded-full bg-white/90 backdrop-blur-md text-gray-800 hover:bg-white transition-all shadow-sm"
              >
                <IoMdInformationCircleOutline className="text-lg" />
              </button>
            </div>

            {/* Subtle Corner Accent */}
            <div className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 rotate-45 bg-white/20"></div>
          </div>
        ))}
      </div>

      {/* Lightbox (same as before) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* ... (keep your existing lightbox implementation) ... */}
                {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)
                }
                
                className="absolute top-4 right-4 bg-white/90 rounded-full p-2 z-10 hover:bg-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-light text-gray-900">{selectedImage.title}</h2>
                    <p className="text-gray-600">by {selectedImage.artist}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleSave(images.findIndex(img => img.src === selectedImage.src))}
                      className={`p-3 rounded-lg flex items-center space-x-2 ${
                        savedImages.includes(images.findIndex(img => img.src === selectedImage.src)) 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <FiHeart className={savedImages.includes(images.findIndex(img => img.src === selectedImage.src)) ? 'fill-current' : ''} />
                      <span>Save</span>
                    </button>
                    <button className="p-3 rounded-lg bg-gray-100 text-gray-800 flex items-center space-x-2">
                      <FiDownload />
                      <span>Download</span>
                    </button>
                    <button className="p-3 rounded-lg bg-gray-100 text-gray-800 flex items-center space-x-2">
                      <FiShare2 />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">About this artwork</h3>
                  <p className="text-gray-600">
                    This piece explores the relationship between color and form. The artist used 
                    acrylic paints on canvas to create this vibrant composition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default Grid;