import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaInfoCircle, FaPalette } from "react-icons/fa";
import { FiMenu, FiImage } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { storage, databases, ID, account } from "../appwriteConfig";
import { proceedToCheckout } from "../Arteva/Commercial/PlaceOrder";

const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;

function Cart() {
  const [activeButton, setActiveButton] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const stored = localStorage.getItem("cartItems");
        if (stored) {
          const parsed = JSON.parse(stored);

          const itemsWithImages = await Promise.all(
            parsed.map(async (item) => {
              try {
                let imageUrl = null;
                if (item.fileId) {
                  imageUrl = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${item.fileId}/preview?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=100&quality=85`;
                }
                return { ...item, imageUrl };
              } catch (error) {
                console.error("Error processing item:", item.title, error);
                return { ...item, imageUrl: null };
              }
            })
          );

          setCartItems(itemsWithImages);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.$id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success("Item removed from cart.");
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    toast.success("Cart cleared.");
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.$id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-slate-100 via-red-50 to-blue-100 dark:from-gray-950 dark:to-slate-900 font-Playfair flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={document.documentElement.classList.contains("dark") ? "dark" : "light"}
      />

      {/* Header */}
      <header className="fixed top-0 h-20 w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-lg flex items-center justify-between px-4 md:px-8 shadow-lg z-50 border-b border-gray-200 dark:border-gray-700">
        <Link to="/">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-Eagle bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
              Painters' Diary
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4">
            {[
              { to: "/", icon: FaHome, label: "Home", key: "home" },
              { to: "/About", icon: FaInfoCircle, label: "About", key: "about" },
              { to: "/Account", icon: FaUser, label: "Account", key: "account" },
              { to: "/Arteva/Artstore", icon: FaPalette, label: "Artstore", key: "artstore" },
              {
                to: "/Arteva/Commercial/OrderHistory",
                icon: FaPalette,
                label: "My Orders",
                key: "orders",
              },
            ].map(({ to, icon: Icon, label, key }) => (
              <Link to={to} key={key}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold font-Playfair transition-colors ${
                    activeButton === key
                      ? "bg-blue-600 text-white dark:bg-blue-700"
                      : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  }`}
                  onClick={() => setActiveButton(key)}
                >
                  <Icon />
                  {label}
                </motion.button>
              </Link>
            ))}
          </nav>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed top-20 right-4 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl z-40 rounded-2xl border border-gray-200 dark:border-gray-700 p-4"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col gap-2">
              {[
                { to: "/", icon: FaHome, label: "Home", key: "home" },
                { to: "/About", icon: FaInfoCircle, label: "About", key: "about" },
                { to: "/Account", icon: FaUser, label: "Account", key: "account" },
                { to: "/Arteva/Artstore", icon: FaPalette, label: "Artstore", key: "artstore" },
                {
                  to: "/Arteva/Commercial/OrderHistory",
                  icon: FaPalette,
                  label: "My Orders",
                  key: "orders",
                },
              ].map(({ to, icon: Icon, label, key }) => (
                <Link to={to} key={key} onClick={() => { setActiveButton(key); toggleMenu(); }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className={`w-full py-2 px-4 flex items-center gap-2 text-sm font-semibold font-Playfair rounded-lg transition-colors ${
                      activeButton === key
                        ? "bg-blue-600 text-white dark:bg-blue-700"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    }`}
                  >
                    <Icon />
                    {label}
                  </motion.button>
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-8 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold font-Quicksand text-gray-800 dark:text-gray-100 mb-8 text-center"
        >
          Your Cart
        </motion.h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-xl p-6 bg-white dark:bg-gray-900 shadow-md animate-pulse">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BiShoppingBag className="mx-auto text-6xl text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 font-Quicksand">
              Your cart is empty
            </p>
            <Link to="/Arteva/Artstore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold font-Playfair hover:bg-blue-700 transition-colors"
              >
                Browse Artstore
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.$id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col md:flex-row gap-4 border rounded-xl p-6 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Section */}
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg animate-pulse">
                      <FiImage className="text-gray-500 dark:text-gray-400 text-3xl" />
                    </div>
                  )}

                  {/* Info Section */}
                  <div className="flex flex-col flex-1 justify-between">
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-Quicksand">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-Playfair">
                        Artist: {item.artist || "Unknown"}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateQuantity(item.$id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                          aria-label="Decrease quantity"
                        >
                          -
                        </motion.button>
                        <span className="w-10 text-center font-medium text-gray-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateQuantity(item.$id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </motion.button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item.$id)}
                          className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold font-Playfair"
                        >
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:sticky md:top-24 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-Quicksand mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Items ({cartItems.length})
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Free
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCheckoutLoading(true);
                  proceedToCheckout(cartItems, () => {
                    setCartItems([]);
                    localStorage.removeItem("cartItems");
                    setCheckoutLoading(false);
                    toast.success("Order placed successfully!");
                  });
                }}
                disabled={checkoutLoading}
                className={`w-full mt-6 py-3 bg-blue-600 text-white rounded-full font-semibold font-Playfair hover:bg-blue-700 transition-colors ${
                  checkoutLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCart}
                className="w-full mt-3 py-3 bg-red-500 text-white rounded-full font-semibold font-Playfair hover:bg-red-600 transition-colors"
              >
                Clear Cart
              </motion.button>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;