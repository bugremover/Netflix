import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg"
        >
          <div className="py-2">
            <button 
              onClick={handleProfile}
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-zinc-800"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </button>
            <button className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-zinc-800">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <hr className="my-1 border-zinc-700" />
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}