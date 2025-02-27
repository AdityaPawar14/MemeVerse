import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Laugh, Home, Compass, Upload, Trophy, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-2" /> },
    { name: 'Explore', path: '/explore', icon: <Compass className="h-5 w-5 mr-2" /> },
    { name: 'Upload', path: '/upload', icon: <Upload className="h-5 w-5 mr-2" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="h-5 w-5 mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Laugh className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                MemeVerse
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  location.pathname === link.path
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Section */}
          <div className="flex md:hidden items-center">
            {/* Placeholder for Mobile Menu Button */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open mobile menu"
            >
              {/* Add a hamburger icon here */}
              <span>☰</span>
            </button>
            {/* Theme Toggle Button for Mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ml-2"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;