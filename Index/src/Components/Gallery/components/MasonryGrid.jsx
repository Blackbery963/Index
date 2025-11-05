import { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import '../styles/masonry.css'

const MasonryGrid = ({ media, userProfiles, artworkRefs, highlightedArtwork, openLightbox }) => {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 768) setColumns(2);
    //   else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const organizeMasonry = (items, cols) => {
    const columns = Array.from({ length: cols }, () => []);
    items.forEach((item, index) => {
      columns[index % cols].push(item);
    });
    return columns;
  };  

  const columnsArray = organizeMasonry(media, columns);

  return (
    <div className="masonry-grid px-0 lg:max-w-7xl max-w-[98%] mx-auto">
      <div className="masonry-container">
        {columnsArray.map((column, columnIndex) => (
          <div key={columnIndex} className="masonry-column">
            {column.map((item, itemIndex) => (
              <MediaCard
                key={item.$id}
                item={item}
                userProfile={userProfiles[item.userId]}
                ref={el => artworkRefs.current[item.$id] = el}
                isHighlighted={highlightedArtwork === item.$id}
                onClick={() => {
                  const absoluteIndex = media.findIndex(m => m.$id === item.$id);
                  openLightbox(absoluteIndex);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;