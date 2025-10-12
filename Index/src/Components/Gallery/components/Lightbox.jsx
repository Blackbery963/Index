import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Lightbox = ({ 
  lightbox, 
  allMedia, 
  userProfiles, 
  similarMedia, 
  closeLightbox, 
  prevImage, 
  nextImage, 
  openLightbox 
}) => {
  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const currentMedia = allMedia[lightbox.index];

  if (!currentMedia) return null;

  return (
    <AnimatePresence>
      {lightbox.open && (
        <motion.div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Display */}
            {currentMedia.type === 'video' ? (
              <video
                src={currentMedia.url}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                controls
                autoPlay
              />
            ) : (
              <img
                src={currentMedia.url}
                alt={currentMedia.title || 'Artwork'}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            )}

            {/* Controls */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <IoClose size={28} />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <FaArrowLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <FaArrowRight size={24} />
            </button>

            {/* Media Info */}
            <div className="text-center text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mx-4 mt-4">
              <p className="text-xl font-medium mb-1">{currentMedia.title || 'Untitled'}</p>
              <p className="text-sm">
                {lightbox.index + 1} / {allMedia.length} • 
                By {currentMedia.isFeatured 
                  ? (currentMedia.photographer || 'Pexels Artist')
                  : (userProfiles[currentMedia.userId]?.name || 'Unknown Artist')}
              </p>
              {currentMedia.description && (
                <p className="text-sm mt-2 opacity-90">{currentMedia.description}</p>
              )}
              {currentMedia.isFeatured && currentMedia.photographerUrl && (
                <p className="text-sm mt-1">
                  <a 
                    href={currentMedia.photographerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-green-400"
                  >
                    View photographer's profile
                  </a>
                </p>
              )}
              {currentMedia.type === 'video' && currentMedia.duration && (
                <p className="text-sm mt-1">
                  Duration: {Math.floor(currentMedia.duration / 60)}:{(currentMedia.duration % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>

            {/* Similar Media */}
            {similarMedia.length > 0 && (
              <div className="mt-4">
                <h4 className="text-white text-lg font-medium mb-3 text-center">Similar Content</h4>
                <div className="flex flex-wrap justify-center gap-4 overflow-x-auto pb-4">
                  {similarMedia.map((simMedia) => (
                    <div
                      key={simMedia.$id}
                      className="w-20 h-20 cursor-pointer group relative"
                      onClick={() => {
                        const originalIndex = allMedia.findIndex(media => media.$id === simMedia.$id);
                        openLightbox(originalIndex);
                      }}
                    >
                      {simMedia.type === 'video' ? (
                        <video
                          src={simMedia.url}
                          className="w-full h-full object-cover rounded-md group-hover:opacity-80 transition-opacity"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={simMedia.url}
                          alt={simMedia.title}
                          className="w-full h-full object-cover rounded-md group-hover:opacity-80 transition-opacity"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;