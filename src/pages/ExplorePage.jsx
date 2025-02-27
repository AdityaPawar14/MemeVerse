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

  // Fetch memes on component mount
  useEffect(() => {
    dispatch(resetStatus()); // Reset status before fetching new memes
    dispatch(fetchMemesByCategory(currentCategory));
  }, [dispatch, currentCategory]);

  // Sort memes based on the selected option
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

  // Load more memes when the bottom of the page is in view
  useEffect(() => {
    console.log('Is bottom in view?', inView); // Debugging log
    if (inView && status !== 'loading' && page * memesPerPage < memesToDisplay.length) {
      console.log('Loading more memes...'); // Debugging log
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, status, memesToDisplay.length, page]);

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    setPage(1);
  };

  const displayedMemes = sortedMemes.slice(0, page * memesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative mb-12 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        <div className="relative z-10 text-center text-white py-20">
          <motion.h1 className="text-5xl font-bold mb-4">Explore the World of Memes</motion.h1>
          <motion.p className="text-xl">Join millions of meme lovers and share your creativity!</motion.p>
        </div>
      </div>

      <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
        <SearchBar />
        <SortOptions onSort={handleSort} />
      </motion.div>

      <motion.div>
        <CategoryFilter />
      </motion.div>

      {status === 'loading' && page === 1 ? (
        <LoadingSpinner />
      ) : status === 'failed' ? (
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400 text-lg">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchMemesByCategory(currentCategory))}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      ) : displayedMemes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No memes found.</p>
        </div>
      ) : (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedMemes.map((meme) => (
              <motion.div key={meme.id} transition={{ duration: 0.3 }}>
                <MemeCard meme={meme} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Infinite Scroll Trigger */}
      {status !== 'loading' && page * memesPerPage < memesToDisplay.length && (
        <div ref={ref} className="h-10"></div>
      )}

      {/* Loading Spinner for Additional Memes */}
      {status === 'loading' && page > 1 && <LoadingSpinner />}
    </div>
  );
};

export default ExplorePage;