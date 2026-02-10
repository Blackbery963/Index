import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const MiniCollectionCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 md:rounded-xl overflow-hidden shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-serif font-bold text-lg leading-none">{data.title}</h3>
          <p className="text-xs text-zinc-500 uppercase tracking-wide">{data.subtitle}</p>
        </div>
        <button className="text-xs flex items-center gap-1 hover:text-zinc-600 transition-colors">
          View <FiArrowRight />
        </button>
      </div>

      {/* 2x2 Grid Layout within the Masonry Item */}
      <div className="grid grid-cols-2 gap-2">
        {data.items.map((item, idx) => (
          <div key={idx} className="group relative aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden cursor-pointer">
            <img 
              src={item.img} 
              alt="collection item" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Price tag on hover */}
            <div className="absolute bottom-1 left-1 bg-white/90 dark:bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              ₹{item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCollectionCard;