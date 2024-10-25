"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoomForm from '../../components/room/RoomForm'; // Asegúrate de tener el formulario de Room
import { Room } from '../../types/room';  // Asegúrate de tener el tipo Room definido


const EditRoomPage: React.FC = () => {
    const router = useRouter();
    const [roomId, setRoomId] = useState<number | null>(null);
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setRoomId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (roomId) {
            fetchRoom(roomId);
        }
    }, [roomId]);

    const fetchRoom = async (roomId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/room/${roomId}/`);
            if (!response.ok) {
                throw new Error('Error fetching room');
            }
            const data: Room = await response.json();
            setRoom(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch room:', error);
            setLoading(false);
        }
    };

    const updateRoom = async (updatedRoom: Partial<Room>) => {
        try {
            if (!room) {
                throw new Error('Room data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/room/${room.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRoom),
            });
            if (!response.ok) {
                throw new Error('Error updating room');
            }
            router.push('/room');
        } catch (error) {
            console.error('Failed to update room:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos de la sala...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar sala</h1>
                <div className="form-container">
                    {room ? (
                        <RoomForm room={room} onSave={updateRoom} />
                    ) : (
                        <p>No se encontraron datos de la sala.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditRoomPage;