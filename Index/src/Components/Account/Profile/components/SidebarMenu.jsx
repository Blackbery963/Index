import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';
import { ROUTES, ROUTE_ICONS } from '../utils/constants';


const SidebarMenu = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  profileData, 
  profileImage, 
  followerCount 
}) => {
  const menuVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed top-0 left-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-gray-800 dark:to-gray-900 p-6 flex items-start justify-between">
            <div className="flex items-center gap-4 w-full">
              <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white/10 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-white/20 backdrop-blur-sm">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                ) : (
                  <User className="text-3xl text-white/70" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-white font-semibold text-lg truncate">
                  {profileData.nickname || 'Username'}
                </h1>
                <p className="text-white/80 text-sm truncate">
                  {profileData.email || 'user@example.com'}
                </p>
                <p className="text-white/80 text-sm mt-1">
                  {followerCount} Followers
                </p>
              </div>
            </div>
            <button
              className="text-white/80 hover:text-white transition-colors flex-shrink-0 ml-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 bg-gray-50/50 dark:bg-gray-950/50 h-[calc(100%-12rem)] backdrop-blur-sm">
            {Object.keys(ROUTES).map((item) => (
              <Link
                to={ROUTES[item]}
                key={item}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-200 mb-2 font-Playfair backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-gray-500 dark:text-gray-400 group-hover:text-purple-600">
                  {ROUTE_ICONS[item]}
                </span>
                <span className="font-medium text-sm">{item}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenu;