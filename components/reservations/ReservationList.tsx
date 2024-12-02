"use client";  // Asegúrate de que esté aquí, ya que maneja eventos del cliente
import React from 'react';
import { Reservation } from '../../types/reservations';

interface ReservationListProps {
    reservations: Reservation[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations, onDelete, onSort, sortColumn, sortOrder }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => onSort('date_time')}>Fecha y hora</th>
                    <th onClick={() => onSort('seats_reserved')}>Asientos reservados</th>
                    <th onClick={() => onSort('state')}>Estado</th>
                    <th onClick={() => onSort('id_usu')}>Usuario</th>
                    <th onClick={() => onSort('id_sea')}>Asiento</th>
                    <th onClick={() => onSort('id_pro')}>Proyección</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                        <td>{reservation.date_time}</td>
                        <td>{reservation.seats_reserved}</td>
                        <td>{reservation.state}</td>
                        <td>{reservation.id_usu}</td>
                        <td>{reservation.id_sea}</td>
                        <td>{reservation.id_pro}</td>
                        <td>
                            <button onClick={() => onDelete(reservation.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReservationList;
