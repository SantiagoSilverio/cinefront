"use client";
import React, { useState, useEffect } from 'react';
import { ReservationAdd } from '../../types/reservations';
import Link from 'next/link';

interface ReservationFormProps {
    reservation?: ReservationAdd;
    onSave: (reservation: ReservationAdd) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ reservation, onSave }) => {
    const [dateTime, setDateTime] = useState(reservation?.date_time || '');
    const [seatsReserved, setSeatsReserved] = useState(reservation?.seats_reserved || 0);
    const [state, setState] = useState(reservation?.state || '');
    const [userId, setUserId] = useState(reservation?.id_usu || 0);
    const [seatId, setSeatId] = useState(reservation?.id_sea || 0);
    const [projectionId, setProjectionId] = useState(reservation?.id_pro || 0);

    const [users, setUsers] = useState([]);
    const [seats, setSeats] = useState([]);
    const [projections, setProjections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [usersResponse, seatsResponse, projectionsResponse] = await Promise.all([
                fetch('https://back-k1a3.onrender.com/users/'),
                fetch('https://back-k1a3.onrender.com/seats/'),
                fetch('https://back-k1a3.onrender.com/projections/')
            ]);
            const usersData = await usersResponse.json();
            const seatsData = await seatsResponse.json();
            const projectionsData = await projectionsResponse.json();

            setUsers(usersData.results || []);
            setSeats(seatsData.results || []);
            setProjections(projectionsData.results || []);
        };
        fetchData();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            date_time: dateTime,
            seats_reserved: seatsReserved,
            state,
            id_usu: userId,
            id_sea: seatId,
            id_pro: projectionId,
        });
        setDateTime('');
        setSeatsReserved(0);
        setState('');
        setUserId(0);
        setSeatId(0);
        setProjectionId(0);
    };

    return (
        <form onSubmit={handleSubmit} className="reservation-form">
            <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                className="input-field"
                placeholder="Fecha y hora"
            />
            <input
                type="number"
                value={seatsReserved}
                onChange={(e) => setSeatsReserved(Number(e.target.value))}
                required
                className="input-field"
                placeholder="Asientos reservados"
            />
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="input-field"
                placeholder="Estado"
            />

            <select
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                required
                className="input-field"
            >
                <option value="">Seleccionar Usuario</option>
                {users.map((user: any) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            <select
                value={seatId}
                onChange={(e) => setSeatId(Number(e.target.value))}
                required
                className="input-field"
            >
                <option value="">Seleccionar Asiento</option>
                {seats.map((seat: any) => (
                    <option key={seat.id} value={seat.id}>
                        {seat.description}
                    </option>
                ))}
            </select>

            <select
                value={projectionId}
                onChange={(e) => setProjectionId(Number(e.target.value))}
                required
                className="input-field"
            >
                <option value="">Seleccionar Proyección</option>
                {projections.map((projection: any) => (
                    <option key={projection.id} value={projection.id}>
                        {projection.movie_title}
                    </option>
                ))}
            </select>

            <div className="button-container1">
                <Link href="/admin/reservations">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default ReservationForm;
