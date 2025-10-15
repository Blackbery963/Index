import React from 'react';
import Visual from '../../../Visual/Visual';
import DiaryTemplate from '../../../Diarytemp/Diarytemp';
import Gateway from '../../../Connecting/Connecting';
import ArtResearchPage from '../../../ResearchPaperPage';
import ArtistDiscovery from '../../../ArtistDiscovery';
import MiniArtCategories from '../../../Style/ArtCategories';
import MiniArtisan from '../../../Artisian/Artisian';
import MiniCommerce from '../../../Commerce/Commerce';
import DailyChallenge from '../../../DialyChallenge';

const MixedContentRenderer = ({ 
  item, 
  viewMode, 
  likedProducts, 
  savedProducts, 
  followedArtists, 
  handleProductLike, 
  handleProductSave, 
  handleArtistFollow, 
  formatTimestamp 
}) => {
  try {
    switch (item.type) {
      case 'artists':
        return (
          <ArtistDiscovery 
            viewMode={viewMode}
            onArtistClick={(artist) => console.log('Artist clicked:', artist)}
            followedArtists={followedArtists}
            onFollow={handleArtistFollow}
          />
        );

      case 'mini-categories':
        return <MiniArtCategories />;
      case 'mini-artisan':
        return <MiniArtisan />;
      case 'mini-commerce':
        return <MiniCommerce />;
      case 'products':
        return (
          <Visual 
            viewMode={viewMode}
            onProductClick={(product) => console.log('Product clicked:', product)}
            likedProducts={likedProducts}
            savedProducts={savedProducts}
            onLike={handleProductLike}
            onSave={handleProductSave}
            formatTimestamp={formatTimestamp}
          />
        );
      case 'diary':
        return (
          <DiaryTemplate 
            viewMode={viewMode}
            onDiaryAction={(action) => console.log('Diary action:', action)}
          />
        );
      case 'communities':
        return (
          <Gateway 
            viewMode={viewMode}
            onCommunityAction={(action) => console.log('Community action:', action)}
          />
        );
      case 'research':
        return (
          <ArtResearchPage 
            viewMode={viewMode}
            onResearchAction={(action) => console.log('Research action:', action)}
          />
        );
      case 'daily-challenge':
        return <DailyChallenge />;
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error rendering ${item.type}:`, error);
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Error loading {item.type} content
        </p>
      </div>
    );
  }
};

export default MixedContentRenderer;