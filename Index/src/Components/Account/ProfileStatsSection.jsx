import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';
import { Client, Databases } from 'appwrite';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const database = new Databases(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

const cardVariants = {
  hover: { scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' },
  tap: { scale: 0.95 },
};

const buttonVariants = {
  hover: { scale: 1.05, background: 'linear-gradient(to right, #2563eb, #1e40af)' },
  tap: { scale: 0.95 },
};

function ProfileStatsSection({ followerCount: initialFollowerCount }) {
  const [stats, setStats] = useState({
    followerCount: initialFollowerCount || 0,
    followingCount: 0,
    artworksCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.userId) throw new Error('User not logged in');

        const response = await database.getDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          user.userId
        );
        setStats({
          followerCount: response.followerCount || 0,
          followingCount: response.followingCount || 1200, // Default or fetched
          artworksCount: response.artworksCount || 48, // Default or fetched
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 md:px-8 mt-10">
      {/* Followers Card */}
      <motion.div
        className="px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center w-32"
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        role="region"
        aria-label="Followers count"
      >
        <span className="text-gray-600 dark:text-gray-300 font-['Playfair_Display'] font-medium text-sm">
          Followers
        </span>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            stats.followerCount.toLocaleString()
          )}
        </span>
      </motion.div>

      {/* Following Card */}
      <motion.div
        className="px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center w-32"
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        role="region"
        aria-label="Following count"
      >
        <span className="text-gray-600 dark:text-gray-300 font-['Playfair_Display'] font-medium text-sm">
          Following
        </span>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            stats.followingCount.toLocaleString()
          )}
        </span>
      </motion.div>

      {/* Artworks Card */}
      <motion.div
        className="px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center w-32"
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        role="region"
        aria-label="Artworks count"
      >
        <span className="text-gray-600 dark:text-gray-300 font-['Playfair_Display'] font-medium text-sm">
          Artworks
        </span>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            stats.artworksCount.toLocaleString()
          )}
        </span>
      </motion.div>

      {/* Upload Art Button */}
      <Link to="/Account/Upload">
        <motion.button
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white font-['Playfair_Display'] font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Upload new artwork"
        >
          <FiUpload className="text-lg" />
          <span>Upload Art</span>
        </motion.button>
      </Link>
    </div>
  );
}

export default ProfileStatsSection;