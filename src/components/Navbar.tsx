import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClickOutside = () => {
    setShowProfile(false);
    setShowNotifications(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-zinc-900/95' : 'bg-transparent'
      }`}
    >
      <div className="px-4 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-5 md:h-7 cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-sm text-white hover:text-gray-300 transition">Home</a>
            <a href="#" className="text-sm text-white hover:text-gray-300 transition">TV Shows</a>
            <a href="#" className="text-sm text-white hover:text-gray-300 transition">Movies</a>
            <a href="#" className="text-sm text-white hover:text-gray-300 transition">New & Popular</a>
            <a href="#" className="text-sm text-white hover:text-gray-300 transition">My List</a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSearch(!showSearch);
              }}
              className="hover:text-gray-300 transition"
            >
              <Search className="w-6 h-6" />
            </button>
            <SearchBar isOpen={showSearch} onClose={() => setShowSearch(false)} />
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
              }}
              className="hover:text-gray-300 transition"
            >
              <Bell className="w-6 h-6" />
            </button>
            <NotificationPanel
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProfile(!showProfile);
              }}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <img
                src={user?.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded"
              />
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showProfile ? 'rotate-180' : ''
                }`}
              />
            </button>
            <ProfileMenu
              isOpen={showProfile}
              onClose={() => setShowProfile(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}