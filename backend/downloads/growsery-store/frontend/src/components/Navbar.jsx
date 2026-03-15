import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`p-4 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-gray-50' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-500 hover:text-green-600 transition-colors duration-300">
          Growsery Store
        </Link>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-green-500 transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-500 transition-colors duration-300">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-500 transition-colors duration-300">Contact</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-green-500 transition-colors duration-300">Cart</Link>
            </li>
            {user && (
              <li>
                <Link to="/profile" className="hover:text-green-500 transition-colors duration-300">Profile</Link>
              </li>
            )}
          </ul>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 4a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707A1 1 0 0114 4zm-4 7a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-4a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414L4.586 7A1 1 0 014 6zm.07-2.07a8 8 0 0111.314 0l.07.07a1 1 0 001.414-1.414l-.07-.07a10 10 0 00-14.142 0l-.07.07a1 1 0 001.414 1.414zM10 5a5 5 0 100 10 5 5 0 000-10zm0 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm4-4a1 1 0 010 1.414l.707.707a1 1 0 11-1.414 1.414l-.707-.707A1 1 0 0114 11zm-8 0a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414L6.586 12A1 1 0 016 11z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
