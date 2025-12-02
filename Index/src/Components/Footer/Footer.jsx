import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiYoutube } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent backdrop-blur-sm w-full py-8 mt-20 pb-20 sm:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-[98%] sm:w-full">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-6">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <h1 className="font-eagle text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Painters' Diary
            </h1>
          </div>

          {/* Essential Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              to="/About"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              to="/Resources/Help"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
            >
              Help & Support
            </Link>
            <Link
              to="/FAQs"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
            >
              FAQs
            </Link>

            <a
              href="mailto:swarnadipb727@gmail.com"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/diarypainters2025/?next=%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="YouTube"
            >
              <FiYoutube className="w-6 h-6" />
            </a>
              <a
              href="https://x.com/Swarnadipb41037"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Painters' Diary. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {/* Made with ❤️ for artists worldwide */}
            A Platform for Artists, by an Artist
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;