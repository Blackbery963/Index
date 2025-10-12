import { Layers, Heart, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageCollage = ({ 
  groupImages, 
  onImageClick, 
  likedImages, 
  savedImages, 
  onLike, 
  onSave, 
  categories 
}) => {
  const imageCount = groupImages.length;
  const category = groupImages[0].category;
  const categoryInfo = categories.find(c => c.id === category);

  const CollageImage = ({ image, large = false, onClick }) => (
    <motion.div 
      className={`relative group cursor-pointer rounded-xl overflow-hidden ${
        large ? 'h-full' : 'h-32'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={image.src} 
        alt={image.title} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        loading="lazy" 
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      
      {/* Overlay Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white text-xs">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLike(image.id, image);
              }}
              className={`transition-colors ${
                likedImages.has(image.id) ? 'text-red-400' : 'text-white hover:text-red-300'
              }`}
            >
              <Heart className={`w-3 h-3 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
            </button>
            <span>{image.likes}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSave(image.id, image);
            }}
            className={`transition-colors ${
              savedImages.has(image.id) ? 'text-blue-400' : 'text-white hover:text-blue-300'
            }`}
          >
            <Bookmark className={`w-3 h-3 ${savedImages.has(image.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-6 break-inside-avoid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {imageCount} Similar {categoryInfo?.name || 'Artworks'}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Curated collection based on style and theme
              </p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
            categoryInfo?.color || 'bg-gray-500'
          } bg-opacity-20 text-gray-700 dark:text-gray-300`}>
            {categoryInfo?.name || category}
          </span>
        </div>
      </div>

      {/* Collage Layout */}
      <div className="p-3">
        {imageCount === 2 && (
          <div className="grid grid-cols-2 gap-3">
            {groupImages.map((image, index) => (
              <CollageImage 
                key={image.id} 
                image={image} 
                onClick={() => onImageClick(image, groupImages)} 
              />
            ))}
          </div>
        )}

        {imageCount === 3 && (
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 h-48">
              <CollageImage 
                image={groupImages[0]} 
                large 
                onClick={() => onImageClick(groupImages[0], groupImages)} 
              />
            </div>
            {groupImages.slice(1).map((image, idx) => (
              <CollageImage 
                key={image.id} 
                image={image} 
                onClick={() => onImageClick(image, groupImages)} 
              />
            ))}
          </div>
        )}

        {imageCount === 4 && (
          <div className="grid grid-cols-2 gap-3">
            {groupImages.map((image, idx) => (
              <CollageImage 
                key={image.id} 
                image={image} 
                onClick={() => onImageClick(image, groupImages)} 
              />
            ))}
          </div>
        )}

        {imageCount >= 5 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 row-span-2 h-64">
              <CollageImage 
                image={groupImages[0]} 
                large 
                onClick={() => onImageClick(groupImages[0], groupImages)} 
              />
            </div>
            {groupImages.slice(1, 5).map((image, idx) => (
              <CollageImage 
                key={image.id} 
                image={image} 
                onClick={() => onImageClick(image, groupImages)} 
              />
            ))}
            {imageCount > 5 && (
              <motion.div 
                className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
                onClick={() => onImageClick(groupImages[5], groupImages)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">+{imageCount - 5}</div>
                  <div className="text-xs opacity-90 group-hover:opacity-100">More</div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              {groupImages.reduce((sum, img) => sum + img.likes, 0)}
            </span>{' '}
            total likes
          </div>
          <button 
            className="text-purple-500 hover:text-purple-600 font-semibold flex items-center gap-2 transition-colors"
            onClick={() => onImageClick(groupImages[0], groupImages)}
          >
            View all {imageCount}
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCollage;