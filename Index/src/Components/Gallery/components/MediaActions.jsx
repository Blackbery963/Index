import LikeButton from '../../../EngagementService/likeButton';
import DownloadService from '../../../Downloads/downloadService';
import ShareButton from '../../../Share/ShareFunction';

const MediaActions = ({ item }) => {
  return (
    <div className="media-actions">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!item.isFeatured && <LikeButton targetId={item.$id} />}
        </div>
        
        <div className="flex items-center space-x-2">
          <DownloadService artwork={item} />
          <ShareButton artwork={item} />
        </div>
      </div>
    </div>
  );
};

export default MediaActions;