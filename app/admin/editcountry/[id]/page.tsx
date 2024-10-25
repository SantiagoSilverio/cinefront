"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import CountryForm from '../../../components/country/CountryForm';
import Link from 'next/link';
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
            const response = await fetch(`https://back-k1a3.onrender.com/country/${countryId}/`);
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
            const response = await fetch(`https://back-k1a3.onrender.com/country/${country.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCountry),
            });
            if (!response.ok) {
                throw new Error('Error updating country');
            }
            router.push('/admin/countries');
        } catch (error) {
            console.error('Failed to update country:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos del país...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar país</h1>
                <div className="form-container">
                    {country ? (
                        <CountryForm country={country} onSave={updateCountry} />
                    ) : (
                        <p>No se encontraron datos del país.</p>
                    )}
                </div>
            </main>

        </div>
    );
};

export default EditCountryPage;
