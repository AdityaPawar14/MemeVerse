import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, RefreshCw } from 'lucide-react';

const NotFoundPage = () => {
  const [meme, setMeme] = useState(
    'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' 
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
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
      setError('Failed to load meme. Please try again.'); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchRandomMeme();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={meme}
            alt="Random meme"
            className="w-64 h-64 object-cover rounded-lg mb-8"
            loading="lazy"
            aria-label="Random meme"
          />
        </motion.div>

       
        {isLoading && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">Loading meme...</p>
        )}
        {error && (
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        )}

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The meme you're looking for has wandered off into the depths of the internet.
          </p>

          
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Back to home"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>

       
          <button
            onClick={fetchRandomMeme}
            disabled={isLoading}
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Fetch new meme"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            {isLoading ? 'Loading...' : 'Get Another Meme'}
          </button>
        </motion.div>

     
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-gray-500 dark:text-gray-400"
        >
          <p>Here's a meme-worthy quote while you're here:</p>
          <p className="italic mt-2">"I don't always get lost on websites, but when I do, I find 404 pages."</p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
