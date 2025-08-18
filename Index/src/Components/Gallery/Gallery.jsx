
import { useState, useEffect, useRef } from 'react';
import bg from './pexels-scottwebb-305821.jpg';
import { FaHome, FaInfoCircle, FaUser, FaPalette, FaRegComment, FaSearch, FaRegEye } from 'react-icons/fa';
import { MdCollections } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiDownload } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { storage, Query, databases } from '../../appwriteConfig';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import ShareButton from '../../Share/ShareFunction';
import DownloadService from '../../Downloads/downloadService';
import FollowButton from '../../Follow/FollowButton';
import LikeButton from '../../EngagementService/likeButton';
import ArtworkViewTracker from '../../Views/viewsTracker';

// const bg =  "https://images.unsplash.com/photo-1627037558426-c2d07beda3af?q=80&w=1575&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

function Gallery() {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('landscape');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userProfiles, setUserProfiles] = useState({});
  const [profile, setProfile] = useState(null)

  // Fetch user profile data
  const fetchUserProfile = async (userId) => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId
      );
      return {
        name: response.name || response.username || 'Unknown Artist',
        profileImage: response.profileImage || null,
        title: response.title || ''
      };
    } catch (err) {
      console.error(`Error fetching profile for user ${userId}:`, err);
      return {
        name: 'Unknown Artist',
        profileImage: null,
        title: ''
      };
    }
  };


  // Fetch all images and user profiles
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch artworks
        const artworksResponse = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [
            Query.orderDesc('uploadDate'),
            Query.limit(50),
            Query.select(['$id', 'fileId', 'title', 'description', 'tag', 'userId', 'uploadDate', 'viewCount',])
          ]
        );

        // Get image URLs
        const imagesWithUrls = await Promise.all(
          artworksResponse.documents.map(async (doc) => {
            try {
              const url = storage.getFileView(BUCKET_ID, doc.fileId);
              return { ...doc, url };
            } catch (err) {
              console.error(`Error getting URL for ${doc.fileId}:`, err);
              return null;
            }
          })
        );

        const validImages = imagesWithUrls.filter(img => img !== null);
        setAllImages(validImages);
        setFilteredImages(validImages);

        // Fetch all unique user profiles
        const uniqueUserIds = [...new Set(validImages.map(img => img.userId))];
        const profiles = {};
        
        await Promise.all(
          uniqueUserIds.map(async userId => {
            profiles[userId] = await fetchUserProfile(userId);
          })
        );

        setUserProfiles(profiles);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredImages(allImages);
      setSuggestions([]);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = allImages.filter(image => {
      const matches = [];
      if (image.title) matches.push(image.title.toLowerCase().includes(lowerCaseSearch));
      if (image.description) matches.push(image.description.toLowerCase().includes(lowerCaseSearch));
      if (image.tag) {
        const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
        matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
      }
      return matches.some(Boolean);
    });

    setFilteredImages(results);

    // Generate suggestions
    const suggestionSet = new Set();
    allImages.forEach(image => {
      [image.title, image.description].forEach(text => {
        if (text) {
          text.toLowerCase().split(' ')
            .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
            .forEach(word => suggestionSet.add(word));
        }
      });
      if (image.tag) {
        const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
        tags.forEach(tag => {
          if (tag.toLowerCase().includes(lowerCaseSearch)) {
            suggestionSet.add(tag.toLowerCase());
          }
        });
      }
    });

    setSuggestions([...suggestionSet].slice(0, 5));
  }, [searchTerm, allImages]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 85);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // UI handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };
  const handleCommentSubmit = (imageId, e) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log(`Comment for ${imageId}: ${newComment}`);
      setNewComment('');
      setShowComments(null);
    }
  };

  // Lightbox controls
  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox(prev => ({
    ...prev,
    index: prev.index > 0 ? prev.index - 1 : allImages.length - 1
  }));
  const nextImage = () => setLightbox(prev => ({
    ...prev,
    index: prev.index < allImages.length - 1 ? prev.index + 1 : 0
  }));

  // Animation variants
  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={5000} 
        theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} />
      
      {/* Header */}
       <header className="fixed top-3 rounded-xl left-0 w-full max-w-[96%] ml-[2%] z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
  <div className=" mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
    
    {/* Logo */}
    <Link to="/" className="flex items-center">
      <h1 className="font-Eagle text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
        Painters' Diary
      </h1>
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden md:flex items-center gap-6 text-[16px] font-medium text-gray-700 dark:text-gray-300">
      {['Home', 'About', 'Account', 'Journal'].map((item) => (
        <Link
          key={item}
          to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
          className="hover:text-green-600 transition-colors"
        >
          {item}
        </Link>
      ))}
    </nav>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden p-2 text-gray-600 dark:text-gray-300"
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <MdClose size={22} /> : <FiMenu size={22} />}
    </button>
  </div>

  {/* Mobile Menu */}
  <AnimatePresence>
    {isMenuOpen && (
      <motion.div
        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {['Home', 'About', 'Account', 'Journal'].map((item) => (
          <Link
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            onClick={toggleMenu}
            className="block text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            {item}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</header>

{/* Hero Section */}
{/* <section
  className="relative flex items-center justify-center min-h-screen bg-center bg-cover px-4"
  style={{ backgroundImage: `url(${bg})` }}
>
  <div className="max-w-3xl text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl p-6 sm:p-10 border border-gray-200 dark:border-gray-700">
    <h1 className="font-Quicksand text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
      Palette of Dreams: A Showcase of Artistic Brilliance
    </h1>
    <p className="mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
      From stunning landscapes to abstract wonders, each brushstroke tells a story—
      a celebration of art's beauty and deep connection to the human spirit.
    </p>

    Search Bar
    <div className="mt-6 flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search paintings..."
          className="w-full rounded-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />

               <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.ul className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50"
                      variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden">
                      {suggestions.map((suggestion, index) => (
                        <li key={index} className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}>
                          {suggestion}
                        </li>
                      ))}
                    </motion.ul>
                  )}
        </AnimatePresence>
      </div>
              {searchTerm && (
                <div className="mt-2 pl-4 text-sm text-gray-700 dark:text-gray-400">
                  Found {filteredImages.length} {filteredImages.length === 1 ? 'result' : 'results'}
                </div>
              )}
    </div>
        

  </div>
</section> */}

<section
  className="relative flex items-center justify-center min-h-screen bg-center bg-cover px-4"
  style={{ backgroundImage: `url(${bg})` }}
>
  <div className="max-w-3xl w-full text-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-lg">
    
    {/* Heading */}
    <h1 className="font-Quicksand text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
      Palette of Dreams: 
      <span className="block mt-1 text-green-600 dark:text-green-400">A Showcase of Artistic Brilliance</span>
    </h1>

    {/* Subtitle */}
    <p className="mt-5 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
      From stunning landscapes to abstract wonders, each brushstroke tells a story—
      a celebration of art's beauty and deep connection to the human spirit.
    </p>

    {/* Search Section */}
    <div className="mt-8 flex flex-col items-center gap-3">
      <div className="relative w-full max-w-md group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search paintings..."
          className="w-full rounded-full px-5 py-3 border border-gray-300 dark:border-gray-600 
            bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white 
            focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-green-500 transition-colors" />

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border 
                border-gray-300 dark:border-gray-600 rounded-xl shadow-lg mt-2 z-50 overflow-hidden"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Search Results Count */}
      {searchTerm && (
        <div className="text-sm text-gray-700 dark:text-gray-400">
          Found <span className="font-medium">{filteredImages.length}</span> {filteredImages.length === 1 ? 'result' : 'results'}
        </div>
      )}
    </div>

  </div>
</section>


      {/* Gallery Content */}
      <div ref={contentRef} className="py-12 bg-gray-100 dark:bg-gray-900 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">Error loading images: {error}</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 p-8">
            {searchTerm ? 'No matching paintings found' : 'No paintings available'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:max-w-[80%] max-w-[95%] mx-auto">
            {filteredImages.map((image, index) => (
              <motion.div
  key={image.$id}
  className="relative rounded-xl overflow-hidden"
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
>
  {/* Image */}
  <img
    src={image.url}
    alt={image.title || 'Artwork'}
    className="w-full h-80 object-cover cursor-pointer"
    loading="lazy"
    onClick={() => openLightbox(index)}
  />

  {/* Top Header Overlay */}
  <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/40 to-transparent">
    <Link to={`/Account/${image.userId}`} className="flex items-center space-x-2">
      {userProfiles[image.userId]?.profileImage ? (
        <img
          src={userProfiles[image.userId].profileImage}
          alt={userProfiles[image.userId].name}
          className="w-8 h-8 rounded-full object-cover border border-white"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
          {userProfiles[image.userId]?.name?.charAt(0) || 'U'}
        </div>
      )}
      <span className="text-sm font-semibold text-white">
        {userProfiles[image.userId]?.name || 'Username'}
      </span>
    </Link>
    <FollowButton targetUserId={image.userId} />
  </div>
  {/* Bottom Actions Overlay */}
  <div className=" right-0 flex justify-between items-center px-3 py-2 text-sm">
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <FaRegEye className="text-[18px]" />
        <span>{image.viewCount || 0}</span>
      </div>
      <LikeButton targetId={image.$id} className="text-white" />
    </div>
    <div className="flex items-center space-x-2">
      <DownloadService artwork={image} />
      <ShareButton artwork={image} />
    </div>
  </div>
  {/* Title & description outside image */}
  <div className="mt-2 px-4 pb-4 ">
    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
      {image.title || 'Title'}
    </h3>
    {image.description && (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {image.description}
      </p>
    )}
  </div>
</motion.div>

            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={allImages[lightbox.index].url}
                alt={allImages[lightbox.index].title || 'Artwork'}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <IoClose size={24} />
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <FaArrowLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <FaArrowRight size={24} />
              </button>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white font-Quicksand">
                <p className="text-lg font-medium">{allImages[lightbox.index].title || 'Untitled'}</p>
                <p className="text-sm mt-1">
                  {lightbox.index + 1} / {allImages.length} • 
                  By {userProfiles[allImages[lightbox.index].userId]?.name || 'Unknown Artist'}
                </p>
              </div>
              <div className="absolute top-4 left-4">
                <ArtworkViewTracker artworkId={allImages[lightbox.index].$id} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
