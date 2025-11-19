import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useCollection } from "../useCollection";
import { useMixedContent } from './useMixedContent';
import CollectionHeader from './CollectionHeader';
import CollectionContent from './CollectionContent';
import ArtworkCard from "../../../FrontGallery/ArtworkCard";
import ImageCard from "../../../FrontGallery/ImageCard";
import VideoCard from "../../../FrontGallery/VideoCard";
import ImageContentRenderer from './ContentRenderers/ImageContentRenderer';
import MixedContentRenderer from './ContentRenderers/MixedContentRenderer';
import { fetchAppwriteMedia } from "../../../FrontGallery/AppwriteService";

const STORAGE_KEY = 'collection-state';

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

  // UI State
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('feed');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCollage, setSelectedCollage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Gallery State
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [galleryProfiles, setGalleryProfiles] = useState({});
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryHasMore, setGalleryHasMore] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  
  // Single unified filter
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Persistent interactions
  const [interactions, setInteractions] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved ? JSON.parse(saved) : {
      likedProducts: [],
      savedProducts: [],
      followedArtists: []
    };
  });

  const [manualContent, setManualContent] = useState([]);
  const containerRef = useRef(null);

  // Load gallery content
  useEffect(() => {
    const loadGallery = async () => {
      try {
        setGalleryLoading(true);
        const result = await fetchAppwriteMedia(activeFilter, 1, { pageSize: 15 });
        setGalleryMedia(result.media);
        setGalleryProfiles(result.profiles);
        setGalleryHasMore(result.pagination?.hasMore || false);
        setGalleryPage(1);
      } catch (err) {
        console.error('Gallery load error:', err);
      } finally {
        setGalleryLoading(false);
      }
    };
    loadGallery();
  }, [activeFilter]);

  // Load more gallery
  const loadMoreGallery = useCallback(async () => {
    if (!galleryHasMore) return;
    try {
      const nextPage = galleryPage + 1;
      const result = await fetchAppwriteMedia(activeFilter, nextPage, { pageSize: 12 });
      setGalleryMedia(prev => [...prev, ...result.media]);
      setGalleryProfiles(prev => ({ ...prev, ...result.profiles }));
      setGalleryHasMore(result.pagination?.hasMore || false);
      setGalleryPage(nextPage);
    } catch (err) {
      console.error('Load more error:', err);
    }
  }, [galleryHasMore, galleryPage, activeFilter]);

  // Mixed content hook
  const { mixedContent, generateStandaloneContent } = useMixedContent(images, viewMode, manualContent);

  useEffect(() => {
    if (manualContent.length === 0) {
      setManualContent(generateStandaloneContent());
    }
  }, [generateStandaloneContent, manualContent.length]);

  // Memoized sets for performance
  const interactionSets = useMemo(() => ({
    liked: new Set(interactions.likedProducts),
    saved: new Set(interactions.savedProducts),
    followed: new Set(interactions.followedArtists)
  }), [interactions]);

  // Interaction handlers
  const toggleLike = useCallback((id) => {
    setInteractions(prev => ({
      ...prev,
      likedProducts: prev.likedProducts.includes(id)
        ? prev.likedProducts.filter(x => x !== id)
        : [...prev.likedProducts, id]
    }));
  }, []);

  const toggleSave = useCallback((id) => {
    setInteractions(prev => ({
      ...prev,
      savedProducts: prev.savedProducts.includes(id)
        ? prev.savedProducts.filter(x => x !== id)
        : [...prev.savedProducts, id]
    }));
  }, []);

  const toggleFollow = useCallback((id) => {
    setInteractions(prev => ({
      ...prev,
      followedArtists: prev.followedArtists.includes(id)
        ? prev.followedArtists.filter(x => x !== id)
        : [...prev.followedArtists, id]
    }));
  }, []);

  // Load more for API content
  const loadMoreContent = useCallback(async () => {
    if (loading || !hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);
  }, [loading, hasMore, isLoadingMore, loadMore]);

  // Unified content stream - simple interleaving
  const unifiedContent = useMemo(() => {
    const stream = [];
    const gallery = galleryMedia.map(item => ({ ...item, source: 'gallery' }));
    const content = mixedContent.map(item => ({ ...item, source: 'content' }));
    
    // Simple merge: alternate between gallery and content
    const maxLength = Math.max(gallery.length, content.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < gallery.length) stream.push(gallery[i]);
      if (i < content.length) stream.push(content[i]);
    }
    
    return stream;
  }, [galleryMedia, mixedContent]);

  // Unified renderer
  const renderItem = useCallback((item) => {
    // Gallery items
    if (item.source === 'gallery') {
      const profile = galleryProfiles[item.userId] || {};
      const enhanced = {
        ...item,
        artist: profile.name || 'Unknown Artist',
        profileImage: profile.profileImage
      };

      if (item.category === 'video') {
        return (
          <VideoCard
            video={enhanced}
            onVideoClick={(v) => console.log('Video:', v)}
            likedVideos={likedImages}
            savedVideos={savedImages}
            onLike={handleLike}
            onSave={handleSave}
            formatTimestamp={formatTimestamp}
            viewMode={viewMode}
          />
        );
      }
      
      if (item.category === 'for-sale') {
        return (
          <ArtworkCard
            artwork={enhanced}
            onArtworkClick={(a) => console.log('Artwork:', a)}
            likedArtworks={likedImages}
            savedArtworks={savedImages}
            onLike={handleLike}
            onSave={handleSave}
            formatTimestamp={formatTimestamp}
            viewMode={viewMode}
          />
        );
      }
      
      return (
        <ImageCard
          image={enhanced}
          onImageClick={setSelectedImage}
          likedImages={likedImages}
          savedImages={savedImages}
          onLike={handleLike}
          onSave={handleSave}
          formatTimestamp={formatTimestamp}
          viewMode={viewMode}
        />
      );
    }

    // API image content
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
          onCollageClick={(img, imgs) => {
            setSelectedCollage(imgs);
            setCurrentSlideIndex(imgs.indexOf(img));
          }}
        />
      );
    }

    // Other mixed content
    return (
      <MixedContentRenderer
        item={item}
        viewMode={viewMode}
        likedProducts={interactionSets.liked}
        savedProducts={interactionSets.saved}
        followedArtists={interactionSets.followed}
        handleProductLike={toggleLike}
        handleProductSave={toggleSave}
        handleArtistFollow={toggleFollow}
        formatTimestamp={formatTimestamp}
      />
    );
  }, [
    viewMode, likedImages, savedImages, categories, 
    handleLike, handleSave, formatTimestamp,
    galleryProfiles, interactionSets,
    toggleLike, toggleSave, toggleFollow
  ]);

  // Combined load more
  const loadMoreAll = useCallback(async () => {
    await Promise.all([
      loadMoreGallery(),
      loadMoreContent()
    ]);
  }, [loadMoreGallery, loadMoreContent]);

  // Save interactions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(interactions));
    }
  }, [interactions]);

  // Combined states
  const isLoading = loading && galleryLoading;
  // const isLoadingMore = isLoadingMore;
  const hasMoreContent = hasMore || galleryHasMore;
  const hasError = error;

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
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          galleryFilters={[
            { key: 'all', label: 'All' },
            { key: 'images', label: 'Images' },
            { key: 'videos', label: 'Videos' },
            { key: 'for-sale', label: 'For Sale' }
          ]}
        />

        <CollectionContent
          error={hasError}
          loading={isLoading}
          images={unifiedContent}
          manualContent={manualContent}
          mixedContent={unifiedContent}
          viewMode={viewMode}
          hasMore={hasMoreContent}
          isLoadingMore={isLoadingMore}
          handleLoadMore={loadMoreAll}
          renderContentItem={renderItem}
        />
      </div>
    </div>
  );
};

export default ImprovedCollection;