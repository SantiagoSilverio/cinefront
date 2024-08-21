"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import UserForm from '../../../components/users/UserForm';
import Link from 'next/link';
import { User } from '../../../types/users';
import '../../nuevoactor/nuevoactor.css'; // Usa el mismo CSS que para la otra página

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
                  const response = await fetch(`https://back-k1a3.onrender.com/user/${userId}/`);
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
                  const response = await fetch(`https://back-k1a3.onrender.com/user/${user.id}/`, {
                        method: 'PUT',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUser),
                  });
                  if (!response.ok) {
                        throw new Error('Error updating user');
                  }
                  alert('Usuario actualizado exitosamente');
                  router.push('/admin/users');
            } catch (error) {
                  console.error('Failed to update user:', error);
            }
      };

      if (loading) {
            return <p>Cargando datos del usuario...</p>;
      }

      return (
            <div className="flex flex-col min-h-screen">
                  <main className="flex-grow container mx-auto p-4">
                        <h1 className="title">Editar usuario</h1>
                        <div className="form-container">
                              {user ? (
                                    <UserForm user={user} onSave={updateUser} />
                              ) : (
                                    <p>No se encontraron datos del usuario.</p>
                              )}
                        </div>
                  </main>
            </div>
      );
};

export default EditUserPage;
