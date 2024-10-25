"use client";

import React, { useState } from 'react';
import ProjectionForm from '../../components/projections/ProjectionsForm'; // Asegúrate de tener este componente
import Cookies from 'js-cookie';
import { ProjectionAdd } from '../../types/projections'; // Asegúrate de tener este tipo
import '../general.css'; 

const NewProjectionPage: React.FC = () => {
    const [projections, setProjections] = useState<ProjectionAdd[]>([]);

    const addProjection = async (projection: ProjectionAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/projection/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(projection),
            });
            if (!response.ok) {
                throw new Error('Error adding projection');
            }
            const newProjection = await response.json();
            setProjections([...projections, newProjection]);
            alert('Proyección guardada de manera exitosa');
        } catch (error) {
            console.error('Failed to add projection:', error);
        }
    };

    const handleAdd = (projection: ProjectionAdd) => {
        addProjection(projection);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nueva proyección</h1>
                <div className="form-container">
                    <ProjectionForm onSave={handleAdd} /> {/* Asegúrate de que este componente esté disponible */}
                </div>
            </main>
        </div>
    );
};

export default NewProjectionPage;
