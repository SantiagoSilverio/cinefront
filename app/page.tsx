"use client";

import { useEffect, useState } from 'react';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import MovieCarousel from './components/carousel/Carousel';
import UpcomingReleases from './components/upcomingreleases/UpcomingReleases';
import { getCurrentMovies, getUpcomingMovies } from './api/movies';
import "./globals.css";

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

  useEffect(() => {
    async function fetchMovies() {
      const currentMoviesData: Movie[] = await getCurrentMovies();
      const upcomingMoviesData: Movie[] = await getUpcomingMovies();
      console.log("Current Movies:", currentMoviesData); // Verifica los datos aquí
      setCurrentMovies(currentMoviesData);
      setUpcomingMovies(upcomingMoviesData);
    }
  
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-between">
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
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4 p-5 rounded-lg bg-[#D5447B]">Próximos Estrenos</h2>
          <UpcomingReleases
            posters={upcomingMovies.map(movie => ({
              src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              alt: movie.title,
              id: movie.id
            }))}
          />
        </div>
      </main>
    </div>
  );
}
