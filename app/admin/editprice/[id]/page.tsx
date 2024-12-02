"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import PriceForm from '../../../components/price/PriceForm';
import { Price } from '../../../types/price';
import '../../newprice/nuevoprice.css'; // Usa el mismo CSS que para la otra página


const EditPricePage: React.FC = () => {
    const router = useRouter();
    const [priceId, setPriceId] = useState<number | null>(null);
    const [price, setPrice] = useState<Price | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setPriceId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (priceId) {
            fetchPrice(priceId);
        }
    }, [priceId]);

    const fetchPrice = async (priceId: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/price/${priceId}/`, {
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error fetching price');
            }
            const data: Price = await response.json();
            setPrice(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch price:', error);
            setLoading(false);
        }
    };

    const updatePrice = async (updatedPrice: Partial<Price>) => {
        try {
            if (!price) {
                throw new Error('Price data is not available');
            }
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(`https://back-k1a3.onrender.com/price/${price.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedPrice),
            });
            if (!response.ok) {
                throw new Error('Error updating price');
            }
            alert('Precio editado con éxito');
            router.push('/admin/price');
        } catch (error) {
            console.error('Failed to update price:', error);
        }
    };

    if (loading) {
        return <p id="loading-message">Cargando datos del precio...</p>;
    }

    return (
        <div id="edit-price" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar precio</h1>
                <div id="edit-form" className="form-container">
                    {price ? (
                        <PriceForm price={price} onSave={updatePrice} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos del precio.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditPricePage;