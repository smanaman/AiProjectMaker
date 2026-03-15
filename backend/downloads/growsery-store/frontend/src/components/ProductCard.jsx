import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ProductCard = ({ product }) => {
  const { theme } = useTheme();
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const priceColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${cardBg} transition-all duration-300 hover:shadow-lg`}>
      <img src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Product+Image'} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>{product.name}</h3>
        <p className={`text-sm ${textColor} mb-3 line-clamp-2`}>{product.description}</p>
        <div className="flex justify-between items-center">
          <span className={`text-lg font-bold ${priceColor}`}>${product.price.toFixed(2)}</span>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
