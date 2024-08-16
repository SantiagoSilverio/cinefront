"use client";

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import ProvinceForm from '../../components/province/ProvinceForm';

import { Province, Country, ProvinceAdd } from '../../types/country';

const ProvincePage: React.FC = () => {
      const [provinces, setProvinces] = useState<Province[]>([]);
      const [countrys, setCountrys] = useState<Country[]>([]);
      const [editingProvince, setEditingProvince] = useState<Province | null>(null);

      useEffect(() => {
            fetchProvinces();
            fetchCountrys();
      }, []);

      const fetchProvinces = async () => {
            try {
                  const response = await fetch('http://localhost:8000/province/');
                  if (!response.ok) {
                        throw new Error('Error fetching provinces');
                  }
                  const data = await response.json();
                  setProvinces(Array.isArray(data) ? data : []);
            } catch (error) {
                  console.error(error);
            }
      };

      const fetchCountrys = async () => {
            try {
                  const response = await fetch('http://localhost:8000/country/');
                  if (!response.ok) {
                        throw new Error('Error fetching countrys');
                  }
                  const data = await response.json();
                  setCountrys(Array.isArray(data.results) ? data.results : []);
                  console.log('Fetched countrys:', data.results); // Verificar países
            } catch (error) {
                  console.error(error);
            }
      };

      const addProvince = async (province: ProvinceAdd) => {
            try {
                  const response = await fetch('http://localhost:8000/province/', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              name: province.name,
                              country: province.country, // Enviar el ID del país
                        }),
                  });
                  if (!response.ok) {
                        throw new Error('Error adding province');
                  }
                  const newProvince = await response.json();
                  setProvinces([...provinces, newProvince]);
            } catch (error) {
                  console.error('Failed to add province:', error);
            }
      };

      const updateProvince = async (province: Province) => {
            try {
                  const response = await fetch(`http://localhost:8000/province/${province.id}/`, {
                        method: 'PUT',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              name: province.name,
                              country: province.country.id, 
                        }),
                  });
                  if (!response.ok) {
                        throw new Error('Error updating province');
                  }
                  const updatedProvince = await response.json();
                  setProvinces(provinces.map((p) => (p.id === updatedProvince.id ? updatedProvince : p)));
            } catch (error) {
                  console.error('Failed to update province:', error);
            }
      };



      const deleteProvince = async (id: number) => {
            try {
                  const response = await fetch(`http://localhost:8000/province/${id}/`, {
                        method: 'DELETE',
                  });
                  if (!response.ok) {
                        throw new Error('Error deleting province');
                  }
                  setProvinces(provinces.filter((province) => province.id !== id));
            } catch (error) {
                  console.error('Failed to delete province:', error);
            }
      };

      const handleAdd = (province: ProvinceAdd) => {
            addProvince(province);
            setEditingProvince(null);
      };

      const handleUpdate = (province: Province) => {
            if (province && province.id) {
                  updateProvince(province);
                  setEditingProvince(null);
            }
      };

      const handleEdit = (province: Province) => {
            setEditingProvince(province);
      };

      const handleDelete = (id: number) => {
            deleteProvince(id);
      };

      return (
            <div className="flex flex-col min-h-screen">

                  <h1>Provincias</h1>
                  <ProvinceForm
                        province={editingProvince}
                        countrys={countrys}
                        onSave={editingProvince ? handleUpdate : handleAdd}
                  />
                  <table className="centered-table">
                        <thead>
                              <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>País</th>
                                    <th>Acciones</th>
                              </tr>
                        </thead>
                        <tbody>
                              {provinces.map((province) => (
                                    <tr key={province.id}>
                                          <td>{province.id}</td>
                                          <td>{province.name}</td>
                                          <td>{province.country ? province.country.name : 'País no especificado'}</td>
                                          <td>
                                                <button onClick={() => setEditingProvince(province)}>Editar</button>
                                                <button onClick={() => handleDelete(province.id)}>Eliminar</button>
                                          </td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
                  <Link href="/">
                        <button>Volver</button>
                  </Link>
            </div>
      );
};

export default ProvincePage;
