import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Smile, TrendingUp, Users, Globe, Sparkles, Zap } from 'lucide-react';
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 relative"
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-yellow-400 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
          }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-purple-400 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
            transition: { duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
          }}
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 sm:text-6xl lg:text-7xl mb-4">
             MemeVerse
          </h1>
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
            }}
            className="inline-block"
          >
            <Sparkles className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
          </motion.div>
        </motion.div>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          Where memes come to life! Dive into the funniest corner of the internet. 
          <span className="font-bold text-purple-600 dark:text-purple-400"> Warning: </span> 
          Side effects may include uncontrollable laughter and meme addiction!
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Explore Memes
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/upload"
              className="inline-flex items-center px-6 py-3 border-2 border-purple-600 dark:border-purple-400 text-base font-medium rounded-full shadow-md text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
          <motion.h2 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="h-6 w-6 mr-2 text-yellow-500" />
            Trending Memes
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/explore"
              className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
              aria-label="View all trending memes"
            >
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {status === 'loading' ? (
          <LoadingSpinner />
        ) : status === 'failed' ? (
          <motion.div 
            className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-red-100 dark:border-red-900/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-500 dark:text-red-400 text-base mb-4">Error: {error}</p>
            <motion.button
              onClick={() => dispatch(fetchTrendingMemes())}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {trending.slice(0, 6).map((meme) => (
              <motion.div key={meme.id} variants={itemVariants}>
                <MemeCard meme={meme} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Fresh Memes Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <motion.h2 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="h-6 w-6 mr-2 text-yellow-500" />
            Fresh Out of the Oven
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/explore"
              className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
              aria-label="View all new memes"
            >
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {status === 'loading' ? (
          <LoadingSpinner />
        ) : status === 'failed' ? (
          <motion.div 
            className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-red-100 dark:border-red-900/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-500 dark:text-red-400 text-base mb-4">Error: {error}</p>
            <motion.button
              onClick={() => dispatch(fetchNewMemes())}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {newMemes.slice(0, 6).map((meme) => (
              <motion.div key={meme.id} variants={itemVariants}>
                <MemeCard meme={meme} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Join Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
            transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
          }}
          className="absolute w-64 h-64 bg-white rounded-full opacity-10 -top-32 -left-32"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
            transition: { duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
          }}
          className="absolute w-64 h-64 bg-white rounded-full opacity-10 -bottom-32 -right-32"
        />
        
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Smile className="h-16 w-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Join the MemeVerse Community</h2>
          <p className="text-xl text-white/90 mb-8 relative z-10 max-w-2xl mx-auto">
            Share your creativity, connect with meme lovers worldwide, and have fun! 
            <span className="font-bold"> Warning: </span> 
            May cause excessive laughter and meme addiction.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/upload"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload a Meme
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-full shadow-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Globe className="h-5 w-5 mr-2" />
              Explore Memes
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 mt-16 shadow-md border border-purple-100 dark:border-purple-900/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }} 
            className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-sm"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <Upload className="h-12 w-12 mx-auto text-purple-500 mb-3" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1M+</h3>
            <p className="text-gray-600 dark:text-gray-400">Memes Uploaded</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }} 
            className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl shadow-sm"
          >
            <motion.div 
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                transition: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.2 }
              }}
            >
              <Smile className="h-12 w-12 mx-auto text-yellow-500 mb-3" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10M+</h3>
            <p className="text-gray-600 dark:text-gray-400">Laughs Generated</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }} 
            className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                transition: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.4 }
              }}
            >
              <Users className="h-12 w-12 mx-auto text-blue-500 mb-3" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">100K+</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Creators</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
