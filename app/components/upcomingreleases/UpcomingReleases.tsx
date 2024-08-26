// components/UpcomingReleases.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const UpcomingReleases: React.FC<{ posters: { src: string; alt: string }[] }> = ({ posters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postersPerPage = 5;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPoster = currentPage * postersPerPage;
  const indexOfFirstPoster = indexOfLastPoster - postersPerPage;
  const currentPosters = posters.slice(indexOfFirstPoster, indexOfLastPoster);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posters.length / postersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentPosters.map((poster, index) => (
          <div key={index} className="w-72 h-auto rounded-lg overflow-hidden">
            <Image src={poster.src} alt={poster.alt} width={200} height={350} layout="responsive" className="rounded-lg" />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            aria-label={`Go to page ${number}`}
            className={`mx-1 px-3 py-1 border rounded-lg mb-4  ${currentPage === number ? 'bg-[#D5447B] text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UpcomingReleases;
