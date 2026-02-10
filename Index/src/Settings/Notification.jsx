// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { Databases, Account, Client, Query } from 'appwrite';
// import { client} from '../appwriteConfig';
// import { FaBell, FaCheck, FaTrash, FaBellSlash, FaPaintBrush, FaHome, FaInfoCircle,FaUser,FaPalette } from 'react-icons/fa';
// import { FiMenu } from 'react-icons/fi';
// import { MdClose } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import { IoMdSettings } from 'react-icons/io';

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
//   const [activeButton, setActiveButton] = useState('');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);


//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Dropdown animation variants
//   const dropdownVariants = {
//     hidden: {
//       opacity: 0,
//       y: -10,
//       transition: { duration: 0.2 }
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.2 }
//     }
//   };


//   const navigate = useNavigate();

//   // Initialize Appwrite
//   const databases = new Databases(new Client()
//     .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//     .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
//   );

//   // Fetch notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await databases.listDocuments(
//           import.meta.env.VITE_APPWRITE_DATABASE_ID,
//           'notifications',
//           [
//             Query.orderDesc('$createdAt'),
//             Query.equal('userId', (await new Account(client).get()).$id)
//           ]
//         );
        
//         setNotifications(response.documents.map(notif => ({
//           id: notif.$id,
//           type: notif.type,
//           message: notif.message,
//           read: notif.read,
//           date: new Date(notif.$createdAt),
//           artworkId: notif.artworkId,
//           metaData: notif.metaData
//         })));
        
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching notifications:', err);
//         setError('Failed to load notifications');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchNotifications();
    
//     // Set up real-time updates
//     const unsubscribe = client.subscribe(
//       `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.notifications.documents`,
//       response => {
//         if (response.events.includes('databases.*.collections.*.documents.*.create')) {
//           fetchNotifications();
//         }
//       }
//     );
    
//     return () => unsubscribe();
//   }, []);

//   // Mark notification as read
//   const markAsRead = async (notificationId) => {
//     try {
//       await databases.updateDocument(
//         import.meta.env.VITE_APPWRITE_DATABASE_ID,
//         'notifications',
//         notificationId,
//         { read: true }
//       );
      
//       setNotifications(notifications.map(notif => 
//         notif.id === notificationId ? { ...notif, read: true } : notif
//       ));
      
//       toast.success('Marked as read');
//     } catch (err) {
//       console.error('Error marking as read:', err);
//       toast.error('Failed to mark as read');
//     }
//   };

//   // Delete notification
//   const deleteNotification = async (notificationId) => {
//     if (window.confirm('Are you sure you want to delete this notification?')) {
//       try {
//         await databases.deleteDocument(
//           import.meta.env.VITE_APPWRITE_DATABASE_ID,
//           'notifications',
//           notificationId
//         );
        
//         setNotifications(notifications.filter(notif => notif.id !== notificationId));
//         toast.success('Notification deleted');
//       } catch (err) {
//         console.error('Error deleting notification:', err);
//         toast.error('Failed to delete notification');
//       }
//     }
//   };

//   // Mark all as read
//   const markAllAsRead = async () => {
//     try {
//       const unreadIds = notifications
//         .filter(notif => !notif.read)
//         .map(notif => notif.id);
      
//       await Promise.all(unreadIds.map(id => 
//         databases.updateDocument(
//           import.meta.env.VITE_APPWRITE_DATABASE_ID,
//           'notifications',
//           id,
//           { read: true }
//         )
//       ));
      
//       setNotifications(notifications.map(notif => 
//         !notif.read ? { ...notif, read: true } : notif
//       ));
      
//       toast.success('All notifications marked as read');
//     } catch (err) {
//       console.error('Error marking all as read:', err);
//       toast.error('Failed to mark all as read');
//     }
//   };

//   // Filter notifications based on selection
//   const filteredNotifications = notifications.filter(notif => {
//     if (filter === 'all') return true;
//     if (filter === 'read') return notif.read;
//     if (filter === 'unread') return !notif.read;
//     return true;
//   });

//   // Notification icon based on type
//   const getNotificationIcon = (type) => {
//     switch(type) {
//       case 'sale':
//         return <FaDollarSign className="text-green-500" />;
//       case 'like':
//         return <FaHeart className="text-red-500" />;
//       case 'comment':
//         return <FaComment className="text-blue-500" />;
//       case 'follow':
//         return <FaUserPlus className="text-purple-500" />;
//       case 'artwork':
//         return <FaPaintBrush className="text-yellow-500" />;
//       default:
//         return <FaBell className="text-gray-500" />;
//     }
//   };

//   // Format date
//   const formatDate = (date) => {
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);
    
//     if (diffInHours < 1) {
//       return `${Math.floor(diffInHours * 60)} minutes ago`;
//     } else if (diffInHours < 24) {
//       return `${Math.floor(diffInHours)} hours ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-red-50 to-blue-100 font-Playfair dark:bg-gray-900">

//           <header className='fixed top-0 py-4 w-[100%] mx-auto bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
//           {/* Logo Section */}
//         <Link to={'/'}>
//           <div className='flex items-center'>
//             <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-black'>Painters' Diary</h1>
//           </div>
//         </Link>
//           {/* Navigation Buttons */}
//           <div className='flex items-center gap-x-2 sm:gap-x-4'>
//             {/* Desktop Navigation */}
//             <nav className='hidden md:flex gap-x-4 text-black font-Playfair font-bold'>
//               <Link to='/'>
//                 <button 
//                   className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-600/50' : ''}`}
//                   onClick={() => setActiveButton('home')}
//                 >
//                   <FaHome />
//                   <span className="ml-1">Home</span>
//                 </button>
//               </Link>
//               <Link to='/About'> 
//                 <button 
//                   className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-600/50' : ''}`}
//                   onClick={() => setActiveButton('about')}
//                 >
//                   <FaInfoCircle />
//                   <span className="ml-1">About</span>
//                 </button>
//               </Link>
//               <Link to='/Account'>
//                 <button 
//                   className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-600/50' : ''}`}
//                   onClick={() => setActiveButton('account')}
//                 >
//                   <FaUser />
//                   <span className="ml-1">Account</span>
//                 </button>
//               </Link>
//               <Link to=''>
//                 <button 
//                   className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'Settings' ? 'bg-gray-600/50' : ''}`}
//                   onClick={() => setActiveButton('landscape')}
//                 >
//                   <IoMdSettings />
//                   <span className="ml-1">Settings</span>
//                 </button>
//               </Link>
//             </nav>
//             {/* Mobile Menu Button */}
//             <button 
//               className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
//               onClick={toggleMenu}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
//             </button>
//           </div>
//         </header>
//         {/* Mobile Dropdown Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.nav
//               className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md z-40 rounded-lg"
//               variants={dropdownVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//             >
//               <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
//                 <Link to='/' onClick={() => { setActiveButton('home'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
//                     <FaHome />
//                     Home
//                   </button>
//                 </Link>
//                 <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
//                     <FaInfoCircle />
//                     About
//                   </button>
//                 </Link>
//                 <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
//                     <FaUser />
//                     Account
//                   </button>
//                 </Link>
//                 <Link to='' onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
//                     <IoMdSettings />
//                     Settings
//                   </button>
//                 </Link>
//               </div>
//             </motion.nav>
//           )}
//         </AnimatePresence>
// <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
//   {/* Header */}
//   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
//     <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center font-Quicksand">
//       <FaBell className="mr-3 text-pink-500 text-xl sm:text-2xl" />
//       Notifications
//     </h1>

//     <div className="flex flex-col sm:flex-row sm:items-center gap-2 font-Playfair">
//       <select
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
//       >
//         <option value="all">All</option>
//         <option value="unread">Unread</option>
//         <option value="read">Read</option>
//       </select>

//       <button
//         onClick={markAllAsRead}
//         className="flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm transition"
//       >
//         <FaCheck className="mr-2" /> Mark all as read
//       </button>
//     </div>
//   </div>

//   {/* Error */}
//   {error && (
//     <div className="mb-6 p-4 rounded-md bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
//       {error}
//     </div>
//   )}

//   {/* Loading */}
//   {loading ? (
//     <div className="space-y-4">
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
//           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//           <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <div className="space-y-4">
//       {filteredNotifications.length === 0 ? (
//         <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow text-center">
//           <FaBellSlash className="mx-auto text-4xl text-gray-400 mb-4" />
//           <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//             No notifications found
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400 mt-1">
//             {filter === 'all'
//               ? "You don't have any notifications yet"
//               : `No ${filter} notifications`}
//           </p>
//         </div>
//       ) : (
//         filteredNotifications.map(notification => (
//           <div
//             key={notification.id}
//             onClick={() => notification.artworkId && navigate(`/artworks/${notification.artworkId}`)}
//             className={`group bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border-l-4 transition hover:shadow-md cursor-pointer ${
//               !notification.read ? 'border-pink-500' : 'border-transparent'
//             }`}
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex items-start gap-3">
//                 <div
//                   className={`p-2 rounded-full ${
//                     !notification.read
//                       ? 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300'
//                       : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
//                   }`}
//                 >
//                   {getNotificationIcon(notification.type)}
//                 </div>
//                 <div>
//                   <p className={`text-sm sm:text-base ${
//                     !notification.read ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'
//                   }`}>
//                     {notification.message}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     {formatDate(notification.date)}
//                     {notification.metaData?.customer && (
//                       <span className="ml-2">• From {notification.metaData.customer}</span>
//                     )}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 {!notification.read && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       markAsRead(notification.id);
//                     }}
//                     className="text-gray-400 hover:text-green-500 transition"
//                     title="Mark as read"
//                   >
//                     <FaCheck size={14} />
//                   </button>
//                 )}

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteNotification(notification.id);
//                   }}
//                   className="text-gray-400 hover:text-red-500 transition"
//                   title="Delete"
//                 >
//                   <FaTrash size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   )}
// </main>

//     </div>
//   );
// };

// export default NotificationsPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Check, 
  Trash2, 
  User, 
  Settings, 
  Heart, 
  ShoppingBag, 
  UserPlus, 
  Info, 
  Circle,
  CheckCircle2
} from 'lucide-react';

// --- Mock Data to Simulate Real Activity ---
const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    type: 'order',
    user: 'Sarah Jenkins',
    message: 'purchased "Sunset over Alipurduar"',
    time: '2 mins ago',
    read: false,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb392796a5?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 2,
    type: 'follow',
    user: 'Davide O.',
    message: 'started following your gallery',
    time: '1 hour ago',
    read: false,
    image: null
  },
  {
    id: 3,
    type: 'like',
    user: 'ArtLover99',
    message: 'liked your artwork "Monochromatic Dreams"',
    time: '3 hours ago',
    read: true,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 4,
    type: 'system',
    user: 'System',
    message: 'Your monthly report is ready to view',
    time: '1 day ago',
    read: true,
    image: null
  },
  {
    id: 5,
    type: 'order',
    user: 'Michael Chen',
    message: 'placed a bid on "Abstract #44"',
    time: '2 days ago',
    read: true,
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=100'
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all', 'unread'

  // --- Actions ---

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    if(window.confirm("Clear all notifications?")) {
      setNotifications([]);
    }
  };

  // --- Filtering Logic ---
  const filteredList = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* --- Header: Ultra Minimalist --- */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 px-6 lg:px-12 flex items-center justify-between 
        bg-white/80 dark:bg-black/80 backdrop-blur-md 
        border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        
        {/* Left: Logo */}
        <Link to="/" className="group">
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white font-Eagle group-hover:opacity-70 transition-opacity">
            Painters' Diary
          </h1>
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
           {/* Account */}
          <Link to="/Account">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
          </Link>
          {/* Settings (Placeholder link) */}
          <Link to="/Settings">
             <Settings className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
          </Link>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="pt-24 px-4 md:px-8 pb-12 max-w-3xl mx-auto">
        
        {/* Page Title & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
              Activity
              {unreadCount > 0 && (
                <span className="text-xs font-bold bg-zinc-900 dark:bg-white text-white dark:text-black px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Updates on your gallery and community.</p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
             {/* Filter Tabs */}
            <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-lg p-1 mr-2">
                <button 
                    onClick={() => setFilter('all')}
                    className={`px-4 py-1.5 rounded-md transition-all ${filter === 'all' ? 'bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white' : 'text-zinc-500'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-1.5 rounded-md transition-all ${filter === 'unread' ? 'bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white' : 'text-zinc-500'}`}
                >
                    Unread
                </button>
            </div>

            {/* Global Actions */}
            <button 
                onClick={markAllRead} 
                className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" 
                title="Mark all as read"
            >
                <CheckCircle2 className="w-5 h-5" />
            </button>
             <button 
                onClick={clearAll} 
                className="p-2 text-zinc-500 hover:text-red-500 transition-colors" 
                title="Clear all"
            >
                <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- Notification List --- */}
        <div className="space-y-4">
            <AnimatePresence mode='popLayout'>
                {filteredList.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="py-12 text-center text-zinc-400"
                    >
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No notifications to show.</p>
                    </motion.div>
                ) : (
                    filteredList.map((notif) => (
                        <NotificationItem 
                            key={notif.id} 
                            data={notif} 
                            onRead={() => markAsRead(notif.id)}
                            onDelete={() => deleteNotification(notif.id)}
                        />
                    ))
                )}
            </AnimatePresence>
        </div>

      </main>
    </div>
  );
};

// --- Sub-Component: Individual Notification Card ---
const NotificationItem = ({ data, onRead, onDelete }) => {
  
  // Icon & Style Logic
  const getIcon = (type) => {
    switch(type) {
      case 'order': return <ShoppingBag className="w-4 h-4" />;
      case 'like': return <Heart className="w-4 h-4" />;
      case 'follow': return <UserPlus className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className={`group relative flex items-start gap-4 p-5 rounded-xl border transition-all duration-300
            ${!data.read 
                ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm' 
                : 'bg-zinc-50 dark:bg-black border-transparent opacity-80 hover:opacity-100'
            }
        `}
    >
        {/* Left: Icon Indicator */}
        <div className={`mt-1 p-2 rounded-full flex-shrink-0 
            ${!data.read ? 'bg-zinc-900 text-white dark:bg-white dark:text-black' : 'bg-zinc-200 text-zinc-500 dark:bg-zinc-900'}
        `}>
            {getIcon(data.type)}
        </div>

        {/* Center: Content */}
        <div className="flex-1 mr-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <span className={`font-semibold text-base ${!data.read ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}>
                    {data.user}
                </span>
                <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">{data.message}</span>
            </div>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{data.time}</p>
        </div>

        {/* Right: Optional Image Preview (if it's an artwork notification) */}
        {data.image && (
            <img 
                src={data.image} 
                alt="preview" 
                className="w-12 h-12 rounded-md object-cover border border-zinc-200 dark:border-zinc-800"
            />
        )}

        {/* Hover Actions (Absolute) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!data.read && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onRead(); }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-md"
                    title="Mark as read"
                >
                    <Check className="w-4 h-4" />
                </button>
            )}
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-1.5 text-zinc-400 hover:text-red-500 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-md"
                title="Remove"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>

        {/* Unread Indicator Dot */}
        {!data.read && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full sm:hidden"></div>
        )}
    </motion.div>
  );
};

export default NotificationsPage;