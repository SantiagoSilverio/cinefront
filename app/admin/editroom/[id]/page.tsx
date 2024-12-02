"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoomForm from '../../../../components/room/RoomForm';
import Cookies from 'js-cookie';
import { Room } from '../../../../types/room';
import '../../newroom/newroom.css';
interface Cinema {
    id: number;
    name: string;
}

const EditRoomPage: React.FC = () => {
    const router = useRouter();
    const [roomId, setRoomId] = useState<number | null>(null);
    const [room, setRoom] = useState<Room | null>(null);
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
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
            fetchCinemas(); 
        }
    }, [roomId]);

    const fetchRoom = async (roomId: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/room/${roomId}/`, {
                headers: myHeaders,
            });
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

    const fetchCinemas = async () => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            const response = await fetch(`https://back-k1a3.onrender.com/cinema/`, {
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error fetching cinemas');
            }
            const data = await response.json();
            
            
            setCinemas(Array.isArray(data.results) ? data.results : []);
             
        } catch (error) {
            console.error('Failed to fetch cinemas:', error);
            setCinemas([]);
           
        }
    };
    

    const updateRoom = async (updatedRoom: Partial<Room>) => {
        try {
            if (!room) {
                throw new Error('Room data is not available');
            }
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/room/${room.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedRoom),
            });
            if (!response.ok) {
                throw new Error('Error updating room');
            }
            alert('Sala editada con éxito');
            router.push('/admin/room');
        } catch (error) {
            console.error('Failed to update room:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos de la sala...</p>;
    }

    return (
        <div id="edit-room" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar Sala</h1>
                <div id="edit-form" className="form-container">
                    {room ? (
                        <RoomForm room={room} cinemas={cinemas} onSave={updateRoom} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos de la sala.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditRoomPage;

