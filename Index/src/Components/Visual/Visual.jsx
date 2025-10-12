

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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, ShoppingBag, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const Visual = ({ viewMode = 'feed', onProductClick, likedProducts, savedProducts, onLike, onSave, formatTimestamp }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Mock API data for products (in real app, this would come from an API)
  const products = [
    {
      id: 101,
      title: 'Handwoven Basket',
      price: 45,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      category: 'basketry',
      artist: 'Craft Masters',
      description: 'Beautifully handwoven natural fiber basket',
      tags: ['handmade', 'natural', 'decor'],
      likes: 23,
      views: 156,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      trending: 8,
      comments: 5,
      shares: 12,
      inStock: true
    },
    {
      id: 102,
      title: 'Ceramic Clay Pot',
      price: 60,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=500&fit=crop',
      category: 'pottery',
      artist: 'Clay Studio',
      description: 'Hand-thrown ceramic pot with unique glaze',
      tags: ['ceramic', 'handmade', 'home'],
      likes: 45,
      views: 289,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      trending: 15,
      comments: 8,
      shares: 20,
      inStock: true
    },
    {
      id: 103,
      title: 'Macramé Wall Hanging',
      price: 80,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
      category: 'wall decor',
      artist: 'Fiber Arts Co',
      description: 'Intricate macramé design for modern spaces',
      tags: ['macrame', 'textile', 'bohemian'],
      likes: 67,
      views: 342,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      trending: 22,
      comments: 12,
      shares: 35,
      inStock: true
    },
    {
      id: 104,
      title: 'Hand-Carved Wooden Bowl',
      price: 25,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop',
      category: 'woodwork',
      artist: 'Wood Craftsmen',
      description: 'Natural wood bowl with smooth finish',
      tags: ['wood', 'handcarved', 'organic'],
      likes: 34,
      views: 198,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      trending: 11,
      comments: 6,
      shares: 15,
      inStock: false
    },
    {
      id: 105,
      title: 'Natural Dye Textile',
      price: 95,
      image: 'https://images.unsplash.com/photo-1558769132-cb25c5d0d5ba?w=500&h=500&fit=crop',
      category: 'textile',
      artist: 'Eco Dye Studio',
      description: 'Fabric dyed with natural plant pigments',
      tags: ['ecofriendly', 'textile', 'natural'],
      likes: 89,
      views: 421,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      trending: 28,
      comments: 15,
      shares: 42,
      inStock: true
    },
    {
      id: 106,
      title: 'Pressed Floral Frame',
      price: 30,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
      category: 'paper craft',
      artist: 'Botanical Arts',
      description: 'Delicate pressed flowers in glass frame',
      tags: ['floral', 'preserved', 'decor'],
      likes: 56,
      views: 267,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      trending: 18,
      comments: 9,
      shares: 24,
      inStock: true
    }
  ];

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
    // Handle buy action - redirect to product page or add to cart
    console.log('Buy product:', product);
  };

  // Different layouts based on view mode (matching ImageCard)
  const getProductLayout = (product) => {
    switch (viewMode) {
      case 'grid':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer"
            onClick={() => handleProductClick(product)}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
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

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-3 shadow-lg">
                  <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View Product</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => handleSave(e, product.id)}
                  className={`p-2 rounded-full backdrop-blur-lg transition-all ${
                    isSaved(product.id) 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved(product.id) ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={(e) => handleBuyClick(e, product)}
                  className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 backdrop-blur-lg hover:bg-green-500 hover:text-white transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                by {product.artist}
              </p>
              
              <div className="flex items-center justify-between">
                <button 
                  onClick={(e) => handleLike(e, product.id)}
                  className={`flex items-center gap-1 transition-all ${
                    isLiked(product.id) ? 'text-red-500 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked(product.id) ? 'fill-current' : ''}`} />
                  <span className="text-xs font-medium">{product.likes}</span>
                </button>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp?.(product.timestamp)}
                </span>
              </div>
            </div>
          </motion.div>
        );

      case 'collage':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-semibold line-clamp-1 mb-1">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-white/90">
                  <span>${product.price}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => handleLike(e, product.id)}
                      className={`flex items-center gap-1 ${isLiked(product.id) ? 'text-red-300' : ''}`}
                    >
                      <Heart className={`w-3 h-3 ${isLiked(product.id) ? 'fill-current' : ''}`} />
                      {product.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default: // Feed view
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {product.artist[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.artist}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTimestamp?.(product.timestamp)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {product.inStock ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              
              {/* Price Badge */}
              <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1.5 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                <Tag className="w-4 h-4" />
                ${product.price}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => handleSave(e, product.id)}
                  className={`p-3 rounded-xl backdrop-blur-lg transition-all ${
                    isSaved(product.id) 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved(product.id) ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={(e) => handleBuyClick(e, product)}
                  disabled={!product.inStock}
                  className="p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 backdrop-blur-lg hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.slice(0, 4).map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium transition-colors hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={(e) => handleLike(e, product.id)}
                    className={`flex items-center gap-2 transition-all ${
                      isLiked(product.id) ? 'text-red-500 scale-105' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked(product.id) ? 'fill-current' : ''}`} />
                    <span className="font-semibold text-sm">{product.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                    <span className="font-semibold text-sm">{product.comments} comments</span>
                  </button>
                </div>
                
                <button 
                  onClick={(e) => handleBuyClick(e, product)}
                  disabled={!product.inStock}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    product.inStock
                      ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Sold Out'}
                </button>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-400">Handcrafted items from our community</p>
        </div>
        <Link to="/shop" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
          View all products
        </Link>
      </div>
      {/* <div className={`transition-all duration-500 ${
        viewMode === 'collage'
          ? 'columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4' 
          : viewMode === 'shop'
          ? 'columns-1 lg:columns-2 gap-4 space-y-4 max-w-6xl mx-auto'
          : viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'flex flex-col gap-4 w-full'
      }`}> */}
      <div className={`transition-all duration-500 ${
  viewMode === 'collage'
    ? 'columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4'  // Multi-column for discover
    : 'flex flex-col gap-6 w-full max-w-4xl mx-auto'  // Single column for feed
}`}>
        {products.map((product) => (
          <div key={product.id}>
            {getProductLayout(product)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Visual;
