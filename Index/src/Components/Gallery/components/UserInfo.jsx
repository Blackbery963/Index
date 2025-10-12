import { Link } from 'react-router-dom';
import FollowButton from '../../../Follow/FollowButton';

const UserInfo = ({ item, userProfile }) => {
  if (item.isFeatured) {
    return (
      <a 
        href={item.photographerUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
          {item.photographer?.charAt(0) || 'P'}
        </div>
        <span className="text-sm font-semibold text-white">
          {item.photographer || 'Pexels Artist'}
        </span>
      </a>
    );
  }

  return (
    <>
      <Link to={`/Account/${item.userId}`} className="flex items-center space-x-2">
        {userProfile?.profileImage ? (
          <img
            src={userProfile.profileImage}
            alt={userProfile.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
            {userProfile?.name?.charAt(0) || 'U'}
          </div>
        )}
        <span className="text-sm font-semibold text-white">
          {userProfile?.name || 'Username'}
        </span>
      </Link>
      <FollowButton targetUserId={item.userId} />
    </>
  );
};

export default UserInfo;