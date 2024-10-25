"use client";

import React, { useState } from 'react';
import CityForm from '../../components/cities/CityForm';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { CityAdd } from '../../types/cities';
import '../newactor/nuevoactor.css';

const NewCityPage: React.FC = () => {
      const [cities, setCities] = useState<CityAdd[]>([]);
      const [error, setError] = useState(null);

      const addCity = async (city: CityAdd) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);
                  myHeaders.append("Content-Type", "application/json");

                  const cityData = {
                        name: city.name,
                        prefix: city.prefix,
                        postal_code: city.postal_code,
                        province: city.province_id,
                  };

                  const response = await fetch('https://back-k1a3.onrender.com/city/', {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(cityData),
                  });
                  
                  if (!response.ok) {
                        throw new Error('Error adding city');
                  }
                  const newCity = await response.json();
                  setCities([...cities, newCity]);
                  alert('Ciudad guardada de manera exitosa');
                  
            } catch (error) {
                  console.error('Failed to add city:', error);
            }
      };

      const handleAdd = (city: CityAdd) => {
            addCity(city);
      };

      return (
            <div className="flex flex-col min-h-screen">
                  <main className="flex-grow container mx-auto p-4">
                        <h1 className="title">Agregar nueva ciudad</h1>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-container">
                              <CityForm onSave={handleAdd} />
                        </div>
                  </main>
            </div>
      );
};

export default NewCityPage;