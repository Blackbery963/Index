// components/MediaComponents.js
import React, { useState } from 'react';
import { MdErrorOutline, MdPhoto, MdVideocam,  } from 'react-icons/md';
import { FiAward, FiMonitor } from 'react-icons/fi';
import { MdOutlineSell } from 'react-icons/md';
import { FaPlay, FaArrowLeft, FaArrowRight, FaCaretRight } from 'react-icons/fa';
import { FaCaretLeft } from 'react-icons/fa';
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { YourCollectionsService } from './YourCollectionsService';

export const ImagePlaceholder = ({ type, activeTab, className = "" }) => (

<div
  className={`${className} flex flex-col items-center justify-center text-center 
              p-6 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400`}
>
  {type === "error" ? (
    <>
      <MdErrorOutline className="text-5xl mb-3 text-red-500" />
      <p className="text-sm font-medium">Media unavailable</p>
    </>
  ) : (
    <>
      {activeTab === "Arts&Crafts" && <IoImageOutline className="text-5xl mb-3 text-blue-400" />}
      {activeTab === "Videos" && <IoVideocamOutline className="text-5xl mb-3 text-purple-400" />}
      {activeTab === "Awards" && <FiAward className="text-5xl mb-3 text-yellow-400" />}
      {activeTab === "Sell" && <MdOutlineSell className="text-5xl mb-3 text-green-400" />}
      
      <p className="text-sm font-medium">No media available</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        Try uploading something to get started
      </p>
    </>
  )}
</div>

);

export const AppwriteMedia = ({ upload, className = "", onImageClick }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImageUrls = YourCollectionsService.getAllImageUrls(upload);
  const hasMultipleImages = allImageUrls.length > 1;

  if (error || !upload.fileId) {
    return <ImagePlaceholder type="error" className={className} />;
  }

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImageUrls.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImageUrls.length) % allImageUrls.length);
  };

  const currentUrl = allImageUrls[currentImageIndex];

  return (
    <div className={`${className} relative group overflow-hidden rounded-xl`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
        </div>
      )}
      
{upload.isVideo ? (
  <div className="relative w-full h-full">
    <video
      src={currentUrl}
      className="w-full h-full object-cover rounded-xl"
      controls
      preload="metadata"
      onLoadedData={() => setLoading(false)}
      onError={() => setError(true)}
    />

    {/* Optional custom play overlay (only when not playing) */}
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <FaPlay className="text-white text-3xl opacity-80" />
      </div>
    )}
  </div>
) : (
  <>
    <img
      src={currentUrl}
      alt={upload.title || "Artwork"}
      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
        loading ? 'opacity-0' : 'opacity-100'
      }`}
      loading="lazy"
      onLoad={() => setLoading(false)}
      onError={() => setError(true)}
      onClick={onImageClick}
    />

    {/* Image Gallery Controls... (same as before) */}
    {hasMultipleImages && (
      <>
        <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <MdPhoto className="text-xs" />
          <span>{currentImageIndex + 1}/{allImageUrls.length}</span>
        </div>

        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
          {allImageUrls.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevImage}
            className="text-white p-1 rounded-lg"
          >
            <FaCaretLeft size={14} />
          </button>
          <button
            onClick={nextImage}
            className="text-white p-1 rounded-lg"
          >
            <FaCaretRight size={14} />
          </button>
        </div>
      </>
    )}
  </>
)}

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {upload.isAward && (
          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <FiAward className="mr-1" />
            Award
          </span>
        )}
        {upload.forSale && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            For Sale
          </span>
        )}
        {hasMultipleImages && !upload.isVideo && (
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Gallery
          </span>
        )}
      </div>
    </div>
  );
};