"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTruckLoading, FaFilm, FaVideo, FaUserTie, FaTheaterMasks, FaMusic, FaUsers, FaCity, FaMapMarkedAlt, FaFlag, FaCashRegister, FaTicketAlt, FaWarehouse } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div id="sidebar" className="bg-[#D5447B] h-[88%] flex flex-col w-16 lg:w-64">
      <div id="sidebar-title" className="text-white font-bold p-4 hidden lg:block">Administración</div>
      <div id="sidebar-menu" className="flex flex-col space-y-1">
        {/* Sección de Películas */}
        <div id="movies-section" className="flex flex-col">
          <button
            id="buttonPeliculas"
            onClick={() => handleToggle('movies')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
          >
            <FaFilm className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Películas</span>
          </button>
          {openSection === 'movies' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="/admin/projections">
                <span id="buttonProjections" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaVideo id="projections-icon"  className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Proyección</span>
                </span>
              </Link>
              <Link href="admin/movies">
                <span id="buttonMovies" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaFilm id="movies-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Películas</span>
                </span>
              </Link>
              <Link href="/admin/directors">
                <span id="buttonDirectors" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaUserTie id="directors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Directores</span>
                </span>
              </Link>
              <Link href="/admin/actors">
                <span id="buttonActors" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaTheaterMasks id="actors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Actores</span>
                </span>
              </Link>
              <Link href="/admin/bands">
                <span id="buttonBands" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaMusic id="bands-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Banda Sonora</span>
                </span>
              </Link>
              <Link href="/admin/distributors">
                <span id="buttonDistributors" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaTruckLoading id="distributors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Distribuidor</span>
                </span>
              </Link>
              <Link href="/admin/rooms">
                <span id="buttonRooms" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaWarehouse id="rooms-icon"  className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Salas</span>
                </span>
              </Link>
            </div>
          )}
        </div>
        {/* Sección de Opciones */}
        <div id="opciones-section"className="flex flex-col">
          <button
            id="buttonOpciones"
            onClick={() => handleToggle('options')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-2 lg:pl-4"
          >
            <FaUsers className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Opciones</span>
          </button>
          {openSection === 'options' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="/admin/users">
                <span id="buttonUsers" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaUsers id="users-icon"  className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Usuarios</span>
                </span>
              </Link>
              <Link href="/admin/cities">
                <span id="buttonCities" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaCity id="cities-icon"  className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Ciudades</span>
                </span>
              </Link>
              <Link href="/admin/province">
                <span id="buttonProvince" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaMapMarkedAlt id="province-icon"   className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Provincias</span>
                </span>
              </Link>
              <Link href="/admin/country">
                <span id="buttonCountry" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaFlag id="country-icon"  className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Países</span>
                </span>
              </Link>
            </div>
          )}
        </div>
        {/* Sección de Ventas */}
        <div id="ventas-section"className="flex flex-col">
          <button
            id="buttonVentas"
            onClick={() => handleToggle('ventas')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
          >
            <FaCashRegister id="ventas-icon"  className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Ventas</span>
          </button>
          {openSection === 'ventas' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="/admin/reservations">
                <span id="buttonReservas" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaTicketAlt id="reservas-icon"  className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Reservas</span>
                </span>
              </Link>
              <Link href="admin/ventas">
                <span id="buttonVentas" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer">
                  <FaCashRegister id="venta-icon"  className="w-5 h-5 mr-2" />
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