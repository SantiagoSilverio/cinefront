"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectionForm from '../../../components/projections/ProjectionsForm'; // Asegúrate de tener este componente
import { Projection } from '../../../types/projections'; // Asegúrate de tener este tipo
import '../../nuevoactor/nuevoactor.css'; // Usa el mismo CSS que para la otra página

const EditProjectionPage: React.FC = () => {
    const router = useRouter();
    const [projectionId, setProjectionId] = useState<number | null>(null);
    const [projection, setProjection] = useState<Projection | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setProjectionId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (projectionId) {
            fetchProjection(projectionId);
        }
    }, [projectionId]);

    const fetchProjection = async (projectionId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/projection/${projectionId}/`);
            if (!response.ok) {
                throw new Error('Error fetching projection');
            }
            const data: Projection = await response.json();
            setProjection(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch projection:', error);
            setLoading(false);
        }
    };

    const updateProjection = async (updatedProjection: Partial<Projection>) => {
        try {
            if (!projection) {
                throw new Error('Projection data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/projection/${projection.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProjection),
            });
            if (!response.ok) {
                throw new Error('Error updating projection');
            }
            router.push('/projections'); // Redirige a la página de proyecciones
        } catch (error) {
            console.error('Failed to update projection:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos de la proyección...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar Proyección</h1>
                <div className="form-container">
                    {projection ? (
                        <ProjectionForm projection={projection} onSave={updateProjection} />
                    ) : (
                        <p>No se encontraron datos de la proyección.</p>
                    )}
                </div>
                <div className="button-container">
                    {/* Puedes agregar más botones aquí si lo necesitas */}
                </div>
            </main>
        </div>
    );
};

export default EditProjectionPage;
