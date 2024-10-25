"use client";

import React, { useState, useEffect } from 'react';
import PriceList from '../../components/price/PriceList';
import Pagination from '../../components/pagination/pagination';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Price } from '../../types/price';
import '../general.css';

const PricePage: React.FC = () => {
    const [prices, setPrices] = useState<Price[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPrices(currentPage);
    }, [currentPage]);

    const fetchPrices = async (page: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/price/?page=${page}&is_active=true`, {
                method: 'GET',
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            setPrices(Array.isArray(data.results) ? data.results : []);
            setTotalPages(Math.ceil(data.count / 10)); // Asumiendo 10 precios por página
        } catch (error) {
            console.error('Failed to fetch price:', error);
        }
    };

    const deletePrice = async (id: number) => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`https://back-k1a3.onrender.com/price/${id}/`, {
                method: 'DELETE',
                headers: myHeaders,
            });
            if (!response.ok) {
                throw new Error('Error deleting price');
            }
            setPrices(prices.map(price => price.id === id ? { ...price, state: false } : price));
        } catch (error) {
            console.error('Failed to delete price:', error);
        }
    };

    const handleEdit = (price: Price) => {
        return (
            <Link href={`/admin/editarprice/${price.id}`}>
                <a>Editar</a>
            </Link>
        );
    };

    const handleDelete = (id: number) => {
        deletePrice(id);
    };

    const handleSearch = () => {
        fetchPrices(currentPage);
    };

    const handleSort = (column: string) => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortColumn(column);
        const sortedPrices = [...prices].sort((a, b) => {
            if (a[column as keyof Price] < b[column as keyof Price]) return order === 'asc' ? -1 : 1;
            if (a[column as keyof Price] > b[column as keyof Price]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setPrices(sortedPrices);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredPrices = prices.filter(price =>
        price.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="item-page-container" className="flex flex-col min-h-screen">
            <div id="page-container" className="page-container">
                <div id="sidebar-container" className="sidebar-container"></div>
                <div id="content-container" className="content-container">
                    <div id="items-actions" className="items-actions">
                        <div id="new-item-button-container" className="new-item-button-container">
                            <Link href="/admin/newprice">
                                <button id="new-item-button" className="new-item-button">
                                    <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                    </svg>
                                </button>
                            </Link>
                            <p id="new-item-text" className="new-item-text">Agregar precio</p>
                        </div>

                        <div id="search-input-container" className="search-input-container">
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Buscar un precio"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <PriceList
                        prices={filteredPrices}
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
                        <button id="btn-volver" className="btn-volver">
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PricePage;