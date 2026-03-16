import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white p-6 text-center mt-auto transition-colors duration-300">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Toy Shop. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors duration-200">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
