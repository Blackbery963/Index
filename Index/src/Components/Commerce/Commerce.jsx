// import React, { useState } from 'react';
// import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import bg from '../Commerce/ai-generated-8421436.jpg'
// import { Link } from 'react-router-dom';

// const Commerce = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const featuredCategories = [
//     {
//       id: 1,
//       title: "Modern Masterpieces",
//       description: "Contemporary works from today's leading artists",
//       link: "/modern",
//       image: "https://images.pexels.com/photos/1410224/pexels-photo-1410224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//       id: 2,
//       title: "Classic Paintings",
//       description: "Timeless works from art history's greatest minds",
//       link:"/traditional",
//       image: "https://images.pexels.com/photos/14499089/pexels-photo-14499089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//     },
//     {
//       id: 3,
//       title: "Abstract Expressions",
//       description: "Bold colors and unconventional compositions",
//       link: "/abstract",
//       image: "https://images.pexels.com/photos/767956/pexels-photo-767956.jpeg?auto=compress&cs=tinysrgb&w=600"
//     }
//   ];

//   return (
//     <div className="min-h-screen max-w-[95%] rounded-lg mx-auto relative overflow-hidden">
//       {/* Full-screen background image with overlay */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src={bg} 
//           alt="Art gallery background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen flex flex-col">
//         {/* Header */}
//         <header className="py-6 px-4 sm:px-8 flex justify-between items-center">
//           <motion.h1 
//             className="text-2xl font-light text-white"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             ArtEva
//           </motion.h1>
//           <motion.a
//             href="/shop"
//             className="flex items-center text-white hover:text-gray-200 transition"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//           >
//             <FiShoppingCart className="mr-2" />
//             Shop Now
//           </motion.a>
//         </header>

//         {/* Hero Section */}
// <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
//   <motion.div
//     className="max-w-3xl p-8 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-lg shadow-xl border border-white/10"
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.8 }}
//   >
//     <h1 className="text-4xl md:text-6xl font-light text-black mb-6 leading-tight font-Quicksand">
//       Discover Art That <br className="hidden md:block" />
//       <span className="font-semibold text-teal-300">Speaks to You</span>
//     </h1>
//     <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-Playfair text-black">
//       Your gateway to extraordinary artworks from emerging and established artists worldwide.
//     </p>
//     <div className="flex flex-col sm:flex-row justify-center gap-4">
//        <Link
//         to="/gallery"
//         className="px-8 py-4 bg-teal-400 text-black rounded-md font-semibold hover:bg-teal-300 transition shadow-lg font-Quicksand"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Explore Gallery
//        </Link>
//        <Link
//         to="/Artists/DiscoverUsers"
//         className="px-8 py-4 border border-teal-300 text-white rounded-md font-semibold hover:bg-white/10 transition bg-white/5 backdrop-blur-md font-Quicksand"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Meet the Artists
//        </Link>
//     </div>
//   </motion.div>
// </main>

        


//         {/* Category Gateway */}
//         <section className="py-16 px-4 sm:px-8">
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {featuredCategories.map((category) => (
//               <Link
//                 key={category.id}
//                 to={category.link}
//                 className="relative group overflow-hidden rounded-lg shadow-xl h-96"
//                 onMouseEnter={() => setHoveredCard(category.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <img 
//                   src={category.image} 
//                   alt={category.title}
//                   className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
//                 <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
//                   <motion.h3 
//                     className="text-2xl font-medium mb-2 font-Quicksand"
//                     animate={{
//                       y: hoveredCard === category.id ? 0 : 20,
//                       opacity: hoveredCard === category.id ? 1 : 0.9
//                     }}
//                   >
//                     {category.title}
//                   </motion.h3>
//                   <motion.p
//                     className="mb-4 font-Playfair"
//                     animate={{
//                       y: hoveredCard === category.id ? 0 : 20,
//                       opacity: hoveredCard === category.id ? 1 : 0
//                     }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     {category.description}
//                   </motion.p>
//                   <motion.div
//                     animate={{
//                       y: hoveredCard === category.id ? 0 : 20,
//                       opacity: hoveredCard === category.id ? 1 : 0
//                     }}
//                     transition={{ delay: 0.2 }}
//                     className="flex items-center font-medium font-Quicksand bg-white/30 backdrop-blur-lg w-fit px-2 py-1 rounded-lg"
//                   >
//                     View Collection <FiArrowRight className="ml-2" />
//                   </motion.div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Commerce;

import React from 'react';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Commerce = () => {
  const featuredCategories = [
    {
      id: 1,
      title: "Handmade Paintings",
      description: "Original artwork crafted by skilled hands",
      link: "/handmade-paintings",
      accentColor: "bg-amber-100 dark:bg-amber-800",
      hoverColor: "hover:bg-amber-200 dark:hover:bg-amber-700"
    },
    {
      id: 2,
      title: "Decor & Crafts",
      description: "Unique items to beautify your home and space",
      link: "/decor-crafts",
      accentColor: "bg-teal-100 dark:bg-teal-800",
      hoverColor: "hover:bg-teal-200 dark:hover:bg-teal-700"
    },
    {
      id: 3,
      title: "Cultural Creations",
      description: "Art inspired by traditional roots and culture",
      link: "/cultural-creations",
      accentColor: "bg-purple-100 dark:bg-purple-800",
      hoverColor: "hover:bg-purple-200 dark:hover:bg-purple-700"
    },
  ];

  return (
    <div className="max-w-[95%] mx-auto bg-white text-gray-800 dark:bg-[#0a0f14] dark:text-white rounded-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <h1 className="text-3xl font-light tracking-tight">Artisan Marketplace</h1>
          <Link
            to="/settings/cart"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiShoppingCart />
            <span className="text-sm">View Cart</span>
          </Link>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">Discover Handcrafted Treasures</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            Each piece in our collection tells a story. Support independent artists while finding that perfect addition to your space.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={cat.link}
                className={`block h-full p-1 rounded-xl ${cat.hoverColor} transition-colors group`}
              >
                <div className={`h-40 ${cat.accentColor} rounded-lg mb-4 overflow-hidden`}>
                  <div className="w-full h-full bg-gradient-to-br from-transparent to-black/10 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-2 pb-4">
                  <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{cat.description}</p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    <span className="text-sm font-medium">Browse collection</span>
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Purpose Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-teal-300 dark:bg-teal-700 opacity-10" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-amber-300 dark:bg-amber-700 opacity-10" />
          <div className="relative z-10">
            <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-white">Why Choose Handmade?</h3>
            <p className="text-gray-700 dark:text-gray-400 mb-6 max-w-2xl">
              Every purchase supports an artist directly. You're not just buying decor—you're preserving craftsmanship and enabling creativity.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-teal-700 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 font-medium group"
            >
              Learn about our artists
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Commerce;

