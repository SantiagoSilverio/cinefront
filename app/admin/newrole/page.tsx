"use client";

import React, { useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import RoleForm from '../../components/roles/RoleForm'; // Asegúrate de que este componente exista
import Link from 'next/link';
import { RoleAdd } from '../../types/roles'; // Ajusta la importación según tu estructura
import '../newactor/nuevoactor.css'; // Cambia el nombre del archivo CSS si es necesario

const NewRolePage: React.FC = () => {
    const [roles, setRoles] = useState<RoleAdd[]>([]);

    const addRole = async (role: RoleAdd) => {
        try {
            const response = await fetch('https://back-k1a3.onrender.com/role/', { // Cambia la URL si es necesario
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(role),
            });
            if (!response.ok) {
                throw new Error('Error adding role');
            }
            const newRole = await response.json();
            setRoles([...roles, newRole]);
            alert('Rol guardado de manera exitosa');
        } catch (error) {
            console.error('Failed to add role:', error);
        }
    };

    const handleAdd = (role: RoleAdd) => {
        addRole(role);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nuevo rol</h1>
                <div className="form-container">
                    <RoleForm onSave={handleAdd} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NewRolePage;
