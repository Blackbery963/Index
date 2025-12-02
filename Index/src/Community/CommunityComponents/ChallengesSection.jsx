// // Components/ChallengesSection.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Calendar, Award, Users, ArrowRight } from 'lucide-react';

// const ChallengesSection = () => {
//   const challenges = [
//     {
//       icon: Calendar,
//       title: "Weekly Prompt",
//       prize: "$100 Prize Pool",
//       description: "New creative theme every Monday",
//       link: '/community/communitychallenges/weeklychallenge',
//       color: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: Award,
//       title: "Monthly Masterpiece",
//       prize: "Tablet + $500",
//       description: "Showcase your best work to pros",
//       link: "/community/communitychallenges/monthlychallenge",
//       color: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: Users,
//       title: "Community Vote",
//       prize: "Exclusive Badge",
//       description: "Members pick their favorites",
//       link: "/community/communitychallenges/votinggallery",
//       color: "from-green-500 to-emerald-500"
//     },
//   ];

//   return (
//     <section className="py-20 px-4 bg-white/10 dark:bg-gray-800/10">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
//             Creative Challenges
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-400">
//             Test your skills and win amazing prizes
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//           {challenges.map((challenge, index) => (
//             <motion.div
//               key={challenge.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className="group"
//             >
//               <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all h-full">
//                 <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${challenge.color} flex items-center justify-center mb-4`}>
//                   <challenge.icon size={20} className="text-white" />
//                 </div>
                
//                 <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
//                   {challenge.title}
//                 </h3>
                
//                 <span className="inline-block bg-white/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm mb-3">
//                   {challenge.prize}
//                 </span>
                
//                 <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
//                   {challenge.description}
//                 </p>

//                 <Link to={challenge.link}>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium"
//                   >
//                     <span>Learn More</span>
//                     <ArrowRight size={14} />
//                   </motion.button>
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChallengesSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Award, Users, ArrowRight, Clock, Flame } from 'lucide-react';

const ChallengesSection = () => {
  const challenges = [
    {
      icon: Flame,
      title: "Weekly Speedrun",
      prize: "$100 Prize Pool",
      tag: "Ending Soon",
      description: "Sketch a cyberpunk city in under 2 hours. Theme refreshes every Monday.",
      link: '/community/communitychallenges/weeklychallenge',
      gradient: "from-orange-500 to-red-500",
      shadow: "shadow-orange-500/20",
      textColor: "text-orange-500"
    },
    {
      icon: Award,
      title: "Monthly Masterpiece",
      prize: "Wacom Tablet + $500",
      tag: "Top Tier",
      description: "Create a full character sheet. Judged by industry professionals.",
      link: "/community/communitychallenges/monthlychallenge",
      gradient: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/20",
      textColor: "text-blue-500"
    },
    {
      icon: Users,
      title: "Community Vote",
      prize: "Exclusive Badge",
      tag: "Voting Open",
      description: "Submit your best work and let the community decide the winners.",
      link: "/community/communitychallenges/votinggallery",
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20",
      textColor: "text-emerald-500"
    },
  ];

  return (
    <section className="py-20 px-1 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-slate-800/40 border border-white/20 mb-6 backdrop-blur-sm"
          >
            <Clock size={14} className="text-purple-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Live Competitions</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Creative Challenges
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Sharpen your skills, win gear, and get recognized.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card Background */}
              <div className="
                h-full flex flex-col
                bg-white/40 dark:bg-slate-900/40 
                backdrop-blur-xl
                border border-white/40 dark:border-white/10
                rounded-xl p-8
                shadow-xl hover:shadow-2xl hover:bg-white/60 dark:hover:bg-slate-900/60
                transition-all duration-300
              ">
                
                {/* Header: Icon & Tag */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`
                    w-12 h-12 rounded-2xl 
                    bg-gradient-to-br ${challenge.gradient} 
                    flex items-center justify-center 
                    shadow-lg ${challenge.shadow}
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <challenge.icon size={24} className="text-white" />
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    bg-white/50 dark:bg-white/10 border border-white/20
                    ${challenge.textColor}
                  `}>
                    {challenge.tag}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all">
                  {challenge.title}
                </h3>
                
                <div className="mb-4 font-medium bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent text-sm">
                  Prize: {challenge.prize}
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm flex-grow">
                  {challenge.description}
                </p>

                {/* Footer Button */}
                <Link to={challenge.link} className="mt-auto">
                  <div className="
                    w-full py-3 rounded-xl 
                    border border-slate-200 dark:border-slate-700
                    text-slate-600 dark:text-slate-300
                    font-semibold text-sm
                    flex items-center justify-center gap-2
                    group-hover:bg-slate-900 group-hover:text-white
                    dark:group-hover:bg-white dark:group-hover:text-slate-900
                    dark:group-hover:border-transparent
                    transition-all duration-300
                  ">
                    <span>View Details</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;