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
        <form  id="new-country-form" onSubmit={handleSubmit} className="country-form">
            <input
                id="inputName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del país"
                required
                className="input-field"
            />

            <div id="buttonContainer" className="button-container1">
                <Link href="/admin/country">
                    <button id="buttonBack" className="btn">Ir a la lista</button>
                </Link>
                <button id="buttonSave" type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default CountryForm;
