"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CinemaForm from '../../../components/cinemas/CinemaForm';
import Cookies from 'js-cookie';
import { Cinema } from '../../../types/cinemas';
import '../../newcinema/nuevocinema.css'; 

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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/cinema/${cinemaId}/`, {
                headers: myHeaders,
            });
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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/cinema/${cinema.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedCinema),
            });
            if (!response.ok) {
                throw new Error('Error updating cinema');
            }
            router.push('/admin/cinemas');
        } catch (error) {
            console.error('Failed to update cinema:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos del Cine...</p>;
    }

    return (
        <div id="edit-cinema" className="flex flex-col min-h-screen">

            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar cine</h1>
                <div id="edit-form"  className="form-container">
                    {cinema ? (
                        <CinemaForm id="cinema-form" cinema={cinema} onSave={updateCinema} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos del cine.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditCineamaPage;