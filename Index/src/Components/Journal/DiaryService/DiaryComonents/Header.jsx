// import React from 'react';
// import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
// import { Link} from "react-router-dom"
// const Header = ({ isCreating, startNewCreation, isMobileMenuOpen, setIsMobileMenuOpen }) => {
//   return (
//     <header className="sticky top-0 z-40 py-4 px-4 lg:w-[90%] w-[96%] mx-auto rounded-xl border-b backdrop-blur-sm bg-white/80 dark:bg-[#000705]/80 border-rose-200 dark:border-slate-800">
//       <div className="flex items-center justify-between max-w-full mx-auto w-full">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="p-2 rounded-lg lg:hidden hover:bg-rose-100 dark:hover:bg-slate-800"
//           >
//             {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>
//           <Link to={"/"}>
//           <h1 className="text-xl font-bold font-Eagle bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
//             Painters' Diary
//           </h1>
//           </Link>
//         </div>
        
//         <div className="flex items-center gap-3">
//           {!isCreating && (
//             <button
//               onClick={startNewCreation}
//               className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-medium hover:from-rose-600 hover:to-orange-600 transition-all shadow-md"
//             >
//               <Plus size={16} />
//               <span className="hidden sm:inline">Create</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { Plus, Menu, X, ArrowLeft, PanelsTopLeft, TableOfContents, Album } from 'lucide-react';
import { Link } from "react-router-dom";

const Header = ({ 
  isCreating, 
  startNewCreation, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 rounded-md lg:hidden text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <TableOfContents size={20} />}
          </button>

          {/* Brand Logo */}
          <Link to={"/"} className="group flex items-center gap-2">
            {/* Optional: Show a back arrow on hover if inside the studio */}
            {/* <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
               <span className="font-serif font-bold text-lg leading-none pt-0.5">P</span>
            </div> */}
            
            <h1 className="text-xl md:text-2xl font-Eagle font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:opacity-80 transition-opacity">
              Painters' Diary
            </h1>
          </Link>
        </div>
        
        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          
          {/* User Profile / Context placeholder could go here */}

          {!isCreating && (
            <button
              onClick={startNewCreation}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Entry</span>
            </button>
          )}

           {/* If we are creating, maybe show a "Exit" or "Drafts" button? 
               Optional visual filler for balance if needed */}
           {isCreating && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Studio Active</span>
              </div>
           )}
           <Link to={"/journal"}>
           <div className=' text-zinc-800 dark:text-zinc-400'>
            <Album/>
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;