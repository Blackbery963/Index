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
       <header className="lg:h-[80px] h-[70px] w-full backdrop-blur-md shadow-md flex items-center justify-between pl-4 pr-8 fixed top-0 z-50 bg-white/40 dark:bg-gray-800/40">
       <Link to={'/'}>
        <h1 className="font-Eagle font-bold lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] text-[#001F3F] dark:text-white">
          Painters' Diary
        </h1>
       </Link>
        
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          {isScrolled && (
            <motion.div className="relative w-48 sm:w-64" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search paintings..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              
              {suggestions.length > 0 && (
                <motion.ul className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50"
                  variants={dropdownVariants} initial="hidden" animate="visible">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          )}
          
          <div className="md:flex hidden gap-x-2 sm:gap-x-4 text-gray-800 dark:text-gray-200 font-playfair font-semibold">
            {['Home', 'About', 'Account', 'Journal'].map((item) => (
              <Link key={item}  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>
                <motion.button
                  className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item === 'Home' && <FaHome className="text-lg sm:text-xl" />}
                  {item === 'About' && <FaInfoCircle className="text-lg sm:text-xl" />}
                  {item === 'Account' && <FaUser className="text-lg sm:text-xl" />}
                  {item === 'Journal' && <MdCollections className="text-lg sm:text-xl" />}
                  <span className="hidden sm:inline">{item}</span>
                </motion.button>
              </Link>
            ))}
          </div>
          
          <button className="md:hidden p-2 text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-300 transition-all duration-300"
            onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header> 


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg shadow-md z-40 rounded-lg"
            variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden">
            <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
              {/* {['home', 'about', 'account', 'landscape'].map((item) => (
                <Link key={item}  to={item === 'Home' ? '/' : `/${item.toLocaleLowerCase}`} onClick={() => { setActiveButton(item); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 ${
                    activeButton === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}>
                    {item === 'home' && <FaHome />}
                    {item === 'about' && <FaInfoCircle />}
                    {item === 'account' && <FaUser />}
                    {item === 'landscape' && <FaPalette />}
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </Link>
              ))} */}
              {['home', 'about', 'account', 'journal'].map((item) => (
  <Link
    key={item}
    to={item === 'home' ? '/' : `/${item.toLowerCase()}`}
    onClick={() => {
      setActiveButton(item);
      toggleMenu();
    }}
  >
    <button
      className={`w-full py-2 px-4 flex items-center justify-center gap-2 ${
        activeButton === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {item === 'home' && <FaHome />}
      {item === 'about' && <FaInfoCircle />}
      {item === 'account' && <FaUser />}
      {item === 'journal' && <MdCollections />}
      {item.charAt(0).toUpperCase() + item.slice(1)}
    </button>
  </Link>
))}

            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="h-[100vh] w-full bg-center bg-cover flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${bg})` }}>
        <section className="mx-auto lg:w-[50%] w-[90%] p-6 rounded-xl border border-gray-300 dark:border-gray-700 shadow-2xl bg-white/40 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-300 animate-fadeIn">
          <h1 className="font-Quicksand font-bold text-center text-[#6A1E55] dark:text-[#E1A4C6] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] animate-slideInUp">
            Palette of Dreams: A Showcase of Artistic Brilliance
          </h1>

          <h5 className="font-Playfair italic text-center text-gray-800 dark:text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[23px] mt-4 animate-slideInUp">
            {window.innerWidth >= 1024 ? 
              "From timeless landscapes to mesmerizing abstract wonders, delve into the rich tapestry of stories, emotions, and creative inspirations woven into every brushstroke—a celebration of art's boundless beauty and its profound connection to the human spirit." :
              "From stunning landscapes to abstract wonders, each brushstroke tells a story—a celebration of art's beauty and deep connection to the human spirit."}
          </h5>

          {!isScrolled && (
            <div className="max-w-2xl mx-auto mt-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search paintings..."
                  className="w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />

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
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                  Found {filteredImages.length} {filteredImages.length === 1 ? 'result' : 'results'}
                </div>
              )}
            </div>
          )}
        </section>
      </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.$id}
                className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* User Profile Header */}
                <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <Link 
                    to={`/Account/${image.userId}`}
                    className="flex items-center group flex-1 min-w-0"
                  >
                    {userProfiles[image.userId]?.profileImage ? (
                      <img
                        src={userProfiles[image.userId].profileImage}
                        className="h-10 w-10 rounded-full object-cover"
                        alt={userProfiles[image.userId].name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '';
                          e.target.className = 'h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white';
                          e.target.textContent = userProfiles[image.userId]?.name?.charAt(0) || 'U';
                        }}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                        {userProfiles[image.userId]?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:underline">
                        {userProfiles[image.userId]?.name || 'Unknown Artist'}
                      </p>
                      {userProfiles[image.userId]?.title && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {userProfiles[image.userId].title}
                        </p>
                      )}
                    </div>
                  </Link>
                  <FollowButton targetUserId={image.userId} />
                </div>

                {/* Artwork Image */}
                <img
                  src={image.url}
                  alt={image.title || 'Artwork'}
                  className="w-full h-64 object-cover cursor-pointer"
                  loading="lazy"
                  onClick={() => openLightbox(index)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />

                {/* Artwork Actions */}
                <div className="flex justify-between items-center p-4">
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <FaRegEye className="text-[20px]" />
                      <span className="text-sm font-Quicksand">{image.viewCount || 0}</span>
                    </div>
                    <LikeButton targetId={image.$id} />
                    <button
                      onClick={() => setShowComments(showComments === image.$id ? null : image.$id)}
                      className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <FaRegComment />
                      <span className="text-sm font-Quicksand">0</span>
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <DownloadService artwork={image} />
                    <ShareButton artwork={image} />
                  </div>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {showComments === image.$id && (
                    <motion.div
                      className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={(e) => handleCommentSubmit(image.$id, e)} className="flex flex-col">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none"
                          rows={3}
                        />
                        <button
                          type="submit"
                          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-Quicksand"
                        >
                          Post
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Artwork Info */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-Quicksand truncate">
                    {image.title || 'Untitled'}
                  </h3>
                  {image.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
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