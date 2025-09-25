// components/AccountHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiEdit, FiUpload } from 'react-icons/fi';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

export const AccountHeader = ({ 
  isOwnProfile, 
  profileData, 
  isDropdownOpen, 
  setIsDropdownOpen,
  dropdownRef,
  handleMouseEnter,
  handleMouseLeave,
  toggleDropdown,
  handleLogout 
}) => {
  return (
    <header className="w-full h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 fixed z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PD</span>
          </div>
          <span className="font-bold text-xl text-gray-800 dark:text-white hidden sm:block">
            Painters' Diary
          </span>
        </Link>
      </div>

      {isOwnProfile && (
        <div className="flex items-center gap-3">
          <Link to="/account/upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium"
            >
              <FiUpload className="text-base" />
              Upload
            </motion.button>
          </Link>

          <div
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                {profileData?.username?.charAt(0) || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                {profileData?.username || 'User'}
              </span>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                >
                  <Link to="/account/edit_profile" className="block">
                    <button className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                      <FiEdit className="text-base" />
                      Edit Profile
                    </button>
                  </Link>
                  
                  <Link to="/account/dashboard" className="block">
                    <button className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                      <MdOutlineDashboardCustomize className="text-base" />
                      Dashboard
                    </button>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <IoIosLogOut className="text-base" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </header>
  );
};