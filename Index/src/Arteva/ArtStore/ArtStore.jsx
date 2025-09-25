// components/ArtStore.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, FiMenu, FiX, FiArrowRight, FiStar, 
  FiGrid, FiSearch, FiMail, FiClock, FiMessageSquare, 
  FiLoader, FiHeart, FiHome, FiImage, FiFeather, FiGift
} from 'react-icons/fi';
import { FaTshirt, FaBrush, FaCameraRetro, FaRegLightbulb, FaPalette } from 'react-icons/fa';
import { MdCurrencyRupee } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { ArtworkService } from './artworkService';
import { CartService } from './cartService';
// import LikeButton from '../EngagementService/likeButton';
import LikeButton from '../../EngagementService/likeButton';
import ImageSlider from './ImageSlider';
// import { proceedToCheckout } from './Commercial/PlaceOrder';
import { proceedToCheckout } from '../Commercial/PlaceOrder';

const ArtStore = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState('trending');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArt, setSelectedArt] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState(CartService.getCartItems());

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Categories configuration
  const categories = [
    { id: 'trending', name: 'Trending', icon: <FiStar /> },
    { id: 'home-decor', name: 'Home Decor', icon: <FiHome /> },
    { id: 'wall-art', name: 'Wall Art', icon: <FiImage /> },
    { id: 'wearable-art', name: 'Wearable Art', icon: <FaTshirt /> },
    { id: 'abstract', name: 'Abstract', icon: <FaBrush /> },
    { id: 'photography', name: 'Photography', icon: <FaCameraRetro /> },
  ];

  // Fetch artwork on component mount
  useEffect(() => {
    const loadArtwork = async () => {
      try {
        setLoading(true);
        const artwork = await ArtworkService.fetchArtwork();
        setArtPieces(artwork);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, []);
  // In the useEffect where you fetch artwork
// useEffect(() => {
//   const loadArtwork = async () => {
//     try {
//       setLoading(true);
//       // Use the enhanced version for better debugging
//       const artwork = await ArtworkService.fetchArtworkEnhanced();
//       setArtPieces(artwork);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadArtwork();
// }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    CartService.saveCartItems(cartItems);
  }, [cartItems]);

  // Cart operations
  const addToCart = (art) => {
    CartService.addToCart(art, cartItems, setCartItems);
  };

  const removeFromCart = (id) => {
    CartService.removeFromCart(id, cartItems, setCartItems);
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    CartService.updateCartItemQuantity(id, newQuantity, cartItems, setCartItems);
  };

  const clearCart = () => {
    CartService.clearCart(setCartItems);
  };

  const { itemCount: cartItemCount, total: cartTotal } = CartService.getCartSummary(cartItems);

  // Artwork details operations
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
      toast.error("Artist email not available");
    }
  };

  // Filter artwork based on category and search
  const filteredArt = activeCategory === 'trending'
    ? [...artPieces].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 20)
    : artPieces.filter(art => 
        art.category === activeCategory &&
        (art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         art.artist?.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  // Loading and error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <FiLoader className="animate-spin text-4xl text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="text-center p-6 max-w-md">
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-Playfair" ref={scrollRef}>
      <ToastContainer />
      
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 z-0 bg-gradient-to-br from-indigo-100 via-blue-100 to-gray-50 dark:from-indigo-900 dark:via-purple-900 dark:to-gray-900"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Navigation Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        cartItemCount={cartItemCount}
        setIsCartOpen={setIsCartOpen}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <HeroSection scaleHero={scaleHero} />

      {/* Main Content */}
      <div className="relative z-10 bg-white dark:bg-gray-950 pt-16 pb-24">
        {/* Category Selector */}
        <CategorySelector 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />

        {/* Art Display */}
        <ArtDisplay 
          viewMode={viewMode}
          filteredArt={filteredArt}
          hoveredArt={hoveredArt}
          setHoveredArt={setHoveredArt}
          addToCart={addToCart}
          openArtDetails={openArtDetails}
        />
      </div>

      {/* Art Details Sidebar */}
      <ArtDetailsSidebar 
        isSidebarOpen={isSidebarOpen}
        selectedArt={selectedArt}
        closeArtDetails={closeArtDetails}
        addToCart={addToCart}
        contactSeller={contactSeller}
      />

      {/* Cart Sidebar */}
      <CartSidebar 
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        updateCartItemQuantity={updateCartItemQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        proceedToCheckout={proceedToCheckout}
        setCartItems={setCartItems}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Sub-components for better organization
const Header = ({ searchQuery, setSearchQuery, viewMode, setViewMode, cartItemCount, setIsCartOpen, isMenuOpen, setIsMenuOpen }) => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="fixed w-full top-0 z-50 bg-white/40 dark:bg-gray-950/40 border-b border-gray-200/30 dark:border-gray-400/80 backdrop-blur-lg"
  >
    <div className="max-w-full mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
      <Logo />
      <DesktopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HeaderActions 
        viewMode={viewMode}
        setViewMode={setViewMode}
        cartItemCount={cartItemCount}
        setIsCartOpen={setIsCartOpen}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </div>
  </motion.header>
);

const Logo = () => (
  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
    <FaPalette className="text-2xl text-indigo-600 dark:text-purple-400" />
    <h1 className="text-xl font-bold font-Eagle text-indigo-600 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-300">
      Artverse
    </h1>
  </motion.div>
);

const DesktopNav = ({ searchQuery, setSearchQuery }) => (
  <div className="hidden md:flex items-center gap-6">
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <NavLinks />
  </div>
);

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="relative">
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
    <input
      type="text"
      placeholder="Search artworks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10 pr-4 py-2 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
    />
  </motion.div>
);

const NavLinks = () => (
  <nav className="flex gap-6">
    {[
      {name:'Gallery', path:'/Gallery'},
      {name:'Artists', path:'/Artists/DiscoverUsers'},
      {name:'Exhibitions', path:'/Arteva/Artstore/Exhibition'},
      {name:'About Handmade', path:'/Company/About/AboutHandmade'}
    ].map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-purple-300 transition-colors"
      >
        {item.name}
      </Link>
    ))}
  </nav>
);

const HeaderActions = ({ viewMode, setViewMode, cartItemCount, setIsCartOpen, isMenuOpen, setIsMenuOpen }) => (
  <div className="flex items-center gap-4">
    <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
    <CartButton cartItemCount={cartItemCount} setIsCartOpen={setIsCartOpen} />
    <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
  </div>
);

const ViewModeToggle = ({ viewMode, setViewMode }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setViewMode(viewMode === 'grid' ? 'immersive' : 'grid')}
    className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-purple-300"
    aria-label="Toggle view mode"
  >
    <motion.div animate={{ rotate: viewMode === 'grid' ? 0 : 360 }} transition={{ duration: 0.4 }}>
      {viewMode === 'grid' ? <FiGrid className="text-lg" /> : <FiFeather className="text-lg" />}
    </motion.div>
  </motion.button>
);

const CartButton = ({ cartItemCount, setIsCartOpen }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setIsCartOpen(true)}
    className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-purple-300"
    aria-label="Shopping cart"
  >
    <FiShoppingBag className="text-lg" />
    {cartItemCount > 0 && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-1 -right-1 text-xs rounded-full h-5 w-5 flex items-center justify-center bg-indigo-600 dark:bg-purple-500 text-white"
      >
        {cartItemCount}
      </motion.span>
    )}
  </motion.button>
);

const MobileMenuButton = ({ isMenuOpen, setIsMenuOpen }) => (
  <button
    className="md:hidden text-xl text-gray-600 dark:text-gray-300"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    aria-label="Toggle menu"
  >
    {isMenuOpen ? <FiX /> : <FiMenu />}
  </button>
);

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, searchQuery, setSearchQuery }) => (
  <AnimatePresence>
    {isMenuOpen && (
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed inset-0 z-40 pt-20 px-4 sm:px-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
      >
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full bg-gray-100/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <nav className="flex flex-col gap-4 text-lg">
          {[
            {name:'Gallery', path:'/Gallery'},
            {name:'Artists', path:'/Artists/DiscoverUsers'},
            {name:'Exhibitions', path:'/Arteva/Artstore/Exhibition'},
            {name:'About Handmade', path:'/Company/About/AboutHandmade'}
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="py-3 border-b border-gray-200/50 dark:border-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-purple-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

const HeroSection = ({ scaleHero }) => (
  <motion.section
    style={{ scale: scaleHero }}
    className="relative h-[80vh] flex items-center justify-center overflow-hidden"
  >
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-50/80 dark:from-gray-950 to-transparent" />
      <motion.img
        // src='https://images.pexels.com/photos/5485173/pexels-photo-5485173.jpeg'
        src="https://images.pexels.com/photos/5728208/pexels-photo-5728208.jpeg"
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
        className="text-4xl sm:text-5xl font-bold mb-4 leading-tight font-Quicksand"
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-indigo-600 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-300">
          The Curated Marketplace of Artistic Heritage
        </span>
      </motion.h2>
      <motion.p
        className="text-lg sm:text-xl mb-6 text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Discover rare artworks from global creators, verified on the blockchain.
      </motion.p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to={"/Arteva/ArtMarketplace"}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 bg-indigo-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-500 text-white"
          >
            Shop Creativity <FiArrowRight />
          </motion.button>
        </Link>
        <Link to={"/Artists/DiscoverUsers"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border rounded-lg font-medium bg-white/40 dark:bg-gray-900/40 border-indigo-600 dark:border-gray-600 text-indigo-600 dark:text-gray-300 backdrop-blur-lg"
          >
            Meet Artists
          </motion.button>
        </Link>
      </div>
    </motion.div>
  </motion.section>
);

const CategorySelector = ({ activeCategory, setActiveCategory, categories }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="sticky top-16 z-20 bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/30 dark:border-gray-800/30 backdrop-blur-md py-4"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-2 lg:shrink-0">
          <span className="text-2xl">🔥</span>
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
            Trending Now
          </h3>
        </div>

        <div className="relative overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 min-w-max lg:w-auto">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setActiveCategory("trending")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm whitespace-nowrap font-medium transition-all ${
                activeCategory === "trending"
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md shadow-indigo-300/30 dark:shadow-purple-700/30"
                  : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700/50"
              }`}
            >
              <FiStar /> Trending
            </motion.button>

            {categories
              .filter((c) => c.id !== "trending")
              .slice(0, 4)
              .map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm whitespace-nowrap font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md shadow-indigo-300/30 dark:shadow-purple-700/30"
                      : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700/50"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </motion.button>
              ))}

            <Link
              to="/Arteva/ArtMarketplace"
              className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-teal-500 to-green-500 text-white hover:opacity-90 whitespace-nowrap"
            >
              See More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ArtDisplay = ({ viewMode, filteredArt, hoveredArt, setHoveredArt, addToCart, openArtDetails }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
    {viewMode === 'grid' ? (
      <GridDisplay 
        filteredArt={filteredArt}
        hoveredArt={hoveredArt}
        setHoveredArt={setHoveredArt}
        addToCart={addToCart}
        openArtDetails={openArtDetails}
      />
    ) : (
      <ImmersiveDisplay 
        filteredArt={filteredArt}
        hoveredArt={hoveredArt}
        setHoveredArt={setHoveredArt}
        addToCart={addToCart}
        openArtDetails={openArtDetails}
      />
    )}
  </div>
);

const GridDisplay = ({ filteredArt, hoveredArt, setHoveredArt, addToCart, openArtDetails }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    {filteredArt.map((art) => (
      <ArtCard 
        key={art.$id}
        art={art}
        hoveredArt={hoveredArt}
        setHoveredArt={setHoveredArt}
        addToCart={addToCart}
        openArtDetails={openArtDetails}
        mode="grid"
      />
    ))}
  </motion.div>
);

const ImmersiveDisplay = ({ filteredArt, hoveredArt, setHoveredArt, addToCart, openArtDetails }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-12"
  >
    {filteredArt.map((art, index) => (
      <ArtCard 
        key={art.$id}
        art={art}
        hoveredArt={hoveredArt}
        setHoveredArt={setHoveredArt}
        addToCart={addToCart}
        openArtDetails={openArtDetails}
        mode="immersive"
        index={index}
      />
    ))}
  </motion.div>
);

const ArtCard = ({ art, hoveredArt, setHoveredArt, addToCart, openArtDetails, mode, index }) => {
  if (mode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700"
        onMouseEnter={() => setHoveredArt(art.$id)}
        onMouseLeave={() => setHoveredArt(null)}
      >
        <div className="relative aspect-square">
          <ImageSlider 
            images={[art.imageUrl, ...art.additionalImages].filter(Boolean)}
            alt={art.title || 'Artwork'}
            className="w-full h-full"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {art.title || 'Untitled Artwork'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {art.artist || 'Unknown Artist'}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {art.description || 'No description available.'}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium flex items-center text-gray-900 dark:text-white">
                <MdCurrencyRupee className="text-sm" />
                {art.price?.toLocaleString() || '0'}
              </p>
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <FiStar />
                <span>{art.rating || '0'}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(art)}
              className="px-3 py-1 rounded-lg bg-indigo-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-500 text-white text-sm flex items-center gap-1"
              aria-label="Add to cart"
            >
              <FiShoppingBag />
              Add
            </motion.button>
          </div>
          {hoveredArt === art.$id && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => openArtDetails(art)}
              className="w-full mt-3 px-3 py-1 rounded-lg border border-indigo-600 dark:border-gray-600 text-indigo-600 dark:text-gray-300 text-sm text-center"
            >
              Details
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // Immersive mode
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col md:flex-row gap-6 items-center bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <div className="w-full md:w-1/2">
        <motion.div
          whileHover={{ scale: 0.98 }}
          className="relative rounded-lg overflow-hidden aspect-square"
          onMouseEnter={() => setHoveredArt(art.$id)}
          onMouseLeave={() => setHoveredArt(null)}
        >
          <ImageSlider 
            images={[art.imageUrl, ...art.additionalImages].filter(Boolean)}
            alt={art.title || 'Artwork'}
            className="w-full h-full"
          />
          <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 z-10">
            <LikeButton targetId={art.$id} targetType="artwork" />
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {art.profileImage ? (
              <img 
                src={art.profileImage} 
                alt="Artist" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <FiHeart className="text-gray-600 dark:text-gray-400" />
              </div>
            )}
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100/80 dark:bg-gray-900/80 text-gray-900 dark:text-white">
              {art.artist || 'Artist'}
            </span>
          </div>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 text-xs rounded bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-gray-300">
              {art.medium || 'Artwork'}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <FiStar className="text-sm" />
              <span className="text-sm text-gray-900 dark:text-white">
                {art.rating || '0'}
              </span>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
            {art.title || 'Untitled Artwork'}
          </h2>
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            {art.description || 'No description available.'}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-lg font-medium flex items-center text-gray-900 dark:text-white">
              <MdCurrencyRupee />
              {art.price?.toLocaleString() || '0'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(art)}
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 bg-indigo-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-500 text-white text-sm"
            >
              Add to Cart <FiShoppingBag />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openArtDetails(art)}
              className="px-4 py-2 rounded-lg font-medium border border-indigo-600 dark:border-gray-600 text-indigo-600 dark:text-gray-300 text-sm"
            >
              Details
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ArtDetailsSidebar = ({ isSidebarOpen, selectedArt, closeArtDetails, addToCart, contactSeller }) => (
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
          className="fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 z-50 overflow-y-auto bg-white dark:bg-gray-900 shadow-xl"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedArt.title || 'Untitled Artwork'}
              </h2>
              <button
                onClick={closeArtDetails}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Image Slider */}
            <div className="mb-6">
              <ImageSlider 
                images={[selectedArt.imageUrl, ...selectedArt.additionalImages].filter(Boolean)}
                alt={selectedArt.title || 'Artwork'}
                className="w-full aspect-square"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {selectedArt.profileImage ? (
                  <img 
                    src={selectedArt.profileImage} 
                    alt="Artist" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <FiHeart className="text-gray-600 dark:text-gray-400 text-xl" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {selectedArt.artist || 'Unknown Artist'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedArt.formattedDate || 'Date not available'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FiStar className="text-lg" />
                  <span className="text-lg text-gray-900 dark:text-white">
                    {selectedArt.rating || '0'}
                  </span>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {selectedArt.medium || 'Artwork'}
                </span>
                <div className="flex items-center gap-1">
                  <LikeButton targetId={selectedArt.$id} targetType="artwork" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedArt.description || 'No description available.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm mb-1 text-gray-500 dark:text-gray-400">Price</h4>
                  <p className="font-bold flex items-center text-gray-900 dark:text-white">
                    <MdCurrencyRupee />{selectedArt.price?.toLocaleString() || '0'}
                  </p>
                </div>
                {selectedArt.dimensions && (
                  <div>
                    <h4 className="text-sm mb-1 text-gray-500 dark:text-gray-400">Dimensions</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedArt.dimensions}
                    </p>
                  </div>
                )}
                {selectedArt.resolution && (
                  <div>
                    <h4 className="text-sm mb-1 text-gray-500 dark:text-gray-400">Resolution</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedArt.resolution}
                    </p>
                  </div>
                )}
                {selectedArt.fileType && (
                  <div>
                    <h4 className="text-sm mb-1 text-gray-500 dark:text-gray-400">File Type</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedArt.fileType}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Reviews
              </h3>
              {selectedArt.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {selectedArt.reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {review.user || 'Anonymous'}
                        </h4>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FiStar className="text-sm" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
                        {review.comment || 'No comment provided'}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FiClock className="text-xs" />
                        <span>{review.date || 'Date not available'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-lg text-center bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
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
                className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-indigo-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-500 text-white"
              >
                Add to Cart <FiShoppingBag />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => contactSeller(selectedArt.artistEmail)}
                className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 border border-indigo-600 dark:border-gray-700 text-indigo-600 dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-800"
              >
                Contact Artist <FiMail />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const CartSidebar = ({ 
  isCartOpen, 
  setIsCartOpen, 
  cartItems, 
  cartItemCount, 
  cartTotal, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart, 
  proceedToCheckout, 
  setCartItems 
}) => (
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
          className="fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 z-50 overflow-y-auto bg-white dark:bg-gray-900 shadow-xl"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Cart ({cartItemCount})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {cartItems.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <CartItem 
                      key={item.$id}
                      item={item}
                      updateCartItemQuantity={updateCartItemQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>

                <CartSummary 
                  cartTotal={cartTotal}
                  proceedToCheckout={proceedToCheckout}
                  setCartItems={setCartItems}
                  clearCart={clearCart}
                />
              </>
            ) : (
              <EmptyCart setIsCartOpen={setIsCartOpen} />
            )}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const CartItem = ({ item, updateCartItemQuantity, removeFromCart }) => (
  <div className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
    <div className="w-20 h-20 flex-shrink-0">
      {item.imageUrl ? (
        <img 
          src={item.imageUrl} 
          alt={item.title || 'Artwork'} 
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
          <FiImage className="text-xl text-gray-400" />
        </div>
      )}
    </div>
    <div className="flex-grow">
      <h3 className="font-medium text-gray-900 dark:text-white">
        {item.title || 'Untitled Artwork'}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {item.artist || 'Unknown Artist'}
      </p>
      <div className="flex justify-between items-center mt-2">
        <QuantityControls 
          item={item}
          updateCartItemQuantity={updateCartItemQuantity}
        />
        <p className="font-bold flex items-center text-gray-900 dark:text-white">
          <MdCurrencyRupee />{(item.price * item.quantity)?.toLocaleString() || '0'}
        </p>
        <button
          onClick={() => removeFromCart(item.$id)}
          className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-600 text-red-600 dark:text-white hover:bg-red-200 dark:hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

const QuantityControls = ({ item, updateCartItemQuantity }) => (
  <div className="flex items-center gap-2">
    <button 
      onClick={() => updateCartItemQuantity(item.$id, item.quantity - 1)}
      className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      -
    </button>
    <span>{item.quantity}</span>
    <button 
      onClick={() => updateCartItemQuantity(item.$id, item.quantity + 1)}
      className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      +
    </button>
  </div>
);

const CartSummary = ({ cartTotal, proceedToCheckout, setCartItems, clearCart }) => (
  <div className="mb-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
      <span className="font-bold flex items-center text-gray-900 dark:text-white">
        <MdCurrencyRupee />{cartTotal.toLocaleString()}
      </span>
    </div>
    <div className="flex justify-between items-center mb-4">
      <span className="text-gray-600 dark:text-gray-300">Shipping</span>
      <span className="font-bold text-gray-900 dark:text-white">
        Free
      </span>
    </div>
    <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
      <span className="font-medium text-gray-900 dark:text-white">Total</span>
      <span className="font-bold flex items-center text-lg text-gray-900 dark:text-white">
        <MdCurrencyRupee />{cartTotal.toLocaleString()}
      </span>
    </div>
    <motion.button
      onClick={() => proceedToCheckout(cartItems, () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        toast.success("Your Order Proceeded Successfully")
      })}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-indigo-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-500 text-white"
    >
      Proceed to Checkout
    </motion.button>
    <button
      onClick={clearCart}
      className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mt-2"
    >
      Clear Cart
    </button>
  </div>
);

const EmptyCart = ({ setIsCartOpen }) => (
  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
    <FiShoppingBag className="mx-auto text-4xl mb-4" />
    <p className="text-lg">Your cart is empty</p>
    <p className="text-sm mt-2">Browse our collection to find amazing artwork</p>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsCartOpen(false)}
      className="mt-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      Continue Shopping
    </motion.button>
  </div>
);

const Footer = () => (
  <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
      <p className="text-sm">© {new Date().getFullYear()} Artverse. All rights reserved.</p>
      <div className="mt-4 flex justify-center gap-4">
        <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contact Us</a>
      </div>
    </div>
  </footer>
);

export default ArtStore;