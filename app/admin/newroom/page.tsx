 "use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoomForm from '../../../components/room/RoomForm';
import Cookies from 'js-cookie';
import { RoomAdd } from '../../../types/room';
import '../newroom/newroom.css';

const NewRoomPage: React.FC = () => {
    const router = useRouter();
    const [cinemas, setCinemas] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
      const fetchCinemas = async () => {
          try {
              const token = Cookies.get('access_token');
              
              if (!token) {
                  console.error('No se encontró el token de acceso.');
                  return;
              }
  
              const myHeaders = new Headers();
              myHeaders.append('Authorization', `Bearer ${token}`);
              myHeaders.append('Content-Type', 'application/json');
  
              const response = await fetch('https://back-k1a3.onrender.com/cinema/', {
                  method: 'GET',
                  headers: myHeaders,
              });
  
              if (!response.ok) {
                  throw new Error('Error al cargar los cines');
              }
  
              const cinemasData = await response.json();
              setCinemas(cinemasData.results); 
          } catch (error) {
              console.error('Error al cargar cines:', error);
          }
      };
  
      fetchCinemas();
  }, []);
  

  const addRoom = async (roomData: RoomAdd) => {
    try {
      const token = Cookies.get('access_token');
              
              if (!token) {
                  console.error('No se encontró el token de acceso.');
                  return;
              }
  
              const myHeaders = new Headers();
              myHeaders.append('Authorization', `Bearer ${token}`);
              myHeaders.append('Content-Type', 'application/json');

      const response = await fetch('https://back-k1a3.onrender.com/room/', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        
        const errorData = await response.json();
        console.error('Error en el backend:', errorData);
        throw new Error('Error al agregar sala');
      }

      const result = await response.json();
      console.log('Sala agregada correctamente:', result);
      router.push('/admin/room');
    } catch (error) {
      
      console.error('Error al agregar sala:', error);
      throw new Error('Error al agregar sala');
    }
  };


    return (
        <div id="new-room-page" className="flex flex-col min-h-screen">
            <main id="new-room-content" className="flex-grow container mx-auto p-4">
                <h1 id="new-room-title" className="title">Agregar nueva sala</h1>
                <div id="new-room-form-container" className="form-container">
                    <RoomForm onSave={addRoom} cinemas={cinemas} />
                </div>
            </main>
        </div>
    );
};

export default NewRoomPage;
