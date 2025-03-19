import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchMemesByCategory, resetStatus } from '../store/slices/memesSlice';
import MemeCard from '../components/ui/MemeCard';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import SortOptions from '../components/ui/SortOptions';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Sparkles, Search, Filter } from 'lucide-react';

const ExplorePage = () => {
  const dispatch = useDispatch();
  const { explore, searchResults, status, error, currentCategory } = useSelector(
    (state) => state.memes
  );
  const [sortedMemes, setSortedMemes] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const memesPerPage = 9;

  const memesToDisplay = searchResults.length > 0 ? searchResults : explore;

  useEffect(() => {
    dispatch(resetStatus());
    dispatch(fetchMemesByCategory(currentCategory));
  }, [dispatch, currentCategory]);

  useEffect(() => {
    let sorted = [...memesToDisplay];

    if (sortBy === 'likes') {
      sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sortBy === 'date') {
      sorted = sorted.reverse();
    } else if (sortBy === 'comments') {
      sorted.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    }

    setSortedMemes(sorted);
  }, [memesToDisplay, sortBy]);

  useEffect(() => {
    if (inView && status !== 'loading' && page * memesPerPage < memesToDisplay.length) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, status, memesToDisplay.length, page]);

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    setPage(1);
  };

  const displayedMemes = sortedMemes.slice(0, page * memesPerPage);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <motion.div
        className="relative mb-12 overflow-hidden rounded-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-90"></div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white opacity-10"
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, 20, 0],
            transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-white opacity-10"
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, -20, 0],
            transition: { duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
          }}
        />
        
        <div className="relative z-10 text-center text-white py-12 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
              }}
              className="inline-block mb-4"
            >
              <Sparkles className="h-12 w-12 text-yellow-300 mx-auto" />
            </motion.div>
            <h1 className="text-4xl font-extrabold mb-4">Explore the World of Memes</h1>
            <p className="text-xl max-w-2xl mx-auto">Join millions of meme lovers and discover the funniest content on the internet!</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-purple-100 dark:border-purple-900/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-purple-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Find Memes</h2>
          </div>
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-purple-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mr-4">Sort</h2>
            <SortOptions onSort={handleSort} />
          </div>
        </div>
        
        <SearchBar />
        
        <div className="mt-6">
          <CategoryFilter />
        </div>
      </motion.div>

      {/* Memes Grid */}
      {status === 'loading' && page === 1 ? (
        <LoadingSpinner />
      ) : status === 'failed' ? (
        <motion.div 
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-red-100 dark:border-red-900/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-red-500 dark:text-red-400 text-lg mb-4">Error: {error}</p>
          <motion.button
            onClick={() => dispatch(fetchMemesByCategory(currentCategory))}
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      ) : displayedMemes.length === 0 ? (
        <motion.div 
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">No memes found. Try a different search or category.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence>
            {displayedMemes.map((meme, index) => (
              <motion.div 
                key={meme.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MemeCard meme={meme} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Load More Indicator */}
      {status !== 'loading' && page * memesPerPage < memesToDisplay.length && (
        <div ref={ref} className="h-20 flex items-center justify-center mt-8">
          <motion.div 
            className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Loading More Indicator */}
      {status === 'loading' && page > 1 && (
        <div className="mt-8">
          <LoadingSpinner />
        </div>
      )}
    </motion.div>
  );
};

export default ExplorePage;
