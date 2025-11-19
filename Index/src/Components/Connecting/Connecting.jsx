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

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FiUsers } from "react-icons/fi";
// import { useState } from "react";

// const Gateway = ({ viewMode = "feed" }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const communities = [
//     {
//       id: 1,
//       name: "Artisan Collective",
//       type: "Traditional Artists",
//       members: "12.4K",
//       active: "2.3K",
//       tags: ["Painting", "Sculpture"],
//       icon: "🎨",
//     },
//     {
//       id: 2,
//       name: "Digital Creators",
//       type: "Digital Artists",
//       members: "8.7K",
//       active: "1.8K",
//       tags: ["UI/UX", "3D"],
//       icon: "🖥️",
//     },
//     {
//       id: 3,
//       name: "Lens Masters",
//       type: "Photography",
//       members: "15.2K",
//       active: "3.1K",
//       tags: ["Portrait", "Street"],
//       icon: "📷",
//     },
//   ];

//   if (viewMode === "feed") {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 8, scale: 0.98 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="
//           border border-zinc-300/40 dark:border-zinc-700/40
//           rounded-xl p-5
//           bg-white/70 dark:bg-zinc-900/60
//           backdrop-blur-sm
//           shadow-sm hover:shadow-md
//           transition-all
//         "
//       >
//         {/* ================= HEADER ================= */}
//         <div className="flex items-center gap-3 mb-5">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="
//               w-11 h-11 rounded-lg
//               border border-zinc-300 dark:border-zinc-700
//               flex items-center justify-center
//               bg-white/60 dark:bg-zinc-800/40
//             "
//           >
//             <FiUsers className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
//           </motion.div>

//           <div className="flex-1">
//             <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
//               Creative Communities
//             </h3>
//             <p className="text-xs text-zinc-600 dark:text-zinc-400">
//               Join groups of artists & creators
//             </p>
//           </div>
//         </div>

//         {/* ================= SLIDER ================= */}
//         <div
//           className="
//             overflow-hidden rounded-lg 
//             border border-zinc-300/40 dark:border-zinc-700/40
//           "
//         >
//           <motion.div
//             className="flex"
//             animate={{ x: `-${currentSlide * 100}%` }}
//             transition={{ type: "spring", stiffness: 240, damping: 28 }}
//           >
//             {communities.map((c) => (
//               <div key={c.id} className="w-full flex-shrink-0 p-4">
//                 <motion.div
//                   whileHover={{ scale: 1.01 }}
//                   transition={{ duration: 0.2 }}
//                   className="
//                     border border-zinc-300/40 dark:border-zinc-700/40
//                     rounded-lg p-4 bg-white/70 dark:bg-zinc-900/60
//                     backdrop-blur-sm flex gap-4 shadow-sm
//                   "
//                 >
//                   {/* Icon */}
//                   <div
//                     className="
//                       w-12 h-12 rounded-lg
//                       border border-zinc-300 dark:border-zinc-700
//                       flex items-center justify-center text-2xl
//                       bg-white/60 dark:bg-zinc-800/40
//                     "
//                   >
//                     {c.icon}
//                   </div>

//                   {/* Info */}
//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
//                       {c.name}
//                     </h4>
//                     <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
//                       {c.type}
//                     </p>

//                     <div className="flex gap-3 mt-2 text-xs">
//                       <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
//                         <FiUsers className="w-3 h-3" /> {c.members}
//                       </span>
//                       <motion.span
//                         animate={{ opacity: [0.7, 1, 0.7] }}
//                         transition={{ repeat: Infinity, duration: 2 }}
//                         className="text-green-600 dark:text-green-400"
//                       >
//                         ● {c.active} online
//                       </motion.span>
//                     </div>

//                     <div className="flex gap-1 mt-2 flex-wrap">
//                       {c.tags.map((t, i) => (
//                         <span
//                           key={i}
//                           className="
//                             px-2 py-0.5 
//                             bg-zinc-100 dark:bg-zinc-800 
//                             text-zinc-600 dark:text-zinc-300 
//                             text-[10px] rounded-full
//                           "
//                         >
//                           #{t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* ================= INDICATORS ================= */}
//         <div className="flex justify-center mt-4 gap-1.5">
//           {communities.map((_, index) => (
//             <motion.button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               whileHover={{ scale: 1.2 }}
//               className={`
//                 h-1.5 rounded-full transition-all 
//                 ${currentSlide === index
//                   ? "bg-purple-500 w-4"
//                   : "bg-zinc-300 dark:bg-zinc-600 w-2"}
//               `}
//             />
//           ))}
//         </div>

//         {/* ================= BUTTONS ================= */}
//         <div className="grid grid-cols-2 gap-2 mt-5">
//           <Link to="/community">
//             <motion.button
//               whileTap={{ scale: 0.96 }}
//               className="
//                 w-full py-2 text-sm rounded-lg
//                 border border-purple-500/60
//                 text-purple-600 dark:text-purple-400
//                 hover:bg-purple-50 dark:hover:bg-purple-900/20
//                 transition
//               "
//             >
//               Explore
//             </motion.button>
//           </Link>

//           <Link to="/community/CreateCommunity">
//             <motion.button
//               whileTap={{ scale: 0.96 }}
//               className="
//                 w-full py-2 text-sm rounded-lg
//                 bg-purple-600 text-white
//                 hover:bg-purple-700
//               "
//             >
//               Create
//             </motion.button>
//           </Link>
//         </div>
//       </motion.div>
//     );
//   }

//   return null;
// };

// export default Gateway;
