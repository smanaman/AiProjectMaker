import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  // Placeholder for cart items
  const cartItems = [
    { id: 1, name: 'Organic Apples', price: 2.99, quantity: 2, image: 'https://via.placeholder.com/100x100?text=Apples' },
    { id: 2, name: 'Fresh Spinach', price: 3.49, quantity: 1, image: 'https://via.placeholder.com/100x100?text=Spinach' },
    { id: 3, name: 'Whole Wheat Bread', price: 4.25, quantity: 1, image: 'https://via.placeholder.com/100x100?text=Bread' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`min-h-[calc(100vh-160px)] flex flex-col items-center py-12 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-lg w-full max-w-3xl`}>
        <h2 className={`text-4xl font-bold text-center mb-8 ${textColor}`}>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className={`text-center text-lg ${textColor}`}>Your cart is empty. <Link to="/" className="text-green-500 hover:text-green-600">Start shopping!</Link></p>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className={`flex items-center space-x-4 p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-grow">
                  <h3 className={`text-lg font-semibold ${textColor}`}>{item.name}</h3>
                  <p className={`text-sm ${textColor}`}>Quantity: {item.quantity}</p>
                  <p className={`text-md font-bold ${textColor}`}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="text-red-500 hover:text-red-700 font-medium">
                  Remove
                </button>
              </div>
            ))}

            <div className={`mt-8 pt-4 border-t-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <p className={`text-xl font-semibold ${textColor}`}>Subtotal:</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>${subtotal.toFixed(2)}</p>
              </div>
              <Link
                to="/checkout"
                className="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
