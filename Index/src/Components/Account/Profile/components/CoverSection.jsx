import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Edit2, Grid3X3, Upload, X } from 'lucide-react';
import { predefinedCovers } from '../utils/predefinedCovers';


const CoverSection = ({ coverImage, showCoverButton, isOwnProfile, handleCoverImage }) => {
  const [showSelector, setShowSelector] = useState(false);
  const selectPredefined = (imgUrl) => {
    handleCoverImage(imgUrl);
    setShowSelector(false);
  };
  const handleFileUpload = (e) => {
    handleCoverImage(e);
    setShowSelector(false);
  };
  return (
    <>
      {/* Cover Wrapper */}
      <motion.div
        className="w-full md:w-[80%] mx-auto h-72 sm:h-80 md:h-96 relative rounded-b-2xl overflow-visible md:overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* If no cover image -> show upload placeholder */}
        {showCoverButton && isOwnProfile && !coverImage ? (
          <button
            onClick={() => setShowSelector(true)}
            className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 cursor-pointer hover:opacity-90 transition-all"
            type="button"
          >
            <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm">
              <Camera className="mx-auto text-2xl text-gray-500 dark:text-gray-400 mb-2" />
              <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">Add Cover Image</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Choose from gallery or upload</p>
            </div>
          </button>
        ) : (
          <div className="relative w-full h-full">
            {/* Cover Image */}
            {coverImage ? (
              <>
                <motion.img
                  key={coverImage}
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  loading="eager" // Prioritize cover image loading
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                {/* Edit Button */}
                {isOwnProfile && (
                  <button
                    onClick={() => setShowSelector(true)}
                    className="absolute bottom-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 p-2.5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:scale-105 transition-all cursor-pointer backdrop-blur-sm"
                    type="button"
                    aria-label="Change cover image"
                  >
                    <Edit2 size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                {/* Edit button for empty state */}
                {isOwnProfile && (
                  <button
                    onClick={() => setShowSelector(true)}
                    className="absolute bottom-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 p-2.5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:scale-105 transition-all cursor-pointer backdrop-blur-sm"
                    type="button"
                    aria-label="Add cover image"
                  >
                    <Edit2 size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>
      {/* Hidden file input */}
      <input
        type="file"
        id="cover-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />
      {/* Image Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 lg:p-4 p-0 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSelector(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-[95%] lg:max-w-3xl w-full max-h-[80vh] flex flex-col hide-scrollbar"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Grid3X3 size={18} className="text-gray-500 dark:text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Choose Cover
                  </h2>
                </div>
                <button
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setShowSelector(false)}
                  aria-label="Close modal"
                >
                  <X size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              {/* Image Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {predefinedCovers.map((img, i) => (
                    <motion.button
                      key={i}
                      className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectPredefined(img)}
                      type="button"
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`Cover option ${i + 1}`}
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Upload Section */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <label
                  htmlFor="cover-upload"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-medium text-sm"
                  onClick={() => setShowSelector(false)}
                >
                  <Upload size={16} />
                  Upload Custom Image
                </label>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default CoverSection;