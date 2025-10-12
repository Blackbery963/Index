// UnifiedFeed.jsx
import { useState, useMemo } from 'react';
import { useCollection } from './useCollection';
import ArtCategories from './ArtCategories';
import ArtistDiscovery from './ArtistDiscovery';
import DiaryTemplate from './DiaryTemplate';
import Gateway from './Gateway';
import ArtResearchPage from './ArtResearchPage';
import Commerce from './Commerce';
import Visual from './Visual';
import ImageCard from './ImageCard';
import { Sparkles, Users, BookOpen, ShoppingBag, Palette, Grid } from 'lucide-react';

const UnifiedFeed = () => {
  const {
    images,
    loading,
    hasMore,
    loadMore
  } = useCollection();

  const [activeFilter, setActiveFilter] = useState('all');

  const feedSections = [
    { id: 'all', label: 'For You', icon: Sparkles },
    { id: 'artists', label: 'Artists', icon: Users },
    { id: 'diaries', label: 'Diaries', icon: BookOpen },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'learn', label: 'Learn', icon: Palette },
    { id: 'communities', label: 'Communities', icon: Grid }
  ];

  // Mix content types based on filter
  const mixedContent = useMemo(() => {
    const content = [];
    
    // Always start with some images
    if (images.length > 0) {
      content.push({ type: 'image_grid', data: images.slice(0, 6) });
    }

    // Add featured categories
    content.push({ type: 'categories', data: {} });

    // Add artists discovery
    if (activeFilter === 'all' || activeFilter === 'artists') {
      content.push({ type: 'artists', data: {} });
    }

    // Add diaries
    if (activeFilter === 'all' || activeFilter === 'diaries') {
      content.push({ type: 'diaries', data: {} });
    }

    // Add communities
    if (activeFilter === 'all' || activeFilter === 'communities') {
      content.push({ type: 'communities', data: {} });
    }

    // Add research/learning
    if (activeFilter === 'all' || activeFilter === 'learn') {
      content.push({ type: 'research', data: {} });
    }

    // Add commerce
    if (activeFilter === 'all' || activeFilter === 'shop') {
      content.push({ type: 'commerce', data: {} });
      content.push({ type: 'products', data: {} });
    }

    // Add more images
    if (images.length > 6) {
      content.push({ type: 'image_grid', data: images.slice(6, 12) });
    }

    return content;
  }, [images, activeFilter]);

  const renderContentSection = (section, index) => {
    switch (section.type) {
      case 'image_grid':
        return (
          <div key={`images-${index}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {section.data.map(image => (
              <ImageCard 
                key={image.id} 
                image={image}
                compact={true}
              />
            ))}
          </div>
        );

      case 'categories':
        return <ArtCategories key="categories" />;

      case 'artists':
        return <ArtistDiscovery key="artists" />;

      case 'diaries':
        return <DiaryTemplate key="diaries" />;

      case 'communities':
        return <Gateway key="communities" />;

      case 'research':
        return <ArtResearchPage key="research" />;

      case 'commerce':
        return <Commerce key="commerce" />;

      case 'products':
        return <Visual key="products" />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f14]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#0a0f14]/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {feedSections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveFilter(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeFilter === section.id 
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading && mixedContent.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {mixedContent.map((section, index) => renderContentSection(section, index))}
            
            {/* Load More */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-80 transition-opacity"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedFeed;