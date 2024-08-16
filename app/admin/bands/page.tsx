"use client";

import React, { useState, useEffect } from 'react';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import BandForm from '../components/bands/BandForm';
import BandList from '../components/bands/BandList';
import Link from 'next/link';
import { Band, BandAdd } from '../types/bands';
import '../bands/bands.css';

const BandsPage: React.FC = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [editingBand, setEditingBand] = useState<Band | null>(null);

  useEffect(() => {
    fetchBands();
  }, []);

  const fetchBands = async () => {
    try {
      const response = await fetch('http://localhost:8000/band/');
      if (!response.ok) {
        throw new Error('Error fetching bands');
      }
      const data = await response.json();
      setBands(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const addBand = async (band: BandAdd) => {
    try {
      const response = await fetch('http://localhost:8000/band/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(band),
      });
      if (!response.ok) {
        throw new Error('Error adding band');
      }
      const newBand = await response.json();
      setBands([...bands, newBand]);
    } catch (error) {
      console.error('Failed to add band:', error);
    }
  };

  const updateBand = async (band: Band) => {
    try {
      const response = await fetch(`http://localhost:8000/band/${band.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(band),
      });
      if (!response.ok) {
        throw new Error('Error updating band');
      }
      const updatedBand = await response.json();
      setBands(bands.map((a) => (a.id === updatedBand.id ? updatedBand : a)));
    } catch (error) {
      console.error('Failed to update band:', error);
    }
  };

  const deleteBand = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/band/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting band');
      }
      setBands(bands.filter((band) => band.id !== id));
    } catch (error) {
      console.error('Failed to delete band:', error);
    }
  };

  const handleAdd = (band: BandAdd) => {
    addBand(band);
    setEditingBand(null);
  };

  const handleUpdate = (band: BandAdd) => {
    if (editingBand) {
      updateBand({ id: editingBand.id, ...band });
      setEditingBand(null);
    }
  };

  const handleEdit = (band: Band) => {
    console.log("Editing band:", band);
    setEditingBand(band);
  };

  const handleDelete = (id: number) => {
    deleteBand(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="mt-8-title">Bands</h1>
        <BandForm band={editingBand ? { title: editingBand.title, composer: editingBand.composer } : null} onSave={editingBand ? handleUpdate : handleAdd} />
        <BandList bands={bands} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
        <Footer />
    </div>
    
  );
};

export default BandsPage;
