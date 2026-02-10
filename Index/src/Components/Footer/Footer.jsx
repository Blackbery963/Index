// import { Link } from 'react-router-dom';
// import { FaInstagram, FaYoutube } from 'react-icons/fa';
// import { FiYoutube } from 'react-icons/fi';
// import { FaXTwitter } from "react-icons/fa6";

// function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-transparent backdrop-blur-sm w-full py-8 mt-20 pb-20 sm:pb-4 z-[1000]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-[98%] sm:w-full flex flex-col lg:items-center items-start">
//         {/* Main Footer Content */}
//         <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start gap-6 mb-6">
//           {/* Brand */}
//           <div className="text-center lg:text-left">
//             <h1 className="font-eagle text-2xl font-semibold text-gray-800 dark:text-white mb-2">
//               Painters' Diary
//             </h1>
//           </div>

//           {/* Essential Links */}
//           <div className="flex flex-wrap justify-center gap-8">
//             <Link
//               to="/About"
//               className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
//             >
//               About
//             </Link>
//             <Link
//               to="/Resources/Help"
//               className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
//             >
//               Help & Support
//             </Link>
//             <Link
//               to="/FAQs"
//               className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
//             >
//               FAQs
//             </Link>

//             <a
//               href="mailto:swarnadipb727@gmail.com"
//               className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
//             >
//               Contact
//             </a>
//           </div>

//           {/* Social Links */}
//           <div className="flex gap-6">
//             <a
//               href="https://www.instagram.com/diarypainters2025/?next=%2F"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
//               aria-label="Instagram"
//             >
//               <FaInstagram className="w-6 h-6" />
//             </a>
//             <a
//               href="https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
//               aria-label="YouTube"
//             >
//               <FiYoutube className="w-6 h-6" />
//             </a>
//               <a
//               href="https://x.com/Swarnadipb41037"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110"
//               aria-label="Twitter"
//             >
//               <FaXTwitter className="w-6 h-6" />
//             </a>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4" />

//         {/* Copyright */}
//         <div className="text-center">
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             © {currentYear} Painters' Diary. All rights reserved.
//           </p>
//           <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//             {/* Made with ❤️ for artists worldwide */}
//             A Platform for Artists, by an Artist
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


// import { Link } from 'react-router-dom';
// import { FaInstagram, FaYoutube } from 'react-icons/fa';
// import { FiYoutube } from 'react-icons/fi';
// import { FaXTwitter } from "react-icons/fa6";

// function Footer() {
//   const currentYear = new Date().getFullYear();

//   const links = [
//     { name: 'About', path: '/About' },
//     { name: 'Help & Support', path: '/Resources/Help' },
//     { name: 'FAQs', path: '/FAQs' },
//   ];

//   return (
//     <footer className="w-full mt-20 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm z-50">
//       <div className="max-w-4xl mx-auto px-6 py-10">
        
//         {/* Container: Left on Mobile, Center on Desktop */}
//         <div className="flex flex-col gap-8 md:items-center items-start text-left md:text-center">
//           <div className=' flex flex-col md:flex-row items-center justify-between'>
          
//           {/* 1. Brand & Tagline */}
//           <div className="space-y-2">
//             <h1 className="font-eagle text-xl font-bold text-gray-900 dark:text-white tracking-wide">
//               Painters' Diary
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               A Platform for Artists, by an Artist
//             </p>
//           </div>

//           {/* 2. Navigation Links */}
//           <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center">
//             {links.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <a
//               href="mailto:swarnadipb727@gmail.com"
//               className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
//             >
//               Contact
//             </a>
//           </div>
//           </div>

//           {/* 3. Social Icons */}
//           <div className="flex gap-6 text-gray-500 dark:text-gray-400">
//             <a
//               href="https://www.instagram.com/diarypainters2025/?next=%2F"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-pink-600 dark:hover:text-pink-500 transition-colors hover:scale-110 transform duration-200"
//               aria-label="Instagram"
//             >
//               <FaInstagram size={22} />
//             </a>
//             <a
//               href="https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-red-600 dark:hover:text-red-500 transition-colors hover:scale-110 transform duration-200"
//               aria-label="YouTube"
//             >
//               <FiYoutube size={22} />
//             </a>
//             <a
//               href="https://x.com/Swarnadipb41037"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-black dark:hover:text-white transition-colors hover:scale-110 transform duration-200"
//               aria-label="Twitter"
//             >
//               <FaXTwitter size={22} />
//             </a>
//           </div>

//           {/* 4. Copyright */}
//           <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
//             © {currentYear} Painters' Diary. All rights reserved.
//           </p>
          
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;



import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiYoutube } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'About', path: '/About' },
    { name: 'Help', path: '/Resources/Help' },
    { name: 'FAQs', path: '/FAQs' },
    { name: 'Contact', path: 'mailto:swarnadipb727@gmail.com', isExternal: true },
  ];

  return (
    <footer className="w-full mt-20 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-6 md:py-4 py-8">
        
        {/* Main Container */}
        <div className="flex flex-col gap-6 md:gap-4">

          {/* --- ROW 1: Logo & Navigation --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Logo Section */}
            <div>
              <h1 className="font-eagle text-xl font-bold text-gray-900 dark:text-white tracking-wide">
                Painters' Diary
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 md:hidden">
                A Platform for Artists, by an Artist
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-6 md:gap-8 md:pr-6">
              {links.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* --- ROW 2: Socials & Copyright --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:border-t md:border-gray-100 md:dark:border-gray-800 md:pt-8">
            
            {/* Social Icons */}
            <div className="flex gap-4 items-center">
               <a href="https://www.instagram.com/diarypainters2025/?next=%2F" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                 <FaInstagram className="w-5 h-5 text-gray-500 hover:text-pink-600 transition-colors" />
               </a>
               <a href="https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                 <FiYoutube className="w-5 h-5 text-gray-500 hover:text-red-600 transition-colors" />
               </a>
               <a href="https://x.com/Swarnadipb41037" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                 <FaXTwitter className="w-5 h-5 text-gray-500 hover:text-black dark:hover:text-white transition-colors" />
               </a>
            </div>

            {/* Copyright & Tagline (Desktop) */}
            <div className="flex flex-col md:items-end items-start md:pr-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {currentYear} Painters' Diary.
              </p>
              {/* Tagline only shows here on Desktop to keep alignment clean */}
              <p className="hidden md:block text-xs text-gray-400 dark:text-gray-500 mt-1">
                A Platform for Artists, by an Artist
              </p>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;