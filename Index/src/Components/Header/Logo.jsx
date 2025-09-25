// components/Header/Logo.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex-shrink-0"
  >
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">P</span>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Painters' Diary
        </h1>
      </div>
    </Link>
  </motion.div>
);