"use client";  // Necesario si este componente maneja eventos en el cliente
import React, { useState, useEffect } from 'react';
import ReservationList from '../../components/reservations/ReservationList';
import Pagination from '../../components/pagination/pagination';
import Link from 'next/link';
import { Reservation } from '../../types/reservations';
import '../general.css';

const ReservationPage: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchReservations(currentPage);
    }, [currentPage]);

    const fetchReservations = async (page: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/reservation/reservation/?page=${page}`);
            const data = await response.json();
            setReservations(data.results || []);
            setTotalPages(Math.ceil(data.count / 10));
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://127.0.0.1:8000/admin/reservation/reservation/${id}/`, {
                method: 'DELETE',
            });
            setReservations(prev => prev.filter(res => res.id !== id));
        } catch (error) {
            console.error('Failed to delete reservation:', error);
        }
    };

    const handleSort = (column: string) => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortColumn(column);
        const sorted = [...reservations].sort((a, b) => {
            if (a[column as keyof Reservation] < b[column as keyof Reservation]) return order === 'asc' ? -1 : 1;
            if (a[column as keyof Reservation] > b[column as keyof Reservation]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setReservations(sorted);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div id="items-page-container" className="flex flex-col min-h-screen">
            <div id="page-container" className="page-container">
                <div id="sidebar-container" className="sidebar-container"></div>
                <div id="content-container" className="content-container">
                    <div id="items-actions" className="reservations-actions">
                        <div id="new-item-button-container" className="new-item-button-container">
                            <Link href="/admin/nuevareservation">
                                <button id="new-item-button" className="new-item-button">
                                    <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                    </svg>
                                </button>
                            </Link>
                            <p id="new-general-text">Nueva Reservación</p>
                        </div>

                        <div id="search-input-container" className="search-input-container">
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Buscar reservación"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <ReservationList
                        reservations={reservations}
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

export default ReservationPage;
