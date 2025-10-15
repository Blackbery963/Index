import React from 'react';
import ImageCard from '../../ImageCard';
import ImageCollage from '../../ImageCollage';

const ImageContentRenderer = ({ 
  item, 
  viewMode, 
  likedImages, 
  savedImages, 
  categories, 
  handleLike, 
  handleSave, 
  formatTimestamp,
  onImageClick,
  onCollageClick 
}) => {
  if (!item.data) return null;

  try {
    switch (item.type) {
      case 'collage':
        return (
          <ImageCollage 
            groupImages={item.data} 
            onImageClick={onCollageClick}
            likedImages={likedImages}
            savedImages={savedImages}
            onLike={handleLike}
            onSave={handleSave}
            categories={categories}
          />
        );

      case 'image':
        return (
          <ImageCard 
            key={item.data.id} 
            image={item.data} 
            onImageClick={onImageClick}
            likedImages={likedImages}
            savedImages={savedImages}
            onLike={handleLike}
            onSave={handleSave}
            formatTimestamp={formatTimestamp}
            viewMode={viewMode}
          />
        );

      default:
        return null;
    }
  } catch (error) {
    console.error(`Error rendering ${item.type}:`, error);
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Error loading {item.type} content
        </p>
      </div>
    );
  }
};

export default ImageContentRenderer;