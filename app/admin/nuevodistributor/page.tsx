"use client";

import React, { useState } from 'react';
import DistributorForm from '../../components/distributors/DistributorForm'; // Ajusta la ruta para distribuidores
import Cookies from 'js-cookie';
import { DistributorAdd } from '../../types/distributors';
import '../nuevodistributor/nuevodistributor.css'; // Usa el mismo CSS

const NewDistributorPage: React.FC = () => {
    const [distributors, setDistributors] = useState<DistributorAdd[]>([]);

    const addDistributor = async (distributor: DistributorAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/distributor/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(distributor),
            });
            if (!response.ok) {
                throw new Error('Error adding distributor');
            }

            const newDistributor = await response.json();
            setDistributors([...distributors, newDistributor]);
            alert('Distribuidor guardado de manera exitosa');
        } catch (error) {
            console.error('Failed to add distributor:', error);
        }
    };

    const handleAdd = (distributor: DistributorAdd) => {
        addDistributor(distributor);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nuevo distribuidor</h1>
                <div className="form-container">
                    <DistributorForm onSave={handleAdd} />
                </div>
            </main>
        </div>
    );
};

export default NewDistributorPage;
