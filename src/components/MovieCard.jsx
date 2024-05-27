import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/moviesSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state =>
    state.movies.favoriteMovies.some(fav => fav.id === movie.id)
  );

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 m-4 max-w-xs text-center">
      {movie.image ? (
        <img src={movie.image} alt={movie.movie} className="w-full h-64 object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-64 bg-gray-200 text-gray-500">
          No Image Available
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{movie.movie}</h2>
        <p className="text-gray-600">Rating: {movie.rating}</p>
        <button
          onClick={handleFavoriteClick}
          className={`mt-4 px-4 py-2 rounded ${
            isFavorite ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
          } text-white`}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
        <a
          href={movie.imdb_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-500 hover:underline"
        >
          View on IMDb
        </a>
      </div>
    </div>
  );
};

export default MovieCard;


