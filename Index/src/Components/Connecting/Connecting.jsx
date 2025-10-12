// // import { motion } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import image1 from './images/pexels-photo-33125538.jpeg'
// // import image2 from './images/pexels-photo-20514931_11zon.jpeg'
// // import image3 from './images/pexels-squaredesign-253905.jpg'
// // import image4 from './images/pexels-photo-3768894.jpeg'
// // import image5 from './images/pexels-photo-6932067_11zon.jpeg'
// // import image6 from './images/pexels-photo-712513.jpeg'

// // const communities = [
// //   {
// //     name: "Artisan Collective",
// //     type: "Traditional Artists",
// //     icon: "🎨",
// //     members: "12.4K",
// //     color: "from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20",
// //     image: image1
// //   },
// //   {
// //     name: "Digital Creators",
// //     type: "Digital Artists",
// //     icon: "🖥️",
// //     members: "8.7K",
// //     color: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20",
// //     image: image2
// //   },
// //   {
// //     name: "Lens Masters",
// //     type: "Photographers",
// //     icon: "📷",
// //     members: "15.2K",
// //     color: "from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20",
// //     image: image3
// //   },
// //   {
// //     name: "Brush & Beyond",
// //     type: "Contemporary Painters",
// //     icon: "🎨",
// //     members: "22.1K",
// //     color: "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20",
// //     image: image4
// //   },
// //   {
// //     name: "Pixel Crafters",
// //     type: "Digital Artists",
// //     icon: "🖌️",
// //     members: "13.9K",
// //     color: "from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20",
// //     image: image5
// //   },
// //   {
// //     name: "Inked Impressions",
// //     type: "Illustrators & Sketch Artists",
// //     icon: "✒️",
// //     members: "9.3K",
// //     color: "from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20",
// //     image: image6
// //   },
// // ];

// // const features = [
// //   {
// //     title: "Collaborate",
// //     description: "Work together on projects and share ideas.",
// //     icon: "🤝",
// //     color: "bg-green-100 dark:bg-green-900/20"
// //   },
// //   {
// //     title: "Learn",
// //     description: "Access workshops and tutorials.",
// //     icon: "📚",
// //     color: "bg-indigo-100 dark:bg-indigo-900/20"
// //   },
// //   {
// //     title: "Connect",
// //     description: "Network with artists worldwide.",
// //     icon: "🌐",
// //     color: "bg-yellow-100 dark:bg-yellow-900/20"
// //   }
// // ];

// // const Gateway = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-50 xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto rounded-xl dark:bg-[#0a0f14] flex flex-col items-center justify-center p-4 sm:p-6">
// //       {/* Decorative Background Elements */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10"></div>
// //         <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-100/20 blur-3xl dark:bg-purple-900/10"></div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="relative max-w-6xl w-full z-10">
// //         {/* Header */}
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //           className="mb-12 text-center"
// //         >
// //           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-Quicksand">
// //             Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Creative Network</span>
// //           </h1>
// //           <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
// //             Connect with artists who share your passion and grow together
// //           </p>
// //         </motion.div>

// //         {/* Community Cards */}
        
// //         <motion.div
// //   className="space-y-6 mb-16"
// //   initial={{ opacity: 0 }}
// //   animate={{ opacity: 1 }}
// //   transition={{ delay: 0.3, duration: 0.6 }}
// // >
// //   {/* Horizontal scroll on small screens */}
// //   <div className="flex overflow-x-auto gap-6 px-1 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 hide-scrollbar">
// //     {communities.map((community, i) => (
// //       <motion.div
// //         key={i}
// //         whileHover={{ y: -5 }}
// //         transition={{ type: "spring", stiffness: 300 }}
// //         className="group min-w-[85%] sm:min-w-0 h-48 relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all shrink-0 sm:shrink"
// //       >
// //         <div className="absolute inset-0 bg-gradient-to-br opacity-90 dark:opacity-70 z-0">
// //           <img 
// //             src={community.image} 
// //             alt={community.name}
// //             className="w-full h-full object-cover"
// //           />
// //         </div>
// //         <div className={`absolute inset-0 bg-gradient-to-b ${community.color} opacity-80 dark:opacity-70 z-0`}></div>
// //         <div className="relative z-10 p-6 h-full flex flex-col">
// //           <div className="flex items-center gap-3 mb-4">
// //             <span className="text-3xl">{community.icon}</span>
// //             <div>
// //               <h3 className="text-xl font-bold text-gray-900 dark:text-white">{community.name}</h3>
// //               <p className="text-sm text-gray-700 dark:text-gray-300">{community.type}</p>
// //             </div>
// //           </div>
// //           <div className="mt-auto">
// //             <div className="flex justify-between items-center">
// //               <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
// //                 {community.members} members
// //               </span>
// //               <button className="px-3 py-1 text-xs bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full hover:bg-white transition-all">
// //                 Join →
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     ))}
// //   </div>
// // </motion.div>

// //         <motion.div
// //         className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.4, duration: 0.5 }}
// //       >
// //         {features.map((feature, i) => (
// //           <div
// //             key={i}
// //             className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all"
// //           >
// //             <div className="flex items-start gap-4">
// //               <div className="text-3xl">{feature.icon}</div>
// //               <div>
// //                 <h4 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h4>
// //                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </motion.div>

// //         {/* CTA Section */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.9, duration: 0.6 }}
// //           className="text-center pt-10"
// //         >
// //           <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
// //             Ready to connect with fellow artists?
// //           </h3>
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link to="/community">
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
// //               >
// //                 Explore All Communities
// //               </motion.button>
// //             </Link>
// //             <Link to="/community/CreateCommunity">
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all font-medium"
// //               >
// //                 Start Your Own
// //               </motion.button>
// //             </Link>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Gateway;


// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiUsers, FiPlus, FiArrowRight } from 'react-icons/fi';

// const Gateway = ({ viewMode = 'feed', onCommunityAction }) => {
//   const communities = [
//     {
//       id: 1,
//       name: "Artisan Collective",
//       type: "Traditional Artists",
//       icon: "🎨",
//       members: "12.4K",
//       color: "from-amber-500 to-orange-500",
//       image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=300&fit=crop"
//     },
//     {
//       id: 2,
//       name: "Digital Creators",
//       type: "Digital Artists",
//       icon: "🖥️",
//       members: "8.7K",
//       color: "from-blue-500 to-cyan-500",
//       image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"
//     },
//     {
//       id: 3,
//       name: "Lens Masters",
//       type: "Photographers",
//       icon: "📷",
//       members: "15.2K",
//       color: "from-purple-500 to-pink-500",
//       image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
//     },
//   ];

//   const features = [
//     {
//       title: "Collaborate",
//       description: "Work together on projects and share ideas.",
//       icon: "🤝",
//       color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
//     },
//     {
//       title: "Learn",
//       description: "Access workshops and tutorials.",
//       icon: "📚",
//       color: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
//     },
//     {
//       title: "Connect",
//       description: "Network with artists worldwide.",
//       icon: "🌐",
//       color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
//     }
//   ];

//   // Compact version for feed integration
//   if (viewMode === 'feed' || viewMode === 'collage') {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/10 rounded-sm p-6 shadow-lg border border-purple-200 dark:border-purple-800/30"
//       >
//         <div className="flex items-start gap-4 mb-4">
//           <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//             <FiUsers className="w-6 h-6 text-white" />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
//               Creative Communities
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               Join artists who share your passion
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3 mb-4">
//           {communities.map((community) => (
//             <div key={community.id} className="text-center group cursor-pointer">
//               <div className="relative w-16 h-16 mx-auto mb-2">
//                 <div className={`w-full h-full rounded-xl bg-gradient-to-r ${community.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform`}>
//                   {community.icon}
//                 </div>
//               </div>
//               <h4 className="text-xs font-medium text-gray-900 dark:text-white line-clamp-1 mb-1">
//                 {community.name.split(' ')[0]}
//               </h4>
//               <p className="text-xs text-gray-600 dark:text-gray-400">
//                 {community.members}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-2">
//           <Link to="/community" className="flex-1">
//             <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
//               <FiUsers className="w-4 h-4" />
//               Explore
//             </button>
//           </Link>
//           <Link to="/community/CreateCommunity" className="flex-1">
//             <button className="w-full py-2 border border-purple-500 text-purple-500 dark:text-purple-400 text-sm font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-2">
//               <FiPlus className="w-4 h-4" />
//               Create
//             </button>
//           </Link>
//         </div>
//       </motion.div>
//     );
//   }

//   // Full version for standalone use
//   return (
//     <div className="min-h-screen bg-gray-50 xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto rounded-xl dark:bg-[#0a0f14] flex flex-col items-center justify-center p-4 sm:p-6">
//       {/* Decorative Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10"></div>
//         <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-100/20 blur-3xl dark:bg-purple-900/10"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative max-w-6xl w-full z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-12 text-center"
//         >
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//             Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Creative Network</span>
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Connect with artists who share your passion and grow together
//           </p>
//         </motion.div>

//         {/* Community Cards */}
//         <motion.div
//           className="space-y-6 mb-16"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {communities.map((community, i) => (
//               <motion.div
//                 key={community.id}
//                 whileHover={{ y: -5 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="group h-48 relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all"
//               >
//                 <div className="absolute inset-0 z-0">
//                   <img 
//                     src={community.image} 
//                     alt={community.name}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className={`absolute inset-0 bg-gradient-to-r ${community.color} opacity-80`}></div>
//                 </div>
//                 <div className="relative z-10 p-6 h-full flex flex-col justify-between">
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl">{community.icon}</span>
//                     <div>
//                       <h3 className="text-xl font-bold text-white">{community.name}</h3>
//                       <p className="text-sm text-white/90">{community.type}</p>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium text-white/90 flex items-center gap-1">
//                       <FiUsers className="w-4 h-4" />
//                       {community.members} members
//                     </span>
//                     <button className="px-3 py-1 text-xs bg-white/20 backdrop-blur-lg text-white rounded-full hover:bg-white/30 transition-all border border-white/30">
//                       Join <FiArrowRight className="inline ml-1" />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Features */}
//         <motion.div
//           className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//         >
//           {features.map((feature, i) => (
//             <div
//               key={i}
//               className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="text-2xl">{feature.icon}</div>
//                 <div>
//                   <h4 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h4>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.9, duration: 0.6 }}
//           className="text-center pt-10"
//         >
//           <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
//             Ready to connect with fellow artists?
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/community">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium flex items-center gap-2"
//               >
//                 <FiUsers className="w-5 h-5" />
//                 Explore All Communities
//               </motion.button>
//             </Link>
//             <Link to="/community/CreateCommunity">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all font-medium flex items-center gap-2"
//               >
//                 <FiPlus className="w-5 h-5" />
//                 Start Your Own
//               </motion.button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Gateway;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiPlus, FiArrowRight, FiMessageCircle, FiHeart } from 'react-icons/fi';
import { useState, useRef } from 'react';

const Gateway = ({ viewMode = 'feed', onCommunityAction }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const communities = [
    {
      id: 1,
      name: "Artisan Collective",
      type: "Traditional Artists",
      description: "Mastering classical techniques in painting, sculpture, and traditional mediums",
      icon: "🎨",
      members: "12.4K",
      activeMembers: "2.3K online",
      posts: "45.2K",
      color: "from-amber-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=300&fit=crop",
      tags: ["Painting", "Sculpture", "Traditional", "Classical"],
      featuredPost: "Weekly life drawing session every Saturday"
    },
    {
      id: 2,
      name: "Digital Creators",
      type: "Digital Artists & Designers",
      description: "Exploring digital art, graphic design, and creative technology",
      icon: "🖥️",
      members: "8.7K",
      activeMembers: "1.8K online",
      posts: "38.7K",
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      tags: ["Digital Art", "UI/UX", "3D Modeling", "Animation"],
      featuredPost: "New Figma workshop starting next week"
    },
    {
      id: 3,
      name: "Lens Masters",
      type: "Photography Community",
      description: "Capturing moments, telling stories through photography",
      icon: "📷",
      members: "15.2K",
      activeMembers: "3.1K online",
      posts: "67.8K",
      color: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["Portrait", "Landscape", "Street", "Wildlife"],
      featuredPost: "Monthly photo challenge: Urban Architecture"
    },
  ];

  const features = [
    {
      title: "Collaborate",
      description: "Work together on projects and share ideas in real-time",
      icon: "🤝",
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      title: "Learn & Grow",
      description: "Access workshops, tutorials, and mentorship programs",
      icon: "📚",
      color: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
    },
    {
      title: "Connect Globally",
      description: "Network with artists worldwide and build your career",
      icon: "🌐",
      color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(communities.length, 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(communities.length, 3)) % Math.min(communities.length, 3));
  };

  // Compact version for feed integration
  if (viewMode === 'feed' || viewMode === 'collage') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/10 rounded-sm p-6 shadow-lg border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <FiUsers className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Creative Communities
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Join specialized groups of artists and creators
            </p>
          </div>
        </div>

        {/* Community Slider */}
        <div className="relative mb-6">
          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {communities.slice(0, 3).map((community) => (
                <div key={community.id} className="w-full flex-shrink-0">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${community.color} flex items-center justify-center text-white text-lg shadow-lg`}>
                        {community.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                          {community.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                          {community.type}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <FiUsers className="w-3 h-3" />
                            {community.members}
                          </span>
                          <span className="text-xs text-green-500 dark:text-green-400 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {community.activeMembers.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {community.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {community.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <FiUsers className="w-4 h-4" />
                      Join Community
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slider Controls */}
          {communities.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {communities.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-purple-500 w-4' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link to="/community" className="flex-1">
            <button className="w-full py-2 bg-white dark:bg-gray-800 border border-purple-500 text-purple-500 dark:text-purple-400 text-sm font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all flex items-center justify-center gap-2">
              <FiUsers className="w-4 h-4" />
              Explore All
            </button>
          </Link>
          <Link to="/community/CreateCommunity" className="flex-1">
            <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <FiPlus className="w-4 h-4" />
              Create New
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Full version for standalone use
  return (
    <div className="min-h-screen bg-gray-50 xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto rounded-xl dark:bg-[#0a0f14] flex flex-col items-center justify-center p-4 sm:p-6">
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
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Creative Network</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with specialized communities of artists, share your work, and grow together
          </p>
        </motion.div>

        {/* Featured Communities */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Communities
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              ref={sliderRef}
            >
              {communities.map((community) => (
                <div key={community.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${community.color} opacity-90`}></div>
                      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">{community.icon}</span>
                            <div>
                              <h3 className="text-3xl font-bold text-white">{community.name}</h3>
                              <p className="text-white/90">{community.type}</p>
                            </div>
                          </div>
                          <p className="text-white/90 text-lg mb-4">
                            {community.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {community.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-lg text-white rounded-full text-sm border border-white/30">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Community Stats
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <FiUsers className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{community.members}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <FiMessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{community.posts}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Featured Activity
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                            {community.featuredPost}
                          </p>
                        </div>
                        
                        <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                          <FiUsers className="w-5 h-5" />
                          Join {community.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {communities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-purple-500 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
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
          className="text-center pt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Find Your Creative Tribe?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of artists, designers, and creators who are already sharing, learning, and growing together in our vibrant communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-semibold flex items-center gap-3"
              >
                <FiUsers className="w-5 h-5" />
                Explore All Communities
              </motion.button>
            </Link>
            <Link to="/community/CreateCommunity">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-purple-500 text-purple-500 dark:text-purple-400 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all font-semibold flex items-center gap-3"
              >
                <FiPlus className="w-5 h-5" />
                Start Your Own Community
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gateway;