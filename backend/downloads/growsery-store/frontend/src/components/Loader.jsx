import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Loader = () => {
  const { theme } = useTheme();
  const spinnerColor = theme === 'dark' ? 'border-green-400' : 'border-green-600';
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${bgColor} bg-opacity-75 z-50`}>
      <div
        className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${spinnerColor}`}
      ></div>
    </div>
  );
};

export default Loader;
