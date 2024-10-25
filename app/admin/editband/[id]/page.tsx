"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BandForm from '../../../components/bands/BandForm';
import { Band } from '../../../types/bands';
import '../../newband/nuevabanda.css'; // Reutiliza el mismo CSS

const EditBandPage: React.FC = () => {
    const router = useRouter();
    const [bandId, setBandId] = useState<number | null>(null);
    const [band, setBand] = useState<Band | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setBandId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (bandId) {
            fetchBand(bandId);
        }
    }, [bandId]);

    const fetchBand = async (bandId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/band/${bandId}/`);
            if (!response.ok) {
                throw new Error('Error fetching band');
            }
            const data: Band = await response.json();
            setBand(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch band:', error);
            setLoading(false);
        }
    };

    const updateBand = async (updatedBand: Partial<Band>) => {
        try {
            if (!band) {
                throw new Error('Band data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/band/${band.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBand),
            });
            if (!response.ok) {
                throw new Error('Error updating band');
            }
            router.push('/admin/bands'); // Cambia a la ruta de la lista de bandas
        } catch (error) {
            console.error('Failed to update band:', error);
        }
    };
    

    if (loading) {
        return <p>Cargando datos de la banda...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar banda</h1>
                <div className="form-container">
                    {band ? (
                        <BandForm band={band} onSave={updateBand} />
                    ) : (
                        <p>No se encontraron datos de la banda.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditBandPage;
