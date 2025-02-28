import { createSlice } from '@reduxjs/toolkit';


const DEFAULT_PROFILE = {
  name: 'Meme Lover',
  bio: 'Just someone who loves memes!',
  profilePic: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  likedMemes: [],
};


const loadUserProfile = () => {
  try {
    const profile = localStorage.getItem('user_profile');
    return profile ? JSON.parse(profile) : DEFAULT_PROFILE;
  } catch (error) {
    console.error('Error loading user profile from localStorage:', error);
    return DEFAULT_PROFILE;
  }
};

const initialState = {
  profile: loadUserProfile(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      try {
        localStorage.setItem('user_profile', JSON.stringify(state.profile));
      } catch (error) {
        console.error('Error saving user profile to localStorage:', error);
      }
    },
    addLikedMeme: (state, action) => {
      const memeId = action.payload;
      if (!state.profile.likedMemes.includes(memeId)) {
        state.profile.likedMemes.push(memeId);
        try {
          localStorage.setItem('user_profile', JSON.stringify(state.profile));
        } catch (error) {
          console.error('Error saving user profile to localStorage:', error);
        }
      }
    },
    removeLikedMeme: (state, action) => {
      const memeId = action.payload;
      state.profile.likedMemes = state.profile.likedMemes.filter((id) => id !== memeId);
      try {
        localStorage.setItem('user_profile', JSON.stringify(state.profile));
      } catch (error) {
        console.error('Error saving user profile to localStorage:', error);
      }
    },
  },
});

export const { updateProfile, addLikedMeme, removeLikedMeme } = userSlice.actions;

export default userSlice.reducer;
