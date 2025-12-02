import React from "react";
import { Link } from "react-router-dom";
import { Search, User, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../../../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"; // Update path

const JournalHeader = ({ 
  currentUser, 
  searchQuery, 
  setSearchQuery, 
  showSearch, 
  setShowSearch, 
  isSearching 
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl overflow-hidden p-0.5">
              <img src={logoImage} className="w-full h-full object-cover rounded-lg" alt="Logo" />
            </div>
            <span className="font-bold text-lg md:text-xl font-Eagle hidden sm:block tracking-tight text-slate-900 dark:text-white">
              Painters' Diary
            </span>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center w-96 relative">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inspiration..." 
            className="w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-zinc-900 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-slate-900 dark:text-zinc-100 placeholder:text-slate-400"
          />
          {isSearching && (
            <Loader2 className="w-4 h-4 absolute right-3 animate-spin text-emerald-500" />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-600 dark:text-zinc-400"
          >
            {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          
          <Link to="/account" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-colors">
             <User className="w-5 h-5" />
          </Link>

          {currentUser && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-100 dark:border-emerald-800">
              <div className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-[10px] font-bold">
                {currentUser.name?.[0] || "U"}
              </div>
              <span className="max-w-[80px] truncate">{currentUser.name || "User"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-zinc-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none text-slate-900 dark:text-white"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default JournalHeader;