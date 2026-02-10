import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const EditorialQuoteCard = ({ data }) => {
  return (
    <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 md:rounded-xl p-8 flex flex-col justify-center items-center text-center min-h-[300px]">
      <FaQuoteLeft className="text-3xl text-zinc-700 dark:text-zinc-300 mb-6" />
      
      <h3 className="text-2xl md:text-3xl font-serif leading-tight mb-6">
        {data.quote}
      </h3>
      
      <div className="w-10 h-0.5 bg-zinc-700 dark:bg-zinc-300 mb-4"></div>
      
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
        {data.author}
      </p>
    </div>
  );
};

export default EditorialQuoteCard;