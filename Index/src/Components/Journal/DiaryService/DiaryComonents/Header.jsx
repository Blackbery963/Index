import React from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';

const Header = ({ isCreating, startNewCreation, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-40 py-4 px-4 lg:w-[90%] w-[96%] mx-auto rounded-xl border-b backdrop-blur-sm bg-white/80 dark:bg-[#000705]/80 border-rose-200 dark:border-slate-800">
      <div className="flex items-center justify-between max-w-full mx-auto w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg lg:hidden hover:bg-rose-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <h1 className="text-xl font-bold font-Eagle bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
            MindGarden
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {!isCreating && (
            <button
              onClick={startNewCreation}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-medium hover:from-rose-600 hover:to-orange-600 transition-all shadow-md"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Create</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;