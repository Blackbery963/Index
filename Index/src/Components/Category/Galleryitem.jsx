// import React from "react";

// export default function Galleryitem({ name, backImg }) {
//   return (
//     <div
//       className=" h-[230px] w-[230px] max-w-[230px] bg-center bg-cover rounded-xl overflow-hidden mt-8 shadow-md shadow-slate-700"
//       style={{ backgroundImage: `url(${backImg})` }}
//     >
//       {/* Always visible background on small screens, hover effect on larger screens */}
//       <div className="h-full w-full bg-black/50 flex items-center justify-center opacity-70 md:opacity-0 md:hover:opacity-100 transition ease-linear duration-500">
//         <p className="text-2xl text-white font-semibold font-Playfair">{name}</p>
//       </div>
//     </div>
//   );
//  }

import React from 'react';
import { motion } from 'framer-motion';

export default function Galleryitem({ name, para, backImg }) {
  return (
    <motion.div
      className="h-[250px] w-[200px] max-w-[200px] bg-center bg-cover rounded-xl overflow-hidden shadow-lg shadow-slate-700 border border-gray-200"
      style={{ backgroundImage: `url(${backImg})` }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full w-full bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-4 opacity-80 md:opacity-0 md:hover:opacity-100 transition-opacity duration-500"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl text-white font-semibold font-Playfair text-center">{name}</p>
        {para && (
          <p className="text-sm text-gray-200 font-Quicksand font-semibold text-center mt-2 line-clamp-3">{para}</p>
        )}
      </motion.div>
    </motion.div>
  );
}