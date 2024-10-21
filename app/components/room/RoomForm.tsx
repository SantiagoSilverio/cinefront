import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RoomAdd, Room } from '../../types/room'; // Asegúrate de tener este tipo definido

interface RoomFormProps {
  room?: Room;
  onSave: (room: RoomAdd) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSave }) => {
  const [numberRooms, setNumberRooms] = useState(room ? room.number_rooms : '');
  const [seatCapacity, setSeatCapacity] = useState(room ? room.seat_capacity : '');
  const [typeScreens, setTypeScreens] = useState(room ? room.type_screens : '');
  const [cinema, setCinema] = useState(room ? room.cinema : '');

  useEffect(() => {
    if (room) {
      setNumberRooms(room.number_rooms);
      setSeatCapacity(room.seat_capacity);
      setTypeScreens(room.type_screens);
      setCinema(room.cinema);
    }
  }, [room]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      number_rooms: numberRooms,
      seat_capacity: seatCapacity,
      type_screens: typeScreens,
      cinema,
    });
    setNumberRooms('');
    setSeatCapacity('');
    setTypeScreens('');
    setCinema('');
  };

  return (
    <form onSubmit={handleSubmit} className="room-form">
      <input
        type="text"
        value={numberRooms}
        onChange={(e) => setNumberRooms(e.target.value)}
        placeholder="Número de sala"
        required
        className="input-field"
      />
      <input
        type="text"
        value={seatCapacity}
        onChange={(e) => setSeatCapacity(e.target.value)}
        placeholder="Capacidad de asientos"
        required
        className="input-field"
      />
      <input
        type="text"
        value={typeScreens}
        onChange={(e) => setTypeScreens(e.target.value)}
        placeholder="Tipo de pantallas"
        required
        className="input-field"
      />
      <input
        type="text"
        value={cinema}
        onChange={(e) => setCinema(e.target.value)}
        placeholder="Cine"
        required
        className="input-field"
      />
      <div className="button-container1">
        <Link href="/admin/room">
          <button className="btn">Ir a la lista</button>
        </Link>
        <button type="submit" className="submit-button">Guardar</button>
      </div>
    </form>
  );
};

export default RoomForm;