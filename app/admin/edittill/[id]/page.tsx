"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TillForm from '../../../components/tills/TillForm';
import Cookies from 'js-cookie';
import { Till } from '../../../types/tills';
import '../../newtill/nuevotills.css'; 

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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/till/${tillId}/`, {
                headers: myHeaders,
            });
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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/till/${till.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedTill),
            });
            if (!response.ok) {
                throw new Error('Error updating Till');
            }
            router.push('/admin/tills');
        } catch (error) {
            console.error('Failed to update till:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos de la Caja Registradora...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">

            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar Caja Registradora</h1>
                <div id="edit-form" className="form-container">
                    {till ? (
                        <TillForm key="till-form" till={till} onSave={updateTill} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos de la Caja Registradora.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditTillPage;