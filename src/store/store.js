import { configureStore } from '@reduxjs/toolkit';
import memesReducer from './slices/memesSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    memes: memesReducer, // Handles all meme-related state
    user: userReducer,   // Handles user profile and preferences
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for non-serializable values (e.g., functions, Promises)
      serializableCheck: false,
    }),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
