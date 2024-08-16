"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ActorForm from '../../../components/actors/ActorForm';
import Link from 'next/link';
import { Actor } from '../../../types/actors';
import '../../nuevoactor/nuevoactor.css'; // Usa el mismo CSS que para la otra página

const EditActorPage: React.FC = () => {
    const router = useRouter();
    const [actorId, setActorId] = useState<number | null>(null);
    const [actor, setActor] = useState<Actor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setActorId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (actorId) {
            fetchActor(actorId);
        }
    }, [actorId]);

    const fetchActor = async (actorId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/actor/${actorId}/`);
            if (!response.ok) {
                throw new Error('Error fetching actor');
            }
            const data: Actor = await response.json();
            setActor(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch actor:', error);
            setLoading(false);
        }
    };

    const updateActor = async (updatedActor: Partial<Actor>) => {
        try {
            if (!actor) {
                throw new Error('Actor data is not available');
            }
            const response = await fetch(`http://localhost:8000/actor/${actor.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedActor),
            });
            if (!response.ok) {
                throw new Error('Error updating actor');
            }
            router.push('/actors');
        } catch (error) {
            console.error('Failed to update actor:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos del actor...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar actor</h1>
                <div className="form-container">
                    {actor ? (
                        <ActorForm actor={actor} onSave={updateActor} />
                    ) : (
                        <p>No se encontraron datos del actor.</p>
                    )}
                </div>
                <div className="button-container">

                </div>
            </main>

        </div>
    );
};

export default EditActorPage;
