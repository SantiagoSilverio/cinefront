"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProvinceForm from '../../../components/province/ProvinceForm';
import Link from 'next/link';
import { Province, Country } from '../../../types/country';
import '../../nuevoprovince/nuevoprovince.css';

const EditProvincePage: React.FC = () => {
    const router = useRouter();
    const [provinceId, setProvinceId] = useState<number | null>(null);
    const [province, setProvince] = useState<Province | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        if (id && !isNaN(Number(id))) {
            setProvinceId(parseInt(id, 10));
        } else {
            setLoading(false);
        }
        fetchCountries();
    }, []);

    useEffect(() => {
        if (provinceId) {
            fetchProvince(provinceId);
        }
    }, [provinceId]);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://back-k1a3.onrender.com/country/?state=true');
            if (!response.ok) {
                throw new Error('Error fetching countries');
            }
            const data = await response.json();
            setCountries(data.results);
        } catch (error) {
            console.error('Failed to fetch countries:', error);
        }
    };

    const fetchProvince = async (provinceId: number) => {
        try {
            const response = await fetch(`https://back-k1a3.onrender.com/province/${provinceId}/`);
            if (!response.ok) {
                throw new Error('Error fetching province');
            }
            const data: Province = await response.json();
            setProvince(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch province:', error);
            setLoading(false);
        }
    };

    const updateProvince = async (updatedProvince: Partial<Province>) => {
        try {
            if (!province) {
                throw new Error('Province data is not available');
            }
            const response = await fetch(`https://back-k1a3.onrender.com/province/${province.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProvince),
            });
            if (!response.ok) {
                throw new Error('Error updating province');
            }
            router.push('/admin/province');
        } catch (error) {
            console.error('Failed to update province:', error);
        }
    };

    if (loading) {
        return <p>Cargando datos de la provincia...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-4">
                <h1 className="title">Editar provincia</h1>
                <div className="form-container">
                    {province ? (
                        <ProvinceForm province={province} onSave={updateProvince} countries={countries} />
                    ) : (
                        <p>No se encontraron datos de la provincia.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditProvincePage;