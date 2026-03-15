import React from 'react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`min-h-[calc(100vh-160px)] flex items-center justify-center py-12 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-lg w-full max-w-3xl`}>
        <h2 className={`text-4xl font-bold text-center mb-8 ${textColor}`}>About Growsery Store</h2>
        <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''} ${textColor}`}>
          <p className="text-lg mb-4">
            Welcome to Growsery Store, your ultimate destination for fresh, high-quality groceries delivered right to your doorstep. We are passionate about bringing the best produce, pantry staples, and specialty items from local farms and trusted suppliers directly to your kitchen.
          </p>
          <h3 className="text-2xl font-semibold mb-3 mt-6">Our Mission</h3>
          <p className="mb-4">
            Our mission is to simplify grocery shopping while providing unparalleled quality and convenience. We believe everyone deserves access to fresh, healthy food without compromising on time or budget. By connecting you with the finest products, we aim to foster healthier communities and support sustainable practices.
          </p>
          <h3 className="text-2xl font-semibold mb-3 mt-6">What We Offer</h3>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>**Fresh Produce:** A wide selection of seasonal fruits and vegetables.</li>
            <li>**Pantry Essentials:** Grains, spices, oils, and more to stock your kitchen.</li>
            <li>**Dairy & Eggs:** Fresh and organic options from reliable sources.</li>
            <li>**Baked Goods:** Artisanal breads and pastries.</li>
            <li>**Specialty Items:** Unique and hard-to-find ingredients to elevate your cooking.</li>
          </ul>
          <h3 className="text-2xl font-semibold mb-3 mt-6">Our Commitment</h3>
          <p>
            At Growsery Store, quality and customer satisfaction are our top priorities. We meticulously select every product, ensuring freshness and adherence to the highest standards. Our dedicated team is committed to providing an exceptional shopping experience, from browsing to delivery. Join us in our journey to make healthy eating easy and accessible for everyone!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
