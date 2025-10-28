// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { FiArrowRight } from "react-icons/fi";
// // import Pic_1 from "../Category/Category-images/landscape.png";
// // import Pic_2 from "../Category/Category-images/portrait.jpg";
// // import Pic_3 from "../Category/Category-images/still life.jpg";
// // import Pic_4 from "../Category/Category-images/oil.jpg";
// // import Pic_5 from "../Category/Category-images/water.jpg";
// // import Pic_6 from "../Category/Category-images/abstract.jpg";

// // import GlassSidebar from "../Sidebar";
// // const ArtCategories = () => {
// //   // Art categories data
// //   const categories = [
// //     {
// //       id: 1,
// //       name: "Portrait",
// //       description: "Capturing the essence of individuals",
// //       image:Pic_2,
// //       link: "/portrait"
// //     },
// //     {
// //       id: 2,
// //       name: "Landscape",
// //       description: "Nature's beauty captured in various forms",
// //       image:Pic_1,
// //       link: "/landscape"
// //     },
// //     {
// //       id: 3,
// //       name: "Abstract",
// //       description: "Shapes, colors and forms in creative expression",
// //       image:Pic_6,
// //       link: "/abstract"
// //     },
// //     {
// //       id: 4,
// //       name: "Still Life",
// //       description: "Arrangements of inanimate objects",
// //       // image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=702&q=80",
// //       image:Pic_3,
// //       link: "/still-life"
// //     },
// //     {
// //       id: 5,
// //       name: "Oil Painting",
// //       description: "Cityscapes and architectural marvels",
// //       image:Pic_4,
// //       link: "/Oil_Paint"
// //     },
// //     {
// //       id: 6,
// //       name: "Water Colour",
// //       description: "Dream-like scenes with unexpected elements",
// //       image:Pic_5,
// //       link: "/Watercolor"
// //     }
// //   ];

// //   return (
// //     <div className="bg-white dark:bg-[#0a0f14] xl:max-w-7xl max-w-full sm:max-w-[85%] flex lg:flex-row flex-col mx-auto rounded-lg py-12 px-4 sm:px-6 lg:px-8 relative">
// //       <div className=" max-w-[100%] mx-auto">
// //         {/* Header */}
// //       <div className="mb-10 lg:text-center text-left relative z-10">
// //         <h2 className="lg:text-4xl text-2xl font-serif lg:font-medium font-bold text-gray-800 dark:text-white mb-3 tracking-wide">
// //           Discover Art Categories
// //         </h2>
// //         <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto font-Quicksand lg:text-[16px] text-[14px]">
// //           Dive into a world of creativity with our curated collection of artistic styles.
// //         </p>
// //       </div>
        
// //         {/* Categories Grid - Horizontal scroll on mobile */}
// //         <div className="flex overflow-x-auto pb-4 md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 hide-scrollbar">
// //           {categories.map((category) => (
// //             <div 
// //               key={category.id} 
// //               className="flex-shrink-0 w-72 md:w-full group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl mr-4 md:mr-0"
// //             >
// //               <div className="relative h-60 overflow-hidden">
// //                 <img 
// //                   src={category.image} 
// //                   alt={category.name}
// //                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
// //                 {/* Content overlay */}
// //                 <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
// //                   <h2 className="text-xl font-bold mb-1">{category.name}</h2>
// //                   <p className="text-sm mb-4 opacity-90">{category.description}</p>
// //                   {/* <a 
// //                     href={category.link}
                    
// //                   > */}
// //                   <button className="self-start py-1 px-2 rounded-lg font-medium transition-all duration-300 border border-white text-white">
// //                   <Link to={category.link}>
// //                     Explore
// //                   </Link>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
        
// //         {/* Call to Action */}
// //         <div className="mt-12 text-center relative z-10">
// //          <Link
// //           to="/Category"
// //           className="inline-flex items-center px-4 py-2 rounded-xl text-gray-800 dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gradient-to-r hover:from-[#FFDAB9] hover:to-[#A9B7A1] dark:hover:from-[#374151] dark:hover:to-[#1A2A3A] transition-all duration-300 group"
// //         >
// //           <span className=" text-base group-hover:text-gray-900 dark:group-hover:text-white font-GreatVibes">
// //             View All Categories
// //           </span>
// //           <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300 group-hover:text-gray-900 dark:group-hover:text-white" />
// //         </Link>
// //       </div>
// //       </div>
      
// //       <style jsx>{`
// //         .hide-scrollbar {
// //           -ms-overflow-style: none;
// //           scrollbar-width: none;
// //         }
// //         .hide-scrollbar::-webkit-scrollbar {
// //           display: none;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default ArtCategories;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { fetchPexelsImage } from "../Category/pexels";

const categoriesData = [
  { name: "Portrait", link: "/portrait", color: "from-blue-500 to-purple-600" },
  { name: "Landscape", link: "/gallery/landscape", color: "from-green-500 to-teal-600" },
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
      setCategories(updated.filter((c) => c.image)); // Only keep those with valid images
    };
    loadImages();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Art Categories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Discover different styles • Updated automatically
          </p>
        </div>
        <Link
          to="/Category"
          className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium group"
        >
          View all
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.length > 0 ? (
          categories.slice(0, 4).map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[1/1] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold text-center text-base drop-shadow-md">
                    {cat.name}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center col-span-full">
            Loading beautiful art categories...
          </p>
        )}
      </div>
    </div>
  );
};

export default MiniArtCategories;
