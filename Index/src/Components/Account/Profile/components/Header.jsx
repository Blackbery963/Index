import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Edit3, LayoutDashboard, LogOut } from 'lucide-react';

const Header = ({ 
  isOwnProfile, 
  profileData, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  dropdownRef, 
  handleMouseEnter, 
  handleMouseLeave, 
  toggleDropdown, 
  handleLogout,
  isMenuOpen,
  setIsMenuOpen 
}) => {
  return (
    <header className="w-full py-3 bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg flex items-center justify-between px-6 z-50 fixed border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-all duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="text-xl text-gray-700 dark:text-gray-300" />
        </button>
        <Link to={'/'}>
          <h1 className="font-Eagle font-bold lg:text-[28px] md:text-[24px] text-[20px] text-[#001F3F] dark:text-white tracking-tight">
            Painters' Diary
          </h1>
        </Link>        
      </div>

      {isOwnProfile && (
        <div
          className="relative group"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            onClick={toggleDropdown}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium shadow-sm">
              {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="hidden md:inline text-gray-700 dark:text-gray-300 font-medium font-Playfair text-sm">
              {profileData?.username || 'User'}
            </span>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <Link to={'/account/edit_profile'}>
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 flex items-center gap-3 text-sm transition-all duration-200 border-b border-gray-100 dark:border-gray-700/60"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                </Link>

                <Link to={'/account/dashboard'}>
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 flex items-center gap-3 text-sm transition-all duration-200 border-b border-gray-100 dark:border-gray-700/60"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </button>
                </Link>

                <button
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/80 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm transition-all duration-200"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </header>
  );
};

export default Header;