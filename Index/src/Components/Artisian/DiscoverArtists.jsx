import React, { useState, useEffect } from 'react';
import { databases, Query } from '../../appwriteConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle, FaSearch, FaTimes, FaPalette, } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import {
  Palette,
  Brush,
  Monitor,
  Camera,
  PenTool,
  Cuboid,
  Sparkles
} from "lucide-react";

import { MdClose } from 'react-icons/md';
import FollowButton from '../../Follow/FollowButton';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

const DiscoverUsers = () => {
  const [activeButton, setActiveButton] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Categorized interests
  const interestCategories = {
    'Painting': [
      "Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", 
      "Charcoal", "Pastel", "Pencil Drawing", "Graphite Drawing",
      "Tempera", "Fresco Painting", "Abstract", "Landscape", "Portrait"
    ],
    'Digital': [
      "Digital Art", "Digital Painting", "Vector Art", "Pixel Art",
      "3D Modeling", "AI-Generated Art", "NFT Art", "Augmented Reality Art"
    ],
    'Photography': [
      "Portrait Photography", "Landscape Photography", "Street Photography",
      "Conceptual Photography", "Documentary Photography", "Micro Photography"
    ],
    'Design': [
      "Graphic Design", "Typography Design", "Fashion Design", 
      "Interior Design", "Game Design", "Industrial Design"
    ],
    'Sculpture': [
      "Sculpture", "Ceramic", "Installation Art", "Kinetic Art", "Light Art"
    ],
    'Other': [
      "Mixed Media", "Collage", "Printmaking", "Performance Art", "Sound Art"
    ]
  };

  // Fetch users from Appwrite
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          USER_COLLECTION_ID,
          [Query.select(['$id', 'userId', 'username', 'profileImageUrl', 'bio', 'interests'])]
        );
        
        setUsers(response.documents);
        
        // Extract all unique interests
        const interests = new Set();
        response.documents.forEach(user => {
          if (user.interests) {
            user.interests.forEach(interest => interests.add(interest));
          }
        });
        setAllInterests(Array.from(interests));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Toggle interest selection
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // Toggle follow status
  const toggleFollow = (userId) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Filter users based on search and interests
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInterests = selectedInterests.length === 0 || 
                           (user.interests && user.interests.some((i) => selectedInterests.includes(i)));
    
    const matchesCategory = activeCategory === 'all' || 
                          (user.interests && user.interests.some(i => 
                            interestCategories[activeCategory]?.includes(i)));
    
    return matchesSearch && matchesInterests && matchesCategory;
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };


  const categoryIcons = {
  all: <Palette className="w-5 h-5 mr-1 text-purple-500" />,
  Painting: <Brush className="w-5 h-5 mr-1 text-rose-500" />,
  Digital: <Monitor className="w-5 h-5 mr-1 text-sky-500" />,
  Photography: <Camera className="w-5 h-5 mr-1 text-amber-500" />,
  Design: <PenTool className="w-5 h-5 mr-1 text-green-500" />,
  Sculpture: <Cuboid className="w-5 h-5 mr-1 text-gray-500" />,
  Other: <Sparkles className="w-5 h-5 mr-1 text-indigo-500" />
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading artists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow text-center max-w-md">
          <div className="text-red-500 text-3xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Error Loading Artists</h3>
          <p className="text-gray-500 dark:text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans">
      <header className='fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-4 py-4 z-50'>
        {/* Logo Section */}
        <Link to={'/'}>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white font-Eagle'>Painters' Diary</h1>
        </Link>
        {/* Navigation */}
        <div className='flex items-center gap-4'>
          <nav className='hidden md:flex gap-6 text-gray-600 dark:text-gray-300'>
            <Link to='/' className={`hover:text-blue-500 transition ${activeButton === 'home' ? 'text-blue-500' : ''}`} onClick={() => setActiveButton('home')}>
              <FaHome className="inline mr-1" /> Home
            </Link>
            <Link to='/About' className={`hover:text-blue-500 transition ${activeButton === 'about' ? 'text-blue-500' : ''}`} onClick={() => setActiveButton('about')}>
              <FaInfoCircle className="inline mr-1" /> About
            </Link>
            <Link to='/Account' className={`hover:text-blue-500 transition ${activeButton === 'account' ? 'text-blue-500' : ''}`} onClick={() => setActiveButton('account')}>
              <FaUser className="inline mr-1" /> Account
            </Link>
            <Link to='/gallery' className={`hover:text-blue-500 transition ${activeButton === 'gallery' ? 'text-blue-500' : ''}`} onClick={() => setActiveButton('gallery')}>
              <FaPalette className="inline mr-1" /> Gallery
            </Link>
          </nav>
          <button 
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed top-16 right-4 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-40"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-300">
              <Link to='/' onClick={() => { setActiveButton('home'); toggleMenu(); }} className="hover:text-blue-500 transition">
                <FaHome className="inline mr-2" /> Home
              </Link>
              <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }} className="hover:text-blue-500 transition">
                <FaInfoCircle className="inline mr-2" /> About
              </Link>
              <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }} className="hover:text-blue-500 transition">
                <FaUser className="inline mr-2" /> Account
              </Link>
              <Link to='/gallery' onClick={() => { setActiveButton('gallery'); toggleMenu(); }} className="hover:text-blue-500 transition">
                <FaPalette className="inline mr-2" /> Gallery
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <div className="max-w-6xl mx-auto pt-20 px-4 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Discover Artists
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Connect with creators and find inspiration.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center px-4 py-2 rounded-full text-sm transition ${
                activeCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {categoryIcons['all']} All
            </button>
            {Object.keys(interestCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center px-4 py-2 rounded-full text-sm transition ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {categoryIcons[category]} {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or bio..."
                className="w-full pl-10 pr-4 py-2 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-500 text-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="flex-1 flex flex-wrap gap-2 items-center">
              {selectedInterests.length > 0 ? (
                <>
                  {selectedInterests.map((interest, index) => (
                    <button
                      key={index}
                      onClick={() => toggleInterest(interest)}
                      className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    >
                      {interest} <FaTimes className="inline ml-1 text-xs" />
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedInterests([])}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Clear
                  </button>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  {activeCategory === 'all' ? 'Filter by interests...' : `Browsing ${activeCategory}`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Interest Suggestions */}
        {selectedInterests.length === 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Suggested Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interestCategories[activeCategory]?.slice(0, 12).map((interest, index) => (
                <button
                  key={index}
                  onClick={() => toggleInterest(interest)}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{filteredUsers.length} artists found</span>
          {selectedInterests.length > 0 && (
            <button
              onClick={() => setSelectedInterests([])}
              className="text-blue-500 hover:text-blue-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No artists found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try different search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedInterests([]);
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.$id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <div className="p-4 text-center">
                    <img
                      src={user.profileImageUrl || 'https://i.pravatar.cc/150?img=random'}
                      alt={user.username}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://i.pravatar.cc/150?img=random';
                      }}
                    />
                    <Link to={`/Account/${user.$id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {user.username}
                      </h3>
                    </Link>
                    <p className="text-sm text-blue-500 mb-2">
                      {user.interests?.[0] || 'Artist'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {user.bio || 'No bio available'}
                    </p>
                    {user.interests && user.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {user.interests.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {user.interests.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            +{user.interests.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <FollowButton targetUserId={user.$id} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverUsers;

