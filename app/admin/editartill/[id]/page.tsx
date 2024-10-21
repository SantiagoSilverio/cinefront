"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TillForm from '../../../components/tills/TillForm';
import Link from 'next/link';
import { Till } from '../../../types/tills';
import '../../nuevotill/nuevotills.css'; 

const EditTillPage: React.FC = () => {
    const router = useRouter();
    const [tillId, setTillId] = useState<number | null>(null);
    const [till, setTill] = useState<Till | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setTillId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (tillId) {
            fetchTill(tillId);
        }
    }, [tillId]);

    const fetchTill = async (tillId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/till/${tillId}/`);
            if (!response.ok) {
                throw new Error('Error fetching till');
            }
            const data: Till = await response.json();
            setTill(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch till:', error);
            setLoading(false);
        }
    };

    const updateTill = async (updatedTill: Partial<Till>) => {
        try {
            if (!till) {
                throw new Error('till data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/till/${till.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTill),
            });
            if (!response.ok) {
                throw new Error('Error updating till');
            }
            router.push('/admin/till');
        } catch (error) {
            console.error('Failed to update till:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos de la Caja Registradora...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar Caja Registradora</h1>
                <div className="form-container">
                    {till ? (
                        <TillForm till={till} onSave={updateTill} />
                    ) : (
                        <p>No se encontraron datos de la Caja Registradora.</p>
                    )}
                </div>
                <div className="button-container">

                </div>
            </main>

        </div>
    );
};

export default EditTillPage;