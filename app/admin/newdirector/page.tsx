"use client";

import React, { useState } from 'react';
import DirectorForm from '../../components/director/DirectorForm';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { DirectorAdd } from '../../types/director';
import './nuevodirector.css';

const NewDirectorPage: React.FC = () => {
    const [directors, setDirectors] = useState<DirectorAdd[]>([]);

    const addDirector = async (director: DirectorAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/director/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(director),
            });
            if (!response.ok) {
                throw new Error('Error adding director');
            }
            const newDirector = await response.json();
            setDirectors([...directors, newDirector]);
            alert('Director guardado de manera exitosa');
        } catch (error) {
            console.error('Failed to add director:', error);
        }
    };

    const handleAdd = (director: DirectorAdd) => {
        addDirector(director);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nuevo director</h1>
                <div className="form-container">
                    <DirectorForm onSave={handleAdd} />
                </div>
            </main>
        </div>
    );
};

export default NewDirectorPage;
