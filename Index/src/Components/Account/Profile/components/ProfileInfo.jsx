import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Edit2, Upload, User, Palette, Briefcase, Globe, X } from 'lucide-react';
import SocialIcons from './SocialIcons';
import FollowButton from '../../../../Follow/FollowButton';

const ProfileInfo = ({ 
  profileData, 
  isOwnProfile, 
  currentUser, 
  viewedUserId, 
  profileImage, 
  handleProfileImageUpload 
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 -mt-16 relative max-w-6xl">
      {/* Profile Picture */}
      <div className="relative flex-shrink-0">
        {/* Outer wrapper WITHOUT overflow-hidden */}
        <div className="relative inline-block">
          {/* Inner wrapper WITH rounded corners + overflow clipping */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white 
                          dark:border-gray-800 bg-white dark:bg-gray-800 shadow-xl 
                          overflow-hidden relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover cursor-pointer"
                loading="eager"
                onClick={() => setIsLightboxOpen(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 
                              flex items-center justify-center text-white">
                <User className="text-3xl" />
              </div>
            )}
          </div>

          {/* Edit Button — visible outside bottom-right */}
          {isOwnProfile && (
            <>
              <label
                htmlFor="upload"
                className="absolute bottom-0 right-0 translate-x-3 translate-y-3
                           bg-white dark:bg-gray-700 p-2.5 rounded-full shadow-lg 
                           border border-gray-200 dark:border-gray-600 cursor-pointer 
                           hover:bg-gray-50 dark:hover:bg-gray-600 transition-all 
                           duration-200 hover:scale-105 z-[10]"
              >
                <Edit2 size={15} className="text-gray-700 dark:text-gray-300" />
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
                id="upload"
              />
            </>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="flex-1 pt-2 md:pt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-Quicksand truncate">
              {profileData.username || 'Username'}
            </h1>
            <h3 className="text-lg text-gray-600 dark:text-gray-300 font-Playfair truncate">
              {profileData.nickname || 'Nickname'}
            </h3>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            {!isOwnProfile && currentUser && (
              <FollowButton
                currentUserId={currentUser.$id}
                targetUserId={viewedUserId}
                onFollowChange={(isFollowing) => {
                  setFollowerCount(prev => isFollowing ? prev + 1 : prev - 1);
                }}
              />
            )}
            
            {isOwnProfile && (
              <>
                <Link to={'/account/upload'}>
                  <motion.button
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium group hover:from-purple-700 hover:to-pink-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className='font-Playfair text-sm'>Upload Art</span>
                    <Upload size={16} className="group-hover:scale-110 transition-transform" />
                  </motion.button>
                </Link>

                <Link to={'/account/Edit_profile'}>
                  <motion.button
                    className="px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className='font-Playfair text-sm'>Edit Profile</span>
                    <Edit2 size={16} />
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>

        {profileData.artStyle && (
          <div className='flex flex-wrap items-center gap-2 mt-3'>
            <div className="inline-flex items-center px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-xl text-sm font-medium border border-purple-200 dark:border-purple-800 shadow-sm">
              <Palette size={14} className="mr-2" />
              {profileData.artStyle}
            </div>
            {profileData.profession && (
              <div className="inline-flex items-center px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-sm font-medium border border-blue-200 dark:border-blue-800 shadow-sm">
                <Briefcase size={14} className="mr-2" />
                {profileData.profession}
              </div>
            )}
          </div>
        )}

        <p className="mt-3 text-gray-600 dark:text-gray-400 font-dmserif text-[15px] leading-relaxed">
          {profileData.bio || 'No bio yet. Add one in your profile settings!'}
        </p>

        {/* Additional Info */}
        <div className="flex flex-wrap items-center gap-4 mt-3">
          {profileData.location && (
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <MapPin size={14} className="mr-1.5 text-purple-600 dark:text-purple-400" />
              <span>{profileData.location}</span>
            </div>
          )}
          {profileData.portfolio && (
            <a
              href={profileData.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline transition-colors"
            >
              <Globe size={14} className="mr-1.5" />
              <span>Portfolio</span>
            </a>
          )}
        </div>

        {/* Social Media Links */}
        <div className="mt-4">
          <SocialIcons profileData={profileData} />
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && profileImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 py-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-auto rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
            >
              <img
                src={profileImage}
                alt="Enlarged Profile"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={20} className="text-gray-800 dark:text-gray-200" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileInfo;