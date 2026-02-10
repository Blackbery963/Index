import { useEffect, useState } from 'react';
import { databases, Query, account, client } from '../appwriteConfig';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  User, 
  Package, 
  RefreshCw, 
  Check, 
  X, 
  Mail, 
  Clock, 
  DollarSign, 
  Box, 
  ShoppingBag
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DB_ID = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
const ORDERS_COLLECTION = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;
const USERS_COLLECTION = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const USER_DB = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getSellerId = async () => {
    const user = await account.get();
    return user.$id;
  };

  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      const sellerId = await getSellerId();
      const res = await databases.listDocuments(DB_ID, ORDERS_COLLECTION, [
        Query.equal('sellerId', sellerId),
        Query.orderDesc('$createdAt') // Newest first
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
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${ORDERS_COLLECTION}.documents`,
      (response) => {
        if (response.events.includes('databases.*.documents.*.create')) {
          fetchOrders();
          toast.info("New order received!");
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
      toast.success(`Order ${status}`);
    } catch (err) {
      console.error('Failed to update order status:', err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* --- Header --- */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 px-6 lg:px-12 flex items-center justify-between 
        bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md 
        border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        
        {/* Left: Logo */}
        <Link to="/" className="group">
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white font-Eagle group-hover:opacity-70 transition-opacity">
            Painters' Diary
          </h1>
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <Link to="/Arteva/Artstore">
            <ShoppingBag className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
          </Link>
          <Link to="/Account">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
          </Link>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="pt-24 px-4 md:px-8 pb-12 max-w-5xl mx-auto">
        
        {/* Page Title & Controls */}
        <div className="flex items-end justify-between mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
              Sales Dashboard
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-widest">
              Manage your orders & deliveries
            </p>
          </div>

          <button 
            onClick={fetchOrders}
            disabled={refreshing}
            className={`p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors ${refreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-zinc-200 dark:bg-zinc-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          // Empty State
          <div className="h-[50vh] flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 space-y-4 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
            <Package className="w-12 h-12 opacity-20" />
            <p className="text-sm tracking-wide">No orders received yet.</p>
          </div>
        ) : (
          // Orders List
          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order) => (
                <OrderCard 
                  key={order.$id} 
                  order={order} 
                  onUpdateStatus={updateOrderStatus} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}

// --- Sub-Component: Order Card ---
const OrderCard = ({ order, onUpdateStatus }) => {
  
  // Status Color Logic
  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'rejected': return 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-100 dark:border-red-900';
      default: return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        
        {/* Left: Order Info */}
        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {order.productName}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)} capitalize`}>
                    {order.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    <span>Qty: <span className="text-zinc-900 dark:text-zinc-200 font-medium">{order.quantity}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Total: <span className="text-zinc-900 dark:text-zinc-200 font-medium">₹{(order.price * order.quantity).toLocaleString()}</span></span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                    <Clock className="w-4 h-4" />
                    <span>Placed: {new Date(order.$createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Action Buttons (Only for Pending) */}
            {order.status === 'pending' && (
                <div className="flex gap-3 mt-6">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateStatus(order.$id, 'accepted')}
                        className="flex-1 py-2 px-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" /> Accept
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateStatus(order.$id, 'rejected')}
                        className="flex-1 py-2 px-4 bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
                    >
                        <X className="w-4 h-4" /> Reject
                    </motion.button>
                </div>
            )}
        </div>

        {/* Right: Buyer Info */}
        <div className="md:w-80 bg-zinc-50 dark:bg-zinc-900/50 p-6 flex flex-col justify-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Customer Details</h4>
            
            {order.buyer ? (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                            <User className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {order.buyer.username || 'Unknown User'}
                            </p>
                            <p className="text-xs text-zinc-500">Buyer</p>
                        </div>
                    </div>
                    
                    <a 
                        href={`mailto:${order.buyer.email}`}
                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        <Mail className="w-3.5 h-3.5" />
                        {order.buyer.email}
                    </a>

                    <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <p className="text-xs text-zinc-500 italic leading-relaxed">
                            "Please contact the buyer via email to arrange delivery specifics."
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center text-zinc-400">
                    <User className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">Guest or Unknown</p>
                </div>
            )}
        </div>

      </div>
    </motion.div>
  );
};