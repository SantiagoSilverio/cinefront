'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

const MovieCarousel: React.FC<{ posters: { src: string; alt: string }[] }> = ({ posters }) => {
  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay interval={4000} transitionTime={1000}>
      {posters.map((poster, index) => (
        <div key={index} className="w-64 lg-w-64 mx-auto">
          <Image src={poster.src} alt={poster.alt} width={120} height={180} />
        </div>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
