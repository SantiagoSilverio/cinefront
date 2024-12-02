import React, { useState, useEffect } from 'react';
import { DirectorAdd, Director } from '../../types/director';
import Link from 'next/link';

interface DirectorFormProps {
    director?: Director;
    onSave: (director: DirectorAdd) => void;
}

const DirectorForm: React.FC<DirectorFormProps> = ({ director, onSave }) => {
    const [name, setName] = useState(director ? director.name : '');

    useEffect(() => {
        if (director) {
            setName(director.name);
        }
    }, [director]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="director-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del director"
                required
                className="input-field"
            />

            <div className="button-container1">
                <Link href="/admin/directors">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default DirectorForm;