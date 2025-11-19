// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiArrowRight } from "react-icons/fi";
// import { fetchPexelsImage } from "../Category/pexels";

// const categoriesData = [
//   { name: "Portrait", link: "/portrait", color: "from-blue-500 to-purple-600" },
//   { name: "Landscape", link: "/landscape", color: "from-green-500 to-teal-600" },
//   { name: "Abstract", link: "/abstract", color: "from-pink-500 to-red-600" },
//   { name: "Still Life", link: "/still-life", color: "from-orange-500 to-amber-600" },
//   { name: "Oil Painting", link: "/oil-painting", color: "from-yellow-500 to-orange-600" },
//   { name: "Digital Art", link: "/digital-art", color: "from-cyan-500 to-blue-600" },
//   { name: "Watercolor", link: "/watercolor", color: "from-sky-500 to-indigo-600" },
//   { name: "Sculpture", link: "/sculpture", color: "from-stone-500 to-gray-600" },
//   { name: "Street Art", link: "/street-art", color: "from-lime-500 to-green-600" },
//   { name: "Minimalist", link: "/minimalist", color: "from-gray-500 to-slate-600" },
//   { name: "Surrealism", link: "/surrealism", color: "from-purple-500 to-fuchsia-600" },
//   { name: "Impressionism", link: "/impressionism", color: "from-rose-500 to-pink-600" },
//   { name: "Cubism", link: "/cubism", color: "from-amber-500 to-yellow-600" },
//   { name: "Pop Art", link: "/pop-art", color: "from-red-500 to-orange-600" },
//   { name: "Realism", link: "/realism", color: "from-emerald-500 to-green-600" },
//   { name: "Expressionism", link: "/expressionism", color: "from-violet-500 to-purple-600" },
//   { name: "Conceptual", link: "/conceptual", color: "from-teal-500 to-cyan-600" },
//   { name: "Futurism", link: "/futurism", color: "from-indigo-500 to-blue-600" },
// ];

// const MiniArtCategories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const loadImages = async () => {
//       const updated = await Promise.all(
//         categoriesData.map(async (cat) => {
//           const img = await fetchPexelsImage(`${cat.name} art`);
//           return { ...cat, image: img };
//         })
//       );
//       setCategories(updated.filter((c) => c.image)); // Only keep those with valid images
//     };
//     loadImages();
//   }, []);

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <div>
//           <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//             Art Categories
//           </h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//             Discover different styles • Updated automatically
//           </p>
//         </div>
//         <Link
//           to="/Category"
//           className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium group"
//         >
//           View all
//           <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </div>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-2 gap-4">
//         {categories.length > 0 ? (
//           categories.slice(0, 4).map((cat, index) => (
//             <Link
//               key={index}
//               to={cat.link}
//               className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
//             >
//               <div className="aspect-[1/1] relative">
//                 <img
//                   src={cat.image}
//                   alt={cat.name}
//                   loading="lazy"
//                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
//                 ></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="text-white font-semibold text-center text-base drop-shadow-md">
//                     {cat.name}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p className="text-gray-500 text-sm text-center col-span-full">
//             Loading beautiful art categories...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MiniArtCategories;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { fetchPexelsImage } from "../Category/pexels";

const categoriesData = [
  { name: "Portrait", link: "/portrait", color: "from-blue-500 to-purple-600" },
  { name: "Landscape", link: "/landscape", color: "from-green-500 to-teal-600" },
  { name: "Abstract", link: "/abstract", color: "from-pink-500 to-red-600" },
  { name: "Still Life", link: "/still-life", color: "from-orange-500 to-amber-600" },
  { name: "Oil Painting", link: "/oil-painting", color: "from-yellow-500 to-orange-600" },
  { name: "Digital Art", link: "/digital-art", color: "from-cyan-500 to-blue-600" },
  { name: "Watercolor", link: "/watercolor", color: "from-sky-500 to-indigo-600" },
  { name: "Sculpture", link: "/sculpture", color: "from-stone-500 to-gray-600" },
  { name: "Street Art", link: "/street-art", color: "from-lime-500 to-green-600" },
  { name: "Minimalist", link: "/minimalist", color: "from-gray-500 to-slate-600" },
  { name: "Surrealism", link: "/surrealism", color: "from-purple-500 to-fuchsia-600" },
  { name: "Impressionism", link: "/impressionism", color: "from-rose-500 to-pink-600" },
  { name: "Cubism", link: "/cubism", color: "from-amber-500 to-yellow-600" },
  { name: "Pop Art", link: "/pop-art", color: "from-red-500 to-orange-600" },
  { name: "Realism", link: "/realism", color: "from-emerald-500 to-green-600" },
  { name: "Expressionism", link: "/expressionism", color: "from-violet-500 to-purple-600" },
  { name: "Conceptual", link: "/conceptual", color: "from-teal-500 to-cyan-600" },
  { name: "Futurism", link: "/futurism", color: "from-indigo-500 to-blue-600" },
];

const MiniArtCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const updated = await Promise.all(
        categoriesData.map(async (cat) => {
          const img = await fetchPexelsImage(`${cat.name} art`);
          return { ...cat, image: img };
        })
      );
      setCategories(updated.filter((c) => c.image));
    };
    loadImages();
  }, []);

  return (
    <div className="w-full rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent">
      {/* TOP BOX - Header */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Art Categories
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Discover different styles • Updated automatically
            </p>
          </div>
          <Link
            to="/Category"
            className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-xs font-medium group"
          >
            View all
            <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* MIDDLE/BOTTOM BOX - Creative Outlined Grid */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden relative">
        {/* Creative outer frame with subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-gray-900/20 pointer-events-none" />
        <div className="relative grid grid-cols-2 gap-1 p-1">
          {categories.length > 0 ? (
            categories.slice(0, 4).map((cat, index) => (
              <Link
                key={index}
                to={cat.link}
                className="group relative block overflow-hidden rounded-md aspect-square border border-white/50 dark:border-gray-800/50 hover:border-white/80 dark:hover:border-gray-700/80 transition-all duration-300 shadow-inner"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60 group-hover:opacity-75 transition-opacity duration-300`}
                />
                <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white font-semibold text-sm drop-shadow-md block text-center w-full">
                    {cat.name}
                  </span>
                </div>
                {/* Creative inner accent border on hover */}
                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${cat.color.replace('bg-', 'border-')}`} />
              </Link>
            ))
          ) : (
            <div className="col-span-2 flex items-center justify-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                Loading beautiful art categories...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniArtCategories;