"use client";
import React, { useState, useEffect } from 'react';
import UserList from '../../components/users/UserList';
import Pagination from '../../components/pagination/pagination';
import Link from 'next/link';
import { User } from '../../types/users';
import './users.css';

const UsersPage: React.FC = () => {
      const [users, setUsers] = useState<User[]>([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [sortColumn, setSortColumn] = useState<string | null>(null);
      const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);

      useEffect(() => {
            fetchUsers(currentPage);
      }, [currentPage]);

      const fetchUsers = async (page: number) => {
            try {
                  const response = await fetch(`https://back-k1a3.onrender.com/user/?page=${page}&is_active=true`);
                  if (!response.ok) {
                        throw new Error('Error fetching users');
                  }
                  const data = await response.json();
                  setUsers(Array.isArray(data.results) ? data.results : []);
                  setTotalPages(Math.ceil(data.count / 10));
            } catch (error) {
                  console.error(error);
            }
      };
      const deleteUser = async (id: number) => {
            try {
                  const response = await fetch(`https://back-k1a3.onrender.com/user/${id}/`, {
                        method: 'PATCH',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ is_active: false })
                  });
                  if (!response.ok) {
                        throw new Error('Error deleting user');
                  }
                  setUsers(users.map(user => user.id === id ? { ...user, is_active: false } : user));
            } catch (error) {
                  console.error('Failed to delete user:', error);
            }
      };
      const handleEdit = (user: User) => {
            return (
                  <Link href={`/admin/editaruser/${user.id}`}>
                        <a>Editar</a>
                  </Link>
            );
      };
      const handleDelete = (id: number) => {
            deleteUser(id);
      };
      const handleSearch = () => {
            fetchUsers(currentPage);
      };
      const handleSort = (column: string) => {
            const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(order);
            setSortColumn(column);
            const sortedUsers = [...users].sort((a, b) => {
                  if (a[column as keyof User] < b[column as keyof User]) return order === 'asc' ? -1 : 1;
                  if (a[column as keyof User] > b[column as keyof User]) return order === 'asc' ? 1 : -1;
                  return 0;
            });
            setUsers(sortedUsers);
      };
      const handlePageChange = (page: number) => {
            setCurrentPage(page);
      };
      const filteredUsers = users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
            <div className="flex flex-col min-h-screen">
                  <div className="page-container">
                        <div className="sidebar-container">
                        </div>
                        <div className="content-container">
                              <div className="users-actions">
                                    <div className="new-user-button-container">
                                          <Link href="/admin/nuevouser">
                                                <button className="new-user-button">
                                                      <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                                      </svg>
                                                </button>
                                          </Link>
                                          <p>Agregar usuario</p>
                                    </div>
                                    <div className="search-input-container">
                                          <input
                                                type="text"
                                                placeholder="Buscar un usuario"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="search-input"
                                          />
                                    </div>
                              </div>
                              <UserList
                                    users={filteredUsers}
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
      );
};
export default UsersPage;