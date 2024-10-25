'use client';  // Forzar ejecución en el cliente

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface RoomAdd {
  number_rooms: number;
  seat_capacity: number;
  type_screens: string;
  state: boolean;
  id_cin: number;
}

const NewRoomPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RoomAdd>({
    number_rooms: 0,
    seat_capacity: 0,
    type_screens: '',
    state: true,
    id_cin: 0,
  });

  const addRoom = async (room: RoomAdd) => {
    try {
      const response = await fetch('https://back-k1a3.onrender.com/room/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(room),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la sala');
      }

      router.push('/admin/rooms');
    } catch (error) {
      console.error('Failed to add room:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRoom(formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="title">Agregar nueva sala</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="number"
              placeholder="Número de salas"
              value={formData.number_rooms}
              onChange={(e) => setFormData({ ...formData, number_rooms: +e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Capacidad de asientos"
              value={formData.seat_capacity}
              onChange={(e) => setFormData({ ...formData, seat_capacity: +e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Tipo de pantallas"
              value={formData.type_screens}
              onChange={(e) => setFormData({ ...formData, type_screens: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="ID del cine"
              value={formData.id_cin}
              onChange={(e) => setFormData({ ...formData, id_cin: +e.target.value })}
              required
            />

            <div className="flex space-x-4">
              <Link href="/admin/rooms">
                <button type="button" className="btn">Cancelar</button>
              </Link>
              <button type="submit" className="btn">Agregar Sala</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewRoomPage;
