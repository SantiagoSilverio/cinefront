"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ActorForm from '../../../components/actors/ActorForm';
import Cookies from 'js-cookie';
import { Actor } from '../../../types/actors';


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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/actor/${actorId}/`, {
                headers: myHeaders,
            });
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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/actor/${actor.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedActor),
            });
            if (!response.ok) {
                throw new Error('Error updating actor');
            }
            alert('Actors editado con éxito');
            router.push('/admin/actors');
        } catch (error) {
            console.error('Failed to update actor:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos del actor...</p>;
    }

    return (
        <div id="edit-actor" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar actor</h1>
                <div id="edit-form"  className="form-container">
                    {actor ? (
                        <ActorForm actor={actor} onSave={updateActor} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos del actor.</p>
                    )}
                </div>
            </main>

        </div>
    );
};

export default EditActorPage;