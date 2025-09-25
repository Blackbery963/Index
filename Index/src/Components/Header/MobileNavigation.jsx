// components/Header/MobileNavigation.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const MobileNavigation = ({
  routes,
  profile,
  darkMode,
  cartCount,
  orderCount,
  activeDropdown,
  setActiveDropdown,
  toggleDarkMode
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center space-x-2">
      {/* Quick Actions */}
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <CartButton cartCount={cartCount} />
      
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center"
      >
        {isMenuOpen ? '✕' : '☰'}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full glass-effect z-50 p-6"
            >
              {/* Profile Section */}
              <div className="flex items-center space-x-3 mb-6 p-4 rounded-2xl bg-white/10">
                {profile.profileImage ? (
                  <img src={profile.profileImage} alt="Profile" className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gray-400 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{profile.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{profile.email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {Object.entries(routes).map(([name, route]) => (
                  <Link
                    key={name}
                    to={route.path}
                    className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/10 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-xl">{route.icon}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{name}</span>
                  </Link>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>🛒 {cartCount}</span>
                <span>📦 {orderCount}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reuse the same button components from DesktopNavigation
const ThemeToggle = ({ darkMode, toggleDarkMode }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={toggleDarkMode}
    className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center"
  >
    {darkMode ? '🌙' : '☀️'}
  </motion.button>
);

const CartButton = ({ cartCount }) => (
  <Link to="/settings/cart">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-xl glass-effect flex items-center justify-center"
    >
      🛒
      {cartCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {cartCount}
        </motion.span>
      )}
    </motion.div>
  </Link>
);