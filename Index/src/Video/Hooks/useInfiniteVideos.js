// import { useState, useEffect, useCallback } from "react";
// import { videoService } from "../services/videoService";

// export function useInfiniteVideos() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);

//   const loadVideos = useCallback(async (pageNum = 1) => {
//     if (loading || !hasMore) return;
    
//     setLoading(true);
//     try {
//       const newVideos = await videoService.fetchVideos(pageNum);
      
//       if (newVideos.length > 0) {
//         setVideos(prev => {
//           const existingIds = new Set(prev.map(v => v.id));
//           const uniqueVideos = newVideos.filter(v => !existingIds.has(v.id));
//           return pageNum === 1 ? newVideos : [...prev, ...uniqueVideos];
//         });
//         setPage(pageNum + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error loading videos:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [loading, hasMore]);

//   const loadMore = useCallback(() => {
//     if (!loading && hasMore) {
//       loadVideos(page);
//     }
//   }, [loadVideos, loading, hasMore, page]);

//   useEffect(() => {
//     loadVideos(1);
//   }, []);

//   return { videos, loading, hasMore, loadMore };
// }

import { useState, useEffect, useCallback, useRef } from "react";
import { videoService } from "../services/videoService";

export function useInfiniteVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const pageRef = useRef(1);
  const abortControllerRef = useRef(null);
  const loadedIdsRef = useRef(new Set());

  // Preload next page when user is near the end
  const preloadNextPage = useCallback(async () => {
    if (loading || !hasMore) return;
    
    const nextPage = pageRef.current + 1;
    try {
      const preloadedVideos = await videoService.fetchVideos(nextPage);
      if (preloadedVideos.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      // Silent fail for preloading
      console.warn('Preload failed:', err);
    }
  }, [loading, hasMore]);

  const loadVideos = useCallback(async (pageNum = 1, isRefresh = false) => {
    // Cancel previous request if still loading
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (loading) return;
    
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    if (isRefresh) {
      setIsInitialLoading(true);
      loadedIdsRef.current.clear();
    }

    try {
      const newVideos = await videoService.fetchVideos(pageNum);
      
      if (newVideos.length === 0) {
        setHasMore(false);
        return;
      }

      setVideos(prev => {
        if (isRefresh) {
          // For refresh, replace all videos
          loadedIdsRef.current = new Set(newVideos.map(v => v.id));
          return newVideos;
        } else {
          // For infinite scroll, append only new videos
          const uniqueVideos = newVideos.filter(v => !loadedIdsRef.current.has(v.id));
          uniqueVideos.forEach(v => loadedIdsRef.current.add(v.id));
          
          return pageNum === 1 ? newVideos : [...prev, ...uniqueVideos];
        }
      });

      pageRef.current = pageNum;
      
      // Preload next page if we have videos
      if (newVideos.length > 0 && pageNum === 1) {
        setTimeout(() => preloadNextPage(), 1000);
      }
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error loading videos:', error);
        setError(error.message);
        
        // Retry logic for initial load
        if (pageNum === 1 && videos.length === 0) {
          setTimeout(() => loadVideos(1), 3000);
        }
      }
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
      abortControllerRef.current = null;
    }
  }, [loading, preloadNextPage, videos.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadVideos(pageRef.current + 1);
    }
  }, [loadVideos, loading, hasMore]);

  const refreshVideos = useCallback(() => {
    if (loading) return;
    setHasMore(true);
    loadVideos(1, true);
  }, [loadVideos, loading]);

  // Optimized scroll handler for infinite loading
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = window.innerHeight + document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.offsetHeight;
    const scrollThreshold = 500; // Start loading 500px before bottom

    if (scrollTop + scrollThreshold >= scrollHeight) {
      loadMore();
    }
  }, [loadMore, loading, hasMore]);

  // Throttled scroll handler
  const throttledScroll = useCallback(() => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll])();

  // Video pre-caching for smoother experience
  const preloadVideo = useCallback((video) => {
    if (video.bestQuality?.link) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = video.bestQuality.link;
      document.head.appendChild(link);
      
      // Preload thumbnail as well
      if (video.thumbnail) {
        const img = new Image();
        img.src = video.thumbnail;
      }
    }
  }, []);

  // Preload next few videos when user is viewing
  useEffect(() => {
    if (videos.length > 0) {
      // Preload next 3 videos that aren't currently visible
      const startIndex = Math.max(0, videos.length - 5);
      const videosToPreload = videos.slice(startIndex, startIndex + 3);
      
      videosToPreload.forEach(video => {
        preloadVideo(video);
      });
    }
  }, [videos, preloadVideo]);

  // Setup scroll listener with debouncing
  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  // Initial load
  useEffect(() => {
    loadVideos(1);
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Batch updates for better performance
  const addVideosBatch = useCallback((newVideos) => {
    setVideos(prev => {
      const uniqueVideos = newVideos.filter(v => !loadedIdsRef.current.has(v.id));
      if (uniqueVideos.length === 0) return prev;
      
      uniqueVideos.forEach(v => loadedIdsRef.current.add(v.id));
      return [...prev, ...uniqueVideos];
    });
  }, []);

  // Optimized video filtering and sorting
  const getFilteredVideos = useCallback((filters = {}) => {
    return videos.filter(video => {
      if (filters.platform && video.platform !== filters.platform) return false;
      if (filters.minLikes && video.likes < filters.minLikes) return false;
      if (filters.maxDuration && video.duration > filters.maxDuration) return false;
      return true;
    });
  }, [videos]);

  return { 
    videos, 
    loading, 
    hasMore, 
    error,
    isInitialLoading,
    loadMore, 
    refreshVideos,
    getFilteredVideos,
    currentPage: pageRef.current
  };
}