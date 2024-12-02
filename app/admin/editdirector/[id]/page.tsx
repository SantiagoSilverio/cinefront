"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DirectorForm from '../../../components/director/DirectorForm';
import Cookies from 'js-cookie';
import { Director } from '../../../types/director';
import '../../newdirector/nuevodirector.css';

const EditDirectorPage: React.FC = () => {
    const router = useRouter();
    const [directorId, setDirectorId] = useState<number | null>(null);
    const [director, setDirector] = useState<Director | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setDirectorId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (directorId) {
            fetchDirector(directorId);
        }
    }, [directorId]);

    const fetchDirector = async (directorId: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/director/${directorId}/`, {
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error fetching director');
            }
            const data: Director = await response.json();
            setDirector(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch director:', error);
            setLoading(false);
        }
    };

    const updateDirector = async (updatedDirector: Partial<Director>) => {
        try {
            if (!director) {
                throw new Error('Director data is not available');
            }
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/director/${director.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedDirector),
            });
            if (!response.ok) {
                throw new Error('Error updating Director');
            }
            alert('Director editado con éxito');
            router.push('/admin/directors');
        } catch (error) {
            console.error('Failed to update director:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos del director...</p>;
    }

    return (
        <div id="edit-director" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar director</h1>
                <div id="edit-form" className="form-container">
                    {director ? (
                        <DirectorForm key="director-form" director={director} onSave={updateDirector} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos del director.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditDirectorPage;