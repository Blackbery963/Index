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
  formatTimestamp,
  viewMode = 'feed'
}) => {
  if (!artwork) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Get all images including main and additional
  const allImages = artwork.allImages || [artwork.src || artwork.url].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;
  const currentImage = allImages[currentImageIndex];
  const imgSrc = currentImage || '';

  const handleBuyClick = (e) => {
    e.stopPropagation();
    // Handle buy logic here (e.g., open modal, navigate to purchase)
    console.log('Buy artwork:', artwork.id || artwork.$id);
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

  if (!imgSrc) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Artwork image missing
        </p>
      </div>
    );
  }

  return (
    <motion.div
      onClick={() => onArtworkClick?.(artwork)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        w-full rounded-sm
        border border-gray-300 dark:border-zinc-700
        p-2
        
        cursor-pointer
        group
        hover:shadow-lg dark:hover:shadow-zinc-800/50
        transition-all duration-300
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─────────────────────────────── TOP BOX - User + Follow + Price ─────────────────────────────── */}
      <div className="border border-gray-300 dark:border-zinc-700 rounded-md px-4 py-3 mb-2">
        <div className="flex items-center justify-between">
          {/* USER INFO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
              {(artwork.artist || 'A')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-zinc-100 text-sm">
                {artwork.artist || "Unknown Artist"}
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                {artwork.medium || ''} {artwork.medium && '•'} {formatTimestamp?.(artwork.timestamp) || "Recently"}
              </p>
            </div>
          </div>
          {/* RIGHT SIDE - Follow + Price */}
          <div className="flex flex-col items-end gap-2">
            <FollowButton targetUserId={artwork.userId} variant="ghost" />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────── MIDDLE BOX - Image ─────────────────────────────── */}
      <div className="border border-gray-300 dark:border-zinc-700 rounded-md overflow-hidden mb-2 relative">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={imgSrc}
              alt={`${artwork.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-64 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23f3f4f6' dark:fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%239ca3af' dark:fill='%23d1d5db' font-size='16'%3EImage Not Found%3C/text%3E%3C/svg%3E";
              }}
            />
          </AnimatePresence>

          {/* Multiple Images Indicator */}
          {hasMultipleImages && (
            <div className="absolute top-3 left-3 bg-black/70 dark:bg-zinc-900/80 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Awards */}
          {artwork.awards && artwork.awards.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col gap-1">
              {artwork.awards.slice(0, 2).map((award, index) => (
                <div
                  key={index}
                  className="bg-amber-500 text-white text-xs px-2.5 py-1.5 rounded-full font-semibold shadow-md"
                >
                  🏆 {award}
                </div>
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {hasMultipleImages && isHovered && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-gray-800 dark:text-zinc-100 rounded-full p-2 shadow-lg transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-gray-800 dark:text-zinc-100 rounded-full p-2 shadow-lg transition-all z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────── BOTTOM BOX - Title, Desc, Tags, Actions ─────────────────────────────── */}
      <div className="border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-2.5 ">
        {/* Row 1: Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-zinc-100 text-base pr-2 truncate">
            {artwork.title || "Untitled"}
          </h3>
          {artwork.price ? (
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm whitespace-nowrap">
              <MdCurrencyRupee size={14} />
              <span>{artwork.price}</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500 dark:text-zinc-500 border border-gray-300 dark:border-zinc-600 px-2 py-0.5 rounded">
              Free
            </span>
          )}
        </div>

        {/* Row 2: Description & Tags */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {artwork.description || "No description available."}
          </p>
          {artwork.tags && artwork.tags.length > 0 && (
            <div className="flex gap-2 mt-2 overflow-hidden">
              {artwork.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Row 3: Actions Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-800">
          {/* Left: Interactions */}
          <div className="flex items-center gap-2">
            <div className="scale-90 origin-left mt-2">
              <LikeButton targetId={artwork.id || artwork.$id} />
            </div>
            <ShareButton artwork={artwork} variant="icon" size={18} />
            <DownloadService artwork={artwork} size={18} />
          </div>

          {/* Right: Views & Buy */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
              <Eye size={14} />
              <span>{artwork.views || 0}</span>
            </div>
            {artwork.price && (
              <button
                onClick={handleBuyClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 transition-all shadow-sm hover:shadow-md"
              >
                <ShoppingCart size={12} />
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;