// // Components/Footer.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Twitter, Instagram, MessageCircle } from 'lucide-react';

// const Footer = () => {
//   const socialLinks = [
//     { icon: Twitter, href: "#", label: "Twitter" },
//     { icon: Instagram, href: "#", label: "Instagram" },
//     { icon: MessageCircle, href: "#", label: "Discord" },
//   ];

//   const links = {
//     Features: ["Portfolios", "Challenges", "Monetization"],
//     Company: ["About", "Careers", "Press"],
//   };

//   return (
//     <footer className="bg-gray-800/20 dark:bg-gray-900/20 backdrop-blur-lg border-t border-white/10 dark:border-gray-600/10">
//       <div className="max-w-6xl mx-auto px-4 py-4">


//         <div className="border-t border-gray-700/50 pt-8 mt-8 text-center text-gray-500">
//           <p>© 2025 ArtVerse. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Youtube, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", label: "X", color: "hover:text-slate-900 dark:hover:text-white" },
  ];

  return (
    <footer className="relative pt-6 pb-6 overflow-hidden bg-slate-50 dark:bg-slate-950/50">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Purpose / Brand Section */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              ArtVerse
            </span>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            The premier platform for digital artists to connect, collaborate, and grow. Join the revolution of creativity today.
          </p>
        </div>

        {/* Social Media Buttons */}
        <div className="flex gap-6 mb-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className={`p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-110 hover:shadow-md ${social.color}`}
              aria-label={social.label}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright & Legal */}
        <div className="w-full pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © {currentYear} ArtVerse. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-500">
            <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;