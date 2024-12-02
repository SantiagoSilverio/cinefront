import React, { useState, useEffect } from 'react';
import { ProjectionAdd } from '@/types/projection';
import Link from 'next/link';

interface ProjectionFormProps {
  projection?: ProjectionAdd;
  onSave: (projection: ProjectionAdd) => void;
  rooms: { id: number; name: string }[];
  prices: { id: number; name: string }[];
  movies: { id: number; title: string }[];
}

const ProjectionForm: React.FC<ProjectionFormProps> = ({
  projection,
  onSave,
  rooms = [],
  prices = [],
  movies = [],
}) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [room, setRoom] = useState<number>(rooms[0]?.id || 0);
  const [price, setPrice] = useState<number>(prices[0]?.id || 0);
  const [movie, setMovie] = useState<number>(movies[0]?.id || 0);
  const [language, setLanguage] = useState('');
  const [subtitles, setSubtitles] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [type,setprojectionType] = useState('');
  const isEditing = !!projection;

  
  useEffect(() => {
    if (projection) {
      setDate(projection.date);
      setStartTime(projection.start_time);
      setDuration(projection.duration);
      setRoom(projection.room);
      setPrice(projection.price);
      setMovie(projection.movie);
      setLanguage(projection.language);
      setSubtitles(projection.subtitles || '');
      setprojectionType(projection.type)
      setAvailableSeats(projection.available_seats.toString());
    }
  }, [projection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceTotal = (Number(price) * Number(availableSeats)).toFixed(2);

    if (price === 0 || price === undefined) {
      console.error('Invalid price value.');
      return;
    }

    

    const projectionData: ProjectionAdd = {
      date: date.trim(),
      start_time: startTime.trim(),
      duration: duration.trim(),
      room: room,
      price: price,
      movie: movie,
      language: language.trim(),
      subtitles: subtitles.trim(),
      available_seats: Number(availableSeats),
      type: type.trim(),
      price_total: priceTotal,
    };

    console.log('Datos que se enviarán al backend:', projectionData);

    onSave(projectionData);

    if (!isEditing) {
      setDate('');
      setStartTime('');
      setDuration('');
      setRoom(rooms[0]?.id || 0);
      setPrice(prices[0]?.id || 0);
      setMovie(movies[0]?.id || 0);
      setLanguage('');
      setSubtitles('');
      setprojectionType('');
      setAvailableSeats('');
    }
  };

  return (
    <form id="projection-form" onSubmit={handleSubmit} className="projection-form">
      <input
        id="date-input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Fecha"
        required
        className="input-field"
      />

      <input
        id="start-time-input"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="Hora de inicio"
        required
        className="input-field"
      />

      <input
        id="duration-input"
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duración"
        required
        className="input-field"
      />

      <select
        id="room-select"
        value={room}
        onChange={(e) => setRoom(Number(e.target.value))}
        className="w-full p-3 border border-gray-300 rounded-md text-black text-lg"
        required
      >
        {rooms.map((roomOption) => (
          <option key={roomOption.id} value={roomOption.id}>
            {roomOption.name}
          </option>
        ))}
      </select>

      <select
        id="price-select"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full p-3 border border-gray-300 rounded-md text-black text-lg"
        required
      >
        {prices.map((priceOption) => (
          <option key={priceOption.id} value={priceOption.id}>
            {priceOption.name}
          </option>
        ))}
      </select>

      <select
        id="movie-select"
        value={movie}
        onChange={(e) => setMovie(Number(e.target.value))}
        className="w-full p-3 border border-gray-300 rounded-md text-black text-lg"
        required
      >
        {movies.map((movieOption) => (
          <option key={movieOption.id} value={movieOption.id}>
            {movieOption.title}
          </option>
        ))}
      </select>

      <input
        id="language-input"
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="Idioma"
        className="input-field"
      />

      <input
        id="subtitles-input"
        type="text"
        value={subtitles}
        onChange={(e) => setSubtitles(e.target.value)}
        placeholder="Subtítulos"
        className="input-field"
      />

      <input
        id="type-input"
        type="text"
        value={type}
        onChange={(e) => setprojectionType(e.target.value)}
        placeholder="Tipo"
        className="input-field"
      />

      <input
        id="available-seats-input"
        type="number"
        value={availableSeats}
        onChange={(e) => setAvailableSeats(e.target.value)}
        placeholder="Asientos disponibles"
        className="input-field"
      />

      <div id="button-container" className="button-container">
        <Link href="/admin/projection">
          <button id="back-button" type="button" className="btn">
            Volver
          </button>
        </Link>
        <button id="save-button" type="submit" className="btn">
          {isEditing ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default ProjectionForm;
