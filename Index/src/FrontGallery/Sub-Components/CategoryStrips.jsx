import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Layers, Brush } from "lucide-react";
// import { fetchPexelsImage } from "../Category/pexels";
import { fetchPexelsImage } from "../../Components/Category/pexels";

// --- THE DATA (18 Categories) ---
const ALL_CATEGORIES = [
  // Batch 1: Traditional & Nature
  { name: "Portrait", link: "/category/portrait", color: "from-blue-500 to-purple-600" },
  { name: "Landscape", link: "/category/landscape", color: "from-green-500 to-teal-600" },
  { name: "Abstract", link: "/category/abstract", color: "from-pink-500 to-red-600" },
  { name: "Still Life", link: "/category/still-life", color: "from-orange-500 to-amber-600" },
  { name: "Oil Painting", link: "/category/oil-painting", color: "from-yellow-500 to-orange-600" },
  { name: "Realism", link: "/category/realism", color: "from-emerald-500 to-green-600" },

  // Batch 2: Modern & Digital
  { name: "Digital Art", link: "/category/digital-art", color: "from-cyan-500 to-blue-600" },
  { name: "Street Art", link: "/category/street-art", color: "from-lime-500 to-green-600" },
  { name: "Minimalist", link: "/category/minimalist", color: "from-gray-500 to-slate-600" },
  { name: "Pop Art", link: "/category/pop-art", color: "from-red-500 to-orange-600" },
  { name: "Futurism", link: "/category/futurism", color: "from-indigo-500 to-blue-600" },
  { name: "Conceptual", link: "/category/conceptual", color: "from-teal-500 to-cyan-600" },

  // Batch 3: Movements & Mediums
  { name: "Watercolor", link: "/category/watercolor", color: "from-sky-500 to-indigo-600" },
  { name: "Sculpture", link: "/category/sculpture", color: "from-stone-500 to-gray-600" },
  { name: "Surrealism", link: "/category/surrealism", color: "from-purple-500 to-fuchsia-600" },
  { name: "Impressionism", link: "/category/impressionism", color: "from-rose-500 to-pink-600" },
  { name: "Cubism", link: "/categpry/cubism", color: "from-amber-500 to-yellow-600" },
  { name: "Expressionism", link: "/category/expressionism", color: "from-violet-500 to-purple-600" },
];

// --- REUSABLE COMPONENT ---
const CategoryRail = ({ categories, title, icon: Icon }) => {
  const [items, setItems] = useState(categories);

  useEffect(() => {
    const loadImages = async () => {
      const updated = await Promise.all(
        categories.map(async (cat) => {
          // If you don't have Pexels API key set up yet, remove this line or use placeholders
          const img = await fetchPexelsImage(`${cat.name} art`); 
          return { ...cat, image: img || "https://via.placeholder.com/300" };
        })
      );
      setItems(updated);
    };
    loadImages();
  }, [categories]);

  return (
    <div className="w-full mb-8 px-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest flex items-center gap-2">
          {Icon && <Icon size={14} className="text-blue-500" />}
          {title}
        </h3>
        <Link to="/Category" className="text-[10px] font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1">
          View All <ArrowRight size={10} />
        </Link>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
        {items.map((cat, index) => (
          <Link
            key={index}
            to={cat.link}
            className="group relative flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden snap-start cursor-pointer border border-zinc-200 dark:border-zinc-800"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300 mix-blend-multiply`} />
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <span className="text-white text-xs font-bold tracking-wide drop-shadow-md group-hover:translate-x-1 transition-transform">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- EXPORTABLE SECTIONS ---

export const ArtCategoryStrip1 = () => (
  <CategoryRail 
    categories={ALL_CATEGORIES.slice(0, 6)} 
    title="Explore Styles" 
    icon={Palette} 
  />
);

export const ArtCategoryStrip2 = () => (
  <CategoryRail 
    categories={ALL_CATEGORIES.slice(6, 12)} 
    title="Modern & Digital" 
    icon={Layers} 
  />
);

export const ArtCategoryStrip3 = () => (
  <CategoryRail 
    categories={ALL_CATEGORIES.slice(12, 18)} 
    title="Movements" 
    icon={Brush} 
  />
);