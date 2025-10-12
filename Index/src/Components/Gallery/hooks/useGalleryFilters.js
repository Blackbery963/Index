import { useState, useEffect } from 'react';

export const useGalleryFilters = (allMedia) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredMedia(allMedia.filter(item => {
        if (filter === 'user') return !item.isFeatured;
        if (filter === 'featured') return item.isFeatured;
        if (filter === 'videos') return item.type === 'video';
        return true;
      }));
      setSuggestions([]);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = allMedia.filter(item => {
      // Apply filter first
      if (filter === 'user' && item.isFeatured) return false;
      if (filter === 'featured' && !item.isFeatured) return false;
      if (filter === 'videos' && item.type !== 'video') return false;

      // Then search
      const matches = [];
      if (item.title) matches.push(item.title.toLowerCase().includes(lowerCaseSearch));
      if (item.description) matches.push(item.description.toLowerCase().includes(lowerCaseSearch));
      if (item.tag) {
        const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
        matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
      }
      return matches.some(Boolean);
    });

    setFilteredMedia(results);

    // Generate suggestions
    const suggestionSet = new Set();
    allMedia.filter(item => {
      if (filter === 'user') return !item.isFeatured;
      if (filter === 'featured') return item.isFeatured;
      if (filter === 'videos') return item.type === 'video';
      return true;
    }).forEach(item => {
      [item.title, item.description].forEach(text => {
        if (text) {
          text.toLowerCase().split(' ')
            .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
            .forEach(word => suggestionSet.add(word));
        }
      });
      if (item.tag) {
        const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
        tags.forEach(tag => {
          if (tag.toLowerCase().includes(lowerCaseSearch)) {
            suggestionSet.add(tag.toLowerCase());
          }
        });
      }
    });

    setSuggestions([...suggestionSet].slice(0, 5));
  }, [searchTerm, allMedia, filter]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    filteredMedia,
    suggestions,
    handleSuggestionClick
  };
};