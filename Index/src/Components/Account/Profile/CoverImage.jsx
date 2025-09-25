// components/CoverImage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCamera } from 'react-icons/fi';

export const CoverImage = ({ coverImage, showCoverButton, isOwnProfile, handleImageUpload }) => {
  return (
    <div className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 overflow-hidden">
      {showCoverButton && isOwnProfile ? (
        <label htmlFor="cover-upload" className="block w-full h-full cursor-pointer">
          <div className="w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-white p-6"
            >
              <FiCamera className="text-4xl mx-auto mb-3" />
              <p className="text-lg font-semibold">Add Cover Image</p>
              <p className="text-sm opacity-90">Click to upload a cover photo</p>
            </motion.div>
          </div>
        </label>
      ) : (
        <div className="relative w-full h-full">
          {coverImage && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          {isOwnProfile && (
            <label htmlFor="cover-upload" className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
              <FiCamera className="text-gray-700 dark:text-gray-300" />
            </label>
          )}
        </div>
      )}
      
      <input
        type="file"
        id="cover-upload"
        accept="image/*"
        onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
        className="hidden"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};