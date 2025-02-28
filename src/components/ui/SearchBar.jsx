import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { searchMemes } from '../../store/slices/memesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const timeoutId = useRef(null); 

  // Debounce search with useCallback
  const debouncedSearch = useCallback(
    (searchTerm) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current); 
      }
      timeoutId.current = setTimeout(() => {
        if (searchTerm.trim()) {
          dispatch(searchMemes(searchTerm));
        }
      }, 500);
    },
    [dispatch]
  );

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Search memes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search memes"
      />
    </div>
  );
};

export default SearchBar;
