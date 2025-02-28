import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Award, Crown, Star, Zap, Flame, TrendingUp, Users } from 'lucide-react';
import { fetchTrendingMemes } from '../store/slices/memesSlice';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const { trending, status, error, likes, comments } = useSelector((state) => state.memes);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTrendingMemes());
  }, [dispatch, status]);

  const topMemes = useMemo(() => {
    return trending
      .map((meme) => ({
        ...meme,
        likeCount: likes[meme.id] || 0,
        commentCount: comments[meme.id]?.length || 0,
        totalEngagement: (likes[meme.id] || 0) + (comments[meme.id]?.length || 0),
      }))
      .sort((a, b) => b.totalEngagement - a.totalEngagement)
      .slice(0, 10);
  }, [trending, likes, comments]);

  const topUsers = useMemo(() => [
    { id: 1, name: 'Alice', profilePic: '/avatars/alice.png', points: 1200 },
    { id: 2, name: 'Bob', profilePic: '/avatars/bob.png', points: 950 },
    { id: 3, name: 'Charlie', profilePic: '/avatars/charlie.png', points: 870 },
  ], []);

  const [activeTab, setActiveTab] = useState('memes');

  const getLeaderIcon = (index) => {
    switch (index) {
      case 0:
        return <Crown className="h-6 w-6 text-yellow-400" aria-label="First place" />;
      case 1:
        return <Star className="h-6 w-6 text-gray-400" aria-label="Second place" />;
      case 2:
        return <Zap className="h-6 w-6 text-amber-500" aria-label="Third place" />;
      default:
        return <Flame className="h-6 w-6 text-red-500" aria-label={`Position ${index + 1}`} />;
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover the top memes and users in the MemeVerse community
          </p>
        </div>

        
        {status === 'failed' && (
          <div className="text-center text-red-500">
            <p>Failed to load memes: {error}</p>
            <button
              onClick={() => dispatch(fetchTrendingMemes())}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        )}

       
        {status === 'loading' && (
          <div className="text-center text-gray-500">
            <p>Loading...</p>
          </div>
        )}

       
        {status === 'succeeded' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-center">
                {['memes', 'users'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-8 py-4 text-sm font-medium flex items-center ${
                      activeTab === tab
                        ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab)}
                    aria-label={`View top ${tab}`}
                  >
                    {tab === 'memes' ? (
                      <>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Top Memes
                      </>
                    ) : (
                      <>
                        <Users className="h-5 w-5 mr-2" />
                        Top Users
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

           
            <div className="p-8">
              {activeTab === 'memes' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {topMemes.length === 0 ? (
                    <p className="text-center text-gray-500">No trending memes found.</p>
                  ) : (
                    topMemes.map((meme, index) => (
                      <motion.div
                        key={meme.id}
                        variants={itemVariants}
                        className="flex items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-center w-12 h-12 mr-6">
                          {getLeaderIcon(index)}
                        </div>

                        <div className="flex-shrink-0 mr-6">
                          <img
                            src={meme.url}
                            alt={meme.name || 'Meme'}
                            className="h-20 w-20 object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-grow">
                          <Link
                            to={`/meme/${meme.id}`}
                            className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            {meme.name}
                          </Link>
                        </div>

                        <div className="flex space-x-8 text-sm">
                          <div className="text-gray-500 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-white">{meme.likeCount}</span> likes
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-white">{meme.commentCount}</span> comments
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {topUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      variants={itemVariants}
                      className="flex items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-center w-12 h-12 mr-6">
                        {getLeaderIcon(index)}
                      </div>

                      <div className="flex-shrink-0 mr-6">
                        <img
                          src={user.profilePic}
                          alt={user.name || 'User'}
                          className="h-16 w-16 object-cover rounded-full"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                      </div>

                      <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        {user.points} pts
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;
