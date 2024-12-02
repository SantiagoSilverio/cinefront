"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ProjectionAdd } from '../../../types/projection';
import '../newroom/newroom.css'
import ProjectionForm from '@/components/projection/ProjectionsForm';
const NewProjectionPage: React.FC = () => {
    const router = useRouter();
    const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
    const [prices, setPrices] = useState<{ id: number; name: string }[]>([]);
    const [movies, setMovies] = useState<{ id: number; title: string }[]>([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const token = Cookies.get('access_token');
              if (!token) {
                  console.error('No se encontró el token de acceso.');
                  return;
              }

              const myHeaders = new Headers();
              myHeaders.append('Authorization', `Bearer ${token}`);
              myHeaders.append('Content-Type', 'application/json');

              // Fetch rooms
              const roomResponse = await fetch('https://back-k1a3.onrender.com/room/', {
                  method: 'GET',
                  headers: myHeaders,
              });
              const roomsData = await roomResponse.json();
              setRooms(roomsData.results);

              // Fetch prices
              const priceResponse = await fetch('https://back-k1a3.onrender.com/price/', {
                  method: 'GET',
                  headers: myHeaders,
              });
              const pricesData = await priceResponse.json();
              setPrices(pricesData.results);

              // Fetch movies
              const movieResponse = await fetch('https://back-k1a3.onrender.com/movie/', {
                  method: 'GET',
                  headers: myHeaders,
              });
              const moviesData = await movieResponse.json();
              setMovies(moviesData.results);
          } catch (error) {
              console.error('Error al cargar los datos:', error);
          }
      };

      fetchData();
  }, []);
  

  const addProjection = async (projectionData: ProjectionAdd) => {
    try {
      const token = Cookies.get('access_token');
      if (!token) {
          console.error('No se encontró el token de acceso.');
          return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/json');

      const response = await fetch('https://back-k1a3.onrender.com/projection/', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(projectionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el backend:', errorData);
        throw new Error('Error al agregar proyección');
      }

      const result = await response.json();
      console.log('Proyección agregada correctamente:', result);
      router.push('/admin/projections');
    } catch (error) {
      console.error('Error al agregar proyección:', error);
      throw new Error('Error al agregar proyección');
    }
  };

  return (
    <div id="new-projection-page" className="flex flex-col min-h-screen">
        <main id="new-projection-content" className="flex-grow container mx-auto p-4">
            <h1 id="new-projection-title" className="title">Agregar nueva proyección</h1>
            <div id="new-projection-form-container" className="form-container">
                <ProjectionForm onSave={addProjection} rooms={rooms} prices={prices} movies={movies} />
            </div>
        </main>
    </div>
  );
};

export default NewProjectionPage;
