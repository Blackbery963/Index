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

  if (!imgSrc) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
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
        border border-gray-300 dark:border-gray-700
        p-2
        bg-transparent
        cursor-pointer
        group
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─────────────────────────────── */}
      {/* TOP BOX - User + Follow + Price */}
      {/* ─────────────────────────────── */}
      <div
        className="
          border border-gray-300 dark:border-gray-700
          rounded-md px-4 py-3
          mb-2
        "
      >
        <div className="flex items-center justify-between">
          {/* USER INFO */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-10 h-10 rounded-full
                bg-gradient-to-br from-purple-500 to-blue-500
                flex items-center justify-center
                text-white
                font-semibold
                shadow-md
              "
            >
              {(artwork.artist || 'A')[0].toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {artwork.artist || "Unknown Artist"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {artwork.medium || ''} {artwork.medium && '•'} {formatTimestamp?.(artwork.timestamp) || "Recently"}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Follow + Price */}
          <div className="flex flex-col items-end gap-2">
            <FollowButton targetUserId={artwork.userId} variant="ghost" />
            {artwork.price && (
              <div className="text-right">
                <p className="text-lg font-bold text-green-600 dark:text-green-400 flex items-center justify-end gap-1">
                  <MdCurrencyRupee className="text-sm" />
                  {artwork.price}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">For Sale</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────── */}
      {/* MIDDLE BOX - Image */}
      {/* ─────────────────────────────── */}
      <div
        className="
          border border-gray-300 dark:border-gray-700
          rounded-md overflow-hidden
          mb-2
          relative
        "
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={imgSrc}
              alt={`${artwork.title} - Image ${currentImageIndex + 1}`}
              className="w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%23888' font-size='16'%3EImage Not Found%3C/text%3E%3C/svg%3E";
              }}
            />
          </AnimatePresence>

          {/* Multiple Images Indicator */}
          {hasMultipleImages && (
            <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}

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
      </div>

      {/* ─────────────────────────────── */}
      {/* BOTTOM BOX - Title, Desc, Tags, Actions */}
      {/* ─────────────────────────────── */}
      <div
        className="
          border border-gray-300 dark:border-gray-700
          rounded-md px-4 py-3
        "
      >
        {/* TITLE */}
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1">
          {artwork.title || "Untitled Artwork"}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
          {artwork.description || "No description provided."}
        </p>

        {/* TAGS */}
        {artwork.tags && artwork.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {artwork.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="
                  px-3 py-1 text-sm
                  rounded-full font-medium
                  bg-purple-100 dark:bg-purple-900/30
                  border border-purple-200 dark:border-purple-800/50
                  text-purple-700 dark:text-purple-300
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ACTIONS + VIEWS + BUY */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
          <div className="flex items-center gap-2">
            <div className='mt-2'><LikeButton targetId={artwork.id || artwork.$id} /></div>
            <ShareButton artwork={artwork} variant="popup"/>
            <DownloadService artwork={artwork}/>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {artwork.price && (
              <button
                onClick={handleBuyClick}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md font-medium flex items-center gap-1 text-sm transition-all shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{artwork.views || 0} views</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;