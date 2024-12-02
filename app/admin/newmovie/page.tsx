"use client";

import React, { useState, useEffect } from 'react';
import MovieForm from '../../../components/movie/MovieForm';
import Cookies from 'js-cookie';
import { MovieAdd } from '../../../types/movie';
import './nuevomovie.css';

const api_key = '4a3dab27ec9b91e69546e314a14c0a24';
const url_tmdb = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES&page=1`;

const NewMoviePage: React.FC = () => {
    const [movies, setMovies] = useState<MovieAdd[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        const fetchMoviesTMDB = async () => {
            try {
                const response = await fetch(url_tmdb);
                const data = await response.json();
                setSearchResults(data.results);
            } catch (error) {
                console.error('Error fetching TMDB movies:', error);
            }
        };
    }, []);


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&language=es-ES&page=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const addMovie = async (movie: MovieAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch('https://back-k1a3.onrender.com/movie/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    title: movie.title,
                    gender: movie.gender,
                    duration: movie.duration,
                    synopsis: movie.synopsis,
                    rating: parseFloat(movie.rating),
                    poster: movie.poster,
                    director: movie.director_id,
                    actor: movie.actor_id,
                    band: movie.bands_id,
                    distributor: movie.distributor_id,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
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