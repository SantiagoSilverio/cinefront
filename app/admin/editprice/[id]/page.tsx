"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import PriceForm from '../../../components/price/PriceForm';
import Link from 'next/link';
import { Price } from '../../../types/price';
import '../../nuevoprice/nuevoprice.css'; // Usa el mismo CSS que para la otra página

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
            const response = await fetch(`https://back-k1a3.onrender.com/price/${priceId}/`);
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
            const response = await fetch(`https://back-k1a3.onrender.com/price/${price.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPrice),
            });
            if (!response.ok) {
                throw new Error('Error updating price');
            }
            router.push('/admin/prices');
        } catch (error) {
            console.error('Failed to update price:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos del precio...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar precio</h1>
                <div className="form-container">
                    {price ? (
                        <PriceForm price={price} onSave={updatePrice} />
                    ) : (
                        <p>No se encontraron datos del precio.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditPricePage;