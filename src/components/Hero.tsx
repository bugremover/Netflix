import React, { useState } from 'react';
import { Play, Info } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative h-screen">
      <div className="absolute w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=2070&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-transparent" />
      </div>

      <div className="relative pt-48 md:pt-80 px-4 md:px-16 space-y-6">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Stranger Things
          </h1>
          <p className="text-white text-lg mt-4">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
          </p>
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={() => setShowVideo(true)}
            className="flex items-center px-6 py-2.5 bg-white rounded hover:bg-gray-200 transition"
          >
            <Play className="w-6 h-6 text-black" />
            <span className="ml-2 font-semibold text-black">Play</span>
          </button>
          <button className="flex items-center px-6 py-2.5 bg-gray-500/70 rounded hover:bg-gray-500/50 transition">
            <Info className="w-6 h-6 text-white" />
            <span className="ml-2 font-semibold text-white">More Info</span>
          </button>
        </div>
      </div>

      <VideoPlayer
        url="https://www.youtube.com/watch?v=b9EkMc79ZSU"
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
      />
    </div>
  );
}