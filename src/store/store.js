import { configureStore } from '@reduxjs/toolkit';
import memesReducer from './slices/memesSlice';
import userReducer from './slices/userSlice';

// Create the Redux store
export const store = configureStore({
  reducer: {
    memes: memesReducer,
    user: userReducer,
  },
});