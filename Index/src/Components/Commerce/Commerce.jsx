import React, { useState } from 'react';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import bg from '../Commerce/ai-generated-8421436.jpg'
import { Link } from 'react-router-dom';

const Commerce = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const featuredCategories = [
    {
      id: 1,
      title: "Modern Masterpieces",
      description: "Contemporary works from today's leading artists",
      link: "/modern",
      image: "https://images.pexels.com/photos/1410224/pexels-photo-1410224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      title: "Classic Paintings",
      description: "Timeless works from art history's greatest minds",
      link:"/traditional",
      image: "https://images.pexels.com/photos/14499089/pexels-photo-14499089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      title: "Abstract Expressions",
      description: "Bold colors and unconventional compositions",
      link: "/abstract",
      image: "https://images.pexels.com/photos/767956/pexels-photo-767956.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  return (
    <div className="min-h-screen max-w-[95%] rounded-lg mx-auto relative overflow-hidden">
      {/* Full-screen background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bg} 
          alt="Art gallery background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-4 sm:px-8 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-light text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ArtEva
          </motion.h1>
          <motion.a
            href="/shop"
            className="flex items-center text-white hover:text-gray-200 transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <FiShoppingCart className="mr-2" />
            Shop Now
          </motion.a>
        </header>

        {/* Hero Section */}
<main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
  <motion.div
    className="max-w-3xl p-8 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-lg shadow-xl border border-white/10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="text-4xl md:text-6xl font-light text-black mb-6 leading-tight font-Quicksand">
      Discover Art That <br className="hidden md:block" />
      <span className="font-semibold text-teal-300">Speaks to You</span>
    </h1>
    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-Playfair text-black">
      Your gateway to extraordinary artworks from emerging and established artists worldwide.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
       <Link
        to="/gallery"
        className="px-8 py-4 bg-teal-400 text-black rounded-md font-semibold hover:bg-teal-300 transition shadow-lg font-Quicksand"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Gallery
       </Link>
       <Link
        to="/artists"
        className="px-8 py-4 border border-teal-300 text-white rounded-md font-semibold hover:bg-white/10 transition bg-white/5 backdrop-blur-md font-Quicksand"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Meet the Artists
       </Link>
    </div>
  </motion.div>
</main>

        


        {/* Category Gateway */}
        <section className="py-16 px-4 sm:px-8">
          {/* <motion.h2 
            className="text-2xl font-light text-white mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Begin Your Art Journey
          </motion.h2> */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="relative group overflow-hidden rounded-lg shadow-xl h-96"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <motion.h3 
                    className="text-2xl font-medium mb-2 font-Quicksand"
                    animate={{
                      y: hoveredCard === category.id ? 0 : 20,
                      opacity: hoveredCard === category.id ? 1 : 0.9
                    }}
                  >
                    {category.title}
                  </motion.h3>
                  <motion.p
                    className="mb-4 font-Playfair"
                    animate={{
                      y: hoveredCard === category.id ? 0 : 20,
                      opacity: hoveredCard === category.id ? 1 : 0
                    }}
                    transition={{ delay: 0.1 }}
                  >
                    {category.description}
                  </motion.p>
                  <motion.div
                    animate={{
                      y: hoveredCard === category.id ? 0 : 20,
                      opacity: hoveredCard === category.id ? 1 : 0
                    }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center font-medium font-Quicksand bg-white/30 backdrop-blur-lg w-fit px-2 py-1 rounded-lg"
                  >
                    View Collection <FiArrowRight className="ml-2" />
                  </motion.div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Commerce;