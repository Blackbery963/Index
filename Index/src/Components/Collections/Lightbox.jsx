// import { useState, useEffect } from 'react';
// import { 
//   X, 
//   ChevronLeft, 
//   ChevronRight, 
//   Heart, 
//   Bookmark, 
//   Download,
//   Share2,
//   MessageCircle
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Lightbox = ({ 
//   selectedImage, 
//   selectedCollage, 
//   currentSlideIndex, 
//   setCurrentSlideIndex, 
//   onClose, 
//   likedImages, 
//   savedImages, 
//   onLike, 
//   onSave 
// }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const isCollageMode = !!selectedCollage;
//   const currentImages = isCollageMode ? selectedCollage : [selectedImage];
//   const currentImage = currentImages?.[currentSlideIndex];

//   // Reset image loaded state when image changes
//   useEffect(() => {
//     setImageLoaded(false);
//   }, [currentSlideIndex, currentImages]);

//   const nextSlide = () => {
//     if (!currentImages) return;
//     setCurrentSlideIndex((prev) => (prev + 1) % currentImages.length);
//   };

//   const prevSlide = () => {
//     if (!currentImages) return;
//     setCurrentSlideIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
//   };

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === 'Escape') onClose();
//       if (e.key === 'ArrowRight') nextSlide();
//       if (e.key === 'ArrowLeft') prevSlide();
//     };
    
//     window.addEventListener('keydown', handleKeyPress);
//     document.body.style.overflow = 'hidden';
    
//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//       document.body.style.overflow = 'unset';
//     };
//   }, [currentSlideIndex, currentImages]);

//   if (!currentImage) {
//     onClose();
//     return null;
//   }

//   const isLiked = likedImages?.has(currentImage.id);
//   const isSaved = savedImages?.has(currentImage.id);

//   const handleLike = () => {
//     onLike?.(currentImage.id, currentImage);
//   };

//   const handleSave = () => {
//     onSave?.(currentImage.id, currentImage);
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", damping: 30, stiffness: 300 }}
//           className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
//             <div className="flex items-center gap-4">
//               {isCollageMode && currentImages.length > 1 && (
//                 <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
//                   {currentSlideIndex + 1} / {currentImages.length}
//                 </div>
//               )}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {currentImage.title}
//                 </h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   by {currentImage.artist}
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handleLike}
//                 className={`p-2 rounded-lg transition-colors ${
//                   isLiked
//                     ? 'bg-red-500 text-white'
//                     : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
//                 }`}
//               >
//                 <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//               </button>
              
//               <button
//                 onClick={handleSave}
//                 className={`p-2 rounded-lg transition-colors ${
//                   isSaved
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white'
//                 }`}
//               >
//                 <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
//               </button>
              
//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Main Image Area */}
//           <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
//             {/* Navigation Arrows */}
//             {isCollageMode && currentImages.length > 1 && (
//               <>
//                 <button
//                   onClick={prevSlide}
//                   className="absolute left-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg text-gray-900 dark:text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="absolute right-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg text-gray-900 dark:text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>
//               </>
//             )}

//             {/* Loading State */}
//             {!imageLoaded && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
//               </div>
//             )}

//             {/* Image */}
//             <motion.img
//               key={currentImage.id}
//               src={currentImage.src}
//               alt={currentImage.title}
//               className={`max-w-full max-h-full object-contain rounded-lg ${
//                 imageLoaded ? 'opacity-100' : 'opacity-0'
//               } transition-opacity duration-300 shadow-lg`}
//               onLoad={() => setImageLoaded(true)}
//               onError={() => {
//                 console.error('Failed to load image:', currentImage.src);
//                 setImageLoaded(true);
//               }}
//             />
//           </div>

//           {/* Info Panel */}
//           <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
//             <div className="max-w-4xl mx-auto">
//               <div className="grid md:grid-cols-3 gap-6">
//                 {/* Description & Tags */}
//                 <div className="md:col-span-2">
//                   <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
//                     {currentImage.description}
//                   </p>
                  
//                   <div className="flex flex-wrap gap-2">
//                     {currentImage.tags.map((tag, index) => (
//                       <span 
//                         key={index} 
//                         className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
//                       >
//                         #{tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="space-y-4">
//                   <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
//                     <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Engagement</h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-600 dark:text-gray-400">Likes</span>
//                         <span className="flex items-center gap-1 font-semibold">
//                           <Heart className="w-4 h-4" />
//                           {currentImage.likes}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-600 dark:text-gray-400">Comments</span>
//                         <span className="flex items-center gap-1 font-semibold">
//                           <MessageCircle className="w-4 h-4" />
//                           {currentImage.comments}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-600 dark:text-gray-400">Shares</span>
//                         <span className="flex items-center gap-1 font-semibold">
//                           <Share2 className="w-4 h-4" />
//                           {currentImage.shares}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
//                     <Download className="w-5 h-5" />
//                     Download
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Thumbnail Strip for Collage */}
//           {isCollageMode && currentImages.length > 1 && (
//             <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
//               <div className="max-w-4xl mx-auto">
//                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//                   {currentImages.map((img, idx) => (
//                     <button
//                       key={img.id}
//                       onClick={() => {
//                         setCurrentSlideIndex(idx);
//                         setImageLoaded(false);
//                       }}
//                       className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                         idx === currentSlideIndex 
//                           ? 'border-purple-500 scale-110' 
//                           : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100'
//                       }`}
//                     >
//                       <img 
//                         src={img.src} 
//                         alt={img.title} 
//                         className="w-full h-full object-cover" 
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Lightbox;

import { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Bookmark, 
  Download,
  Share2,
  MessageCircle,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Lightbox = ({ 
  selectedImage, 
  selectedCollage, 
  currentSlideIndex, 
  setCurrentSlideIndex, 
  onClose, 
  likedImages, 
  savedImages, 
  onLike, 
  onSave 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isCollageMode = !!selectedCollage;
  const currentImages = isCollageMode ? selectedCollage : (selectedImage ? [selectedImage] : []);
  const currentImage = currentImages?.[currentSlideIndex];

  // Fix Pixabay URL - use web page URL instead of direct CDN link
  const getImageUrl = (image) => {
    if (!image) return '';
    
    let url = image.src || image.url || image.image || image.imageUrl || image.preview || '';
    
    // If it's a Pixabay CDN URL, try to convert it to a proper format
    if (url.includes('pixabay.com/get/')) {
      // Extract the image ID from the URL and construct a proper Pixabay URL
      const matches = url.match(/pixabay-(\d+)/);
      if (matches && matches[1]) {
        const imageId = matches[1];
        return `https://pixabay.com/photos/${imageId}/`;
      }
      
      // Alternative: Use a proxy or different image size
      // You can try using a different image service or your own proxy
      console.warn('Pixabay CDN URL detected, may have loading issues:', url);
    }
    
    return url;
  };

  // Get a display-friendly URL that works in img tags
  const getDisplayImageUrl = (image) => {
    if (!image) return '';
    
    const url = image.src || image.url || '';
    
    // For Pixabay images, you might need to use a different approach:
    // Option 1: Use a proxy service
    // Option 2: Use a different image API
    // Option 3: Use the web page URL and handle it differently
    
    // Temporary fix: Try to use the original URL with referrer policy
    return url;
  };

  const getImageTitle = (image) => {
    return image?.title || image?.name || image?.caption || 'Untitled Artwork';
  };

  const getImageArtist = (image) => {
    return image?.artist || image?.creator || image?.author || image?.user?.name || 'Unknown Artist';
  };

  const getImageDescription = (image) => {
    return image?.description || image?.bio || image?.caption || 'No description available.';
  };

  const getImageTags = (image) => {
    return image?.tags || image?.categories || image?.keywords || [];
  };

  const getImageStats = (image) => {
    return {
      likes: image?.likes || image?.likeCount || image?.likesCount || 0,
      comments: image?.comments || image?.commentCount || 0,
      shares: image?.shares || image?.shareCount || 0
    };
  };

  // Reset states when image changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [currentSlideIndex, currentImages]);

  const nextSlide = () => {
    if (!currentImages || currentImages.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevSlide = () => {
    if (!currentImages || currentImages.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [currentSlideIndex, currentImages]);

  if (!currentImage) {
    useEffect(() => {
      onClose();
    }, []);
    return null;
  }

  const imageUrl = getImageUrl(currentImage);
  const displayImageUrl = getDisplayImageUrl(currentImage);
  const imageTitle = getImageTitle(currentImage);
  const imageArtist = getImageArtist(currentImage);
  const imageDescription = getImageDescription(currentImage);
  const imageTags = getImageTags(currentImage);
  const imageStats = getImageStats(currentImage);

  const isLiked = currentImage?.id ? likedImages?.has(currentImage.id) : false;
  const isSaved = currentImage?.id ? savedImages?.has(currentImage.id) : false;

  const handleLike = () => {
    if (currentImage?.id) {
      onLike?.(currentImage.id, currentImage);
    }
  };

  const handleSave = () => {
    if (currentImage?.id) {
      onSave?.(currentImage.id, currentImage);
    }
  };

  const handleDownload = () => {
    if (displayImageUrl) {
      const link = document.createElement('a');
      link.href = displayImageUrl;
      link.download = `${imageTitle}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewOriginal = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4">
              {isCollageMode && currentImages.length > 1 && (
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentSlideIndex + 1} / {currentImages.length}
                </div>
              )}
              <div className="max-w-md">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {imageTitle}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  by {imageArtist}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                disabled={!currentImage?.id}
                className={`p-2 rounded-lg transition-all ${
                  isLiked
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
                } ${!currentImage?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleSave}
                disabled={!currentImage?.id}
                className={`p-2 rounded-lg transition-all ${
                  isSaved
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white'
                } ${!currentImage?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 relative overflow-hidden min-h-[400px]">
            {/* Navigation Arrows */}
            {isCollageMode && currentImages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg text-gray-900 dark:text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-600"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg text-gray-900 dark:text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-600"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Loading State */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">Loading image...</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs">From Pixabay</p>
              </div>
            )}

            {/* Error State */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-center p-8">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Image Loading Issue
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mb-4">
                    There was a problem loading this image from Pixabay.
                  </p>
                  <button
                    onClick={handleViewOriginal}
                    className="flex items-center gap-2 mx-auto px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Pixabay
                  </button>
                </div>
              </div>
            )}

            {/* Image with referrer policy to handle Pixabay restrictions */}
            {!imageError && displayImageUrl && (
              <motion.img
                key={displayImageUrl + currentSlideIndex}
                src={displayImageUrl}
                alt={imageTitle}
                className={`max-w-full max-h-full object-contain rounded-lg transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } shadow-lg`}
                // Add referrer policy to handle Pixabay restrictions
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                onLoad={() => {
                  console.log('Image loaded successfully:', displayImageUrl);
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={() => {
                  console.error('Failed to load image:', displayImageUrl);
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            )}

            {/* No URL State */}
            {!imageError && !displayImageUrl && (
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-center p-8">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Image Available
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm">
                    This image cannot be displayed directly.
                  </p>
                  {imageUrl && (
                    <button
                      onClick={handleViewOriginal}
                      className="mt-3 flex items-center gap-2 mx-auto px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Original
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Description & Tags */}
                <div className="md:col-span-2">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed whitespace-pre-line">
                    {imageDescription}
                  </p>
                  
                  {imageTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {imageTags.slice(0, 8).map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                        >
                          #{typeof tag === 'string' ? tag : tag.name || tag.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats & Actions */}
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Engagement</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Likes</span>
                        <span className="flex items-center gap-1 font-semibold">
                          <Heart className="w-4 h-4" />
                          {imageStats.likes.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Comments</span>
                        <span className="flex items-center gap-1 font-semibold">
                          <MessageCircle className="w-4 h-4" />
                          {imageStats.comments.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Shares</span>
                        <span className="flex items-center gap-1 font-semibold">
                          <Share2 className="w-4 h-4" />
                          {imageStats.shares.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={handleDownload}
                      disabled={!displayImageUrl}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                    
                    <button 
                      onClick={handleViewOriginal}
                      className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View on Pixabay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip for Collage */}
          {isCollageMode && currentImages.length > 1 && (
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {currentImages.map((img, idx) => {
                    const thumbUrl = getDisplayImageUrl(img);
                    return (
                      <button
                        key={img.id || idx}
                        onClick={() => {
                          setCurrentSlideIndex(idx);
                          setImageLoaded(false);
                          setImageError(false);
                        }}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                          idx === currentSlideIndex 
                            ? 'border-purple-500 scale-110 shadow-lg' 
                            : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        {thumbUrl ? (
                          <img 
                            src={thumbUrl} 
                            alt={getImageTitle(img)} 
                            className="w-full h-full object-cover" 
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        {idx === currentSlideIndex && (
                          <div className="absolute inset-0 border-2 border-white rounded-lg" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;