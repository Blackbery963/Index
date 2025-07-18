import { useState, useEffect } from 'react';
import React from 'react';
import { motion,AnimatePresence } from 'framer-motion';

const cards = [
  {
    title: "Connect & Collaborate",
    image: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
    description: "Join a global network of artists to share ideas and create together.",
    bgClass: "bg-teal-700 bg-opacity-30",
  },
  {
    title: "Research & Teach",
    image: "https://images.pexels.com/photos/941555/pexels-photo-941555.jpeg",
    description: "Access resources to study, teach, and analyze art history and techniques.",
    bgClass: "bg-indigo-700 bg-opacity-30",
  },
  {
    title: "Publish & Inspire",
    image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg",
    description: "Share your research papers and inspire the global art community.",
    bgClass: "bg-rose-700 bg-opacity-30 ",

  },
];

const Gateway = () => {
  const [showFirst, setShowFirst] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev);
    }, 3000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative max-w-[95%] mx-auto min-h-screen bg-gray-100 w-full rounded-lg overflow-hidden shadow-2xl">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-100"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-left min-h-screen px-4 py-16 sm:px-6 md:px-20 md:py-32 text-white overflow-y-auto">
        {/* Heading */}
        <h1 className='text-xl text-black absolute top-2 right-2 font-Playfair'>Coming Soon...</h1>
         <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.h1
            key="heading1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-xl text-center font-Quicksand"
          >
           Small Steps, <br className="hidden md:block" />
          <span className="text-green-200">Big Art Impact</span> 
          </motion.h1>
        ) : (
          <motion.h1
            key="heading2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-xl text-center font-Quicksand"
          >
            Connecting Hearts <br className="hidden md:block" />
          <span className="text-green-200">Through Art</span> 
          </motion.h1>
        )}
      </AnimatePresence>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl dark:text-gray-200 text-gray-900  font-light text-center font-Playfair"
        >
          Every small step you take today creates a ripple of positive change for the art world’s future.
        </motion.p>

        {/* Button */}
        <div className='flex gap-2 md:flex-row flex-col items-center justify-center'>
          <motion.button 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 px-6 py-3 bg-green-700 bg-opacity-30 border border-white text-white rounded-full backdrop-blur-md shadow-lg hover:bg-green-900 transition duration-300"
        >
          Explore Global Hub
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 px-6 py-3 bg-green-700 bg-opacity-30 border border-white text-white rounded-full backdrop-blur-md shadow-lg hover:bg-green-900 transition duration-300"
        >
          Join Community
        </motion.button>
        </div>
      
        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-2 sm:px-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.6 }}
              className={` ${card.bgClass} border border-white border-opacity-20 backdrop-blur-lg p-6 rounded-br-[20%] rounded-tl-[20%] shadow-xl flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 `}
            >
              <div
                className="w-28 h-20 sm:w-32 sm:h-24 rounded-2xl bg-cover bg-center mb-4 border-2 border-white shadow-inner"
                style={{ backgroundImage: `url(${card.image})` }}
              ></div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-100 drop-shadow font-Quicksand">{card.title}</h3>
              <p className="mt-2 text-gray-200 text-sm sm:text-base font-light font-Playfair">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gateway;
