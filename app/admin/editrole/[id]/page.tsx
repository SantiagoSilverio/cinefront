"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleForm from '../../../components/roles/RoleForm'; // Asegúrate de tener este componente creado
import { Role } from '../../../types/roles'; // Asegúrate de que este tipo esté definido
import '../../newactor/nuevoactor.css'; // Usa el mismo CSS que para la otra página

const EditRolePage: React.FC = () => {
    const router = useRouter();
    const [roleId, setRoleId] = useState<number | null>(null);
    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setRoleId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (roleId) {
            fetchRole(roleId);
        }
    }, [roleId]);

    const fetchRole = async (roleId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/role/${roleId}/`);
            if (!response.ok) {
                throw new Error('Error fetching role');
            }
            const data: Role = await response.json();
            setRole(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch role:', error);
            setLoading(false);
        }
    };

    const updateRole = async (updatedRole: Partial<Role>) => {
        try {
            if (!role) {
                throw new Error('Role data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/role/${role.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRole),
            });
            if (!response.ok) {
                throw new Error('Error updating role');
            }
            router.push('/roles');
        } catch (error) {
            console.error('Failed to update role:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos del rol...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar rol</h1>
                <div className="form-container">
                    {role ? (
                        <RoleForm role={role} onSave={updateRole} />
                    ) : (
                        <p>No se encontraron datos del rol.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditRolePage;
