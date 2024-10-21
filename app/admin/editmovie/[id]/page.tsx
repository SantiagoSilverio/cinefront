"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import MovieForm from '../../../components/movie/MovieForm';
import Link from 'next/link';
import { Movie } from '../../../types/movie';
import '../../nuevomovie/nuevomovie.css'; // Usa el mismo CSS que para la página de nueva película

const EditMoviePage: React.FC = () => {
    const router = useRouter();
    const [movieId, setMovieId] = useState<number | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setMovieId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (movieId) {
            fetchMovie(movieId);
        }
    }, [movieId]);

    const fetchMovie = async (movieId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/movie/${movieId}/`);
            if (!response.ok) {
                throw new Error('Error fetching movie');
            }
            const data: Movie = await response.json();
            setMovie(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch movie:', error);
            setLoading(false);
        }
    };

    const updateMovie = async (updatedMovie: Partial<Movie>) => {
        try {
            if (!movie) {
                throw new Error('Movie data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/movie/${movie.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });
            if (!response.ok) {
                throw new Error('Error updating movie');
            }
            router.push('/admin/movies');
        } catch (error) {
            console.error('Failed to update movie:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos de la película...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar película</h1>
                <div className="form-container">
                    {movie ? (
                        <MovieForm movie={movie} onSave={updateMovie} />
                    ) : (
                        <p>No se encontraron datos de la película.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditMoviePage;