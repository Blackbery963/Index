import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import bg from './15441979_5625780.jpg'
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const bg = "https://images.unsplash.com/photo-1542804316-b35a2c2a055c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const ArtMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      title: 'Ceramic Vase Collection',
      artist: 'Maria Rodriguez',
      price: 85,
      category: 'ceramics',
      image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      featured: true,
      description: 'Handcrafted ceramic vases with unique glazing techniques. Each piece is thrown on a pottery wheel and finished with a food-safe glaze. Set of 3 varying sizes.',
      materials: 'Stoneware clay, ceramic glaze',
      dimensions: 'Tallest vase: 12" height',
      shipping: 'Ships within 3-5 business days'
    },
    {
      id: 2,
      title: 'Abstract Landscape Painting',
      artist: 'James Chen',
      price: 320,
      category: 'paintings',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      featured: true,
      description: 'Original acrylic painting on canvas inspired by coastal landscapes. Bold brushstrokes and vibrant colors create dynamic energy.',
      materials: 'Acrylic on stretched canvas',
      dimensions: '24" × 36"',
      shipping: 'Ships within 1-2 business days'
    },
    {
      id: 3,
      title: 'Handwoven Wool Scarf',
      artist: 'Fatima Al-Mansoori',
      price: 65,
      category: 'textiles',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      description: 'Warm wool scarf handwoven using traditional techniques. Soft yet durable, perfect for chilly weather.',
      materials: '100% merino wool',
      dimensions: '72" long × 8" wide',
      shipping: 'Ships within 5-7 business days'
    },
    {
      id: 4,
      title: 'Walnut Serving Board',
      artist: 'Thomas Jensen',
      price: 45,
      category: 'woodwork',
      image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.6,
      description: 'Handcrafted walnut wood serving board with juice groove. Perfect for cheese displays or charcuterie.',
      materials: 'Solid walnut, food-grade mineral oil finish',
      dimensions: '12" × 18" × 1"',
      shipping: 'Ships within 2-3 business days'
    },
    {
      id: 5,
      title: 'Silver Statement Necklace',
      artist: 'Aisha Diallo',
      price: 120,
      category: 'jewelry',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      featured: true,
      description: 'Handcrafted sterling silver necklace with geometric pendant. Each piece is individually cast and polished.',
      materials: '925 sterling silver',
      dimensions: '18" chain with 1.5" pendant',
      shipping: 'Ships within 1-3 business days'
    },
    {
      id: 6,
      title: 'Handmade Leather Journal',
      artist: 'Carlos Mendez',
      price: 55,
      category: 'vintage',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      rating: 4.5,
      description: 'Hand-bound leather journal with 120 pages of premium paper. Perfect for sketching or writing.',
      materials: 'Vegetable-tanned leather, acid-free paper',
      dimensions: '5" × 7" × 0.75"',
      shipping: 'Ships within 3-5 business days'
    },
  ];


  // const categories = [
    // { id: 'all', name: 'All Items' },
  //   { id: 'paintings', name: 'Paintings' },
  //   { id: 'ceramics', name: 'Ceramics' },
  //   { id: 'textiles', name: 'Textiles' },
  //   { id: 'woodwork', name: 'Woodwork' },
  //   { id: 'jewelry', name: 'Jewelry' },
  //   { id: 'papergoods', name: 'Paper Goods' },
  // ];



  const categories = [
  // { id: 'trending', name: 'Trending', },
      { id: 'all', name: 'All Items' },

  
  // 🏠 Decor & Lifestyle
  { id: 'home-decor', name: 'Home Decor',  },
  { id: 'wall-art', name: 'Wall Art', },
  { id: 'prints-posters', name: 'Prints & Posters', },
  
  // 👕 Wearable & Functional
  { id: 'wearable-art', name: 'Wearable Art',  },
  { id: 'functional-art', name: 'Functional Art', },
  { id: 'stationery', name: 'Stationery', },
  
  // 🎨 Artistic Styles
  { id: 'abstract', name: 'Abstract', },
  { id: 'modern', name: 'Modern',  },
  { id: 'minimalism', name: 'Minimalism', },
  { id: 'pop-art', name: 'Pop Art',  },
  { id: 'nature', name: 'Nature',},
  
  // 📸 Mediums & Others
  { id: 'photography', name: 'Photography',  },
  { id: 'handmade', name: 'Handmade',  },
  { id: 'vintage', name: 'Vintage',},
];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'newest', name: 'Newest' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'rating', name: 'Top Rated' },
  ];

  const filteredProducts = products
    .filter(product => 
      (activeCategory === 'all' || product.category === activeCategory) &&
      (searchQuery === '' || 
       product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.artist.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.id - a.id;
    });

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setSidebarOpen(true);
  };

  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900" >
<div
      className="relative w-full bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Navbar */}
<header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-[95%] z-50">
    <div className="rounded-xl px-4 py-3 md:px-6 md:py-3 bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/10 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl md:text-3xl font-bold text-pink-900 font-Eagle tracking-tighter"
      >
        Artverse<span className='text-pink-900'>.</span>
      </Link>

      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 items-center mx-8 max-w-xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search artworks, artists..."
            className="w-full px-5 py-2.5 rounded-full outline-none border border-white/30 bg-white/10 text-white placeholder-white/70 focus:ring-1 focus:ring-teal-300 focus:border-teal-300 transition backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 dark:text-white/80 text-gray-700 hover:text-white transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className=" hidden md:flex space-x-8 dark:text-white/90 text-gray-400 font-medium items-center">
        <Link to="/shop" className="hover:text-teal-300 transition flex items-center group">
          <span className="group-hover:translate-x-1 transition">Shop</span>
        </Link>
        <Link to="/artists" className="hover:text-teal-300 transition flex items-center group">
          <span className="group-hover:translate-x-1 transition">Artists</span>
        </Link>
        <Link to="/about" className="hover:text-teal-300 transition flex items-center group">
          <span className="group-hover:translate-x-1 transition">About</span>
        </Link>
        <Link to="/cart" className="flex items-center hover:text-teal-300 transition group">
          <div className="relative">
            <svg
              className="w-6 h-6 mr-1 group-hover:scale-110 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-teal-400 text-xs text-black font-bold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden flex items-center justify-center dark:text-white/90 text-gray-400 hover:text-white transition"
      >
         <button
          className="md:hidden text-xl text-gray-600 dark:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
      </button>
    </div>

    {/* Mobile Dropdown */}
    {mobileMenuOpen && (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden mt-2 rounded-xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-lg p-4 space-y-3 dark:text-white/90 text-gray-400"
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-full border border-white/30 bg-white/10 placeholder-white/70 focus:ring-1 outline-none focus:ring-teal-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to="/shop" className="block hover:text-teal-300 transition pl-2">Shop</Link>
        <Link to="/artists" className="block hover:text-teal-300 transition pl-2">Artists</Link>
        <Link to="/about" className="block hover:text-teal-300 transition pl-2">About</Link>
        <Link to="/cart" className="block hover:text-teal-300 transition pl-2">Cart (0)</Link>
      </motion.div>
    )}
  </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center min-h-[70vh] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 font-Quicksand">
           Own the Creation You Love,  <span className='text-pink-600'>Crafted by Artists Worldwide</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10">
            Unique pieces from independent artists worldwide. Each item tells a story.
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition">
              Shop Featured
            </button>
            <button className="px-8 py-3 rounded-xl border border-white text-white font-semibold hover:bg-white/20 transition">
              Meet Artists
            </button>
          </div>
        </motion.div>
      </section>
    </div>    


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex overflow-x-auto pb-2 space-x-2 max-w-3xl">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category.id ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-300 focus:border-gray-900 dark:focus:border-gray-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openProductDetails(product)}
            >
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <span className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-2 py-1 text-xs font-medium rounded text-gray-900 dark:text-white">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{product.title}</h3>
                  <span className="font-medium text-gray-900 dark:text-white">${product.price}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {product.artist}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3Subview
                      System: .461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{product.rating}</span>
                </div>
                <button 
                  className="mt-4 w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
              Load More
            </button>
          </div>
        )}
      </main>

      {/* Product Detail Sidebar */}
      {selectedProduct && (
        <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-800 shadow-lg transform z-50 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedProduct.title}</h2>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${selectedProduct.price}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{selectedProduct.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {selectedProduct.artist}</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProduct.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Materials</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProduct.materials}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Dimensions</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProduct.dimensions}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Shipping Info</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProduct.shipping}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  Add to Cart - ${selectedProduct.price}
                </button>
                <button className="w-full py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  Save to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Art Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArtMarketplace;










