"use client";

import React, { useState } from 'react';
import PriceForm from '../../components/price/PriceForm';
import Cookies from 'js-cookie';
import { PriceAdd } from '../../types/price';
import '../nuevoprice/nuevoprice.css';

const NewPricePage: React.FC = () => {
    const [prices, setPrices] = useState<PriceAdd[]>([]);

    const addPrice = async (price: PriceAdd) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch('https://back-k1a3.onrender.com/price/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(price),
            });
            if (!response.ok) {
                throw new Error('Error adding price');
            }
            const newPrice = await response.json();
            setPrices([...prices, newPrice]);
            alert('Precio guardado de manera exitosa');
        } catch (error) {
            console.error('Failed to add price:', error);
        }
    };

    const handleAdd = (price: PriceAdd) => {
        addPrice(price);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Agregar nuevo precio</h1>
                <div className="form-container">
                    <PriceForm onSave={handleAdd} />
                </div>
            </main>
        </div>
    );
};

export default NewPricePage;