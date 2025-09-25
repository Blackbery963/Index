// components/Header/DesktopNavigation.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const DesktopNavigation = ({
  routes,
  profile,
  darkMode,
  cartCount,
  orderCount,
  activeDropdown,
  setActiveDropdown,
  toggleDarkMode
}) => (
  <div className="hidden lg:flex items-center space-x-1">
    {/* Main Navigation Links */}
    <div className="flex items-center space-x-1">
      {Object.entries(routes).slice(0, 4).map(([name, route]) => (
        <NavLink key={name} name={name} route={route} />
      ))}
    </div>

    {/* Action Buttons */}
    <div className="flex items-center space-x-2 ml-4">
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <CartButton cartCount={cartCount} />
      <OrdersButton orderCount={orderCount} />
      <ProfileDropdown 
        profile={profile}
        routes={routes}
        darkMode={darkMode}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
    </div>
  </div>
);

const NavLink = ({ name, route }) => (
  <Link to={route.path}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
    >
      <span className="mr-2">{route.icon}</span>
      {name}
    </motion.button>
  </Link>
);

const ThemeToggle = ({ darkMode, toggleDarkMode }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={toggleDarkMode}
    className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all duration-200"
    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
  >
    {darkMode ? '🌙' : '☀️'}
  </motion.button>
);

const CartButton = ({ cartCount }) => (
  <Link to="/settings/cart">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all duration-200"
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

const OrdersButton = ({ orderCount }) => (
  <Link to="/Settings/Order">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all duration-200"
    >
      📦
      {orderCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {orderCount}
        </motion.span>
      )}
    </motion.div>
  </Link>
);

const ProfileDropdown = ({ profile, routes, darkMode, activeDropdown, setActiveDropdown }) => (
  <div className="relative">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
      className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all duration-200 overflow-hidden"
    >
      {profile.profileImage ? (
        <img src={profile.profileImage} alt="Profile" className="w-8 h-8 rounded-lg object-cover" />
      ) : (
        '👤'
      )}
    </motion.button>

    <AnimatePresence>
      {activeDropdown === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 mt-2 w-64 rounded-2xl glass-effect p-4 space-y-2"
        >
          <div className="text-center mb-3">
            <p className="font-semibold text-gray-900 dark:text-white">{profile.username}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{profile.email}</p>
          </div>
          
          {Object.entries(routes).slice(4).map(([name, route]) => (
            <Link
              key={name}
              to={route.path}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
              onClick={() => setActiveDropdown(null)}
            >
              <span className="text-lg">{route.icon}</span>
              <span className="text-gray-700 dark:text-gray-300">{name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);