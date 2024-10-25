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

    return (
        <form onSubmit={handleSubmit} className="province-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la provincia"
                required
                className="input-field"
            />
            <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                required
                className="input-field"
            >
                <option value="">Seleccione un país</option>
                {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>

            <div className="button-container1">
                <Link href="/admin/province">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default ProvinceForm;