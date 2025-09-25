// components/TabsSection.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Your_Collections } from '../Your_Collection/Your_Collections';
import YourCollections from '../Your_Collection/Your_Collections';

export const TabsSection = ({ 
  activeTab, 
  setActiveTab, 
  tabConfig,
  isOwnProfile,
  currentUser,
  viewedUserId,
  profileData 
}) => {
  const AboutSection = ({ profileData }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {profileData?.bio || 'No bio information available.'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
            <p className="text-gray-900 dark:text-white">{profileData?.location || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Art Style</label>
            <p className="text-gray-900 dark:text-white">{profileData?.artStyle || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Portfolio</label>
            {profileData?.portfolio ? (
              <a href={profileData.portfolio} target="_blank" rel="noopener" className="text-purple-600 dark:text-purple-400 hover:underline">
                Visit Portfolio
              </a>
            ) : (
              <p className="text-gray-900 dark:text-white">Not specified</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section className="mt-8 px-4">
      {/* Tab Headers */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex space-x-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
          {Object.entries(tabConfig).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'collections' ? (
              <YourCollections userId={isOwnProfile ? currentUser?.$id : viewedUserId} />
            ) : (
              <AboutSection profileData={profileData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};