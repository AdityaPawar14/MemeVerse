import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMemes, resetSearchResults } from '../../store/slices/memesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const timeoutId = useRef(null);
  const inputRef = useRef(null);

  const debouncedSearch = useCallback(
    (searchTerm) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        if (searchTerm.trim()) {
          dispatch(searchMemes(searchTerm));
        } else {
          dispatch(resetSearchResults());
        }
      }, 500);
    },
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const clearSearch = () => {
    setQuery('');
    dispatch(resetSearchResults());
    inputRef.current?.focus();
  };

  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative flex items-center overflow-hidden rounded-full transition-all duration-300 ${
        isFocused ? 'ring-2 ring-purple-500 shadow-md' : 'shadow'
      }`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${isFocused ? 'text-purple-500' : 'text-gray-400'}`} aria-hidden="true" />
        </div>

        <input
          ref={inputRef}
          type="text"
          className="block w-full pl-10 pr-10 py-3 border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0"
          placeholder="Search for memes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search memes"
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {/* Search suggestions - could be implemented in the future */}
      {isFocused && query.length > 1 && (
        <motion.div 
          className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {/* Search suggestions would go here */}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
