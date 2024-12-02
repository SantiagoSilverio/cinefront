"use client";

import React, { useState, useEffect } from 'react';
import ActorList from '../../components/actors/ActorList';
import Pagination from '../../components/pagination/pagination';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Actor } from '../../types/actors';
import '../general.css';

const ActorsPage: React.FC = () => {
      const [actors, setActors] = useState<Actor[]>([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [sortColumn, setSortColumn] = useState<string | null>(null);
      const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);

      useEffect(() => {
            fetchActors(currentPage);
      }, [currentPage]);

      const fetchActors = async (page: number) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);

                  const response = await fetch(`https://back-k1a3.onrender.com/actor/?page=${page}&is_active=true`, {
                        method: 'GET',
                        headers: myHeaders,
                  });
                  if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                  }
                  const data = await response.json();
                  setActors(data.results);
                  setTotalPages(Math.ceil(data.count / 10));
            } catch (error) {
                  console.error('Failed to fetch actors:', error);
            }
      };

      const deleteActor = async (id: number) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);

                  const response = await fetch(`https://back-k1a3.onrender.com/actor/${id}/`, {
                        method: 'DELETE',
                        headers: myHeaders,
                  });
                  if (!response.ok) {
                        throw new Error('Error deleting actor');
                  }
                  setActors(actors.map(actor => actor.id === id ? { ...actor, state: false } : actor));
            } catch (error) {
                  console.error('Failed to delete actor:', error);
            }
      };

      const handleEdit = (actor: Actor) => {
            return (
                  <Link href={`/admin/editaractor/${actor.id}`}>
                        <a>Editar</a>
                  </Link>
            );
      };

      const handleDelete = (id: number) => {
            deleteActor(id);
      };

      const handleSearch = () => {
            fetchActors(currentPage);
      };

      const handleSort = (column: string) => {
            const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(order);
            setSortColumn(column);
            const sortedActors = [...actors].sort((a, b) => {
                  if (a[column as keyof Actor] < b[column as keyof Actor]) return order === 'asc' ? -1 : 1;
                  if (a[column as keyof Actor] > b[column as keyof Actor]) return order === 'asc' ? 1 : -1;
                  return 0;
            });
            setActors(sortedActors);
      };

      const handlePageChange = (page: number) => {
            setCurrentPage(page);
      };

      const filteredActors = actors.filter(actor =>
            actor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
            <div id="items-page-container" className="flex flex-col min-h-screen">
                  <div id="page-container" className="page-container">
                        <div id="sidebar-container" className="sidebar-container"></div>
                        <div id="content-container" className="content-container">

                              <div id="items-actions" className="actors-actions">
                                    <div id="new-item-button-container" className="new-item-button-container">
                                          <Link href="/admin/newactor">
                                                <button id="new-item-button" className="new-item-button">
                                                      <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                                      </svg>
                                                </button>
                                          </Link>
                                          <p id="new-general-text">Agregar actor</p>
                                    </div>

                                    <div id="search-input-container" className="search-input-container">
                                          <input
                                                type="text"
                                                id="search-input"
                                                placeholder="Buscar un actor"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="search-input"
                                          />
                                    </div>
                              </div>

                              <ActorList
                                    actors={filteredActors}
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

export default ActorsPage;
