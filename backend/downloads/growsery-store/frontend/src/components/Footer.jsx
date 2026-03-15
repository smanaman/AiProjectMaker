import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`p-4 text-center ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} shadow-inner`}>
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Growsery Store. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-green-500 transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-green-500 transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
