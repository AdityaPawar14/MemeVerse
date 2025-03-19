import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategory, fetchMemesByCategory } from '../../store/slices/memesSlice';
import { TrendingUp, Clock, Star, Shuffle, Zap } from 'lucide-react';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.memes.currentCategory || 'trending'); // Fallback to 'trending' if undefined

  const categories = [
    { id: 'trending', name: 'Trending', icon: <TrendingUp className="h-4 w-4 mr-1" /> },
    { id: 'new', name: 'New', icon: <Clock className="h-4 w-4 mr-1" /> },
    { id: 'classic', name: 'Classic', icon: <Star className="h-4 w-4 mr-1" /> },
    { id: 'random', name: 'Random', icon: <Shuffle className="h-4 w-4 mr-1" /> },
    { id: 'viral', name: 'Viral', icon: <Zap className="h-4 w-4 mr-1" /> },
  ];

  const handleCategoryChange = (categoryId) => {
    dispatch(setCurrentCategory(categoryId));
    dispatch(fetchMemesByCategory(categoryId));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="flex flex-wrap gap-2 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          type="button"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
            currentCategory === category.id
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-100 dark:border-purple-900/50'
          }`}
          onClick={() => handleCategoryChange(category.id)}
          aria-label={`Filter by ${category.name}`}
        >
          {category.icon}
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;
