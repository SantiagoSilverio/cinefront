"use client";

import React, { useState } from 'react';
import BandForm from '../../../components/bands/BandForm';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { BandAdd } from '../../../types/bands';
import './nuevabanda.css'; 

const NewBandPage: React.FC = () => {
      const [bands, setBands] = useState<BandAdd[]>([]);

      const addBand = async (band: BandAdd) => {
            try {
                  const token = Cookies.get('access_token');
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization", `Bearer ${token}`);
                  myHeaders.append("Content-Type", "application/json");

                  const response = await fetch('https://back-k1a3.onrender.com/band/', {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(band),
                  });
                  if (!response.ok) {
                        throw new Error('Error adding band');
                  }
                  const newBand = await response.json();
                  setBands([...bands, newBand]);
                  alert('Banda guardada de manera exitosa');
            } catch (error) {
                  console.error('Failed to add band:', error);
            }
      };

      const handleAdd = (band: BandAdd) => {
            addBand(band);
      };

      return (
            <div id="new-band-page" className="flex flex-col min-h-screen">
                  <main id="new-band-content" className="flex-grow container mx-auto p-4">
                        <h1 id="new-band-title" className="title">Agregar nueva banda</h1>
                        <div id="new-band-form-container" className="form-container">
                              <BandForm onSave={handleAdd} />
                        </div>
                  </main>

            </div>
      );
};

export default NewBandPage;
