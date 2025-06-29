

// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FaPaintBrush, FaGlobeAmericas, FaChalkboardTeacher, FaSearch, FaUsers, FaExchangeAlt } from 'react-icons/fa';

// function Connecting() {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: 'ease-in-out',
//       once: true,
//     });
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.1,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10
//       }
//     }
//   };

//   const featureCards = [
//     {
//       icon: <FaGlobeAmericas className="text-4xl" />,
//       title: "Global Network",
//       description: "Connect with artists and art lovers from every corner of the world",
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: <FaChalkboardTeacher className="text-4xl" />,
//       title: "Art Education",
//       description: "Learn from masterclasses, workshops, and tutorials by renowned artists",
//       color: "from-purple-500 to-purple-600"
//     },
//     {
//       icon: <FaSearch className="text-4xl" />,
//       title: "Art Research",
//       description: "Access extensive art databases and historical archives",
//       color: "from-green-500 to-green-600"
//     },
//     {
//       icon: <FaUsers className="text-4xl" />,
//       title: "Community",
//       description: "Join discussions, critiques, and collaborative projects",
//       color: "from-red-500 to-red-600"
//     },
//     {
//       icon: <FaExchangeAlt className="text-4xl" />,
//       title: "Exchange",
//       description: "Trade techniques, materials, and cultural perspectives",
//       color: "from-yellow-500 to-yellow-600"
//     },
//     {
//       icon: <FaPaintBrush className="text-4xl" />,
//       title: "Create Together",
//       description: "Participate in global collaborative art projects",
//       color: "from-pink-500 to-pink-600"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       {/* Hero Section */}
//       <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>
//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
//           </div>
//         </div>
        
//         <motion.div 
//           className="relative max-w-7xl mx-auto text-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h1 
//             className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
//             variants={itemVariants}
//             data-aos="fade-up"
//           >
//             The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Global Art</span> Connection
//           </motion.h1>
          
//           <motion.p 
//             className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-300"
//             variants={itemVariants}
//             data-aos="fade-up"
//             data-aos-delay="100"
//           >
//             Where creativity transcends borders and cultures unite through artistic expression
//           </motion.p>
          
//           <motion.div 
//             className="flex flex-col sm:flex-row justify-center gap-4"
//             variants={itemVariants}
//             data-aos="fade-up"
//             data-aos-delay="200"
//           >
//             <Link to="/explore">
//               <motion.button
//                 className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Explore the Platform
//               </motion.button>
//             </Link>
            
//             <Link to="/signup">
//               <motion.button
//                 className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Join Our Community
//               </motion.button>
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
//         <div className="max-w-7xl mx-auto">
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold text-center mb-4"
//             data-aos="fade-up"
//           >
//             What We Offer
//           </motion.h2>
          
//           <motion.p 
//             className="text-xl text-center text-gray-300 max-w-3xl mx-auto mb-16"
//             data-aos="fade-up"
//             data-aos-delay="100"
//           >
//             A comprehensive platform connecting the global art community
//           </motion.p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featureCards.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-purple-500"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 100}
//                 whileHover={{ y: -10 }}
//               >
//                 <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6`}>
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
//                 <p className="text-gray-300">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Global Connection Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-gray-900">
//         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
//           <motion.div 
//             className="lg:w-1/2"
//             data-aos="fade-right"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Real-time</span> Artistic Exchange
//             </h2>
            
//             <p className="text-xl text-gray-300 mb-8">
//               Our platform enables live collaboration between artists across continents. 
//               Share techniques, get instant feedback, and create together regardless of location.
//             </p>
            
//             <ul className="space-y-4">
//               <li className="flex items-start">
//                 <div className="flex-shrink-0 mt-1">
//                   <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                     </svg>
//                   </div>
//                 </div>
//                 <p className="ml-3 text-lg text-gray-300">Live collaborative canvas</p>
//               </li>
//               <li className="flex items-start">
//                 <div className="flex-shrink-0 mt-1">
//                   <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                     </svg>
//                   </div>
//                 </div>
//                 <p className="ml-3 text-lg text-gray-300">Cultural exchange programs</p>
//               </li>
//               <li className="flex items-start">
//                 <div className="flex-shrink-0 mt-1">
//                   <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                     </svg>
//                   </div>
//                 </div>
//                 <p className="ml-3 text-lg text-gray-300">Language translation for art discussions</p>
//               </li>
//             </ul>
//           </motion.div>
          
//           <motion.div 
//             className="lg:w-1/2 relative"
//             data-aos="fade-left"
//           >
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30">
//               <div className="aspect-w-16 aspect-h-9">
//                 <img 
//                   src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
//                   alt="Artists collaborating globally"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
//                 <div>
//                   <h3 className="text-white text-xl font-bold mb-2">Global Art Collaboration in Action</h3>
//                   <p className="text-gray-300">Artists from 12 countries working on a mural together</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-purple-600/20 blur-xl z-0"></div>
//             <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-blue-600/20 blur-xl z-0"></div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Learning Hub Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <motion.h2 
//               className="text-3xl md:text-4xl font-bold mb-4"
//               data-aos="fade-up"
//             >
//               The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">World's Art</span> Classroom
//             </motion.h2>
//             <motion.p 
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//               data-aos="fade-up"
//               data-aos-delay="100"
//             >
//               Comprehensive learning resources from basic techniques to advanced theory
//             </motion.p>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <motion.div 
//               className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300"
//               data-aos="fade-up"
//               data-aos-delay="200"
//               whileHover={{ y: -10 }}
//             >
//               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white mb-6">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold mb-3">Art History</h3>
//               <p className="text-gray-300 mb-4">Explore comprehensive timelines of artistic movements across cultures and centuries.</p>
//               <Link to="/courses/art-history" className="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
//                 Explore Courses
//                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                 </svg>
//               </Link>
//             </motion.div>
            
//             <motion.div 
//               className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300"
//               data-aos="fade-up"
//               data-aos-delay="300"
//               whileHover={{ y: -10 }}
//             >
//               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white mb-6">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold mb-3">Technique Mastery</h3>
//               <p className="text-gray-300 mb-4">Step-by-step guides from world-class artists in all mediums and styles.</p>
//               <Link to="/courses/techniques" className="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
//                 View Tutorials
//                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                 </svg>
//               </Link>
//             </motion.div>
            
//             <motion.div 
//               className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300"
//               data-aos="fade-up"
//               data-aos-delay="400"
//               whileHover={{ y: -10 }}
//             >
//               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white mb-6">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold mb-3">Art Business</h3>
//               <p className="text-gray-300 mb-4">Learn how to exhibit, sell, and market your art in the global marketplace.</p>
//               <Link to="/courses/art-business" className="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center">
//                 Start Learning
//                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                 </svg>
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-blue-900">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold mb-6"
//             data-aos="fade-up"
//           >
//             Ready to Join the Global Art Movement?
//           </motion.h2>
          
//           <motion.p 
//             className="text-xl text-gray-200 mb-10"
//             data-aos="fade-up"
//             data-aos-delay="100"
//           >
//             Connect with thousands of artists, educators, and art lovers worldwide
//           </motion.p>
          
//           <motion.div
//             className="flex flex-col sm:flex-row justify-center gap-4"
//             data-aos="fade-up"
//             data-aos-delay="200"
//           >
//             <Link to="/signup">
//               <motion.button
//                 className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Create Free Account
//               </motion.button>
//             </Link>
            
//             <Link to="/explore">
//               <motion.button
//                 className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Explore Without Signing Up
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Connecting;







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
