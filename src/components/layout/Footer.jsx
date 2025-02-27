import React from 'react';
import { Heart, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants for social icons
  const iconVariants = {
    hover: { scale: 1.1, rotate: 10 },
    tap: { scale: 0.9 },
  };

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Copyright Text */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} MemeVerse. All rights reserved.
            </p>
            <div className="mt-2 flex space-x-4">
              <a
                href="/privacy-policy"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm"
                aria-label="Terms of Service"
              >
                Terms of Service
              </a>
            </div>
          </div>

          {/* Made with Love */}
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with{' '}
              <motion.span
                aria-label="love"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="mx-1"
              >
                <Heart className="h-4 w-4 text-red-500" />
              </motion.span>{' '}
              for meme lovers
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              aria-label="GitHub"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              aria-label="Twitter"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              aria-label="LinkedIn"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              aria-label="Instagram"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Instagram className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;