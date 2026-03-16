import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold text-xl my-8">{error}</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary dark:from-gray-700 dark:to-gray-900 text-white py-20 px-4 rounded-lg shadow-lg mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 animate-fadeInUp">Welcome to Toy Shop!</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-fadeIn">Discover a world of joy with our amazing collection of toys.</p>
        <button className="btn-primary text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">Explore Toys</button>
      </section>

      {/* Latest Products Section (using Posts as example products) */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-darkText">Our Latest Toys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-primary dark:text-white">{post.title}</h3>
              <p className="text-gray-700 dark:text-darkText mb-4">{post.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">By: {post.author}</p>
              <button className="btn-primary mt-4 w-full">View Details</button>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg">
              No toys found. Check back later or add some from the dashboard!
            </div>
          )}
        </div>
      </section>

      {/* About Us Teaser */}
      <section className="text-center py-12 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-darkText">About Our Shop</h2>
        <p className="text-lg max-w-3xl mx-auto mb-6 text-gray-700 dark:text-darkText">
          We believe in the magic of play. Toy Shop offers a curated selection of high-quality toys that inspire imagination and learning.
        </p>
        <Link to="/about" className="btn-secondary text-lg px-6 py-2">Learn More</Link>
      </section>
    </div>
  );
};

export default Home;
