import { useState, useEffect, useCallback } from "react";
import { videoService } from "../services/videoService";

export function useInfiniteVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadVideos = useCallback(async (pageNum = 1) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newVideos = await videoService.fetchVideos(pageNum);
      
      if (newVideos.length > 0) {
        setVideos(prev => {
          const existingIds = new Set(prev.map(v => v.id));
          const uniqueVideos = newVideos.filter(v => !existingIds.has(v.id));
          return pageNum === 1 ? newVideos : [...prev, ...uniqueVideos];
        });
        setPage(pageNum + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadVideos(page);
    }
  }, [loadVideos, loading, hasMore, page]);

  useEffect(() => {
    loadVideos(1);
  }, []);

  return { videos, loading, hasMore, loadMore };
}