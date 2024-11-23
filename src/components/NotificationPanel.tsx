import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  message: string;
  image: string;
  time: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Arrival",
    message: "Stranger Things Season 5 is now available",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=100&h=100&fit=crop",
    time: "2h ago"
  },
  {
    id: 2,
    title: "Continue Watching",
    message: "Continue watching The Witcher where you left off",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&h=100&fit=crop",
    time: "5h ago"
  }
];

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full right-0 mt-2 w-80 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 p-2 hover:bg-zinc-800 rounded-lg transition cursor-pointer"
                >
                  <img
                    src={notification.image}
                    alt={notification.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <p className="text-sm text-gray-400">{notification.message}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}