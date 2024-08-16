import MovieCarousel from './components/carousel/Carousel';
import UpcomingReleases from './components/upcomingreleases/UpcomingReleases';

// Ejemplos de posters, reemplázalos con tus URLs reales
const currentMoviesPosters = [
  { src: 'https://via.placeholder.com/300x450.png?text=Movie+1', alt: 'Movie 1' },
  { src: 'https://via.placeholder.com/300x450.png?text=Movie+2', alt: 'Movie 2' },
  { src: 'https://via.placeholder.com/300x450.png?text=Movie+3', alt: 'Movie 3' },
  { src: 'https://via.placeholder.com/300x450.png?text=Movie+4', alt: 'Movie 4' },
  { src: 'https://via.placeholder.com/300x450.png?text=Movie+5', alt: 'Movie 5' },
];

const upcomingMoviesPosters = [
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+1', alt: 'Upcoming 1' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+2', alt: 'Upcoming 2' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+3', alt: 'Upcoming 3' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+4', alt: 'Upcoming 4' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+5', alt: 'Upcoming 5' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+6', alt: 'Upcoming 6' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+7', alt: 'Upcoming 7' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+8', alt: 'Upcoming 8' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+9', alt: 'Upcoming 9' },
  { src: 'https://via.placeholder.com/300x450.png?text=Upcoming+10', alt: 'Upcoming 10' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow flex flex-col items-center justify-between p-24">
        <MovieCarousel posters={currentMoviesPosters} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Próximos Estrenos</h2>
          <UpcomingReleases posters={upcomingMoviesPosters} />
        </div>
      </main>

    </div>
  );
}
