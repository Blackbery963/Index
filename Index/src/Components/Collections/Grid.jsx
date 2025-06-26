
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { MdVisibility } from "react-icons/md";
// import { FaDownload, FaThumbsUp, FaShare, FaRegThumbsUp, FaRegEye, } from "react-icons/fa";
// import { BiCommentEdit } from "react-icons/bi";
// import { FiDownload, FiGrid } from "react-icons/fi";
// import {IoClose, IoEyeOutline, IoInformationCircleOutline} from "react-icons/io5"
// import {PiShareFatThin} from 'react-icons/pi'

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

// function Grid() {
//   const heights = [200, 300, 250, 400, 350, 200, 300, 300, 300, 450, 415, 200, 300, 350, 300,];
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

//   const toggleLike = (index) => {
//     setLikedImages((prevLikedImages) => ({
//       ...prevLikedImages,
//       [index]: !prevLikedImages[index],
//     }));
//   };

//   const toggleLove = (index) => {
//     setLovedImages((prevLovedImages) => {
//       const isCurrentlyLoved = prevLovedImages[index];
//       const updatedLovedImages = { 
//         ...prevLovedImages, 
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
//   };

//   const downloadImage = (src) => {
//     const link = document.createElement('a');
//     link.href = src;
//     link.download = src.split("/").pop();
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   useEffect(() => {
//     AOS.init({ duration: 800 });
//   }, []);

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
//     const syncedLoved = {};
//     images.forEach((img, index) => {
//       syncedLoved[index] = storedFavorites.includes(img);
//     });
//     setLovedImages(syncedLoved);
//   }, []);

//   const handleShare = async () => {
//     // Define share data
//     const shareData = {
//       title: "Check out this artwork!",
//       text: "I found this amazing artwork on Painters' Diary. Take a look!",
//       url: window.location.href,
//     };
  
//     try {
//       // Check if Web Share API is supported
//       if (!navigator.share) {
//         // Fallback for unsupported browsers
//         const fallbackMessage = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
//         await navigator.clipboard.writeText(fallbackMessage);
//         alert("Share not supported. Link copied to clipboard instead!");
//         console.log("Fallback: Copied to clipboard");
//         return;
//       }
  
//       // Attempt to share using Web Share API
//       await navigator.share(shareData);
//       console.log("Shared successfully!");
//     } catch (error) {
//       // Handle specific errors or provide fallback
//       if (error.name === "AbortError") {
//         console.log("User canceled the share action.");
//       } else {
//         console.error("Sharing failed:", error);
//         // Fallback to clipboard if share fails (e.g., permission denied)
//         try {
//           await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
//           alert("Sharing failed, but the link was copied to your clipboard!");
//         } catch (clipError) {
//           console.error("Clipboard fallback failed:", clipError);
//           alert("Sharing unavailable. Please copy the URL manually: " + shareData.url);
//         }
//       }
//     }
//   };


//   return (
//     <>
//       <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 bg-maroon py-10 px-4">
//         {images.map((src, index) => (
//           <div
//             key={index}
//             loading="lazy"
//             className="relative rounded-lg shadow-lg group overflow-hidden break-inside-avoid mb-4"
//             data-aos="fade-up"
//             style={{
//               backgroundImage: `url(${src})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: `${heights[index]}px`,
//             }}
//           >
//             {/* Existing hover gradient */}
//             <div className="h-[40%] w-[100%] bg-gradient-to-b from-transparent to-black absolute bottom-[-40%] transition-all ease-linear duration-500 group-hover:bottom-0"></div>
            
//             {/* New gradient fade effect (always visible) */}
//             <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

//             <div
//               className="h-8 w-8 absolute top-2 right-2 bg-white/50 backdrop-blur-md rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/80 z-10"
//               onClick={() => toggleLove(index)}
//               onMouseEnter={() => setHoveredButton(`love-${index}`)}
//               onMouseLeave={() => setHoveredButton(null)}
//             >
//               {lovedImages[index] ? (
//                 <AiFillHeart className="text-red-600 text-xl" />
//               ) : (
//                 <AiOutlineHeart className="text-gray-800 text-xl" />
//               )}
//               {hoveredButton === `love-${index}` && (
//                 <div className="absolute bottom-full mb-2 w-max bg-black text-white text-balance rounded px-2 py-1">
//                   {lovedImages[index] ? "Loved" : "Love"}
//                 </div>
//               )}
//             </div>

//             <div className="w-[100%] flex items-center justify-between absolute bottom-3 opacity-0 transition-opacity duration-500 ease-linear group-hover:opacity-100 pl-3 pr-3 z-10">
//               <Link to={'/Account'}>
//                 <div className="h-[50px] lg:h-[55px] w-[50px] lg:w-[55px] bg-red-500 rounded-full"
//                   onMouseEnter={() => setHoveredButton(`profile-${index}`)}
//                   onMouseLeave={() => setHoveredButton(null)}
//                 >
//                   {hoveredButton === `profile-${index}` && (
//                     <div className="absolute bottom-full mb-2 font-bold w-max bg-black text-white text-balance rounded px-2 py-1">
//                       Profile
//                     </div>
//                   )}
//                 </div>
//               </Link>
        
// <div className="flex items-center justify-center gap-3">
//   <div
//     className={`h-[30px] w-[30px] rounded-lg flex items-center justify-center cursor-pointer relative p-1 ${
//       likedImages[index] ? "bg-gray-500" : "hover:bg-gray-600"
//     }`}
//     onClick={() => toggleLike(index)}
//     onMouseEnter={() => setHoveredButton(`like-${index}`)}
//     onMouseLeave={() => setHoveredButton(null)}
//   >
//     {likedImages[index] ? <FaThumbsUp size={18} className="text-white" /> : <FaRegThumbsUp size={18} className="text-white" />}
//     {hoveredButton === `like-${index}` && (
//       <div className="absolute bottom-full mb-2 w-max bg-black text-white text-balance rounded px-2 py-1">
//         {likedImages[index] ? "Liked" : "Like"}
//       </div>
//     )}
//   </div>

//   <div
//     className="h-[30px] w-[30px] rounded-lg flex items-center justify-center cursor-pointer relative p-1 hover:bg-gray-600"
//     onMouseEnter={() => setHoveredButton(`comment-${index}`)}
//     onMouseLeave={() => setHoveredButton(null)}
//   >
//     <BiCommentEdit size={20} className="text-white" />
//     {hoveredButton === `comment-${index}` && (
//       <div className="absolute bottom-full mb-2 w-max bg-black text-white text-balance rounded px-2 py-1">
//         Comment
//       </div>
//     )}
//   </div>

//   <div
//     className="h-[30px] w-[30px] rounded-lg flex items-center justify-center cursor-pointer relative p-1 hover:bg-gray-600"
//     onMouseEnter={() => setHoveredButton(`similiar-${index}`)}
//     onMouseLeave={() => setHoveredButton(null)}
//   >
//     <FiGrid ize={20} className="text-white" />
//     {hoveredButton === `similiar-${index}` && (
//       <div className="absolute bottom-full mb-2 w-max bg-black text-white text-balance rounded px-2 py-1">
//         Similiar
//       </div>
//     )}
//   </div>

//   <div
//     className="h-[30px] w-[30px] rounded-lg flex items-center justify-center cursor-pointer relative p-1 hover:bg-gray-600"
//     onMouseEnter={() => setHoveredButton(`download-${index}`)}
//     onMouseLeave={() => setHoveredButton(null)}
//     onClick={() => downloadImage(src)}
//   >
//     <FiDownload ize={20} className="text-white" />
//     {hoveredButton === `download-${index}` && (
//       <div className="absolute bottom-full mb-2 w-max bg-black text-white text-balance rounded px-2 py-1">
//         Download
//       </div>
//     )}
//   </div>

//   <div
//     className="h-[30px] w-[30px] rounded-lg flex items-center justify-center cursor-pointer relative p-1 hover:bg-gray-600"
//     onClick={() => {
//       setSelectedImage(src);
//       setSelectedImageIndex(index);
//     }}
//     onMouseEnter={() => setHoveredButton(`info-${index}`)}
//     onMouseLeave={() => setHoveredButton(null)}
//   >
//     <IoInformationCircleOutline size={20} className="text-white" />
//     {hoveredButton === `info-${index}` && (
//       <div className="absolute bottom-full mb-2 w-max bg-black text-white text-balance rounded px-2 py-1">
//         Info
//       </div>
//     )}
//   </div>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Lightbox Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//           <div className="main-container w-full max-w-[1200px] h-auto mx-auto relative mt-8 pl-4 pb-4">
//             <div className="lg:w-[95%] md:w-[94%] sm:w-[92%] w-[90%] bg-[#edf2fa] h-full border rounded-md relative">
//               {/* Top Section */}
//               <div className="flex justify-between items-center h-[80px] px-4">
//                 <div className="flex gap-2 items-center">
//                   <div className="lg:w-[70px] lg:h-[70px] w-[50px] h-[50px] rounded-full bg-black"></div>
//                   <div>
//                     <h1 className="lg:text-[25px] text-[20px] font-Playfair font-semibold">Username</h1>
//                     <button className="border border-neutral-600 rounded-lg px-2 font-serif font-medium">Follow</button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     className="w-full px-2 py-1 rounded-lg border border-gray-500 flex items-center gap-1"
//                     onClick={() => toggleLove(selectedImageIndex)}
//                   >
//                     <span className="lg:block hidden font-serif">Favourite</span>
//                     {lovedImages[selectedImageIndex] ? (
//                       <AiFillHeart className="text-[#f50538]" />
//                     ) : (
//                       <AiOutlineHeart className="text-gray-800" />
//                     )}
//                   </button>

//                   <button
//                     className="w-full px-2 py-1 rounded-lg border border-gray-500 flex items-center gap-1"
//                     onClick={() => downloadImage(selectedImage)}
//                   >
//                     <span className="lg:block hidden font-serif">Download</span>
//                     <FiDownload />
//                   </button>
//                   <button 
//                     className='w-full px-2 py-1 rounded-md border border-gray-500 flex items-center gap-1'
//                     onClick={handleShare}>
                      
//                     <span className='lg:block hidden font-serif'>Share</span>
//                     <PiShareFatThin className='' />
//                   </button>

//                   <button
//                     className="w-full px-2 lg:py-2 py-1 rounded-md border border-gray-500"
//                     onClick={() => setSelectedImage(null)}
//                   >
//                     <IoClose className="text-gray-800 " />
//                   </button>
//                 </div>
//               </div>

//               {/* Image Section */}
//               <div className="w-[95%] lg:w-[85%] lg:h-[500px] md:h-[450px] h-[400px] rounded-md mx-auto mt-3">
//                 <img className="h-full w-full object-contain" src={selectedImage} alt="Selected" />
//               </div>

//               {/* Bottom Section */}
//               <div className="flex flex-col gap-y-2 mt-2">
//                 <div className="flex lg:items-center items-start justify-between lg:flex-row flex-col-reverse lg:px-[7.5%] px-[2.5%]">
//                   <div className="mt-2 lg:mt-0">
//                     <h1 className="lg:text-[20px] text-[18px] font-Playfair font-semibold">Title</h1>
//                     <p className="lg:text-[18px] text-[16px] font-sans">Description</p>
//                   </div>

//                   <div className="flex gap-2">
//                   <div className="w-full lg:px-2 px-1 rounded-md border border-gray-500 flex items-center gap-1">
//                       <span className="lg:block hidden font-serif">Views:</span>
//                       <span className="lg:block hidden">{1234}</span>
//                       <IoEyeOutline className="lg:hidden block" />
//                       <span className="lg:hidden block">{1234}</span>
//                     </div>
//                     <div className="w-full lg:px-2 px-1 rounded-md border border-gray-500 flex items-center gap-1">
//                       <span className="lg:block hidden font-serif">Likes:</span>
//                       <span className="lg:block hidden">{1234}</span>
//                       <FaRegThumbsUp className="lg:hidden block" />
//                       <span className="lg:hidden block">{1234}</span>
//                     </div>

//                     <button className="w-full lg:px-2 px-1 rounded-md border border-gray-500 flex items-center gap-1">
//                       <span className="lg:block hidden font-serif">Downloads:</span>
//                       <span className="lg:block hidden">{1234}</span>
//                       <FiDownload className="lg:hidden block" />
//                       <span className="lg:hidden block">{1234}</span>
//                     </button>

//                     <button className="w-full lg:px-2 px-1 rounded-md border border-gray-500 flex items-center gap-1">
//                       <span className="lg:block hidden font-serif">Shares:</span>
//                       <span className="lg:block hidden">{1234}</span>
//                       <PiShareFatThin className="lg:hidden block" />
//                       <span className="lg:hidden block">{1234}</span>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="lg:px-[7.5%] px-[2.5%] pb-4 flex items-center">
//                   <h1 className="lg:text-[18px] text-[16px] font-Playfair font-bold">
//                     Updated on:
//                     <span className="font-sans font-normal text-[16px] pl-1">{19}</span>
//                   </h1>
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





import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaThumbsUp, FaRegThumbsUp, FaShare } from "react-icons/fa";
import { BiCommentEdit } from "react-icons/bi";
import { FiDownload, FiGrid } from "react-icons/fi";
import { IoClose, IoEyeOutline, IoInformationCircleOutline } from "react-icons/io5";
import { PiShareFatThin } from 'react-icons/pi';
import ShareButton from '../../Share/ShareFunction';
import DownloadService from '../../Downloads/downloadService';
import FollowButton from '../../Follow/FollowButton';
import LikeButton from '../../EngagementService/likeButton';
import ArtworkViewTracker from '../../Views/viewsTracker';

const images = [
  "/Image-of-Collection/abstract.jpg",
  "/Image-of-Collection/pexels-eberhardgross-1367192.jpg",
  "/Image-of-Collection/pexels-philippedonn-1133957.jpg",
  "/Image-of-Collection/pexels-pixabay-147411.jpg",
  "/Image-of-Collection/pexels-rafael-guajardo-194140-604684.jpg",
  "/Image-of-Collection/pexels-singkham-178541-1108572.jpg",
  "/Image-of-Collection/blossoms.jpg",
  "/Image-of-Collection/city.jpg",
  "/Image-of-Collection/digital.jpg",
  "/Image-of-Collection/dino.jpg",
  "/Image-of-Collection/dream.jpg",
  "/Image-of-Collection/pexels-dax-dexter-delada-2150239947-31090348.jpg",
  "/Image-of-Collection/pexels-shaosong-sun-503031340-16100671.jpg",
  "/Image-of-Collection/pexels-lyulog-26794592.jpg",
  "/Image-of-Collection/pexels-efrem-efre-2786187-28965971.jpg"
];

// Responsive heights for different screen sizes
const heights = {
  mobile: [150, 200, 180, 250, 220, 150, 200, 200, 200, 280, 260, 150, 200, 220, 200],
  tablet: [180, 250, 220, 300, 280, 180, 250, 250, 250, 350, 320, 180, 250, 280, 250],
  desktop: [200, 300, 250, 400, 350, 200, 300, 300, 300, 450, 415, 200, 300, 350, 300]
};

function Grid() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [likedImages, setLikedImages] = useState({});
  const [lovedImages, setLovedImages] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
    const initialLoved = {};
    images.forEach((img, index) => {
      initialLoved[index] = storedFavorites.includes(img);
    });
    return initialLoved;
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Get appropriate heights based on screen size
  const getHeights = () => {
    if (windowSize.width < 640) return heights.mobile;
    if (windowSize.width < 1024) return heights.tablet;
    return heights.desktop;
  };

  const currentHeights = getHeights();

  const toggleLike = useCallback((index) => {
    setLikedImages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const toggleLove = useCallback((index) => {
    setLovedImages((prev) => {
      const isCurrentlyLoved = prev[index];
      const updatedLovedImages = { 
        ...prev, 
        [index]: !isCurrentlyLoved 
      };

      const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
      let updatedFavorites;
      if (!isCurrentlyLoved) {
        if (!storedFavorites.includes(images[index])) {
          updatedFavorites = [...storedFavorites, images[index]];
        } else {
          updatedFavorites = storedFavorites;
        }
      } else {
        updatedFavorites = storedFavorites.filter(img => img !== images[index]);
      }

      localStorage.setItem("favoriteImages", JSON.stringify([...new Set(updatedFavorites)]));
      return updatedLovedImages;
    });
  }, []);

  const downloadImage = useCallback((src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Check out this artwork!",
      text: "I found this amazing artwork on Painters' Diary. Take a look!",
      url: window.location.href,
    };
  
    try {
      if (!navigator.share) {
        const fallbackMessage = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(fallbackMessage);
        alert("Share not supported. Link copied to clipboard instead!");
        return;
      }
  
      await navigator.share(shareData);
    } catch (error) {
      if (error.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
          alert("Sharing failed, but the link was copied to your clipboard!");
        } catch (clipError) {
          alert("Sharing unavailable. Please copy the URL manually: " + shareData.url);
        }
      }
    }
  }, []);

  // Close modal on Escape key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape" && selectedImage) {
      setSelectedImage(null);
    }
  }, [selectedImage]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add/remove event listener for Escape key
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true // Animations only happen once
    });
  }, []);

  // Sync favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
    const syncedLoved = {};
    images.forEach((img, index) => {
      syncedLoved[index] = storedFavorites.includes(img);
    });
    setLovedImages(syncedLoved);
  }, []);

  return (
    <>
      <div className="columns-1 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-5 gap-3 bg-maroon py-6 px-3 sm:px-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative rounded-lg shadow-lg group overflow-hidden break-inside-avoid mb-3"
            data-aos="fade-up"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: `${currentHeights[index]}px`,
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Love button */}
        {/*    <button
              className="absolute top-2 right-2 h-8 w-8 bg-white/50 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                toggleLove(index);
              }}
              onMouseEnter={() => setHoveredButton(`love-${index}`)}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label={lovedImages[index] ? "Unlove this image" : "Love this image"}
            >
              {lovedImages[index] ? (
                <AiFillHeart className="text-red-600 text-xl" />
              ) : (
                <AiOutlineHeart className="text-gray-800 text-xl" />
              )}
              {hoveredButton === `love-${index}` && (
                <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
                  {lovedImages[index] ? "Loved" : "Love"}
                </div>
              )}
            </button>*/}

            {/* Info button */}
            <button
              className="absolute top-2 right-2 h-8 w-8 bg-white/50 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(src);
                setSelectedImageIndex(index);
              }}
              onMouseEnter={() => setHoveredButton(`info-${index}`)}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="View image details"
            >
              <IoInformationCircleOutline className="text-gray-800 text-xl" />
              {hoveredButton === `info-${index}` && (
                <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
                  Info
                </div>
              )}
            </button>

            {/* Bottom action buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center z-10">
              <Link to="/Account" className="flex-shrink-0">
                <div 
                  className="h-10 w-10 bg-red-500 rounded-full"
                  onMouseEnter={() => setHoveredButton(`profile-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  aria-label="View profile"
                >
                  {hoveredButton === `profile-${index}` && (
                    <div className="absolute bottom-full mb-2 font-bold w-max bg-black text-white text-sm rounded px-2 py-1">
                      Profile
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="flex items-center gap-1 sm:gap-2">
                {/* <button
                  className={`h-8 w-8 rounded flex items-center justify-center relative ${
                    likedImages[index] ? "bg-gray-500" : "hover:bg-gray-600"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(index);
                  }}
                  onMouseEnter={() => setHoveredButton(`like-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  aria-label={likedImages[index] ? "Unlike this image" : "Like this image"}
                >
                  {likedImages[index] ? (
                    <FaThumbsUp size={16} className="text-white" />
                  ) : (
                    <FaRegThumbsUp size={16} className="text-white" />
                  )}
                  {hoveredButton === `like-${index}` && (
                    <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
                      {likedImages[index] ? "Liked" : "Like"}
                    </div>
                  )}
                </button> */}

                <button
                  className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-600 relative"
                  onMouseEnter={() => setHoveredButton(`comment-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  aria-label="Comment on this image"
                >
                  <BiCommentEdit size={18} className="text-white" />
                  {hoveredButton === `comment-${index}` && (
                    <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
                      Comment
                    </div>
                  )}
                </button>

                <button
                  className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-600 relative"
                  onMouseEnter={() => setHoveredButton(`similar-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  aria-label="View similar images"
                >
                  <FiGrid size={16} className="text-white" />
                  {hoveredButton === `similar-${index}` && (
                    <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
                      Similar
                    </div>
                  )}
                </button>

                <button
                  className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-600 relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(src);
                  }}
                  onMouseEnter={() => setHoveredButton(`download-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  aria-label="Download this image"
                >
                  <FiDownload size={16} className="text-white" />
                  {hoveredButton === `download-${index}` && (
                    <div className="absolute bottom-full mb-2 w-max bg-black text-white text-sm rounded px-2 py-1">
                      Download
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-y-auto p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-[#edf2fa] rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <IoClose className="text-gray-800 text-2xl" />
            </button>

            {/* Modal content */}
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image section - takes full width on mobile, 2/3 on desktop */}
              <div className="lg:w-2/3 w-full p-4 flex items-center justify-center bg-gray-100">
                <img 
                  className="max-h-[70vh] w-auto object-contain" 
                  src={selectedImage} 
                  alt="Selected artwork" 
                  loading="eager"
                />
              </div>

              {/* Info section - takes full width on mobile, 1/3 on desktop */}
              <div className="lg:w-1/3 w-full p-4 flex flex-col">
                {/* User info */}
                <div className="flex items-center gap-3 mb-4">
                 <Link to={'/account'}>
                    <div className="w-16 h-16 rounded-full bg-black flex-shrink-0"></div>
                 </Link>
                  <div>
                    <h2 className="text-xl font-bold">Username</h2>
                    <button className="text-sm border border-gray-500 rounded px-2 py-1 hover:bg-gray-200 transition-colors">
                      Follow
                    </button>
                      {/* <div className=' pl-3'>
                        <FollowButton targetUserId={allImages.user?.id || image.$id} />
                      </div> */}
                  </div>
                </div>

                {/* Image info */}
                <div className="mb-4">
                  <h1 className="text-2xl font-bold mb-2">Artwork Title</h1>
                  <p className="text-gray-700">
                    This is a detailed description of the artwork. It might include the inspiration behind it, 
                    techniques used, or any other relevant information the artist wants to share.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white rounded-lg p-2 text-center">
                    <IoEyeOutline className="inline-block mr-1" />
                    <span>1.2K Views</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <FaRegThumbsUp className="inline-block mr-1" />
                    <span>856 Likes</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <FiDownload className="inline-block mr-1" />
                    <span>432 Downloads</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <PiShareFatThin className="inline-block mr-1" />
                    <span>128 Shares</span>
                  </div>
                </div>

                {/* Date */}
                <div className="text-sm text-gray-500 mb-4">
                  Updated: {new Date().toLocaleDateString()}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                      lovedImages[selectedImageIndex] 
                        ? "bg-red-100 border-red-300 text-red-600" 
                        : "border-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleLove(selectedImageIndex)}
                  >
                    {lovedImages[selectedImageIndex] ? (
                      <AiFillHeart className="text-red-600" />
                    ) : (
                      <AiOutlineHeart />
                    )}
                    <span>Favorite</span>
                  </button>

                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-500 hover:bg-gray-100"
                    onClick={() => downloadImage(selectedImage)}
                  >
                    <FiDownload />
                    <span>Download</span>
                  </button>

                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-500 hover:bg-gray-100"
                    onClick={handleShare}
                  >
                    <PiShareFatThin />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Grid;