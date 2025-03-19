import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { User, Image, Heart, MessageCircle, Calendar, Edit, Settings, Upload, Grid, List, Bookmark, Edit2, Save } from 'lucide-react';
import { updateProfile } from '../store/slices/userSlice';
import MemeCard from '../components/ui/MemeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { createSelector } from 'reselect';

// Memoized selector for allMemes
const selectAllMemes = createSelector(
  (state) => state.memes.trending,
  (state) => state.memes.newMemes,
  (state) => state.memes.explore,
  (trending, newMemes, explore) => [...trending, ...newMemes, ...explore]
);

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile || {});
  const uploadedMemes = useSelector((state) => state.memes.uploadedMemes || []);
  const allMemes = useSelector(selectAllMemes);
  const likedMemeIds = userProfile.likedMemes || [];

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name || 'User'); // Default to 'User'
  const [bio, setBio] = useState(userProfile.bio || '');
  const [profilePic, setProfilePic] = useState(userProfile.profilePic || '');
  const [activeTab, setActiveTab] = useState('uploads');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);

  const likedMemes = allMemes.filter(meme => likedMemeIds.includes(meme.id));
  const memesToShow = activeTab === 'uploads' ? uploadedMemes : likedMemes;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(updateProfile({ name, bio, profilePic }));
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) {
      return "Invalid date"; // or return a default value like "Unknown"
    }
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-purple-100 dark:border-purple-900/30 mb-8">
        <div className="relative h-48 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white opacity-10"
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 20, 0],
              transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-white opacity-10"
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, -20, 0],
              transition: { duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
            }}
          />
          
          <div className="absolute -bottom-16 left-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <User className="h-14 w-14 text-gray-400 dark:text-gray-500" />
              </div>
            </motion.div>
          </div>
          
          <div className="absolute top-4 right-4">
            <motion.button
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        
        <div className="pt-20 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      aria-label="Edit name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows="3"
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      aria-label="Edit bio"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="Save profile"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Profile
                  </button>
                </form>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <User className="h-4 w-4 mr-1" />
                    @{userProfile.username}
                  </p>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{bio}</p>
                </>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Meme
                </Link>
              </motion.div>
              <motion.button
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-full shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>
          </div>
          
          <div className="mt-6 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center mr-6">
              <Calendar className="h-4 w-4 mr-1" />
              Joined {formatDate(userProfile.joinDate)}
            </div>
            <div className="flex items-center mr-6">
              <Image className="h-4 w-4 mr-1" />
              {uploadedMemes.length} memes
            </div>
            <div className="flex items-center mr-6">
              <Heart className="h-4 w-4 mr-1" />
              {likedMemeIds.length} likes
            </div>
          </div>
          
          <div className="mt-6 flex space-x-6">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.followers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.following}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs and Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-purple-100 dark:border-purple-900/30">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center px-6">
            <div className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'uploads'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('uploads')}
              >
                <div className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Uploads
                </div>
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'liked'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('liked')}
              >
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Liked
                </div>
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('saved')}
              >
                <div className="flex items-center">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Saved
                </div>
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                className={`p-2 rounded-md ${
                  viewMode === 'grid'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded-md ${
                  viewMode === 'list'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : memesToShow.length === 0 ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === 'uploads' ? (
                  <>
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No memes uploaded yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Share your first meme with the community!</p>
                    <Link
                      to="/upload"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload a Meme
                    </Link>
                  </>
                ) : activeTab === 'liked' ? (
                  <>
                    <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No liked memes yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Start liking memes to save them here!</p>
                    <Link
                      to="/explore"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Explore Memes
                    </Link>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved memes yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Bookmark your favorite memes for later!</p>
                    <Link
                      to="/explore"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Explore Memes
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}
            >
              {memesToShow.map((meme) => (
                <motion.div key={meme.id} variants={itemVariants}>
                  <MemeCard meme={meme} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
