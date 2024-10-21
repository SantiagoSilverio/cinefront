import React from 'react';
import { Room } from '../../types/rooms';

interface RoomListProps {
    rooms: Room[];
    onEdit: (room: Room) => void;
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onEdit, onDelete, onSort, sortColumn, sortOrder }) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th onClick={() => onSort('number_rooms')}>Número de salas {sortColumn === 'number_rooms' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                    <th onClick={() => onSort('seat_capacity')}>Capacidad de asientos {sortColumn === 'seat_capacity' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                    <th onClick={() => onSort('type_screens')}>Tipo de pantallas {sortColumn === 'type_screens' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                    <th onClick={() => onSort('state')}>Estado {sortColumn === 'state' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td>{room.number_rooms}</td>
                        <td>{room.seat_capacity}</td>
                        <td>{room.type_screens}</td>
                        <td>{room.state ? 'Activo' : 'Inactivo'}</td>
                        <td>
                            <button onClick={() => onEdit(room)} className="text-blue-500">Editar</button>
                            <button onClick={() => onDelete(room.id)} className="text-red-500">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RoomList;
