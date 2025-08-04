// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiBookOpen, FiArrowRight } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// const featuredPapers = [
//   {
//     id: 1,
//     title: "Advancements in Quantum Computing Algorithms",
//     authors: "Dr. Elena Rodriguez, Prof. Mark Chen",
//     abstract: "This paper explores novel quantum algorithms that demonstrate polynomial speedup for optimization problems...",
//     published: "Nature Physics, May 2023",
//     citations: 142,
//     tags: ["quantum computing", "algorithms", "optimization"],
//   },
//   {
//     id: 2,
//     title: "Neural Architecture Search for Edge Devices",
//     authors: "Sarah Johnson, et al.",
//     abstract: "We present a lightweight neural architecture search framework optimized for resource-constrained edge devices...",
//     published: "IEEE Transactions on ML, April 2023",
//     citations: 89,
//     tags: ["machine learning", "edge computing", "NAS"],
//   },
//   {
//     id: 3,
//     title: "CRISPR-Cas9 Gene Editing: Ethical Implications",
//     authors: "Global Bioethics Consortium",
//     abstract: "Comprehensive analysis of ethical considerations surrounding CRISPR technology with policy recommendations...",
//     published: "Science and Ethics Journal, March 2023",
//     citations: 210,
//     tags: ["bioethics", "genetics", "CRISPR"],
//   },
// ];

// const ResearchPapersPage = () => {
//   const [hoveredPaper, setHoveredPaper] = useState(null);

//   return (
//     <div className="min-h-screen max-w-[95%] mx-auto bg-gradient-to-br bg-white dark:bg-[#040d1200] px-4 sm:px-6 md:px-8 py-12">
//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center max-w-3xl mx-auto mb-12"
//       >
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
//           Explore <span className="text-blue-600 dark:text-blue-400">Groundbreaking Research</span>
//         </h1>
//         <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
//           Dive into a world of innovative ideas and cutting-edge discoveries across disciplines.
//         </p>
//       </motion.div>

//       {/* Featured Papers Grid */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
//       >
//         {featuredPapers.map((paper, i) => (
//           <motion.div
//             key={paper.id}
//             onMouseEnter={() => setHoveredPaper(i)}
//             onMouseLeave={() => setHoveredPaper(null)}
//             whileHover={{ y: -8, scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden"
//           >
//             <div className="p-6">
//               <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
//                 <FiBookOpen className="mr-1" /> {paper.published}
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{paper.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{paper.abstract}</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {paper.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-500 dark:text-gray-400">{paper.authors}</span>
//                 <span className="text-blue-600 dark:text-blue-400 font-medium">{paper.citations} citations</span>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Call to Action */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <Link to="/research">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all font-medium text-sm sm:text-base"
//           >
//             Explore More Research
//           </motion.button>
//         </Link>
//       </motion.div>

//       {/* Additional Sections */}
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ delay: 0.6, duration: 0.6 }}
    //     className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
    //   >
    //     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
    //       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Join Our Research Community</h3>
    //       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
    //         Share your findings with a global audience and benefit from:
    //       </p>
    //       <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
    //         <li className="flex items-start">
    //           <span className="text-blue-500 mr-2">✓</span> Expert peer reviews
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-500 mr-2">✓</span> In-depth readership analytics
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-blue-500 mr-2">✓</span> Open access publishing
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
    //       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Research Spotlight</h3>
    //       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
    //         Highlighting impactful work each month.
    //       </p>
    //       <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
    //         <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
    //           "Sustainable AI: Energy-Efficient Neural Networks"
    //         </h4>
    //         <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Dr. Priya Patel, MIT</p>
    //         <p className="text-xs text-gray-500 dark:text-gray-500">June 2023 Spotlight</p>
    //       </div>
    //     </div>
    //   </motion.div>
//     </div>
//   );
// };

// export default ResearchPapersPage;


import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const featuredPapers = [
  {
    id: 1,
    title: "Digital Brushstrokes: AI in Contemporary Art",
    authors: "M. Chen, A. Rodriguez",
    excerpt: "Exploring how neural networks are transforming artistic creation",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
  },
  {
    id: 2,
    title: "The Minimalist Aesthetic",
    authors: "S. Yamamoto",
    excerpt: "How less became more in 21st century art",
    image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0",
  },
  {
    id: 3,
    title: "Street Art as Social Commentary",
    authors: "J. Banks Collective",
    excerpt: "Urban spaces as canvases for cultural dialogue",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
  },
];

const ArtResearchPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f14] max-w-[95%] mx-auto px-4 py-12 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-light mb-3"
        >
          Art Research Archive
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Essential readings on modern artistic practice
        </motion.p>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {featuredPapers.map((paper) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
            className="group"
          >
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden rounded-xl">
              <img 
                src={paper.image} 
                alt={paper.title} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">{paper.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{paper.authors}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{paper.excerpt}</p>
            <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline transition">
              Read study <FiArrowRight className="ml-1" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 max-w-md mx-auto mb-16">
        <Link to={"/Community/Resources/ResourceHub"}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm w-full max-w-xs rounded-md"
        >
          View all studies
        </motion.button>
        </Link>
        <Link to={"/Community/Resources/ResourceUpload"}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 text-sm w-full max-w-xs rounded-md"
        >
          Contribute research
        </motion.button>
        </Link>
      </div>

      {/* ➕ Additional Feature Section */}
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl font-semibold mb-4"
        >
          Why Read These Papers?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          These curated studies help you understand how art evolves alongside technology, society, and culture. Whether you're a curious learner or a passionate artist, dive deeper into the forces shaping today's creative world.
        </motion.p>
      </div>
    </div>
  );
};

export default ArtResearchPage;
