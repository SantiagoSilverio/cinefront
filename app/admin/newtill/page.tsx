"use client";

import React, { useState } from 'react';
import TillForm from '../../../components/tills/TillForm';
import Cookies from 'js-cookie';
import { TillAdd } from '../../../types/tills';
import './nuevotills.css';

const NewTillPage: React.FC = () => {
    const [tills, setTills] = useState<TillAdd[]>([]);

    const addTill = async (till: TillAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/till/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(till),
            });
            if (!response.ok) {
                throw new Error('Error adding till');
            }
            const newTill = await response.json();
            setTills([...tills, newTill]);
            alert('Caja registradora guardada de manera exitosa');
        } catch (error) {
            console.error('Failed to add till:', error);
        }
    };

    const handleAdd = (till: TillAdd) => {
        addTill(till);
    };

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar Nueva Caja Registradora</h1>
                <div className="form-container">
                    <TillForm onSave={handleAdd} />
                </div>
            </main>

        </div>
    );
};

export default NewTillPage;