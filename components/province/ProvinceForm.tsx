import React, { useState, useEffect } from 'react';
import { ProvinceAdd, Province, Country } from '../../types/country';
import Link from 'next/link';

interface ProvinceFormProps {
    province?: Province;
    countries: Country[];
    onSave: (province: ProvinceAdd) => void;
}

const ProvinceForm: React.FC<ProvinceFormProps> = ({ province, countries, onSave }) => {
    const [name, setName] = useState(province ? province.name : '');
    const [countryId, setCountryId] = useState(province ? province.country.id : '');

    useEffect(() => {
        if (province) {
            setName(province.name);
            setCountryId(province.country.id);
        }
    }, [province]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (countryId === '') {
            alert('Seleccione un país');
            return;
        }
        onSave({ name, country: Number(countryId) });
        if (!province) {
            setName('');
            setCountryId('');
        }
    };

    const inputStyle = {
        color: '#000000'
    };

    return (
        <form onSubmit={handleSubmit} id="general-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la provincia"
                required
                id="general-input-field"
                style={inputStyle}
            />
            <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                required
                id="general-input-field"
                style={inputStyle}
            >
                <option value="">Seleccione un país</option>
                {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>

            <div id="general-button-container">
                <Link href="/admin/province">
                    <button type="button" id="general-btn">Ir a la lista</button>
                </Link>
                <button type="submit" id="general-submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default ProvinceForm;