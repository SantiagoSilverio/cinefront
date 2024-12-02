import Link from 'next/link';
import { Room } from '../../types/room'; 
import '../../app/admin/general.css';

type RoomListProps = {
    rooms: Room[];
    onEdit: (room: Room) => React.ReactNode;
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
};

const RoomList: React.FC<RoomListProps> = ({ rooms, onEdit, onDelete, onSort, sortColumn, sortOrder }) => {
    return (
        <table id="room-table" className="table-margin table-striped table-centered">
            <thead id="room-table-head">
                <tr>
                    <th id="id-header">
                        ID
                        <button id="id-sort-button" onClick={() => onSort('id')}>
                            {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="name-header">
                        Nombre
                        <button id="name-sort-button" onClick={() => onSort('name')}>
                            {sortColumn === 'name' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="row-header">Fila</th>
                    <th id="number-seat-header">Número de Asientos</th>
                    <th id="type-screens-header">Tipo de Pantalla</th>
                    <th id="cinema-header">Cine</th>
                    <th id="actions-header">Acciones</th>
                </tr>
            </thead>
            <tbody id="room-table-body">
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td id="id-room-row">{room.id}</td>
                        <td id="name-room-row">{room.name}</td>
                        <td id="row-room-row">{room.row}</td>
                        <td id="number-seat-room-row">{room.number_seat}</td>
                        <td id="type-screens-room-row">{room.type_screens}</td>
                        <td id="cinema-room-row">{room.cinema}</td>
                        <td id="action-room-row">
                            <Link href={`/admin/editroom/${room.id}`}>
                                <button id="edit-button" className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button id="delete-button" onClick={() => onDelete(room.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
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
