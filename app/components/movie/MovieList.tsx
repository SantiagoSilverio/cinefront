import React from 'react';
import Link from 'next/link';
import { Movie } from '../../types/movie';
import '../../admin/movie/movie.css';

export interface MovieListProps {
    movies: Movie[];
    onEdit: (movie: Movie) => React.ReactNode;
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
}

const MovieList: React.FC<MovieListProps> = ({ movies, onEdit, onDelete, onSort, sortColumn, sortOrder }) => {
    return (
        <table className="table-margin table-striped table-centered">
            <thead>
                <tr>
                    <th>
                        ID
                        <button onClick={() => onSort('id')}>
                            {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Título
                        <button onClick={() => onSort('title')}>
                            {sortColumn === 'title' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Género
                        <button onClick={() => onSort('gender')}>
                            {sortColumn === 'gender' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Duración
                        <button onClick={() => onSort('duration')}>
                            {sortColumn === 'duration' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>Sinopsis</th>
                    <th>
                        Calificación
                        <button onClick={() => onSort('rating')}>
                            {sortColumn === 'rating' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Estado
                        <button onClick={() => onSort('state')}>
                            {sortColumn === 'state' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>Póster</th>
                    <th>Director</th>
                    <th>Actor</th>
                    <th>Bandas</th>
                    <th>Distribuidor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{movie.gender}</td>
                        <td>{movie.duration}</td>
                        <td>{movie.synopsis.substring(0, 50)}...</td>
                        <td>{movie.rating}</td>
                        <td>{movie.state ? 'Activo' : 'Inactivo'}</td>
                        <td><img src={movie.poster} alt={movie.title} style={{width: '50px', height: '75px'}} /></td>
                        <td>{movie.director_id}</td>
                        <td>{movie.actor_id}</td>
                        <td>{movie.bands_id}</td>
                        <td>{movie.distributor_id}</td>
                        <td>
                            <Link href={`/admin/editmovie/${movie.id}`}>
                                <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button onClick={() => onDelete(movie.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MovieList;