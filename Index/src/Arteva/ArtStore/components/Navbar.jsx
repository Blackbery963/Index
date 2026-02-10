import React from 'react';
import { FiShoppingBag, FiSearch, FiMenu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';

const Navbar = ({ cartCount, setIsCartOpen, searchQuery, setSearchQuery }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
    <div className="max-w-[1800px] mx-auto px-4 md:px-8  py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon (Visual Only for now) */}
        {/* <button className="md:hidden text-zinc-900 dark:text-white text-xl">
          <FiMenu />
        </button> */}
        <Link to="/" className="text-2xl font-Eagle font-bold tracking-tighter text-zinc-900 dark:text-white">
          Painters' Diary
        </Link>
      </div>

      <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full px-4 py-2 w-96 group focus-within:ring-1 ring-zinc-300 dark:ring-zinc-700 transition-all">
        <FiSearch className="text-zinc-400" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search collections..."
          className="bg-transparent border-none outline-none w-full ml-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative group p-2 text-zinc-900 dark:text-white"
        >
          <ShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center rounded-full"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>
    </div>
  </nav>
);
export default Navbar;