// components/ProfileSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit, FiUpload } from 'react-icons/fi';
import { FaPalette, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaXTwitter 
} from 'react-icons/fa6';
// import {FollowButton} from '../../../Follow/FollowButton';
 import FollowButton from "../../../Follow/FollowButton"

export const ProfileSection = ({ 
  isOwnProfile, 
  profileData, 
  currentUser, 
  viewedUserId,
  followerCount,
  followingCount,
  collectionCount,
  handleProfileImageUpload 
}) => {
  const socialLinks = [
    { platform: 'facebook', icon: FaFacebook, url: profileData?.facebook },
    { platform: 'instagram', icon: FaInstagram, url: profileData?.instagram },
    { platform: 'twitter', icon: FaXTwitter, url: profileData?.twitter },
    { platform: 'linkedin', icon: FaLinkedin, url: profileData?.linkedin }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6 -mt-16 relative">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
              {profileData?.profileImageUrl ? (
                <img
                  src={profileData.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">
                    {profileData?.username?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>
            
            {isOwnProfile && (
              <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform">
                <FiEdit className="text-gray-600 dark:text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 pt-4 md:pt-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {profileData?.username}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                {profileData?.nickname}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {profileData?.artStyle && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm font-medium">
                    <FaPalette className="mr-1" />
                    {profileData.artStyle}
                  </span>
                )}
                {profileData?.profession && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
                    {profileData.profession}
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                {profileData?.bio || 'No bio yet. Add one in your profile settings!'}
              </p>

              {/* Location & Portfolio */}
              <div className="flex flex-wrap gap-4 mt-3">
                {profileData?.location && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="mr-1" />
                    {profileData.location}
                  </div>
                )}
                {profileData?.portfolio && (
                  <a
                    href={profileData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <FaGlobe className="mr-1" />
                    Portfolio
                  </a>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mt-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url ? `https://${social.platform}.com/${social.url}` : '#'}
                    target={social.url ? '_blank' : '_self'}
                    className={`p-2 rounded-lg transition-all ${
                      social.url 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110' 
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }`}
                    title={social.url ? social.platform : `No ${social.platform} linked`}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isOwnProfile && currentUser && (
                <FollowButton
                  currentUserId={currentUser.$id}
                  targetUserId={viewedUserId}
                />
              )}
              
              {isOwnProfile && (
                <>
                  <Link to="/account/upload">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg"
                    >
                      <FiUpload />
                      Upload
                    </motion.button>
                  </Link>
                  
                  <Link to="/account/edit_profile">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium flex items-center gap-2 shadow-lg"
                    >
                      <FiEdit />
                      Edit
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            {[
              { label: 'Followers', value: followerCount },
              { label: 'Following', value: followingCount },
              { label: 'Collections', value: collectionCount }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};