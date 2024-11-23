import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types';
import MovieModal from './MovieModal';
import VideoPlayer from './VideoPlayer';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <motion.div
        className="relative h-28 min-w-[180px] md:h-40 md:min-w-[260px] cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <img
          src={movie.image}
          alt={movie.title}
          className="rounded-sm object-cover md:rounded w-full h-full"
        />
        
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-black/70 rounded flex flex-col justify-end p-4"
          >
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <div className="flex space-x-2">
              <button 
                className="p-2 bg-white rounded-full hover:bg-gray-200 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideo(true);
                }}
              >
                <Play className="w-4 h-4 text-black" />
              </button>
              <button 
                className="p-2 bg-zinc-700/80 rounded-full hover:bg-zinc-600/80 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      <MovieModal
        movie={movie}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPlay={() => {
          setShowModal(false);
          setShowVideo(true);
        }}
      />

      <VideoPlayer
        url={movie.videoUrl}
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
      />
    </>
  );
}