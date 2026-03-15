import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Checkout = () => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const inputClasses = `w-full p-3 border rounded-md focus:ring-green-500 focus:border-green-500 transition-colors duration-200
                        ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'}`;

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Checkout functionality is a placeholder. Order placed!');
    // In a real app, you would send this data to the backend.
  };

  const totalAmount = 78.50; // Placeholder total

  return (
    <div className={`min-h-[calc(100vh-160px)] flex flex-col items-center py-12 ${bgColor}`}>
      <div className={`${cardBg} p-8 rounded-lg shadow-lg w-full max-w-4xl`}>
        <h2 className={`text-4xl font-bold text-center mb-8 ${textColor}`}>Checkout</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-2xl font-semibold mb-5 ${textColor}`}>Shipping Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className={`block text-sm font-medium mb-2 ${textColor}`}>Full Name</label>
                <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="address" className={`block text-sm font-medium mb-2 ${textColor}`}>Address</label>
                <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleShippingChange} className={inputClasses} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className={`block text-sm font-medium mb-2 ${textColor}`}>City</label>
                  <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} className={inputClasses} required />
                </div>
                <div>
                  <label htmlFor="zip" className={`block text-sm font-medium mb-2 ${textColor}`}>Zip Code</label>
                  <input type="text" id="zip" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} className={inputClasses} required />
                </div>
              </div>
              <div>
                <label htmlFor="country" className={`block text-sm font-medium mb-2 ${textColor}`}>Country</label>
                <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleShippingChange} className={inputClasses} required />
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-2xl font-semibold mb-5 ${textColor}`}>Payment Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className={`block text-sm font-medium mb-2 ${textColor}`}>Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} className={inputClasses} placeholder="XXXX XXXX XXXX XXXX" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className={`block text-sm font-medium mb-2 ${textColor}`}>Expiry Date</label>
                  <input type="text" id="expiryDate" name="expiryDate" value={paymentInfo.expiryDate} onChange={handlePaymentChange} className={inputClasses} placeholder="MM/YY" required />
                </div>
                <div>
                  <label htmlFor="cvv" className={`block text-sm font-medium mb-2 ${textColor}`}>CVV</label>
                  <input type="text" id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} className={inputClasses} placeholder="123" required />
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <p className={`text-xl font-semibold ${textColor}`}>Total:</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>${totalAmount.toFixed(2)}</p>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
