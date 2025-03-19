import React, { createContext, useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  const [themeTransition, setThemeTransition] = useState(false);

  useEffect(() => {
    try {
      const htmlElement = document.documentElement;

      // Start transition
      setThemeTransition(true);
      
      if (darkMode) {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      
      // End transition after animation completes
      const timer = setTimeout(() => {
        setThemeTransition(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <AnimatePresence>
        {themeTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black pointer-events-none z-50"
          />
        )}
      </AnimatePresence>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
