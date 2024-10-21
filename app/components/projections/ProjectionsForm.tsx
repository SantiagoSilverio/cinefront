import React, { useState, useEffect } from 'react';
import { ProjectionAdd, Projection } from '../../types/projections';
import Link from 'next/link';

interface ProjectionFormProps {
    projection?: Projection;
    onSave: (projection: ProjectionAdd) => void;
}

const ProjectionForm: React.FC<ProjectionFormProps> = ({ projection, onSave }) => {
    const [date, setDate] = useState(projection ? projection.date : '');
    const [start_time, setStartTime] = useState(projection ? projection.start_time : '');
    const [duration, setDuration] = useState(projection ? projection.duration : '');
    const [price_total, setPriceTotal] = useState(projection ? projection.price_total : 0);
    const [language, setLanguage] = useState(projection ? projection.language : '');
    const [subtitles, setSubtitles] = useState(projection ? projection.subtitles || '' : '');
    const [type, setType] = useState(projection ? projection.type : '');
    const [room, setRoom] = useState(projection ? projection.room : 0);
    const [movie, setMovie] = useState(projection ? projection.movie : 0);
    const [price, setPrice] = useState(projection ? projection.price : 0);
    const [available_seats, setAvailableSeats] = useState(projection ? projection.available_seats : 0);
    const [state, setState] = useState(projection ? projection.state : true);

    useEffect(() => {
        if (projection) {
            setDate(projection.date);
            setStartTime(projection.start_time);
            setDuration(projection.duration);
            setPriceTotal(projection.price_total);
            setLanguage(projection.language);
            setSubtitles(projection.subtitles || '');
            setType(projection.type);
            setRoom(projection.room);
            setMovie(projection.movie);
            setPrice(projection.price);
            setAvailableSeats(projection.available_seats);
            setState(projection.state);
        }
    }, [projection]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            date, start_time, duration, price_total, language, subtitles, type, room, movie, price, available_seats, state
        });
        setDate('');
        setStartTime('');
        setDuration('');
        setPriceTotal(0);
        setLanguage('');
        setSubtitles('');
        setType('');
        setRoom(0);
        setMovie(0);
        setPrice(0);
        setAvailableSeats(0);
        setState(true);
    };

    return (
        <form onSubmit={handleSubmit} id="general-form">
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                id="general-input-field"
            />
            <input
                type="time"
                value={start_time}
                onChange={(e) => setStartTime(e.target.value)}
                required
                id="general-input-field"
            />
            <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duración (HH:MM:SS)"
                required
                id="general-input-field"
            />
            <input
                type="number"
                value={price_total}
                onChange={(e) => setPriceTotal(parseFloat(e.target.value))}
                placeholder="Precio total"
                required
                id="general-input-field"
            />
            <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Idioma"
                required
                id="general-input-field"
            />
            <input
                type="text"
                value={subtitles}
                onChange={(e) => setSubtitles(e.target.value)}
                placeholder="Subtítulos (opcional)"
                id="general-input-field"
            />
            <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Tipo de proyección"
                required
                id="general-input-field"
            />
            <input
                type="number"
                value={room}
                onChange={(e) => setRoom(parseInt(e.target.value))}
                placeholder="ID de la sala"
                required
                id="general-input-field"
            />
            <input
                type="number"
                value={movie}
                onChange={(e) => setMovie(parseInt(e.target.value))}
                placeholder="ID de la película"
                required
                id="general-input-field"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                placeholder="ID del precio"
                required
                id="general-input-field"
            />
            <input
                type="number"
                value={available_seats}
                onChange={(e) => setAvailableSeats(parseInt(e.target.value))}
                placeholder="Asientos disponibles"
                required
                id="general-input-field"
            />
            <label>
                Estado:
                <select value={state ? 'Activo' : 'Inactivo'} onChange={(e) => setState(e.target.value === 'Activo')}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
            </label>

            <div id="general-button-container">
                <Link href="/admin/projections">
                    <button type="button" id="general-btn">Ir a la lista</button>
                </Link>
                <button type="submit" id="general-submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default ProjectionForm;
