import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { CityAdd, City } from '../../types/cities';
import Link from 'next/link';

interface Province {
    id: number;
    name: string;
}

interface CityFormProps {
    city?: City;
    onSave: (city: CityAdd) => void;
}

const CityForm: React.FC<CityFormProps> = ({ city, onSave }) => {
    const [name, setName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [provinceId, setProvinceId] = useState<number | ''>('');
    const [prefix, setPrefix] = useState('');
    const [provinces, setProvinces] = useState<Province[]>([]);

    useEffect(() => {
        // Fetch provinces from the API
        const fetchProvinces = async () => {
            try {
                const token = Cookies.get('access_token');
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);
        
                const response = await fetch('https://back-k1a3.onrender.com/province/?state=true', {
                    method: 'GET',
                    headers: myHeaders,
                });
        
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
        
                const data = await response.json();
                setProvinces(Array.isArray(data.results) ? data.results : []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProvinces();

        if (city) {
            setName(city.name);
            setPostalCode(city.postal_code);
            setProvinceId(city.province_id);
            setPrefix(city.prefijo);
        }
    }, [city]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (provinceId === '') {
            alert('ID de la provincia es requerido.');
            return;
        }
        onSave({ name, postal_code: postalCode, province_id: Number(provinceId), prefix });
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setPostalCode('');
        setProvinceId('');
        setPrefix('');
    };

    return (
        <form onSubmit={handleSubmit} className="city-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la ciudad"
                required
                className="input-field"
            />
            <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Código postal"
                required
                className="input-field"
            />
            <select
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value !== '' ? Number(e.target.value) : '')}
                required
                className="input-field"
            >
                <option value="">Seleccione una provincia</option>
                {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                        {province.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="Prefijo"
                required
                className="input-field"
            />

            <div className="button-container1">
                <Link href="/admin/cities">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default CityForm;
