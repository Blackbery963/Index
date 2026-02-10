import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fetchAppwriteMedia } from "./AppwriteService";

// --- EXISTING IMPORTS ---
import VideoCard from "./VideoCard";
import ImageCard from "./ImageCard";
import ArtworkCard from "./ArtworkCard";
import TrendingCommunities from "./Sub-Components/TrendingCommunities";
// import { ResourceCard, TravelDiaryCard, BlogCard } from "./FeedInserts";
import ResourcesFeed from "./Sub-Components/ResourcesFeed";
import TravelDiaryCard from "./Sub-Components/TravelDiariesFeed";
// import BlogCard from "./Sub-Components/BlogsFeed";
import BlogsFeed from "./Sub-Components/BlogsFeed";
import ArticlesFeed from "./Sub-Components/ArticlesFeed";
import ResearchesFeed from "./Sub-Components/ResearchesFeed";
import TemplatesFeed from "./Sub-Components/TemplatesFeed";
import GuidesFeed from "./Sub-Components/GuidesFeed";
// --- NEW IMPORT ---
// import { ArtCategoryStrip1, ArtCategoryStrip2, ArtCategoryStrip3 } from "./Sub-Components/ArtCategoryStrips";
import { ArtCategoryStrip1, ArtCategoryStrip2, ArtCategoryStrip3 } from "./Sub-Components/CategoryStrips";

const UnifiedGalleryFeed = () => {
  const [items, setItems] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ... (Your existing loadData, handleScroll, useEffects remain exactly the same) ...

  const loadData = useCallback(async () => {
    // ... same code as before ...
    if (!hasMore && page !== 1) return;
    setLoading(true);
    try {
      const result = await fetchAppwriteMedia('all', page, { pageSize: 12 });
      setProfiles(prev => ({ ...prev, ...result.profiles }));
      setItems(prev => {
        const newItems = result.media.filter(n => !prev.some(p => p.id === n.id));
        return [...prev, ...newItems];
      });
      setHasMore(result.pagination?.hasMore || false);
    } catch (err) {
      console.error("Failed load:", err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => { loadData(); }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && !loading) {
      if (hasMore) setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const formatTimestamp = (timestamp) => { 
    // ... keep your formatter ... 
  };


  // --- UPDATED INSERT LOGIC ---
  // We place the category strips strategically between other content
  const renderFeedInsert = (index) => {
    switch (index) {
      case 2: return <TrendingCommunities />;       // After 3rd post
      
      case 4: return <ArtCategoryStrip1 />;         // <--- NEW: Categories 1-6
      
      case 6: return <TravelDiaryCard />;           // After 9th post
      
      case 8: return <ArtCategoryStrip2 />;        // <--- NEW: Categories 7-12
      
      case 10: return <ResourcesFeed />;             // After 15th post
      
      case 13: return <ArtCategoryStrip3 />;        // <--- NEW: Categories 13-18
      
      case 16: return <BlogsFeed />;     
      
      case 18: return <ArticlesFeed />;
      
      case 20: return <ResearchesFeed />; // After 20th post

      // case 22: return <TemplatesFeed />;
      
      case 24: return <GuidesFeed />;  // After 24th post
      
      default: return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-black/20 py-8 lg:px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full max-w-xl flex flex-col gap-8">
          
          {items.map((item, index) => {
            const profile = profiles[item.userId] || {};
            const enhancedItem = {
              ...item,
              artist: profile.name || 'Unknown Artist',
              profileImage: profile.profileImage,
              src: item.src || item.url || item.fileUrl 
            };

            const insertComponent = renderFeedInsert(index);

            return (
              <React.Fragment key={item.id}>
                
                {/* 1. Render Special Insert if matches index */}
                {insertComponent && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                  >
                    {insertComponent}
                  </motion.div>
                )}

                {/* 2. Render Main Media Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.5 }}
                >
                  {item.category === 'video' ? (
                    <VideoCard video={enhancedItem} formatTimestamp={formatTimestamp} />
                  ) : item.category === 'for-sale' ? (
                    <ArtworkCard artwork={enhancedItem} formatTimestamp={formatTimestamp} />
                  ) : (
                    <ImageCard image={enhancedItem} formatTimestamp={formatTimestamp} />
                  )}
                </motion.div>

              </React.Fragment>
            );
          })}

          {!hasMore && (
             <div className="py-10 text-center">
                <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-2" />
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
                  You've reached the end
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedGalleryFeed;