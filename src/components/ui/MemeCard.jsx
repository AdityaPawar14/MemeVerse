import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Award, Share2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { likeMeme, unlikeMeme } from '../../store/slices/memesSlice';
import { addLikedMeme, removeLikedMeme } from '../../store/slices/userSlice';

const MemeCard = ({ meme }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.memes.likes[meme.id] || 0);
  const commentsCount = useSelector((state) => state.memes.comments[meme.id]?.length || 0);
  const isLiked = useSelector((state) => state.user.profile.likedMemes.includes(meme.id));

  const handleLike = (e) => {
    e.preventDefault();
    if (isLiked) {
      dispatch(unlikeMeme({ memeId: meme.id }));
      dispatch(removeLikedMeme(meme.id));
    } else {
      dispatch(likeMeme({ memeId: meme.id }));
      dispatch(addLikedMeme(meme.id));
    }
  };

  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.98 }
  };

  const heartVariants = {
    liked: {
      scale: [1, 1.5, 1],
      transition: { duration: 0.3 }
    },
    unliked: { scale: 1 }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-purple-100 dark:border-purple-900"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      <Link to={`/meme/${meme.id}`} className="relative block">
        <div className="relative overflow-hidden group">
          <img
            src={meme.url}
            alt={meme.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Featured badge */}
          {likes > 5 && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
              <Award className="h-3 w-3 mr-1" />
              Hot!
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-lg font-bold text-white truncate">
              {meme.name}
            </h3>
            {meme.caption && (
              <p className="text-sm text-white/80 line-clamp-2 mt-1">
                {meme.caption}
              </p>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-center">
          <motion.button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            aria-label={isLiked ? 'Unlike meme' : 'Like meme'}
            variants={heartVariants}
            animate={isLiked ? "liked" : "unliked"}
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`}
            />
            <span className="text-sm font-medium">{likes}</span>
          </motion.button>
          
          <Link 
            to={`/meme/${meme.id}#comments`}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            aria-label="View comments"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{commentsCount}</span>
          </Link>
          
          <motion.button
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Share meme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(window.location.origin + `/meme/${meme.id}`);
              alert('Link copied to clipboard!');
            }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;
