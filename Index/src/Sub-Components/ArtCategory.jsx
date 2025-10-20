// ArtCategory.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle, FaPalette, FaArrowLeft, FaArrowRight, FaRegEye } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { storage, Query, databases, client } from '../appwriteConfig';
import { IoClose } from 'react-icons/io5';
import SearchBar from '../SearchBar';
import InfoCard from './Info/InfoCards';
import { infoCardsData } from './Info/InfoCardsData';
import FollowButton from '../Follow/FollowButton';
import LikeButton from '../EngagementService/likeButton';
import ArtworkViewTracker from '../Views/viewsTracker';
import ShareButton from '../Share/ShareFunction';
import DownloadService from '../Downloads/downloadService';
import { fetchUserProfile } from '../Components/Account/ProfileServixe';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// Art category configuration
const artCategories = {
  abstract: {
    tag: 'abstract',
    backgroundImage: './Sub_components_images/abstract.jpg',
    title: 'Abstract Realms of Creativity',
    subtitle: 'Dive into a gallery of vibrant colors and forms where imagination takes shape and emotions come alive',
    sectionTitle: 'Echoes of the Mind – The Unspoken Language of Abstract Art',
    sectionDescription: 'With every stroke and vibrant hue, each piece beckons you to journey into the depths of emotion, where imagination knows no bounds and meaning is shaped by the viewer\'s soul.',
    infoCards: 'Abstract'
  },
  digital: {
    tag: 'DigitalArt',
    backgroundImage: './Sub_components_images/digital.jpg',
    title: 'Pixels & Possibilities',
    subtitle: 'Experience the fusion of technology and imagination through digital masterpieces crafted with precision and vision.',
    sectionTitle: 'Dive into the World of Digital Art',
    sectionDescription: 'Witness creativity without limits. Digital art fuses imagination and technology to create vivid, boundary-pushing masterpieces.',
    infoCards: 'digital'
  },
  portrait: {
    tag: 'Portrait',
    backgroundImage: './Sub_components_images/portrait.jpg',
    title: 'Faces of Emotion',
    subtitle: 'Discover the soul behind every gaze in our curated collection of expressive portraits.',
    sectionTitle: 'Capturing the Human Spirit',
    sectionDescription: 'Each portrait tells a unique story, revealing the depth and complexity of human emotions through artistic expression.',
    infoCards: 'portrait'
  },
  landscape: {
    tag: 'Landscape',
    backgroundImage: './Sub_components_images/landscape.jpg',
    title: 'Nature\'s Canvas',
    subtitle: 'Journey through breathtaking landscapes that capture the beauty of our natural world.',
    sectionTitle: 'The World Through Artistic Eyes',
    sectionDescription: 'From majestic mountains to serene seascapes, experience nature\'s grandeur through the lens of talented artists.',
    infoCards: 'landscape'
  }
  // Add more categories as needed...
};

function ArtCategory({ category }) {
  const config = artCategories[category];
  
  if (!config) {
    return <div>Category not found</div>;
  }

  const [activeButton, setActiveButton] = useState('gallery');
  const contentRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profileImage: null
  });
  const [filteredImages, setFilteredImages] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await fetchUserProfile();
      setProfile(profileData);
    };
    loadProfile();
  }, []);

  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        setLoading(true);
        
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal('tag', config.tag)]
        );

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
        setImages(validImages);
        setFilteredImages(validImages);

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
        setError(err.message || `Failed to load ${category} images`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryImages();
  }, [category, config.tag]);

  // Real-time updates for view counts
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
          const updatedDoc = response.payload;
          setImages((prev) =>
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

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index > 0 ? prev.index - 1 : images.length - 1,
  }));
  const nextImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index < images.length - 1 ? prev.index + 1 : 0,
  }));

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const cards = infoCardsData[config.infoCards] || [];

  return (
    <div className='h-screen w-screen overflow-x-hidden bg-gray-100 dark:bg-gray-900 font-Playfair'>
      <div className='h-[80vh] w-full bg-center bg-cover' style={{ backgroundImage: `url(${config.backgroundImage})` }}>
        <header className='fixed top-0 h-[80px] w-full bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
          <Link to={'/'}>
            <div className='flex items-center'>
              <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-black'>Painters' Diary</h1>
            </div>
          </Link>
          <div className='flex items-center gap-x-2 sm:gap-x-4'>
            <div>
              <SearchBar 
                allImages={images} 
                onFilter={setFilteredImages} 
                placeholder={`Search ${category}...`}
              />
            </div>
            <nav className='hidden md:flex gap-x-4 text-black font-Playfair font-bold'>
              <Link to='/'>
                <button className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-600/50' : ''}`}>
                  <FaHome />
                  <span className="ml-1">Home</span>
                </button>
              </Link>
              <Link to='/About'> 
                <button className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-600/50' : ''}`}>
                  <FaInfoCircle />
                  <span className="ml-1">About</span>
                </button>
              </Link>
              <Link to='/Account'>
                <button className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-600/50' : ''}`}>
                  <FaUser />
                  <span className="ml-1">Account</span>
                </button>
              </Link>
              <Link to='/Gallery'>
                <button className={`px-2 py-1 rounded-md transition-all bg-blue-500 text-white flex items-center justify-center gap-1 ${activeButton === 'gallery' ? 'bg-blue-600' : ''}`}>
                  <FaPalette />
                  <span className="ml-1">Gallery</span>
                </button>
              </Link>
            </nav>
            <button 
              className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </header>
        
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
                  <button className="w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <FaHome /> Home
                  </button>
                </Link>
                <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                  <button className="w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <FaInfoCircle /> About
                  </button>
                </Link>
                <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                  <button className="w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <FaUser /> Account
                  </button>
                </Link>
                <Link to='/Gallery' onClick={() => { setActiveButton('gallery'); toggleMenu(); }}>
                  <button className="w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg">
                    <FaPalette /> Gallery
                  </button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
        
        <main className='flex flex-col items-center justify-center h-full px-4 text-center'>
          <h1 className='font-Tapestary text-[30px] md:text-[50px] text-[#1b263b] drop-shadow-lg animate-fade-in'>
            {config.title}
          </h1>
          <h5 className='font-Carattere font-normal text-[20px] md:text-[28px] text-[#38040e] mt-4 drop-shadow-md animate-fade-in delay-200'>
            {config.subtitle}
          </h5>
          <button 
            className='mt-8 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform'
            onClick={scrollToContent}
          >
            Explore Now
          </button>
        </main>
        <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-6 border-4 border-white rounded-full'></div>
        </div>
      </div>

      <section ref={contentRef} className='lg:w-[85%] w-[96%] py-4 bg-gray-100 dark:bg-gray-900 mx-auto'>
        <div className='max-w-7xl mx-auto text-center'>
          <h2 className='text-2xl md:text-3xl font-bold font-Playfair text-gray-800 mb-4'>
            {config.sectionTitle}
          </h2>
          <p className='text-base md:text-lg text-gray-600'>
            {config.sectionDescription}
          </p>
        </div>
      </section>

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

      <section className="py-4 bg-gray-100 dark:bg-gray-900 w-full">
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
            No {category} images found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-[85%] mx-auto">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.$id}
                className="relative rounded-xl overflow-hidden"
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {/* Your image card content remains the same */}
                <img
                  src={image.url}
                  alt={image.title || 'Artwork'}
                  className="w-full h-80 object-cover cursor-pointer"
                  loading="lazy"
                  onClick={() => openLightbox(index)}
                />
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
                {image.tag && (
                  <div className="absolute bottom-0 right-0 m-2 px-2 py-1 rounded-md shadow-inner border dark:text-white text-gray-800 border-neutral-500 text-xs font-medium">
                    {image.medium}
                  </div>
                )}
                <div className="right-0 flex justify-between items-center px-3 py-2 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <FaRegEye className="text-[18px] text-gray-500 dark:text-gray-400" />
                      <span className='text-gray-500 dark:text-gray-400'>{image.viewCount || 0}</span>
                    </div>
                    <LikeButton targetId={image.$id} className="text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <DownloadService artwork={image} />
                    <ShareButton artwork={image} />
                  </div>
                </div>
                <div className="mt-2 px-4 pb-4">
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
      </section>

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
                src={images[lightbox.index].url}
                alt={images[lightbox.index].title || `${category} image`}
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
                <FaArrowLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <FaArrowRight />
              </button>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white font-Quicksand">
                <p>{images[lightbox.index].title || 'Untitled'}</p>
                <p className="text-sm">{lightbox.index + 1} / {images.length}</p>
              </div>
              <div className="absolute top-4 left-4">
                <ArtworkViewTracker artworkId={images[lightbox.index].$id} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ArtCategory;