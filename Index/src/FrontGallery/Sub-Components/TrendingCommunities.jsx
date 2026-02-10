// import React from 'react';
// import { motion } from 'framer-motion';
// import { Users, ArrowRight, Plus } from 'lucide-react';

// const MOCK_COMMUNITIES = [
//   {
//     id: 'c1',
//     name: "Abstract Flow",
//     members: "12.5k",
//     image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=500",
//     color: "from-purple-500 to-indigo-500"
//   },
//   {
//     id: 'c2',
//     name: "Digital Noir",
//     members: "8.2k",
//     image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500",
//     color: "from-gray-700 to-black"
//   },
//   {
//     id: 'c3',
//     name: "Plein Air Pros",
//     members: "5.1k",
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?auto=format&fit=crop&q=80&w=500",
//     color: "from-green-500 to-emerald-600"
//   },
//   {
//     id: 'c4',
//     name: "Character Design",
//     members: "22k",
//     image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=500",
//     color: "from-orange-500 to-red-500"
//   },
//   {
//     id: 'c5',
//     name: "Oil Mastery",
//     members: "4.3k",
//     image: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?auto=format&fit=crop&q=80&w=500",
//     color: "from-amber-700 to-yellow-600"
//   }
// ];

// const TrendingCommunities = () => {
//   return (
//     <div className="w-full py-6 mb-8 px-1">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4 px-1">
//         <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-2">
//           <Users size={16} /> Trending Communities
//         </h3>
//         <button className="text-xs font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1">
//           See All <ArrowRight size={12} />
//         </button>
//       </div>

//       {/* Horizontal Scroll Container */}
//       <div 
//         className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for clean look
//       >
//         {MOCK_COMMUNITIES.map((community, index) => (
//           <motion.div
//             key={community.id}
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className="relative flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden cursor-pointer group snap-center"
//           >
//             {/* Background Image */}
//             <img 
//               src={community.image} 
//               alt={community.name} 
//               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
            
//             {/* Gradient Overlay */}
//             <div className={`absolute inset-0 bg-gradient-to-br ${community.color} opacity-80 mix-blend-multiply transition-opacity group-hover:opacity-90`} />
//             <div className="absolute inset-0 bg-black/20" />

//             {/* Content */}
//             <div className="absolute inset-0 p-4 flex flex-col justify-between">
//               <div className="flex justify-between items-start">
//                  <span className="bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/10">
//                     {community.members} Members
//                  </span>
//               </div>

//               <div>
//                 <h4 className="text-white font-bold text-lg leading-tight shadow-black drop-shadow-md">
//                   {community.name}
//                 </h4>
//                 <button className="mt-2 text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-full flex items-center gap-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
//                   <Plus size={12} /> Join
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendingCommunities;

import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';

const MOCK_COMMUNITIES = [
  {
    id: 'c1',
    name: "Abstract Flow",
    description: "Modern abstract composition.",
    members: "12.5k",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    memberPreviews: ["https://i.pravatar.cc/100?img=1", "https://i.pravatar.cc/100?img=2", "https://i.pravatar.cc/100?img=3"]
  },
  {
    id: 'c2',
    name: "Digital Noir",
    description: "Moody digital photography.",
    members: "8.2k",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    avatar: "https://images.unsplash.com/photo-1607992922515-7e38329e65d4?auto=format&fit=crop&q=80&w=150",
    memberPreviews: ["https://i.pravatar.cc/100?img=4", "https://i.pravatar.cc/100?img=5", "https://i.pravatar.cc/100?img=6"]
  },

  {
    id: 'c3',
    name: "Himalayan Trekkers",
    description: "Stories from the peaks.",
    members: "22k",
    coverImage: "https://images.unsplash.com/photo-1502429892517-5b7a65099d39?auto=format&fit=crop&q=80&w=600",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150",
    memberPreviews: ["https://i.pravatar.cc/100?img=7", "https://i.pravatar.cc/100?img=8", "https://i.pravatar.cc/100?img=9"]
  },
  
  {
    id: 'c4',
    name: "Character Design",
    description: "Weekly art challenges.",
    members: "5.1k",
    coverImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=150",
    memberPreviews: ["https://i.pravatar.cc/100?img=10", "https://i.pravatar.cc/100?img=11", "https://i.pravatar.cc/100?img=12"]
  }
];

const TrendingCommunities = () => {
  return (
    <div className="w-full py-8 px-1 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <Users className="text-blue-500" size={20} /> Trending Communities
        </h3>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
          See All <ArrowRight size={14} />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MOCK_COMMUNITIES.map((community, index) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            // CARD CONTAINER: Fixed width 360px, Height auto (approx 215px)
            className="relative flex-shrink-0 w-[360px] dark:bg-gradient-to-tl dark:from-slate-800 dark:to-gray-900 bg-gradient-to-tl from-slate-400 to-zinc-600 rounded-xl overflow-hidden snap-center border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            
            {/* 1. Compact Banner (80px height) */}
            <div className="h-24 w-full relative overflow-hidden">
                <img 
                  src={community.coverImage} 
                  alt="cover"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* 2. Avatar (Smaller: w-14) */}
            {/* Positioned to overlap banner and content perfectly */}
            <div className="absolute top-16 left-4 z-10">
                <img 
                    src={community.avatar} 
                    alt="avatar" 
                    className="w-14 h-14 rounded-xl border-[3px] border-white dark:border-zinc-800 object-cover shadow-sm"
                />
            </div>

            {/* 3. Join Button (Moved to top-right of content area to save vertical space) */}
            <div className="absolute top-28 right-4 z-10">
                 <button className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 text-xs font-bold rounded-full border border-zinc-200 dark:border-zinc-600 transition-colors">
                  Join
                </button>
            </div>

            {/* 4. Bottom Content (Tight padding) */}
            <div className="px-4 pt-8 pb-3 bg-zinc-50 dark:bg-zinc-800/50 h-[135px] flex flex-col justify-between">
              
              {/* Title & Desc */}
              <div className="mt-1">
                <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 leading-none truncate max-w-[200px]">
                  {community.name}
                </h4>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {community.description}
                </p>
              </div>

              {/* Footer: Stats & Stack */}
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-700/50">
                 <span className="font-bold text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-700 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-600">
                    {community.members}
                 </span>
                 
                 {/* Avatar Stack */}
                 <div className="flex -space-x-2">
                    {community.memberPreviews.map((previewUrl, i) => (
                        <img 
                            key={i}
                            src={previewUrl} 
                            alt="member"
                            className="w-5 h-5 rounded-full border border-white dark:border-zinc-800"
                        />
                    ))}
                    <div className="w-5 h-5 rounded-full border border-white dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-[8px] text-zinc-500">
                        +
                    </div>
                 </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCommunities;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { Users, ArrowRight } from 'lucide-react';

// const MOCK_COMMUNITIES = [
//   {
//     id: 'c1',
//     name: "Abstract Flow",
//     description: "Modern abstract composition.",
//     members: "12.5k",
//     coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
//     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
//     memberPreviews: ["https://i.pravatar.cc/100?img=1", "https://i.pravatar.cc/100?img=2", "https://i.pravatar.cc/100?img=3"],
//     // Purple/Indigo Theme
//     lightGradient: "bg-gradient-to-br from-indigo-50 to-purple-100",
//     darkGradient: "dark:from-indigo-900/40 dark:to-purple-900/20"
//   },
//   {
//     id: 'c2',
//     name: "Digital Noir",
//     description: "Moody digital photography.",
//     members: "8.2k",
//     coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
//     avatar: "https://images.unsplash.com/photo-1607992922515-7e38329e65d4?auto=format&fit=crop&q=80&w=150",
//     memberPreviews: ["https://i.pravatar.cc/100?img=4", "https://i.pravatar.cc/100?img=5", "https://i.pravatar.cc/100?img=6"],
//     // Gray/Slate Theme
//     lightGradient: "bg-gradient-to-br from-slate-100 to-zinc-200",
//     darkGradient: "dark:from-zinc-800 dark:to-slate-900"
//   },
//   {
//     id: 'c3',
//     name: "Himalayan Trekkers",
//     description: "Stories from the peaks.",
//     members: "22k",
//     coverImage: "https://images.unsplash.com/photo-1502429892517-5b7a65099d39?auto=format&fit=crop&q=80&w=600",
//     avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150",
//     memberPreviews: ["https://i.pravatar.cc/100?img=7", "https://i.pravatar.cc/100?img=8", "https://i.pravatar.cc/100?img=9"],
//     // Emerald/Teal Theme
//     lightGradient: "bg-gradient-to-br from-emerald-50 to-teal-100",
//     darkGradient: "dark:from-emerald-900/30 dark:to-teal-900/20"
//   },
//   {
//     id: 'c4',
//     name: "Character Design",
//     description: "Weekly art challenges.",
//     members: "5.1k",
//     coverImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600",
//     avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=150",
//     memberPreviews: ["https://i.pravatar.cc/100?img=10", "https://i.pravatar.cc/100?img=11", "https://i.pravatar.cc/100?img=12"],
//     // Orange/Amber Theme
//     lightGradient: "bg-gradient-to-br from-orange-50 to-amber-100",
//     darkGradient: "dark:from-orange-900/30 dark:to-amber-900/20"
//   }
// ];

// const TrendingCommunities = () => {
//   return (
//     <div className="w-full py-8 px-1">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4 px-2">
//         <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
//           <Users className="text-blue-500" size={20} /> Trending Communities
//         </h3>
//         <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
//           See All <ArrowRight size={14} />
//         </button>
//       </div>

//       {/* Horizontal Scroll Container */}
//       <div 
//         className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory hide-scrollbar"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         {MOCK_COMMUNITIES.map((community, index) => (
//           <motion.div
//             key={community.id}
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className={`
//               relative flex-shrink-0 w-[360px] 
//               rounded-xl overflow-hidden snap-center 
//               border border-zinc-200 dark:border-zinc-700 
//               shadow-sm hover:shadow-md transition-all duration-300 group
//               /* Applying the dynamic gradients here */
//               ${community.lightGradient} ${community.darkGradient}
//               dark:bg-zinc-800 /* Fallback dark bg */
//             `}
//           >
            
//             {/* 1. Compact Banner */}
//             <div className="h-24 w-full relative overflow-hidden">
//                 <img 
//                   src={community.coverImage} 
//                   alt="cover"
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black/10" />
//             </div>

//             {/* 2. Avatar */}
//             <div className="absolute top-16 left-4 z-10">
//                 <img 
//                     src={community.avatar} 
//                     alt="avatar" 
//                     className="w-14 h-14 rounded-xl border-[3px] border-white dark:border-zinc-800 object-cover shadow-sm"
//                 />
//             </div>

//             {/* 3. Join Button */}
//             <div className="absolute top-28 right-4 z-10">
//                  <button className="px-4 py-1.5 bg-white/80 dark:bg-zinc-700/80 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 text-xs font-bold rounded-full border border-zinc-200 dark:border-zinc-600 transition-colors shadow-sm">
//                   Join
//                 </button>
//             </div>

//             {/* 4. Bottom Content */}
//             {/* Added bg-white/40 backdrop blur to blend the content area nicely with the gradient background */}
//             <div className="px-4 pt-8 pb-3 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md h-[135px] flex flex-col justify-between">
              
//               {/* Title & Desc */}
//               <div className="mt-1">
//                 <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 leading-none truncate max-w-[200px]">
//                   {community.name}
//                 </h4>
//                 <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1 font-medium">
//                     {community.description}
//                 </p>
//               </div>

//               {/* Footer: Stats & Stack */}
//               <div className="flex items-center gap-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/50">
//                  <span className="font-bold text-xs text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-700/50 px-2 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-600">
//                     {community.members}
//                  </span>
                 
//                  {/* Avatar Stack */}
//                  <div className="flex -space-x-2">
//                     {community.memberPreviews.map((previewUrl, i) => (
//                         <img 
//                             key={i}
//                             src={previewUrl} 
//                             alt="member"
//                             className="w-5 h-5 rounded-full border border-white dark:border-zinc-800"
//                         />
//                     ))}
//                     <div className="w-5 h-5 rounded-full border border-white dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-[8px] text-zinc-500">
//                         +
//                     </div>
//                  </div>
//               </div>

//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendingCommunities;