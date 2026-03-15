import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={`text-center text-red-500 font-bold mt-8 ${theme === 'dark' ? 'text-red-400' : ''}`}>{error}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative h-96 flex items-center justify-center text-white text-center rounded-lg shadow-lg mb-8 overflow-hidden
                          ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-900' : 'bg-gradient-to-r from-green-500 to-green-700'}`}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Growsery Store</h1>
          <p className="text-xl">Your one-stop shop for fresh produce and more!</p>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search for products..."
              className={`w-full max-w-md p-3 rounded-full border-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <h2 className={`text-3xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Our Products</h2>
        {filteredProducts.length === 0 ? (
          <p className={`text-center text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No products found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
