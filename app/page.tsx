"use client";

import { useEffect, useState } from 'react';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import MovieCarousel from './components/carousel/Carousel';
import UpcomingReleases from './components/upcomingreleases/UpcomingReleases';
import { getCurrentMovies, getUpcomingMovies } from './api/movies';

export default function Home() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const currentMoviesData = await getCurrentMovies();
      const upcomingMoviesData = await getUpcomingMovies();
      setCurrentMovies(currentMoviesData);
      setUpcomingMovies(upcomingMoviesData);
    }

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow flex flex-col items-center justify-between ">
        <MovieCarousel posters={currentMovies.map(movie => ({
          src: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
          alt: movie.title,
          id: movie.id  // Incluye el ID de la película aquí
        }))} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Próximos Estrenos</h2>
          <UpcomingReleases posters={upcomingMovies.map(movie => ({
            src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            alt: movie.title,
            id: movie.id  // Incluye el ID de la película aquí también si es necesario
          }))} />
        </div>
      </main>

      </div>
  );
}