import React from 'react';
import { Heart, Github, Twitter, Linkedin, Instagram, Laugh } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const iconVariants = {
    hover: { scale: 1.2, rotate: 15, y: -5 },
    tap: { scale: 0.9 },
  };

  const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner py-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>

      <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-yellow-400 opacity-20"></div>
      <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-purple-400 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright Text */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-3">
              <motion.div animate={bounceAnimation}>
                <Laugh className="h-8 w-8 text-yellow-500 dark:text-yellow-400 mr-2" />
              </motion.div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
                MemeVerse
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} MemeVerse. All rights reserved.
            </p>
            <div className="mt-2 flex space-x-4 justify-center md:justify-start">
              <a
                href="/privacy-policy"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                aria-label="Terms of Service"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Made with love */}
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with{' '}
              <motion.span
                aria-label="love"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                className="mx-1"
                animate={{ 
                  scale: [1, 1.2, 1],
                  transition: { duration: 1.5, repeat: Infinity }
                }}
              >
                <Heart className="h-5 w-5 text-red-500 fill-current" />
              </motion.span>{' '}
              for meme lovers
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="GitHub"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Github className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label="Twitter"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Twitter className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              aria-label="Instagram"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Instagram className="h-6 w-6" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
