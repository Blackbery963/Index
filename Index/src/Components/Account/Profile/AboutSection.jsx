// components/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPalette, FaGlobe, FaUser } from 'react-icons/fa';

export const AboutSection = ({ profileData }) => {
  const details = [
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: profileData?.location || 'Not specified',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: FaPalette,
      label: 'Art Style',
      value: profileData?.artStyle || 'Not specified',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: FaUser,
      label: 'Profession',
      value: profileData?.profession || 'Not specified',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: FaGlobe,
      label: 'Portfolio',
      value: profileData?.portfolio,
      isLink: true,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Bio Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-white/20 dark:border-gray-700/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <FaUser className="text-white text-lg" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            About Me
          </h3>
        </div>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base lg:text-lg">
            {profileData?.bio || (
              <span className="text-gray-500 dark:text-gray-400 italic">
                No bio yet. {profileData?.username || 'This user'} hasn't added a bio.
              </span>
            )}
          </p>
        </div>

        {/* Join Date */}
        {profileData?.$createdAt && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Member since {new Date(profileData.$createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        )}
      </motion.div>

      {/* Details Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-white/20 dark:border-gray-700/20"
      >
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Details
        </h3>
        
        <div className="space-y-4 lg:space-y-6">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-start gap-4 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-colors"
            >
              <div className={`p-2 rounded-lg bg-white dark:bg-gray-600 shadow-sm ${detail.color}`}>
                <detail.icon className="text-lg" />
              </div>
              
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {detail.label}
                </label>
                
                {detail.isLink && detail.value ? (
                  <a
                    href={detail.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:underline font-medium truncate block"
                  >
                    {detail.value.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                ) : (
                  <p className="text-gray-900 dark:text-white font-medium truncate">
                    {detail.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Media Presence */}
        {(profileData?.facebook || profileData?.instagram || profileData?.twitter || profileData?.linkedin) && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Social Media
            </h4>
            <div className="flex gap-2">
              {[
                { platform: 'facebook', icon: '📘', condition: profileData.facebook },
                { platform: 'instagram', icon: '📷', condition: profileData.instagram },
                { platform: 'twitter', icon: '🐦', condition: profileData.twitter },
                { platform: 'linkedin', icon: '💼', condition: profileData.linkedin }
              ].map((social) =>
                social.condition ? (
                  <span
                    key={social.platform}
                    className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm"
                    title={social.platform}
                  >
                    {social.icon}
                  </span>
                ) : null
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};