"use client";

import React, { useState, useEffect } from 'react';

import CountryForm from '../../components/country/CountryForm';
import CountryList from '../../components/country/CountryList';
import { Country, CountryAdd } from '../../types/country';
import '../country/country.css';

const CountrysPage: React.FC = () => {
  const [countrys, setCountrys] = useState<Country[]>([]);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetchCountrys();
  }, []);

  const fetchCountrys = async () => {
    try {
      const response = await fetch('http://localhost:8000/country/');
      if (!response.ok) {
        throw new Error('Error fetching countrys');
      }
      const data = await response.json();
      setCountrys(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const addCountry = async (country: CountryAdd) => {
    try {
      const response = await fetch('http://localhost:8000/country/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(country),
      });
      if (!response.ok) {
        throw new Error('Error adding country');
      }
      const newCountry = await response.json();
      setCountrys([...countrys, newCountry]);
      alert('País guardado de manera exitosa');
    } catch (error) {
      console.error('Failed to add country:', error);
    }
  };

  const updateCountry = async (country: Country) => {
    try {
      const response = await fetch(`http://localhost:8000/country/${country.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(country),
      });
      if (!response.ok) {
        throw new Error('Error updating country');
      }
      const updatedCountry = await response.json();
      setCountrys(countrys.map((a) => (a.id === updatedCountry.id ? updatedCountry : a)));
    } catch (error) {
      console.error('Failed to update country:', error);
    }
  };

  const deleteCountry = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/country/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting country');
      }
      setCountrys(countrys.filter((country) => country.id !== id));
    } catch (error) {
      console.error('Failed to delete country:', error);
    }
  };

  const handleAdd = (country: CountryAdd) => {
    addCountry(country);
    setEditingCountry(null);
  };

  const handleUpdate = (country: CountryAdd) => {
    if (editingCountry) {
      updateCountry({ id: editingCountry.id, name: country.name });
      setEditingCountry(null);
    }
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
  };

  const handleDelete = (id: number) => {
    deleteCountry(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="title">Agregar nuevo país</h1>
        <div className="form-container">
          <CountryForm country={editingCountry ? { name: editingCountry.name } : null} onSave={editingCountry ? handleUpdate : handleAdd} />
        </div>
        <CountryList countrys={countrys} onEdit={handleEdit} onDelete={handleDelete} />
        <div className="button-container">
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CountrysPage;
