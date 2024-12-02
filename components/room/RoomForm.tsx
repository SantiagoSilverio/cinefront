import { RoomAdd } from '../../types/room';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface RoomFormProps {
  room?: RoomAdd;  
  onSave: (room: RoomAdd) => void;  
  cinemas: { id: number; name: string }[]; 
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSave, cinemas }) => {

  const [name, setName] = useState(room?.name || '');
  const [row, setRow] = useState<string>(room?.row || '');
  const [numberSeat, setNumberSeat] = useState<string>(room?.number_seat || '');
  const [cinema, setCinema] = useState<number>(room?.cinema || cinemas[0]?.id || 0);
  const [typeScreens, setTypeScreens] = useState<string>(room?.type_screens || ''); 
  const isEditing = !!room; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !row.trim() || !numberSeat.trim()) {
      alert('Por favor, rellene todos los campos correctamente');
      return;
    }

    const roomData: RoomAdd = {
      name,
      row: row.trim(),
      number_seat: numberSeat.trim(),
      type_screens: typeScreens.trim(),
      cinema: cinema,
    };
    console.log('Datos que se enviarán al backend:', roomData);

    onSave(roomData);

    
    if (!isEditing) {
      setName('');
      setRow('');
      setNumberSeat('');
      setCinema(cinemas[0]?.id || 0);
      setTypeScreens('');
    }
  };

  if (!Array.isArray(cinemas) || cinemas.length === 0) {
    return <p>Cargando cines...</p>;
  }

  return (
    <form id="room-form" onSubmit={handleSubmit} className="room-form">
      <input
        id="room-name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la sala"
        required
        className="input-field"
      />

      <input
        id="room-row-input"
        type="text"
        value={row}
        onChange={(e) => setRow(e.target.value)}
        placeholder="Número de filas"
        required
        className="input-field"
      />

      <input
        id="room-number-seat-input"
        type="text"
        value={numberSeat}
        onChange={(e) => setNumberSeat(e.target.value)}
        placeholder="Número de asientos"
        required
        className="input-field"
      />

      <input
        id="type-screens-input"
        type="text"
        value={typeScreens}
        onChange={(e) => setTypeScreens(e.target.value)}
        placeholder="Tipo de pantalla"
        required
        className="input-field"
      />

      <select
        id="cinema-select"
        value={cinema}
        onChange={(e) => setCinema(Number(e.target.value))}
        className="w-full p-3 border border-gray-300 rounded-md text-black text-lg"
        required
      >
        {cinemas.map((cinemaOption) => (
          <option key={cinemaOption.id} value={cinemaOption.id}>
            {cinemaOption.name}
          </option>
        ))}
      </select>

      <div id="button-container" className="button-container">
        <Link href="/admin/room">
          <button id="back-button" type="button" className="btn">
            Ir a la lista
          </button>
        </Link>
        <button id="save-button" type="submit" className="submit-button">
          {isEditing ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
