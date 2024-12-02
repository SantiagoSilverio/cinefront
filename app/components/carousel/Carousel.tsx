'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./Carousel.css"
interface MovieCarouselProps {
  posters: { src: string; alt: string; id: number; overview: string; }[];
  logos: { src: string | undefined; alt: string; id: number; }[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ posters, logos }) => {
  const router = useRouter();

  const handleClick = (movieId: number) => {
    router.push(`/reservation?id=${movieId}`);
  };

  const CustomArrow = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`
        absolute ${direction === 'left' ? 'left-4' : 'right-4'} z-20 
        p-3 rounded-full bg-black/30 backdrop-blur-sm
        hover:bg-black/50 transition-all duration-300
        text-white/80 hover:text-white
        border border-white/10 hover:border-white/30
        transform hover:scale-110
        hidden md:flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-white/50
        group
      `}
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-6 h-6 group-hover:animate-pulse" />
      ) : (
        <ChevronRight className="w-6 h-6 group-hover:animate-pulse" />
      )}
    </button>
  );

  return (
    <div className="movie-carousel-container relative w-screen h-full">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={10000}
        transitionTime={1000}
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && <CustomArrow direction="left" onClick={onClickHandler} />
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && <CustomArrow direction="right" onClick={onClickHandler} />
        }
        renderIndicator={(onClickHandler, isSelected, index) => (
          <div
            className={`
              inline-block h-2 w-2 mx-1 rounded-full cursor-pointer
              transition-all duration-300 transform hover:scale-125
              ${isSelected ? 'bg-white w-4' : 'bg-white/50'}
            `}
            onClick={onClickHandler}
            key={index}
          />
        )}
        className="h-full"
      >
        {posters.map((poster, index) => (
          <div
            key={poster.id}
            className="relative flex justify-start items-center w-full h-full cursor-pointer"
            onClick={() => handleClick(poster.id)}
          >
            {/* Background Imag */}
            <div className="absolute inset-0">
              <Image
                src={logos[index]?.src || '/path/to/default/image.jpg'}
                alt={logos[index]?.alt || 'Default Alt Text'}
                fill
                className="object-cover"
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 flex flex-col md:flex-row items-start px-4 md:px-12 lg:px-24 w-full h-full py-8">
              {/* Poster Image */}
              <div className="w-1/3 md:w-1/4 lg:w-1/5 shrink-0 animate-fadeIn">
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  width={400}
                  height={600}
                  className="rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center ml-4 md:ml-8 lg:ml-12 mt-4 md:mt-0">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-slideUp text-left">
                  {poster.alt}
                </h1>
                <p className="text-sm md:text-base text-white/90 max-w-2xl line-clamp-4 md:line-clamp-5 animate-slideUp animation-delay-200 text-left">
                  {poster.overview}
                </p>
                <button
                  className="mt-6 px-6 py-2 bg-[#D5447B] text-white rounded-lg
                           transform transition-all duration-300
                           hover:bg-[#C13C6E] hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-[#D5447B]/50
                           w-fit animate-slideUp animation-delay-400"
                >
                  Reservar Ahora
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;