"use client";

import { useEffect, useState, useRef } from 'react';
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
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    async function fetchMovies() {
      const currentMoviesData: Movie[] = await getCurrentMovies();
      const upcomingMoviesData: Movie[] = await getUpcomingMovies();
      console.log("Current Movies:", currentMoviesData);
      setCurrentMovies(currentMoviesData);
      setUpcomingMovies(upcomingMoviesData);
    }

    fetchMovies();
  }, []);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (isScrolling) return;
    setIsScrolling(true);

    const delta = Math.sign(event.deltaY);
    const upcomingSection = document.getElementById('upcoming-section');

    if (delta > 0) { // Scrolling down
      if (currentSection === 0 && upcomingSection) {
        setCurrentSection(1);
        window.scrollTo({
          top: upcomingSection.offsetTop,
          behavior: 'smooth'
        });
      }
    } else { // Scrolling up
      if (currentSection === 1) {
        setCurrentSection(0);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div 
      className="flex flex-col min-h-screen w-screen overflow-hidden"
      onWheel={handleScroll}
    >
      <main className="flex-grow flex flex-col items-center justify-between">
        <div id="carousel-section">
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
        </div>
        <div 
          id="upcoming-section" 
          className="mt-4"
        >
          <h2 className="text-2xl font-bold mb-4 p-5 rounded-lg bg-[#D5447B]">
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
      </main>
    </div>
  );
}