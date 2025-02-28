import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Smile, TrendingUp, Users, Globe } from 'lucide-react';
import { fetchTrendingMemes, fetchNewMemes } from '../store/slices/memesSlice';
import MemeCard from '../components/ui/MemeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { trending, newMemes, status, error } = useSelector((state) => state.memes);

  useEffect(() => {
    
    dispatch(fetchTrendingMemes());
    dispatch(fetchNewMemes());
  }, [dispatch]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

 
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

 
  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">MemeVerse</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Explore, create, and share the funniest memes on the internet. Join a global community of meme lovers!
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Explore Memes
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/upload"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload a Meme
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Trending Memes Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Trending Memes</h2>
          <Link
            to="/explore"
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            aria-label="View all trending memes"
          >
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {status === 'loading' ? (
          <LoadingSpinner />
        ) : status === 'failed' ? (
          <div className="text-center py-8">
            <p className="text-red-500 dark:text-red-400 text-base">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchTrendingMemes())}
              className="mt-4 inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trending.slice(0, 6).map((meme) => (
              <motion.div key={meme.id} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <MemeCard meme={meme} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* New Memes Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">New Memes</h2>
          <Link
            to="/explore"
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            aria-label="View all new memes"
          >
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {status === 'loading' ? (
          <LoadingSpinner />
        ) : status === 'failed' ? (
          <div className="text-center py-8">
            <p className="text-red-500 dark:text-red-400 text-base">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchNewMemes())}
              className="mt-4 inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {newMemes.slice(0, 6).map((meme) => (
              <motion.div key={meme.id} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <MemeCard meme={meme} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute w-64 h-64 bg-indigo-500 rounded-full opacity-20 -top-32 -left-32"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
          className="absolute w-64 h-64 bg-purple-500 rounded-full opacity-20 -bottom-32 -right-32"
        />
        <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Join the MemeVerse Community</h2>
        <p className="text-lg text-indigo-100 mb-6 relative z-10">
          Share your creativity, connect with meme lovers worldwide, and have fun!
        </p>
        <div className="flex justify-center space-x-4 relative z-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/upload"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload a Meme
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-lg shadow-sm text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Globe className="h-5 w-5 mr-2" />
              Explore Memes
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Social Proof Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-6 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Upload className="h-10 w-10 mx-auto text-indigo-600 dark:text-indigo-400" />
            <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">1M+</h3>
            <p className="text-gray-600 dark:text-gray-400">Memes Uploaded</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Smile className="h-10 w-10 mx-auto text-indigo-600 dark:text-indigo-400" />
            <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">10M+</h3>
            <p className="text-gray-600 dark:text-gray-400">Laughs Generated</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Users className="h-10 w-10 mx-auto text-indigo-600 dark:text-indigo-400" />
            <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">100K+</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Creators</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
