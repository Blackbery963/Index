import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';;
import UserInfo from './UserInfo';
import MediaActions from './MediaActions';

const MediaCard = ({ item, userProfile, isHighlighted, onClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`media-card ${isHighlighted ? 'highlighted-artwork' : ''}`}
    >
      <div className="media-container">
        {/* Media Header */}
        <div className="media-header">
          <UserInfo item={item} userProfile={userProfile} />
          {/* <MediaTypeBadge item={item} /> */}
        </div>

        {/* Media Content */}
        <div className="media-content" onClick={onClick}>
          {item.type === 'video' ? (
            <video
              src={item.url}
              className="media-element"
              muted
              playsInline
              preload="metadata"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
            />
          ) : (
            <img
              src={item.url}
              alt={item.title || 'Artwork'}
              className="media-element"
              loading="lazy"
            />
          )}
        </div>

        {/* Media Info */}
        <div className="media-info">
          <h3 className="media-title">{item.title || 'Untitled'}</h3>
          {item.description && (
            <p className="media-description">{item.description}</p>
          )}
          <div>
            {item.tags && item.tags.length > 0 && (
              <div className="media-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="media-tag">
                    {item.tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Stats */}
          <div className="media-stats">
            <div className="flex items-center space-x-1">
              <FaRegEye className="text-[16px] text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.viewCount || 0}
              </span>
            </div>
          </div>

          {/* Actions */}
          <MediaActions item={item} />
        </div>
      </div>
    </motion.div>
  );
};

export default MediaCard;
