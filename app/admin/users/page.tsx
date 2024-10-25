"use client";
import React, { useState, useEffect } from 'react';
import UserList from '../../components/users/UserList';
import Pagination from '../../components/pagination/pagination';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { User } from '../../types/users';
import '../general.css';

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
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);

                  const response = await fetch(`https://back-k1a3.onrender.com/user/?page=${page}&is_active=true`, {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                  });

                  if (!response.ok) {
                        throw new Error('Error fetching users');
                  }

                  const data = await response.json();
                  console.log(data.results);
                  setUsers(Array.isArray(data.results) ? data.results : []);
                  setTotalPages(Math.ceil(data.count / 10));
            } catch (error) {
                  console.error(error);
            }
      };

      const deleteUser = async (id: number) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);

                  const response = await fetch(`https://back-k1a3.onrender.com/user/${id}/`, {
                        method: 'PATCH',
                        headers: {
                              'Content-Type': 'application/json',
                              ...myHeaders
                        },
                        body: JSON.stringify({ is_active: false })
                  });

                  if (!response.ok) {
                        throw new Error('Error deleting user');
                  }

                  setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            } catch (error) {
                  console.error('Failed to delete user:', error);
            }
      };
      const handleEdit = (user: User) => {
            window.location.href = `/admin/editaruser/${user.id}`;
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
        
            if (users.length > 0 && column in users[0]) {
                const sortedUsers = [...users].sort((a, b) => {
                    const aValue = a[column as keyof User] ?? ''; // Fallback to '' if undefined
                    const bValue = b[column as keyof User] ?? ''; // Fallback to '' if undefined
        
                    if (aValue < bValue) return order === 'asc' ? -1 : 1;
                    if (aValue > bValue) return order === 'asc' ? 1 : -1;
                    return 0;
                });
        
                setUsers(sortedUsers);
            } else {
                console.warn(`Invalid column: ${column}`);
            }
        };
        
        
      const handlePageChange = (page: number) => {
            setCurrentPage(page);
      };
      const filteredUsers = users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(users);

      return (
            <div id="items-page-container" className="flex flex-col min-h-screen">
                  <div id="page-container" className="page-container">
                        <div id="sidebar-container" className="sidebar-container"></div>
                        <div id="content-container" className="content-container">
                              <div id="items-actions" className="users-actions">
                                    <div id="new-item-button-container" className="new-item-button-container">
                                          <Link href="/admin/newuser">
                                                <button id="new-item-button" className="new-item-button">
                                                      <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                                      </svg>
                                                </button>
                                          </Link>
                                          <p id="new-general-text">Agregar usuario</p>
                                    </div>

                                    <div id="search-input-container" className="search-input-container">
                                          <input
                                                id="search-input"
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


                              <Link href="/admin">
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