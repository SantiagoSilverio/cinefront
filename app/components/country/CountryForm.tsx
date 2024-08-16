"use client";

import React, { useState, useEffect } from 'react';
import { CountryAdd } from '../../types/country';
import Link from 'next/link';

import '../../country/country.css'; // Importa el archivo CSS para aplicar estilos

interface CountryFormProps {
  country: CountryAdd | null;
  onSave: (country: CountryAdd) => void;
}

const CountryForm: React.FC<CountryFormProps> = ({ country, onSave }) => {
  const [name, setName] = useState(country?.name || '');

  useEffect(() => {
    setName(country?.name || '');
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
        <Link href="/country">
          <button className="btn">Cancelar</button>
        </Link>
        <button type="submit" className="submit-button">Guardar</button>
      </div>   
    </form>
  );
};

export default CountryForm;
