import React from 'react';
import ArtCard from './ArtCard';
import MiniCollectionCard from './variants/MiniCollectionCard';
import DarkPromoCard from './variants/DarkPromoCard';
import CarouselCard from './variants/CarouselCard';
import ArtistSpotlightCard from './variants/ArtistSpotlightCard';
import VideoTeaserCard from './variants/VideoTeaserCard';
import EditorialQuoteCard from './variants/EditorialQuoteCard';

const ArtFeed = ({ feedItems, addToCart, openDetails }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 px-0 md:px-0">
      {feedItems.map((item, index) => {
        // Render based on 'type' (injected types vs undefined real types)
        const key = item.$id || item.id || index;

        if (item.type === 'mini-collection') {
          return (
            <div key={key} className="break-inside-avoid mb-6">
              <MiniCollectionCard data={item} />
            </div>
          );
        }

        if (item.type === 'dark-promo') {
          return (
            <div key={key} className="break-inside-avoid mb-6">
              <DarkPromoCard data={item} />
            </div>
          );
        }

        if (item.type === 'carousel') {
           return (
             <div key={key} className="break-inside-avoid mb-6">
               <CarouselCard data={item} />
             </div>
           );
        }
        if (item.type === 'artist-spotlight') {
          return <div key={key} className="break-inside-avoid mb-6">
            <ArtistSpotlightCard data={item} />
            </div>;
        }

        if (item.type === 'video-teaser') {
          return <div key={key} className="break-inside-avoid mb-6">
            <VideoTeaserCard data={item} />
            </div>;
        }

        if (item.type === 'editorial-quote') {
          return <div key={key} className="break-inside-avoid mb-6">
            <EditorialQuoteCard data={item} />
            </div>;
        }

        // Default: The Standard Art Card (Appwrite Data)
        return (
          <div key={key} className="break-inside-avoid mb-6">
            <ArtCard 
              art={item} 
              addToCart={addToCart} 
              openDetails={() => openDetails(item)} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default ArtFeed;