import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl transition-colors duration-300 text-center">
        <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">About Toy Shop</h2>
        <p className="text-lg text-gray-700 dark:text-darkText leading-relaxed mb-4">
          Welcome to Toy Shop, your ultimate destination for high-quality, fun, and educational toys for children of all ages! 
          We are passionate about bringing joy and fostering creativity through play. 
        </p>
        <p className="text-lg text-gray-700 dark:text-darkText leading-relaxed mb-4">
          Our mission is to provide a safe, engaging, and imaginative play experience for every child. 
          We carefully select toys that not only entertain but also help in the development of cognitive, motor, and social skills.
        </p>
        <p className="text-lg text-gray-700 dark:text-darkText leading-relaxed mb-6">
          From classic board games to modern STEM kits, cuddly plush toys to adventurous action figures, 
          our diverse collection ensures there's something special for everyone. We believe that every toy holds the potential for a new adventure.
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-secondary dark:text-blue-400 mb-3">Our Values</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-darkText space-y-2 max-w-md mx-auto">
            <li>Quality: We offer durable and safe toys.</li>
            <li>Creativity: We encourage imaginative play.</li>
            <li>Learning: Toys that educate and inspire.</li>
            <li>Customer Satisfaction: Your happiness is our priority.</li>
          </ul>
        </div>
        <p className="mt-8 text-lg text-gray-700 dark:text-darkText leading-relaxed">
          Thank you for choosing Toy Shop. Let's play!
        </p>
      </div>
    </div>
  );
};

export default About;
