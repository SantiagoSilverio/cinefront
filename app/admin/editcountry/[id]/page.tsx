"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import CountryForm from '../../../components/country/CountryForm';
import { Country } from '../../../types/country';
import '../../newcountry/nuevocountry.css'; // Usa el mismo CSS que para la otra página

const EditCountryPage: React.FC = () => {
    const router = useRouter();
    const [countryId, setCountryId] = useState<number | null>(null);
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setCountryId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (countryId) {
            fetchCountry(countryId);
        }
    }, [countryId]);

    const fetchCountry = async (countryId: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/country/${countryId}/`, {
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error fetching country');
            }
            const data: Country = await response.json();
            setCountry(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch country:', error);
            setLoading(false);
        }
    };

    const updateCountry = async (updatedCountry: Partial<Country>) => {
        try {
            if (!country) {
                throw new Error('Country data is not available');
            }
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/country/${country.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedCountry),
            });
            if (!response.ok) {
                throw new Error('Error updating Country');
            }
            alert('País editado con éxito');
            router.push('/admin/country');
        } catch (error) {
            console.error('Failed to update country:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos del país...</p>;
    }

    return (
        <div id="edit-country" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar país</h1>
                <div id="edit-form" className="form-container">
                    {country ? (
                        <CountryForm key="country-form" country={country} onSave={updateCountry} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos del país.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditCountryPage;
