
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import footer from './Footer-images/freepik-export-20240930073049yijq.png'
// import palette from './Footer-images/pallete.jpg'
// import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';


// function Footer() {
//   const foot = {
//     backgroundImage: `url(${footer})`,
//   };

//   return (
//     <footer className="min-h-screen bg-slate-100 dark:bg-[#040d1200] w-full bg-cover bg-center flex justify-center items-center">
//       <div
//         className="md:h-[94vh] h-full w-[95vw] border border-red-50 rounded-lg shadow-lg bg-center bg-cover lg:my-0 my-4"
//         style={foot}
//       >
//         {/* Top Navbar */}
//         <nav className="w-full h-[100px] flex items-center justify-center md:justify-between px-4 md:px-6">
//           {/* Logo */}
//           <div className="h-[60px] w-[60px] bg-red-400 rounded-full overflow-hidden border-2 border-red-50 hidden md:block">
//             <img className="h-full w-full" src={palette} alt="Logo" />
//           </div>
//           {/* Logo Name */}~
//           <div className="text-center lg:ml-[-40%]">
//             <h1 className="font-eagle text-lg md:text-4xl font-bold">
//               Painters' Diary
//             </h1>
//             <h6 className="font-cookie text-sm md:text-2xl font-medium mt-[-4px]">
//               The Diary of Every Artist
//             </h6>
//           </div>
//           {/* Sign Up Button */}
//           <Link to="/signup">
//           <div>
//             <button className="font-news w-full bg-red-400 px-2 md:px-3 md:rounded-lg text-sm md:text-lg text-white md:block hidden">
//               Sign Up
//             </button>
//           </div>
//           </Link>
//         </nav>

//         {/* Important Events */}
//         <div className="my-6">
//           <h1 className="text-center text-lg md:text-2xl font-bold">
//             Important Events
//           </h1>
//           <div className="h-[30vh] w-[90%] mx-auto mt-4 border border-white rounded-xl"></div>
//         </div>
        
//          {/* Footer Links */}
// <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 px-[5vw] mt-8 text-center sm:text-left">
//   {[
//     {
//       title: "Company",
//       links: [
//         { text: "Home", to: "/" },
//         { text: "About", to: "/About" },
//         { text: "Community", to: "/Community" },
//         { text: "Blog", to: "/Blog" }
//       ],
//     },
//     {
//       title: "Resources",
//       links: [
//         { text: "FAQs", to: "/FAQs" },
//         { text: "Reviews", to: "/reviews" },
//         { text: "Help & Support", to: "/Resources/Help" },
//         { text: "Events", to: "/events" }
//       ],
//     },
//     {
//       title: "Legal",
//       links: [
//         { text: "Terms & Conditions", to: "Legal/Terms_Conditions" },
//         { text: "Privacy Policy", to: "/Legal/Privacy_Policy" },
//         { text: "License", to: "Legal/License" },
//         { text: "Cookies", to: "/cookies" }
//       ],
//     },
//     {
//       title: "Product",
//       links: [
//         { text: "Update", to: "/Update" },
//         { text: "Security", to: "/Product/Security" }
//       ],
//     },
//     {
//       title: "Contact Us",
//       links: [
//         { text: "Berunanpukuriya" },
//         { text: "Malikapur" },
//         { text: "Kolkata, 700126" },
//         { text: "+918617331488" }
//       ],
//     },
//   ].map((section, idx) => (
//     <div key={idx}>
//       <h1 className="text-lg md:text-xl font-dmserif text-white">
//         {section.title}
//       </h1>
//       {section.links.map((link, index) => (
//         <Link key={index} to={link.to || "#"}>
//           <p
//             className="text-sm md:text-base font-news font-semibold hover:underline hover:text-cyan-600 cursor-pointer"
//           >
//             {link.text}
//           </p>
//         </Link>
//       ))}
//     </div>
//   ))}
// </div>

//         {/* Contact Info */}
//         <div className="flex flex-col items-center justify-center mx-auto mt-10">
//   <p className="text-sm md:text-base">EMAIL US</p>
//   <p className="text-sm md:text-base">swarnadipb727@gmail.com</p>
// </div>

// {/* Social Media */}
// <div className="flex items-center justify-center gap-6 mt-4">
//   <div className="hidden md:block w-[20vw] h-[2px] bg-black"></div>
//   <div className="flex gap-6">
//     {[
//       {
//         Icon: FaFacebook,
//         Link: 'https://www.facebook.com/profile.php?id=61577769513723'
//       },
//       {
//         Icon: FaInstagram,
//         Link: 'https://instagram.com/your_instagram'
//       },
//       {
//         Icon: FaXTwitter,
//         Link: 'https://twitter.com/your_twitter'
//       },
//       {
//         Icon: FaYoutube,
//         Link: 'https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F'
//       },
//       {
//         Icon: FaLinkedin,
//         Link: 'https://linkedin.com/in/your_linkedin'
//       }
//     ].map(({ Icon, Link }, idx) => (
//       <a
//         key={idx}
//         href={Link || '#'}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <div
//           className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] rounded-lg cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110"
//         >
//           <Icon className="h-full w-full p-1 text-black hover:text-cyan-600" />
//         </div>
//       </a>
//     ))}
//   </div>
//   <div className="hidden md:block w-[20vw] h-[2px] bg-black"></div>
// </div>


//         {/* Copyright */}
//         <div className="flex flex-col items-center justify-center my-6 text-center text-xs md:text-sm">
//           <p>Copyright © 2024 Painters' Diary. All Rights Reserved.</p>
//           <p>
//             This website and its content are the property of Painters' Diary.
//             Unauthorized use is prohibited.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer



// import { Link } from 'react-router-dom'
// import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';

// function Footer() {
//   const sections = [
//     {
//       title: "Company",
//       links: [
//         { text: "Home", to: "/" },
//         { text: "About", to: "/About" },
//         { text: "Community", to: "/Community" },
//         { text: "Blog", to: "/Blog" }
//       ],
//     },
//     {
//       title: "Resources",
//       links: [
//         { text: "FAQs", to: "/FAQs" },
//         { text: "Reviews", to: "/reviews" },
//         { text: "Help & Support", to: "/Resources/Help" },
//         { text: "Events", to: "/events" }
//       ],
//     },
//     {
//       title: "Legal",
//       links: [
//         { text: "Terms & Conditions", to: "/Legal/Terms_Conditions" },
//         { text: "Privacy Policy", to: "/Legal/Privacy_Policy" },
//         { text: "License", to: "/Legal/License" },
//         { text: "Cookies", to: "/cookies" }
//       ],
//     },
//     {
//       title: "Product",
//       links: [
//         { text: "Update", to: "/Update" },
//         { text: "Security", to: "/Product/Security" }
//       ],
//     },
//     {
//       title: "Contact Us",
//       links: [
//         { text: "Berunanpukuriya" },
//         { text: "Malikapur" },
//         { text: "Kolkata, 700126" },
//         { text: "+918617331488" }
//       ],
//     },
//   ];

//   const socialLinks = [
//     { Icon: FaFacebook, link: 'https://www.facebook.com/profile.php?id=61577769513723' },
//     { Icon: FaInstagram, link: 'https://instagram.com/your_instagram' },
//     { Icon: FaXTwitter, link: 'https://twitter.com/your_twitter' },
//     { Icon: FaYoutube, link: 'https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F' },
//     { Icon: FaLinkedin, link: 'https://linkedin.com/in/your_linkedin' },
//   ];

//   return (
//     <footer className="bg-gradient-to-br from-slate-900 to-slate-700 text-white w-full pt-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title */}
//         <div className="text-center mb-10">
//           <h1 className="font-eagle text-3xl md:text-5xl">Painters' Diary</h1>
//           <p className="font-cookie text-lg md:text-2xl text-gray-300 mt-1">
//             The Diary of Every Artist
//           </p>
//         </div>

//         {/* Links Section */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
//           {sections.map((section, idx) => (
//             <div key={idx}>
//               <h3 className="font-dmserif text-lg mb-4">{section.title}</h3>
//               {section.links.map((link, i) =>
//                 link.to ? (
//                   <Link
//                     key={i}
//                     to={link.to}
//                     className="block text-sm text-gray-300 hover:text-cyan-400 transition duration-200"
//                   >
//                     {link.text}
//                   </Link>
//                 ) : (
//                   <p key={i} className="text-sm text-gray-400">{link.text}</p>
//                 )
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gray-600 mb-8" />

//         {/* Contact & Social */}
//         <div className="flex flex-col items-center gap-4 text-center">
//           <p className="text-sm">EMAIL US</p>
//           <p className="text-sm text-cyan-300 font-medium">swarnadipb727@gmail.com</p>

//           <div className="flex gap-6 mt-4">
//             {socialLinks.map(({ Icon, link }, idx) => (
//               <a
//                 key={idx}
//                 href={link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-xl sm:text-2xl hover:text-cyan-400 transition-transform transform hover:scale-125"
//               >
//                 <Icon />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-10 text-center text-xs text-gray-400">
//           <p>© 2024 Painters' Diary. All rights reserved.</p>
//           <p className="max-w-xl mx-auto mt-2">
//             This website and its content are the property of Painters' Diary. Unauthorized use is strictly prohibited.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;



import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  // Animation variants for links
  const linkVariants = {
    hover: { scale: 1.05, color: '#06B6D4', transition: { duration: 0.2 } },
  };

  // Animation variants for social icons
  const iconVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <footer className="max-w-[95vw] mx-auto rounded-lg mb-6 bg-gradient-to-br from-[#B3CFFA] to-[#FAD1E6] dark:from-[#151c2e] dark:via-gray-900 dark:to-[#1d0a16] text-gray-800 dark:text-gray-200 py-12">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Logo, Brand, Sign Up */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="h-12 w-12 bg-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              PD
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight font-Eagle">
                Painters' Diary
              </h1>
              <p className=" text-sm text-gray-600 dark:text-gray-400 font-news">
                The Diary of Every Artist
              </p>
            </div>
          </div>
          {/* Sign Up Button */}
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#06B6D4' }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 text-white font-news text-lg px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>

        {/* Paintbrush Divider */}
        <div className="my-8 flex justify-center">
          <svg
            width="120"
            height="20"
            viewBox="0 0 120 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-500 dark:text-cyan-400"
          >
            <path
              d="M2 18C10 10 30 2 60 2C90 2 110 10 118 18"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Important Events Placeholder */}
        <div className="mb-12 text-center">
          <h2 className="font-dmserif text-2xl font-bold mb-4">
            Important Events
          </h2>
          <div className="w-3/4 mx-auto h-32 bg-white/50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 font-news">
            Upcoming events will be displayed here
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {[
            {
              title: 'Company',
              links: [
                { text: 'Home', to: '/' },
                { text: 'About', to: '/About' },
                { text: 'Community', to: '/Community' },
                { text: 'Blog', to: '/Blog' },
              ],
            },
            {
              title: 'Resources',
              links: [
                { text: 'FAQs', to: '/FAQs' },
                { text: 'Reviews', to: '/reviews' },
                { text: 'Help & Support', to: '/Resources/Help' },
                { text: 'Events', to: '/events' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { text: 'Terms & Conditions', to: '/Legal/Terms_Conditions' },
                { text: 'Privacy Policy', to: '/Legal/Privacy_Policy' },
                { text: 'License', to: '/Legal/License' },
                { text: 'Cookies', to: '/cookies' },
              ],
            },
            {
              title: 'Product',
              links: [
                { text: 'Update', to: '/Update' },
                { text: 'Security', to: '/Product/Security' },
              ],
            },
            {
              title: 'Contact Us',
              links: [
                { text: 'Berunanpukuriya' },
                { text: 'Malikapur' },
                { text: 'Kolkata, 700126' },
                { text: '+918617331488' },
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="flex flex-col space-y-2 border p-4 rounded-lg shadow-lg">
              <h3 className="font-dmserif text-xl font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              {section.links.map((link, index) => (
                <motion.div
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="font-news text-base hover:underline"
                    >
                      {link.text}
                    </Link>
                  ) : (
                    <p className="font-news text-base">{link.text}</p>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Paintbrush Divider */}
        <div className="my-8 flex justify-center">
          <svg
            width="120"
            height="20"
            viewBox="0 0 120 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-500 dark:text-cyan-400"
          >
            <path
              d="M2 18C10 10 30 2 60 2C90 2 110 10 118 18"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Contact Info & Social Media */}
        <div className="flex flex-col items-center space-y-6 mb-8">
          {/* Email */}
          <div className="text-center">
            <p className="font-news text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Email Us
            </p>
            <a
              href="mailto:paintersdiary2025@gmail.com"
              className="font-news text-base text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              paintersdiary2025@gmail.com
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            {[
              {
                Icon: FaFacebook,
                link: 'https://www.facebook.com/profile.php?id=61577769513723',
              },
              {
                Icon: FaInstagram,
                link: 'https://instagram.com/your_instagram',
              },
              {
                Icon: FaXTwitter,
                link: 'https://twitter.com/your_twitter',
              },
              {
                Icon: FaYoutube,
                link: 'https://youtube.com/@blackberry-cc5vy?si=bL2epR4xYk1NbV9F',
              },
              {
                Icon: FaLinkedin,
                link: 'https://linkedin.com/in/your_linkedin',
              },
            ].map(({ Icon, link }, idx) => (
              <motion.a
                key={idx}
                href={link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="h-10 w-10 bg-white/50 dark:bg-gray-800/50 rounded-full flex items-center justify-center shadow-md"
              >
                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm font-news text-gray-600 dark:text-gray-400">
          <p>Copyright © 2025 Painters' Diary. All Rights Reserved.</p>
          <p className="mt-1">
            This website and its content are the property of Painters' Diary.
            Unauthorized use is prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


