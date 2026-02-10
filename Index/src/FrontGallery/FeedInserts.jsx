import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, ArrowUpRight, BookOpen, Palette, Mountain, User, PenTool } from 'lucide-react';

// --- 1. RESOURCE CARD (Downloads/Tutorials) ---
export const ResourceCard = () => (
  <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 border border-blue-100 dark:border-zinc-700 rounded-xl p-4 flex items-center gap-4 mb-8 relative overflow-hidden group cursor-pointer">
    {/* Decorative BG Icon */}
    <Download className="absolute -right-4 -bottom-4 text-blue-200 dark:text-zinc-700/50 w-24 h-24 -rotate-12 transition-transform group-hover:rotate-0" />
    
    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 text-white z-10">
      <PenTool size={20} />
    </div>
    
    <div className="flex-1 z-10">
      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Free Resource</span>
      <h3 className="text-sm font-bold text-zinc-800 dark:text-white leading-tight">
        Essential Oil Brushes Vol. 2
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
        20+ Textured brushes for Procreate & Photoshop.
      </p>
    </div>

    <button className="bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white p-2 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-600 z-10 group-hover:scale-110 transition-transform">
      <ArrowUpRight size={16} />
    </button>
  </div>
);

// --- 2. TRAVEL DIARY (Journey Stories) ---
export const TravelDiaryCard = () => (
  <div className="w-full relative h-64 rounded-xl overflow-hidden mb-8 group cursor-pointer">
    <img 
      src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000" 
      alt="Travel" 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    
    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
      <MapPin size={12} /> Kyoto, Japan
    </div>

    <div className="absolute bottom-0 left-0 p-5">
      <span className="text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-1 block">
        Travel Diary
      </span>
      <h3 className="text-xl font-bold text-white leading-tight mb-2">
        Sketching the Old Temples
      </h3>
      <p className="text-gray-300 text-xs line-clamp-2 max-w-[90%]">
        My experience using watercolors in the rain while visiting the ancient shrines of Kyoto...
      </p>
    </div>
  </div>
);

// --- 3. BLOG CARD (Articles) ---
export const BlogCard = () => (
  <div className="w-full flex gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3 rounded-xl mb-8 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=300" 
        alt="Blog" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen size={12} className="text-purple-500" />
        <span className="text-[10px] font-semibold text-zinc-400">Article • 5 min read</span>
      </div>
      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 line-clamp-2 leading-snug">
        Overcoming Creative Block: 5 Strategies for Artists
      </h3>
      <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
        Every artist faces the blank canvas fear. Here is how to fix it.
      </p>
    </div>
  </div>
);
