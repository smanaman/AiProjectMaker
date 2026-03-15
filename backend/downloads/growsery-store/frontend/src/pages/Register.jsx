import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { register } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await register(name, email, password);
      setMessage({ type: 'success', text: response.message || 'Registration successful! Please login.' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full p-3 border rounded-md focus:ring-green-500 focus:border-green-500 transition-colors duration-200
                        ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'}`;
  const formBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`flex items-center justify-center min-h-[calc(100vh-160px)] ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {loading && <Loader />}
      <div className={`${formBgClass} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className={`text-3xl font-bold text-center mb-6 ${textColor}`}>Register</h2>
        {message && (
          <div className={`px-4 py-3 rounded relative mb-4 ${message.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`} role="alert">
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className={`block text-sm font-medium mb-2 ${textColor}`}>Name</label>
            <input
              type="text"
              id="name"
              className={inputClasses}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${textColor}`}>Email</label>
            <input
              type="email"
              id="email"
              className={inputClasses}
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${textColor}`}>Password</label>
            <input
              type="password"
              id="password"
              className={inputClasses}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${textColor}`}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className={inputClasses}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className={`text-center mt-6 text-sm ${textColor}`}>
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:text-green-600 font-medium transition-colors duration-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
