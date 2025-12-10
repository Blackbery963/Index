
import React, { useState, useEffect } from 'react';
import { databases, Query } from '../../appwriteConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Palette, Brush, Monitor, Camera, PenTool,
  Cuboid, Sparkles, Search, X, Filter,
  User, ArrowRight, ChevronRight
} from "lucide-react";
import { FaHome, FaUser, FaInfoCircle, FaPalette } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import FollowButton from '../../Follow/FollowButton';
import logo from '../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

const DiscoverUsers = () => {
  // State
  const [activeButton, setActiveButton] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories Configuration
  const interestCategories = {
    'Painting': ["Oil Painting", "Acrylic", "Watercolor", "Ink", "Charcoal", "Sketching"],
    'Digital': ["Digital Art", "Vector", "Pixel Art", "3D Modeling", "Concept Art"],
    'Photography': ["Portrait", "Landscape", "Street", "Macro", "Analog"],
    'Design': ["Graphic Design", "Typography", "UI/UX", "Branding"],
    'Sculpture': ["Clay", "Ceramic", "Metal", "Wood carving"],
    'Other': ["Mixed Media", "Collage", "Textile", "NFT"]
  };

  const categoryIcons = {
    all: <Sparkles className="w-4 h-4" />,
    Painting: <Brush className="w-4 h-4" />,
    Digital: <Monitor className="w-4 h-4" />,
    Photography: <Camera className="w-4 h-4" />,
    Design: <PenTool className="w-4 h-4" />,
    Sculpture: <Cuboid className="w-4 h-4" />,
    Other: <Palette className="w-4 h-4" />
  };

  // Fetch Data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          USER_COLLECTION_ID,
          [Query.select(['$id', 'userId', 'username', 'profileImageUrl', 'bio', 'interests'])]
        );
        setUsers(response.documents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter Logic
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.bio && user.bio.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesInterests = selectedInterests.length === 0 ||
      (user.interests && user.interests.some((i) => selectedInterests.includes(i)));

    const categoryTags = activeCategory === 'all' ? [] : interestCategories[activeCategory];
    const matchesCategory = activeCategory === 'all' ||
      (user.interests && user.interests.some(i =>
        categoryTags.some(catTag => i.toLowerCase().includes(catTag.toLowerCase()) || catTag.toLowerCase().includes(i.toLowerCase()))
      ));

    return matchesSearch && matchesInterests && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans selection:bg-purple-500/30 transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-100">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={logo} alt="logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white font-Eagle">
                Painters' Diary
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', icon: FaHome, label: 'Home', path: '/' },
                { id: 'about', icon: FaInfoCircle, label: 'About', path: '/About' },
                { id: 'gallery', icon: FaPalette, label: 'Gallery', path: '/gallery' },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveButton(item.id)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    activeButton === item.id 
                    ? 'text-gray-900 dark:text-white font-semibold' 
                    : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon /> {item.label}
                </Link>
              ))}
              <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800" />
              <Link to="/Account">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
                  <FaUser className="text-gray-500 dark:text-zinc-400 w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* Mobile: Menu Toggle */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
              >
                {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 p-4 z-40 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-zinc-800/50 text-gray-900 dark:text-white font-medium">
                <FaHome /> Home
              </Link>
              <Link to="/gallery" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 transition-colors">
                <FaPalette /> Gallery
              </Link>
              <Link to="/Account" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 transition-colors">
                <FaUser /> Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header - Adaptive Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight font-Quicksand">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400">Creators</span>
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-lg max-w-xl">
              Connect with visionaries in the art world.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-96 relative">
            <div className="relative flex items-center bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-1 focus-within:border-gray-300 dark:focus-within:border-zinc-700 transition-colors shadow-sm dark:shadow-none">
              <Search className="ml-3 text-gray-400 dark:text-zinc-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-0 py-2 px-3 text-sm md:text-base"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="p-2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Bar - Sticky */}
        <div className="sticky top-16 md:top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md py-3 border-b border-gray-200 dark:border-zinc-800/50 sm:border-none sm:bg-transparent sm:backdrop-blur-none transition-colors duration-300">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {['all', ...Object.keys(interestCategories)].map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSelectedInterests([]); }}
                className={`
                  flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all border shrink-0
                  ${activeCategory === cat
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-zinc-950 border-gray-900 dark:border-white shadow-lg shadow-black/10 dark:shadow-white/10'
                    : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:border-gray-300 dark:hover:border-zinc-600 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {categoryIcons[cat]}
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            {/* Mobile Skeletons */}
            <div className="md:hidden space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-zinc-900 h-20 rounded-xl animate-pulse border border-gray-100 dark:border-zinc-800" />
              ))}
            </div>
            {/* Desktop Skeletons */}
            <div className="hidden md:contents">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-zinc-900 h-72 rounded-2xl animate-pulse border border-gray-100 dark:border-zinc-800" />
              ))}
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20 bg-gray-100 dark:bg-zinc-900/30 rounded-3xl border border-gray-200 dark:border-zinc-800 border-dashed">
            <Search className="w-8 h-8 mx-auto text-gray-400 dark:text-zinc-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No artists found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.$id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  
                  {/* --- MOBILE VIEW: Compact Row --- */}
                  <div className="md:hidden flex items-center justify-between p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-gray-200 dark:border-zinc-800 rounded-xl active:scale-[0.98] transition-transform shadow-sm dark:shadow-none">
                    <Link to={`/Account/${user.$id}`} className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 shrink-0"
                        onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=12'; }}
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate pr-2">
                          {user.username}
                        </h3>
                        <p className="text-xs text-purple-600 dark:text-purple-400 truncate">
                          {user.interests?.[0] || 'Artist'}
                        </p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-3 pl-2 shrink-0">
                      <div className="scale-90 origin-right">
                        <FollowButton targetUserId={user.$id} />
                      </div>
                      <Link to={`/Account/${user.$id}`} className="text-gray-400 dark:text-zinc-500">
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>

                  {/* --- DESKTOP VIEW: Full Card --- */}
                  <div className="hidden md:block h-full bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:border-gray-300 dark:hover:border-zinc-600 transition-colors duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:shadow-black/20 relative">
                    
                    {/* Card Cover */}
                    <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-950 relative">
                      <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05]" />
                    </div>

                    {/* Profile Image */}
                    <div className="absolute top-12 left-6">
                      <Link to={`/Account/${user.$id}`}>
                        <img
                          src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                          alt={user.username}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-zinc-900 bg-gray-100 dark:bg-zinc-800 hover:scale-105 transition-transform shadow-sm"
                          onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=12'; }}
                        />
                      </Link>
                    </div>

                    <div className="pt-12 p-6">
                      <div className="flex justify-end mb-2 min-h-[32px]">
                        <FollowButton targetUserId={user.$id} />
                      </div>

                      <Link to={`/Account/${user.$id}`} className="block mt-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {user.username}
                        </h3>
                      </Link>

                      <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-3">
                        {user.interests?.[0] || 'Visual Artist'}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">
                        {user.bio || 'Creating art to express the inexpressible.'}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {user.interests?.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/Account/${user.$id}`}
                        className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-sm font-medium text-gray-900 dark:text-white transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        View Portfolio
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default DiscoverUsers;