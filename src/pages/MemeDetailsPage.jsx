import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Share2, ArrowLeft, Download, Award, MessageCircle, Bookmark, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { likeMeme, unlikeMeme } from '../store/slices/memesSlice';
import { addLikedMeme, removeLikedMeme } from '../store/slices/userSlice';
import CommentSection from '../components/ui/CommentSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const MemeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const likes = useSelector((state) => state.memes.likes[id] || 0);
  const likedMemes = useSelector((state) => state.user.profile.likedMemes || []);
  const isLiked = likedMemes.includes(id);
  const uploadedMemes = useSelector((state) => state.memes.uploadedMemes || []);
  const comments = useSelector((state) => state.memes.comments[id] || []);

  useEffect(() => {
    const fetchMeme = async () => {
      setLoading(true);
      try {
        // First check if it's a user uploaded meme
        const userMeme = uploadedMemes.find((m) => m.id === id);

        if (userMeme) {
          setMeme(userMeme);
        } else {
          // If not, fetch from API
          const response = await fetch('https://api.imgflip.com/get_memes');
          if (!response.ok) {
            throw new Error('Failed to fetch memes');
          }
          const data = await response.json();
          const foundMeme = data.data.memes.find((m) => m.id === id);

          if (foundMeme) {
            setMeme(foundMeme);
          } else {
            setError('Meme not found');
          }
        }
      } catch (err) {
        setError('Failed to load meme');
      } finally {
        setLoading(false);
      }
    };

    fetchMeme();
  }, [id, uploadedMemes]);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikeMeme({ memeId: id }));
      dispatch(removeLikedMeme(id));
    } else {
      dispatch(likeMeme({ memeId: id }));
      dispatch(addLikedMeme(id));
    }
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy link to clipboard.');
      });
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you would dispatch an action to save this to state/backend
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !meme) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {error || 'Meme not found'}
        </h2>
        <Link
          to="/explore"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
            aria-label="Back to explore"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Explore
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-purple-100 dark:border-purple-900/30">
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {meme.name}
              </h1>
              
              {likes > 10 && (
                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                  <Award className="h-4 w-4 mr-1" />
                  Trending
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {meme.uploadDate ? (
                <>Posted on {format(new Date(meme.uploadDate), 'MMMM d, yyyy')}</>
              ) : (
                <>Classic Meme Template</>
              )}
              {meme.uploadedBy && <> by {meme.uploadedBy}</>}
            </p>

            <div className="relative rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900 border border-purple-100 dark:border-purple-900/30">
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full object-contain max-h-[500px]"
              />

              {meme.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                  <p className="text-white text-center text-lg font-bold">
                    {meme.caption}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-4">
                <motion.button
                  onClick={handleLike}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  aria-label={isLiked ? 'Unlike this meme' : 'Like this meme'}
                >
                  <Heart
                    className={`h-6 w-6 mr-2 transition-colors duration-300 ${isLiked ? 'fill-current text-red-500' : ''}`}
                  />
                  <span className="text-lg font-medium">{likes}</span>
                </motion.button>
                
                <Link
                  to={`/meme/${id}#comments`}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <MessageCircle className="h-6 w-6 mr-2" />
                  <span className="text-lg font-medium">{comments.length}</span>
                </Link>
              </div>

              <div className="flex space-x-4 mt-4 sm:mt-0">
                <motion.button
                  onClick={toggleBookmark}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center ${
                    isBookmarked 
                      ? 'text-yellow-500' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this meme'}
                >
                  <Bookmark className={`h-5 w-5 mr-1 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label="Share this meme"
                >
                  <Share2 className="h-5 w-5 mr-1" />
                  Share
                </motion.button>

                <motion.a
                  href={meme.url}
                  download={`${meme.name}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                  aria-label="Download this meme"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="h-5 w-5 mr-1" />
                  Download
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  aria-label="Report this meme"
                >
                  <Flag className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            
            {/* Tags */}
            {meme.tags && meme.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {meme.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="px-6 pb-6">
            <CommentSection memeId={id} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemeDetailsPage;
