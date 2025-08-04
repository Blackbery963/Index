// import { useState, useEffect } from "react";
// import React from 'react';
// import { databases, account, Query } from "../../appwriteConfig";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHome, FaUser, FaInfoCircle, FaPalette } from 'react-icons/fa';
// import { FiMenu, } from 'react-icons/fi';
// import { MdClose } from 'react-icons/md';


// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
  // const [activeButton, setActiveButton] = useState('');
  // const [isMenuOpen, setIsMenuOpen] = useState(false);


//   const getUserOrders = async () => {
//     try {
//       const user = await account.get();

//       const response = await databases.listDocuments(
//         import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID,
//         [
//           Query.equal('userId', user.$id),
//           Query.orderDesc('orderDate'),
//         ]
//       );

//       setOrders(response.documents);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUserOrders();
//   }, []);


  //   const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // const dropdownVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: -10,
  //     transition: { duration: 0.2 },
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.2 },
  //   },
  // };

//   return (
//     <div className=" w-full min-h-screen flex flex-col ">
      //   <header className="fixed top-0 h-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shadow-sm z-50 border-b border-gray-200 dark:border-gray-800">
      //   <Link to="/">
      //     <div className="flex items-center gap-2">
      //       <h1 className="text-2xl md:text-3xl font-bold font-Eagle bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
      //         Painters' Diary
      //       </h1>
      //     </div>
      //   </Link>
      //   <div className="flex items-center gap-4">
      //     <nav className="hidden md:flex gap-4">
      //       <Link to="/">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'home' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
      //           onClick={() => setActiveButton('home')}
      //         >
      //           <FaHome />
      //           Home
      //         </motion.button>
      //       </Link>
      //       <Link to="/About">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'about' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
      //           onClick={() => setActiveButton('about')}
      //         >
      //           <FaInfoCircle />
      //           About
      //         </motion.button>
      //       </Link>
      //       <Link to="/Account">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'account' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
      //           onClick={() => setActiveButton('account')}
      //         >
      //           <FaUser />
      //           Account
      //         </motion.button>
      //       </Link>
      //       <Link to="/Arteva/Artstore">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors ${activeButton === 'landscape' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
      //           onClick={() => setActiveButton('landscape')}
      //         >
      //           <FaPalette />
      //           Artstore
      //         </motion.button>
      //       </Link>
      //     </nav>
      //     <motion.button
      //       whileHover={{ scale: 1.05 }}
      //       whileTap={{ scale: 0.95 }}
      //       className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      //       onClick={toggleMenu}
      //       aria-label="Toggle menu"
      //     >
      //       {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
      //     </motion.button>
      //   </div>
      // </header>

      // <AnimatePresence>
      //   {isMenuOpen && (
      //     <motion.nav
      //       className="md:hidden fixed top-20 right-4 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg z-40 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
      //       variants={dropdownVariants}
      //       initial="hidden"
      //       animate="visible"
      //       exit="hidden"
      //     >
      //       <div className="flex flex-col gap-2">
      //         <Link to="/" onClick={() => { setActiveButton('home'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
      //           >
      //             <FaHome />
      //             Home
      //           </motion.button>
      //         </Link>
      //         <Link to="/About" onClick={() => { setActiveButton('about'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
      //           >
      //             <FaInfoCircle />
      //             About
      //           </motion.button>
      //         </Link>
      //         <Link to="/Account" onClick={() => { setActiveButton('account'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
      //           >
      //             <FaUser />
      //             Account
      //           </motion.button>
      //         </Link>
      //         <Link to="/Arteva/Artstore" onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 rounded-lg"
      //           >
      //             <FaPalette />
      //             Artstore
      //           </motion.button>
      //         </Link>
      //       </div>
      //     </motion.nav>
      //   )}
      // </AnimatePresence>


//       <h2 className="text-2xl font-bold mb-4 pt-36">Your Order History</h2>

//       {loading ? (
//         <p>Loading orders...</p>
//       ) : orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map(order => (
//             <div key={order.$id} className="border p-4 rounded shadow-sm">
//               <p><strong>Order ID:</strong> {order.$id}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <p><strong>Total:</strong> ₹{order.total}</p>
//               <p><strong>Placed On:</strong> {new Date(order.orderDate).toLocaleString()}</p>

//               {Array.isArray(order.items) && order.items.length > 0 && (
//                 <div className="mt-2">
//                   <p className="font-semibold">Items:</p>
//                   <ul className="list-disc list-inside">
//                     {order.items.map((item, index) => (
//                       <li key={index}>
//                         {item.title} — Qty: {item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderHistory;

// import { useEffect, useState } from "react";
// import { databases, account, Query } from "../../appwriteConfig";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHome, FaUser, FaInfoCircle, FaPalette } from 'react-icons/fa';
// import { FiMenu, } from 'react-icons/fi';
// import { MdClose } from 'react-icons/md';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeButton, setActiveButton] = useState('');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);



//   const fetchOrders = async () => {
//     try {
//       const user = await account.get();
//       const response = await databases.listDocuments(
//         import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID,
//         [
//           Query.equal("userId", user.$id),
//           Query.orderDesc("orderDate"),
//         ]
//       );

//       const parsedOrders = response.documents.map((order) => ({
//         ...order,
//         items: JSON.parse(order.items), // Parse items array from string
//       }));

//       setOrders(parsedOrders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//       const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const dropdownVariants = {
//     hidden: {
//       opacity: 0,
//       y: -10,
//       transition: { duration: 0.2 },
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.2 },
//     },
//   };


//   if (loading) return <p>Loading order history...</p>;
//   if (orders.length === 0) return <p>No orders found.</p>;

//   return (
//     <div className=" w-full min-h-screen flex flex-col font-Playfair bg-gradient-to-br from-slate-100 via-purple-100 to-red-100 dark:from-gray-950 dark:to-slate-900">
      //       <header className="fixed top-0 h-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shadow-sm z-50 border-b border-gray-200 dark:border-gray-800">
      //   <Link to="/">
      //     <div className="flex items-center gap-2">
      //       <h1 className="text-2xl md:text-3xl font-bold font-Eagle bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
      //         Painters' Diary
      //       </h1>
      //     </div>
      //   </Link>
      //   <div className="flex items-center gap-4">
      //     <nav className="hidden md:flex gap-4">
      //       <Link to="/">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'home' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
      //           onClick={() => setActiveButton('home')}
      //         >
      //           <FaHome />
      //           Home
      //         </motion.button>
      //       </Link>
      //       <Link to="/About">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'about' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
      //           onClick={() => setActiveButton('about')}
      //         >
      //           <FaInfoCircle />
      //           About
      //         </motion.button>
      //       </Link>
      //       <Link to="/Account">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'account' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
      //           onClick={() => setActiveButton('account')}
      //         >
      //           <FaUser />
      //           Account
      //         </motion.button>
      //       </Link>
      //       <Link to="/Arteva/Artstore">
      //         <motion.button
      //           whileHover={{ scale: 1.05 }}
      //           whileTap={{ scale: 0.95 }}
      //           className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors ${activeButton === 'landscape' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
      //           onClick={() => setActiveButton('landscape')}
      //         >
      //           <FaPalette />
      //           Artstore
      //         </motion.button>
      //       </Link>
      //     </nav>
      //     <motion.button
      //       whileHover={{ scale: 1.05 }}
      //       whileTap={{ scale: 0.95 }}
      //       className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      //       onClick={toggleMenu}
      //       aria-label="Toggle menu"
      //     >
      //       {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
      //     </motion.button>
      //   </div>
      // </header>

      // <AnimatePresence>
      //   {isMenuOpen && (
      //     <motion.nav
      //       className="md:hidden fixed top-20 right-4 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg z-40 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
      //       variants={dropdownVariants}
      //       initial="hidden"
      //       animate="visible"
      //       exit="hidden"
      //     >
      //       <div className="flex flex-col gap-2">
      //         <Link to="/" onClick={() => { setActiveButton('home'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
      //           >
      //             <FaHome />
      //             Home
      //           </motion.button>
      //         </Link>
      //         <Link to="/About" onClick={() => { setActiveButton('about'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
      //           >
      //             <FaInfoCircle />
      //             About
      //           </motion.button>
      //         </Link>
      //         <Link to="/Account" onClick={() => { setActiveButton('account'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
      //           >
      //             <FaUser />
      //             Account
      //           </motion.button>
      //         </Link>
      //         <Link to="/Arteva/Artstore" onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
      //           <motion.button
      //             whileHover={{ scale: 1.02 }}
      //             className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 rounded-lg"
      //           >
      //             <FaPalette />
      //             Artstore
      //           </motion.button>
      //         </Link>
      //       </div>
      //     </motion.nav>
      //   )}
      // </AnimatePresence>
//       <h2 className="text-2xl font-bold mb-4 py-36">Your Orders</h2>

//       {orders.map((order) => (
//         <div
//           key={order.$id}
//           className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow"
//         >
//           <div className="mb-2 text-gray-600 dark:text-gray-300">
//             <p><strong>Order ID:</strong> {order.$id}</p>
//             <p><strong>Status:</strong> {order.status}</p>
//             <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
//             <p><strong>Total:</strong> ₹{order.total}</p>
//           </div>

//           <h4 className="font-semibold mt-4">Items:</h4>
//           <ul className="list-disc ml-6">
//             {order.items.map((item, index) => (
//               <li key={index}>
//                 {item.title} – ₹{item.price} × {item.quantity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderHistory;




import { useEffect, useState } from "react";
import { databases, account, Query } from "../../appwriteConfig";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaInfoCircle, FaPalette, FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaTimesCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const user = await account.get();
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID,
        [
          Query.equal("userId", user.$id),
          Query.orderDesc("orderDate"),
        ]
      );

      const parsedOrders = response.documents.map((order) => ({
        ...order,
        items: JSON.parse(order.items),
      }));

      setOrders(parsedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'shipped':
        return <FaTruck className="text-blue-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaShoppingBag className="text-gray-500" />;
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const orderCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full min-h-screen font-Playfair bg-gradient-to-br from-slate-100 via-purple-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
      {/* Header (same as before) */}
                  <header className="fixed top-0 h-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shadow-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <Link to="/">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-Eagle bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
              Painters' Diary
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'home' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
                onClick={() => setActiveButton('home')}
              >
                <FaHome />
                Home
              </motion.button>
            </Link>
            <Link to="/About">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'about' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
                onClick={() => setActiveButton('about')}
              >
                <FaInfoCircle />
                About
              </motion.button>
            </Link>
            <Link to="/Account">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'account' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
                onClick={() => setActiveButton('account')}
              >
                <FaUser />
                Account
              </motion.button>
            </Link>
            <Link to="/Arteva/Artstore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors ${activeButton === 'landscape' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
                onClick={() => setActiveButton('landscape')}
              >
                <FaPalette />
                Artstore
              </motion.button>
            </Link>
          </nav>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed top-20 right-4 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg z-40 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
                >
                  <FaHome />
                  Home
                </motion.button>
              </Link>
              <Link to="/About" onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
                >
                  <FaInfoCircle />
                  About
                </motion.button>
              </Link>
              <Link to="/Account" onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
                >
                  <FaUser />
                  Account
                </motion.button>
              </Link>
              <Link to="/Arteva/Artstore" onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 rounded-lg"
                >
                  <FaPalette />
                  Artstore
                </motion.button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold text-gray-800 dark:text-white"
          >
            Your Orders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0"
          >
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <FaShoppingBag className="text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No orders yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md px-4">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <Link to="/Arteva/Artstore">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Browse Artstore
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="space-y-6"
          >
            {orders.map((order) => (
              <motion.div 
                key={order.$id}
                variants={orderCardVariants}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Order #{order.$id.slice(0, 8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        order.status.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        order.status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>

                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Order Summary</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                              {item.imageId ? (
                                <img 
                                  src={`https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_PRODUCTS_BUCKET_ID}/files/${item.imageId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`} 
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FaPalette className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-gray-200">{item.title}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} × ₹{item.price}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                      <p className="text-xl font-semibold text-gray-800 dark:text-white">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;