import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { movies } from '../data/movies';

const series = movies.filter(movie => movie.episodes);
const films = movies.filter(movie => !movie.episodes);
const trending = [...movies].sort(() => Math.random() - 0.5).slice(0, 5);
const newReleases = [...movies].sort(() => Math.random() - 0.5).slice(0, 5);

export default function Browse() {
  return (
    <div className="relative min-h-screen bg-zinc-900">
      <Navbar />
      <Hero />
      <div className="relative pb-24 space-y-8">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="New Releases" movies={newReleases} />
        <MovieRow title="TV Shows" movies={series} />
        <MovieRow title="Movies" movies={films} />
      </div>
    </div>
  );
}