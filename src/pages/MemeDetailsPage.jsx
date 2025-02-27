// pages/MemeDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Share2, ArrowLeft, Download } from 'lucide-react';
import { format } from 'date-fns';
import { likeMeme } from '../store/slices/memesSlice';
import { addLikedMeme, removeLikedMeme } from '../store/slices/userSlice';
import CommentSection from '../components/ui/CommentSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const MemeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const likes = useSelector((state) => state.memes.likes[id] || 0);
  const likedMemes = useSelector((state) => state.user.profile.likedMemes || []);
  const isLiked = likedMemes.includes(id);
  const uploadedMemes = useSelector((state) => state.memes.uploadedMemes || []);

  useEffect(() => {
    const fetchMeme = async () => {
      setLoading(true);
      try {
        // First check if it's a user-uploaded meme
        const userMeme = uploadedMemes.find((m) => m.id === id);

        if (userMeme) {
          setMeme(userMeme);
        } else {
          // Otherwise fetch from API
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
    dispatch(likeMeme({ memeId: id }));

    if (isLiked) {
      dispatch(removeLikedMeme(id));
    } else {
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
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            aria-label="Back to explore"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Explore
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {meme.name}
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {meme.uploadDate ? (
                <>Posted on {format(new Date(meme.uploadDate), 'MMMM d, yyyy')}</>
              ) : (
                <>Classic Meme Template</>
              )}
              {meme.uploadedBy && <> by {meme.uploadedBy}</>}
            </p>

            <div className="relative rounded-lg overflow-hidden mb-6">
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full object-contain bg-gray-100 dark:bg-gray-900"
              />

              {meme.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                  <p className="text-white text-center text-lg font-bold">
                    {meme.caption}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <motion.button
                  onClick={handleLike}
                  whileTap={{ scale: 1.2 }}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  aria-label={isLiked ? 'Unlike this meme' : 'Like this meme'}
                >
                  <Heart
                    className={`h-6 w-6 mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`}
                  />
                  <span className="text-lg">{likes}</span>
                </motion.button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleShare}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  aria-label="Share this meme"
                >
                  <Share2 className="h-5 w-5 mr-1" />
                  Share
                </button>

                <a
                  href={meme.url}
                  download={`${meme.name}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  aria-label="Download this meme"
                >
                  <Download className="h-5 w-5 mr-1" />
                  Download
                </a>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <CommentSection memeId={id} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemeDetailsPage;