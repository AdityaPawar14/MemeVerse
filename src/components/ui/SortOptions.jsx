import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

const SortOptions = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (sortType) => {
    onSort(sortType);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  const handleKeyDown = (e, sortType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSort(sortType);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="sort-menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Sort options"
          onClick={toggleDropdown}
        >
          <ArrowUpDown className="h-5 w-5 mr-2" />
          Sort
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="sort-menu"
        >
          <div className="py-1" role="none">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
              onClick={() => handleSort('likes')}
              onKeyDown={(e) => handleKeyDown(e, 'likes')}
              tabIndex={0}
            >
              Most Liked
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
              onClick={() => handleSort('date')}
              onKeyDown={(e) => handleKeyDown(e, 'date')}
              tabIndex={0}
            >
              Newest
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
              onClick={() => handleSort('comments')}
              onKeyDown={(e) => handleKeyDown(e, 'comments')}
              tabIndex={0}
            >
              Most Comments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortOptions;