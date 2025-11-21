// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { motion } from "framer-motion";
// import { fetchPexelsImage } from "./pexels";
// // import { FaArrowLeft as FaBack } from "react-icons/fa";
// import {MdArrowBack as Faback} from "react-icons/md"

// export default function Category() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const baseCategories = [
//     { name: "Landscape", link: "/category/", para: "Natural scenery emphasizing light, mood, and atmosphere.",  },
//     { name: "Portrait", para: "Capturing personality, expression, and likeness of a person.", link: "/category/portrait" },
//     { name: "Watercolor", para: "Transparent pigments mixed with water producing soft effects.", link: "/category/watercolor" },
//     { name: "Oil Painting", para: "Rich textures and vibrant colors with slow blending.", link: "/category/oil-painting" },
//     { name: "Abstract", para: "Expressing ideas through colors, shapes, and forms.", link: "/category/abstract" },
//     { name: "Still Life", para: "Inanimate objects emphasizing composition and lighting.", link: "/category/still-life" },
//     { name: "Historical Art", para: "Depicting significant events or figures from history.", link: "/category/historical" },
//     { name: "Surrealism", para: "Blends reality and dreams with symbolic elements.", link: "/category/surrealism" },
//     { name: "Impressionism", para: "Fleeting moments with quick brushstrokes and bright colors.", link: "/category/impressionism" },
//     { name: "Realism", para: "Portrays subjects truthfully and accurately.", link: "/category/realism" },
//     { name: "Expressionism", para: "Vivid colors and dramatic distortions for emotions.", link: "/category/expressionism" },
//     { name: "Minimalism", para: "Simplifies composition using basic shapes and limited colors.", link: "/category/minimalism" },
//     { name: "Pop Art", para: "Bold colors and imagery from mass culture.", link: "/category/pop-art" },
//     { name: "Nature", para: "Showcases the beauty of the natural world.", link: "/category/nature" },
//     { name: "Traditional", para: "Represents cultural and heritage-based art forms.", link: "/category/traditional" },
//     { name: "Digital", para: "Created using modern digital tools and techniques.", link: "/category/digital" },
//     { name: "Modern", para: "Breaks away from classical forms with innovation.", link: "/category/modern" },
//     { name: "Photography", para: "Capturing light and moments with visual expression.", link: "/category/photography" },
//   ];

//   useEffect(() => {
//     AOS.init({ duration: 800, easing: "ease-in-out", once: true });
//   }, []);

//   useEffect(() => {
//     const loadCategoryImages = async () => {
//       setLoading(true);
//       const cached = localStorage.getItem("categoryImages");

//       if (cached) {
//         setCategories(JSON.parse(cached));
//         setLoading(false);
//         return;
//       }

//       const catsWithImages = await Promise.all(
//         baseCategories.map(async (cat) => {
//           const imgUrl = await fetchPexelsImage(`${cat.name} fine art painting`);
//           return { ...cat, backImg: imgUrl || "/fallback.jpg" };
//         })
//       );

//       localStorage.setItem("categoryImages", JSON.stringify(catsWithImages));
//       setCategories(catsWithImages);
//       setLoading(false);
//     };

//     loadCategoryImages();
//   }, []);

//   const filtered = categories.filter((cat) =>
//     cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     cat.para.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
//       <Link to={"/"}>
//           <button> <Faback/> </button>
//       </Link>
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12 max-w-3xl mx-auto"
//       >
//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Art Categories</h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
//           Discover and explore diverse art styles & creative techniques
//         </p>

//         <div className="relative max-w-xl mx-auto">
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
//                        text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 
//                        focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <svg
//             className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 dark:text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//       </motion.div>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {(loading ? Array(8).fill({}) : filtered).map((cat, i) => (
//           <motion.div
//             key={cat.name || i}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.4, delay: i * 0.05 }}
//             whileHover={{ y: -5 }}
//             className="group relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-xl transition-all"
//           >
//             {loading ? (
//               <div className="animate-pulse h-60 w-full bg-gray-300 dark:bg-gray-700 rounded-2xl" />
//             ) : (
//               <>
//                 <img
//                   src={cat.backImg}
//                   alt={cat.name}
//                   className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90 transition-opacity" />
//                 <div className="absolute bottom-0 p-4 text-white z-10">
//                   <h3 className="text-xl font-semibold mb-1">{cat.name}</h3>
//                   <p className="text-sm text-gray-200 line-clamp-2">{cat.para}</p>
//                   <Link key={cat.name} to={cat.link}>
//                     <button className="mt-3 px-3 py-1.5 text-sm font-medium bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-md transition">
//                       View Works →
//                     </button>
//                   </Link>
//                 </div>
//               </>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {!loading && filtered.length === 0 && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
//           <svg
//             className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
//             No categories found
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400">Try searching for something else</p>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// // export default Category;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { fetchPexelsImage } from "./pexels";
import { MdArrowBack as Faback } from "react-icons/md";

export default function Category() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseCategories = [
    { name: "Landscape",     slug: "landscape",     para: "Natural scenery emphasizing light, mood, and atmosphere." },
    { name: "Portrait",      slug: "portrait",      para: "Capturing personality, expression, and likeness of a person." },
    { name: "Watercolor",    slug: "watercolor",    para: "Transparent pigments mixed with water producing soft effects." },
    { name: "Oil Painting",  slug: "oil-painting",  para: "Rich textures and vibrant colors with slow blending." },
    { name: "Abstract",      slug: "abstract",      para: "Expressing ideas through colors, shapes, and forms." },
    { name: "Still Life",    slug: "still-life",    para: "Inanimate objects emphasizing composition and lighting." },
    { name: "Historical Art",slug: "historical",    para: "Depicting significant events or figures from history." },
    { name: "Surrealism",    slug: "surrealism",    para: "Blends reality and dreams with symbolic elements." },
    { name: "Impressionism", slug: "impressionism", para: "Fleeting moments with quick brushstrokes and bright colors." },
    { name: "Realism",       slug: "realism",       para: "Portrays subjects truthfully and accurately." },
    { name: "Expressionism", slug: "expressionism", para: "Vivid colors and dramatic distortions for emotions." },
    { name: "Minimalism",    slug: "minimalism",    para: "Simplifies composition using basic shapes and limited colors." },
    { name: "Pop Art",       slug: "pop-art",       para: "Bold colors and imagery from mass culture." },
    { name: "Nature",        slug: "nature",        para: "Showcases the beauty of the natural world." },
    { name: "Traditional",   slug: "traditional",   para: "Represents cultural and heritage-based art forms." },
    { name: "Digital",       slug: "digital",       para: "Created using modern digital tools and techniques." },
    { name: "Modern",        slug: "modern",        para: "Breaks away from classical forms with innovation." },
    { name: "Photography",   slug: "photography",   para: "Capturing light and moments with visual expression." },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    const loadCategoryImages = async () => {
      setLoading(true);
      const cached = localStorage.getItem("categoryImagesV2"); // changed key to avoid old bugged cache

      if (cached) {
        setCategories(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const catsWithImages = await Promise.all(
        baseCategories.map(async (cat) => {
          const imgUrl = await fetchPexelsImage(`${cat.name} fine art painting`);
          return { ...cat, backImg: imgUrl || "/fallback.jpg" };
        })
      );

      localStorage.setItem("categoryImagesV2", JSON.stringify(catsWithImages));
      setCategories(catsWithImages);
      setLoading(false);
    };

    loadCategoryImages();
  }, []);

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.para.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      {/* Fixed Back Button */}
      <Link to="/">
        <button className="fixed top-6 left-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-110 rounded-full">
          <Faback className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-3xl mx-auto pt-20"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Art Categories</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Discover and explore diverse art styles & creative techniques
        </p>

        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto pb-10">
        {(loading ? Array(12).fill({}) : filtered).map((cat, i) => (
          <motion.div
            key={cat.name || i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {loading ? (
              <div className="h-64 w-full animate-pulse bg-gray-300 dark:bg-gray-700 rounded-2xl" />
            ) : (
              <>
                <img
                  src={cat.backImg}
                  alt={cat.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2">{cat.para}</p>
                  <Link to={`/category/${cat.slug}`}>
                    <button className="px-5 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-lg font-medium text-sm transition">
                      View Works →
                    </button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No categories found</p>
        </div>
      )}
    </div>
  );
}