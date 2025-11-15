import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Palette, Globe } from 'lucide-react';
// import Your_Collections from '../Your_Collection/Your_Collections';
import Your_Collections from '../../Your_Collection/Your_Collections';

const TabContent = ({ activeTab, isOwnProfile, currentUser, viewedUserId, profileData }) => {
  const tabVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {activeTab === 'collections' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Eagle">
                {isOwnProfile ? 'Your Collections' : 'Collections'}
              </h3>
              <Your_Collections userId={isOwnProfile ? currentUser?.$id : viewedUserId} />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white font-Quicksand">About</h3>
                <p className="text-gray-600 dark:text-gray-400 font-Playfair text-[15px] leading-relaxed">
                  {profileData.bio || 'No bio information available.'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white font-Quicksand">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
                    <MapPin size={16} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Location</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {profileData.location || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
                    <Palette size={16} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Art Style</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {profileData.artStyle || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
                    <Globe size={16} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Portfolio</span>
                      {profileData.portfolio ? (
                        <a
                          href={profileData.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 dark:text-purple-400 hover:underline block"
                        >
                          View Portfolio
                        </a>
                      ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300">Not specified</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TabContent;