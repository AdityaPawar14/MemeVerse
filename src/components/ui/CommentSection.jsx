import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { addComment } from '../../store/slices/memesSlice';

const CommentSection = ({ memeId }) => {
  const [newComment, setNewComment] = useState('');
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
      };
      dispatch(addComment({ memeId, comment }));
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Comments ({comments.length})
      </h3>

   
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex items-start space-x-4">
          {userProfile && (
            <img
              src={userProfile.profilePic}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
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
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Post comment"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex space-x-4"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={comment.authorPic}
                  alt={comment.author}
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
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
