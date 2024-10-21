"use client";

import React, { useState } from 'react';
import ActorForm from '../../components/actors/ActorForm';
import Cookies from 'js-cookie';
import { ActorAdd } from '../../types/actors';
import '../nuevoactor/nuevoactor.css';

const NewActorPage: React.FC = () => {
      const [actors, setActors] = useState<ActorAdd[]>([]);

      const addActor = async (actor: ActorAdd) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);
                  myHeaders.append("Content-Type", "application/json");

                  const response = await fetch('https://back-k1a3.onrender.com/actor/', {
                        method: 'POST',
                        headers: myHeaders,
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
            <div id="new-actor-page" className="flex flex-col min-h-screen">
                  <main id="new-actor-content" className="flex-grow container mx-auto p-4">
                        <h1 id="new-actor-title" className="title">Agregar nuevo actor</h1>
                        <div id="new-actor-form-container" className="form-container">
                              <ActorForm onSave={handleAdd} />
                        </div>
                  </main>

            </div>
      );
};

export default NewActorPage;