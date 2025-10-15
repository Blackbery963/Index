// import React from 'react';
// import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const Commerce = () => {
//   const featuredCategories = [
//     {
//       id: 1,
//       title: "Handmade Paintings",
//       description: "Original artwork crafted by skilled hands",
//       link: "/handmade-paintings",
//       accentColor: "bg-amber-100 dark:bg-amber-800",
//       hoverColor: "hover:bg-amber-200 dark:hover:bg-amber-700",
//       image:"https://images.pexels.com/photos/3358727/pexels-photo-3358727.jpeg"
//     },
//     {
//       id: 2,
//       title: "Decor & Crafts",
//       description: "Unique items to beautify your home and space",
//       link: "/decor-crafts",
//       accentColor: "bg-teal-100 dark:bg-teal-800",
//       hoverColor: "hover:bg-teal-200 dark:hover:bg-teal-700",
//       image:"https://images.pexels.com/photos/33297461/pexels-photo-33297461.jpeg"
//     },
//     {
//       id: 3,
//       title: "Cultural Creations",
//       description: "Art inspired by traditional roots and culture",
//       link: "/cultural-creations",
//       accentColor: "bg-purple-100 dark:bg-purple-800",
//       hoverColor: "hover:bg-purple-200 dark:hover:bg-purple-700",
//       image:"https://images.pexels.com/photos/3772488/pexels-photo-3772488.jpeg"
//     },
//   ];

//   return (
//     <div className="  mx-auto bg-white text-gray-800 xl:max-w-7xl max-w-full sm:max-w-[85%] dark:bg-[#0a0f14] dark:text-white rounded-xl transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 py-12">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex justify-between items-center mb-12"
//         >
//           <h1 className="text-3xl font-light tracking-tight">Artisan Marketplace</h1>
//           <Link
//             to="/settings/cart"
//             className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           >
//             <FiShoppingCart />
//             <span className="text-sm">View Cart</span>
//           </Link>
//         </motion.div>

//         {/* Intro */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="mb-16"
//         >
//           <h2 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">Discover Handcrafted Treasures</h2>
//           <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
//             Each piece in our collection tells a story. Support independent artists while finding that perfect addition to your space.
//           </p>
//         </motion.div>

//         {/* Categories */}
// <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//   {featuredCategories.map((cat) => (
//     <motion.div
//       key={cat.id}
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 200, damping: 15 }}
//       className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
//       style={{
//         backgroundImage: `url(${cat.image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "250px",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/80"></div>

//       {/* Content */}
//       <Link to={cat.link} className="absolute inset-0 flex flex-col justify-end p-5">
//         <h3 className="text-2xl font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
//           {cat.title}
//         </h3>
//         <p className="text-gray-200 text-sm mb-3">{cat.description}</p>
//         <div className="flex items-center text-purple-300 font-medium group-hover:text-white transition-colors">
//           <span>Browse Collection</span>
//           <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
//         </div>
//       </Link>
//     </motion.div>
//   ))}
// </div>


//         {/* Purpose Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-20 p-8 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 relative overflow-hidden"
//         >
//           <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-teal-300 dark:bg-teal-700 opacity-10" />
//           <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-amber-300 dark:bg-amber-700 opacity-10" />
//           <div className="relative z-10">
//             <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-white">Why Choose Handmade?</h3>
//             <p className="text-gray-700 dark:text-gray-400 mb-6 max-w-2xl">
//               Every purchase supports an artist directly. You're not just buying decor—you're preserving craftsmanship and enabling creativity.
//             </p>
//             <Link
//               to="/Company/About/AboutHandmade"
//               className="inline-flex items-center text-teal-700 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 font-medium group"
//             >
//               Learn about our artists
//               <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Commerce;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiStar, FiClock, FiUser } from 'react-icons/fi';

const MiniCommerce = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Different content for each section
  const commerceSections = [
    {
      id: 1,
      title: "Trending Artworks",
      subtitle: "Most popular this week",
      type: "trending",
      icon: "🔥",
      products: []
    },
    {
      id: 2,
      title: "New Arrivals", 
      subtitle: "Fresh from artists",
      type: "new",
      icon: "🆕",
      products: []
    },
    {
      id: 3,
      title: "Limited Edition",
      subtitle: "Exclusive pieces",
      type: "limited",
      icon: "⭐",
      products: []
    }
  ];

  useEffect(() => {
    const fetchCommerceData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for different sections
        const trendingProducts = [
          {
            id: 1,
            title: "Abstract Emotions",
            artist: "Sarah Chen",
            price: 249,
            rating: 4.8,
            image: "https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg",
            timeLeft: "2 days",
            category: "Painting"
          },
          {
            id: 2,
            title: "Mountain Serenity",
            artist: "Alex Rivera", 
            price: 189,
            rating: 4.9,
            image: "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg",
            timeLeft: "5 days",
            category: "Digital"
          }
        ];

        const newArrivals = [
          {
            id: 3,
            title: "Urban Dreams",
            artist: "Maya Patel",
            price: 129,
            rating: 4.7,
            image: "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg",
            timeLeft: "Just added",
            category: "Mixed Media"
          },
          {
            id: 4,
            title: "Ocean Whisper",
            artist: "Kenji Tanaka",
            price: 299,
            rating: 5.0,
            image: "https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg",
            timeLeft: "1 day",
            category: "Sculpture"
          }
        ];

        const limitedEditions = [
          {
            id: 5,
            title: "Golden Hour",
            artist: "Elena Silva",
            price: 399,
            rating: 4.9,
            image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg",
            timeLeft: "Last one",
            category: "Print"
          },
          {
            id: 6,
            title: "Desert Soul",
            artist: "Carlos Mendez",
            price: 179,
            rating: 4.8,
            image: "https://images.pexels.com/photos/221047/pexels-photo-221047.jpeg",
            timeLeft: "3 left",
            category: "Photography"
          }
        ];

        // Update sections with their respective products
        commerceSections[0].products = trendingProducts;
        commerceSections[1].products = newArrivals;
        commerceSections[2].products = limitedEditions;
        
        setFeaturedProducts(commerceSections);
      } catch (error) {
        console.error('Error fetching commerce data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommerceData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {featuredProducts.map((section) => (
        <div 
          key={section.id}
          className="bg-white dark:bg-gray-800 rounded-sm p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{section.icon}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {section.subtitle}
              </p>
            </div>
            <Link 
              to={"/Arteva/Artstore"}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium"
            >
              View all
            </Link>
          </div>

          {/* Products List */}
          <div className="space-y-3">
            {section.products.map((product) => (
              <Link
                key={product.id}
                // to={`/artwork/${product.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 group"
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                    {product.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <FiUser className="w-3 h-3" />
                    <span>{product.artist}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm">
                        ${product.price}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiStar className="w-3 h-3 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FiClock className="w-3 h-3" />
                      <span>{product.timeLeft}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Section-specific CTA */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <Link 
              to={"/Arteva/Artstore"}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-150"
            >
              <FiShoppingBag className="w-4 h-4" />
              Explore {section.title.toLowerCase()}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniCommerce;