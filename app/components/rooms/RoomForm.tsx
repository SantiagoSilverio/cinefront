import React, { useState, useEffect } from 'react';
import { RoomAdd, Room } from '../../types/rooms';
import Link from 'next/link';

interface RoomFormProps {
  room?: Room;
  onSave: (room: RoomAdd) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSave }) => {
  const [numberRooms, setNumberRooms] = useState(room ? room.number_rooms : 0);
  const [seatCapacity, setSeatCapacity] = useState(room ? room.seat_capacity : 0);
  const [typeScreens, setTypeScreens] = useState(room ? room.type_screens : '');
  const [state, setState] = useState(room ? room.state : true);
  const [cinemaId, setCinemaId] = useState(room ? room.id_cin : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ number_rooms: numberRooms, seat_capacity: seatCapacity, type_screens: typeScreens, state, id_cin: cinemaId });
  };

  return (

        <form onSubmit={handleSubmit} id="general-form">
        <input
          type="number"
          value={numberRooms}
          onChange={(e) => setNumberRooms(parseInt(e.target.value))}
          placeholder="Número de sala"
          required
        id="general-input-field"
        />
        <input
          type="number"
          value={seatCapacity}
          onChange={(e) => setSeatCapacity(parseInt(e.target.value))}
          placeholder="Capacidad de asientos"
          required
                id="general-input-field"
        />
        <input
          type="text"
          value={typeScreens}
          onChange={(e) => setTypeScreens(e.target.value)}
          placeholder="Tipo de pantallas"
          required
                id="general-input-field"
        />
        <input
          type="number"
          value={cinemaId}
          onChange={(e) => setCinemaId(parseInt(e.target.value))}
          placeholder="ID del cine"
          required
                id="general-input-field"
        />

        <div className="button-container">
          <Link href="/admin/rooms">
            <button type="button" className="btn">Cancelar</button>
          </Link>
          <button type="submit" className="btn">Guardar Sala</button>
        </div>
      </form>

  );
};

export default RoomForm;
