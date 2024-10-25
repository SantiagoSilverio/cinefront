"use client";

import React, { useState, useEffect } from 'react';
import MovieList from '../../components/movie/MovieList';
import Pagination from '../../components/pagination/pagination';
import Link from 'next/link';
import { Movie } from '../../types/movie';
import '../general.css';

const MoviePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const fetchMovies = async (page: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/movie/?page=${page}&state=true`);
            if (!response.ok) {
                throw new Error('Error fetching movies');
            }
            const data = await response.json();
            setMovies(Array.isArray(data.results) ? data.results : []);
            setTotalPages(Math.ceil(data.count / 10)); // Asumiendo 10 películas por página
        } catch (error) {
            console.error(error);
        }
    };

    const deleteMovie = async (id: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/movie/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state: false }) // Cambiar el estado a inactivo
            });
            if (!response.ok) {
                throw new Error('Error deleting movie');
            }
            setMovies(movies.map(movie => movie.id === id ? { ...movie, state: false } : movie));
        } catch (error) {
            console.error('Failed to delete movie:', error);
        }
    };

    const handleEdit = (movie: Movie) => {
        return (
            <Link href={`/admin/editmovie/${movie.id}`}>
                <a>Editar</a>
            </Link>
        );
    };

    const handleDelete = (id: number) => {
        deleteMovie(id);
    };

    const handleSearch = () => {
        fetchMovies(currentPage);
    };

    const handleSort = (column: string) => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortColumn(column);
        const sortedMovies = [...movies].sort((a, b) => {
            if (a[column as keyof Movie] < b[column as keyof Movie]) return order === 'asc' ? -1 : 1;
            if (a[column as keyof Movie] > b[column as keyof Movie]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setMovies(sortedMovies);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="item-page-container" className="flex flex-col min-h-screen">
            <div id="page-container" className="page-container">
                <div id="sidebar-container" className="sidebar-container"></div>
                <div id="content-container" className="content-container">
                    <div id="items-actions" className="items-actions">
                        <div id="new-item-button-container" className="new-item-button-container">
                            <Link href="/admin/newmovie">
                                <button id="new-item-button" className="new-item-button">
                                    <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                    </svg>
                                </button>
                            </Link>
                            <p id="new-item-text" className="new-item-text">Agregar película</p>
                        </div>

                        <div id="search-input-container" className="search-input-container">
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Buscar una película"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <MovieList
                        movies={filteredMovies}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSort={handleSort}
                        sortColumn={sortColumn}
                        sortOrder={sortOrder}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    <Link href="/">
                        <button id="btn-volver" className="btn-volver">
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;