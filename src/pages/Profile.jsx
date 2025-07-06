import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Edit, Camera } from 'lucide-react';
import { mockUser } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    avatar: mockUser.avatar,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 py-10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-4">
        <Helmet>
          <title>Profile - LearnHub</title>
          <meta name="description" content="View and edit your profile information on LearnHub." />
        </Helmet>
        {/* Sidebar Card */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <div className="relative w-28 h-28 mx-auto mb-4">
            <img
              src={profileData.avatar}
              alt="avatar"
              className="rounded-full w-full h-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-1 rounded-full hover:bg-primary-700 transition">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="text-lg font-semibold">{profileData.name}</h2>
          <p className="text-gray-500 text-sm">{profileData.email}</p>
          <div className="mt-4">
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="md:col-span-3 bg-white shadow-md rounded-xl p-6">
          {/* Tabs */}
          <div className="flex space-x-4 border-b mb-6 pb-2">
            <button
              onClick={() => setTab('info')}
              className={`pb-2 px-2 font-medium ${
                tab === 'info'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setTab('password')}
              className={`pb-2 px-2 font-medium ${
                tab === 'password'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              Change Password
            </button>
          </div>

          {/* Tab Content */}
          {tab === 'info' ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">Edit Information</h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center text-primary-600 text-sm hover:underline"
                >
                  <Edit size={16} className="mr-1" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                      isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                      isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'
                    }`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Save size={16} />
                    Save
                  </button>
                </div>
              )}
            </form>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Update Your Password</h3>

              <div>
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Current password"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    placeholder="New password"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save size={16} />
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
