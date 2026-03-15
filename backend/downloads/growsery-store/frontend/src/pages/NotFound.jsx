import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`min-h-[calc(100vh-160px)] flex items-center justify-center ${bgColor}`}>
      <div className="text-center p-8">
        <h1 className={`text-9xl font-extrabold ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>404</h1>
        <h2 className={`text-4xl font-bold mb-4 ${textColor}`}>Page Not Found</h2>
        <p className={`text-lg mb-8 ${textColor}`}>Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
