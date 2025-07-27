import { useEffect, useState } from 'react';
import { databases, Query, account, client } from '../appwriteConfig';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaInfoCircle, FaPalette } from 'react-icons/fa';
import { FiMenu, FiPackage } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

const DB_ID = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
const ORDERS_COLLECTION = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;
const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const USER_DB = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSellerId = async () => {
    const user = await account.get();
    return user.$id;
  };

  const fetchOrders = async () => {
    try {
      const sellerId = await getSellerId();
      const res = await databases.listDocuments(DB_ID, ORDERS_COLLECTION, [
        Query.equal('sellerId', sellerId),
      ]);

      const enrichedOrders = await Promise.all(
        res.documents.map(async (order) => {
          try {
            const buyer = await databases.getDocument(USER_DB, USERS_COLLECTION, order.buyerId);
            return { ...order, buyer };
          } catch (err) {
            console.warn(`Could not fetch buyer info: ${order.buyerId}`);
            return { ...order, buyer: null };
          }
        })
      );

      setOrders(enrichedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${ORDERS_COLLECTION}.documents`,
      (response) => {
        if (response.events.includes('databases.*.documents.*.create')) {
          fetchOrders();
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await databases.updateDocument(DB_ID, ORDERS_COLLECTION, orderId, { status });
      setOrders((prev) =>
        prev.map((order) => (order.$id === orderId ? { ...order, status } : order))
      );
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 font-Playfair">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 dark:border-gray-600 rounded-full"
          ></motion.div>
          <span className="text-gray-600 dark:text-gray-300">Loading Orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-red-50 to-blue-100 dark:bg-gray-950 flex flex-col items-center font-Playfair">
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

      <main className="pt-28 pb-12 max-w-5xl w-full px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold font-Playfair text-gray-900 dark:text-white mb-8 flex items-center gap-2"
        >
          <FiPackage className="text-blue-500 dark:text-blue-400" />
          Your Orders
        </motion.h2>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <FiPackage className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">No orders yet.</p>
            <Link
              to="/Arteva/Artstore"
              className="inline-block px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Browse Artstore
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.$id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{order.productName}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <p>Quantity: <span className="font-medium">{order.quantity}</span></p>
                      <p>Total: <span className="font-medium text-gray-900 dark:text-white">₹{(order.price * order.quantity).toLocaleString()}</span></p>
                      <p>Status: <span className={`font-medium capitalize ${order.status === 'accepted' ? 'text-green-600 dark:text-green-400' : order.status === 'rejected' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>{order.status}</span></p>
                      <p>Date: <span className="font-medium">{new Date(order.$createdAt).toLocaleDateString()}</span></p>
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    {order.buyer ? (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <h2 className='text-xl font-semibold mb-3'>The buyer</h2>
                        <p className="flex items-center gap-2">
                          <FaUser className="text-blue-500 dark:text-blue-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">{order.buyer.username || 'Unknown'}</span>
                        </p>
                        <p className="flex items-center gap-2 mt-2">
                          <span className="text-blue-600 dark:text-blue-400 underline">
                            <a href={`mailto:${order.buyer.email}`}>{order.buyer.email}</a>
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-500 dark:text-red-400">Buyer info not available</p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-500 italic mt-4">
                  <span className="text-blue-500 dark:text-blue-400">🛵</span> Note: Delivery is not handled by us. Please contact the buyer via email to arrange delivery.
                </p>

                {order.status === 'pending' && (
                  <div className="flex gap-3 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateOrderStatus(order.$id, 'accepted')}
                      className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                    >
                      <BiCheckCircle />
                      Accept
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateOrderStatus(order.$id, 'rejected')}
                      className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                    >
                      <BiXCircle />
                      Reject
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}