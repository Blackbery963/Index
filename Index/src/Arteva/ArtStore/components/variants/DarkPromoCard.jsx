import React from 'react';

const DarkPromoCard = ({ data }) => {
  return (
    <div className="relative h-[400px] md:rounded-xl overflow-hidden group">
      <img 
        src={data.image} 
        alt={data.title} 
        className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2 border-l-2 border-white pl-2">
          Featured
        </p>
        <h3 className="text-3xl font-serif font-bold mb-1 leading-tight">{data.title}</h3>
        <p className="text-sm text-zinc-200 mb-6 font-light">{data.subtitle}</p>
        
        <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
          {data.cta}
        </button>
      </div>
    </div>
  );
};

export default DarkPromoCard;