"use client";

import React, { useState, useEffect } from 'react';
import DistributorList from '../../../components/distributors/DistributorList';
import Pagination from '../../../components/pagination/pagination';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Distributor } from '../../../types/distributors';
import '../general.css';

const DistributorsPage: React.FC = () => {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDistributors(currentPage);
  }, [currentPage]);

  const fetchDistributors = async (page: number) => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`https://back-k1a3.onrender.com/distributor/?page=${page}&state=true`, {
        method: 'GET',
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setDistributors(Array.isArray(data.results) ? data.results : []);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDistributor = async (id: number) => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`https://back-k1a3.onrender.com/distributor/${id}/`, {
        method: 'DELETE',
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error('Error deleting distributor');
      }

      setDistributors(distributors.map(distributor => distributor.id === id ? { ...distributor, state: false } : distributor));
    } catch (error) {
      console.error('Failed to delete distributor:', error);
    }
  };

  const handleEdit = (distributor: Distributor) => {
    return (
      <Link href={`/admin/editdistributor/${distributor.id}`}>
        <a>Editar</a>
      </Link>
    );
  };

  const handleDelete = (id: number) => {
    deleteDistributor(id);
  };

  const handleSearch = () => {
    fetchDistributors(currentPage);
  };

  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    setSortColumn(column);
    const sortedDistributors = [...distributors].sort((a, b) => {
      if (a[column as keyof Distributor] < b[column as keyof Distributor]) return order === 'asc' ? -1 : 1;
      if (a[column as keyof Distributor] > b[column as keyof Distributor]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setDistributors(sortedDistributors);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredDistributors = distributors.filter(distributor =>
    distributor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="page-container">
        <div className="sidebar-container">
        </div>
        <div className="content-container">
          <div className="distributors-actions">
            <div className="new-distributor-button-container">
              <Link href="/admin/newdistributor">
                <button className="new-distributor-button">
                  <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                  </svg>
                </button>
              </Link>
              <p>Agregar distribuidor</p>
            </div>

            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar un distribuidor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <DistributorList
            distributors={filteredDistributors}
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

export default DistributorsPage;
