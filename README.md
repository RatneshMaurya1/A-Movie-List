Movie List Application
This is a responsive React application for displaying a list of movies fetched from an API, with functionality to mark movies as favorites.

Features
1. Fetch and display movies from the API.
2. Sort movies by rating from highest to lowest.
3. Store movies and favorite movies data in Redux.
4. Favorite/unfavorite movies and display them on a separate page.
5. Responsive design for desktop, tablet, and mobile devices.
   
Prerequisites
. Node.js (version 14 or higher)
. npm (version 6 or higher) or yarn

Setup Instructions
1. Clone the Repository
. git clone https://github.com/yourusername/movielist-app.git
. cd movielist-app

3. Install Dependencies
. npm install

3. Configure Environment Variables
Create a .env file in the root of the project and add the API URL:
. VITE_API_URL=https://API_URL/

5. Start the Development Server
. npm run dev

5. Build for Production
. npm run build

Project Structure

src/
├── assets/             # Images and other assets
├── components/         # React components
│   ├── MovieCard.jsx
│   └── MoviesList.jsx
├── pages/              # Page components
│   ├── MovieListPage.jsx
│   └── FavoritesPage.jsx
├── redux/              # Redux setup
│   ├── store.js
│   └── moviesSlice.js
├── App.jsx             # Main app component
├── index.jsx           # Entry point
└── styles/             # Tailwind CSS and other styles
    └── index.css
    
Tailwind CSS Configuration
Ensure Tailwind CSS is correctly set up:

Install Tailwind CSS
. npm install tailwindcss

Create Tailwind Configuration:
. npx tailwindcss init

Configure Tailwind
Update tailwind.config.js to include paths to all template files

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


Include Tailwind in CSS
In src/styles/index.css, include:

@tailwind base;
@tailwind components;
@tailwind utilities;


Redux Setup
Store Configuration (redux/store.js):

import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
Movies Slice (redux/moviesSlice.js):

js
Copy code
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(API_URL);
  return response.data;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;

License
This project is licensed under the MIT License.
