"use client";

import React, { useState } from 'react';
import CinemaForm from '../../../components/cinemas/CinemaForm';
import Cookies from 'js-cookie';
import { CinemaAdd } from '../../../types/cinemas';
import './nuevocinema.css';

const NewCinemaPage: React.FC = () => {
    const [cinemas, setCinemas] = useState<CinemaAdd[]>([]);

    const addCinema = async (cinema: CinemaAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/cinema/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(cinema),
            });
            if (!response.ok) {
                throw new Error('Error adding cinema');
            }
            const newCinema = await response.json();
            setCinemas([...cinemas, newCinema]);
            alert('cine guardado de manera exitosa');
        } catch (error) {
            console.error('Failed to add cinema:', error);
        }
    };

    const handleAdd = (cinema: CinemaAdd) => {
        addCinema(cinema);
    };

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nuevo cine</h1>
                <div className="form-container">
                    <CinemaForm onSave={handleAdd} />
                </div>
            </main>

        </div>
    );
};

export default NewCinemaPage;