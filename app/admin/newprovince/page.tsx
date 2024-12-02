"use client";

import React, { useState, useEffect } from 'react';
import ProvinceForm from '../../../components/province/ProvinceForm';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { ProvinceAdd, Country } from '../../../types/country';
import '../general.css';

const NewProvincePage: React.FC = () => {
    const [provinces, setProvinces] = useState<ProvinceAdd[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch('https://back-k1a3.onrender.com/country/?is_active=true', {
                method: 'GET',
                headers: myHeaders
            });
            if (!response.ok) {
                throw new Error('Error fetching countries');
            }
            const data = await response.json();
            setCountries(data.results);
        } catch (error) {
            console.error('Failed to fetch countries:', error);
        }
    };

    const addProvince = async (province: ProvinceAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/province/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(province),
            });
            if (!response.ok) {
                throw new Error('Error adding province');
            }
            const newProvince = await response.json();
            setProvinces([...provinces, newProvince]);
            alert('Provincia guardada de manera exitosa');
        } catch (error) {
            console.error('Failed to add province:', error);
        }
    };

    const handleAdd = (province: ProvinceAdd) => {
        addProvince(province);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nueva provincia</h1>
                <div className="form-container">
                    <ProvinceForm onSave={handleAdd} countries={countries} />
                </div>
            </main>
        </div>
    );
};

export default NewProvincePage;