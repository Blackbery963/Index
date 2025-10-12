// // import { useState, useEffect, useCallback, useRef } from 'react';

// // export const useInfiniteScroll = (loadMore, hasMore, loading) => {
// //   const [isFetching, setIsFetching] = useState(false);
// //   const observerRef = useRef(null);

// //   // Create observer callback
// //   const handleObserver = useCallback((entries) => {
// //     const [entry] = entries;
// //     if (entry.isIntersecting && hasMore && !loading && !isFetching) {
// //       setIsFetching(true);
// //     }
// //   }, [hasMore, loading, isFetching]);

// //   // Set up intersection observer
// //   useEffect(() => {
// //     const observer = new IntersectionObserver(handleObserver, {
// //       root: null,
// //       rootMargin: '100px', // Start loading 100px before reaching the bottom
// //       threshold: 0.1
// //     });

// //     const currentObserver = observerRef.current;
// //     if (currentObserver) {
// //       observer.observe(currentObserver);
// //     }

// //     return () => {
// //       if (currentObserver) {
// //         observer.unobserve(currentObserver);
// //       }
// //     };
// //   }, [handleObserver]);

// //   // Handle loading more data
// //   useEffect(() => {
// //     if (!isFetching) return;

// //     const fetchData = async () => {
// //       try {
// //         await loadMore();
// //       } catch (error) {
// //         console.error('Error loading more data:', error);
// //       } finally {
// //         setIsFetching(false);
// //       }
// //     };

// //     fetchData();
// //   }, [isFetching, loadMore]);

// //   return { observerRef, isFetching };
// // };

import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = (loadMore, hasMore, loading) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef(null);

  // Create observer callback
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !loading && !isFetching) {
      setIsFetching(true);
    }
  }, [hasMore, loading, isFetching]);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [handleObserver]);

  // Handle loading more data - FIXED: Reset isFetching after load
  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      try {
        await loadMore();
      } catch (error) {
        console.error('Error loading more data:', error);
      } finally {
        setIsFetching(false); // This was missing!
      }
    };

    fetchData();
  }, [isFetching, loadMore]);

  return { observerRef, isFetching };
};
