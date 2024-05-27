import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_MOVIES_API_URL;


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    allMovies: [],
    favoriteMovies: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const isFavorite = state.favoriteMovies.find(fav => fav.id === movie.id);
      if (isFavorite) {
        state.favoriteMovies = state.favoriteMovies.filter(fav => fav.id !== movie.id);
      } else {
        state.favoriteMovies.push(movie);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allMovies = action.payload.sort((a, b) => b.rating - a.rating);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { toggleFavorite } = moviesSlice.actions;

export default moviesSlice.reducer;


