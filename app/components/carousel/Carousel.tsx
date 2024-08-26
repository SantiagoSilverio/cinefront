'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MovieCarouselProps {
  posters: { src: string; alt: string; id: number; overview: string; }[];
  logos: { src: string | undefined; alt: string; id: number; }[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ posters, logos }) => {
  const router = useRouter();

  const handleClick = (movieId: number) => {
    router.push(`/reservation?id=${movieId}`);
  };

  return (
    <Carousel 
      showThumbs={false} 
      infiniteLoop 
      autoPlay 
      interval={10000} 
      transitionTime={1000} 
      showArrows={true} // Mostrar flechas de navegación
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button 
            type="button" 
            onClick={onClickHandler} 
            title={label} 
            className="absolute left-0 z-20 p-2 bg-black bg-opacity-50 rounded-full text-white"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            ◀
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button 
            type="button" 
            onClick={onClickHandler} 
            title={label} 
            className="absolute right-0 z-20 p-2 bg-black bg-opacity-50 rounded-full text-white"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            ▶
          </button>
        )
      }
    >
      {posters.map((poster, index) => (
        <div 
          key={poster.id} 
          className="relative flex justify-start items-center w-1/3 mx-auto mt-5 rounded-lg overflow-hidden shadow-black" 
          style={{ height: '50vh' }} 
          onClick={() => handleClick(poster.id)}
        >
          
          {/* Imagen del fondo */}
          <Image 
            src={logos[index]?.src || '/path/to/default/image.jpg'} // Proporciona una imagen predeterminada
            alt={logos[index]?.alt || 'Default Alt Text'} 
            width={2020} 
            height={0} 
            className="object-cover w-full h-full absolute z-0 blur-0 shadow-black" // Añadir clase de sombra
          />

          {/* Degradado negro */}
          <div className="absolute w-full h-full bg-gradient-to-r from-black to-transparent z-10"></div>

          {/* Poster de la película */}
          <Image 
            src={poster.src} 
            alt={poster.alt} 
            width={500} 
            height={0} 
            className="object-contain z-20 " 
            style={{ width: '20%', height: 'auto', borderRadius: '10px', marginLeft: '30px', marginTop:'30px', marginBottom: '30px'  }} // Ajusta el tamaño según sea necesario
          />
          {/* Título de la película */}
          <h1 className="text-white font-bold text-4xl z-10 ml-4" style={{ marginTop: '-15%' }}>{poster.alt}</h1>
          
          {/* Contenedor del overview alineado a la derecha */}
          <div className="absolute text-left z-10 " style={{ width: '40%', left: '23%' }}>
            <h4 className="text-white font-semibold text-xs" style={{marginTop: '-9%'}}>{poster.overview}</h4>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
