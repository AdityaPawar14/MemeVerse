import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/meme/${meme.id}`} className="relative block">
        <img
          src={meme.url}
          alt={meme.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
          <h3 className="text-lg font-semibold text-white truncate">
            {meme.name}
          </h3>
        </div>
      </Link>
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 hover:text-red-500 transition-colors"
          aria-label={isLiked ? 'Unlike meme' : 'Like meme'}
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`}
          />
          <span className="text-sm font-medium">{likes}</span>
        </button>
        
        <Link 
          to={`/meme/${meme.id}#comments`}
          className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          aria-label="View comments"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{commentsCount}</span>
        </Link>
      </div>
    </div>
  );
};

export default MemeCard;