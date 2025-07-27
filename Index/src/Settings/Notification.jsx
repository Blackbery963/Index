import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Databases, Account, Client, Query } from 'appwrite';
import { client} from '../appwriteConfig';
import { FaBell, FaCheck, FaTrash, FaBellSlash, FaPaintBrush, FaHome, FaInfoCircle,FaUser,FaPalette } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { IoMdSettings } from 'react-icons/io';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [activeButton, setActiveButton] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };


  const navigate = useNavigate();

  // Initialize Appwrite
  const databases = new Databases(new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  );

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'notifications',
          [
            Query.orderDesc('$createdAt'),
            Query.equal('userId', (await new Account(client).get()).$id)
          ]
        );
        
        setNotifications(response.documents.map(notif => ({
          id: notif.$id,
          type: notif.type,
          message: notif.message,
          read: notif.read,
          date: new Date(notif.$createdAt),
          artworkId: notif.artworkId,
          metaData: notif.metaData
        })));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
    
    // Set up real-time updates
    const unsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.notifications.documents`,
      response => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          fetchNotifications();
        }
      }
    );
    
    return () => unsubscribe();
  }, []);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'notifications',
        notificationId,
        { read: true }
      );
      
      setNotifications(notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      ));
      
      toast.success('Marked as read');
    } catch (err) {
      console.error('Error marking as read:', err);
      toast.error('Failed to mark as read');
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await databases.deleteDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'notifications',
          notificationId
        );
        
        setNotifications(notifications.filter(notif => notif.id !== notificationId));
        toast.success('Notification deleted');
      } catch (err) {
        console.error('Error deleting notification:', err);
        toast.error('Failed to delete notification');
      }
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications
        .filter(notif => !notif.read)
        .map(notif => notif.id);
      
      await Promise.all(unreadIds.map(id => 
        databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'notifications',
          id,
          { read: true }
        )
      ));
      
      setNotifications(notifications.map(notif => 
        !notif.read ? { ...notif, read: true } : notif
      ));
      
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Error marking all as read:', err);
      toast.error('Failed to mark all as read');
    }
  };

  // Filter notifications based on selection
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'read') return notif.read;
    if (filter === 'unread') return !notif.read;
    return true;
  });

  // Notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'sale':
        return <FaDollarSign className="text-green-500" />;
      case 'like':
        return <FaHeart className="text-red-500" />;
      case 'comment':
        return <FaComment className="text-blue-500" />;
      case 'follow':
        return <FaUserPlus className="text-purple-500" />;
      case 'artwork':
        return <FaPaintBrush className="text-yellow-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  // Format date
  const formatDate = (date) => {
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-red-50 to-blue-100 font-Playfair dark:bg-gray-900">

          <header className='fixed top-0 py-4 w-[100%] mx-auto bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
          {/* Logo Section */}
        <Link to={'/'}>
          <div className='flex items-center'>
            <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-black'>Painters' Diary</h1>
          </div>
        </Link>
          {/* Navigation Buttons */}
          <div className='flex items-center gap-x-2 sm:gap-x-4'>
            {/* Desktop Navigation */}
            <nav className='hidden md:flex gap-x-4 text-black font-Playfair font-bold'>
              <Link to='/'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('home')}
                >
                  <FaHome />
                  <span className="ml-1">Home</span>
                </button>
              </Link>
              <Link to='/About'> 
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('about')}
                >
                  <FaInfoCircle />
                  <span className="ml-1">About</span>
                </button>
              </Link>
              <Link to='/Account'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('account')}
                >
                  <FaUser />
                  <span className="ml-1">Account</span>
                </button>
              </Link>
              <Link to=''>
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'Settings' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('landscape')}
                >
                  <IoMdSettings />
                  <span className="ml-1">Settings</span>
                </button>
              </Link>
            </nav>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </header>
        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md z-40 rounded-lg"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
                <Link to='/' onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaHome />
                    Home
                  </button>
                </Link>
                <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaInfoCircle />
                    About
                  </button>
                </Link>
                <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaUser />
                    Account
                  </button>
                </Link>
                <Link to='' onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <IoMdSettings />
                    Settings
                  </button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center font-Quicksand">
      <FaBell className="mr-3 text-pink-500 text-xl sm:text-2xl" />
      Notifications
    </h1>

    <div className="flex flex-col sm:flex-row sm:items-center gap-2 font-Playfair">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="all">All</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
      </select>

      <button
        onClick={markAllAsRead}
        className="flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm transition"
      >
        <FaCheck className="mr-2" /> Mark all as read
      </button>
    </div>
  </div>

  {/* Error */}
  {error && (
    <div className="mb-6 p-4 rounded-md bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
      {error}
    </div>
  )}

  {/* Loading */}
  {loading ? (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      {filteredNotifications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow text-center">
          <FaBellSlash className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            No notifications found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {filter === 'all'
              ? "You don't have any notifications yet"
              : `No ${filter} notifications`}
          </p>
        </div>
      ) : (
        filteredNotifications.map(notification => (
          <div
            key={notification.id}
            onClick={() => notification.artworkId && navigate(`/artworks/${notification.artworkId}`)}
            className={`group bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border-l-4 transition hover:shadow-md cursor-pointer ${
              !notification.read ? 'border-pink-500' : 'border-transparent'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${
                    !notification.read
                      ? 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <p className={`text-sm sm:text-base ${
                    !notification.read ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(notification.date)}
                    {notification.metaData?.customer && (
                      <span className="ml-2">• From {notification.metaData.customer}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!notification.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification.id);
                    }}
                    className="text-gray-400 hover:text-green-500 transition"
                    title="Mark as read"
                  >
                    <FaCheck size={14} />
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="text-gray-400 hover:text-red-500 transition"
                  title="Delete"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )}
</main>

    </div>
  );
};

export default NotificationsPage;