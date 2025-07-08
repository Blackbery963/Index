import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, InformationCircleIcon, UserIcon, 
  BookOpenIcon, PlusIcon, MagnifyingGlassIcon, 
  ArrowRightIcon, XMarkIcon, Bars3Icon 
} from '@heroicons/react/24/outline';
import { MdBrush } from 'react-icons/md';
import { useDiary } from '../../DiaryService/useDiary';    
import backgroundImage from './Diaryland-Images/calligraphy-7188024.jpg';
// import { useDiary } from './useDiary2';
// import { useDiary } from '../../DiaryService/useDiary';
const placeholderImage = 'https://cdn.pixabay.com/photo/2025/04/01/11/26/blue-tit-9506658_960_720.jpg';

const moodColors = {
  happy: 'bg-amber-100 text-amber-800',
  introspective: 'bg-blue-100 text-blue-800',
  calm: 'bg-green-100 text-green-800',
  inspired: 'bg-violet-100 text-violet-800',
  playful: 'bg-pink-100 text-pink-800',
  frustrated: 'bg-red-100 text-red-800'
};

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/about', label: 'About', icon: InformationCircleIcon },
  { to: '/account', label: 'Account', icon: UserIcon },
  { to: '/Diaries/Diary-Collection', label: 'Collection', icon: BookOpenIcon },
];

function Diaryland() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleDiaries, setVisibleDiaries] = useState(6);
  const { entries, loading, error, loadEntries } = useDiary();
  const [hoveredDiary, setHoveredDiary] = useState(null);

  // generating image file to url
  const getImageUrl = (image) => {
  try {
    if (!image) return null;
    
    // If it's already a URL (from File object or existing URL)
    if (typeof image === 'string' && image.startsWith('http')) {
      return image;
    }
    
    // If it's a File object
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    
    // If it's an Appwrite file ID
    if (typeof image === 'string') {
      return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
        import.meta.env.VITE_APPWRITE_BUCKET_ID
      }/files/${image}/view?project=${
        import.meta.env.VITE_APPWRITE_PROJECT_ID
      }&mode=admin`;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get image URL:', error);
    return null;
  }
};

  const diaries = useCallback(() => {
    return entries.map(entry => ({
      id: entry.$id || entry.id,
      title: entry.title || 'Untitled',
      image: entry.image ? getImageUrl(entry.image) : '',
      artStory: entry.artStory || 'No story yet',
      date: entry.date || new Date().toISOString().split('T')[0],
      excerpt: entry.artStory?.slice(0, 100) + '...' || 'No story provided...',
      mood: entry.mood || 'inspired'
    }));
  }, [entries, getImageUrl]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const filteredDiaries = diaries().filter(diary =>
    diary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    diary.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, visibleDiaries);

  const handleLoadMore = () => {
    setVisibleDiaries(prev => prev + 6);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholderImage;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <div
        className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-[90%]">
          {/* Header */}
          <header className="w-[90%] p-4 flex items-center justify-between rounded-md bg-white/40 dark:bg-black/40 backdrop-blur-md fixed top-4 z-50">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-Eagle dark:text-white text-gray-600">
              Painters' Diary
            </h1>
            <nav className="hidden md:flex items-center gap-6 font-Playfair text-gray-900 dark:text-white">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-amber-300 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden lg:inline">{label}</span>
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800 dark:text-white focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </header>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden absolute top-16 right-4 bg-white/40 dark:bg-black/80 backdrop-blur-md rounded-lg p-4 z-50 font-Playfair text-gray-800 dark:text-white"
              >
                <div className="flex flex-col gap-4">
                  {navItems.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-amber-300 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 " />
                      {label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Hero Content */}
          <div className="flex flex-col gap-6 rounded-3xl shadow-lg shadow-slate-400/40 items-center border-4 border-white/40 px-4 sm:px-8 md:px-16 py-6 sm:py-10 md:py-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-bold font-Playfair flex flex-col text-center leading-tight sm:leading-snug">
              <span className="text-gray-300">A Living Chronicle of Whispered Thoughts,</span>
              <span className="text-amber-900">Wandering Dreams,</span>
              <span className="text-gray-500">and Forgotten Memories</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-center font-Quicksand text-yellow-100 flex flex-col space-y-1 leading-relaxed sm:leading-normal">
              <span>Journey beyond the canvas into a world woven from half-remembered dreams,</span> 
              <span>silent reflections, and fragments of time waiting to be reborn through color and emotion.</span>
            </p>
            <Link to={'/Diaries/Diary-Collection'}>
              <button className="px-3 sm:px-4 py-2 border-2 border-gray-500 rounded-md text-base sm:text-lg font-Playfair text-gray-200 hover:bg-white/10 transition">
                Explore More Diaries
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Diary Entries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950">
        <div className="max-w-7xl mx-auto">
          {/* Search and New Entry */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
            <div className="relative w-full sm:w-1/2">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your diaries..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search diaries"
              />
            </div>
            <Link to="/january">
              <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-lg hover:from-amber-500 hover:to-amber-700 transition-colors">
                <PlusIcon className="h-5 w-5" />
                New Diary Entry
              </button>
            </Link>
          </div>

          {/* Diaries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredDiaries.length > 0 ? (
                filteredDiaries.map(diary => (
                  <motion.div 
                    key={diary.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    onMouseEnter={() => setHoveredDiary(diary.id)}
                    onMouseLeave={() => setHoveredDiary(null)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {diary.image ? (
                        <img 
                          src={diary.image}
                          alt={diary.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <MdBrush className="text-gray-400 text-4xl" />
                          <span className="sr-only">No image available</span>
                        </div>
                      )}
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                        moodColors[diary.mood] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {diary.mood}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                          {diary.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                          {new Date(diary.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {diary.excerpt}
                      </p>
                      <Link 
                        to={`/Diary/${diary.id}`}
                        className="inline-flex items-center text-indigo-600 dark:text-amber-400 hover:text-indigo-800 dark:hover:text-amber-300 transition-colors font-medium"
                      >
                        Read More
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-gray-600 dark:text-gray-400 text-lg">No diaries found matching your search.</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          {filteredDiaries.length < diaries().length && filteredDiaries.length > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 border border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-600/10 rounded-lg transition-colors"
              >
                Load More Entries
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Diaryland;