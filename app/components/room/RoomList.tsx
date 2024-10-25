import Link from 'next/link';
import { Room } from '../../types/room';  // Asegúrate de tener este tipo definido
import '../../admin/general.css';

type RoomListProps = {
  rooms: Room[];
  onEdit: (room: Room) => React.ReactNode;
  onDelete: (id: number) => void;
  onSort: (column: string) => void;
  sortColumn: string | null;
  sortOrder: 'asc' | 'desc';
};

const RoomList: React.FC<RoomListProps> = ({ rooms, onDelete, onSort, sortColumn, sortOrder }) => {
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
            Número de Sala
            <button onClick={() => onSort('number_rooms')}>
              {sortColumn === 'number_rooms' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
            </button>
          </th>
          <th>
            Capacidad de Asientos
            <button onClick={() => onSort('seat_capacity')}>
              {sortColumn === 'seat_capacity' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
            </button>
          </th>
          <th>
            Tipo de Pantallas
            <button onClick={() => onSort('type_screens')}>
              {sortColumn === 'type_screens' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
            </button>
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.id}>
            <td>{room.id}</td>
            <td>{room.number_rooms}</td>
            <td>{room.seat_capacity}</td>
            <td>{room.type_screens}</td>
            <td>
              <Link href={`/admin/editroom/${room.id}`}>
                <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                  Editar
                </button>
              </Link>
              <button onClick={() => onDelete(room.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomList;