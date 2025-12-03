import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
import { FiAward, FiX } from "react-icons/fi";
import { MdOutlineSell } from "react-icons/md";
import { FaArrowLeft, FaArrowRight, FaRegEye } from "react-icons/fa";
import { YourCollectionsService } from "./YourCollectionsService";
import { ArtworkCard } from "./ArtworkCard";
import { ImagePlaceholder } from "./MediaComponents";
import ArtworkViewTracker from "../../../Views/viewsTracker";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  { key: "Arts&Crafts", label: "Arts & Crafts", icon: IoImageOutline },
  { key: "Videos", label: "Videos", icon: IoVideocamOutline },
  { key: "Awards", label: "Awards", icon: FiAward },
  { key: "Sell", label: "Sell", icon: MdOutlineSell }
];

function YourCollections({ userId }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Arts&Crafts");
  const [uploads, setUploads] = useState([]);
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load current user only once on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await YourCollectionsService.fetchCurrentUser();
      setCurrentUserId(user?.$id);
    };
    fetchCurrentUser();
  }, []);

  // Load uploads when tab changes or userId changes
  useEffect(() => {
    loadUploads();
  }, [activeTab, userId]);

  const loadUploads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await YourCollectionsService.fetchUserUploads(userId, activeTab);
      setUploads(data);
      setFilteredUploads(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const navigateImages = (direction) => {
    setLightbox(prev => ({
      ...prev,
      index:
        direction === "next"
          ? (prev.index + 1) % filteredUploads.length
          : (prev.index - 1 + filteredUploads.length) % filteredUploads.length
    }));
  };

  const handleMarkAsSold = async (productId) => {
    try {
      await YourCollectionsService.markAsSold(productId);
      setUploads(prev =>
        prev.map(u =>
          u.$id === productId ? { ...u, status: "sold", price: 0 } : u
        )
      );
      // Update filtered uploads as well
      setFilteredUploads(prev =>
        prev.map(u =>
          u.$id === productId ? { ...u, status: "sold", price: 0 } : u
        )
      );
      toast.success("Artwork marked as sold!");
    } catch (error) {
      toast.error("Failed to mark as sold");
    }
  };

  const TabButton = ({ tab }) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.key;

    return (
      <motion.button
        onClick={() => setActiveTab(tab.key)}
        className={`relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 group
          ${isActive 
            ? "text-violet-600 dark:text-violet-400" 
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {/* Icon */}
        <motion.div
          className={`transition-colors duration-300 ${
            isActive ? "text-violet-600 dark:text-violet-400" : "text-current"
          }`}
        >
          <Icon className={`text-lg ${isActive ? 'scale-110' : ''}`} />
        </motion.div>

        {/* Label - Hidden on mobile */}
        {!isMobile && (
          <motion.span
            className="font-medium whitespace-nowrap"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {tab.label}
          </motion.span>
        )}

        {/* Mobile Tooltip */}
        {isMobile && (
          <div className="absolute bottom-full mb-2 hidden group-hover:flex items-center justify-center">
            <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              {tab.label}
            </div>
          </div>
        )}

        {/* Animated Underline */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400"
            layoutId="activeTabUnderline"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              duration: 0.3
            }}
          />
        )}

        {/* Hover Effect */}
        {!isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-gray-300 dark:bg-gray-600"
            initial={{ width: 0 }}
            whileHover={{ 
              width: "100%", 
              left: 0, 
              right: 0,
              transition: { duration: 0.2 }
            }}
          />
        )}

        {/* Loading indicator for active tab */}
        {isActive && loading && (
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>
    );
  };

  const ContentArea = () => {
    if (loading) {
      return (
        <motion.div
          className="flex justify-center items-center py"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Loading {activeTab.toLowerCase()}...
            </p>
          </div>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
            <motion.button
              onClick={loadUploads}
              className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      );
    }

    if (filteredUploads.length === 0) {
      return (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <ImagePlaceholder activeTab={activeTab} className="h-24 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No {activeTab.toLowerCase()} found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              {activeTab === "Sell"
                ? "Add prices to your artworks to see them here"
                : `You haven't uploaded any ${activeTab.toLowerCase()} yet`}
            </p>
            {currentUserId === userId && (
              <motion.button
                onClick={() => navigate("/Account/Upload")}
                className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload Now
              </motion.button>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <>
        {/* Enhanced Stats */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
            <span className="flex items-center gap-1">
              <span className="font-semibold">{filteredUploads.length}</span> items
            </span>
            <span className="flex items-center gap-1">
              <FaRegEye className="text-violet-500" />
              <span className="font-semibold">
                {filteredUploads.reduce((s, u) => s + (u.viewCount || 0), 0)}
              </span> views
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              <span className="font-semibold">
                {filteredUploads.reduce((s, u) => s + (u.likeCount || 0), 0)}
              </span> likes
            </span>
          </div>
        </motion.div>

        {/* Artwork Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredUploads.map((upload, index) => (
              <ArtworkCard
                key={upload.$id}
                upload={upload}
                activeTab={activeTab}
                onImageClick={() => openLightbox(index)}
                onMarkAsSold={handleMarkAsSold}
                onEdit={(id) => navigate(`/Account/Edit/${id}`)}
                currentUserId={currentUserId}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <ToastContainer 
        position="top-right" 
        autoClose={5000}
        theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
      />

      {/* Fixed Tabs Header - Always visible */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <nav className="flex items-center space-x-1 py-2">
              {TABS.map((tab) => (
                <TabButton key={tab.key} tab={tab} />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content Area - Changes based on loading state */}
      <div className="max-w-full mx-auto px-0 sm:px-0 py-8">
        <ContentArea />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && filteredUploads[lightbox.index] && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Media */}
              <img
                src={YourCollectionsService.getImageUrl(
                  filteredUploads[lightbox.index].fileId
                )}
                alt={filteredUploads[lightbox.index].title}
                className="w-full h-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* Navigation Controls */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
              >
                <FiX size={20} />
              </button>
              
              <button
                onClick={() => navigateImages("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
              >
                <FaArrowLeft size={18} />
              </button>
              
              <button
                onClick={() => navigateImages("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-xl transition-all backdrop-blur-sm"
              >
                <FaArrowRight size={18} />
              </button>

              {/* Info Panel */}
              <motion.div 
                className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-lg rounded-xl p-4 text-white border border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {filteredUploads[lightbox.index].title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">
                    {lightbox.index + 1} of {filteredUploads.length}
                  </span>
                  <div className="flex items-center gap-2 text-white/80">
                    <FaRegEye />
                    <ArtworkViewTracker
                      artworkId={filteredUploads[lightbox.index].$id}
                      onViewUpdated={(count) => {
                        setUploads(prev =>
                          prev.map(u =>
                            u.$id === filteredUploads[lightbox.index].$id
                              ? { ...u, viewCount: count }
                              : u
                          )
                        );
                        setFilteredUploads(prev =>
                          prev.map(u =>
                            u.$id === filteredUploads[lightbox.index].$id
                              ? { ...u, viewCount: count }
                              : u
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default YourCollections;