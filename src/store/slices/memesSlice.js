import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch trending memes (IDs 0-10)
export const fetchTrendingMemes = createAsyncThunk(
  'memes/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      return response.data.data.memes.slice(0, 10);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch new memes (IDs 10-20)
export const fetchNewMemes = createAsyncThunk(
  'memes/fetchNew',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      return response.data.data.memes.slice(10, 20);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch memes by category
export const fetchMemesByCategory = createAsyncThunk(
  'memes/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      const allMemes = response.data.data.memes;
      switch (category) {
        case 'trending':
          return allMemes.slice(0, 10);
        case 'new':
          return allMemes.slice(10, 20);
        case 'classic':
          return allMemes.slice(20, 30);
        case 'random':
          return allMemes.sort(() => 0.5 - Math.random()).slice(0, 10);
        default:
          return allMemes.slice(0, 10);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Search memes
export const searchMemes = createAsyncThunk(
  'memes/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      const allMemes = response.data.data.memes;
      return allMemes.filter((meme) =>
        meme.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Load localStorage data
const loadLikes = () => {
  try {
    return JSON.parse(localStorage.getItem('meme_likes')) || {};
  } catch (error) {
    console.error('Error loading likes from localStorage:', error);
    return {};
  }
};

const loadComments = () => {
  try {
    return JSON.parse(localStorage.getItem('meme_comments')) || {};
  } catch (error) {
    console.error('Error loading comments from localStorage:', error);
    return {};
  }
};

const loadUploadedMemes = () => {
  try {
    return JSON.parse(localStorage.getItem('uploaded_memes')) || [];
  } catch (error) {
    console.error('Error loading uploaded memes from localStorage:', error);
    return [];
  }
};

const initialState = {
  trending: [],
  newMemes: [],
  explore: [],
  searchResults: [],
  uploadedMemes: loadUploadedMemes(),
  likes: loadLikes(),
  comments: loadComments(),
  status: 'idle',
  error: null,
  currentCategory: 'trending',
};

const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    likeMeme: (state, action) => {
      const { memeId } = action.payload;
      state.likes[memeId] = (state.likes[memeId] || 0) + 1;
      try {
        localStorage.setItem('meme_likes', JSON.stringify(state.likes));
      } catch (error) {
        console.error('Error saving likes to localStorage:', error);
      }
    },
    unlikeMeme: (state, action) => {
      const { memeId } = action.payload;
      if (state.likes[memeId] && state.likes[memeId] > 0) {
        state.likes[memeId] -= 1;
        try {
          localStorage.setItem('meme_likes', JSON.stringify(state.likes));
        } catch (error) {
          console.error('Error saving likes to localStorage:', error);
        }
      }
    },
    addComment: (state, action) => {
      const { memeId, comment } = action.payload;
      if (!state.comments[memeId]) state.comments[memeId] = [];
      state.comments[memeId].push(comment);
      try {
        localStorage.setItem('meme_comments', JSON.stringify(state.comments));
      } catch (error) {
        console.error('Error saving comments to localStorage:', error);
      }
    },
    addUploadedMeme: (state, action) => {
      state.uploadedMemes.push(action.payload);
      try {
        localStorage.setItem('uploaded_memes', JSON.stringify(state.uploadedMemes));
      } catch (error) {
        console.error('Error saving uploaded memes to localStorage:', error);
      }
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
    resetStatus: (state) => {
      state.status = 'idle'; // Reset the status to 'idle'
      state.error = null;   // Clear any errors
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trending memes
      .addCase(fetchTrendingMemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingMemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trending = action.payload;
      })
      .addCase(fetchTrendingMemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch new memes
      .addCase(fetchNewMemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewMemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newMemes = action.payload;
      })
      .addCase(fetchNewMemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch memes by category
      .addCase(fetchMemesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMemesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.explore = action.payload;
      })
      .addCase(fetchMemesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Search memes
      .addCase(searchMemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchMemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  likeMeme,
  unlikeMeme,
  addComment,
  addUploadedMeme,
  setCurrentCategory,
  resetSearchResults,
  resetStatus,
} = memesSlice.actions;

export default memesSlice.reducer;
