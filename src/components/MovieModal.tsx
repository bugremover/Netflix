import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';
import { Movie, Episode } from '../types';
import VideoPlayer from './VideoPlayer';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  onPlay: () => void;
  isOpen: boolean;
}

export default function MovieModal({ movie, onClose, onPlay, isOpen }: MovieModalProps) {
  const [selectedEpisode, setSelectedEpisode] = React.useState<Episode | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-zinc-900/80 rounded-full hover:bg-zinc-800 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-[400px]">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={onPlay}
                  className="flex items-center px-6 py-2 bg-white rounded hover:bg-gray-200 transition"
                >
                  <Play className="w-6 h-6 text-black" />
                  <span className="ml-2 font-semibold text-black">Play</span>
                </button>
                <button className="p-2 border-2 border-gray-400 rounded-full hover:border-white transition">
                  <Plus className="w-6 h-6" />
                </button>
                <button className="p-2 border-2 border-gray-400 rounded-full hover:border-white transition">
                  <ThumbsUp className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{movie.year}</span>
                    <span>{movie.rating}</span>
                    <span>{movie.duration}</span>
                  </div>
                  <p className="mt-4 text-lg">{movie.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Cast & Crew</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400">Cast: </span>
                      {movie.cast?.join(', ')}
                    </div>
                    <div>
                      <span className="text-gray-400">Director: </span>
                      {movie.crew?.director?.join(', ')}
                    </div>
                  </div>
                </div>

                {movie.episodes && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Episodes</h2>
                    <div className="space-y-4">
                      {movie.episodes.map((episode) => (
                        <div
                          key={episode.id}
                          className="flex gap-4 p-4 hover:bg-zinc-800 rounded-lg transition cursor-pointer"
                          onClick={() => setSelectedEpisode(episode)}
                        >
                          <img
                            src={episode.image}
                            alt={episode.title}
                            className="w-40 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {episode.seasonNumber}x{episode.episodeNumber} {episode.title}
                            </h3>
                            <p className="text-sm text-gray-400">{episode.duration}</p>
                            <p className="text-sm mt-1">{episode.description}</p>
                          </div>
                          <button 
                            className="self-center p-2 bg-white rounded-full hover:bg-gray-200 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEpisode(episode);
                            }}
                          >
                            <Play className="w-4 h-4 text-black" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedEpisode && (
        <VideoPlayer
          url={selectedEpisode.videoUrl}
          isOpen={!!selectedEpisode}
          onClose={() => setSelectedEpisode(null)}
        />
      )}
    </AnimatePresence>
  );
}