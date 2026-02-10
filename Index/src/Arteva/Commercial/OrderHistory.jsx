// import { useEffect, useState } from "react";
// import { databases, account, Query } from "../../appwriteConfig";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHome, FaUser, FaInfoCircle, FaPalette, FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaTimesCircle } from 'react-icons/fa';
// import { FiMenu } from 'react-icons/fi';
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
//         items: JSON.parse(order.items),
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

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return <FaClock className="text-yellow-500" />;
//       case 'completed':
//         return <FaCheckCircle className="text-green-500" />;
//       case 'shipped':
//         return <FaTruck className="text-blue-500" />;
//       case 'cancelled':
//         return <FaTimesCircle className="text-red-500" />;
//       default:
//         return <FaShoppingBag className="text-gray-500" />;
//     }
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

//   const orderCardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="w-full min-h-screen font-Playfair bg-gradient-to-br from-slate-100 via-purple-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
//       {/* Header (same as before) */}
//                   <header className="fixed top-0 h-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shadow-sm z-50 border-b border-gray-200 dark:border-gray-800">
//         <Link to="/">
//           <div className="flex items-center gap-2">
//             <h1 className="text-2xl md:text-3xl font-bold font-Eagle bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
//               Painters' Diary
//             </h1>
//           </div>
//         </Link>
//         <div className="flex items-center gap-4">
//           <nav className="hidden md:flex gap-4">
//             <Link to="/">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'home' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
//                 onClick={() => setActiveButton('home')}
//               >
//                 <FaHome />
//                 Home
//               </motion.button>
//             </Link>
//             <Link to="/About">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'about' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
//                 onClick={() => setActiveButton('about')}
//               >
//                 <FaInfoCircle />
//                 About
//               </motion.button>
//             </Link>
//             <Link to="/Account">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${activeButton === 'account' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
//                 onClick={() => setActiveButton('account')}
//               >
//                 <FaUser />
//                 Account
//               </motion.button>
//             </Link>
//             <Link to="/Arteva/Artstore">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors ${activeButton === 'landscape' ? 'bg-blue-600 dark:bg-blue-700' : ''}`}
//                 onClick={() => setActiveButton('landscape')}
//               >
//                 <FaPalette />
//                 Artstore
//               </motion.button>
//             </Link>
//           </nav>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
//             onClick={toggleMenu}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
//           </motion.button>
//         </div>
//       </header>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.nav
//             className="md:hidden fixed top-20 right-4 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg z-40 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
//             variants={dropdownVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//           >
//             <div className="flex flex-col gap-2">
//               <Link to="/" onClick={() => { setActiveButton('home'); toggleMenu(); }}>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
//                 >
//                   <FaHome />
//                   Home
//                 </motion.button>
//               </Link>
//               <Link to="/About" onClick={() => { setActiveButton('about'); toggleMenu(); }}>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
//                 >
//                   <FaInfoCircle />
//                   About
//                 </motion.button>
//               </Link>
//               <Link to="/Account" onClick={() => { setActiveButton('account'); toggleMenu(); }}>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg"
//                 >
//                   <FaUser />
//                   Account
//                 </motion.button>
//               </Link>
//               <Link to="/Arteva/Artstore" onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   className="w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 rounded-lg"
//                 >
//                   <FaPalette />
//                   Artstore
//                 </motion.button>
//               </Link>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>

//       <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <motion.h2 
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="text-3xl font-bold text-gray-800 dark:text-white"
//           >
//             Your Orders
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.1 }}
//             className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0"
//           >
//             {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
//           </motion.p>
//         </div>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//             <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
//           </div>
//         ) : orders.length === 0 ? (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
//           >
//             <FaShoppingBag className="text-5xl text-gray-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No orders yet</h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md px-4">
//               You haven't placed any orders yet. Start shopping to see your order history here.
//             </p>
//             <Link to="/Arteva/Artstore">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
//               >
//                 Browse Artstore
//               </motion.button>
//             </Link>
//           </motion.div>
//         ) : (
//           <motion.div 
//             initial="hidden"
//             animate="visible"
//             variants={{
//               visible: {
//                 transition: {
//                   staggerChildren: 0.1
//                 }
//               }
//             }}
//             className="space-y-6"
//           >
//             {orders.map((order) => (
//               <motion.div 
//                 key={order.$id}
//                 variants={orderCardVariants}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
//               >
//                 <div className="p-6">
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                         Order #{order.$id.slice(0, 8).toUpperCase()}
//                       </h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {getStatusIcon(order.status)}
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         order.status.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
//                         order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
//                         order.status.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
//                         order.status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
//                         'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//                       }`}>

//                         {order.status}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
//                     <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Order Summary</h4>
//                     <div className="space-y-3">
//                       {order.items.map((item, index) => (
//                         <div key={index} className="flex justify-between items-center">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
//                               {item.imageId ? (
//                                 <img 
//                                   src={`https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_PRODUCTS_BUCKET_ID}/files/${item.imageId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`} 
//                                   alt={item.title}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <FaPalette className="text-gray-400" />
//                               )}
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-800 dark:text-gray-200">{item.title}</p>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} × ₹{item.price}</p>
//                             </div>
//                           </div>
//                           <p className="font-medium text-gray-800 dark:text-gray-200">₹{(item.price * item.quantity).toFixed(2)}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex justify-between items-center">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
//                       <p className="text-xl font-semibold text-gray-800 dark:text-white">₹{order.total.toFixed(2)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;



import { useEffect, useState } from "react";
import { databases, account, Query } from "../../appwriteConfig";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  ChevronRight, 
  Palette, 
  User, 
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Logic ---
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

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* --- Header --- */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 px-6 lg:px-12 flex items-center justify-between 
        bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md 
        border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        
        <Link to="/" className="group">
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white font-Eagle group-hover:opacity-70 transition-opacity">
            Painters' Diary
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/Arteva/Artstore">
            <ShoppingBag className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors" />
          </Link>
          <Link to="/Account">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors" />
          </Link>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="pt-24 px-3 md:px-8 pb-12 max-w-4xl mx-auto">
        
        <div className="flex items-end justify-between mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 mx-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-zinc-900 dark:text-white">
              History
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            {orders.length} Orders
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl h-32 border border-zinc-200 dark:border-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="h-[50vh] flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 space-y-4 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
            <Package className="w-10 h-10 opacity-20" />
            <p className="text-sm">No orders yet.</p>
            <Link to="/Arteva/Artstore">
              <button className="px-5 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-xs uppercase tracking-widest rounded-full">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {orders.map((order, index) => (
                <OrderCard key={order.$id} order={order} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Compact Order Card ---
const OrderCard = ({ order, index }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusStyle = (status) => {
    const s = status.toLowerCase();
    if (s === 'completed' || s === 'delivered') return { icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (s === 'shipped') return { icon: Truck, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/20' };
    if (s === 'cancelled') return { icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/20' };
    return { icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/20' };
  };

  const statusConfig = getStatusStyle(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
    >
      {/* 1. Compact Header Row */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-black/20">
        
        {/* Left: ID & Date */}
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
             #{order.$id.substring(0, 6).toUpperCase()}
          </span>
          <span className="text-xs text-zinc-500">
             {formatDate(order.orderDate)}
          </span>
        </div>

        {/* Right: Status & Total */}
        <div className="flex flex-col items-end gap-1">
             <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${statusConfig.bg} ${statusConfig.color}`}>
                <StatusIcon className="w-3 h-3" />
                {order.status}
             </div>
             <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                ₹{order.total.toLocaleString()}
             </span>
        </div>
      </div>

      {/* 2. Compact Items List */}
      <div className="p-4 space-y-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {/* Tiny Thumbnail */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0 border border-zinc-100 dark:border-zinc-700/50">
              {item.imageId ? (
                <img
                  src={`https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_PRODUCTS_BUCKET_ID}/files/${item.imageId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Item Text */}
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="mr-2">
                <h4 className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500">x{item.quantity}</p>
              </div>
              
              {/* Price */}
              <span className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                ₹{item.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Minimal Footer for Details Link */}
      <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800 text-center">
         <button className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center justify-center gap-1 w-full">
            View Receipt <ChevronRight className="w-3 h-3" />
         </button>
      </div>
    </motion.div>
  );
};

export default OrderHistory;