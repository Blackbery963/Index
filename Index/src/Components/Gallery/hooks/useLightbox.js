import { useState, useEffect } from 'react';

export const useLightbox = (allMedia) => {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [similarMedia, setSimilarMedia] = useState([]);
  const [pexelsViewCounts, setPexelsViewCounts] = useState({});

  // Increment view count for Pexels media
  const incrementViewCount = (mediaId) => {
    if (mediaId.startsWith('pexels-')) {
      setPexelsViewCounts(prev => ({
        ...prev,
        [mediaId]: (prev[mediaId] || 0) + 1
      }));
    }
  };

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
    
    const currentMedia = allMedia[index];
    incrementViewCount(currentMedia.$id);

    // Find similar media based on tags or title
    const similar = allMedia.filter((media, i) => {
      if (i === index) return false;
      
      const currentTags = Array.isArray(currentMedia.tag) ? currentMedia.tag : [currentMedia.tag];
      const mediaTags = Array.isArray(media.tag) ? media.tag : [media.tag];
      
      // Check tag similarity
      const tagSimilarity = currentTags.some(tag => 
        mediaTags.includes(tag)
      );
      
      // Check title similarity (first word)
      const titleSimilarity = currentMedia.title && media.title && 
        currentMedia.title.toLowerCase().split(' ')[0] === 
        media.title.toLowerCase().split(' ')[0];
      
      return tagSimilarity || titleSimilarity;
    }).slice(0, 6); // Limit to 6 similar items
    
    setSimilarMedia(similar);
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 });
    setSimilarMedia([]);
  };

  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      index: prev.index > 0 ? prev.index - 1 : allMedia.length - 1
    }));
    
    // Update similar media when navigating
    const newIndex = lightbox.index > 0 ? lightbox.index - 1 : allMedia.length - 1;
    updateSimilarMedia(newIndex);
  };

  const nextImage = () => {
    setLightbox(prev => ({
      ...prev,
      index: prev.index < allMedia.length - 1 ? prev.index + 1 : 0
    }));
    
    // Update similar media when navigating
    const newIndex = lightbox.index < allMedia.length - 1 ? lightbox.index + 1 : 0;
    updateSimilarMedia(newIndex);
  };

  const updateSimilarMedia = (index) => {
    const currentMedia = allMedia[index];
    const similar = allMedia.filter((media, i) => {
      if (i === index) return false;
      
      const currentTags = Array.isArray(currentMedia.tag) ? currentMedia.tag : [currentMedia.tag];
      const mediaTags = Array.isArray(media.tag) ? media.tag : [media.tag];
      
      const tagSimilarity = currentTags.some(tag => 
        mediaTags.includes(tag)
      );
      
      const titleSimilarity = currentMedia.title && media.title && 
        currentMedia.title.toLowerCase().split(' ')[0] === 
        media.title.toLowerCase().split(' ')[0];
      
      return tagSimilarity || titleSimilarity;
    }).slice(0, 6);
    
    setSimilarMedia(similar);
  };

  // Update view counts in media items
  const mediaWithViewCounts = allMedia.map(media => {
    if (media.isFeatured && pexelsViewCounts[media.$id]) {
      return {
        ...media,
        viewCount: pexelsViewCounts[media.$id]
      };
    }
    return media;
  });

  return {
    lightbox,
    openLightbox,
    closeLightbox,
    prevImage,
    nextImage,
    similarMedia,
    setSimilarMedia,
    mediaWithViewCounts
  };
};