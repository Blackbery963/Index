// import { useState, useEffect } from 'react';
// import React from 'react';
// import { motion,AnimatePresence } from 'framer-motion';

// const cards = [
//   {
//     title: "Connect & Collaborate",
//     image: "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg",
//     description: "Join a global network of artists to share ideas and create together.",
//     bgClass: "bg-teal-700 bg-opacity-30",
//   },
//   {
//     title: "Research & Teach",
//     image: "https://images.pexels.com/photos/941555/pexels-photo-941555.jpeg",
//     description: "Access resources to study, teach, and analyze art history and techniques.",
//     bgClass: "bg-indigo-700 bg-opacity-30",
//   },
//   {
//     title: "Publish & Inspire",
//     image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg",
//     description: "Share your research papers and inspire the global art community.",
//     bgClass: "bg-rose-700 bg-opacity-30 ",

//   },
// ];

// const Gateway = () => {
//   const [showFirst, setShowFirst] = useState(true);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowFirst(prev => !prev);
//     }, 3000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, []);
  
//   return (
//     <div className="relative max-w-[95%] mx-auto min-h-screen bg-gray-100 w-full rounded-lg overflow-hidden shadow-2xl">
//       {/* Background */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center brightness-100"
//         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
//       />

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-left min-h-screen px-4 py-16 sm:px-6 md:px-20 md:py-32 text-white overflow-y-auto">
//         {/* Heading */}
//         <h1 className='text-xl text-black absolute top-2 right-2 font-Playfair'>Coming Soon...</h1>
//          <AnimatePresence mode="wait">
//         {showFirst ? (
//           <motion.h1
//             key="heading1"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-xl text-center font-Quicksand"
//           >
//            Small Steps, <br className="hidden md:block" />
//           <span className="text-green-200">Big Art Impact</span> 
//           </motion.h1>
//         ) : (
//           <motion.h1
//             key="heading2"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-xl text-center font-Quicksand"
//           >
//             Connecting Hearts <br className="hidden md:block" />
//           <span className="text-green-200">Through Art</span> 
//           </motion.h1>
//         )}
//       </AnimatePresence>

//         {/* Subheading */}
//         <motion.p 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 1 }}
//           className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl dark:text-gray-200 text-gray-900  font-light text-center font-Playfair"
//         >
//           Every small step you take today creates a ripple of positive change for the art world’s future.
//         </motion.p>

//         {/* Button */}
//         <div className='flex gap-2 md:flex-row flex-col items-center justify-center'>
//           <motion.button 
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="mt-8 px-6 py-3 bg-green-700 bg-opacity-30 border border-white text-white rounded-full backdrop-blur-md shadow-lg hover:bg-green-900 transition duration-300"
//         >
//           Explore Global Hub
//         </motion.button>
//         <motion.button 
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="mt-8 px-6 py-3 bg-green-700 bg-opacity-30 border border-white text-white rounded-full backdrop-blur-md shadow-lg hover:bg-green-900 transition duration-300"
//         >
//           Join Community
//         </motion.button>
//         </div>
      
//         {/* Cards */}
//         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-2 sm:px-4">
//           {cards.map((card, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 + i * 0.2, duration: 0.6 }}
//               className={` ${card.bgClass} border border-white border-opacity-20 backdrop-blur-lg p-6 rounded-br-[20%] rounded-tl-[20%] shadow-xl flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 `}
//             >
//               <div
//                 className="w-28 h-20 sm:w-32 sm:h-24 rounded-2xl bg-cover bg-center mb-4 border-2 border-white shadow-inner"
//                 style={{ backgroundImage: `url(${card.image})` }}
//               ></div>
//               <h3 className="text-lg sm:text-xl font-semibold text-green-100 drop-shadow font-Quicksand">{card.title}</h3>
//               <p className="mt-2 text-gray-200 text-sm sm:text-base font-light font-Playfair">{card.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gateway;


// import { motion } from 'framer-motion';

// const Gateway = () => {
//   const features = [
//     {
//       title: "Connect & Collaborate",
//       description: "Join a global network of artists",
//       icon: "👥"
//     },
//     {
//       title: "Learn & Grow",
//       description: "Access educational resources",
//       icon: "📚"
//     },
//     {
//       title: "Share & Inspire",
//       description: "Publish your creative work",
//       icon: "✨"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
//       {/* Main Content */}
//       <div className="max-w-4xl w-full text-center">
//         {/* Heading */}
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4"
//         >
//           Welcome to Our <span className="font-medium text-blue-600 dark:text-blue-400">Art Community</span>
//         </motion.h1>

//         {/* Subheading */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
//         >
//           Connect with artists worldwide and grow together
//         </motion.p>

//         {/* Buttons */}
//         <motion.div 
//           className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//         >
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//           >
//             Enter Community
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
//           >
//             Learn More
//           </motion.button>
//         </motion.div>

//         {/* Features */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {features.map((feature, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
//               className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
//             >
//               <div className="text-3xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{feature.title}</h3>
//               <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gateway;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image1 from './images/pexels-photo-33125538.jpeg'
import image2 from './images/pexels-photo-20514931_11zon.jpeg'
import image3 from './images/pexels-squaredesign-253905.jpg'
import image4 from './images/pexels-photo-3768894.jpeg'
import image5 from './images/pexels-photo-6932067_11zon.jpeg'
import image6 from './images/pexels-photo-712513.jpeg'

const communities = [
  {
    name: "Artisan Collective",
    type: "Traditional Artists",
    icon: "🎨",
    members: "12.4K",
    color: "from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20",
    image: image1
  },
  {
    name: "Digital Creators",
    type: "Digital Artists",
    icon: "🖥️",
    members: "8.7K",
    color: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20",
    image: image2
  },
  {
    name: "Lens Masters",
    type: "Photographers",
    icon: "📷",
    members: "15.2K",
    color: "from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20",
    image: image3
  },
  {
    name: "Brush & Beyond",
    type: "Contemporary Painters",
    icon: "🎨",
    members: "22.1K",
    color: "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20",
    image: image4
  },
  {
    name: "Pixel Crafters",
    type: "Digital Artists",
    icon: "🖌️",
    members: "13.9K",
    color: "from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20",
    image: image5
  },
  {
    name: "Inked Impressions",
    type: "Illustrators & Sketch Artists",
    icon: "✒️",
    members: "9.3K",
    color: "from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20",
    image: image6
  },
];

const features = [
  {
    title: "Collaborate",
    description: "Work together on projects and share ideas.",
    icon: "🤝",
    color: "bg-green-100 dark:bg-green-900/20"
  },
  {
    title: "Learn",
    description: "Access workshops and tutorials.",
    icon: "📚",
    color: "bg-indigo-100 dark:bg-indigo-900/20"
  },
  {
    title: "Connect",
    description: "Network with artists worldwide.",
    icon: "🌐",
    color: "bg-yellow-100 dark:bg-yellow-900/20"
  }
];

const Gateway = () => {
  return (
    <div className="min-h-screen bg-gray-50 max-w-[95%] mx-auto rounded-xl dark:bg-[#0a0f14] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-100/20 blur-3xl dark:bg-purple-900/10"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl w-full z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-Quicksand">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Creative Network</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with artists who share your passion and grow together
          </p>
        </motion.div>

        {/* Community Cards */}
        
        <motion.div
  className="space-y-6 mb-16"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.6 }}
>
  {/* Horizontal scroll on small screens */}
  <div className="flex overflow-x-auto gap-6 px-1 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 hide-scrollbar">
    {communities.map((community, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group min-w-[85%] sm:min-w-0 h-48 relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all shrink-0 sm:shrink"
      >
        <div className="absolute inset-0 bg-gradient-to-br opacity-90 dark:opacity-70 z-0">
          <img 
            src={community.image} 
            alt={community.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b ${community.color} opacity-80 dark:opacity-70 z-0`}></div>
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{community.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{community.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{community.type}</p>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {community.members} members
              </span>
              <button className="px-3 py-1 text-xs bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full hover:bg-white transition-all">
                Join →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

        <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-center pt-10"
        >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            Ready to connect with fellow artists?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
              >
                Explore All Communities
              </motion.button>
            </Link>
            <Link to="/community/CreateCommunity">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all font-medium"
              >
                Start Your Own
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gateway;



// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// // import sampleImage from '../../assets/sample-community.jpg'; // Replace with actual paths or import dynamically if needed

// const communities = [
//   {
//     name: "Artisan Collective",
//     type: "Traditional Artists",
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     members: "12.4K",
//     color: "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
//   },
//   {
//     name: "Digital Creators",
//     type: "Digital Artists",
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     members: "8.7K",
//     color: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
//   },
//   {
//     name: "Lens Masters",
//     type: "Photographers",
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     members: "15.2K",
//     color: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
//   },
// ];

// const features = [
//   {
//     title: "Collaborate",
//     description: "Team up with artists from around the globe to bring your visions to life.",
//     icon: "🤝",
//   },
//   {
//     title: "Showcase",
//     description: "Get featured in our spotlight gallery and reach a global audience.",
//     icon: "🌍",
//   },
// ];

// const Gateway = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
//           Find Your <span className="text-blue-600 dark:text-blue-400">Creative Tribe</span>
//         </h1>
//         <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//           Connect with like-minded artists, build your dream collaborations, and grow together.
//         </p>
//       </motion.div>

//       {/* Communities */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//       >
//         {communities.map((community, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ y: -6, scale: 1.02 }}
//             transition={{ type: 'spring', stiffness: 300 }}
//             className={`rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800 bg-gradient-to-br ${community.color}`}
//           >
//             <img src={community.image} alt={community.name} className="h-40 w-full object-cover" />
//             <div className="p-5">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{community.name}</h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{community.type}</p>
//               <p className="text-xs text-gray-400 mt-2">{community.members} members</p>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Features */}
      // <motion.div
      //   className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full"
      //   initial={{ opacity: 0, y: 20 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ delay: 0.4, duration: 0.5 }}
      // >
      //   {features.map((feature, i) => (
      //     <div
      //       key={i}
      //       className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all"
      //     >
      //       <div className="flex items-start gap-4">
      //         <div className="text-3xl">{feature.icon}</div>
      //         <div>
      //           <h4 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h4>
      //           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
      //         </div>
      //       </div>
      //     </div>
      //   ))}
      // </motion.div>

//       {/* CTA Buttons */}
//       <motion.div
//         className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 0.5 }}
//       >
//         <Link to="/community">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all font-semibold text-sm sm:text-base"
//           >
//             Explore All Communities
//           </motion.button>
//         </Link>
//         <Link to="/create-community">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold text-sm sm:text-base"
//           >
//             Create Your Own
//           </motion.button>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default Gateway;
