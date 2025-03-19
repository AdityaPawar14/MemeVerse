import React from 'react';
import { motion } from 'framer-motion';
import { Laugh } from 'lucide-react';

const LoadingSpinner = () => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-64"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="relative w-20 h-20"
        variants={spinnerVariants}
        animate="animate"
      >
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-r-pink-500 border-b-yellow-500 border-l-blue-500 opacity-75"></div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={bounceVariants}
          animate="animate"
        >
          <Laugh className="h-10 w-10 text-yellow-500" />
        </motion.div>
      </motion.div>
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Loading memes...</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Preparing some laughs for you!</p>
    </motion.div>
  );
};

export default LoadingSpinner;
