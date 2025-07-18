
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, FiMenu, FiX, FiArrowRight, FiStar, FiBox, 
  FiGrid, FiChevronDown, FiSearch, FiHeart, FiShare2, FiMoon, FiSun 
} from 'react-icons/fi';
import { FaPaintBrush, FaPalette, FaEthereum, FaCamera } from 'react-icons/fa';

const ArtStore = () => {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [cartItems, setCartItems] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const artPieces = [
    {
      id: 1,
      title: "Neon Dreams",
      artist: "Akira Yamamoto",
      price: 1249,
      category: "digital",
      medium: "Digital NFT",
      year: 2023,
      rating: 4.8,
      likes: 142,
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colors: ['#FF2D75', '#763CFF', '#00F0FF'],
      artistImage: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      title: "Abstract Topography",
      artist: "Elena Vázquez",
      price: 2899,
      category: "painting",
      medium: "Acrylic on Canvas",
      year: 2022,
      rating: 4.9,
      likes: 256,
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colors: ['#E63946', '#F1FAEE', '#A8DADC'],
      artistImage: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 3,
      title: "Metropolis Echo",
      artist: "Jamal Carter",
      price: 1899,
      category: "photography",
      medium: "Archival Print",
      year: 2021,
      rating: 4.7,
      likes: 189,
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colors: ['#2B2D42', '#8D99AE', '#EDF2F4'],
      artistImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 4,
      title: "Botanical Algorithms",
      artist: "Lena Petrovic",
      price: 899,
      category: "digital",
      medium: "Generative Art",
      year: 2023,
      rating: 4.6,
      likes: 98,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colors: ['#2A9D8F', '#E9C46A', '#F4A261'],
      artistImage: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 5,
      title: "Chromatic Waves",
      artist: "Oliver Chen",
      price: 3499,
      category: "sculpture",
      medium: "Mixed Media",
      year: 2020,
      rating: 5.0,
      likes: 312,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colors: ['#3A86FF', '#8338EC', '#FF006E'],
      artistImage: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 6,
      title: "Silent Observer",
      artist: "Sophie Laurent",
      price: 4299,
      category: "painting",
      medium: "Oil on Linen",
      year: 2021,
      rating: 4.9,
      likes: 278,
      image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      colors: ['#F8EDEB', '#FEC89A', '#FFB5A7'],
      artistImage: "https://randomuser.me/api/portraits/women/28.jpg",
    },
  ];

  const filteredArt = activeCategory === 'trending'
    ? [...artPieces].sort((a, b) => b.rating - a.rating).slice(0, 4)
    : artPieces.filter(
        (art) =>
          art.category === activeCategory &&
          (art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           art.artist.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const categories = [
    { id: 'trending', name: 'Trending', icon: <FiStar /> },
    { id: 'digital', name: 'Digital', icon: <FaEthereum /> },
    { id: 'painting', name: 'Paintings', icon: <FaPaintBrush /> },
    { id: 'photography', name: 'Photography', icon: <FaCamera /> },
    { id: 'sculpture', name: 'Sculpture', icon: <FiBox /> },
  ];

  const addToCart = (id) => {
    setCartItems((prev) => prev + 1);
  };

  const toggleLike = (id) => {
    console.log(`Toggled like for artwork ${id}`);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} overflow-x-hidden`} ref={scrollRef}>
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
              {['Gallery', 'Artists', 'Exhibitions', 'About'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ y: -2, color: isDarkMode ? '#C084FC' : '#4F46E5' }}
                  className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-indigo-600'} transition-colors`}
                >
                  {item}
                </motion.a>
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
                className={`relative p-2 ${isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-indigo-600'}`}
                aria-label="Shopping cart"
              >
                <FiShoppingBag className="text-lg" />
                {cartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center ${isDarkMode ? 'bg-purple-500 text-white' : 'bg-indigo-600 text-white'}`}
                  >
                    {cartItems}
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
              {['Gallery', 'Artists', 'Exhibitions', 'About', 'Cart'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ x: 10, color: isDarkMode ? '#C084FC' : '#4F46E5' }}
                  className={`py-3 border-b ${isDarkMode ? 'text-gray-300 hover:text-purple-300 border-gray-800/50 font-Playfair' : 'text-gray-600 hover:text-indigo-600 border-gray-200/50'}`}
                >
                  {item}
                </motion.a>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`inline-block px-4 py-2 rounded-full text-sm mb-6 border ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-100/50 border-gray-200/50'}`}
          >
            <span className={`${isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300' : 'text-indigo-600'}`}>
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            <p className={isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 font-Quicksand' : 'text-indigo-600 font-Quicksand'}>The Curated MarketPlace of Artistic Heritage </p>
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
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`relative group rounded-lg shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                  onHoverStart={() => setHoveredArt(art.id)}
                  onHoverEnd={() => setHoveredArt(null)}
                >
                  <div className="relative aspect-square">
                    <motion.img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredArt === art.id ? 1.03 : 1,
                        filter: hoveredArt === art.id ? 'brightness(0.95)' : 'brightness(1)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-4 left-4 flex items-center gap-2"
                    >
                      <img
                        src={art.artistImage}
                        alt={art.artist}
                        className="w-8 h-8 rounded-full border-2 border-white/80"
                      />
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-900/80' : 'bg-gray-100/80'}`}>
                        {art.artist.split(' ')[0]}
                      </span>
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(art.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-900/80' : 'bg-gray-100/80'}`}
                      aria-label="Like artwork"
                    >
                      <FiHeart className={`text-lg ${art.likes > 200 ? 'text-red-500 fill-red-500' : isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                    </motion.button>
                    <AnimatePresence>
                      {hoveredArt === art.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className={`absolute inset-0 p-4 flex flex-col justify-end ${isDarkMode ? 'bg-gradient-to-t from-gray-900/80 to-transparent' : 'bg-gradient-to-t from-gray-200/80 to-transparent'}`}
                        >
                          <span className={`inline-block px-2 py-1 text-xs rounded mb-2 ${isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-indigo-600/90 text-white'}`}>
                            {art.medium}
                          </span>
                          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{art.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{art.artist}</p>
                              <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${art.price.toLocaleString()}</p>
                              <div className="flex items-center gap-1 text-yellow-400">
                                <FiStar className="text-sm" />
                                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{art.rating} ({art.likes})</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => addToCart(art.id)}
                                className={`p-2 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-indigo-600'}`}
                                aria-label="Add to cart"
                              >
                                <FiShoppingBag className="text-white" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-2 rounded-full border ${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-gray-100/80 border-gray-300/50'}`}
                                aria-label="Share"
                              >
                                <FiShare2 className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {hoveredArt !== art.id && (
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{art.title}</h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{art.artist}</p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FiStar className="text-sm" />
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{art.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${art.price.toLocaleString()}</p>
                        <button
                          className={`text-xs px-2 py-1 rounded-full border ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50 text-gray-300' : 'bg-gray-100/50 border-gray-300/50 text-gray-600'}`}
                          onClick={() => toggleLike(art.id)}
                        >
                          {art.likes} likes
                        </button>
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
                  key={art.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}
                >
                  <div className="md:w-1/2">
                    <motion.div
                      whileHover={{ scale: 0.98 }}
                      className="relative rounded-lg overflow-hidden aspect-square"
                    >
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-gray-900/40 to-transparent' : 'bg-gradient-to-t from-gray-200/30 to-transparent'}`} />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <img
                          src={art.artistImage}
                          alt={art.artist}
                          className="w-10 h-10 rounded-full border-2 border-white/80"
                        />
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{art.artist}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{art.year}</p>
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
                          {art.medium}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FiStar className="text-sm" />
                          <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{art.rating} ({art.likes})</span>
                        </div>
                      </div>
                      <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{art.title}</h2>
                      <p className={`text-base mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {art.artist}'s {art.category} piece created in {art.year}. This {art.medium.toLowerCase()} embodies unique artistic vision.
                      </p>
                      <div className="mb-6">
                        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Color Palette</p>
                        <div className="flex flex-wrap gap-3">
                          {art.colors.map((color, i) => (
                            <motion.div
                              key={color}
                              whileHover={{ scale: 1.1, y: -5 }}
                              className="w-8 h-8 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                              title={`Color ${i + 1}: ${color}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
                          <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${art.price.toLocaleString()}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: `0 4px 15px ${isDarkMode ? 'rgba(196, 132, 252, 0.3)' : 'rgba(79, 70, 229, 0.3)'}` }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(art.id)}
                          className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-indigo-600 text-white'}`}
                        >
                          Add to Cart <FiShoppingBag />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
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
          className={`p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-indigo-600'}`}
          aria-label="Shopping cart"
        >
          <div className="relative">
            <FiShoppingBag className="text-lg text-white" />
            {cartItems > 0 && (
              <span className={`absolute -top-2 -right-2 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isDarkMode ? 'bg-white text-purple-600' : 'bg-white text-indigo-600'}`}>
                {cartItems}
              </span>
            )}
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <footer className={`py-8 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm">© 2025 Artverse. All rights reserved.</p>
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