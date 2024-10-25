"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import UserForm from '../../../components/users/UserForm';
import { User } from '../../../types/users';

const EditUserPage: React.FC = () => {
      const router = useRouter();
      const [userId, setUserId] = useState<number | null>(null);
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const id = window.location.pathname.split('/').pop();
            if (id && !isNaN(Number(id))) {
                  setUserId(parseInt(id, 10));
            } else {
                  setLoading(false);
            }
      }, []);

      useEffect(() => {
            if (userId) {
                  fetchUser(userId);
            }
      }, [userId]);

      const fetchUser = async (userId: number) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);

                  const response = await fetch(`https://back-k1a3.onrender.com/user/${userId}/`, {
                        headers: myHeaders,
                  });
                  if (!response.ok) {
                        throw new Error('Error fetching user');
                  }
                  const data: User = await response.json();
                  setUser(data);
                  setLoading(false);
            } catch (error) {
                  console.error('Failed to fetch user:', error);
                  setLoading(false);
            }
      };

      const updateUser = async (updatedUser: Partial<User>) => {
            try {
                if (!user) {
                    throw new Error('User data is not available');
                }
                
                // Check if `updatedUser.city` exists and is a string or number
                const updatedUserData = { 
                    ...updatedUser, 
                    city_id: typeof updatedUser.city === 'string' || typeof updatedUser.city === 'number' ? updatedUser.city : undefined 
                };
        
                const token = Cookies.get('access_token');
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);
                myHeaders.append("Content-Type", "application/json");
        
                const response = await fetch(`https://back-k1a3.onrender.com/user/${user.id}/`, {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(updatedUserData),
                });
                if (!response.ok) {
                    throw new Error('Error updating User');
                }
                alert('Usuario actualizado exitosamente');
                router.push('/admin/users');
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        };
        
        
        

      if (loading) {
            return <p id="loading-message">Cargando datos del usuario...</p>;
      }

      return (
            <div id="edit-band"  className="flex flex-col min-h-screen">
                  <main id="main-content" className="flex-grow container mx-auto p-4">
                        <h1 id="title" className="title">Editar usuario</h1>
                        <div id="edit-form"  className="form-container">
                              {user ? (
                                    <UserForm key="user-form" user={user} onSave={updateUser} />
                              ) : (
                                    <p id="no-data-message">No se encontraron datos del usuario.</p>
                              )}
                        </div>
                  </main>
            </div>
      );
};

export default EditUserPage;
