import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  Filter,
  RefreshCw,
  Clock,
  X,
  Grid3X3,
  BarChart3,
  Play,
  Users,
  Zap,
  Crown
} from 'lucide-react';

// Import your components
// import ImageCollectionUI from './ImageCollectionUI';
// import ArtCategories from './ArtCategories';
// import ArtistDiscovery from './ArtistDiscovery';
// import Diarytemp from './Diarytemp';
// import Connecting from './Connecting';
import ImprovedCollection from '../Components/Collections/ImageCollectionUI';
import ArtCategories from '../Components/Style/ArtCategories';
import ArtistDiscovery from '../Components/ArtistDiscovery';
import DiaryTemplate from '../Components/Diarytemp/Diarytemp';
import Gateway from '../Components/Connecting/Connecting';
const MixedMediaLanding = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mixedContent, setMixedContent] = useState([]);
  const observerRef = useRef(null);

  // Mixed content types with weights for better distribution
  const contentTypes = [
    { type: 'image', weight: 4 },
    { type: 'video', weight: 2 },
    { type: 'artist', weight: 1 },
    { type: 'community', weight: 1 },
    { type: 'challenge', weight: 1 },
    { type: 'diary', weight: 1 }
  ];

  // Generate mixed content feed
  const generateMixedContent = () => {
    const content = [];
    let id = 1;

    // Add weighted content types
    contentTypes.forEach(contentType => {
      for (let i = 0; i < contentType.weight; i++) {
        switch (contentType.type) {
          case 'image':
            content.push({
              id: id++,
              type: 'image',
              data: {
                imageUrl: `https://picsum.photos/400/300?random=${id}`,
                title: 'Beautiful Artwork',
                artist: 'Featured Artist',
                likes: Math.floor(Math.random() * 1000) + 100,
                comments: Math.floor(Math.random() * 100) + 10,
                shares: Math.floor(Math.random() * 50) + 5,
                isFeatured: Math.random() > 0.7,
                tags: ['art', 'creative', 'design']
              }
            });
            break;

          case 'video':
            content.push({
              id: id++,
              type: 'video',
              data: {
                videoUrl: '#',
                thumbnail: `https://picsum.photos/400/300?random=${id + 100}`,
                title: 'Art Process Timelapse',
                artist: 'Creative Creator',
                duration: '2:45',
                views: Math.floor(Math.random() * 50000) + 1000,
                likes: Math.floor(Math.random() * 5000) + 500
              }
            });
            break;

          case 'artist':
            content.push({
              id: id++,
              type: 'artist',
              data: {
                name: 'Featured Artist',
                avatar: `https://i.pravatar.cc/150?img=${id}`,
                specialty: 'Digital Art',
                followers: Math.floor(Math.random() * 50000) + 1000,
                isVerified: Math.random() > 0.5,
                featuredArtwork: `https://picsum.photos/200/200?random=${id}`
              }
            });
            break;

          case 'community':
            content.push({
              id: id++,
              type: 'community',
              data: {
                name: 'Art Community',
                members: Math.floor(Math.random() * 10000) + 1000,
                description: 'Join our creative community',
                image: `https://picsum.photos/300/200?random=${id}`
              }
            });
            break;
        }
      }
    });

    // Shuffle content for better mix
    return content.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Initialize mixed content
    setMixedContent(generateMixedContent());

    // Setup intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('.lazy-component');
    elements.forEach(el => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const tabs = [
    { id: 'for-you', label: 'For You', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'videos', label: 'Videos', icon: Play },
    { id: 'artists', label: 'Artists', icon: Users },
    { id: 'communities', label: 'Communities', icon: Zap }
  ];

  // Content card components
  const ImageCard = ({ data }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {data.artist?.[0] || 'A'}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{data.artist || 'Artist'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">2h ago</p>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="relative group">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-48 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {data.isFeatured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Featured
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2">
            <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{data.title}</h3>
        
        <div className="flex gap-1 mb-3">
          {data.tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors text-xs">
              <Heart className="w-4 h-4" />
              {data.likes}
            </button>
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors text-xs">
              <MessageCircle className="w-4 h-4" />
              {data.comments}
            </button>
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors text-xs">
              <Share2 className="w-4 h-4" />
              {data.shares}
            </button>
          </div>
          <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const VideoCard = ({ data }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="relative group">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {data.duration}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{data.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {data.artist}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{data.views.toLocaleString()} views</span>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {data.likes}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ArtistCard = ({ data }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 text-center p-6"
    >
      <div className="relative inline-block mb-4">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg mx-auto"
        />
        {data.isVerified && (
          <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
            <Zap className="w-3 h-3" />
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{data.name}</h3>
      <p className="text-sm text-blue-500 mb-2">{data.specialty}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {data.followers.toLocaleString()} followers
      </p>
      
      <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
        Follow
      </button>
    </motion.div>
  );

  const CommunityCard = ({ data }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-32 object-cover"
      />
      
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{data.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {data.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.members.toLocaleString()} members
          </span>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            Join
          </button>
        </div>
      </div>
    </motion.div>
  );

  const MixedContentCard = ({ content }) => {
    switch (content.type) {
      case 'image':
        return <ImageCard data={content.data} />;
      case 'video':
        return <VideoCard data={content.data} />;
      case 'artist':
        return <ArtistCard data={content.data} />;
      case 'community':
        return <CommunityCard data={content.data} />;
      default:
        return <ImageCard data={content.data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="w-full mx-auto px-2 sm:px-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 mb-6">
          <div className="max-w-full mx-auto px-2 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">ArtFeed</h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mixed Creative Content</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-2 hide-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-3 mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Content Filters</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Images', 'Videos', 'Artists', 'Communities'].map(filter => (
                        <button
                          key={filter}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mixed Content Feed */}
        <div className="space-y-6 pb-20">
          {/* Mixed Content Grid */}
          <section className="lazy-component">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {mixedContent.map((content) => (
                <MixedContentCard key={content.id} content={content} />
              ))}
            </div>
          </section>

          {/* Your Existing Components */}
          <section className="lazy-component">
            {/* <ImageCollectionUI /> */}
            <ImprovedCollection/>
          </section>

          <section className="lazy-component">
            <ArtCategories />
          </section>

          <section className="lazy-component">
            <ArtistDiscovery />
          </section>

          <section className="lazy-component">
            {/* <Diarytemp /> */}
            <DiaryTemplate/>
          </section>

          <section className="lazy-component">
            {/* <Connecting /> */}
            <Gateway/>
          </section>

          {/* Load More */}
          <div className="text-center">
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setMixedContent(prev => [...prev, ...generateMixedContent()]);
                  setLoading(false);
                }, 1000);
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Load More Content'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-2 z-50">
        <div className="flex justify-around">
          {tabs.slice(0, 4).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MixedMediaLanding;