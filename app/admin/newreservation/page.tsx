"use client";

import React, { useState } from 'react';
import ReservationForm from '../../../components/reservations/ReservationForm'; // Ajusta la ruta si es necesario
import { ReservationAdd } from '../../../types/reservations';
import '../newactor/nuevoactor.css'; // Ajusta la ruta si es necesario

const NewReservation: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationAdd[]>([]);

    const addReservation = async (newReservation: ReservationAdd) => {
        try {
            const response = await fetch('https://back-k1a3.onrender.com/reservation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReservation),
            });
            if (!response.ok) {
                throw new Error('Error adding reservation');
            }
            const savedReservation = await response.json();
            setReservations([...reservations, savedReservation]);
            alert('Reservación creada de manera exitosa');
        } catch (error) {
            console.error('Failed to add reservation:', error);
        }
    };

    const handleSave = (newReservation: ReservationAdd) => {
        addReservation(newReservation);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nueva reservación</h1>
                <div className="form-container">
                    <ReservationForm onSave={handleSave} />
                </div>
            </main>
        </div>
    );
};

export default NewReservation;
