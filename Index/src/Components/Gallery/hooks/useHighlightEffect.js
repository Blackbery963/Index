import { useState, useEffect, useRef } from 'react';

export const useHighlightEffect = (allMedia, artworkId, searchParams) => {
  const [highlightedArtwork, setHighlightedArtwork] = useState(null);
  const artworkRefs = useRef({});

  useEffect(() => {
    if (allMedia.length > 0) {
      const artworkToHighlight = artworkId 
        ? allMedia.find(art => art.$id === artworkId)
        : searchParams.get('highlight') 
          ? allMedia.find(art => art.$id === searchParams.get('highlight'))
          : null;

      if (artworkToHighlight) {
        setHighlightedArtwork(artworkToHighlight.$id);
        
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => {
          if (artworkRefs.current[artworkToHighlight.$id]) {
            const element = artworkRefs.current[artworkToHighlight.$id];
            
            // Scroll to the highlighted artwork
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
            
            // Add highlight styles
            element.classList.add('highlighted-artwork');
            
            // Remove highlight after 5 seconds
            setTimeout(() => {
              if (artworkRefs.current[artworkToHighlight.$id]) {
                const el = artworkRefs.current[artworkToHighlight.$id];
                el.classList.remove('highlighted-artwork');
                setHighlightedArtwork(null);
                
                // Clean up URL if highlighted via search params
                if (searchParams.get('highlight')) {
                  const newUrl = new URL(window.location);
                  newUrl.searchParams.delete('highlight');
                  window.history.replaceState({}, '', newUrl);
                }
              }
            }, 5000);
          }
        }, 300);
      }
    }
  }, [allMedia, artworkId, searchParams]);

  return {
    highlightedArtwork,
    artworkRefs
  };
};