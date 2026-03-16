import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) { // Ensure user is authenticated before fetching profile
        setLoading(false);
        return;
      }
      try {
        const response = await API.get('/auth/profile');
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user profile.');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold text-xl my-8">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center text-gray-600 dark:text-gray-400 text-xl my-8">No profile data found. Please log in again.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-white mb-6">User Dashboard</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-darkText"><span className="font-semibold">Name:</span> {profile.name}</p>
          <p className="text-lg text-gray-700 dark:text-darkText"><span className="font-semibold">Email:</span> {profile.email}</p>
          <p className="text-lg text-gray-700 dark:text-darkText"><span className="font-semibold">Role:</span> {profile.isAdmin ? 'Admin' : 'User'}</p>
          
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h3 className="text-2xl font-bold mb-3 text-secondary dark:text-blue-400">Your Protected Content</h3>
            <p className="text-gray-700 dark:text-darkText">This section is only visible to authenticated users.</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">You can manage your orders, settings, and more here.</p>
          </div>

          <button className="btn-primary mt-6">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
