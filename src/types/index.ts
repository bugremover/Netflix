export interface Movie {
  id: number;
  title: string;
  image: string;
  description?: string;
  year?: number;
  rating?: string;
  duration?: string;
  genre?: string[];
  cast?: string[];
  crew?: {
    director?: string[];
    writers?: string[];
  };
  episodes?: Episode[];
  relatedMovies?: Movie[];
  videoUrl: string;
}

export interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  image: string;
  episodeNumber: number;
  seasonNumber: number;
  videoUrl: string;
}