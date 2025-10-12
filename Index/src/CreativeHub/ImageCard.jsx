import { useState } from 'react';
import { Heart, Bookmark } from 'lucide-react';

const ImageCard = ({ image, compact = false, onImageClick, onLike, onSave, likedImages, savedImages }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLiked = likedImages?.includes(image.id);
  const isSaved = savedImages?.includes(image.id);

  const handleLike = (e) => {
    e.stopPropagation();
    onLike?.(image.id);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave?.(image.id);
  };

  if (compact) {
    return (
      <div 
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onImageClick?.(image)}
      >
        <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {!compact && (
          <div className="mt-2">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{image.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">{image.artist}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onImageClick?.(image)}
    >
      <div className="relative aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay actions */}
        <div className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleSave}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isSaved
                ? 'bg-blue-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom info overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <h3 className="text-white font-medium text-sm">{image.title}</h3>
          <p className="text-white/80 text-xs">{image.artist}</p>
        </div>
      </div>

      {/* Always visible info for non-compact cards */}
      {!compact && (
        <div className="mt-3">
          <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{image.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs">{image.artist}</p>
          {image.tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {image.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCard;