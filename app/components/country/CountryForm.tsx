import React, { useState, useEffect } from 'react';
import { CountryAdd, Country } from '../../types/country';
import Link from 'next/link';

interface CountryFormProps {
    country?: Country;
    onSave: (country: CountryAdd) => void;
}

const CountryForm: React.FC<CountryFormProps> = ({ country, onSave }) => {
    const [name, setName] = useState(country ? country.name : '');

    useEffect(() => {
        if (country) {
            setName(country.name);
        }
    }, [country]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="country-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del país"
                required
                className="input-field"
            />

            <div className="button-container1">
                <Link href="/admin/country">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default CountryForm;
