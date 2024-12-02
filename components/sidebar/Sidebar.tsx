"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const isActive = (linkPath: string) => pathname === linkPath;

  return (
    <div id="sidebar" className="bg-[#D5447B] h-full flex flex-col w-16 lg:w-64">
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
            <div className="flex flex-col space-y-1 pl-4 pr-4">
              <Link href="/admin/projection">
                <span
                  id="buttonProjections"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md mr-10 ${
                    isActive('/admin/projection') ? 'bg-[#e06da2] text-white ' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <FaVideo id="projections-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Proyecciones</span>
                </span>
              </Link>
              <Link href="/admin/movies">
                <span
                  id="buttonMovies"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/movies') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <FaFilm id="movies-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Películas</span>
                </span>
              </Link>
              <Link href="/admin/actors">
                <span
                  id="buttonActors"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/actors') ?  'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <FaTheaterMasks id="actors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Actores</span>
                </span>
              </Link>
              <Link href="/admin/directors">
                <span
                  id="buttonDirectors"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/directors') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <FaUserTie id="directors-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Directores</span>
                </span>
              </Link>
              <Link href="/admin/bands">
                <span
                  id="buttonBands"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/bands') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <FaMusic id="bands-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Bandas Sonoras</span>
                </span>
              </Link>
              <Link href="/admin/distributors">
                <span
                  id="buttonDistributors"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/distributors') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
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
            <div className="flex flex-col space-y-1 pl-4 pr-4">
              <Link href="/admin/users">
                <span
                  id="buttonUsers"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/users') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <FaUsers id="users-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Usuarios</span>
                </span>
              </Link>



              <Link href="/admin/cities">
                <span id="buttonCities" className="text-gray-300 hover:text-white flex items-center py-2 px-2 cursor-pointer text-xs">
                  <FaCity id="cities-icon"
                  className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/cities') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`} />
                  <span className="hidden lg:block">Ciudades</span>
                </span>
              </Link>
              <Link href="/admin/province">
                <span id="buttonProvince" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/province') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaMapMarkedAlt id="province-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Provincias</span>
                </span>
              </Link>
              <Link href="/admin/country">
                <span id="buttonCountry" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/country') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
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
            <div className="flex flex-col space-y-1 pl-4 pr-4">
              <Link href="/admin/price">
                <span id="buttonPrices" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/price') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaCashRegister id="prices-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Precios</span>
                </span>
              </Link>
              <Link href="/admin/seats">
                <span id="buttonSeats" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/seats') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaChair id="seats-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Butacas</span>
                </span>
              </Link>
              <Link href="/admin/room">
                <span id="buttonRooms" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/room') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaWarehouse id="rooms-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Salas</span>
                </span>
              </Link>
              <Link href="/admin/branches">
                <span id="buttonBranches" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/branches') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
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
                <span id="buttonSales"className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/sales') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaShoppingBasket id="sales-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Ventas</span>
                </span>
              </Link>
              <Link href="/admin/reserves">
                <span id="buttonReserves" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/reserves') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaCalendarAlt id="reserves-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Reservas</span>
                </span>
              </Link>
              <Link href="/admin/closure">
                <span id="buttonCashClosure" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/closure') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaCashRegister id="cash-closure-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Cierre de Caja</span>
                </span>
              </Link>
              <Link href="/admin/daily">
                <span id="buttonSalesList" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/daily') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
                  <FaListAlt id="sales-list-icon" className="w-5 h-5 mr-2" />
                  <span className="hidden lg:block">Listado de Ventas</span>
                </span>
              </Link>
              <Link href="/admin/monthly">
                <span id="buttonMonthlySales" className={`flex items-center py-2 px-2 cursor-pointer text-xs rounded-md ${
                    isActive('/admin/monthly') ? 'bg-[#e06da2] text-white' : 'text-gray-300 hover:text-white'
                  }`}>
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