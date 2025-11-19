// FollowersList.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, X, Search } from 'lucide-react';
import FollowButton from '../../../../Follow/FollowButton';
import { account, databases, Query } from '../../../../appwriteConfig';

// Helper functions using Appwrite (same logic you had)
const getFollowersWithDetails = async (userId, limit = 80) => {
  try {
    const followers = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_FOLLOWER_COLLECTION_ID,
      [
        Query.equal('following', userId),
        Query.limit(limit),
        Query.orderDesc('createdAt')
      ]
    );

    const followerDetails = await Promise.all(
      followers.documents.map(async (follow) => {
        try {
          const user = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
            follow.follower
          );
          return {
            id: user.$id,
            name: user.name || user.username,
            username: user.username,
            profileImage: user.profileImageUrl,
            bio: user.bio,
            followedAt: follow.createdAt
          };
        } catch (error) {
          console.error('Error fetching follower details:', error);
          return null;
        }
      })
    );

    return followerDetails.filter(Boolean);
  } catch (error) {
    console.error('Error getting followers with details:', error);
    return [];
  }
};

const getFollowingWithDetails = async (userId, limit = 80) => {
  try {
    const following = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_FOLLOWER_COLLECTION_ID,
      [
        Query.equal('follower', userId),
        Query.limit(limit),
        Query.orderDesc('createdAt')
      ]
    );

    const followingDetails = await Promise.all(
      following.documents.map(async (follow) => {
        try {
          const user = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
            follow.following
          );
          return {
            id: user.$id,
            name: user.name || user.username,
            username: user.username,
            profileImage: user.profileImageUrl,
            bio: user.bio,
            followedAt: follow.createdAt
          };
        } catch (error) {
          console.error('Error fetching following details:', error);
          return null;
        }
      })
    );

    return followingDetails.filter(Boolean);
  } catch (error) {
    console.error('Error getting following with details:', error);
    return [];
  }
};

const FollowersList = ({ userId, isOpen, onClose, type = 'followers' }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (error) {
        // not logged in or error - silently ignore
        console.error('Error getting current user:', error);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (isOpen && userId) {
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userId, type]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      let list = [];
      if (type === 'followers') list = await getFollowersWithDetails(userId);
      else list = await getFollowingWithDetails(userId);
      setUsers(list);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.username}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollowChange = (targetUserId, isFollowing) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === targetUserId ? { ...u, isFollowing } : u))
    );
  };

  // close on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Bottom sheet container - click propagation stopped on inner panel */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 sm:inset-auto sm:mx-auto sm:bottom-10 max-w-md px-4"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            ref={sheetRef}
          >
            <div
              className="w-full rounded-2xl overflow-hidden bg-white/60 dark:bg-gray-900/60
                         backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl"
              style={{ backdropFilter: 'saturate(140%) blur(12px)' }}
            >
              {/* Drag handle / header */}
              <div className="p-3 border-b border-white/10 dark:border-gray-700/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-400/60 flex items-center justify-center">
                    <Users size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {type === 'followers' ? 'Followers' : 'Following'}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {users.length} {users.length === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/30 dark:hover:bg-gray-800/30 transition"
                >
                  <X size={18} className="text-gray-700 dark:text-gray-200" />
                </button>
              </div>

              {/* Search */}
              <div className="p-3 border-b border-white/10 dark:border-gray-700/20">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${type}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 dark:bg-gray-800/60 border border-white/10 dark:border-gray-700/20 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="max-h-[55vh] overflow-y-auto">
                {loading ? (
                  <div className="p-4 space-y-3">
                    {[...Array(6)].map((_, idx) => (
                      <div key={idx} className="flex items-center gap-3 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5 mb-2" />
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/5" />
                        </div>
                        <div className="w-24 h-9 rounded-lg bg-gray-200 dark:bg-gray-700" />
                      </div>
                    ))}
                  </div>
                ) : filteredUsers.length > 0 ? (
                  <div className="p-3 space-y-2">
                    {filteredUsers.map((user, i) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-25 blur-sm"></div>
                            <img
                              src={
                                user.profileImage ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`
                              }
                              alt={user.name}
                              className="relative w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-900"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                                {user.name}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                @{user.username}
                              </span>
                            </div>
                            {user.bio && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                {user.bio}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          {currentUserId && currentUserId !== user.id ? (
                            <FollowButton
                              targetUserId={user.id}
                              variant="minimal"
                              size="sm"
                              onFollowChange={(isFollowing) => handleFollowChange(user.id, isFollowing)}
                            />
                          ) : null}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-400/20 flex items-center justify-center mb-3">
                      <Users size={26} className="text-purple-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      No {type} found
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {type === 'followers'
                        ? "No one is following this user yet."
                        : "This user isn't following anyone yet."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FollowersList;


