import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID

export const SearchBar = ({ allImages, onFilter, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      onFilter(allImages);
      setSuggestions([]);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    // Filter images
    const results = allImages.filter((image) => {
      const matches = [];
      if (image.title) matches.push(image.title.toLowerCase().includes(lowerCaseSearch));
      if (image.description) matches.push(image.description.toLowerCase().includes(lowerCaseSearch));
      if (image.tag) {
        const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
        matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
      }
      return matches.some(Boolean);
    });

    // Generate suggestions
    const suggestionSet = new Set();
    allImages.forEach((image) => {
      if (image.title) {
        image.title.toLowerCase().split(' ')
          .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
          .forEach(word => suggestionSet.add(word));
      }
      if (image.description) {
        image.description.toLowerCase().split(' ')
          .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
          .forEach(word => suggestionSet.add(word));
      }
      if (image.tag) {
        const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
        tags.filter(tag => tag.toLowerCase().includes(lowerCaseSearch))
          .forEach(tag => suggestionSet.add(tag.toLowerCase()));
      }
    });

    onFilter(results);
    setSuggestions([...suggestionSet].slice(0, 5));
  }, [searchTerm, allImages, onFilter]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  // Inside SearchBar.jsx
const performSearch = async (term) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.search('title', term),
        Query.search('description', term),
        Query.search('tag', term),
      ]
    );
    onFilter(response.documents);
  } catch (error) {
    console.error("Search error:", error);
  }
};

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (searchTerm) {
      performSearch(searchTerm);
    } else {
      onFilter(allImages);
    }
  }, 300); // Debounce for 300ms

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);

  return (
    <div className="max-w-2xl mx-auto my-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <FaSearch />
        </div>

        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;