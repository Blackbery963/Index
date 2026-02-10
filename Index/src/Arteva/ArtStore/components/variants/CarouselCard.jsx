import React from 'react';
import { MdCurrencyRupee } from 'react-icons/md';

const CarouselCard = ({ data }) => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 md:rounded-xl overflow-hidden py-4">
      <div className="px-4 mb-3">
        <h3 className="font-serif font-bold text-lg">{data.title}</h3>
      </div>
      
      {/* Horizontal Scroll Area */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x hide-scrollbar">
        {data.items.map((item, idx) => (
          <div key={idx} className="snap-center shrink-0 w-[140px]">
            <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="text-xs font-bold truncate text-zinc-800 dark:text-zinc-200">{item.title}</h4>
            <p className="text-xs text-zinc-500 flex items-center">
              <MdCurrencyRupee className="text-[10px]" /> {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselCard;