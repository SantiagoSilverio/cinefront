import React, { useState, useEffect } from 'react';
import { CinemaAdd, Cinema } from '../../types/cinemas';
import Link from 'next/link';


interface CinemaFormProps {
    cinema?: Cinema;
    onSave: (cinema: CinemaAdd) => void;
}

const CinemaForm: React.FC<CinemaFormProps> = ({ cinema, onSave }) => {
    const [name, setName] = useState(cinema ? cinema.name : '');
    const [address, setAddress] = useState(cinema ? cinema.address : '');
    const [city, setCity] = useState(cinema ? cinema.city : '');
    const [phone, setPhone] = useState(cinema ? cinema.phone : '');
    const [capacity, setCapacity] = useState(cinema ? cinema.capacity : '');

    useEffect(() => {
        if (cinema) {
            setName(cinema.name);
            setAddress(cinema.address);
            setCity(cinema.city);
            setPhone(cinema.phone);
            setCapacity(cinema.capacity);
        }
    }, [cinema]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, address, city, phone, capacity });
        setName('');
        setAddress('');
        setCity('');
        setPhone('');
        setCapacity('');
    };

    return (
        <form onSubmit={handleSubmit} id="general-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo del Cine"
                required
                id="general-input-field"
            />
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Direccion"
                required
                id="general-input-field"
            />
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad"
                required
                id="general-input-field"
            />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Numero de Telefono"
                required
                id="general-input-field"
            />
            <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacidad"
                required
                id="general-input-field"
            />

            <div id="general-button-container">
                <Link href="/admin/cinemas">
                    <button type="button" id="general-btn">Ir a la lista</button>
                </Link>
                <button type="submit" id="general-submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default CinemaForm;
