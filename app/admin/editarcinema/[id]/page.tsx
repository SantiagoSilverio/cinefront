"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CinemaForm from '../../../components/cinemas/CinemaForm';
import Link from 'next/link';
import { Cinema } from '../../../types/cinemas';
import '../../nuevocinema/nuevocinema.css'; 

const EditCineamaPage: React.FC = () => {
    const router = useRouter();
    const [cinemaId, setCinemaId] = useState<number | null>(null);
    const [cinema, setCinema] = useState<Cinema | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setCinemaId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cinemaId) {
            fetchCinema(cinemaId);
        }
    }, [cinemaId]);

    const fetchCinema = async (cinemaId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/cinema/${cinemaId}/`);
            if (!response.ok) {
                throw new Error('Error fetching cinema');
            }
            const data: Cinema = await response.json();
            setCinema(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch cinema:', error);
            setLoading(false);
        }
    };

    const updateCinema = async (updatedCinema: Partial<Cinema>) => {
        try {
            if (!cinema) {
                throw new Error('cinema data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/cinema/${cinema.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCinema),
            });
            if (!response.ok) {
                throw new Error('Error updating cinema');
            }
            router.push('/cinemas');
        } catch (error) {
            console.error('Failed to update cinema:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos del Cine...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar cine</h1>
                <div className="form-container">
                    {cinema ? (
                        <CinemaForm cinema={cinema} onSave={updateCinema} />
                    ) : (
                        <p>No se encontraron datos del cine.</p>
                    )}
                </div>
                <div className="button-container">

                </div>
            </main>

        </div>
    );
};

export default EditCineamaPage;