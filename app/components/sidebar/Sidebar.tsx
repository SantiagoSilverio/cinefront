"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaFilm, FaVideo, FaUserTie, FaTheaterMasks, FaMusic, FaUsers, FaCity, FaMapMarkedAlt, FaFlag, FaCashRegister, FaTicketAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-[#D5447B] h-screen flex flex-col w-16 lg:w-64">
      <div className="text-white font-bold p-4 hidden lg:block">Administración</div>

      <div className="flex flex-col space-y-1">
        {/* Sección de Películas */}
        <div className="flex flex-col">
          <button
            onClick={() => handleToggle('movies')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
          >
            <FaFilm className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Películas</span>
          </button>
          {openSection === 'movies' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="admin/projection">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaVideo className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Proyección</span>
                </span>
              </Link>
              <Link href="admin/movies">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaFilm className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Películas</span>
                </span>
              </Link>
              <Link href="/directors">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaUserTie className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Directores</span>
                </span>
              </Link>
              <Link href="/admin/actors">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaTheaterMasks className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Actores</span>
                </span>
              </Link>
              <Link href="admin/bands">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaMusic className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Banda Sonora</span>
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Sección de Opciones */}
        <div className="flex flex-col">
          <button
            onClick={() => handleToggle('options')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-2 lg:pl-4"
          >
            <FaUsers className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Opciones</span>
          </button>
          {openSection === 'options' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="/admin/users">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaUsers className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Usuarios</span>
                </span>
              </Link>
              <Link href="admin/city">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaCity className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Ciudades</span>
                </span>
              </Link>
              <Link href="admin/province">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaMapMarkedAlt className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Provincias</span>
                </span>
              </Link>
              <Link href="/admin/country">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaFlag className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Países</span>
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Sección de Ventas */}
        <div className="flex flex-col">
          <button
            onClick={() => handleToggle('ventas')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
          >
            <FaCashRegister className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Ventas</span>
          </button>
          {openSection === 'ventas' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="admin/reservations">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaTicketAlt className="w-5 h-5 mr-2 " /> 
                  <span className="hidden lg:block">Reservas</span>
                </span>
              </Link>
              <Link href="admin/ventas">
                <span className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaCashRegister className="w-5 h-5 mr-2" /> 
                  <span className="hidden lg:block">Venta</span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
