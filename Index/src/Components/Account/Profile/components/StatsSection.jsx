// StatsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Folder, RefreshCw } from 'lucide-react';
import FollowersList from './FollowerList';
import { followService } from '../../../../Follow/FollowService';

const StatsSection = ({
  userId,
  collectionCount,
  onCountsUpdate = () => {},
  showRefresh = true
}) => {
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    collections: collectionCount || 0
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      if (!userId) return;
      try {
        const followCounts = await followService.getUserCounts(userId);

        const newStats = {
          followers: followCounts?.followers ?? 0,
          following: followCounts?.following ?? 0,
          collections: collectionCount || 0
        };

        setStats(newStats);
        onCountsUpdate(newStats);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, [userId, collectionCount, onCountsUpdate]);

  const refreshStats = async () => {
    if (!userId || isRefreshing) return;
    setIsRefreshing(true);

    try {
      followService.refreshUserCounts?.(userId);

      const followCounts = await followService.getUserCounts(userId);

      const newStats = {
        followers: followCounts?.followers ?? stats.followers,
        following: followCounts?.following ?? stats.following,
        collections: collectionCount || stats.collections
      };

      setStats(newStats);
      onCountsUpdate(newStats);
    } catch (error) {
      console.error('Error refreshing stats:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const statItems = [
    {
      key: 'followers',
      label: 'Followers',
      value: stats.followers,
      icon: <Users size={14} />,
      onClick: () => setShowFollowers(true)
    },
    {
      key: 'following',
      label: 'Following',
      value: stats.following,
      icon: <UserCheck size={14} />,
      onClick: () => setShowFollowing(true)
    },
    {
      key: 'collections',
      label: 'Collections',
      value: stats.collections,
      icon: <Folder size={14} />,
      onClick: null
    }
  ];

  return (
    <>
      <div className="
        mt-4 gap-2 font-Playfair
        flex flex-wrap sm:flex-nowrap 
        sm:items-center
         grid-cols-3 sm:grid-cols-none
      ">
        {statItems.map((stat) => (
          <motion.button
            key={stat.key}
            onClick={stat.onClick}
            disabled={!stat.onClick}
            whileHover={stat.onClick ? { y: -2 } : {}}
            whileTap={stat.onClick ? { scale: 0.97 } : {}}
            transition={{ duration: 0.15 }}
            className={`
              group relative flex items-center justify-center 
              sm:justify-start gap-2
              
              /* MOBILE — small compact buttons */
              px-2 py-2 sm:px-3 sm:py-2
              rounded-xl

              /* Glass layer */
              bg-white/25 dark:bg-gray-900/25
              backdrop-blur-xl border border-white/20 dark:border-gray-800/30

              shadow-sm hover:shadow-md
              transition-all duration-200

              ${stat.onClick ? 'cursor-pointer' : 'cursor-default opacity-90'}
            `}
          >

            {/* ICON — smaller on mobile */}
            <div className="flex-none">
              <div className="
                w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center relative
              ">
                <div className="
                  absolute -inset-0.5 rounded-full 
                  bg-gradient-to-br from-purple-500 to-blue-400 
                  opacity-40 blur-sm
                "></div>

                <div className="
                  relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center
                  rounded-full bg-white/60 dark:bg-gray-900/60 
                  border border-white/40 dark:border-gray-800/40
                ">
                  <div className="text-purple-600 dark:text-purple-300">
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="flex flex-col items-center sm:items-start leading-tight">
              <span className="
                text-[0.65rem] sm:text-xs
                text-gray-600 dark:text-gray-300 font-medium
              ">
                {stat.label}
              </span>

              <span className="
                text-sm font-semibold text-gray-900 dark:text-white
              ">
                {stat.value}
              </span>
            </div>
          </motion.button>
        ))}
        
      </div>

      {/* Modals */}
      <FollowersList
        userId={userId}
        isOpen={showFollowers}
        onClose={() => setShowFollowers(false)}
        type="followers"
      />

      <FollowersList
        userId={userId}
        isOpen={showFollowing}
        onClose={() => setShowFollowing(false)}
        type="following"
      />
    </>
  );
};

export default StatsSection;
