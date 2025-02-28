import { configureStore } from '@reduxjs/toolkit';
import memesReducer from './slices/memesSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    memes: memesReducer, 
    user: userReducer,   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      
      serializableCheck: false,
    }),
  
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
