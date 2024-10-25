"use client";

import React, { useState, useEffect } from 'react';
import ReservationForm from '../../../components/reservations/ReservationForm';
import Cookies from 'js-cookie';
import { Reservation, ReservationAdd } from '../../../types/reservations';
import { useRouter } from 'next/router';

const EditReservation: React.FC = () => {
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await fetch(`https://back-k1a3.onrender.com/admin/reservation/${id}`);
            const data = await response.json();
            setReservation(data);
        };
        if (id) fetchReservation();
    }, [id]);

    const handleSave = async (updatedReservation: ReservationAdd) => {
        try {
            await fetch(`https://back-k1a3.onrender.com/reservation/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedReservation),
            });
            alert('Reservación actualizada');
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    return reservation ? <ReservationForm reservation={reservation} onSave={handleSave} /> : <div>Loading...</div>;
};

export default EditReservation;
