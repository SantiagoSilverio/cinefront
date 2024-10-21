"use client";

import React, { useState, useEffect } from 'react';
import RoomList from '../../components/room/RoomList';
import Pagination from '../../components/pagination/pagination'; 
import Link from 'next/link';
import { Room } from '../../types/room'; 
import '../general.css';

const RoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage]);

  const fetchRooms = async (page: number) => {
    try {
      const response = await fetch(`https://back-k1a3.onrender.com/room/?page=${page}&state=true`);
      if (!response.ok) {
        throw new Error('Error fetching rooms');
      }
      const data = await response.json();
      setRooms(Array.isArray(data.results) ? data.results : []);
      setTotalPages(Math.ceil(data.count / 10)); // Suponiendo 10 salas por página
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRoom = async (id: number) => {
    try {
        const response = await fetch(`https://back-k1a3.onrender.com/room/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state: false }) // Desactivar sala
        });
        if (!response.ok) {
            throw new Error('Error deleting room');
        }
        
        // Actualiza las salas con el tipo correcto
        setRooms(prevRooms =>
            prevRooms.map(room =>
                room.id === id ? { ...room, state: false } as Room : room // Asegúrate de que sea del tipo Room
            )
        );
    } catch (error) {
        console.error('Failed to delete room:', error);
    }
};


  const handleEdit = (room: Room) => {
    return (
      <Link href={`/admin/editroom/${room.id}`}>
        <a>Editar</a>
      </Link>
    );
  };

  const handleDelete = (id: number) => {
    deleteRoom(id);
  };

  const handleSearch = () => {
    fetchRooms(currentPage);
  };

  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    setSortColumn(column);
    const sortedRooms = [...rooms].sort((a, b) => {
      if (a[column as keyof Room] < b[column as keyof Room]) return order === 'asc' ? -1 : 1;
      if (a[column as keyof Room] > b[column as keyof Room]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setRooms(sortedRooms);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredRooms = rooms.filter(room =>
    room.number_rooms.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="page-container">
        <div className="content-container">
          <div className="rooms-actions">
            <div className="new-room-button-container">
              <Link href="/admin/nuevoroom">
                <button className="new-room-button">
                  {/* Botón para agregar sala */}
                  <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                  </svg>
                </button>
              </Link>
              <p>Agregar Sala</p>
            </div>

            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar una sala"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <RoomList
            rooms={filteredRooms}
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
            <button className="btn-volver">
              Volver
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;