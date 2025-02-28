import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategory, fetchMemesByCategory } from '../../store/slices/memesSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.memes.currentCategory || 'trending'); 

  const categories = [
    { id: 'trending', name: 'Trending' },
    { id: 'new', name: 'New' },
    { id: 'classic', name: 'Classic' },
    { id: 'random', name: 'Random' },
  ];

  const handleCategoryChange = (categoryId) => {
    dispatch(setCurrentCategory(categoryId));
    dispatch(fetchMemesByCategory(categoryId));
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          type="button" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            currentCategory === category.id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => handleCategoryChange(category.id)}
          aria-label={`Filter by ${category.name}`} 
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
