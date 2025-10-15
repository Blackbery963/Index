

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import CrImg1 from './CraftsImages/cr1.jpeg'
// import CrImg2 from './CraftsImages/cr2.jpeg'
// import CrImg3 from './CraftsImages/cr3.jpeg'
// import CrImg4 from './CraftsImages/cr4.jpeg'
// import CrImg5 from './CraftsImages/cr5.jpeg'
// import CrImg6 from './CraftsImages/cr6.jpeg'
// import CrImg7 from './CraftsImages/cr7.jpeg'
// import CrImg8 from './CraftsImages/cr8.jpeg'



// const Items = [
//   {
//     id: 1,
//     title: 'Handwoven Basket',
//     price: 45,
//     image: CrImg1,
//     category: 'basketry',
//   },
//   {
//     id: 2,
//     title: 'Ceramic Clay Pot',
//     price: 60,
//     image: CrImg2,
//     category: 'pottery',
//   },
//   {
//     id: 3,
//     title: 'Macramé Wall Hanging',
//     price: 80,
//     image: CrImg3,
//     category: 'wall decor',
//   },
//   {
//     id: 4,
//     title: 'Hand-Carved Wooden items',
//     price: 25,
//     image: CrImg4,
//     category: 'woodwork',
//   },
//   {
//     id: 5,
//     title: 'Natural Dye Textile',
//     price: 95,
//     image: CrImg5,
//     category: 'textile',
//   },
//   {
//     id: 6,
//     title: 'Pressed Floral Frame',
//     price: 30,
//     image: CrImg6,
//     category: 'paper craft',
//   },
//   {
//     id: 7,
//     title: 'Handcrafted Leather Pouch',
//     price: 55,
//     image: CrImg7,
//     category: 'leather craft',
//   },
//   {
//     id: 8,
//     title: 'Beaded Jewelry Set',
//     price: 40,
//     image: CrImg8,
//     category: 'jewelry',
//   },
// ];



// const Visual = () => {
//   const [hoveredItem, setHoveredItem] = useState(null);

//   return (
//     <div className="min-h-screen xl:max-w-7xl max-w-full sm:max-w-[85%] rounded-xl bg-white dark:bg-[#0a0f14] mx-auto transition-colors duration-300">
//       {/* Header Section */}
//       <div className="px-6 py-24 text-center">
//         <h1 className="text-5xl md:text-5xl font-Quicksand font-light text-black dark:text-white tracking-tight mb-4">
//          The Art of Handmade Elegance
//         </h1>
//         <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto">
//           Handpicked pieces for contemporary living
//         </p>
//       </div>

//       {/* Items Grid */}
//       <div className="px-6 pb-24">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {Items.map((item) => (
//             <div
//               key={item.id}
//               className="group cursor-pointer"
//               onMouseEnter={() => setHoveredItem(item.id)}
//               onMouseLeave={() => setHoveredItem(null)}
//             >
//               <div className="relative overflow-hidden aspect-square rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className={`w-full h-full object-cover transition-transform duration-700 ${
//                     hoveredItem === item.id ? 'scale-105' : 'scale-100'
//                   }`}
//                 />

//                 {/* Overlay */}
//                 <div
//                   className={`absolute inset-0 bg-black dark:bg-white transition-opacity duration-300 ${
//                     hoveredItem === item.id ? 'opacity-10 dark:opacity-10' : 'opacity-0'
//                   }`}
//                 />

//                 {/* Content Overlay */}
//                 <div
//                   className={`absolute bottom-0 left-0 right-0 p-6 text-white dark:text-black transform transition-all duration-300 ${
//                     hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
//                   }`}
//                 >
//                   <div className="text-xs uppercase tracking-wider mb-1 opacity-80">
//                     {item.category}
//                   </div>
//                   <h3 className="text-lg font-light mb-2">{item.title}</h3>
//                   <p className="text-sm font-medium">${item.price}</p>
//                 </div>
//               </div>
//               {/* Bottom Info */}   
//               <div
//                 className={`pt-4 transition-opacity duration-300 ${
//                   hoveredItem === item.id ? 'opacity-0' : 'opacity-100'
//                 }`}
//               >
//                 <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
//                   {item.category}
//                 </div>
//                 <h3 className="text-lg font-light text-black dark:text-white mb-1">{item.title}</h3>
//                 <p className="text-black dark:text-white font-medium">${item.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="text-center pb-24">
//         <Link to={"/Arteva/Artstore"}>
//         <button className="group relative overflow-hidden px-8 py-3 border border-black dark:border-white text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300">
//           <span className="relative z-10 text-sm uppercase tracking-wider font-light">
//             Explore Collection
//           </span>
//           <div className="absolute inset-0 bg-black dark:bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
//         </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Visual;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, ShoppingBag, Tag, ChevronLeft, ChevronRight, X, Star, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Visual = ({ viewMode = 'feed', onProductClick, likedProducts, savedProducts, onLike, onSave, formatTimestamp }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());

  // Curated artistic/handmade products with matching images
  const artisticProducts = [
    {
      title: 'Handwoven Macramé Wall Hanging',
      category: 'Wall Decor',
      artist: 'Fiber Arts Studio',
      description: 'Beautifully handcrafted macramé wall hanging made from natural cotton rope. Perfect for bohemian or modern spaces.',
      tags: ['macrame', 'handmade', 'boho', 'wall-art'],
      price: 89,
      image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&h=500&fit=crop'
    },
    {
      title: 'Ceramic Pottery Vase Set',
      category: 'Home Decor',
      artist: 'Clay & Fire Studio',
      description: 'Hand-thrown ceramic vases with unique glaze patterns. Each piece is one-of-a-kind and food-safe.',
      tags: ['ceramic', 'pottery', 'vase', 'handmade'],
      price: 65,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop'
    },
    {
      title: 'Handcrafted Wooden Bowl',
      category: 'Kitchenware',
      artist: 'Wood Artisans Co.',
      description: 'Carved from solid walnut wood with food-safe finish. Perfect for serving or decorative display.',
      tags: ['wood', 'handcarved', 'bowl', 'kitchen'],
      price: 55,
      image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500&h=500&fit=crop'
    },
    {
      title: 'Natural Fiber Woven Basket',
      category: 'Storage',
      artist: 'Weave Masters',
      description: 'Handwoven basket made from sustainable seagrass. Ideal for storage or plant holders.',
      tags: ['basket', 'woven', 'natural', 'storage'],
      price: 42,
      image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&h=500&fit=crop'
    },
    {
      title: 'Hand-Painted Canvas Art',
      category: 'Wall Art',
      artist: 'Modern Canvas Studio',
      description: 'Original abstract painting on canvas. Vibrant colors perfect for contemporary interiors.',
      tags: ['painting', 'canvas', 'abstract', 'art'],
      price: 120,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=500&fit=crop'
    },
    {
      title: 'Artisan Scented Candles',
      category: 'Home Fragrance',
      artist: 'Scent Crafters',
      description: 'Hand-poured soy candles with essential oils. Natural, eco-friendly, and long-burning.',
      tags: ['candle', 'soy', 'natural', 'handmade'],
      price: 28,
      image: 'https://images.unsplash.com/photo-1602874801006-e24b9d1b263c?w=500&h=500&fit=crop'
    },
    {
      title: 'Handmade Leather Journal',
      category: 'Stationery',
      artist: 'Leather Craft Co.',
      description: 'Premium leather-bound journal with handmade paper. Perfect for writing or sketching.',
      tags: ['leather', 'journal', 'notebook', 'handmade'],
      price: 48,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop'
    },
    {
      title: 'Woven Textile Wall Tapestry',
      category: 'Textile Art',
      artist: 'Textile Studio',
      description: 'Handwoven tapestry using natural dyes. Unique patterns inspired by traditional crafts.',
      tags: ['textile', 'tapestry', 'woven', 'wall-art'],
      price: 95,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'
    },
    {
      title: 'Handcrafted Wooden Cutting Board',
      category: 'Kitchenware',
      artist: 'Wood & Grain',
      description: 'Premium hardwood cutting board with juice groove. Food-safe and durable.',
      tags: ['wood', 'kitchen', 'cutting-board', 'handmade'],
      price: 58,
      image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=500&h=500&fit=crop'
    },
    {
      title: 'Pressed Botanical Art Frame',
      category: 'Wall Art',
      artist: 'Botanical Arts',
      description: 'Real pressed flowers preserved in glass frame. Each piece showcases nature\'s beauty.',
      tags: ['botanical', 'pressed-flowers', 'frame', 'art'],
      price: 38,
      image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=500&h=500&fit=crop'
    },
    {
      title: 'Hand-Knitted Throw Blanket',
      category: 'Textiles',
      artist: 'Knit & Cozy',
      description: 'Chunky knit blanket made from soft merino wool. Perfect for cozy evenings.',
      tags: ['knit', 'blanket', 'wool', 'cozy'],
      price: 110,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop'
    },
    {
      title: 'Ceramic Tea Set',
      category: 'Tableware',
      artist: 'Pottery House',
      description: 'Handmade ceramic tea set with teapot and four cups. Elegant and functional.',
      tags: ['ceramic', 'tea', 'pottery', 'handmade'],
      price: 72,
      image: 'https://images.unsplash.com/photo-1578320339911-e3a13c872c4e?w=500&h=500&fit=crop'
    }
  ];

  // Fallback images for when primary images fail
  const fallbackImages = [
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1576682812057-2a4b4f8f1a1f?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=500&fit=crop'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Create products with proper IDs and metadata
        const mappedProducts = artisticProducts.map((item, index) => ({
          id: 1000 + index,
          title: item.title,
          price: item.price,
          image: item.image,
          fallbackImage: fallbackImages[index % fallbackImages.length],
          category: item.category,
          artist: item.artist,
          description: item.description,
          tags: item.tags,
          likes: Math.floor(Math.random() * 200) + 50,
          views: Math.floor(Math.random() * 1000) + 200,
          rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
          reviews: Math.floor(Math.random() * 50) + 10,
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          trending: Math.floor(Math.random() * 40) + 10,
          comments: Math.floor(Math.random() * 30) + 5,
          shares: Math.floor(Math.random() * 60) + 10,
          inStock: Math.random() > 0.15, // 85% in stock
          stockCount: Math.floor(Math.random() * 20) + 5
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedIndex(null);
        if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev - 1 + products.length) % products.length);
        if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev + 1) % products.length);
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedIndex, products.length]);

  const isLiked = (productId) => likedProducts?.has(productId);
  const isSaved = (productId) => savedProducts?.has(productId);

  const handleLike = (e, productId) => {
    e.stopPropagation();
    onLike?.(productId);
  };

  const handleSave = (e, productId) => {
    e.stopPropagation();
    onSave?.(productId);
  };

  const handleProductClick = (index) => {
    setSelectedIndex(index);
    onProductClick?.(products[index]);
  };

  const handleImageError = (productId, e) => {
    const product = products.find(p => p.id === productId);
    if (product && !imageErrors.has(productId)) {
      console.log('Image failed, using fallback for:', product.title);
      e.target.src = product.fallbackImage;
      setImageErrors(prev => new Set(prev).add(productId));
    }
  };

  const handleBuyClick = (e, product) => {
    e.stopPropagation();
    console.log('Buy product:', product);
    alert(`Added "${product.title}" to cart!`);
  };

  const getContainerClass = () => {
    if (viewMode === 'grid') return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';
    if (viewMode === 'collage') return 'columns-2 sm:columns-3 gap-4 space-y-4';
    return 'grid grid-cols-1 gap-4 max-w-4xl mx-auto';
  };

  const getProductLayout = (product, index) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-white dark:bg-gray-900 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={() => handleProductClick(index)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => handleImageError(product.id, e)}
          />
          
          {/* Price Badge */}
          <div className="absolute top-3 left-3 bg-green-500 text-white text-sm px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
            <Tag className="w-3 h-3" />
            ${product.price}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
              Sold Out
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={(e) => handleSave(e, product.id)}
                className={`p-2 rounded-lg backdrop-blur-lg transition-all ${
                  isSaved(product.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved(product.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => handleBuyClick(e, product)}
                disabled={!product.inStock}
                className="p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-green-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            by {product.artist}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviews})
            </span>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => handleLike(e, product.id)}
              className={`flex items-center gap-1 text-xs transition-all ${
                isLiked(product.id) ? 'text-red-500 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-3 h-3 ${isLiked(product.id) ? 'fill-current' : ''}`} />
              {product.likes}
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {product.views}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  const selectedProduct = selectedIndex !== null ? products[selectedIndex] : null;

  return (
    <section className="py-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Handcrafted Products
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unique artisan goods from talented creators
          </p>
        </div>
        <Link
          to="/shop"
          className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
        >
          View all products →
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">Loading handmade items...</p>
          </div>
        </div>
      ) : (
        <div className={getContainerClass()}>
          {products.map((product, index) => (
            <div key={product.id}>
              {getProductLayout(product, index)}
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev - 1 + products.length) % products.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev + 1) % products.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Section */}
              <div className="md:w-3/5 h-64 md:h-auto bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => handleImageError(selectedProduct.id, e)}
                />
              </div>

              {/* Details Section */}
              <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
                      {selectedProduct.title}
                    </h2>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    by {selectedProduct.artist}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-green-500" />
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${selectedProduct.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {selectedProduct.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProduct.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stock Status */}
                  {selectedProduct.inStock ? (
                    <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                      ✓ In Stock ({selectedProduct.stockCount} available)
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                      ✕ Out of Stock
                    </p>
                  )}

                  {/* Engagement Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Likes</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedProduct.likes}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedProduct.views}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Comments</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedProduct.comments}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => handleLike(e, selectedProduct.id)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      isLiked(selectedProduct.id)
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked(selectedProduct.id) ? 'fill-current' : ''}`} />
                    Like
                  </button>
                  
                  <button
                    onClick={(e) => handleSave(e, selectedProduct.id)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      isSaved(selectedProduct.id)
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved(selectedProduct.id) ? 'fill-current' : ''}`} />
                    Save
                  </button>
                  
                  <button
                    onClick={(e) => handleBuyClick(e, selectedProduct)}
                    disabled={!selectedProduct.inStock}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Visual;