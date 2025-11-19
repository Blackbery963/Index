// import { useState, useEffect } from 'react';
// import { Heart, Bookmark, ShoppingBag, Star, RefreshCw, AlertCircle } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Visual = ({ 
//   onProductClick, 
//   likedProducts = new Set(), 
//   savedProducts = new Set(), 
//   onLike, 
//   onSave 
// }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageErrors, setImageErrors] = useState(new Set());
//   const [page, setPage] = useState(1);

//   const productCategories = [
//     'handmade pottery', 'artisan jewelry', 'wooden crafts', 'ceramic art', 
//     'textile design', 'leather goods', 'handmade ceramics', 'art print',
//     'home decoration', 'macrame art'
//   ];

//   // CRITICAL FIX: Use larger images for better quality
//   const fetchProducts = async (pageNum = 1) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
      
//       if (!apiKey) {
//         throw new Error('Pexels API key not configured');
//       }

//       const randomCategory = productCategories[Math.floor(Math.random() * productCategories.length)];
      
//       // FIXED: Added orientation and size parameters for better quality
//       const response = await fetch(
//         `https://api.pexels.com/v1/search?query=${encodeURIComponent(randomCategory)}&per_page=12&page=${pageNum}&orientation=square`,
//         {
//           headers: {
//             'Authorization': apiKey
//           }
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 429) {
//           throw new Error('Rate limit exceeded. Please try again in a moment.');
//         }
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();

//       if (!data.photos || data.photos.length === 0) {
//         throw new Error('No products found');
//       }

//       // CRITICAL FIX: Use large2x or large for high quality
//       const mappedProducts = data.photos.map((photo, index) => {
//         const price = Math.floor(Math.random() * 200) + 20;
//         const category = productCategories[Math.floor(Math.random() * productCategories.length)];
        
//         return {
//           id: `pexels-${photo.id}`,
//           pexelsId: photo.id,
//           title: generateProductTitle(category, index),
//           price: price,
//           // FIXED: Use large2x for best quality, fallback to large
//           image: photo.src.large2x || photo.src.large,
//           // Keep original for lightbox/zoom
//           originalImage: photo.src.original,
//           // Medium as fallback
//           mediumImage: photo.src.medium,
//           category: category,
//           photographer: photo.photographer,
//           photographerUrl: photo.photographer_url,
//           rating: (Math.random() * 2 + 3).toFixed(1),
//           reviews: Math.floor(Math.random() * 50) + 10,
//           inStock: Math.random() > 0.2,
//           discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
//           // Image dimensions for aspect ratio
//           width: photo.width,
//           height: photo.height,
//           avgColor: photo.avg_color
//         };
//       });

//       setProducts(pageNum === 1 ? mappedProducts : [...products, ...mappedProducts]);
//       setPage(pageNum);
      
//     } catch (err) {
//       console.error('Failed to load products:', err);
//       setError(err.message);
      
//       // Only load fallback on initial load
//       if (pageNum === 1) {
//         loadFallbackProducts();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // IMPROVED: High-quality fallback images
//   const loadFallbackProducts = () => {
//     const fallbackProducts = [
//       {
//         id: 'fallback-1',
//         title: 'Handmade Ceramic Mug',
//         price: 35,
//         // FIXED: Using large2x URLs
//         image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         originalImage: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg',
//         category: 'pottery',
//         photographer: 'Artisan Studio',
//         rating: '4.7',
//         reviews: 28,
//         inStock: true,
//         discount: 0,
//         width: 1260,
//         height: 750
//       },
//       {
//         id: 'fallback-2',
//         title: 'Woven Wall Tapestry',
//         price: 89,
//         image: 'https://images.pexels.com/photos/3738089/pexels-photo-3738089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         originalImage: 'https://images.pexels.com/photos/3738089/pexels-photo-3738089.jpeg',
//         category: 'textile art',
//         photographer: 'Craft Master',
//         rating: '4.9',
//         reviews: 45,
//         inStock: true,
//         discount: 15,
//         width: 1260,
//         height: 750
//       },
//       {
//         id: 'fallback-3',
//         title: 'Wooden Cutting Board',
//         price: 45,
//         image: 'https://images.pexels.com/photos/5591749/pexels-photo-5591749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         originalImage: 'https://images.pexels.com/photos/5591749/pexels-photo-5591749.jpeg',
//         category: 'woodworking',
//         photographer: 'Wood Artist',
//         rating: '4.5',
//         reviews: 22,
//         inStock: true,
//         discount: 0,
//         width: 1260,
//         height: 750
//       }
//     ];
//     setProducts(fallbackProducts);
//   };

//   const generateProductTitle = (category, index) => {
//     const prefixes = {
//       'pottery': ['Artisan', 'Handmade', 'Custom', 'Premium', 'Unique'],
//       'home decoration': ['Modern', 'Vintage', 'Minimalist', 'Bohemian', 'Elegant'],
//       'artisan jewelry': ['Handcrafted', 'Unique', 'Traditional', 'Contemporary'],
//       'wooden crafts': ['Solid Wood', 'Handcrafted', 'Rustic', 'Natural'],
//       'textile design': ['Woven', 'Embroidered', 'Hand-dyed', 'Handspun'],
//       'leather goods': ['Genuine Leather', 'Handstitched', 'Premium', 'Vintage'],
//       'ceramic art': ['Hand-thrown', 'Glazed', 'Artisan', 'Studio'],
//       'art print': ['Limited Edition', 'Original', 'Museum Quality', 'Signed']
//     };

//     const baseTitles = {
//       'pottery': ['Ceramic Mug', 'Clay Vase', 'Pottery Bowl', 'Ceramic Plate'],
//       'home decoration': ['Wall Decor', 'Table Centerpiece', 'Sculpture', 'Ornament'],
//       'artisan jewelry': ['Necklace', 'Bracelet', 'Earrings', 'Ring'],
//       'wooden crafts': ['Wooden Tray', 'Cutting Board', 'Serving Plate', 'Box'],
//       'textile design': ['Wall Hanging', 'Textile Art', 'Fabric Art', 'Tapestry'],
//       'leather goods': ['Wallet', 'Belt', 'Journal Cover', 'Bag'],
//       'ceramic art': ['Ceramic Pot', 'Clay Sculpture', 'Porcelain', 'Vessel'],
//       'art print': ['Canvas Art', 'Wall Print', 'Art Print', 'Poster']
//     };

//     const categoryKey = Object.keys(prefixes).find(key => category.includes(key)) || 'pottery';
//     const prefix = prefixes[categoryKey]?.[index % prefixes[categoryKey]?.length] || 'Handmade';
//     const baseTitle = baseTitles[categoryKey]?.[index % baseTitles[categoryKey]?.length] || 'Artisan Product';

//     return `${prefix} ${baseTitle}`;
//   };

//   const generateUsername = (photographer, category) => {
//     if (photographer && photographer !== 'Unknown') {
//       return photographer;
//     }
    
//     const usernames = {
//       'pottery': ['ClayArtist', 'PotteryMaster', 'MudCreator', 'CeramicPro'],
//       'home decoration': ['HomeStylist', 'DecorExpert', 'SpaceDesigner'],
//       'artisan jewelry': ['GemArtist', 'JewelMaster', 'MetalSmith'],
//       'wooden crafts': ['WoodArtist', 'TimberCraft', 'SawMaster'],
//       'textile design': ['FiberArtist', 'WeaveMaster', 'TextilePro'],
//     };
    
//     const categoryKey = Object.keys(usernames).find(key => category.includes(key));
//     const categoryUsernames = usernames[categoryKey] || ['Artisan', 'Creator', 'Maker'];
//     return categoryUsernames[Math.floor(Math.random() * categoryUsernames.length)];
//   };

//   const generateUploadDate = () => {
//     const daysAgo = Math.floor(Math.random() * 30) + 1;
//     if (daysAgo === 1) return '1 day ago';
//     if (daysAgo < 7) return `${daysAgo} days ago`;
//     if (daysAgo < 14) return '1 week ago';
//     if (daysAgo < 21) return '2 weeks ago';
//     return '3 weeks ago';
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleImageError = (productId, e) => {
//     setImageErrors(prev => new Set([...prev, productId]));
//     const product = products.find(p => p.id === productId);
    
//     // Try fallback to medium quality if large fails
//     if (product && e.target.src !== product.mediumImage) {
//       e.target.src = product.mediumImage;
//     } else {
//       // Ultimate fallback
//       e.target.src = 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
//     }
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

//   const handleBuyClick = (e, product) => {
//     e.stopPropagation();
//     // Replace with actual cart functionality
//     console.log('Added to cart:', product);
//     // Show toast or notification
//   };

//   const refreshProducts = () => {
//     setProducts([]);
//     setImageErrors(new Set());
//     fetchProducts(1);
//   };

//   const loadMore = () => {
//     fetchProducts(page + 1);
//   };

//   return (
//     <section className="py-6 w-full lg:max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Handcrafted Finds
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//             Premium artisan products
//           </p>
//         </div>
        
//         <button
//           onClick={refreshProducts}
//           disabled={loading}
//           className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-all disabled:opacity-50 text-sm font-medium mt-3 sm:mt-0"
//         >
//           <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//           {loading ? 'Loading...' : 'Refresh'}
//         </button>
//       </div>

//       {/* Loading State */}
//       {loading && products.length === 0 && (
//         <div className="flex items-center justify-center py-20">
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-800 border-t-purple-500 rounded-full animate-spin" />
//             <p className="text-sm text-gray-600 dark:text-gray-400">Loading high-quality products...</p>
//           </div>
//         </div>
//       )}

//       {/* Error State */}
//       {error && !loading && products.length === 0 && (
//         <div className="mx-4 mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
//           <div className="flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <p className="text-yellow-800 dark:text-yellow-300 font-medium mb-2">
//                 Unable to load products
//               </p>
//               <p className="text-yellow-700 dark:text-yellow-400 text-sm mb-3">
//                 {error}
//               </p>
//               <button
//                 onClick={() => fetchProducts(1)}
//                 className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all text-sm font-medium"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products Grid */}
//       <AnimatePresence mode="popLayout">
//         <div className="grid grid-cols-1 gap-6 lg:px-0">
//           {products.map((product, index) => (
//             <motion.div
//               key={product.id}
//               layout
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//               className="bg-white dark:bg-gray-900 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-800 overflow-hidden group"
//               onClick={() => handleProductClick(product)}
//             >
//               {/* User Info */}
//               <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
//                 <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-sm font-semibold text-white">
//                     {product.title.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
//                     {generateUsername(product.photographer, product.category)}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {generateUploadDate()}
//                   </p>
//                 </div>
//               </div>

//               {/* High-Quality Image with Loading */}
//               <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
//                 {/* Placeholder with average color */}
//                 <div 
//                   className="absolute inset-0 animate-pulse"
//                   style={{ backgroundColor: product.avgColor || '#f3f4f6' }}
//                 />
                
//                 {/* Actual Image */}
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   loading="lazy"
//                   onError={(e) => handleImageError(product.id, e)}
//                   // CRITICAL: Prevent image stretching
//                   style={{ objectFit: 'cover' }}
//                 />
                
//                 {/* Discount Badge */}
//                 {product.discount > 0 && (
//                   <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
//                     -{product.discount}%
//                   </div>
//                 )}
//               </div>

//               {/* Product Details */}
//               <div className="p-4 space-y-3">
//                 {/* Title and Price */}
//                 <div className="flex items-start justify-between gap-3">
//                   <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
//                     {product.title}
//                   </h3>
//                   <div className="flex flex-col items-end flex-shrink-0">
//                     <span className="text-xl font-bold text-gray-900 dark:text-white">
//                       ${product.price}
//                     </span>
//                     {product.discount > 0 && (
//                       <span className="text-sm text-gray-500 line-through">
//                         ${Math.round(product.price / (1 - product.discount/100))}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1">
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm font-semibold text-gray-900 dark:text-white">
//                       {product.rating}
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     ({product.reviews} reviews)
//                   </span>
//                   {!product.inStock && (
//                     <span className="ml-auto text-sm text-red-600 dark:text-red-400 font-medium">
//                       Out of stock
//                     </span>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={(e) => handleLike(e, product.id)}
//                       className={`p-2 rounded-lg transition-all ${
//                         isLiked(product.id) 
//                           ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
//                           : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800'
//                       }`}
//                       title="Like"
//                     >
//                       <Heart className={`w-5 h-5 ${isLiked(product.id) ? 'fill-current' : ''}`} />
//                     </button>

//                     <button
//                       onClick={(e) => handleSave(e, product.id)}
//                       className={`p-2 rounded-lg transition-all ${
//                         isSaved(product.id)
//                           ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                           : 'text-gray-400 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'
//                       }`}
//                       title="Save"
//                     >
//                       <Bookmark className={`w-5 h-5 ${isSaved(product.id) ? 'fill-current' : ''}`} />
//                     </button>
//                   </div>

//                   <button
//                     onClick={(e) => handleBuyClick(e, product)}
//                     disabled={!product.inStock}
//                     className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
//                   >
//                     <ShoppingBag className="w-4 h-4" />
//                     {product.inStock ? 'Add to Cart' : 'Sold Out'}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </AnimatePresence>

//       {/* Load More */}
//       {!loading && products.length > 0 && products.length % 12 === 0 && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={loadMore}
//             className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
//           >
//             Load More Products
//           </button>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && products.length === 0 && !error && (
//         <div className="text-center py-16">
//           <div className="text-6xl mb-4">🎨</div>
//           <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
//             No products available
//           </p>
//           <button
//             onClick={() => fetchProducts(1)}
//             className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all"
//           >
//             Load Products
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Visual;

import { useState, useEffect } from 'react';
import { Heart, Bookmark, ShoppingBag, Star, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Visual = ({ 
  onProductClick, 
  likedProducts = new Set(), 
  savedProducts = new Set(), 
  onLike, 
  onSave 
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [page, setPage] = useState(1);

  const productCategories = [
    'handmade pottery', 'artisan jewelry', 'wooden crafts', 'ceramic art', 
    'textile design', 'leather goods', 'handmade ceramics', 'art print',
    'home decoration', 'macrame art'
  ];

  const fetchProducts = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
      
      if (!apiKey) throw new Error('Pexels API key not configured');

      const randomCategory = productCategories[Math.floor(Math.random() * productCategories.length)];
      
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(randomCategory)}&per_page=12&page=${pageNum}&orientation=square`,
        { headers: { 'Authorization': apiKey } }
      );

      if (!response.ok) {
        if (response.status === 429) throw new Error('Rate limit exceeded');
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const mappedProducts = data.photos.map(photo => {
        const price = Math.floor(Math.random() * 180) + 25;
        const category = productCategories[Math.floor(Math.random() * productCategories.length)];
        const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0;

        return {
          id: `pexels-${photo.id}`,
          title: generateProductTitle(category),
          price,
          discount,
          originalPrice: discount ? Math.round(price / (1 - discount / 100)) : price,
          image: photo.src.large2x || photo.src.large,
          originalImage: photo.src.original,
          mediumImage: photo.src.medium,
          category,
          photographer: photo.photographer,
          photographerUrl: photo.photographer_url,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
          reviews: Math.floor(Math.random() * 120) + 15,
          inStock: Math.random() > 0.15,
          avgColor: photo.avg_color || '#f4f4f5',
        };
      });

      setProducts(pageNum === 1 ? mappedProducts : [...products, ...mappedProducts]);
      setPage(pageNum);
    } catch (err) {
      console.error(err);
      setError(err.message);
      if (pageNum === 1) loadFallbackProducts();
    } finally {
      setLoading(false);
    }
  };

  const loadFallbackProducts = () => {
    const fallback = [
      {
        id: 'fb-1',
        title: 'Handmade Ceramic Vase',
        price: 68,
        discount: 20,
        originalPrice: 85,
        image: 'https://images.pexels.com/photos/6438378/pexels-photo-6438378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        mediumImage: 'https://images.pexels.com/photos/6438378/pexels-photo-6438378.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'ceramic art',
        photographer: 'Clay & Soul',
        rating: '4.8',
        reviews: 89,
        inStock: true,
        avgColor: '#d4c4b1'
      },
      // ... (add more fallbacks if you want)
    ];
    setProducts(fallback);
  };

  const generateProductTitle = (category) => {
    const titles = {
      'handmade pottery': ['Artisan Moon Vase', 'Textured Ceramic Bowl', 'Hand-thrown Planter', 'Glazed Mug Set'],
      'artisan jewelry': ['Bohemian Layered Necklace', 'Minimalist Silver Ring', 'Gemstone Drop Earrings', 'Leather Wrap Bracelet'],
      'wooden crafts': ['Hand-carved Serving Board', 'Rustic Wooden Tray', 'Live Edge Coaster Set', 'Walnut Jewelry Box'],
      // ... add more as needed
    };
    const list = titles[category] || ['Handcrafted Masterpiece', 'Unique Artisan Piece'];
    return list[Math.floor(Math.random() * list.length)];
  };

  const generateUsername = (photographer) => photographer || ['ClayWorks', 'WoodWisp', 'ThreadNest', 'GemForge'][Math.floor(Math.random() * 4)];

  const generateUploadDate = () => {
    const days = Math.floor(Math.random() * 20) + 1;
    return days === 1 ? '1 day ago' : `${days} days ago`;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageError = (productId, e) => {
    const product = products.find(p => p.id === productId);
    if (product && e.target.src !== product.mediumImage) {
      e.target.src = product.mediumImage;
    }
  };

  const isLiked = (id) => likedProducts.has(id);
  const isSaved = (id) => savedProducts.has(id);

  const refreshProducts = () => {
    setProducts([]);
    setImageErrors(new Set());
    fetchProducts(1);
  };

  const loadMore = () => fetchProducts(page + 1);

  return (
    <section className="py-8 w-full max-w-5xl mx-auto px-">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Handcrafted Finds</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Unique artisan pieces • Made with love</p>
        </div>
        <button
          onClick={refreshProducts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => onProductClick?.(product)}
              className="w-full rounded-sm border border-gray-300 dark:border-gray-700 p-3 bg-transparent cursor-pointer group"
            >
              {/* TOP BOX - User + Price */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {product.title[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {generateUsername(product.photographer)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {generateUploadDate()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${product.price}
                    </div>
                    {product.discount > 0 && (
                      <div className="text-xs text-gray-500">
                        <del>${product.originalPrice}</del>
                        <span className="text-red-500 ml-1">-{product.discount}%</span>
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="text-xs text-red-600 dark:text-red-400 font-medium">Out of stock</div>
                    )}
                  </div>
                </div>
              </div>

              {/* MIDDLE - Image */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden mb-3 relative aspect-square">
                <div 
                  className="absolute inset-0 animate-pulse"
                  style={{ backgroundColor: product.avgColor }}
                />
                <img
                  src={product.image}
                  alt={product.title}
                  className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => handleImageError(product.id, e)}
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg">
                    -{product.discount}% 
                  </div>
                )}
              </div>

              {/* BOTTOM - Title + Details + Actions */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)} 
                  {' • '}
                  <span className="text-yellow-600 dark:text-yellow-400">
                    ★ {product.rating} ({product.reviews})
                  </span>
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); onLike?.(product.id); }}
                      className={`p-2.5 rounded-lg transition-all ${isLiked(product.id) ? 'text-red-500 bg-red-50 dark:bg-red-900/30' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); onSave?.(product.id); }}
                      className={`p-2.5 rounded-lg transition-all ${isSaved(product.id) ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); /* add to cart */ console.log('cart', product); }}
                    disabled={!product.inStock}
                    className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all 
                      ${product.inStock 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-gray-400 text-gray-700 dark:text-gray-300 cursor-not-allowed'}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {product.inStock ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {products.length % 12 === 0 && !loading && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium">
            Load More
          </button>
        </div>
      )}

      {loading && products.length === 0 && (
        <div className="text-center py-20 text-gray-500">Loading beautiful handmade pieces...</div>
      )}
    </section>
  );
};

export default Visual;