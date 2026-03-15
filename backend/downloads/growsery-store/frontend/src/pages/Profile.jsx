import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Get user from AuthContext
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/auth/profile');
        setProfileData(response.data);
      } catch (err) {
        setError('Failed to fetch profile data. Please try again.');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      setLoading(false); // If no user is logged in (though ProtectedRoute should prevent this)
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={`text-center text-red-500 font-bold mt-8 ${theme === 'dark' ? 'text-red-400' : ''}`}>{error}</div>;
  }

  if (!profileData) {
    return <div className={`text-center text-lg mt-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No profile data found.</div>;
  }

  const cardBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const highlightColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';

  return (
    <div className={`min-h-[calc(100vh-160px)] flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`${cardBgClass} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className={`text-3xl font-bold text-center mb-6 ${textColor}`}>My Profile</h2>
        <div className="space-y-4">
          <div>
            <p className={`text-sm font-medium ${textColor}`}>Name:</p>
            <p className={`text-lg ${highlightColor}`}>{profileData.name}</p>
          </div>
          <div>
            <p className={`text-sm font-medium ${textColor}`}>Email:</p>
            <p className={`text-lg ${highlightColor}`}>{profileData.email}</p>
          </div>
          <div>
            <p className={`text-sm font-medium ${textColor}`}>Role:</p>
            <p className={`text-lg ${highlightColor}`}>{profileData.isAdmin ? 'Administrator' : 'Customer'}</p>
          </div>
          {/* Add more profile details like orders, addresses etc. */}
          <h3 className={`text-xl font-semibold mt-6 mb-3 ${textColor}`}>Recent Orders (Placeholder)</h3>
          <ul className="list-disc list-inside space-y-2">
            <li className={`${textColor}`}>Order #12345 - $45.99 (Delivered)</li>
            <li className={`${textColor}`}>Order #12346 - $22.50 (Processing)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
