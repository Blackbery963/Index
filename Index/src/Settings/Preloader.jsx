import React from 'react';
import Logo from "../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center dark:bg-zinc-950 bg-zinc-100 text-white">
      
      {/* 1. LOGO SECTION */}
      {/* Replace this div with your actual <img> tag if you have a logo file */}
      <div className="mb-8 animate-pulse">
        {/* Placeholder Logo: A gradient circle */}

<div className="p-[3px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 ">
  <div className="p-[4px] rounded-full bg-white dark:bg-zinc-900">
    <div className="flex h-16 w-16 items-center justify-center rounded-full overflow-hidden shadow-2xl">
      <img src={Logo} alt="Logo" className="h-full w-full object-cover" />
    </div>
  </div>

</div>

      </div>

      {/* 2. TEXT / BRAND NAME */}
      <div className=' flex flex-col items-center justify-center'>
      <h1 className="mb-4 text-2xl font-semibold tracking-widest dark:text-gray-200 text-zinc-800 font-Eagle">
        Painters' Diary
      </h1>
       <p className=' text-[12px] font-Playfair text-zinc-800 dark:text-zinc-100'>Loading Your Creative Space...</p>
      </div>

      {/* 3. LOADING SPINNER */}
      {/* A subtle spinner at the bottom */}
      <div className="flex items-center gap-2 pt-4">
        <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-pink-500"></div>
      </div>
      
      {/* Optional: Footer Text (like 'From Meta') */}
      <div className="absolute bottom-10 text-sm text-gray-500">
        From Painters' DIary
      </div>

    </div>
  );
};

export default Preloader;

