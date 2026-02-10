import React from 'react';

const categories = ['All', 'Paintings', 'Sculptures', 'Handmade', 'Photography', 'Abstract'];

const FilterBar = ({ activeCategory, setActiveCategory }) => (
  <div className="flex flex-nowrap md:flex-wrap overflow-x-auto justify-start md:justify-center gap-6 mb-10 pb-2 hide-scrollbar">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`text-sm tracking-wide uppercase whitespace-nowrap pb-1 transition-all ${
          activeCategory === cat 
            ? 'text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white font-bold' 
            : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 border-b-2 border-transparent'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);
export default FilterBar;