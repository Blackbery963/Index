import React from 'react';
import { SOCIAL_ICONS } from '../utils/constants';

const SocialIcons = ({ profileData }) => {
  const socialLinks = [
    {
      platform: 'facebook',
      icon: SOCIAL_ICONS.facebook,
      url: profileData.facebook ? `https://www.facebook.com/${profileData.facebook}` : null
    },
    {
      platform: 'instagram',
      icon: SOCIAL_ICONS.instagram,
      url: profileData.instagram ? `https://www.instagram.com/${profileData.instagram}` : null
    },
    {
      platform: 'twitter',
      icon: SOCIAL_ICONS.twitter,
      url: profileData.twitter ? `https://twitter.com/${profileData.twitter}` : null
    },
    {
      platform: 'linkedin',
      icon: SOCIAL_ICONS.linkedin,
      url: profileData.linkedin ? `https://www.linkedin.com/${profileData.linkedin}` : null
    }
  ];

  return (
    <div className="flex gap-2 font-Playfair">
      {socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.url || '#'}
          target={social.url ? "_blank" : "_self"}
          rel={social.url ? "noopener noreferrer" : ""}
          className={`flex w-9 h-9 items-center justify-center rounded-xl transition-all duration-200 ${
            social.url 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 shadow-sm' 
              : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
          title={social.url ? social.platform : `No ${social.platform} linked`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;