
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { databases } from '../../appwriteConfig'; // 👈 import Appwrite config
// import { ID } from "appwrite"; // for unique document IDs
// import FeedBackground from './evaluation-feedback-customer-smiley-response-min.jpg';
// import FeedBackground2 from './9019830.jpg';
// import { FaHome, FaInfoCircle, FaUser } from 'react-icons/fa';
// import { MdBook } from 'react-icons/md';
// import { motion } from 'framer-motion';
// import { HiMenu, HiX } from "react-icons/hi";
// import { toast, ToastContainer } from 'react-toastify';


// function Feedback() {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Colorful emotions with emoji and text
//   const emojiReactions = {
//     1: { text: '😞 Very Bad', color: '#ff4d4d' },
//     2: { text: '🙁 Bad', color: '#ff8c1a' },
//     3: { text: '😐 Okay', color: '#ffd700' },
//     4: { text: '🙂 Good', color: '#00cc00' },
//     5: { text: '😄 Excellent!', color: '#00ced1' },
//   };

//   const handleClick = (star) => {
//     setRating(star);
//   };

//   // Submit Feedback
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username || !message || rating === 0) {
//       alert("Please fill all fields and give a rating!");
//       return;
//     }

//     try {
//       setLoading(true);
//       await databases.createDocument(
//         import.meta.env.VITE_APPWRITE_DATABASE_ID, // replace with your DB ID
//         import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID, // replace with your Collection ID
//         ID.unique(),
//         {
//           username,
//           rating,
//           message,
//         }
//       );
//       toast.success("💡 Thanks for sharing! Your voice makes Painters' Diary better.");
//       setUsername("");
//       setMessage("");
//       setRating(0);
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       toast.error("❌ Something went wrong, try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderEmoji = (text) => text;

//   const [menuOpen, setMenuOpen] = useState(false);

//   const buttonVariants = {
//     hover: { scale: 1.1, backgroundColor: "#ffffff33", transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   const navLinks = [
//     { to: "/", label: "Home", icon: <FaHome /> },
//     { to: "/About", label: "About", icon: <FaInfoCircle /> },
//     { to: "/Account", label: "Account", icon: <FaUser /> },
//     { to: "/Journal", label: "Diary", icon: <MdBook /> },
//   ];

//   return (
//     <>
//      <ToastContainer/>
//         <header className=" py-2 max-w-[96%] w-full fixed top-2 ml-[2%] rounded-xl z-50 bg-white/20 backdrop-blur-lg shadow-lg flex items-center justify-between px-4 md:px-8">
//       {/* Title */}
//       <Link to={"/"}>
//       <h1 className="lg:text-[35px] md:text-[28px] sm:text-[24px] text-[20px] font-bold font-Eagle drop-shadow-lg text-yellow-800">
//         Painters' Diary
//       </h1>
//       </Link>

//       {/* Desktop Nav */}
      
//       <nav className="hidden md:flex gap-x-6 font-playfair font-semibold">
//   {navLinks.map((link, i) => (
//     <Link key={i} to={link.to} className="relative group">
//       <motion.div
//         className="px-2 py-2 text-white/90 group-hover:text-white flex items-center gap-2"
//         variants={buttonVariants}
//         whileTap="tap"
//       >
//         {link.icon}
//         <span>{link.label}</span>
//       </motion.div>
//       {/* Underline */}
//       <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
//     </Link>
//   ))}
// </nav>


//       {/* Mobile Hamburger */}
//       <div className="md:hidden flex items-center">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-gray-800 text-3xl focus:outline-none"
//         >
//           {menuOpen ? <HiX /> : <HiMenu />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="absolute top-[80px] right-0 w-48 bg-white backdrop-blur-md rounded-xl shadow-xl p-4 flex flex-col gap-3 md:hidden"
//         >
//           {navLinks.map((link, i) => (
//             <Link
//               key={i}
//               to={link.to}
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-800 font-semibold px-2 py-2 rounded-md hover:bg-white/20 flex items-center gap-2"
//             >
//               {link.icon}
//               {link.label}
//             </Link>
//           ))}
//         </motion.div>
//       )}
//     </header>

//       {/* Example for desktop form */}
//       <div
//         className="min-h-screen w-screen bg-center bg-cover flex items-center justify-center lg:block hidden pt-[250px]"
//         style={{ backgroundImage: `url(${FeedBackground})` }}
//       >
//         <main className="w-[90%] max-w-2xl h-[70vh] bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center flex-col gap-6 p-6 rounded-2xl shadow-2xl border border-teal-200">
//           <h1 className="text-4xl text-center font-serif text-teal-900 font-semibold drop-shadow-md">
//             Your Opinion Shapes Us!
//           </h1>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
//             <div>
//               <label className="text-lg font-semibold text-teal-800 mb-2 block font-serif">Your Name</label>
//               <input
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full p-3 rounded-lg bg-white/30 text-teal-900 outline-none border border-teal-300"
//                 type="text"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div>
//               <label className="text-lg font-semibold text-teal-800 mb-2 block font-serif">Rate Our Platform</label>
//               <div className="flex justify-center gap-2 text-4xl">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     onMouseEnter={() => setHover(star)}
//                     onMouseLeave={() => setHover(0)}
//                     onClick={() => handleClick(star)}
//                     className="cursor-pointer transition-all duration-200 hover:scale-125"
//                     style={{
//                       color: star <= (hover || rating) ? '#00ced1' : '#d1d5db',
//                     }}
//                   >
//                     ⭐
//                   </span>
//                 ))}
//               </div>
//               {rating > 0 && (
//                 <p className="text-center text-xl font-serif mt-2 text-teal-700 font-medium">
//                   {renderEmoji(emojiReactions[rating].text)}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label className="text-lg font-semibold text-teal-800 mb-2 block font-serif">Share Your Thoughts</label>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="w-full h-32 p-4 rounded-lg bg-white/30 border border-teal-300"
//                 placeholder="Write your feedback here..."
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-500 text-white rounded-lg hover:from-teal-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
//             >
//               {loading ? "Submitting..." : "Submit Feedback"}
//             </button>
//           </form>
//         </main>
//       </div>

//       {/* Mobile View */}
//       <div
//         className="min-h-screen w-screen bg-center bg-cover flex items-center justify-center lg:hidden  pt-[120px]"
//         style={{ backgroundImage: `url(${FeedBackground2})` }}
//       >
//         <main className="w-[90%] max-w-md h-[70vh] bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center flex-col gap-4 p-4 rounded-2xl shadow-2xl border border-teal-200">
//           <h1 className="text-2xl text-center font-serif text-teal-900 font-semibold drop-shadow-md">
//             Your Opinion Shapes Us!
//           </h1>
//           <form className="flex flex-col gap-4 w-full">
//             <div>
//               <label className="text-base font-semibold text-teal-800 mb-2 block font-serif">Your Name</label>
//               <input
//                 id="FeedInput"
//                 className="w-full p-2 rounded-lg bg-white/30 text-teal-900 outline-none border border-teal-300 focus:ring-2 focus:ring-teal-500 transition-all duration-200 placeholder-teal-600 font-medium"
//                 type="text"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div>
//               <label className="text-base font-semibold text-teal-800 mb-2 block font-serif">Rate Our Platform</label>
//               <div className="flex justify-center gap-2 text-3xl">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span
//                     key={star}
//                     onMouseEnter={() => setHover(star)}
//                     onMouseLeave={() => setHover(0)}
//                     onClick={() => handleClick(star)}
//                     className="cursor-pointer transition-all duration-200 hover:scale-125"
//                     style={{
//                       color: star <= (hover || rating) ? '#00ced1' : '#d1d5db',
//                     }}
//                   >
//                     ⭐
//                   </span>
//                 ))}
//               </div>
//               {rating > 0 && (
//                 <p className="text-center text-lg font-serif mt-2 text-teal-700 font-medium">
//                   {renderEmoji(emojiReactions[rating].text)}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label className="text-base font-semibold text-teal-800 mb-2 block font-serif">Share Your Thoughts</label>
//               <textarea
//                 className="w-full h-24 p-3 rounded-lg bg-white/30 border border-teal-300 focus:ring-2 focus:ring-teal-500 text-teal-900 placeholder-teal-600 font-serif resize-none shadow-md transition-all duration-200"
//                 placeholder="Write your feedback here..."
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 bg-gradient-to-r from-teal-600 to-blue-500 text-white rounded-lg hover:from-teal-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-serif text-base"
//             >
//               Submit Feedback
//             </button>
//           </form>
//         </main>
//       </div>
//     </>
//   );
// }

// export default Feedback;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { databases } from '../../appwriteConfig';
import { ID } from 'appwrite';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const emojiReactions = {
    1: { text: '😞 Poor', color: '#ef4444' },
    2: { text: '🙁 Fair', color: '#f97316' },
    3: { text: '😐 Okay', color: '#eab308' },
    4: { text: '🙂 Good', color: '#22c55e' },
    5: { text: '😄 Great', color: '#06b6d4' },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !message || rating === 0) {
      toast.error('Please fill all fields and select a rating.');
      return;
    }

    try {
      setLoading(true);
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID,
        ID.unique(),
        { username, rating, message }
      );
      toast.success('Feedback submitted! Thank you.');
      setUsername('');
      setMessage('');
      setRating(0);
    } catch (error) {
      toast.error('Failed to submit feedback. Try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/account', label: 'Account' },
    { to: '/journal', label: 'Journal' },
  ];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm max-w-[96%] rounded-xl mx-auto top-2">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-Eagle text-gray-800">
            Painters' Diary
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md py-4"
          >
            <div className="max-w-7xl mx-auto px-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-800 py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </header>

      <main 
        className="min-h-screen flex items-center justify-center py-16 px-4"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/7828684/pexels-photo-7828684.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
            Share Your Feedback
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex justify-center gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className="cursor-pointer transition-transform hover:scale-125"
                    style={{ color: star <= (hover || rating) ? emojiReactions[star].color : '#d1d5db' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm mt-2 text-gray-600">
                  {emojiReactions[rating].text}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feedback
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your thoughts..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 outline-none focus:ring-cyan-500 resize-none h-24"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Feedback;