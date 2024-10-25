"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaFilm,
  FaVideo,
  FaTheaterMasks,
  FaUserTie,
  FaMusic,
  FaTruckLoading,
  FaUsers,
  FaCity,
  FaMapMarkedAlt,
  FaFlag,
  FaCashRegister,
  FaWarehouse,
  FaChair,
  FaShoppingCart,
  FaShoppingBasket,
  FaCalendarAlt,
  FaListAlt,
  FaChartBar
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div id="sidebar" className="bg-[#D5447B] h-[100%] flex flex-col w-16 lg:w-64">
      <div id="sidebar-title" className="text-white font-bold p-4 hidden lg:block">
        <Link href="/admin">
          <span className="cursor-pointer">Administración</span>
        </Link>
      </div>
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
                <span id="buttonProjections" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaVideo id="projections-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Proyecciones</span>
                </span>
              </Link>
              <Link href="admin/movies">
                <span id="buttonMovies" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaFilm id="movies-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Películas</span>
                </span>
              </Link>
              <Link href="/admin/actors">
                <span id="buttonActors" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaTheaterMasks id="actors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Actores</span>
                </span>
              </Link>
              <Link href="/admin/directors">
                <span id="buttonDirectors" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaUserTie id="directors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Directores</span>
                </span>
              </Link>
              <Link href="/admin/bands">
                <span id="buttonBands" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaMusic id="bands-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Bandas Sonoras</span>
                </span>
              </Link>
              <Link href="/admin/distributors">
                <span id="buttonDistributors" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaTruckLoading id="distributors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Distribuidores</span>
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Sección de Usuarios */}
        <div id="users-section" className="flex flex-col">
          <button
            id="buttonUsuarios"
            onClick={() => handleToggle('users')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
          >
            <FaUsers className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Usuarios</span>
          </button>
          {openSection === 'users' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="/admin/users">
                <span id="buttonUsers" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaUsers id="users-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Usuarios</span>
                </span>
              </Link>
              <Link href="/admin/cities">
                <span id="buttonCities" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaCity id="cities-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Ciudades</span>
                </span>
              </Link>
              <Link href="/admin/province">
                <span id="buttonProvince" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaMapMarkedAlt id="province-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Provincias</span>
                </span>
              </Link>
              <Link href="/admin/country">
                <span id="buttonCountry" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaFlag id="country-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Países</span>
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Sección de Cine */}
        <div id="cine-section" className="flex flex-col">
          <button
            id="buttonCine"
            onClick={() => handleToggle('cine')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
          >
            <FaWarehouse className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Cine</span>
          </button>
          {openSection === 'cine' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="/admin/price">
                <span id="buttonPrices" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaCashRegister id="prices-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Precios</span>
                </span>
              </Link>
              <Link href="/admin/seats">
                <span id="buttonSeats" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaChair id="seats-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Butacas</span>
                </span>
              </Link>
              <Link href="/admin/rooms">
                <span id="buttonRooms" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaWarehouse id="rooms-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Salas</span>
                </span>
              </Link>
              <Link href="/admin/branches">
                <span id="buttonBranches" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaCity id="branches-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Sucursales</span>
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Sección de Ventas */}
        <div id="ventas-section" className="flex flex-col">
          <button
            id="buttonVentas"
            onClick={() => handleToggle('ventas')}
            className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
          >
            <FaShoppingCart className="w-7 h-7" />
            <span className="ml-2 hidden lg:block">Ventas</span>
          </button>
          {openSection === 'ventas' && (
            <div className="flex flex-col space-y-1 pl-4">
              <Link href="/admin/sales">
                <span id="buttonSales" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaShoppingBasket id="sales-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Ventas</span>
                </span>
              </Link>
              <Link href="/admin/reserves">
                <span id="buttonReserves" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaCalendarAlt id="reserves-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Reservas</span>
                </span>
              </Link>
              <Link href="/admin/closure">
                <span id="buttonCashClosure" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaCashRegister id="cash-closure-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Cierre de Caja</span>
                </span>
              </Link>
              <Link href="/admin/daily">
                <span id="buttonSalesList" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaListAlt id="sales-list-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Listado de Ventas</span>
                </span>
              </Link>
              <Link href="/admin/monthly">
                <span id="buttonMonthlySales" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaChartBar id="monthly-sales-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Ventas Mensuales</span>
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