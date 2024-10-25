"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DirectorForm from '../../../components/director/DirectorForm';
import Link from 'next/link';
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
            const response = await fetch(`https://back-k1a3.onrender.com/director/${directorId}/`);
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
            const response = await fetch(`https://back-k1a3.onrender.com/director/${director.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDirector),
            });
            if (!response.ok) {
                throw new Error('Error updating director');
            }
            router.push('/admin/director');
        } catch (error) {
            console.error('Failed to update director:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos del director...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar director</h1>
                <div className="form-container">
                    {director ? (
                        <DirectorForm director={director} onSave={updateDirector} />
                    ) : (
                        <p>No se encontraron datos del director.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditDirectorPage;