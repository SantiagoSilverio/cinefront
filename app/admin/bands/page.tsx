"use client";

import React, { useState, useEffect } from 'react';
import BandList from '../../../components/bands/BandList'; // Ajusta la ruta
import Pagination from '../../../components/pagination/pagination'; // Ajusta la ruta
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Band } from '../../../types/bands'; // Cambia el import a 'bands'
import '../general.css'; // Cambia la ruta si usas un archivo CSS específico


const BandsPage: React.FC = () => {
    const [bands, setBands] = useState<Band[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBands(currentPage);
    }, [currentPage]);

    const fetchBands = async (page: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/band/?page=${page}&is_active=true`, {
                method: 'GET',
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setBands(Array.isArray(data.results) ? data.results : []);
            setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 bands per page
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const token = Cookies.get('access_token');
            console.log('Token:', token);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/band/${id}/`, {
                method: 'DELETE',
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error deleting banda');
            }
            // Actualiza la lista de bandas después de eliminar
            setBands((prevBands) => prevBands.filter((band) => band.id !== id));
        } catch (error) {
            console.error('Error al eliminar la banda:', error);
        }
    };

    const handleSort = (column: string) => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortColumn(column);
        const sortedBands = [...bands].sort((a, b) => {
            if (a[column as keyof Band] < b[column as keyof Band]) return order === 'asc' ? -1 : 1;
            if (a[column as keyof Band] > b[column as keyof Band]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setBands(sortedBands);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredBands = bands.filter(band =>
        band.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="items-page-container" className="flex flex-col min-h-screen">
            <div id="page-container" className="page-container">
                <div id="sidebar-container" className="sidebar-container">
                </div>
                <div id="content-container" className="content-container">
                    <div id="items-actions" className="items-actions">
                        <div id="new-item-button-container" className="new-item-button-container">
                            <Link href="/admin/newband">
                                <button id="new-item-button" className="new-item-button">
                                    <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                    </svg>
                                </button>
                            </Link>
                            <p>Agregar Banda</p>
                        </div>

                        <div id="search-input-container" className="search-input-container">
                            <input
                                id="search-input"
                                type="text"
                                placeholder="Buscar una banda"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <BandList
                        bands={filteredBands}
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
                        <button id="back-button" className="btn-volver">
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BandsPage;
