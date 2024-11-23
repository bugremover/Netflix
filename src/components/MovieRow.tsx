import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 md:space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white pl-4 md:pl-16">{title}</h2>
      
      <div className="group relative">
        <ChevronLeft
          className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 
          cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125
          bg-black/30 rounded-full p-2 text-white"
          onClick={() => scroll('left')}
        />
        
        <div 
          ref={rowRef}
          className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide
          pl-4 md:pl-16 pb-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        <ChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9
          cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125
          bg-black/30 rounded-full p-2 text-white"
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  );
}