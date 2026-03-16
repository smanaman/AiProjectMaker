import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
          Toy Shop
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 dark:text-darkText hover:text-primary dark:hover:text-primary transition-colors duration-200">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-darkText hover:text-primary dark:hover:text-primary transition-colors duration-200">
            About
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 dark:text-darkText hover:text-primary dark:hover:text-primary transition-colors duration-200">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <> 
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-secondary">
                Register
              </Link>
            </>
          )}
          <button 
            onClick={toggleTheme} 
            className="text-gray-700 dark:text-darkText text-xl focus:outline-none transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile menu button - omitted for brevity, but would typically be here */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="text-gray-700 dark:text-darkText text-xl focus:outline-none transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {/* A hamburger icon for mobile navigation would go here */}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
