import React, { useState, useEffect } from 'react';
import { MovieAdd, Movie } from '../../types/movie';
import Link from 'next/link';

interface MovieFormProps {
    movie?: Movie;
    onSave: (movie: MovieAdd) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSave }) => {
    const [title, setTitle] = useState(movie ? movie.title : '');
    const [gender, setGender] = useState(movie ? movie.gender : '');
    const [duration, setDuration] = useState(movie ? movie.duration.toString() : '');
    const [synopsis, setSynopsis] = useState(movie ? movie.synopsis : '');
    const [rating, setRating] = useState(movie ? movie.rating : '');
    const [poster, setPoster] = useState(movie ? movie.poster : '');
    const [directorId, setDirectorId] = useState(movie ? movie.director_id.toString() : '');
    const [actorId, setActorId] = useState(movie ? movie.actor_id.toString() : '');
    const [bandsId, setBandsId] = useState(movie ? movie.bands_id.toString() : '');
    const [distributorId, setDistributorId] = useState(movie ? movie.distributor_id.toString() : '');

    useEffect(() => {
        if (movie) {
            setTitle(movie.title);
            setGender(movie.gender);
            setDuration(movie.duration.toString());
            setSynopsis(movie.synopsis);
            setRating(movie.rating);
            setPoster(movie.poster);
            setDirectorId(movie.director_id.toString());
            setActorId(movie.actor_id.toString());
            setBandsId(movie.bands_id.toString());
            setDistributorId(movie.distributor_id.toString());
        }
    }, [movie]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            title,
            gender,
            duration: parseInt(duration),
            synopsis,
            rating,
            poster,
            director_id: parseInt(directorId),
            actor_id: parseInt(actorId),
            bands_id: parseInt(bandsId),
            distributor_id: parseInt(distributorId)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="movie-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                required
                className="input-field"
            />
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Género"
                required
                className="input-field"
            />
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duración (minutos)"
                required
                className="input-field"
            />
            <textarea
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Sinopsis"
                required
                className="input-field"
            />
            <input
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Calificación"
                required
                className="input-field"
            />
            <input
                type="text"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                placeholder="URL del póster"
                required
                className="input-field"
            />
            <input
                type="number"
                value={directorId}
                onChange={(e) => setDirectorId(e.target.value)}
                placeholder="ID del Director"
                required
                className="input-field"
            />
            <input
                type="number"
                value={actorId}
                onChange={(e) => setActorId(e.target.value)}
                placeholder="ID del Actor"
                required
                className="input-field"
            />
            <input
                type="number"
                value={bandsId}
                onChange={(e) => setBandsId(e.target.value)}
                placeholder="ID de las Bandas"
                required
                className="input-field"
            />
            <input
                type="number"
                value={distributorId}
                onChange={(e) => setDistributorId(e.target.value)}
                placeholder="ID del Distribuidor"
                required
                className="input-field"
            />

            <div className="button-container1">
                <Link href="/admin/movie">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default MovieForm;