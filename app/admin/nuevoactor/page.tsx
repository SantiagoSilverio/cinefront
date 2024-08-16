"use client";

import React, { useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import ActorForm from '../../components/actors/ActorForm';
import Link from 'next/link';
import { ActorAdd } from '../../types/actors';
import '../nuevoactor/nuevoactor.css'; 
const NewActorPage: React.FC = () => {
      const [actors, setActors] = useState<ActorAdd[]>([]);

      const addActor = async (actor: ActorAdd) => {
            try {
                  const response = await fetch('https://back-k1a3.onrender.com/actor/', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(actor),
                  });
                  if (!response.ok) {
                        throw new Error('Error adding actor');
                  }
                  const newActor = await response.json();
                  setActors([...actors, newActor]);
                  alert('Actor guardado de manera exitosa');
            } catch (error) {
                  console.error('Failed to add actor:', error);
            }
      };

      const handleAdd = (actor: ActorAdd) => {
            addActor(actor);
      };

      return (
            <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow container mx-auto p-4">
                        <h1 className="title">Agregar nuevo actor</h1>
                        <div className="form-container">
                              <ActorForm onSave={handleAdd} />
                        </div>
                  </main>

            </div>
      );
};

export default NewActorPage;