"use client";

import React, { useState } from 'react';
import MovieForm from '../../components/movie/MovieForm';
import Link from 'next/link';
import { MovieAdd } from '../../types/movie';
import '../nuevomovie/nuevomovie.css';

const NewMoviePage: React.FC = () => {
    const [movies, setMovies] = useState<MovieAdd[]>([]);

    const addMovie = async (movie: MovieAdd) => {
        try {
            const response = await fetch('https://back-k1a3.onrender.com/movie/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie),
            });
            if (!response.ok) {
                throw new Error('Error adding movie');
            }
            const newMovie = await response.json();
            setMovies([...movies, newMovie]);
            alert('Película guardada de manera exitosa');
        } catch (error) {
            console.error('Failed to add movie:', error);
        }
    };

    const handleAdd = (movie: MovieAdd) => {
        addMovie(movie);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nueva película</h1>
                <div className="form-container">
                    <MovieForm onSave={handleAdd} />
                </div>
            </main>
        </div>
    );
};

export default NewMoviePage;