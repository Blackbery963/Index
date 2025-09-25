import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Account", path: "/Account" },
    { name: "Diary", path: "/Journal" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-3 left-[2.5%] -translate-x-1/2 z-50 w-[95%] bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-xl shadow-md px-4 py-3 flex items-center justify-between"
    >
      {/* Logo */}
      <Link to="/">
        <h1 className="text-2xl font-bold text-teal-800 dark:text-teal-200 font-Eagle">Painters' Diary</h1>
      </Link>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-teal-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-gray-800 dark:text-gray-200">
        {isOpen ? <MdClose /> : <FiMenu />}
      </button>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-4 mt-2 w-44 rounded-lg bg-white dark:bg-gray-900 shadow-lg py-3 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-gray-800 transition"
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;