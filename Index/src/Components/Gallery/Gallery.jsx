import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

// Services
import { fetchGalleryData, loadMoreData } from './services/galleryService';
import { fetchPexelsData, loadMorePexelsData } from './services/pexelsService';

// Hooks
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useLightbox } from './hooks/useLightbox';
import { useHighlightEffect } from './hooks/useHighlightEffect';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MasonryGrid from './components/MasonryGrid';
import Lightbox from './components/Lightbox';
import FilterButtons from './components/FilterButtons';
import LoadingSpinner from './components/LoadingSpinner';

const Gallery = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { artworkId } = useParams();
  const contentRef = useRef(null);
  
  // State
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [source, setSource] = useState('all');
  
  // Pagination state
  const [paginationState, setPaginationState] = useState({
    featuredPage: 1,
    appwriteLastId: null
  });
  
  // Filter and search state
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Filter and search logic
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMedia(allMedia.filter(item => {
        switch (filter) {
          case 'user':
            return !item.isFeatured;
          case 'featured':
            return item.isFeatured;
          case 'videos':
            return item.type === 'video';
          default:
            return true;
        }
      }));
      setSuggestions([]);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = allMedia.filter(item => {
      switch (filter) {
        case 'user':
          if (item.isFeatured) return false;
          break;
        case 'featured':
          if (!item.isFeatured) return false;
          break;
        case 'videos':
          if (item.type !== 'video') return false;
          break;
        default:
      }

      const matches = [];
      if (item.title) matches.push(item.title.toLowerCase().includes(lowerCaseSearch));
      if (item.description) matches.push(item.description.toLowerCase().includes(lowerCaseSearch));
      if (item.tag) {
        const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
        matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
      }
      return matches.some(Boolean);
    });

    setFilteredMedia(results);

    const suggestionSet = new Set();
    allMedia.filter(item => {
      switch (filter) {
        case 'user':
          return !item.isFeatured;
        case 'featured':
          return item.isFeatured;
        case 'videos':
          return item.type === 'video';
        default:
          return true;
      }
    }).forEach(item => {
      [item.title, item.description].forEach(text => {
        if (text) {
          text.toLowerCase().split(' ')
            .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
            .forEach(word => suggestionSet.add(word));
        }
      });
      if (item.tag) {
        const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
        tags.forEach(tag => {
          if (tag.toLowerCase().includes(lowerCaseSearch)) {
            suggestionSet.add(tag.toLowerCase());
          }
        });
      }
    });

    setSuggestions([...suggestionSet].slice(0, 5));
  }, [searchTerm, allMedia, filter]);

  // Reset everything when filter changes
  useEffect(() => {
    setAllMedia([]);
    setHasMore(true);
    setPaginationState({ featuredPage: 1, appwriteLastId: null });
    setSource(filter === 'all' ? 'user' : filter);
    setLoading(true);
  }, [filter]);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let media, profiles, moreData, pagination;
        if (source === 'featured') {
          const result = await fetchPexelsData(filter, searchTerm);
          media = result.media;
          profiles = result.profiles;
          moreData = result.hasMore;
          pagination = result.pagination;
        } else {
          const result = await fetchGalleryData(source);
          media = result.media;
          profiles = result.profiles;
          moreData = result.hasMore;
          pagination = result.pagination;
        }
        
        setAllMedia(media);
        setUserProfiles(profiles);
        setHasMore(moreData);
        setPaginationState(pagination);
        
      } catch (err) {
        setError(err.message || 'Failed to load gallery');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    if (allMedia.length === 0) {
      loadData();
    }
  }, [source, searchTerm]);  // Note: depends on source and searchTerm for re-fetch if needed

  // Load more handler
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) {
      return;
    }
    
    try {
      setLoadingMore(true);
      let result;
      if (source === 'featured') {
        result = await loadMorePexelsData(filter, searchTerm, paginationState);
      } else {
        result = await loadMoreData(source, allMedia, paginationState);
      }
      
      if (result.media.length > 0) {
        setAllMedia(prev => [...prev, ...result.media]);
        setUserProfiles(prev => ({ ...prev, ...result.profiles }));
      }
      
      setHasMore(result.hasMore);
      setPaginationState(result.pagination);

      // Switch to featured if all and no more appwrite
      if (filter === 'all' && source !== 'featured' && !result.hasMore) {
        setSource('featured');
        setPaginationState({ featuredPage: 1, appwriteLastId: null });
        setHasMore(true);
      }
      
    } catch (err) {
      console.error('Error loading more content:', err);
      setError(err.message || 'Failed to load more');
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [filter, source, searchTerm, loadingMore, hasMore, paginationState, allMedia]);

  // Infinite scroll hook
  const { observerRef } = useInfiniteScroll(
    handleLoadMore,
    hasMore,
    loadingMore
  );

  // Lightbox and highlight hooks
  const { lightbox, openLightbox, closeLightbox, prevImage, nextImage, similarMedia, setSimilarMedia } = 
    useLightbox(allMedia);
  const { highlightedArtwork, artworkRefs } = 
    useHighlightEffect(allMedia, artworkId, searchParams);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
      />
      
      <Header />
      
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        filteredMedia={filteredMedia}
      />

      <FilterButtons 
        filter={filter}
        setFilter={setFilter}
        filteredMedia={filteredMedia}
      />

      {/* Gallery Content */}
      <div ref={contentRef} className="py-8 bg-gray-50 dark:bg-zinc-950 w-full">
        {loading && allMedia.length === 0 ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 p-4">Error loading content: {error}</div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 p-8">
            {searchTerm ? 'No matching content found. Try different keywords.' : 'No content available yet.'}
          </div>
        ) : (
          <>
            <MasonryGrid
              media={filteredMedia}
              userProfiles={userProfiles}
              artworkRefs={artworkRefs}
              highlightedArtwork={highlightedArtwork}
              openLightbox={openLightbox}
            />
            
            {/* Infinite scroll trigger with load more button */}
            {hasMore && (
              <div 
                ref={observerRef} 
                className="h-20 flex items-center justify-center"
                style={{ minHeight: '100px' }}
              >
                {loadingMore ? (
                  <LoadingSpinner small />
                ) : (
                  <button 
                    onClick={handleLoadMore}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
            
            {!hasMore && filteredMedia.length > 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p className="text-sm">You've reached the end! 🎉</p>
                <p className="text-xs mt-1">No more content to load.</p>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox
        lightbox={lightbox}
        allMedia={allMedia}
        userProfiles={userProfiles}
        similarMedia={similarMedia}
        closeLightbox={closeLightbox}
        prevImage={prevImage}
        nextImage={nextImage}
        openLightbox={openLightbox}
      />
    </div>
  );
};

export default Gallery;



