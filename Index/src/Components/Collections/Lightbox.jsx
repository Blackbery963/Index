import { X, Heart, Bookmark, Download, Calendar, User, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const Lightbox = ({ 
  selectedImage, 
  onClose, 
  likedImages, 
  savedImages, 
  onLike, 
  onSave 
}) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!selectedImage) return null;

  const isLiked = likedImages.has(selectedImage.id);
  const isSaved = savedImages.has(selectedImage.id);

  // Format date for metadata
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get image dimensions for metadata (simulated)
  const getImageDimensions = () => {
    const widths = [1920, 1600, 1280, 1024, 800];
    const heights = [1080, 1200, 853, 768, 600];
    const randomIndex = Math.floor(Math.random() * widths.length);
    return `${widths[randomIndex]} × ${heights[randomIndex]}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Main content container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="h-full flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-7xl w-full max-h-[95vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Header with actions */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{selectedImage.artist}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedImage.timestamp || Date.now())}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLike(selectedImage.id)}
                  className={`p-2 rounded-lg transition-all ${
                    isLiked
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={() => onSave(selectedImage.id)}
                  className={`p-2 rounded-lg transition-all ${
                    isSaved
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={() => window.open(selectedImage.src, '_blank')}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-500 hover:text-white transition-all"
                >
                  <Download className="w-5 h-5" />
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Image section */}
              <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 min-h-[400px]">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Metadata and info section */}
              <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Title and basic info */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedImage.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {selectedImage.description}
                    </p>
                  </div>

                  {/* Engagement stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedImage.likes}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedImage.views}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedImage.comments}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Comments</div>
                    </div>
                  </div>

                  {/* Technical metadata */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Image Details
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getImageDimensions()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Category:</span>
                        <div className="font-medium text-gray-900 dark:text-white capitalize">
                          {selectedImage.category}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Source:</span>
                        <div className="font-medium text-gray-900 dark:text-white capitalize">
                          {selectedImage.source}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">ID:</span>
                        <div className="font-mono text-xs text-gray-900 dark:text-white truncate">
                          {selectedImage.id}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Download section */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => window.open(selectedImage.src, '_blank')}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      Download Original
                    </button>
                    <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-2">
                      High quality • {selectedImage.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Close hint */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
          Click anywhere outside or press ESC to close
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;