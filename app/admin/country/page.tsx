"use client";

import React, { useState, useEffect } from 'react';
import CountryList from '../../components/country/CountryList'; // Ajusta la ruta para subir dos niveles
import Pagination from '../../components/pagination/pagination'; // Ajusta la ruta para subir dos niveles
import Link from 'next/link';
import { Country } from '../../types/country'; // Ajusta la ruta para subir dos niveles
import './country.css';

const CountryPage: React.FC = () => {
      const [countries, setCountries] = useState<Country[]>([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [sortColumn, setSortColumn] = useState<string | null>(null);
      const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);

      useEffect(() => {
            fetchCountries(currentPage);
      }, [currentPage]);

      const fetchCountries = async (page: number) => {
            try {
                  const response = await fetch(`https://back-k1a3.onrender.com/country/?page=${page}&state=true`);
                  if (!response.ok) {
                        throw new Error('Error fetching countries');
                  }
                  const data = await response.json();
                  setCountries(Array.isArray(data.results) ? data.results : []);
                  setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 countries per page
            } catch (error) {
                  console.error(error);
            }
      };

      const deleteCountry = async (id: number) => {
            try {
                  const response = await fetch(`https://back-k1a3.onrender.com/country/${id}/`, {
                        method: 'PATCH', 
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ state: false }) // Cambiar el estado a inactivo
                  });
                  if (!response.ok) {
                        throw new Error('Error deleting country');
                  }
                  setCountries(countries.map(country => country.id === id ? { ...country, state: false } : country));
            } catch (error) {
                  console.error('Failed to delete country:', error);
            }
      };

      const handleEdit = (country: Country) => {
            return (
                  <Link href={`/admin/editarcountry/${country.id}`}>
                        <a>Editar</a>
                  </Link>
            );
      };

      const handleDelete = (id: number) => {
            deleteCountry(id);
      };

      const handleSearch = () => {
            fetchCountries(currentPage);
      };

      const handleSort = (column: string) => {
            const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(order);
            setSortColumn(column);
            const sortedCountries = [...countries].sort((a, b) => {
              if (a[column as keyof Country] < b[column as keyof Country]) return order === 'asc' ? -1 : 1;
              if (a[column as keyof Country] > b[column as keyof Country]) return order === 'asc' ? 1 : -1;
              return 0;
            });
            setCountries(sortedCountries);
      };

      const handlePageChange = (page: number) => {
            setCurrentPage(page);
      };

      const filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
            <div className="flex flex-col min-h-screen">
                  <div className="page-container">
                        <div className="sidebar-container">
                        </div>
                        <div className="content-container">

                              <div className="page-container">
                                    <div className="sidebar-container">
                                    </div>
                                    <div className="content-container">

                                          <div className="countries-actions">
                                                <div className="new-country-button-container">
                                                      <Link href="/admin/nuevocountry">
                                                            <button className="new-country-button">
                                                            <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                                                  </svg>
                                                            </button>
                                                      </Link>
                                                      <p>Agregar país</p>
                                                </div>

                                                <div className="search-input-container">
                                                      <input
                                                            type="text"
                                                            placeholder="Buscar un país"
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            className="search-input"
                                                      />
                                                </div>
                                          </div>

                                          <CountryList
                                                countries={filteredCountries}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                onSort={handleSort}
                                                sortColumn={sortColumn}
                                                sortOrder={sortOrder}
                                          />
                                          <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                          />
                                          <Link href="/">
                                                <button className="bg-gray-300 text-gray-700 rounded-md px-3 py-2 hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300">
                                                      Volver
                                                </button>
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};
export default CountryPage;
