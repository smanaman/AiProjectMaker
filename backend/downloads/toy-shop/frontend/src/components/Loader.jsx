import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-white"></div>
      <p className="ml-4 text-gray-700 dark:text-darkText text-lg">Loading...</p>
    </div>
  );
};

export default Loader;
