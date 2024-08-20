'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MovieCarousel: React.FC<{ posters: { src: string; alt: string; id: number }[] }> = ({ posters }) => {
  const router = useRouter();

  const handleClick = (movieId: number) => {
    // Redirige a la página de reserva con el ID de la película
    router.push(`/reservation?id=${movieId}`);
  };

  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay interval={10000} transitionTime={1000}>
      {posters.map((poster) => (
        <div key={poster.id} className="flex justify-center items-center w-screen h-96 mx-auto" onClick={() => handleClick(poster.id)}>
          <Image src={poster.src} alt={poster.alt} width={2020} height={0} className="object-contain" />
          
        </div>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
