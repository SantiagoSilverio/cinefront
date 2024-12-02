"use client";
import React, { useState } from 'react';
import UserForm from '../../../components/users/UserForm';
import Cookies from 'js-cookie';
import { UserAdd } from '../../../types/users';
import './nuevouser.css';

const NewUserPage: React.FC = () => {
      const [users, setUsers] = useState<UserAdd[]>([]);

      const addUser = async (user: UserAdd) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);
                  myHeaders.append("Content-Type", "application/json");

                  const response = await fetch('https://back-k1a3.onrender.com/user/', {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(user),
                  });
                  if (!response.ok) {
                        throw new Error('Error adding user');
                  }
                  const newUser = await response.json();
                  setUsers([...users, newUser]);
                  alert('Usuario guardado de manera exitosa');
            } catch (error) {
                  console.error('Failed to add user:', error);
            }
      };

      const handleAdd = (user: UserAdd) => {
            addUser(user);
      };

      return (
            <div id="new-user-page"  className="flex flex-col min-h-screen">
                  <main id="new-user-content"  className="flex-grow container mx-auto p-4">
                        <h1 id="new-user-title" className="title">Agregar nuevo usuario</h1>
                        <div id="new-user-form-container" className="form-container">
                              <UserForm onSave={handleAdd} />  {/* Usa el formulario de usuario */}
                        </div>
                  </main>
            </div>
      );
};

export default NewUserPage;
