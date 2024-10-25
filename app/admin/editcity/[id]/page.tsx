"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CityForm from '../../../components/cities/CityForm'; // Asegúrate de tener este componente
import { City } from '../../../types/cities';
import '../../newactor/nuevoactor.css'; 

const EditCityPage: React.FC = () => {
    const router = useRouter();
    const [cityId, setCityId] = useState<number | null>(null);
    const [city, setCity] = useState<City | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setCityId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cityId) {
            fetchCity(cityId);
        }
    }, [cityId]);

    const fetchCity = async (cityId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/city/${cityId}/`);
            if (!response.ok) {
                throw new Error('Error fetching city');
            }
            const data: City = await response.json();
            setCity(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch city:', error);
            setLoading(false);
        }
    };

    const updateCity = async (updatedCity: Partial<City>) => {
        try {
            if (!city) {
                throw new Error('City data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/city/${city.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCity),
            });
            if (!response.ok) {
                throw new Error('Error updating city');
            }
            router.push('/admin/cities'); // Cambia a la ruta de la lista de ciudades
        } catch (error) {
            console.error('Failed to update city:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos de la ciudad...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar ciudad</h1>
                <div className="form-container">
                    {city ? (
                        <CityForm city={city} onSave={updateCity} />
                    ) : (
                        <p>No se encontraron datos de la ciudad.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditCityPage;
