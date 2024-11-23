import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { CreditCard, Gift, User, Settings } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Account</h1>

        <div className="space-y-8">
          {/* Membership & Billing */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <h2 className="text-2xl font-semibold">Membership & Billing</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Email</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Plan</span>
                <span>{user?.plan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Next billing date</span>
                <span>{user?.billingDate}</span>
              </div>
            </div>
          </div>

          {/* Profile & Parental Controls */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <User className="w-6 h-6 text-gray-400" />
              <h2 className="text-2xl font-semibold">Profile & Parental Controls</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <img
                src={user?.profileImage}
                alt={user?.name}
                className="w-16 h-16 rounded"
              />
              <div>
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-gray-400">All Maturity Ratings</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <Settings className="w-6 h-6 text-gray-400" />
              <h2 className="text-2xl font-semibold">Settings</h2>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left hover:text-red-500 transition">
                Change password
              </button>
              <button className="w-full text-left hover:text-red-500 transition">
                Communication preferences
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:text-red-600 transition"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}