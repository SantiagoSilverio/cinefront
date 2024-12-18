"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import CityForm from '../../../components/cities/CityForm'; // Asegúrate de tener este componente
import { City } from '../../../types/cities';
import '../../general.css';

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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/city/${cityId}/`, {
            headers: myHeaders,
            });
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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/city/${city.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedCity),
            });
            if (!response.ok) {
                console.log('Error respuesta servidor:', await response.text());
                throw new Error('Error updating City');
            }
            alert('Ciudad editada con éxito');
            router.push('/admin/cities');
        } catch (error) {
            console.error('Failed to update city:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos de la ciudad...</p>;
    }

    return (
        <div id="edit-city" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar ciudad</h1>
                <div id="edit-form" className="form-container">
                    {city ? (
                        <CityForm key="city-form" city={city} onSave={updateCity} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos de la ciudad.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditCityPage;
