import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiHeart, FiShoppingCart, FiChevronDown, FiX, FiArrowRight } from 'react-icons/fi';

const Items = [
  { id: 1, title: 'Modern Chair', price: 180, image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg', type: 'craft', height: 'h-64', category: 'furniture', rating: 4.5, featured: true },
  { id: 2, title: 'Minimalistic Plant Pot', price: 18, image: 'https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg', type: 'craft', height: 'h-68', category: 'home decor', rating: 4.2, featured: false },
  { id: 3, title: 'Abstract Canvas Art', price: 220, image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg', type: 'art', height: 'h-72', category: 'wall art', rating: 4.8, featured: true },
  { id: 4, title: 'Night Stand', price: 180, image: 'https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg', type: 'craft', height: 'h-64', category: 'furniture', rating: 4.3, featured: false },
  { id: 5, title: 'Handcrafted Pottery', price: 32, image: 'https://images.pexels.com/photos/894092/pexels-photo-894092.jpeg', type: 'craft', height: 'h-68', category: 'home decor', rating: 4.6, featured: true },
  { id: 6, title: 'Floral Wall Art', price: 150, image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg', type: 'art', height: 'h-72', category: 'wall art', rating: 4.4, featured: false },
  { id: 7, title: 'Modern Rocking Chair', price: 318, image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg', type: 'craft', height: 'h-64', category: 'furniture', rating: 4.9, featured: true },
  { id: 8, title: 'Metallic Chair', price: 318, image: 'https://images.pexels.com/photos/276651/pexels-photo-276651.jpeg', type: 'craft', height: 'h-68', category: 'furniture', rating: 4.1, featured: false },
  { id: 9, title: 'Wooden Sculpture', price: 120, image: 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg', type: 'craft', height: 'h-72', category: 'sculpture', rating: 4.7, featured: true },
  { id: 10, title: 'Watercolor Painting', price: 200, image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg', type: 'art', height: 'h-64', category: 'wall art', rating: 4.5, featured: false },
  { id: 11, title: 'Ceramic Vase', price: 45, image: 'https://images.pexels.com/photos/894092/pexels-photo-894092.jpeg', type: 'craft', height: 'h-68', category: 'home decor', rating: 4.0, featured: true },
  { id: 12, title: 'Landscape Print', price: 180, image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg', type: 'art', height: 'h-72', category: 'wall art', rating: 4.3, featured: false },
  { id: 13, title: 'Handwoven Basket', price: 65, image: 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg', type: 'craft', height: 'h-64', category: 'home decor', rating: 4.6, featured: true },
  { id: 14, title: 'Oil Painting', price: 250, image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg', type: 'art', height: 'h-68', category: 'wall art', rating: 4.8, featured: false },
  { id: 15, title: 'Decorative Tray', price: 90, image: 'https://images.pexels.com/photos/894092/pexels-photo-894092.jpeg', type: 'craft', height: 'h-72', category: 'home decor', rating: 4.2, featured: true },
  { id: 16, title: 'Minimalist Art Print', price: 130, image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg', type: 'art', height: 'h-64', category: 'wall art', rating: 4.4, featured: false },
];

function Visual() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const searchTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Debounced search handler
  const handleSearchChange = (e) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    const value = e.target.value;
    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  // Filter items based on search and active filter
  const filteredItems = Items.filter(item => {
    const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Handle cart preview visibility with delay
  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowCartPreview(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowCartPreview(false);
    }, 300);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1]
      },
    }),
    hover: { 
      scale: 1.02, 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.9 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#f59e0b' },
    tap: { scale: 0.95 },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(itemId => itemId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const filters = [
    { id: 'all', label: 'All Items' },
    { id: 'art', label: 'Art' },
    { id: 'craft', label: 'Craft' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'home decor', label: 'Home Decor' },
    { id: 'wall art', label: 'Wall Art' },
  ];

  return (
    <div className="bg-gray-100 dark:bg-[#040d1200] py-12 px-4 sm:px-6 lg:px-8 font-inter transition-colors duration-300">
      {/* Header Section */}
      <motion.div
        className="w-[95%] mx-auto text-center mb-12"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        data-aos="fade-up"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-rose-400 mb-2 font-Playfair">
          Art & Craft Collection
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-slate-200 max-w-3xl mx-auto font-GreatVibes">
          Discover handcrafted treasures and artistic masterpieces for your space
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <div className="w-[95%] mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition-all duration-200"
              onChange={handleSearchChange}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-auto">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-800 dark:text-slate-200 w-full md:w-48"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{filters.find(f => f.id === activeFilter)?.label || 'Filter'}</span>
              <FiChevronDown className={`ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-slate-700"
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setActiveFilter(filter.id);
                        setShowFilters(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 ${
                        activeFilter === filter.id ? 'bg-amber-100 dark:bg-amber-900/30' : ''
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="w-[95%] mx-auto">
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            <div className="masonry-grid">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className={`relative ${item.height} masonry-item group overflow-hidden rounded-lg`}
                  role="img"
                  aria-label={item.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover="hover"
                  exit="exit"
                  layout
                >
                  {/* Item Image as Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Item Info */}
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm text-amber-400 font-medium">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </div>
                      <motion.button 
                        onClick={() => toggleFavorite(item.id)}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <FiHeart 
                          className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} 
                        />
                      </motion.button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-amber-400 font-bold text-lg">${item.price}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-amber-400 fill-current' : 'text-gray-400'}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-300 ml-1">({item.rating})</span>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add ${item.title} to cart`}
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        Add
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl text-gray-600 dark:text-slate-300 mb-2">No items found</h3>
              <p className="text-gray-500 dark:text-slate-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Indicator */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 group">
          <motion.div
            className="bg-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-amber-600 transition-colors duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Cart with ${cartItems.length} items`}
          >
            <FiShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </motion.div>
          {/* Cart Preview */}
          <AnimatePresence>
            {showCartPreview && (
              <motion.div
                className="absolute bottom-14 right-0 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-slate-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h4 className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">Cart Items</h4>
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 py-1">
                    <div className="w-8 h-8 bg-cover bg-center rounded" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-800 dark:text-slate-200">{item.title}</p>
                      <p className="text-xs text-amber-500">${item.price}</p>
                    </div>
                    <motion.button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-rose-500 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FiX className="w-4 h-4" />
                    </motion.button>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">+{cartItems.length - 3} more items</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* Custom CSS for Masonry Grid */}
      <style jsx>{`
        .masonry-grid {
          column-count: 1;
          column-gap: 1rem;
          width: 100%;
        }
        .masonry-item {
          break-inside: avoid;
          margin: 0 0 1rem 0; /* 1rem gap in y-axis */
          width: 100%;
          display: inline-block;
        }
        .masonry-item:last-child {
          margin-bottom: 0; /* Remove extra space at the bottom of the last item in each column */
        }
        @media (min-width: 640px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 3;
          }
        }
        @media (min-width: 1280px) {
          .masonry-grid {
            column-count: 4;
          }
        }
      `}</style>
      <div className="relative w-full h-64 -mt-32 overflow-hidden">
  {/* Fog Effect */}
  <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-[#040d12] via-transparent to-transparent z-10"></div>
  {/* <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/smoke-1.png')] opacity-20 dark:opacity-10 animate-fog"></div> */}
  
  {/* Explore More Button */}
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-center">
    <motion.button
      className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg font-medium hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center">
        Explore More 
        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </motion.button>
  </div>
</div>
    </div>
  );
}

export default Visual;