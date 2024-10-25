"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProvinceForm from '../../../components/province/ProvinceForm';
import Cookies from 'js-cookie';
import { Province, Country } from '../../../types/country';


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
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch('https://back-k1a3.onrender.com/country/?state=true', {
                headers: myHeaders,
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

    const fetchProvince = async (provinceId: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/province/${provinceId}/`, {
                headers: myHeaders,
            });
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

    const updateProvince = async (updatedProvince: ProvinceAdd) => {
        try {
            if (!province) {
                throw new Error('Province data is not available');
            }
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
    
            const response = await fetch(`https://back-k1a3.onrender.com/province/${province.id}/`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(updatedProvince),
            });
            if (!response.ok) {
                throw new Error('Error updating province');
            }
            alert('Provincia editada con éxito');
            router.push('/admin/province');
        } catch (error) {
            console.error('Failed to update province:', error);
        }
    };
    


    if (loading) {
        return <p>Cargando datos de la provincia...</p>;
    }

    return (
        <div id="edit-province" className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-grow container mx-auto p-4">
                <h1 id="title" className="title">Editar provincia</h1>
                <div id="edit-form" className="form-container">
                    {province ? (
                        <ProvinceForm key="province-form" province={province} onSave={updateProvince} countries={countries} />
                    ) : (
                        <p id="no-data-message">No se encontraron datos de la provincia.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditProvincePage;