import { useState, useRef, useEffect, } from 'react';
import BackImg from './Sub_components_images/pexels-bri-schneiter-28802-346529.jpg';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle, FaPalette, FaSearch, FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { storage, Query, databases } from '../appwriteConfig';
import { FaHeart, FaRegComment, FaPlus, FaUserCircle, FaRegEye } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { PiShareFatLight } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';
import SearchBar from '../SearchBar';
import { client } from '../appwriteConfig';
import InfoCard from './Info/InfoCards';
import { infoCardsData } from './Info/InfoCardsData';
import FollowButton from '../Follow/FollowButton';
import LikeButton from '../EngagementService/likeButton';
import ArtworkViewTracker from '../Views/viewsTracker';
import DownloadService from '../Downloads/downloadService';
import ShareButton from '../Share/ShareFunction';
import { fetchUserProfile, } from '../Components/Account/ProfileServixe';


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;


function Landscape() {
  const [activeButton, setActiveButton] = useState('landscape');
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [landscapeImages, setLandscapeImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [profileImage, setProfileImage] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});


   const [profile, setProfile] = useState({
    username: '',
    email: '',
    profileImage:null
  });

  useEffect(() => {
  const loadProfile = async () => {
    const profileData = await fetchUserProfile();
    setProfile(profileData);
  };
  
  loadProfile();
}, []);

useEffect(() => {
  const fetchLandscapeImages = async () => {
    try {
      setLoading(true);
      
      // Fetch landscape artworks
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('tag', 'Landscape')]
      );

      // Get image URLs
      const imagesWithUrls = await Promise.all(
        response.documents.map(async (doc) => {
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
      setLandscapeImages(validImages);

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
      setError(err.message || 'Failed to load landscape images');
    } finally {
      setLoading(false);
    }
  };

  fetchLandscapeImages();
}, []);

  
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
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

  const [likes, setLikes] = useState({});
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [followedUsers, setFollowedUsers] = useState({});
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  // Toggle like for an image
  const toggleLike = (imageId) => {
    setLikes((prev) => ({
      ...prev,
      [imageId]: {
        liked: !prev[imageId]?.liked,
        count: (prev[imageId]?.count || 0) + (prev[imageId]?.liked ? -1 : 1),
      },
    }));
  };

  // Toggle follow for a user
  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Handle comment submission (simulated)
  const handleCommentSubmit = (imageId, e) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log(`Comment for ${imageId}: ${newComment}`); // Replace with Appwrite integration
      setNewComment('');
      setShowComments(null);
    }
  };

  // Lightbox navigation
  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index > 0 ? prev.index - 1 : landscapeImages.length - 1,
  }));
  const nextImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index < landscapeImages.length - 1 ? prev.index + 1 : 0,
  }));

  // Animation variants for lightbox
  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };


  // search functionality
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  // Fetch images from Appwrite (same as Gallery.jsx)
  useEffect(() => {
    const fetchImages = async () => {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setAllImages(response.documents);
      setFilteredImages(fetchlandscapeImages);
    };
    fetchImages();
  }, []);

  // rendering info
   const cards = infoCardsData.landscape;

// real time updatw for vieww count
     useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
          const updatedDoc = response.payload;
          setLandscapeImages((prev) =>
            prev.map((image) =>
              image.$id === updatedDoc.$id
                ? { ...image, viewCount: updatedDoc.viewCount || 0 }
                : image
            )
          );
        }
      }
    );

    return () => unsubscribe();
  }, []);


  return (
    <div className='h-screen w-screen overflow-x-hidden bg-gray-100 dark:bg-gray-900 font-Playfair'>
      {/* Header Section */}
      <div className='h-[80vh] w-full bg-center bg-cover' style={{ backgroundImage: `url(${BackImg})` }}>
        {/* Navbar */}
        <header className='fixed top-0 h-[80px] w-full bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-black'>Painters' Diary</h1>
          </div>
          {/* Navigation Buttons */}
          <div className='flex items-center gap-x-2 sm:gap-x-4'>
            {/* Search Bar */}
             <div>
             <SearchBar 
             allImages={landscapeImages} 
             onFilter={setFilteredImages} 
             placeholder="Search landscapes..." 
             />
             </div>
            {/* Desktop Navigation */}
            <nav className='hidden md:flex gap-x-4 text-black font-Playfair font-bold'>
              <Link to='/'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('home')}
                >
                  <FaHome />
                  <span className="ml-1">Home</span>
                </button>
              </Link>
              <Link to='/About'> 
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('about')}
                >
                  <FaInfoCircle />
                  <span className="ml-1">About</span>
                </button>
              </Link>
              <Link to='/Account'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('account')}
                >
                  <FaUser />
                  <span className="ml-1">Account</span>
                </button>
              </Link>
              <Link to='/gallery'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all bg-blue-500 text-white flex items-center justify-center gap-1 ${activeButton === 'landscape' ? 'bg-blue-600' : ''}`}
                  onClick={() => setActiveButton('landscape')}
                >
                  <FaPalette />
                  <span className="ml-1">Gallery</span>
                </button>
              </Link>
            </nav>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </header>
        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md z-40 rounded-lg"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
                <Link to='/' onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaHome />
                    Home
                  </button>
                </Link>
                <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaInfoCircle />
                    About
                  </button>
                </Link>
                <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaUser />
                    Account
                  </button>
                </Link>
                <Link to='/gallery' onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg`}>
                    <FaPalette />
                    Gallery
                  </button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
        {/* Hero Section */}
        <main className='flex flex-col items-center justify-center h-full px-4 text-center'>
          <h1 className='font-Tapestary text-[30px] md:text-[50px] text-white drop-shadow-lg animate-fade-in'>In The Lap Of Nature</h1>
          <h5 className='font-Carattere text-[20px] md:text-[28px] text-white mt-4 drop-shadow-md animate-fade-in delay-200'>
            An epic expedition into the heart of the wild, where every journey unfolds nature’s untold wonders and boundless beauty
          </h5>
          <button 
            className='mt-8 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform'
            onClick={scrollToContent}
          >
            Explore Now
          </button>
        </main>
        {/* Floating Decorative Element */}
        <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-6 border-4 border-white rounded-full'></div>
        </div>
      </div>
      {/* Content Section */}
      <section ref={contentRef} className='w-[85%] py-12 bg-gray-100 dark:bg-gray-900  mx-auto'>
        <div className='max-w-7xl mx-auto text-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold font-Quicksand text-gray-800 dark:text-gray-200 mb-4'>Discover the Beauty of Landscapes</h2>
          <p className='text-base md:text-lg text-gray-600 dark:text-gray-300'>
            Explore our curated collection of breathtaking landscape paintings that celebrate the raw beauty of nature. Each piece tells a story, capturing moments of tranquility, adventure, and wonder.
          </p>
        </div>
        {/* The divider section */}

            {/* Landscape Painting Info Section */}
           <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-100 dark:bg-gray-900">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {cards.map((card, index) => (
           <InfoCard
            key={index}
            title={card.title}
            content={card.content}
            gradient={card.gradient}
            type={card.type}
            delay={index * 0.1}
            />
            ))}
            </div>
            </div>

        {/* Image Grid Section  */}
        <section>
          <section ref={contentRef} className="py-12 bg-gray-100 dark:bg-gray-900 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            Error loading images: {error}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 p-4">
            No landscape images found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.$id}
                className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.00, shadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* Profile Section */}
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
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title || 'Landscape image'}
                  className="w-full h-64 object-cover cursor-pointer"
                  loading="lazy"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  onClick={() => openLightbox(index)}
                />
                {/* Actions */}
                <div className="flex justify-between items-center p-4">
                  <div className="flex space-x-4">
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <FaRegEye className='text-[20px]'/>
                      <span className="text-sm font-Quicksand">{image.viewCount || 0}</span>
                    </div>
                    <LikeButton targetId={image.$id}/>
                    <button
                      onClick={() => setShowComments(showComments === image.$id ? null : image.$id)}
                      className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <FaRegComment />
                      <span className="text-sm font-Quicksand">0</span>
                    </button>
                    <div>
                      <DownloadService artwork={image} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShareButton artwork={image} />
                    </div>
                  </div>
                </div>
                {/* Comment Section */}
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
                {/* Image Details */}
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
      </section>
      {/* Lightbox Modal */}
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
              className="relative max-w-4xl w-full"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={landscapeImages[lightbox.index].url}
                alt={landscapeImages[lightbox.index].title || 'Landscape image'}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
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
                <FaArrowLeft/>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <FaArrowRight/>
              </button>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white font-Quicksand">
                <p>{landscapeImages[lightbox.index].title || 'Untitled'}</p>
                <p className="text-sm">{lightbox.index + 1} / {landscapeImages.length}</p>
                  <div className="absolute top-4 left-4">
                    <ArtworkViewTracker artworkId={landscapeImages[lightbox.index].$id} />
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </section>
      </section>
    </div>
  );
}

export default Landscape;
