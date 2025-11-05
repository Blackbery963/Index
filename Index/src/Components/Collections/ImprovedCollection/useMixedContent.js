import { useMemo, useCallback } from 'react';

export const useMixedContent = (images, viewMode, manualContent) => {
  const mixedContent = useMemo(() => {
    const content = [];
    let contentCounter = 0;

    // Always include standalone content first
    manualContent.forEach(item => {
      content.push(item);
    });

    // Then mix in images if available
    if (images.length > 0) {
      let imageIndex = 0;
      const totalImages = images.length;

      while (imageIndex < totalImages) {
        contentCounter++;

        // Add image content regularly
        if (viewMode === 'collage' && contentCounter % 4 === 0 && imageIndex + 3 <= totalImages) {
          const collageImages = images.slice(imageIndex, imageIndex + 3);
          content.push({ 
            type: 'collage', 
            data: collageImages,
            id: `collage-${imageIndex}`,
            timestamp: Date.now() + imageIndex
          });
          imageIndex += 3;
        } else if (imageIndex < totalImages) {
          content.push({ 
            type: 'image', 
            data: images[imageIndex],
            id: `image-${images[imageIndex].id}`,
            timestamp: Date.now() + imageIndex
          });
          imageIndex++;
        }

        // Add additional standalone content periodically
        if (contentCounter % 5 === 0 && manualContent.length > 0) {
          const randomContent = manualContent[contentCounter % manualContent.length];
          content.push({
            ...randomContent,
            id: `${randomContent.type}-extra-${contentCounter}`
          });
        }
      }
    }

    // Sort by timestamp to maintain consistent order
    return content.sort((a, b) => a.timestamp - b.timestamp);
  }, [images, viewMode, manualContent]);

  const generateStandaloneContent = useCallback(() => {
    const contentTypes = [
      'mini-categories',
      'products', 
      'daily-challenge',
      'mini-artisan',
      'diary',
      'mini-commerce',
      'communities',
      'artists',
      'research'
    ];

    return contentTypes.map((type, index) => ({
      type,
      data: null,
      id: `standalone-${type}-${index}`,
      timestamp: Date.now() + index
    }));
  }, []);

  return {
    mixedContent,
    generateStandaloneContent
  };
};