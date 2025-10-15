import { useState, useEffect, useRef, useCallback } from "react";
import { useCollection } from "../useCollection";
import { useMixedContent } from './useMixedContent';
import CollectionHeader from './CollectionHeader';
import CollectionContent from './CollectionContent';
import ImageContentRenderer from './ContentRenderers/ImageContentRenderer';
import MixedContentRenderer from './ContentRenderers/MixedContentRenderer';

// Persistent storage for scroll position and loaded content
const PERSISTENT_STORAGE_KEY = 'improved-collection-state';

const ImprovedCollection = () => {
  const {
    images,
    loading,
    error,
    hasMore,
    feedType,
    setFeedType,
    selectedCategories,
    setSelectedCategories,
    likedImages,
    savedImages,
    categories,
    loadMore,
    handleLike,
    handleSave,
    formatTimestamp
  } = useCollection();

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('feed');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCollage, setSelectedCollage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Persistent state
  const [localState, setLocalState] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(PERSISTENT_STORAGE_KEY) : null;
    return saved ? JSON.parse(saved) : {
      likedProducts: [],
      savedProducts: [],
      followedArtists: [],
      scrollPosition: 0,
      loadedContentCount: 0
    };
  });

  const [manualContent, setManualContent] = useState([]);
  const containerRef = useRef(null);
  const lastElementRef = useRef(null);

  // Custom hooks
  const { mixedContent, generateStandaloneContent } = useMixedContent(images, viewMode, manualContent);

  // Initialize manual content
  useEffect(() => {
    if (manualContent.length === 0) {
      setManualContent(generateStandaloneContent());
    }
  }, [generateStandaloneContent, manualContent.length]);

  // Convert arrays to Sets for efficient lookups
  const likedProductsSet = new Set(localState.likedProducts);
  const savedProductsSet = new Set(localState.savedProducts);
  const followedArtistsSet = new Set(localState.followedArtists);

  // Handlers
  const handleProductLike = useCallback((productId) => {
    setLocalState(prev => {
      const newLiked = prev.likedProducts.includes(productId)
        ? prev.likedProducts.filter(id => id !== productId)
        : [...prev.likedProducts, productId];
      return { ...prev, likedProducts: newLiked };
    });
  }, []);

  const handleProductSave = useCallback((productId) => {
    setLocalState(prev => {
      const newSaved = prev.savedProducts.includes(productId)
        ? prev.savedProducts.filter(id => id !== productId)
        : [...prev.savedProducts, productId];
      return { ...prev, savedProducts: newSaved };
    });
  }, []);

  const handleArtistFollow = useCallback((artistId) => {
    setLocalState(prev => {
      const newFollowed = prev.followedArtists.includes(artistId)
        ? prev.followedArtists.filter(id => id !== artistId)
        : [...prev.followedArtists, artistId];
      return { ...prev, followedArtists: newFollowed };
    });
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);
    setLocalState(prev => ({
      ...prev,
      loadedContentCount: prev.loadedContentCount + 1
    }));
  }, [loading, hasMore, isLoadingMore, loadMore]);

  const renderContentItem = useCallback((item) => {
    // Image-related content
    if (item.type === 'image' || item.type === 'collage') {
      return (
        <ImageContentRenderer
          item={item}
          viewMode={viewMode}
          likedImages={likedImages}
          savedImages={savedImages}
          categories={categories}
          handleLike={handleLike}
          handleSave={handleSave}
          formatTimestamp={formatTimestamp}
          onImageClick={setSelectedImage}
          onCollageClick={(image, images) => {
            setSelectedCollage(images);
            setCurrentSlideIndex(images.indexOf(image));
          }}
        />
      );
    }

    // Mixed content
    return (
      <MixedContentRenderer
        item={item}
        viewMode={viewMode}
        likedProducts={likedProductsSet}
        savedProducts={savedProductsSet}
        followedArtists={followedArtistsSet}
        handleProductLike={handleProductLike}
        handleProductSave={handleProductSave}
        handleArtistFollow={handleArtistFollow}
        formatTimestamp={formatTimestamp}
      />
    );
  }, [viewMode, likedImages, savedImages, categories, handleLike, handleSave, handleProductLike, handleProductSave, handleArtistFollow, formatTimestamp]);

  // Persistence effects (same as before)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PERSISTENT_STORAGE_KEY, JSON.stringify(localState));
    }
  }, [localState]);

  useEffect(() => {
    if (containerRef.current && localState.scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo(0, localState.scrollPosition);
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        setLocalState(prev => ({
          ...prev,
          scrollPosition: window.scrollY
        }));
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#000705]">
      <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
        <CollectionHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          feedType={feedType}
          setFeedType={setFeedType}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <CollectionContent
          error={error}
          loading={loading}
          images={images}
          manualContent={manualContent}
          mixedContent={mixedContent}
          viewMode={viewMode}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          handleLoadMore={handleLoadMore}
          renderContentItem={renderContentItem}
          lastElementRef={lastElementRef}
        />
      </div>
    </div>
  );
};

export default ImprovedCollection;
