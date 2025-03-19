import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { addComment } from '../../store/slices/memesSlice';
import { MessageCircle, Send, ThumbsUp, Smile } from 'lucide-react';

const CommentSection = ({ memeId }) => {
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.memes.comments[memeId] || []);
  const userProfile = useSelector((state) => state.user.profile);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && userProfile) {
      const comment = {
        id: Date.now().toString(),
        text: newComment,
        author: userProfile.name,
        authorPic: userProfile.profilePic,
        date: new Date().toISOString(),
        likes: 0,
      };
      dispatch(addComment({ memeId, comment }));
      setNewComment('');
    }
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

  return (
    <div className="mt-8">
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-purple-500" />
          Comments ({comments.length})
        </h3>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
        >
          {isExpanded ? 'Hide All' : 'Show All'}
        </button>
      </motion.div>

      {/* Comment Form */}
      <motion.form 
        onSubmit={handleSubmitComment} 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start space-x-4">
          {userProfile && (
            <motion.img
              src={userProfile.profilePic}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800"
              whileHover={{ scale: 1.1, rotate: 5 }}
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="relative">
              <div className="border border-purple-200 dark:border-purple-800 rounded-lg shadow-sm overflow-hidden focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 bg-white dark:bg-gray-800">
                <textarea
                  rows="3"
                  name="comment"
                  id="comment"
                  className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  aria-label="Add a comment"
                  aria-describedby="comment-description"
                ></textarea>
                <div className="absolute bottom-2 right-2">
                  <button
                    type="button"
                    className="p-1.5 rounded-full text-gray-500 hover:text-yellow-500"
                    aria-label="Add emoji"
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <motion.button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  aria-label="Post comment"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.form>

      {/* Comments List */}
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {comments.length > 0 ? (
            (isExpanded ? comments : comments.slice(0, 3)).map((comment) => (
              <motion.div
                key={comment.id}
                variants={itemVariants}
                layout
                className="flex space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-purple-100 dark:border-purple-900/30"
              >
                <div className="flex-shrink-0">
                  <motion.img
                    className="h-10 w-10 rounded-full border-2 border-purple-200 dark:border-purple-800"
                    src={comment.authorPic}
                    alt={comment.author}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {comment.author}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(comment.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>{comment.text}</p>
                  </div>
                  <div className="mt-2 flex items-center space-x-4">
                    <motion.button 
                      className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      {comment.likes || 0}
                    </motion.button>
                    <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                      Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-purple-100 dark:border-purple-900/30"
              variants={itemVariants}
            >
              <Smile className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No comments yet. Be the first to comment!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isExpanded && comments.length > 3 && (
          <motion.button
            className="w-full py-3 text-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
            onClick={() => setIsExpanded(true)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Show {comments.length - 3} more comments
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default CommentSection;
