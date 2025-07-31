import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, FiMenu, FiX, FiArrowRight, FiStar, FiBox, 
  FiGrid, FiChevronDown, FiSearch, FiMoon, FiSun,
  FiMail, FiUser, FiClock, FiMessageSquare, FiLoader, FiCamera
} from 'react-icons/fi';
import { FaPaintBrush, FaPalette, FaEthereum, FaCamera } from 'react-icons/fa';
import { databases, storage, account, Query } from '../appwriteConfig';
import LikeButton from '../EngagementService/likeButton';
import { Link } from 'react-router-dom';
import { proceedToCheckout } from './Commercial/PlaceOrder';
import { MdCurrencyRupee } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

const ArtStore = () => {
  const [activeCategory, setActiveCategory] = useState('trending');
  // const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // storing cart item in local storage
  const [cartItems, setCartItems] = useState(() => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
});

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('artverseCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('artverseCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('artverseCart');
  };

  // Fetch user profile
  const fetchUserProfile = async (userId) => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId
      );
      
      let profileImageUrl = null;
      if (response.profileImageId) {
        profileImageUrl = storage.getFilePreview(
          import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID,
          response.profileImageId,
        );
      }

      return {
        name: response.name || response.username || 'Unknown Artist',
        profileImage: profileImageUrl,
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

  // Fetch artwork from Appwrite
  const fetchArtwork = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(20),
          Query.isNotNull('price','fileId')
        ]
      );

      const artworksWithImages = await Promise.all(
        response.documents.map(async (art) => {
          try {
            let imageUrl = null;
            if (art.fileId) {
              imageUrl = storage.getFilePreview(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                art.fileId,
              );
            }
            
            // Fetch user data for each artwork
            let userData = { name: 'Unknown Artist' };
            if (art.userId) {
              userData = await fetchUserProfile(art.userId);
            }

            return { 
              ...art, 
              imageUrl,
              artist: userData.name,
              profileImage: userData.profileImage,
              formattedDate: new Date(art.$createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
            };
          } catch (err) {
            console.error('Error processing artwork:', art.fileId, err);
            return {
              ...art,
              imageUrl: null,
              artist: 'Unknown Artist',
              formattedDate: 'Date not available'
            };
          }
        })
      );

      setArtPieces(artworksWithImages);
    } catch (err) {
      console.error('Error fetching artwork:', err);
      setError('Failed to load artwork. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtwork();
  }, []);

  const filteredArt = activeCategory === 'trending'
    ? [...artPieces].sort((a, b) => b.rating - a.rating).slice(0, 4)
    : artPieces.filter(
        (art) =>
          art.category === activeCategory &&
          (art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           art.artist?.toLowerCase().includes(searchQuery.toLowerCase())
  ));

// Save to localStorage on every cart change
useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);


const addToCart = (art) => {
  try {
    // Validate required fields
    if (!art?.$id || !art?.userId) {
      throw new Error('Artwork is missing required information');
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.$id === art.$id);
      
      const baseCartItem = {
        ...art,
        sellerId: art.userId, // Map userId to sellerId
        quantity: 1
      };

      if (existingItem) {
        return prev.map(item => 
          item.$id === art.$id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, baseCartItem];
    });

  } catch (error) {
    console.error('Failed to add to cart:', error);
    // Optionally show user feedback
    alert('Could not add item to cart. Please try again.');
  }
};


const removeFromCart = (id) => {
  setCartItems(prev => prev.filter(item => item.$id !== id));
};

const updateCartItemQuantity = (id, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(id);
    return;
  }
  setCartItems(prev => 
    prev.map(item => 
      item.$id === id ? { ...item, quantity: newQuantity } : item
    )
  );
};



const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);


  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const openArtDetails = (art) => {
    setSelectedArt(art);
    setIsSidebarOpen(true);
  };

  const closeArtDetails = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedArt(null), 300);
  };

  const contactSeller = (email) => {
    if (email) {
      window.location.href = `mailto:${email}?subject=Inquiry about artwork`;
    } else {
      alert("Artist email not available");
    }
  };

  const categories = [
    { id: 'trending', name: 'Trending', icon: <FiStar /> },
    { id: 'digital', name: 'Digital', icon: <FaEthereum /> },
    { id: 'painting', name: 'Paintings', icon: <FaPaintBrush /> },
    { id: 'photography', name: 'Photography', icon: <FaCamera /> },
    { id: 'sculpture', name: 'Sculpture', icon: <FiBox /> },
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <FiLoader className="animate-spin text-4xl text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center p-6 max-w-md">
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} overflow-x-hidden relative font-Playfair`} ref={scrollRef}>
     <ToastContainer/>
      {/* Animated Background */}
      <motion.div
        className={`fixed inset-0 z-0 ${isDarkMode ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-indigo-100 via-blue-100 to-gray-50'}`}
        style={{ opacity: backgroundOpacity }}
      />

      {/* Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed w-full top-0 z-50 ${isDarkMode ? 'bg-gray-950/40 border-gray-400/80' : 'bg-white/40 border-gray-200/30'} backdrop-blur-lg border-b`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <FaPalette className={`text-2xl ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`} />
            <h1 className={`text-xl font-bold font-Eagle ${isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300' : 'text-indigo-600'}`}>
              Artverse
            </h1>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-gray-100/50 border-gray-300 text-gray-900'}`}
              />
            </motion.div>

            <nav className="flex gap-6">
              {[
                {name:'Gallery', path:'/Gallery'},
                {name:'Artists', path:'/Artists/DiscoverUsers'},
                {name:'Exibitions', path:'/Arteva/Artstore/Exibition'},
                {name:'About', path:'/about'}
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  whileHover={{ y: -2, color: isDarkMode ? '#C084FC' : '#4F46E5' }}
                  className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-indigo-600'} transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === 'grid' ? 'immersive' : 'grid')}
              className={`p-2 ${isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-indigo-600'}`}
              aria-label="Toggle view mode"
            >
              <motion.div animate={{ rotate: viewMode === 'grid' ? 0 : 360 }} transition={{ duration: 0.4 }}>
                {viewMode === 'grid' ? <FiGrid className="text-lg" /> : <FiBox className="text-lg" />}
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 ${isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-indigo-600'}`}
              aria-label="Shopping cart"
            >
              <FiShoppingBag className="text-lg" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center ${isDarkMode ? 'bg-purple-500 text-white' : 'bg-indigo-600 text-white'}`}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          <button
            className={`md:hidden text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className={`fixed inset-0 z-40 pt-20 px-4 sm:px-6 ${isDarkMode ? 'bg-gray-900/95 backdrop-blur-lg' : 'bg-white/95 backdrop-blur-lg'}`}
        >
          <div className="relative mb-6">
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-3 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-gray-100/50 border-gray-300 text-gray-900'}`}
            />
          </div>
          <nav className="flex flex-col gap-4 text-lg">
            {[
              {name:'Gallery', path:'/Gallery'},
              {name:'Artists', path:'/Artists/DiscoverUsers'},
              {name:'Exibitions', path:'/Arteva/Artstore/Exibition'},
              {name:'About', path:'/about'}
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                whileHover={{ x: 10, color: isDarkMode ? '#C084FC' : '#4F46E5' }}
                className={`py-3 border-b ${isDarkMode ? 'text-gray-300 hover:text-purple-300 border-gray-800/50 font-Playfair' : 'text-gray-600 hover:text-indigo-600 border-gray-200/50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.section
        style={{ scale: scaleHero }}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-gradient-to-t from-gray-950 to-transparent' : 'bg-gradient-to-t from-gray-50/80 to-transparent'}`} />
          <motion.img
            src="https://images.pexels.com/photos/2512282/pexels-photo-2512282.jpeg"
            alt="Featured Artwork"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 px-4 sm:px-6 max-w-4xl text-center"
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            <p className={isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 font-Quicksand' : 'text-indigo-600 font-Quicksand'}>The Curated MarketPlace of Artistic Heritage</p>
          </motion.h2>
          <motion.p
            className={`text-lg sm:text-xl mb-6 font-Playfair ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Discover rare artworks from global creators, verified on the blockchain.
          </motion.p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 font-Playfair ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-indigo-600 text-white'}`}
            >
              Explore Gallery <FiArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 border rounded-lg font-medium bg-white/40 font-Playfair backdrop-blur-lg ${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-indigo-600 text-indigo-600'}`}
            >
              Meet Artists
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiChevronDown className={`text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className={`relative z-10 ${isDarkMode ? 'bg-gray-950' : 'bg-white'} pt-16 pb-24`}>
        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`sticky top-16 z-20 ${isDarkMode ? 'bg-gray-950/80 border-gray-800/30' : 'bg-white/80 border-gray-200/30'} backdrop-blur-md py-4 border-b`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300' : 'text-indigo-600'}`}>
                {activeCategory === 'trending' ? 'Trending Now' : `${categories.find((c) => c.id === activeCategory)?.name} Collection`}
              </h3>
              <div className="flex overflow-x-auto hide-scrollbar">
                <div className="flex gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${isDarkMode ? activeCategory === category.id ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50' : activeCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}`}
                    >
                      {category.icon}
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Art Display */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
          {viewMode === 'grid' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredArt.map((art) => (
                <motion.div
                  key={art.$id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative group rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300`}
                  onHoverStart={() => setHoveredArt(art.$id)}
                  onHoverEnd={() => setHoveredArt(null)}
                >
                  <div className="relative aspect-square">
                    {art.imageUrl ? (
                      <motion.img
                        src={art.imageUrl}
                        alt={art.title || 'Artwork'}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredArt === art.$id ? 1.03 : 1,
                          filter: hoveredArt === art.$id ? 'brightness(0.95)' : 'brightness(1)',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <FiCamera className="text-4xl text-gray-400" />
                      </div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-4 left-4 flex items-center gap-2"
                    >
                      {art.profileImage ? (
                        <img 
                          src={art.profileImage} 
                          alt="Artist" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <FiUser className="text-gray-600" />
                        </div>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-900/80' : 'bg-gray-100/80'}`}>
                        {art.artist || 'Artist'}
                      </span>
                    </motion.div>
                    
                    <div className="absolute top-4 right-4 p-2 rounded-full">
                      <LikeButton targetId={art.$id} targetType="artwork" />
                    </div>
                    
                    <AnimatePresence>
                      {hoveredArt === art.$id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute inset-0 p-4 flex flex-col justify-end ${isDarkMode ? 'bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent' : 'bg-gradient-to-t from-white/90 via-white/50 to-transparent'}`}
                        >
                          <span className={`inline-block px-2 py-1 text-xs rounded mb-2 ${isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-indigo-600/90 text-white'}`}>
                            {art.medium || 'Artwork'}
                          </span>
                          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {art.title || 'Untitled Artwork'}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {art.artist || 'Unknown Artist'}
                              </p>
                              <p className={`font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                <MdCurrencyRupee/>{art.price?.toLocaleString() || '0'}
                              </p>
                              <div className="flex items-center gap-1 text-yellow-400">
                                <FiStar className="text-sm" />
                                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                                  {art.rating || '0'} ({art.likes || '0'})
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addToCart(art)}
                                className={`p-2 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-indigo-600'}`}
                                aria-label="Add to cart"
                              >
                                <FiShoppingBag className="text-white" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openArtDetails(art)}
                                className={`p-2 rounded-full border ${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-gray-100/80 border-gray-300/50'}`}
                                aria-label="View details"
                              >
                                <FiArrowRight className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {hoveredArt !== art.$id && (
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {art.title || 'Untitled Artwork'}
                          </h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {art.artist || 'Unknown Artist'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FiStar className="text-sm" />
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                            {art.rating || '0'}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className={`text-base flex items-center font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <MdCurrencyRupee/>{art.price?.toLocaleString() || '0'}
                        </p>
                        <div className={`text-xs px-2 py-1 rounded-full border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          {art.formattedDate || 'Date not available'}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
           <div className="space-y-16">
              {filteredArt.map((art, index) => (
                <motion.section
                  key={art.$id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}
                >
                  <div className="md:w-1/2">
                    <motion.div
                      whileHover={{ scale: 0.98 }}
                      className="relative rounded-xl overflow-hidden aspect-square"
                    >
                      {art.imageUrl ? (
                        <img src={art.imageUrl} alt={art.title || 'Artwork'} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <FiCamera className="text-4xl text-gray-400" />
                        </div>
                      )}
                      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-gray-900/40 to-transparent' : 'bg-gradient-to-t from-gray-200/30 to-transparent'}`} />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        {art.profileImage ? (
                          <img 
                            src={art.profileImage} 
                            alt="Artist" 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <FiUser className="text-gray-600" />
                          </div>
                        )}
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {art.artist || 'Unknown Artist'}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {art.formattedDate || 'Date not available'}
                          </p>
                        </div> 
                      </div>
                    </motion.div>
                  </div>
                  <div className="md:w-1/2">
                    <motion.div
                      initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 text-sm rounded ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-indigo-100 text-indigo-600'}`}>
                          {art.medium || 'Artwork'}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FiStar className="text-sm" />
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                            {art.rating || '0'} ({art.likes || '0'})
                          </span>
                        </div>
                      </div>
                      <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {art.title || 'Untitled Artwork'}
                      </h2>
                      <p className={`text-base mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {art.description || 'No description available.'}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
                          <p className={`text-xl font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <MdCurrencyRupee/>
                            {art.price?.toLocaleString() || '0'}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: `0 4px 15px ${isDarkMode ? 'rgba(196, 132, 252, 0.3)' : 'rgba(79, 70, 229, 0.3)'}` }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(art)}
                          className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-indigo-600 text-white'}`}
                        >
                          Add to Cart <FiShoppingBag />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openArtDetails(art)}
                          className={`px-6 py-3 border rounded-lg font-medium ${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-indigo-600 text-indigo-600'}`}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Art Details Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && selectedArt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={closeArtDetails}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 z-50 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedArt.title || 'Untitled Artwork'}
                  </h2>
                  <button
                    onClick={closeArtDetails}
                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {selectedArt.imageUrl ? (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={selectedArt.imageUrl} 
                      alt={selectedArt.title || 'Artwork'} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : (
                  <div className={`mb-6 rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} aspect-square flex items-center justify-center`}>
                    <FiCamera className="text-4xl text-gray-400" />
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    {selectedArt.profileImage ? (
                      <img 
                        src={selectedArt.profileImage} 
                        alt="Artist" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <FiUser className="text-gray-600 text-xl" />
                      </div>
                    )}
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedArt.artist || 'Unknown Artist'}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {selectedArt.formattedDate || 'Date not available'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FiStar className="text-lg" />
                      <span className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedArt.rating || '0'}
                      </span>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {selectedArt.medium || 'Artwork'}
                    </span>
                    <div className="flex items-center gap-1">
                      <LikeButton targetId={selectedArt.$id} targetType="artwork" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Description
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedArt.description || 'No description available.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</h4>
                      <p className={`font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <MdCurrencyRupee/>{selectedArt.price?.toLocaleString() || '0'}
                      </p>
                    </div>
                    {selectedArt.dimensions && (
                      <div>
                        <h4 className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dimensions</h4>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {selectedArt.dimensions}
                        </p>
                      </div>
                    )}
                    {selectedArt.resolution && (
                      <div>
                        <h4 className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Resolution</h4>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {selectedArt.resolution}
                        </p>
                      </div>
                    )}
                    {selectedArt.fileType && (
                      <div>
                        <h4 className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>File Type</h4>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {selectedArt.fileType}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Reviews
                  </h3>
                  {selectedArt.reviews?.length > 0 ? (
                    <div className="space-y-4">
                      {selectedArt.reviews.map((review) => (
                        <div key={review.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {review.user || 'Anonymous'}
                            </h4>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <FiStar className="text-sm" />
                              <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {review.rating}
                              </span>
                            </div>
                          </div>
                          <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {review.comment || 'No comment provided'}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <FiClock className="text-xs" />
                            <span>
                              {review.date || 'Date not available'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                      <FiMessageSquare className="mx-auto text-2xl mb-2" />
                      <p>No reviews yet</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(selectedArt)}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-indigo-600 text-white'}`}
                  >
                    Add to Cart <FiShoppingBag />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => contactSeller(selectedArt.artistEmail)}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 border ${isDarkMode ? 'border-gray-700 text-white hover:bg-gray-800' : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'}`}
                  >
                    Contact Artist <FiMail />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 z-50 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-xl`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Your Cart ({cartItemCount})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.$id} className={`flex gap-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                          <div className="w-20 h-20 flex-shrink-0">
                            {item.imageUrl ? (
                              <img 
                                src={item.imageUrl} 
                                alt={item.title || 'Artwork'} 
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <div className={`w-full h-full flex items-center justify-center rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <FiCamera className="text-xl text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.title || 'Untitled Artwork'}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {item.artist || 'Unknown Artist'}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => updateCartItemQuantity(item.$id, item.quantity - 1)}
                                  className={`w-6 h-6 flex items-center justify-center rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                  onClick={() => updateCartItemQuantity(item.$id, item.quantity + 1)}
                                  className={`w-6 h-6 flex items-center justify-center rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                  +
                                </button>
                              </div>
                              <p className={`font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                <MdCurrencyRupee/>{(item.price * item.quantity)?.toLocaleString() || '0'}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.$id)}
                                className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-100 hover:bg-red-200 text-red-600'}`}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subtotal</span>
                        <span className={`font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <MdCurrencyRupee/>{cartTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Shipping</span>
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Free
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-700/50">
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                        <span className={`font-bold flex items-center text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <MdCurrencyRupee/>{cartTotal.toLocaleString()}
                        </span>
                      </div>
                      <motion.button
                        onClick={() => proceedToCheckout(cartItems, () => {
                        setCartItems([]);
                        localStorage.removeItem('cartItems');
                        toast.success("Your Order Proceed Successfully")
                        })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-indigo-600 text-white'}`}
                      >
                        Proceed to Checkout
                      </motion.button>
                    </div>

                    <button
                      onClick={clearCart}
                      className={`w-full py-2 text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
                    >
                      Clear Cart
                    </button>
                  </>
                ) : (
                  <div className={`p-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FiShoppingBag className="mx-auto text-4xl mb-4" />
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm mt-2">Browse our collection to find amazing artwork</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsCartOpen(false)}
                      className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}
                    >
                      Continue Shopping
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-gray-100/80 border-gray-300/50'}`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setViewMode(viewMode === 'grid' ? 'immersive' : 'grid')}
          className={`p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-gray-100/80 border-gray-300/50'}`}
          aria-label="Toggle view mode"
        >
          <motion.div animate={{ rotate: viewMode === 'grid' ? 0 : 360 }} transition={{ duration: 0.4 }}>
            {viewMode === 'grid' ? <FiGrid className="text-lg" /> : <FiBox className="text-lg" />}
          </motion.div>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className={`p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-indigo-600'}`}
          aria-label="Shopping cart"
        >
          <div className="relative">
            <FiShoppingBag className="text-lg text-white" />
            {cartItemCount > 0 && (
              <span className={`absolute -top-2 -right-2 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isDarkMode ? 'bg-white text-purple-600' : 'bg-white text-indigo-600'}`}>
                {cartItemCount}
              </span>
            )}
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <footer className={`py-8 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Artverse. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>Privacy Policy</a>
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>Terms of Service</a>
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
    
  );
};

export default ArtStore;