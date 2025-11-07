import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MdSearch } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import LikeButton from '../EngagementService/likeButton';
import ShareButton from '../Share/ShareFunction';
import DownloadService from '../Downloads/downloadService';
import FollowButton from '../Follow/FollowButton';

const ImageCard = ({ 
  image, 
  onImageClick, 
  likedImages, 
  savedImages, 
  onLike, 
  onSave, 
  formatTimestamp,
  viewMode = 'feed'
}) => {
  // Validate image object
  if (!image) {
    console.error('ImageCard: No image object provided');
    return null;
  }

  // Log image structure for debugging
  if (!image.src && !image.url && !image.imageUrl) {
    console.warn('ImageCard: Image missing src/url property', {
      imageId: image.id,
      availableProps: Object.keys(image),
      imageObject: image
    });
  }

  const isLiked = likedImages?.has(image.id);
  const isSaved = savedImages?.has(image.id);
  const likeCount = (image.likes || 0) + (isLiked ? 1 : 0);

  // Get image source with fallbacks
  const getImageSrc = () => {
    return image.src || 
           image.url || 
           image.imageUrl || 
           image.imageURL ||
           image.image ||
           image.thumbnail ||
           '';
  };

  const imageSrc = getImageSrc();

  const handleLike = (e) => {
    e.stopPropagation();
    onLike?.(image.id, image);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave?.(image.id, image);
  };

  const handleClick = () => {
    // Enhanced logging for debugging
    console.group('🖼️ ImageCard Click Debug');
    console.log('Image ID:', image.id);
    console.log('Image Source:', imageSrc);
    console.log('Image Title:', image.title);
    console.log('Full Image Object:', image);
    console.log('Available Properties:', Object.keys(image));
    console.groupEnd();

    // Ensure we pass the complete image object
    if (onImageClick) {
      onImageClick(image);
    } else {
      console.warn('onImageClick handler not provided');
    }
  };

  // Error state if no image source
  if (!imageSrc) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Image source missing for: {image.title || 'Unknown'}
        </p>
        <details className="mt-2 text-xs">
          <summary className="cursor-pointer">Debug Info</summary>
          <pre className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded overflow-auto">
            {JSON.stringify(image, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  // Different layouts based on view mode
  const getCardLayout = () => {
    switch (viewMode) {
      case 'grid':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer"
            onClick={handleClick}
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={imageSrc}
                alt={image.title || 'Artwork'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', imageSrc);
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* Trending Badge */}
              {image.trending > 5 && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-3 shadow-lg">
                  <MdSearch className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* <button 
                  onClick={handleSave}
                  className={`p-2 rounded-full backdrop-blur-lg transition-all ${
                    isSaved 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button> */}
                <button className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 backdrop-blur-lg hover:bg-green-500 hover:text-white transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content - Minimal for Grid */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                {image.title || 'Untitled'}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                by {image.artist || 'Unknown Artist'}
              </p>
              
              <div className="flex items-center justify-between">
              <LikeButton targetId={image.id || image.$id} />
              </div>
            </div>
          </motion.div>
        );
      default: // Feed view
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer"
            onClick={handleClick}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {(image.artist || 'A')[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {image.artist || 'Unknown Artist'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTimestamp?.(image.timestamp) || 'Recently'}
                  </p>
                </div>
              </div>
              <FollowButton targetUserId={image.userId} variant='ghost' />
            </div>

            {/* Image Container */}
            <div className="relative">
              <img
                src={imageSrc}
                alt={image.title || 'Artwork'}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', imageSrc);
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23ddd" width="800" height="600"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="20"%3EImage not found%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* Trending Badge */}
              {image.trending > 5 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-3 py-1.5 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </div>
              )}

              {/* View Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg p-2 shadow-lg flex items-center gap-3">
                  <HiOutlineViewfinderCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>

              {/* Quick Actions */}
              {/* <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={handleSave}
                  className={`p-3 rounded-xl backdrop-blur-lg transition-all ${
                    isSaved 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div> */}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {image.title || 'Untitled Artwork'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {image.description || 'No description available.'}
                </p>
              </div>
              
              {/* Tags */}
              {image.tags && image.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {image.tags.slice(0, 4).map((tag, index) => (
                    <span 
                      key={`${tag}-${index}`}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <div className=' mt-2'><LikeButton targetId={image.id || image.$id} /></div>
                  <ShareButton artwork={image} variant='compact' position='bottom-sheet'/>
                  <DownloadService artwork={image}/>
                </div>
                
                
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>{image.views || 0} views</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return getCardLayout();
};

export default ImageCard;

