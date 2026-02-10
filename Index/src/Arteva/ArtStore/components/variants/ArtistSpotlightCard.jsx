import React from 'react';
import { FiUserPlus } from 'react-icons/fi';

const ArtistSpotlightCard = ({ data }) => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 md:rounded-xl p-6 text-center shadow-sm">
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-zinc-700 shadow-md mx-auto">
          <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
      </div>
      
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Featured Artist</p>
      <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-white mb-1">{data.name}</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">{data.role}</p>
      
      <p className="text-sm text-zinc-600 dark:text-zinc-300 italic mb-6 leading-relaxed">
        "{data.bio}"
      </p>

      {/* Mini Preview of work */}
      <div className="h-32 rounded-lg overflow-hidden mb-5 relative group cursor-pointer">
        <img src={data.workSample} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs uppercase font-bold tracking-widest drop-shadow-md">View Gallery</span>
        </div>
      </div>

      <button className="w-full py-2 border border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black transition-colors flex items-center justify-center gap-2">
        <FiUserPlus /> Follow
      </button>
    </div>
  );
};

export default ArtistSpotlightCard;