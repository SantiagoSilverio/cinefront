"use client";

import { useEffect, useState } from 'react';
import MovieCarousel from './components/carousel/Carousel';
import UpcomingReleases from './components/upcomingreleases/UpcomingReleases';
import { getCurrentMovies, getUpcomingMovies } from './api/movies';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  logo_path?: string;
  overview: string; 
}

export default function Home() {
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const [currentMoviesData, upcomingMoviesData] = await Promise.all([
          getCurrentMovies(),
          getUpcomingMovies()
        ]);
        
        setCurrentMovies(currentMoviesData);
        setUpcomingMovies(upcomingMoviesData);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchMovies();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-between">
        {currentMovies.length > 0 && (
          <MovieCarousel
            logos={currentMovies.map(movie => ({
              src: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
              alt: movie.title,
              id: movie.id
            }))}   
            posters={currentMovies.map(movie => ({
              src: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
              alt: movie.title,
              overview: movie.overview,
              id: movie.id
            }))}   
          />
        )}
        
        {upcomingMovies.length > 0 && (
          <div className="mt-4 w-full px-4">
            <h2 className="text-2xl font-bold mb-4 p-5 rounded-lg bg-[#D5447B] text-center">
              Próximos Estrenos
            </h2>
            <UpcomingReleases
              posters={upcomingMovies.map(movie => ({
                src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                alt: movie.title,
                id: movie.id
              }))}
            />
          </div>
        )}
      </main>
    </div>
  );
}