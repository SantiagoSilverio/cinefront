"use client";
import React, { useState } from 'react';
import RoomForm from '../../components/room/RoomForm';
import Cookies from 'js-cookie';
import { RoomAdd } from '../../types/room';
import '../general.css';

const NewRoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<RoomAdd[]>([]);

  const addRoom = async (room: RoomAdd) => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch('https://back-k1a3.onrender.com/room/', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(room),
      });
      if (!response.ok) {
        throw new Error('Error adding room');
      }

      const newRoom = await response.json();
      setRooms([...rooms, newRoom]);
      alert('Sala guardada de manera exitosa');
    } catch (error) {
      console.error('Failed to add room:', error);
    }
  };

  const handleAdd = (room: RoomAdd) => {
    addRoom(room);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="title">Agregar nueva sala</h1>
        <div className="form-container">
          <RoomForm onSave={handleAdd} />
        </div>
      </main>
    </div>
  );
};

export default NewRoomPage;