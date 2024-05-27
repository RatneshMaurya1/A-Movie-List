import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Movies</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
};

export default NavBar;

