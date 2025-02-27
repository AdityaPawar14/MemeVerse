import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Edit2, Save, User, Heart } from 'lucide-react';
import { updateProfile } from '../store/slices/userSlice';
import MemeCard from '../components/ui/MemeCard';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile || {});
  const uploadedMemes = useSelector((state) => state.memes.uploadedMemes || []);
  const allMemes = useSelector((state) => state.memes.trending || []);
  const likedMemeIds = useSelector((state) => state.user.profile?.likedMemes || []);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [profilePic, setProfilePic] = useState(profile.profilePic || '');
  const [activeTab, setActiveTab] = useState('uploads');
  const [isLoading, setIsLoading] = useState(false);

  // Filter liked memes from all memes
  const likedMemes = [...allMemes, ...uploadedMemes].filter((meme) =>
    likedMemeIds.includes(meme.id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(
      updateProfile({
        name,
        bio,
        profilePic,
      })
    );
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-#ffff to-#ffff h-40"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
              <div className="relative">
                {isEditing ? (
                  <div className="h-28 w-28 rounded-full border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <label htmlFor="profilePicUpload" className="cursor-pointer">
                      <User className="h-14 w-14 text-gray-400 dark:text-gray-500" />
                      <input
                        type="file"
                        id="profilePicUpload"
                        className="hidden"
                        onChange={handleProfilePicChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                ) : (
                  <img
                    src={profile.profilePic}
                    alt={profile.name}
                    className="h-28 w-28 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                    aria-label="Profile picture"
                  />
                )}
              </div>

              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left flex-grow">
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

                    <div>
                      <label
                        htmlFor="profilePic"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Profile Picture URL
                      </label>
                      <input
                        type="text"
                        id="profilePic"
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.value)}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="https://example.com/image.jpg"
                        aria-label="Edit profile picture URL"
                      />
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
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {profile.name}
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {profile.bio}
                    </p>
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        aria-label="Edit profile"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <motion.div
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {uploadedMemes.length}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uploads</p>
              </motion.div>
              <motion.div
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {likedMemes.length}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
              </motion.div>
              <motion.div
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  1.2K
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
              </motion.div>
              <motion.div
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  850
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
              </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex space-x-8">
                <motion.button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'uploads'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('uploads')}
                  aria-label="View your uploads"
                  variants={tabVariants}
                >
                  Your Uploads
                </motion.button>
                <motion.button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'liked'
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('liked')}
                  aria-label="View liked memes"
                  variants={tabVariants}
                >
                  Liked Memes
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'uploads' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Uploads
            </h2>

            {uploadedMemes.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  You haven't uploaded any memes yet.
                </p>
                <Link
                  to="/upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Upload your first meme"
                >
                  Upload Your First Meme
                </Link>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {uploadedMemes.map((meme) => (
                  <motion.div key={meme.id} variants={itemVariants}>
                    <MemeCard meme={meme} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}

        {activeTab === 'liked' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Memes You've Liked
            </h2>

            {likedMemes.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  You haven't liked any memes yet.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Explore memes"
                >
                  Explore Memes
                </Link>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {likedMemes.map((meme) => (
                  <motion.div key={meme.id} variants={itemVariants}>
                    <MemeCard meme={meme} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;