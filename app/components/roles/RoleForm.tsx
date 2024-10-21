import React, { useState, useEffect } from 'react';
import { RoleAdd, Role } from '../../types/roles'; // Asegúrate de que estos tipos estén definidos
import Link from 'next/link';

interface RoleFormProps {
    role?: Role;
    onSave: (role: RoleAdd) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ role, onSave }) => {
    const [name, setName] = useState(role ? role.name : '');

    useEffect(() => {
        if (role) {
            setName(role.name);
        }
    }, [role]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="role-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del rol"
                required
                className="input-field"
            />

            <div className="button-container1">
                <Link href="/admin/roles">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default RoleForm;
