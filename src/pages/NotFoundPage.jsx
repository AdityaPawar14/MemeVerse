import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, RefreshCw, Frown, Laugh } from 'lucide-react';

const NotFoundPage = () => {
  const [meme, setMeme] = useState(
    'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' // Fallback image
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [funnyText, setFunnyText] = useState('');

  const funnyTexts = [
    "Oops! This page has gone to find itself.",
    "404: Page playing hide and seek. It's winning.",
    "This page is on vacation. Probably somewhere nice.",
    "Looks like this page took a wrong turn at Albuquerque.",
    "This page was last seen heading to the meme dimension.",
    "Error 404: Page not found. But we found this meme instead!",
    "The page you're looking for is in another castle.",
    "This page has been abducted by aliens. We're negotiating its return.",
    "Page not found. Have a meme instead!",
    "This link is broken, but your sense of humor doesn't have to be."
  ];

  const fetchRandomMeme = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      if (!response.ok) {
        throw new Error('Failed to fetch meme');
      }
      const data = await response.json();
      if (data.success) {
        const memes = data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        setMeme(randomMeme.url);
      } else {
        throw new Error('Failed to fetch meme');
      }
    } catch (error) {
      console.error('Failed to fetch meme:', error);
      setError('Failed to load meme. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeme();
    setFunnyText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)]);
  }, []);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8 text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500"
        >
          404
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mb-8 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <img
              src={meme}
              alt="Random meme"
              className="w-72 h-72 object-cover rounded-lg"
              loading="lazy"
              aria-label="Random meme"
            />
          </div>
        </motion.div>
        
        {isLoading && (
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-400 mb-4"
          >
            Loading meme...
          </motion.p>
        )}
        
        {error && (
          <motion.p 
            variants={itemVariants}
            className="text-red-500 dark:text-red-400 mb-4"
          >
            {error}
          </motion.p>
        )}

        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-center"
        >
          <Frown className="h-8 w-8 mr-2 text-yellow-500" />
          {funnyText}
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
        >
          The meme you're looking for has wandered off into the depths of the internet.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              aria-label="Back to home"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => {
                fetchRandomMeme();
                setFunnyText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)]);
              }}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border-2 border-purple-600 dark:border-purple-400 text-base font-medium rounded-full shadow-md text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              aria-label="Fetch new meme"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5 mr-2" />
              )}
              {isLoading ? 'Loading...' : 'Get Another Meme'}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/30"
        >
          <Laugh className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
          <p className="font-medium mb-2">Here's a meme-worthy quote while you're here:</p>
          <p className="italic">"I don't always get lost on websites, but when I do, I find 404 pages with random memes."</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
