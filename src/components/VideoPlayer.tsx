import React from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ url, isOpen, onClose }: VideoPlayerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 bg-zinc-900/80 rounded-full hover:bg-zinc-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              playing
              controls
              config={{
                youtube: {
                  playerVars: { showinfo: 1 }
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}