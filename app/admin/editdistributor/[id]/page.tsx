"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DistributorForm from '../../../components/distributors/DistributorForm'; // Ajusta la ruta para distribuidores
import { Distributor } from '../../../types/distributors';
import '../../nuevocountry/nuevocountry.css';

const EditDistributorPage: React.FC = () => {
    const router = useRouter();
    const [distributorId, setDistributorId] = useState<number | null>(null);
    const [distributor, setDistributor] = useState<Distributor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setDistributorId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (distributorId) {
            fetchDistributor(distributorId);
        }
    }, [distributorId]);

    const fetchDistributor = async (distributorId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/distributor/${distributorId}/`);
            if (!response.ok) {
                throw new Error('Error fetching distributor');
            }
            const data: Distributor = await response.json();
            setDistributor(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch distributor:', error);
            setLoading(false);
        }
    };

    const updateDistributor = async (updatedDistributor: Partial<Distributor>) => {
        try {
            if (!distributor) {
                throw new Error('Distributor data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/distributor/${distributor.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDistributor),
            });
            if (!response.ok) {
                throw new Error('Error updating distributor');
            }
            router.push('/admin/distributors');
        } catch (error) {
            console.error('Failed to update distributor:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos del distribuidor...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar distribuidor</h1>
                <div className="form-container">
                    {distributor ? (
                        <DistributorForm distributor={distributor} onSave={updateDistributor} />
                    ) : (
                        <p>No se encontraron datos del distribuidor.</p>
                    )}
                </div>
                <div className="button-container">
                    {/* Agrega botones o acciones adicionales si es necesario */}
                </div>
            </main>
        </div>
    );
};

export default EditDistributorPage;
