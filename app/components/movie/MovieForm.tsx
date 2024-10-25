import React, { useState, useEffect } from 'react';
import { MovieAdd, Movie } from '../../types/movie';
import Link from 'next/link';

interface Director {
    id: number;
    name: string;
}

interface Actor {
    id: number;
    name: string;
}

interface Band {
    id: number;
    name: string;
}

interface Distributor {
    id: number;
    name: string;
}

interface MovieFormProps {
    movie?: Movie;
    onSave: (movie: MovieAdd) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSave }) => {
    // Estados originales
    const [title, setTitle] = useState(movie ? movie.title : '');
    const [gender, setGender] = useState(movie ? movie.gender : '');
    const [duration, setDuration] = useState(movie ? movie.duration.toString() : '');
    const [synopsis, setSynopsis] = useState(movie ? movie.synopsis : '');
    const [rating, setRating] = useState(movie ? movie.rating : '');
    const [poster, setPoster] = useState(movie ? movie.poster : '');
    
    // Estados para los IDs seleccionados
    const [directorId, setDirectorId] = useState(movie ? movie.director_id.toString() : '');
    const [actorId, setActorId] = useState(movie ? movie.actor_id.toString() : '');
    const [bandsId, setBandsId] = useState(movie ? movie.bands_id.toString() : '');
    const [distributorId, setDistributorId] = useState(movie ? movie.distributor_id.toString() : '');

    // Estados para las listas de opciones
    const [directors, setDirectors] = useState<Director[]>([]);
    const [actors, setActors] = useState<Actor[]>([]);
    const [bands, setBands] = useState<Band[]>([]);
    const [distributors, setDistributors] = useState<Distributor[]>([]);

    // Cargar las listas al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [directorsRes, actorsRes, bandsRes, distributorsRes] = await Promise.all([
                    fetch('https://back-k1a3.onrender.com/director/?state=true'),
                    fetch('https://back-k1a3.onrender.com/actor/?state=true'),
                    fetch('https://back-k1a3.onrender.com/bands/?state=true'),
                    fetch('https://back-k1a3.onrender.com/distributor/?state=true')
                ]);

                const directorsData = await directorsRes.json();
                const actorsData = await actorsRes.json();
                const bandsData = await bandsRes.json();
                const distributorsData = await distributorsRes.json();

                setDirectors(directorsData.results || []);
                setActors(actorsData.results || []);
                setBands(bandsData.results || []);
                setDistributors(distributorsData.results || []);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchData();
    }, []);

    // Efecto para actualizar campos cuando se proporciona una película
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

            {/* Selects para los IDs */}
            <select
                value={directorId}
                onChange={(e) => setDirectorId(e.target.value)}
                required
                className="input-field"
            >
                <option value="">Seleccionar Director</option>
                {directors.map((director) => (
                    <option key={director.id} value={director.id}>
                        {director.name}
                    </option>
                ))}
            </select>

            <select
                value={actorId}
                onChange={(e) => setActorId(e.target.value)}
                required
                className="input-field"
            >
                <option value="">Seleccionar Actor</option>
                {actors.map((actor) => (
                    <option key={actor.id} value={actor.id}>
                        {actor.name}
                    </option>
                ))}
            </select>

            <select
                value={bandsId}
                onChange={(e) => setBandsId(e.target.value)}
                required
                className="input-field"
            >
                <option value="">Seleccionar Banda</option>
                {bands.map((band) => (
                    <option key={band.id} value={band.id}>
                        {band.name}
                    </option>
                ))}
            </select>

            <select
                value={distributorId}
                onChange={(e) => setDistributorId(e.target.value)}
                required
                className="input-field"
            >
                <option value="">Seleccionar Distribuidor</option>
                {distributors.map((distributor) => (
                    <option key={distributor.id} value={distributor.id}>
                        {distributor.name}
                    </option>
                ))}
            </select>

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