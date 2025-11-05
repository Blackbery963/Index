import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  TrendingUp,
  Eye,
  ShoppingCart,
  Tag,
  ChevronLeft,
  ChevronRight,
  ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LikeButton from '../EngagementService/likeButton';
import ShareButton from '../Share/ShareFunction';
import DownloadService from '../Downloads/downloadService';
import FollowButton from '../Follow/FollowButton';
import { MdCurrencyRupee } from 'react-icons/md';

const ArtworkCard = ({ 
  artwork, 
  onArtworkClick, 
  likedArtworks, 
  savedArtworks, 
  onLike, 
  onSave, 
  formatTimestamp,
  viewMode = 'feed'
}) => {
  if (!artwork) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isLiked = likedArtworks?.has(artwork.id);
  const isSaved = savedArtworks?.has(artwork.id);
  const likeCount = (artwork.likes || 0) + (isLiked ? 1 : 0);

  // Get all images including main and additional
  const allImages = artwork.allImages || [artwork.src || artwork.url].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;
  const currentImage = allImages[currentImageIndex];

  const handleLike = (e) => {
    e.stopPropagation();
    onLike?.(artwork.id, artwork);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave?.(artwork.id, artwork);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    console.log('Buy artwork:', artwork);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  if (!currentImage) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Artwork image missing
        </p>
      </div>
    );
  }

  const getCardLayout = () => {
    switch (viewMode) {
      case 'grid':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-200 dark:border-purple-800 group cursor-pointer relative"
            onClick={() => onArtworkClick?.(artwork)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* For Sale Badge */}
            <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg z-20">
              <Tag className="w-3 h-3" />
              For Sale
            </div>

            {/* Multiple Images Badge */}
            {hasMultipleImages && (
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1 shadow-lg z-20">
                <ImageIcon className="w-3 h-3" />
                {allImages.length}
              </div>
            )}

            {/* Price Tag */}
            {artwork.price && (
              <div className="absolute top-12 left-3 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                ${artwork.price}
              </div>
            )}

            {/* Image Slider Container */}
            <div className="relative aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={currentImage}
                  alt={`${artwork.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {hasMultipleImages && isHovered && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 shadow-lg transition-all z-10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 shadow-lg transition-all z-10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => goToImage(index, e)}
                      className={`w-1 h-1 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Buy Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                  onClick={handleBuyClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all z-10"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                {artwork.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                by {artwork.artist}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3 line-clamp-2">
                {artwork.medium}
              </p>
              
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-1 transition-all ${
                    isLiked ? 'text-red-500 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs font-medium">{likeCount}</span>
                </button>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp?.(artwork.timestamp)}
                </span>
              </div>
            </div>
          </motion.div>
        );

      default: // Feed view
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-200 dark:border-purple-800 group cursor-pointer"
            onClick={() => onArtworkClick?.(artwork)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {(artwork.artist || 'A')[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {artwork.artist}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {artwork.medium} • {formatTimestamp?.(artwork.timestamp)}
                  </p>
                </div>
              </div>
              
              {/* Price */}
              {artwork.price && (
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-">
                    <MdCurrencyRupee className='text-md'/>
                    {artwork.price}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">For Sale</p>
                </div>
              )}
            </div>

            {/* Image Slider */}
            <div className="relative bg-gray-100 dark:bg-gray-800">
              <div className="relative aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={currentImage}
                    alt={`${artwork.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Multiple Images Indicator */}
                {hasMultipleImages && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                )}

                {/* Navigation Arrows */}
                {hasMultipleImages && isHovered && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-1 shadow-lg transition-all z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-1 shadow-lg transition-all z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => goToImage(index, e)}
                        className={`w-1 h-1 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white scale-110'
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Awards */}
              {artwork.awards && artwork.awards.length > 0 && (
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {artwork.awards.slice(0, 2).map((award, index) => (
                    <div 
                      key={index}
                      className="bg-yellow-500 text-white text-xs px-3 py-2 rounded-full font-semibold shadow-lg"
                    >
                      🏆 {award}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {artwork.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {artwork.description}
                </p>
              </div>
              
              {/* Tags */}
              {artwork.tags && artwork.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {artwork.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className=' mt-2'><LikeButton targetId={artwork.id || artwork.$id} /></div>
                  <ShareButton artwork={artwork} />
                  <DownloadService artwork={artwork}/>
                </div>
                
                <button 
                  onClick={handleBuyClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return getCardLayout();
};

export default ArtworkCard;