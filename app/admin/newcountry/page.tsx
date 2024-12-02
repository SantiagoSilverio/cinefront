"use client";

import React, { useState } from 'react';
import CountryForm from '../../../components/country/CountryForm';  // Cambiado a CountryForm
import Link from 'next/link';
import Cookies from 'js-cookie';
import { CountryAdd } from '../../../types/country';  // Cambiado a CountryAdd
import './nuevocountry.css';  // Usando el CSS correspondiente para countries

const NewCountryPage: React.FC = () => {
    const [countries, setCountries] = useState<CountryAdd[]>([]);  // Cambiado a countries

    const addCountry = async (country: CountryAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            // Agrega este header para especificar el tipo de contenido
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/country/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({ name: country.name, state: true }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const newCountry = await response.json();
            setCountries([...countries, newCountry]);
            alert('País guardado de manera exitosa');
        } catch (error) {
            console.error('Failed to add country:', error);
        }
    };

    const handleAdd = (country: CountryAdd) => {  // Cambiado a country
        addCountry(country);  // Cambiado a country
    };

    return (
        <div id="new-country-page" className="flex flex-col min-h-screen">
            <main id="new-country-content" className="flex-grow container mx-auto p-4">
                <h1 id="new-country-title" className="title">Agregar nuevo país</h1>  {/* Cambiado el título */}
                <div id="new-country-form-container" className="form-container">
                    <CountryForm onSave={handleAdd} />  {/* Cambiado a CountryForm */}
                </div>
            </main>

        </div>
    );
};

export default NewCountryPage;
