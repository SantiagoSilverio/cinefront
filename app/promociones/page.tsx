'use client';

import React from 'react';
import Link from 'next/link';

interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  fechaValidez: string;
  imagen?: string;
}

const PromocionesPage = () => {
  const promociones: Promocion[] = [
    {
      id: 1,
      titulo: "2x1 en Entradas",
      descripcion: "Todos los martes y miércoles, lleva dos entradas por el precio de una.",
      fechaValidez: "Válido hasta 31/12/2024"
    },
    {
      id: 2,
      titulo: "Combo Familiar",
      descripcion: "4 entradas + 2 combos grandes de pochoclos y bebidas con 25% de descuento.",
      fechaValidez: "Válido hasta 31/12/2024"
    },
    {
      id: 3,
      titulo: "Descuento Estudiantes",
      descripcion: "30% de descuento presentando credencial de estudiante vigente.",
      fechaValidez: "Válido hasta 31/12/2024"
    },
    {
      id: 4,
      titulo: "Happy Hour de viernes",
      descripcion: "30% de descuento en snacks y bebidas de 18:00 a 20:00 hrs.",
      fechaValidez: "Válido hasta 31/12/2024"
    },
    {
      id: 5,
      titulo: "Cumpleañeros",
      descripcion: "Entrada gratis el día de tu cumpleaños presentando documento.",
      fechaValidez: "Válido hasta 31/12/2024"
    },
    {
      id: 6,
      titulo: "Sabado de amor",
      descripcion: "Yendo con tu pareja. 2 entradas + 1 balde de pochocolos con 25% de descuento",
      fechaValidez: "Válido hasta 31/12/2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-8">
        <h1 className="text-3xl font-bold text-[#D5447B] mb-12">Promociones</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {promociones.map((promo) => (
            <div 
              key={promo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4"
            >
              {promo.imagen && (
                <img
                  src="/api/placeholder/400/200"
                  alt={promo.titulo}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {promo.titulo}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {promo.descripcion}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {promo.fechaValidez}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromocionesPage;