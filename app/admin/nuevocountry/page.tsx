"use client";

import React, { useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import CountryForm from '../../components/country/CountryForm';  // Cambiado a CountryForm
import Link from 'next/link';
import { CountryAdd } from '../../types/country';  // Cambiado a CountryAdd
import '../nuevocountry/nuevocountry.css';  // Usando el CSS correspondiente para countries

const NewCountryPage: React.FC = () => {
    const [countries, setCountries] = useState<CountryAdd[]>([]);  // Cambiado a countries

    const addCountry = async (country: CountryAdd) => {  // Cambiado a country
        try {
            const response = await fetch('https://back-k1a3.onrender.com/country/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(country),  // Cambiado a country
            });
            if (!response.ok) {
                throw new Error('Error adding country');
            }
            const newCountry = await response.json();
            setCountries([...countries, newCountry]);  // Cambiado a countries y newCountry
            alert('País guardado de manera exitosa');  // Cambiado el mensaje
        } catch (error) {
            console.error('Failed to add country:', error);  // Cambiado a country
        }
    };

    const handleAdd = (country: CountryAdd) => {  // Cambiado a country
        addCountry(country);  // Cambiado a country
    };

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nuevo país</h1>  {/* Cambiado el título */}
                <div className="form-container">
                    <CountryForm onSave={handleAdd} />  {/* Cambiado a CountryForm */}
                </div>
            </main>
            
        </div>
    );
};

export default NewCountryPage;
