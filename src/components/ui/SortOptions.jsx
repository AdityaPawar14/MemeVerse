import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Heart, Clock, MessageCircle, ChevronDown } from 'lucide-react';

const SortOptions = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (sortType, label) => {
    onSort(sortType);
    setSelectedOption(label);
    setIsOpen(false);
  };

  const handleKeyDown = (e, sortType, label) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSort(sortType, label);
    }
  };

  const sortOptions = [
    { type: 'likes', label: 'Most Liked', icon: <Heart className="h-4 w-4 mr-2" /> },
    { type: 'date', label: 'Newest', icon: <Clock className="h-4 w-4 mr-2" /> },
    { type: 'comments', label: 'Most Comments', icon: <MessageCircle className="h-4 w-4 mr-2" /> }
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative inline-block text-left">
      <motion.button
        type="button"
        className="inline-flex justify-between items-center w-full rounded-full border border-purple-200 dark:border-purple-800 shadow-sm px-4 py-2.5 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        id="sort-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Sort options"
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center">
          <ArrowUpDown className="h-5 w-5 mr-2 text-purple-500" />
          {selectedOption || 'Sort By'}
        </span>
        <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="sort-menu"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="py-1" role="none">
              {sortOptions.map((option) => (
                <motion.button
                  key={option.type}
                  className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                  role="menuitem"
                  onClick={() => handleSort(option.type, option.label)}
                  onKeyDown={(e) => handleKeyDown(e, option.type, option.label)}
                  tabIndex={0}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  {option.icon}
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortOptions;
