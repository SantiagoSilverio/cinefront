"use client";
import React, { useState } from 'react';
import UserForm from '../../components/users/UserForm';
import { UserAdd } from '../../types/users';  
import '../nuevouser/nuevouser.css'; 

const NewUserPage: React.FC = () => {
      const [users, setUsers] = useState<UserAdd[]>([]);

      const addUser = async (user: UserAdd) => {
            try {
                  const response = await fetch('https://back-k1a3.onrender.com/user/', { 
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
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
            <div className="flex flex-col min-h-screen">
                  <main className="flex-grow container mx-auto p-4">
                        <h1 className="title">Agregar nuevo usuario</h1>
                        <div className="form-container">
                              <UserForm onSave={handleAdd} />  {/* Usa el formulario de usuario */}
                        </div>
                  </main>
            </div>
      );
};

export default NewUserPage;
