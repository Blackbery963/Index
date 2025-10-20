
// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Heart, Bookmark, ShoppingBag, Tag, ChevronLeft, ChevronRight, X, Star, Eye } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const Visual = ({ viewMode = 'feed', onProductClick, likedProducts, savedProducts, onLike, onSave, formatTimestamp }) => {
// //   const [selectedIndex, setSelectedIndex] = useState(null);
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [imageErrors, setImageErrors] = useState(new Set());

// //   // Curated artistic/handmade products with matching images
// //   const artisticProducts = [
// //     {
// //       title: 'Handwoven Macramé Wall Hanging',
// //       category: 'Wall Decor',
// //       artist: 'Fiber Arts Studio',
// //       description: 'Beautifully handcrafted macramé wall hanging made from natural cotton rope. Perfect for bohemian or modern spaces.',
// //       tags: ['macrame', 'handmade', 'boho', 'wall-art'],
// //       price: 89,
// //       image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Ceramic Pottery Vase Set',
// //       category: 'Home Decor',
// //       artist: 'Clay & Fire Studio',
// //       description: 'Hand-thrown ceramic vases with unique glaze patterns. Each piece is one-of-a-kind and food-safe.',
// //       tags: ['ceramic', 'pottery', 'vase', 'handmade'],
// //       price: 65,
// //       image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Handcrafted Wooden Bowl',
// //       category: 'Kitchenware',
// //       artist: 'Wood Artisans Co.',
// //       description: 'Carved from solid walnut wood with food-safe finish. Perfect for serving or decorative display.',
// //       tags: ['wood', 'handcarved', 'bowl', 'kitchen'],
// //       price: 55,
// //       image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Natural Fiber Woven Basket',
// //       category: 'Storage',
// //       artist: 'Weave Masters',
// //       description: 'Handwoven basket made from sustainable seagrass. Ideal for storage or plant holders.',
// //       tags: ['basket', 'woven', 'natural', 'storage'],
// //       price: 42,
// //       image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Hand-Painted Canvas Art',
// //       category: 'Wall Art',
// //       artist: 'Modern Canvas Studio',
// //       description: 'Original abstract painting on canvas. Vibrant colors perfect for contemporary interiors.',
// //       tags: ['painting', 'canvas', 'abstract', 'art'],
// //       price: 120,
// //       image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Artisan Scented Candles',
// //       category: 'Home Fragrance',
// //       artist: 'Scent Crafters',
// //       description: 'Hand-poured soy candles with essential oils. Natural, eco-friendly, and long-burning.',
// //       tags: ['candle', 'soy', 'natural', 'handmade'],
// //       price: 28,
// //       image: 'https://images.unsplash.com/photo-1602874801006-e24b9d1b263c?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Handmade Leather Journal',
// //       category: 'Stationery',
// //       artist: 'Leather Craft Co.',
// //       description: 'Premium leather-bound journal with handmade paper. Perfect for writing or sketching.',
// //       tags: ['leather', 'journal', 'notebook', 'handmade'],
// //       price: 48,
// //       image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Woven Textile Wall Tapestry',
// //       category: 'Textile Art',
// //       artist: 'Textile Studio',
// //       description: 'Handwoven tapestry using natural dyes. Unique patterns inspired by traditional crafts.',
// //       tags: ['textile', 'tapestry', 'woven', 'wall-art'],
// //       price: 95,
// //       image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Handcrafted Wooden Cutting Board',
// //       category: 'Kitchenware',
// //       artist: 'Wood & Grain',
// //       description: 'Premium hardwood cutting board with juice groove. Food-safe and durable.',
// //       tags: ['wood', 'kitchen', 'cutting-board', 'handmade'],
// //       price: 58,
// //       image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Pressed Botanical Art Frame',
// //       category: 'Wall Art',
// //       artist: 'Botanical Arts',
// //       description: 'Real pressed flowers preserved in glass frame. Each piece showcases nature\'s beauty.',
// //       tags: ['botanical', 'pressed-flowers', 'frame', 'art'],
// //       price: 38,
// //       image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Hand-Knitted Throw Blanket',
// //       category: 'Textiles',
// //       artist: 'Knit & Cozy',
// //       description: 'Chunky knit blanket made from soft merino wool. Perfect for cozy evenings.',
// //       tags: ['knit', 'blanket', 'wool', 'cozy'],
// //       price: 110,
// //       image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop'
// //     },
// //     {
// //       title: 'Ceramic Tea Set',
// //       category: 'Tableware',
// //       artist: 'Pottery House',
// //       description: 'Handmade ceramic tea set with teapot and four cups. Elegant and functional.',
// //       tags: ['ceramic', 'tea', 'pottery', 'handmade'],
// //       price: 72,
// //       image: 'https://images.unsplash.com/photo-1578320339911-e3a13c872c4e?w=500&h=500&fit=crop'
// //     }
// //   ];

// //   // Fallback images for when primary images fail
// //   const fallbackImages = [
// //     'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=500&fit=crop',
// //     'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=500&fit=crop',
// //     'https://images.unsplash.com/photo-1576682812057-2a4b4f8f1a1f?w=500&h=500&fit=crop',
// //     'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=500&fit=crop'
// //   ];

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         setLoading(true);
        
// //         // Create products with proper IDs and metadata
// //         const mappedProducts = artisticProducts.map((item, index) => ({
// //           id: 1000 + index,
// //           title: item.title,
// //           price: item.price,
// //           image: item.image,
// //           fallbackImage: fallbackImages[index % fallbackImages.length],
// //           category: item.category,
// //           artist: item.artist,
// //           description: item.description,
// //           tags: item.tags,
// //           likes: Math.floor(Math.random() * 200) + 50,
// //           views: Math.floor(Math.random() * 1000) + 200,
// //           rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
// //           reviews: Math.floor(Math.random() * 50) + 10,
// //           timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
// //           trending: Math.floor(Math.random() * 40) + 10,
// //           comments: Math.floor(Math.random() * 30) + 5,
// //           shares: Math.floor(Math.random() * 60) + 10,
// //           inStock: Math.random() > 0.15, // 85% in stock
// //           stockCount: Math.floor(Math.random() * 20) + 5
// //         }));

// //         setProducts(mappedProducts);
// //       } catch (error) {
// //         console.error('Failed to load products:', error);
// //         setProducts([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   // Handle keyboard navigation
// //   useEffect(() => {
// //     if (selectedIndex !== null) {
// //       document.body.style.overflow = 'hidden';
      
// //       const handleKeyDown = (e) => {
// //         if (e.key === 'Escape') setSelectedIndex(null);
// //         if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev - 1 + products.length) % products.length);
// //         if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev + 1) % products.length);
// //       };
      
// //       window.addEventListener('keydown', handleKeyDown);
// //       return () => {
// //         window.removeEventListener('keydown', handleKeyDown);
// //         document.body.style.overflow = 'auto';
// //       };
// //     } else {
// //       document.body.style.overflow = 'auto';
// //     }
// //   }, [selectedIndex, products.length]);

// //   const isLiked = (productId) => likedProducts?.has(productId);
// //   const isSaved = (productId) => savedProducts?.has(productId);

// //   const handleLike = (e, productId) => {
// //     e.stopPropagation();
// //     onLike?.(productId);
// //   };

// //   const handleSave = (e, productId) => {
// //     e.stopPropagation();
// //     onSave?.(productId);
// //   };

// //   const handleProductClick = (index) => {
// //     setSelectedIndex(index);
// //     onProductClick?.(products[index]);
// //   };

// //   const handleImageError = (productId, e) => {
// //     const product = products.find(p => p.id === productId);
// //     if (product && !imageErrors.has(productId)) {
// //       console.log('Image failed, using fallback for:', product.title);
// //       e.target.src = product.fallbackImage;
// //       setImageErrors(prev => new Set(prev).add(productId));
// //     }
// //   };

// //   const handleBuyClick = (e, product) => {
// //     e.stopPropagation();
// //     console.log('Buy product:', product);
// //     alert(`Added "${product.title}" to cart!`);
// //   };

// //   const getContainerClass = () => {
// //     if (viewMode === 'grid') return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';
// //     if (viewMode === 'collage') return 'columns-2 sm:columns-3 gap-4 space-y-4';
// //     return 'grid grid-cols-1 gap-4 max-w-4xl mx-auto';
// //   };

// //   const getProductLayout = (product, index) => {
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.3, delay: index * 0.05 }}
// //         className="bg-white dark:bg-gray-900 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
// //         onClick={() => handleProductClick(index)}
// //       >
// //         {/* Image Container */}
// //         <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
// //           <img
// //             src={product.image}
// //             alt={product.title}
// //             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //             loading="lazy"
// //             onError={(e) => handleImageError(product.id, e)}
// //           />
          
// //           {/* Price Badge */}
// //           <div className="absolute top-3 left-3 bg-green-500 text-white text-sm px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
// //             <Tag className="w-3 h-3" />
// //             ${product.price}
// //           </div>

// //           {/* Stock Status */}
// //           {!product.inStock && (
// //             <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
// //               Sold Out
// //             </div>
// //           )}

// //           {/* Quick Actions Overlay */}
// //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={(e) => handleSave(e, product.id)}
// //                 className={`p-2 rounded-lg backdrop-blur-lg transition-all ${
// //                   isSaved(product.id)
// //                     ? 'bg-blue-500 text-white'
// //                     : 'bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white'
// //                 }`}
// //               >
// //                 <Bookmark className={`w-4 h-4 ${isSaved(product.id) ? 'fill-current' : ''}`} />
// //               </button>
// //               <button
// //                 onClick={(e) => handleBuyClick(e, product)}
// //                 disabled={!product.inStock}
// //                 className="p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-green-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 <ShoppingBag className="w-4 h-4" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Product Info */}
// //         <div className="p-4">
// //           <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
// //             {product.title}
// //           </h3>
// //           <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
// //             by {product.artist}
// //           </p>

// //           {/* Rating */}
// //           <div className="flex items-center gap-1 mb-2">
// //             <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
// //             <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
// //               {product.rating}
// //             </span>
// //             <span className="text-xs text-gray-500 dark:text-gray-400">
// //               ({product.reviews})
// //             </span>
// //           </div>

// //           {/* Engagement Stats */}
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={(e) => handleLike(e, product.id)}
// //               className={`flex items-center gap-1 text-xs transition-all ${
// //                 isLiked(product.id) ? 'text-red-500 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
// //               }`}
// //             >
// //               <Heart className={`w-3 h-3 ${isLiked(product.id) ? 'fill-current' : ''}`} />
// //               {product.likes}
// //             </button>
// //             <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
// //               <Eye className="w-3 h-3" />
// //               {product.views}
// //             </span>
// //           </div>
// //         </div>
// //       </motion.div>
// //     );
// //   };

// //   const selectedProduct = selectedIndex !== null ? products[selectedIndex] : null;

// //   return (
// //     <section className="py-6 w-full">
// //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-2">
// //         <div>
// //           <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
// //             Handcrafted Products
// //           </h2>
// //           <p className="text-sm text-gray-600 dark:text-gray-400">
// //             Unique artisan goods from talented creators
// //           </p>
// //         </div>
// //         <Link
// //           to="/shop"
// //           className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
// //         >
// //           View all products →
// //         </Link>
// //       </div>

// //       {loading ? (
// //         <div className="flex items-center justify-center py-20">
// //           <div className="flex flex-col items-center gap-4">
// //             <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
// //             <p className="text-gray-600 dark:text-gray-400">Loading handmade items...</p>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className={getContainerClass()}>
// //           {products.map((product, index) => (
// //             <div key={product.id}>
// //               {getProductLayout(product, index)}
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Enhanced Lightbox */}
// //       <AnimatePresence>
// //         {selectedProduct && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
// //             onClick={() => setSelectedIndex(null)}
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               onClick={(e) => e.stopPropagation()}
// //               className="relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
// //             >
// //               {/* Close Button */}
// //               <button
// //                 onClick={() => setSelectedIndex(null)}
// //                 className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 transition-all shadow-lg"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>

// //               {/* Navigation Buttons */}
// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setSelectedIndex((prev) => (prev - 1 + products.length) % products.length);
// //                 }}
// //                 className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 transition-all shadow-lg"
// //               >
// //                 <ChevronLeft className="w-6 h-6" />
// //               </button>
// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setSelectedIndex((prev) => (prev + 1) % products.length);
// //                 }}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 transition-all shadow-lg"
// //               >
// //                 <ChevronRight className="w-6 h-6" />
// //               </button>

// //               {/* Image Section */}
// //               <div className="md:w-3/5 h-64 md:h-auto bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
// //                 <img
// //                   src={selectedProduct.image}
// //                   alt={selectedProduct.title}
// //                   className="max-w-full max-h-full object-contain"
// //                   onError={(e) => handleImageError(selectedProduct.id, e)}
// //                 />
// //               </div>

// //               {/* Details Section */}
// //               <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
// //                 <div>
// //                   <div className="flex items-start justify-between mb-2">
// //                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
// //                       {selectedProduct.title}
// //                     </h2>
// //                   </div>
                  
// //                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
// //                     by {selectedProduct.artist}
// //                   </p>

// //                   {/* Rating */}
// //                   <div className="flex items-center gap-2 mb-4">
// //                     <div className="flex items-center gap-1">
// //                       {[...Array(5)].map((_, i) => (
// //                         <Star
// //                           key={i}
// //                           className={`w-4 h-4 ${
// //                             i < Math.floor(selectedProduct.rating)
// //                               ? 'fill-yellow-400 text-yellow-400'
// //                               : 'text-gray-300'
// //                           }`}
// //                         />
// //                       ))}
// //                     </div>
// //                     <span className="text-sm text-gray-600 dark:text-gray-400">
// //                       {selectedProduct.rating} ({selectedProduct.reviews} reviews)
// //                     </span>
// //                   </div>

// //                   {/* Price */}
// //                   <div className="flex items-center gap-2 mb-4">
// //                     <Tag className="w-5 h-5 text-green-500" />
// //                     <span className="text-3xl font-bold text-gray-900 dark:text-white">
// //                       ${selectedProduct.price}
// //                     </span>
// //                   </div>

// //                   {/* Description */}
// //                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
// //                     {selectedProduct.description}
// //                   </p>

// //                   {/* Tags */}
// //                   <div className="flex flex-wrap gap-2 mb-4">
// //                     {selectedProduct.tags.map((tag) => (
// //                       <span
// //                         key={tag}
// //                         className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium"
// //                       >
// //                         #{tag}
// //                       </span>
// //                     ))}
// //                   </div>

// //                   {/* Stock Status */}
// //                   {selectedProduct.inStock ? (
// //                     <p className="text-sm text-green-600 dark:text-green-400 mb-4">
// //                       ✓ In Stock ({selectedProduct.stockCount} available)
// //                     </p>
// //                   ) : (
// //                     <p className="text-sm text-red-600 dark:text-red-400 mb-4">
// //                       ✕ Out of Stock
// //                     </p>
// //                   )}

// //                   {/* Engagement Stats */}
// //                   <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
// //                     <div className="text-center">
// //                       <p className="text-xs text-gray-600 dark:text-gray-400">Likes</p>
// //                       <p className="text-lg font-semibold text-gray-900 dark:text-white">
// //                         {selectedProduct.likes}
// //                       </p>
// //                     </div>
// //                     <div className="text-center">
// //                       <p className="text-xs text-gray-600 dark:text-gray-400">Views</p>
// //                       <p className="text-lg font-semibold text-gray-900 dark:text-white">
// //                         {selectedProduct.views}
// //                       </p>
// //                     </div>
// //                     <div className="text-center">
// //                       <p className="text-xs text-gray-600 dark:text-gray-400">Comments</p>
// //                       <p className="text-lg font-semibold text-gray-900 dark:text-white">
// //                         {selectedProduct.comments}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-2 mt-4">
// //                   <button
// //                     onClick={(e) => handleLike(e, selectedProduct.id)}
// //                     className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
// //                       isLiked(selectedProduct.id)
// //                         ? 'bg-red-500 text-white shadow-lg'
// //                         : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white'
// //                     }`}
// //                   >
// //                     <Heart className={`w-4 h-4 ${isLiked(selectedProduct.id) ? 'fill-current' : ''}`} />
// //                     Like
// //                   </button>
                  
// //                   <button
// //                     onClick={(e) => handleSave(e, selectedProduct.id)}
// //                     className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
// //                       isSaved(selectedProduct.id)
// //                         ? 'bg-blue-500 text-white shadow-lg'
// //                         : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white'
// //                     }`}
// //                   >
// //                     <Bookmark className={`w-4 h-4 ${isSaved(selectedProduct.id) ? 'fill-current' : ''}`} />
// //                     Save
// //                   </button>
                  
// //                   <button
// //                     onClick={(e) => handleBuyClick(e, selectedProduct)}
// //                     disabled={!selectedProduct.inStock}
// //                     className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
// //                   >
// //                     <ShoppingBag className="w-4 h-4" />
// //                     {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </section>
// //   );
// // };

// // export default Visual;

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, Bookmark, ShoppingBag, Tag, Star, Eye, TrendingUp, RefreshCw } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Visual = ({ viewMode = 'feed', onProductClick, likedProducts, savedProducts, onLike, onSave, formatTimestamp }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [imageErrors, setImageErrors] = useState(new Set());
//   const [refreshKey, setRefreshKey] = useState(0);

//   // Expanded product categories with more variations for better diversity
//   const categories = {
//     'Wall Decor': ['Handwoven Macramé Wall Hanging', 'Boho Dream Catcher', 'Modern Wall Tapestry', 'Geometric Wall Art', 'Vintage Mirror Frame', 'Abstract Metal Sculpture', 'Floral Wall Panel', 'LED Light Wall Art'],
//     'Home Decor': ['Ceramic Pottery Vase Set', 'Minimalist Plant Pot', 'Decorative Bowl Collection', 'Artisan Centerpiece', 'Marble Coaster Set', 'Crystal Ornament', 'Wooden Figurine', 'Glass Terrarium'],
//     'Kitchenware': ['Handcrafted Wooden Bowl', 'Ceramic Serving Platter', 'Handmade Cutting Board', 'Rustic Kitchen Tools', 'Bamboo Utensil Set', 'Porcelain Spice Jars', 'Enamel Mug Collection', 'Stoneware Bakeware'],
//     'Storage': ['Natural Fiber Woven Basket', 'Rattan Storage Box', 'Handwoven Organizer', 'Jute Storage Bin', 'Leather Storage Tray', 'Fabric Bin Set', 'Metal Wire Basket', 'Acrylic Organizer'],
//     'Wall Art': ['Hand-Painted Canvas Art', 'Abstract Watercolor Print', 'Modern Line Drawing', 'Pressed Botanical Frame', 'Digital Art Print', 'Oil Painting Reproduction', 'Collage Art Piece', 'Neon Sign Art'],
//     'Home Fragrance': ['Artisan Scented Candles', 'Essential Oil Diffuser', 'Hand-Poured Wax Melts', 'Natural Room Spray', 'Incense Holder Set', 'Aromatherapy Kit', 'Reed Diffuser', 'Sachets Bundle'],
//     'Stationery': ['Handmade Leather Journal', 'Vintage Notebook Set', 'Art Paper Collection', 'Calligraphy Kit', 'Planner Organizer', 'Greeting Card Set', 'Bookmark Collection', 'Pen Holder'],
//     'Textile Art': ['Woven Textile Wall Tapestry', 'Hand-Dyed Fabric Art', 'Quilted Wall Hanging', 'Embroidered Art Piece', 'Macramé Plant Hanger', 'Tie-Dye Wall Decor', 'Patchwork Quilt', 'Silk Scarf Art'],
//     'Tableware': ['Ceramic Tea Set', 'Handmade Dinnerware', 'Artisan Coffee Mugs', 'Pottery Bowl Set', 'Glassware Collection', 'Silverware Set', 'Napkin Ring Holders', 'Placemat Set'],
//     'Textiles': ['Hand-Knitted Throw Blanket', 'Woven Table Runner', 'Crocheted Cushion Cover', 'Linen Throw Pillows', 'Velvet Curtain Panel', 'Wool Rug', 'Cotton Bedspread', 'Silk Duvet Cover'],
//     'Jewelry': ['Handmade Beaded Necklace', 'Silver Earrings', 'Gemstone Bracelet', 'Artisan Ring', 'Pearl Pendant', 'Leather Cuff', 'Wire Wrapped Jewelry', 'Enamel Pins'],
//     'Accessories': ['Leather Wallet', 'Handbag Collection', 'Scarf Set', 'Hat Design', 'Belt Buckle', 'Keychain Set', 'Phone Case Art', 'Watch Band'],
//     'Lighting': ['Table Lamp Design', 'Floor Lamp', 'String Lights', 'Lantern Set', 'Candle Holder', 'Neon Lamp', 'LED Strip Art', 'Solar Light Decor'],
//     'Garden': ['Planter Box', 'Garden Tools Set', 'Bird Feeder', 'Wind Chime', 'Outdoor Sculpture', 'Fairy Garden Kit', 'Herb Pot Set', 'Terracotta Vase']
//   };

//   const artists = [
//     'Fiber Arts Studio', 'Clay & Fire Studio', 'Wood Artisans Co.', 'Weave Masters',
//     'Modern Canvas Studio', 'Scent Crafters', 'Leather Craft Co.', 'Textile Studio',
//     'Wood & Grain', 'Botanical Arts', 'Knit & Cozy', 'Pottery House',
//     'Artisan Collective', 'Handmade Haven', 'Craft & Soul', 'Creative Hands',
//     'Earth Tones Workshop', 'Urban Crafters', 'Rustic Designs', 'Elegant Artistry',
//     'Nature Inspired Co.', 'Vintage Vibes Studio', 'Modern Minimalists', 'Bohemian Creators',
//     'Luxury Handcrafts', 'Eco Artisans', 'Timeless Treasures', 'Innovative Makers'
//   ];

//   const descriptions = [
//     'Beautifully handcrafted with attention to detail. Perfect for modern or traditional spaces.',
//     'Unique piece made from natural materials. Each item is one-of-a-kind.',
//     'Sustainably sourced and ethically made. Brings warmth to any room.',
//     'Premium quality craftsmanship meets timeless design. Built to last.',
//     'Artisan-made with traditional techniques. A true work of art.',
//     'Eco-friendly and sustainable. Perfect gift for conscious consumers.',
//     'Hand-finished with care. Adds character to your space.',
//     'Limited edition handmade piece. Collector\'s quality craftsmanship.',
//     'Inspired by nature with organic elements. Enhances any decor style.',
//     'Contemporary design with a vintage touch. Versatile and stylish.',
//     'Bold colors and patterns for a statement piece. Eye-catching and unique.',
//     'Minimalist elegance for modern homes. Simple yet sophisticated.',
//     'Cultural heritage infused craftsmanship. Tells a story through art.',
//     'Functional art that serves a purpose. Practical and beautiful.',
//     'Seasonal inspired creation. Perfect for holidays or special occasions.',
//     'Customizable elements for personal touch. Make it your own.'
//   ];

//   const tags = [
//     ['handmade', 'artisan', 'unique', 'crafted'],
//     ['natural', 'organic', 'sustainable', 'eco-friendly'],
//     ['modern', 'contemporary', 'minimalist', 'design'],
//     ['boho', 'vintage', 'rustic', 'traditional'],
//     ['luxury', 'premium', 'quality', 'exclusive'],
//     ['gift', 'decor', 'home', 'lifestyle'],
//     ['jewelry', 'accessory', 'fashion', 'wearable'],
//     ['lighting', 'illumination', 'ambient', 'glow'],
//     ['garden', 'outdoor', 'nature', 'plant'],
//     ['seasonal', 'holiday', 'festive', 'themed'],
//     ['functional', 'practical', 'everyday', 'use'],
//     ['artistic', 'creative', 'expressive', 'inspired']
//   ];

//   // Function to generate truly dynamic images using Picsum with unique seeds
//   const getDynamicImageUrl = (seed) => {
//     return `https://picsum.photos/seed/${seed}/500/500`;
//   };

//   const generateDynamicProducts = () => {
//     const productCount = Math.floor(Math.random() * 6) + 10; // Vary the number of products between 10-15 for dynamic feel
//     const newProducts = [];
    
//     const categoryKeys = Object.keys(categories);
    
//     for (let i = 0; i < productCount; i++) {
//       const categoryKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
//       const productNames = categories[categoryKey];
//       const productName = productNames[Math.floor(Math.random() * productNames.length)];
      
//       // Use unique seed based on refreshKey, index, and random factor for truly changing images
//       const imageSeed = `${refreshKey}-${i}-${Math.floor(Math.random() * 10000)}`;
//       const imageUrl = getDynamicImageUrl(imageSeed);
      
//       const tagSet = [...tags[Math.floor(Math.random() * tags.length)], ...tags[Math.floor(Math.random() * tags.length)]]; // Combine two tag sets for more variety
      
//       newProducts.push({
//         id: Date.now() + i + refreshKey * 1000,
//         title: productName,
//         price: Math.floor(Math.random() * 200) + 20, // Wider price range
//         image: imageUrl,
//         category: categoryKey,
//         artist: artists[Math.floor(Math.random() * artists.length)],
//         description: descriptions[Math.floor(Math.random() * descriptions.length)],
//         tags: tagSet.slice(0, Math.floor(Math.random() * 4) + 3), // Vary number of tags
//         likes: Math.floor(Math.random() * 1000) + 100, // Higher variation in engagement
//         views: Math.floor(Math.random() * 5000) + 500,
//         rating: (Math.random() * 1.5 + 3.5).toFixed(1),
//         reviews: Math.floor(Math.random() * 200) + 20,
//         timestamp: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(), // Wider time range
//         trending: Math.floor(Math.random() * 200) + 20,
//         comments: Math.floor(Math.random() * 100) + 10,
//         shares: Math.floor(Math.random() * 200) + 20,
//         inStock: Math.random() > 0.15, // Slightly higher chance of out-of-stock for realism
//         stockCount: Math.floor(Math.random() * 50) + 5,
//         isNew: Math.random() > 0.65,
//         isTrending: Math.random() > 0.55,
//         discount: Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 10 : 0 // Higher discount chance and range
//       });
//     }
    
//     return newProducts;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 800));
      
//       const dynamicProducts = generateDynamicProducts();
//       setProducts(dynamicProducts);
//       setLoading(false);
//     };

//     fetchProducts();
//   }, [refreshKey]);

//   const handleRefresh = () => {
//     setRefreshKey(prev => prev + 1);
//     setImageErrors(new Set());
//   };

//   const isLiked = (productId) => likedProducts?.has(productId);
//   const isSaved = (productId) => savedProducts?.has(productId);

//   const handleLike = (e, productId) => {
//     e.stopPropagation();
//     onLike?.(productId);
//   };

//   const handleSave = (e, productId) => {
//     e.stopPropagation();
//     onSave?.(productId);
//   };

//   const handleProductClick = (product) => {
//     onProductClick?.(product);
//   };

//   const handleImageError = (productId, e) => {
//     if (!imageErrors.has(productId)) {
//       e.target.src = 'https://picsum.photos/500/500?grayscale'; // Fallback to a grayscale random image
//       setImageErrors(prev => new Set(prev).add(productId));
//     }
//   };

//   const handleBuyClick = (e, product) => {
//     e.stopPropagation();
//     alert(`Added "${product.title}" to cart!`);
//   };

//   const getContainerClass = () => {
//     if (viewMode === 'grid') return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';
//     if (viewMode === 'collage') return 'columns-2 sm:columns-3 gap-4 space-y-4';
//     return 'grid grid-cols-1 gap-4 max-w-4xl mx-auto';
//   };

//   const getProductLayout = (product, index) => {
//     const originalPrice = product.discount > 0 
//       ? Math.round(product.price / (1 - product.discount / 100)) 
//       : product.price;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, delay: index * 0.05 }}
//         className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
//         onClick={() => handleProductClick(product)}
//       >
//         {/* Image Container */}
//         <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             loading="lazy"
//             onError={(e) => handleImageError(product.id, e)}
//           />
          
//           {/* Badges */}
//           <div className="absolute top-3 left-3 flex flex-col gap-2">
//             {product.discount > 0 && (
//               <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
//                 -{product.discount}%
//               </div>
//             )}
//             {product.isNew && (
//               <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
//                 NEW
//               </div>
//             )}
//             {product.isTrending && (
//               <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
//                 <TrendingUp className="w-3 h-3" />
//                 HOT
//               </div>
//             )}
//           </div>

//           {/* Price Badge */}
//           <div className="absolute top-3 right-3 bg-green-500 text-white text-sm px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
//             <Tag className="w-3 h-3" />
//             ${product.price}
//           </div>

//           {/* Stock Status */}
//           {!product.inStock && (
//             <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//               <span className="text-white font-bold text-lg">SOLD OUT</span>
//             </div>
//           )}

//           {/* Removed the quick actions overlay (assumed to be the "lightbox effect") to simplify and improve UX */}
//         </div>

//         {/* Product Info */}
//         <div className="p-4">
//           <div className="flex items-start justify-between mb-2">
//             <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 flex-1">
//               {product.title}
//             </h3>
//           </div>
          
//           <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
//             by {product.artist}
//           </p>

//           {/* Price with discount */}
//           {product.discount > 0 ? (
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-lg font-bold text-green-600 dark:text-green-400">
//                 ${product.price}
//               </span>
//               <span className="text-sm text-gray-500 line-through">
//                 ${originalPrice}
//               </span>
//             </div>
//           ) : (
//             <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//               ${product.price}
//             </div>
//           )}

//           {/* Rating */}
//           <div className="flex items-center gap-1 mb-3">
//             <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//             <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
//               {product.rating}
//             </span>
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               ({product.reviews})
//             </span>
//           </div>

//           {/* Engagement Stats */}
//           <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
//             <div className="flex items-center gap-1">
//               <Heart className="w-3 h-3" />
//               {product.likes}
//             </div>
//             <div className="flex items-center gap-1">
//               <Eye className="w-3 h-3" />
//               {product.views}
//             </div>
//             <div className="flex items-center gap-1">
//               <TrendingUp className="w-3 h-3" />
//               {product.trending}
//             </div>
//           </div>

//           {/* Added persistent action buttons at the bottom for better accessibility without hover */}
//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={(e) => handleLike(e, product.id)}
//               className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
//                 isLiked(product.id)
//                   ? 'bg-red-500 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
//               }`}
//             >
//               <Heart className={`w-4 h-4 inline-block mr-1 ${isLiked(product.id) ? 'fill-current' : ''}`} />
//               Like
//             </button>
//             <button
//               onClick={(e) => handleSave(e, product.id)}
//               className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
//                 isSaved(product.id)
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white'
//               }`}
//             >
//               <Bookmark className={`w-4 h-4 inline-block mr-1 ${isSaved(product.id) ? 'fill-current' : ''}`} />
//               Save
//             </button>
//             <button
//               onClick={(e) => handleBuyClick(e, product)}
//               disabled={!product.inStock}
//               className="flex-1 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ShoppingBag className="w-4 h-4 inline-block mr-1" />
//               Buy
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <section className="py-6 w-full">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-2">
//         <div className="flex-1">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//             Handcrafted Products
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Fresh picks • Updated constantly • {products.length} items
//           </p>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleRefresh}
//             disabled={loading}
//             className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
//           >
//             <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </button>
          
//           <Link
//             to="/shop"
//             className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium whitespace-nowrap"
//           >
//             View all →
//           </Link>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center py-20">
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
//             <p className="text-gray-600 dark:text-gray-400">Loading fresh products...</p>
//           </div>
//         </div>
//       ) : (
//         <motion.div 
//           key={refreshKey}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className={getContainerClass()}
//         >
//           {products.map((product, index) => (
//             <div key={product.id}>
//               {getProductLayout(product, index)}
//             </div>
//           ))}
//         </motion.div>
//       )}
//     </section>
//   );
// };

// export default Visual;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, ShoppingBag, Star, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Visual = ({ 
  onProductClick, 
  likedProducts, 
  savedProducts, 
  onLike, 
  onSave 
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Product categories for dynamic content
  const productCategories = [
    'handmade crafts', 'home decor', 'artisan products', 'pottery', 
    'woodworking', 'textile art', 'jewelry', 'ceramics', 'wall art'
  ];

  // Fetch products from Pexels API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
      const randomCategory = productCategories[Math.floor(Math.random() * productCategories.length)];
      
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${randomCategory}&per_page=12&page=1`,
        {
          headers: {
            'Authorization': apiKey
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();

      // Create products from Pexels photos
      const mappedProducts = data.photos.map((photo, index) => {
        const price = Math.floor(Math.random() * 200) + 20;
        const category = productCategories[Math.floor(Math.random() * productCategories.length)];
        
        return {
          id: photo.id,
          title: generateProductTitle(category, index),
          price: price,
          image: photo.src.medium,
          category: category,
          rating: (Math.random() * 2 + 3).toFixed(1),
          reviews: Math.floor(Math.random() * 50) + 10,
          inStock: Math.random() > 0.2,
          discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0
        };
      });

      setProducts(mappedProducts);
      
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Using demo data...');
      loadFallbackProducts();
    } finally {
      setLoading(false);
    }
  };

  // Fallback products with reliable image URLs
  const loadFallbackProducts = () => {
    const fallbackProducts = [
      {
        id: 1,
        title: 'Handmade Ceramic Mug',
        price: 35,
        image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'pottery',
        rating: '4.7',
        reviews: 28,
        inStock: true,
        discount: 0
      },
      {
        id: 2,
        title: 'Woven Wall Tapestry',
        price: 89,
        image: 'https://images.pexels.com/photos/3738089/pexels-photo-3738089.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'textile art',
        rating: '4.9',
        reviews: 45,
        inStock: true,
        discount: 15
      },
      {
        id: 3,
        title: 'Wooden Cutting Board',
        price: 45,
        image: 'https://images.pexels.com/photos/5591749/pexels-photo-5591749.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'woodworking',
        rating: '4.5',
        reviews: 22,
        inStock: true,
        discount: 0
      },
      {
        id: 4,
        title: 'Artisan Leather Journal',
        price: 52,
        image: 'https://images.pexels.com/photos/542556/pexels-photo-542556.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'handmade crafts',
        rating: '4.8',
        reviews: 38,
        inStock: true,
        discount: 10
      },
      {
        id: 5,
        title: 'Hand-Painted Ceramic Vase',
        price: 68,
        image: 'https://images.pexels.com/photos/4947407/pexels-photo-4947407.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'ceramics',
        rating: '4.6',
        reviews: 42,
        inStock: true,
        discount: 0
      },
      {
        id: 6,
        title: 'Macramé Plant Hanger',
        price: 32,
        image: 'https://images.pexels.com/photos/6621292/pexels-photo-6621292.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'textile art',
        rating: '4.4',
        reviews: 31,
        inStock: true,
        discount: 5
      }
    ];
    setProducts(fallbackProducts);
  };

  // Generate product title based on category
  const generateProductTitle = (category, index) => {
    const prefixes = {
      'pottery': ['Artisan', 'Handmade', 'Custom', 'Premium'],
      'home decor': ['Modern', 'Vintage', 'Minimalist', 'Bohemian'],
      'artisan products': ['Handcrafted', 'Unique', 'Traditional'],
      'woodworking': ['Solid Wood', 'Handcrafted', 'Rustic'],
      'textile art': ['Woven', 'Embroidered', 'Hand-dyed'],
      'jewelry': ['Handmade', 'Artisan', 'Custom'],
      'ceramics': ['Hand-thrown', 'Glazed', 'Artisan'],
      'wall art': ['Original', 'Limited Edition', 'Modern']
    };

    const baseTitles = {
      'pottery': ['Ceramic Mug', 'Clay Vase', 'Pottery Bowl'],
      'home decor': ['Wall Decor', 'Table Piece', 'Sculpture'],
      'artisan products': ['Handcrafted Item', 'Artisan Creation'],
      'woodworking': ['Wooden Tray', 'Cutting Board', 'Serving Plate'],
      'textile art': ['Wall Hanging', 'Textile Art', 'Fabric Art'],
      'jewelry': ['Necklace', 'Bracelet', 'Earrings'],
      'ceramics': ['Ceramic Pot', 'Clay Sculpture', 'Porcelain'],
      'wall art': ['Canvas Art', 'Wall Sculpture', 'Art Print']
    };

    const prefix = prefixes[category]?.[index % prefixes[category]?.length] || 'Handmade';
    const baseTitle = baseTitles[category]?.[index % baseTitles[category]?.length] || 'Artisan Product';

    return `${prefix} ${baseTitle}`;
  };

  const generateUsername = (category) => {
  const usernames = {
    'pottery': ['ClayArtist', 'PotteryMaster', 'MudCreator', 'CeramicPro'],
    'home decor': ['HomeStylist', 'DecorExpert', 'SpaceDesigner', 'InteriorArt'],
    'artisan products': ['ArtisanHands', 'CraftMaster', 'HandmadePro', 'SkillCreator'],
    'woodworking': ['WoodArtist', 'TimberCraft', 'SawMaster', 'CarpenterPro'],
    'textile art': ['FiberArtist', 'WeaveMaster', 'TextilePro', 'FabricCreator'],
    'jewelry': ['GemArtist', 'JewelMaster', 'MetalSmith', 'BeadExpert'],
    'ceramics': ['CeramicArtist', 'GlazeMaster', 'KilnPro', 'ClayExpert'],
    'wall art': ['WallArtist', 'CanvasPro', 'MuralMaster', 'GalleryCreator']
  };
  
  const categoryUsernames = usernames[category] || ['Artisan', 'Creator', 'Maker', 'Designer'];
  return categoryUsernames[Math.floor(Math.random() * categoryUsernames.length)];
};

// Generate random upload date (within last 30 days)
const generateUploadDate = () => {
  const daysAgo = Math.floor(Math.random() * 30) + 1;
  if (daysAgo === 1) return '1 day ago';
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 14) return '1 week ago';
  if (daysAgo < 21) return '2 weeks ago';
  return '3 weeks ago';
};

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleProductClick = (product) => {
    onProductClick?.(product);
  };

  const handleBuyClick = (e, product) => {
    e.stopPropagation();
    alert(`Added "${product.title}" to cart!`);
  };

  const refreshProducts = () => {
    fetchProducts();
  };

return (
  <section className="py-6 w-full lg:max-w-4xl mx-auto">
    {/* Header - unchanged */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Handcrafted Finds
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Curated artisan products
        </p>
      </div>
      
      <div className="flex gap-2 mt-3 sm:mt-0">
        <button
          onClick={refreshProducts}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all disabled:opacity-50 text-sm"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
    </div>

    {/* Loading State - unchanged */}
    {loading && (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </div>
    )}

    {/* Error State - unchanged */}
    {error && !loading && (
      <div className="text-center py-6 px-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mx-4 mb-6">
        <p className="text-yellow-700 dark:text-yellow-400 text-sm mb-3">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all text-sm"
        >
          Try Again
        </button>
      </div>
    )}

    {/* Products Grid - Updated with user info */}
    <div className="grid grid-cols-1 gap-6 lg:px-0">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-800"
          onClick={() => handleProductClick(product)}
        >
          {/* User Info Above Image */}
          <div className="flex items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {product.title.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-900 dark:text-white">
                {generateUsername(product.category)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {generateUploadDate()}
              </p>
            </div>
          </div>

          {/* Centered Image */}
          <div className="pb-4 px-0">
            <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-sm overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = `https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400`;
                }}
              />
            </div>

            {/* Metadata Below Image - unchanged */}
            <div className="space-y-3 px-2">
              {/* Title and Price */}
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 pr-2">
                  {product.title}
                </h3>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-xs text-red-500 line-through">
                      ${Math.round(product.price * (1 + product.discount/100))}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({product.reviews})
                </span>
                {!product.inStock && (
                  <span className="text-xs text-red-500 font-medium">
                    Sold out
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleLike(e, product.id)}
                    className={`p-1.5 rounded-lg transition-all ${
                      isLiked(product.id) 
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => handleSave(e, product.id)}
                    className={`p-1.5 rounded-lg transition-all ${
                      isSaved(product.id)
                        ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-400 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={(e) => handleBuyClick(e, product)}
                  disabled={!product.inStock}
                  className="px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Empty State - unchanged */}
    {!loading && products.length === 0 && (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          No products available.
        </p>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all text-sm"
        >
          Load Products
        </button>
      </div>
    )}
  </section>
);
}

export default Visual;