"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectionForm from '@/components/projection/ProjectionsForm';
import Cookies from 'js-cookie';
import { Projection, ProjectionAdd, Room, Movie, Price } from '../../../../types/projection';
import '../../newroom/newroom.css'


const EditProjectionPage: React.FC = () => {
    const router = useRouter();
    const [projectionId, setProjectionId] = useState<number | null>(null);
    const [projection, setProjection] = useState<Projection | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [prices, setPrices] = useState<Price[]>([]);
    const [loading, setLoading] = useState(true);

    // Obtener el ID de la proyección desde la URL
    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setProjectionId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    // Cargar datos de la proyección, salas, películas y precios
    useEffect(() => {
        if (projectionId) {
            fetchProjection(projectionId);
            fetchRooms();
            fetchMovies();
            fetchPrices();
        }
    }, [projectionId]);

    // Función para cargar la proyección actual
    const fetchProjection = async (id: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/projection/${id}/`, {
                headers: myHeaders,
            });
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

    // Funciones para cargar salas, películas y precios
    const fetchRooms = async () => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            const response = await fetch(`https://back-k1a3.onrender.com/room/`, {
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error fetching rooms');
            }
            const data = await response.json();
            setRooms(Array.isArray(data.results) ? data.results : []);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
            setRooms([]);
        }
    };

    const fetchMovies = async () => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            const response = await fetch(`https://back-k1a3.onrender.com/movie/`, {
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error fetching movies');
            }
            const data = await response.json();
            setMovies(Array.isArray(data.results) ? data.results : []);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            setMovies([]);
        }
    };

    const fetchPrices = async () => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            const response = await fetch(`https://back-k1a3.onrender.com/price/`, {
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error fetching prices');
            }
            const data = await response.json();
    
            // Mapea los datos para transformar 'amount' a 'name'
            const pricesWithNames = data.results.map((price: Price) => ({
                id: price.id,
                name: price.name, // Asigna 'amount' al campo 'name'
            }));
    
            setPrices(pricesWithNames);
        } catch (error) {
            console.error('Failed to fetch prices:', error);
            setPrices([]);
        }
    };
    
    
    

    // Función para actualizar la proyección
    const updateProjection = async (updatedProjection: ProjectionAdd) => {
        try {
            if (!projection) {
                throw new Error('projection data is not available');
            }
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/projection/${projection.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedProjection),
            });
            if (!response.ok) {
                throw new Error('Error updating projection');
            }
            alert('Sala editada con éxito');
            router.push('/admin/projection');
        } catch (error) {
            console.error('Failed to update projection:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos de la sala...</p>;
    }

    return (
        <div id="edit-projection" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar Proyección</h1>
                <div id="edit-form" className="form-container">
                    {projection ? (
                        <ProjectionForm
                        projection={{
                            ...projection,
                            room: projection.room?.id ?? null, // Asegura que room.id exista
                            price: projection.price?.id ?? null, // Asegura que price.id exista
                            movie: projection.movie?.id ?? null, // Asegura que movie.id exista
                        }}
                        rooms={rooms}
                        movies={movies}
                        prices={prices}
                        onSave={updateProjection}
                    />
                    
                    ) : (
                        <p id="no-data-message">No se encontraron datos de la proyección.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditProjectionPage;
