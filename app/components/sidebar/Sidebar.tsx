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
                                    <FaFilm className="w-6 h-6" />
                                    <span className="ml-2 hidden lg:block">Películas</span>
                              </button>
                              {openSection === 'movies' && (
                                    <div className="flex flex-col space-y-1 pl-4">
                                          <Link href="admin/projection">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaVideo className="w-4 h-4 mr-2" /> Proyección
                                                </span>
                                          </Link>
                                          <Link href="admin/movies">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaFilm className="w-4 h-4 mr-2" /> Películas
                                                </span>
                                          </Link>
                                          <Link href="admin/directors">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaUserTie className="w-4 h-4 mr-2" /> Directores
                                                </span>
                                          </Link>
                                          <Link href="admin/actors">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaTheaterMasks className="w-4 h-4 mr-2" /> Actores
                                                </span>
                                          </Link>
                                          <Link href="admin/bands">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaMusic className="w-4 h-4 mr-2" /> Banda Sonora
                                                </span>
                                          </Link>
                                    </div>
                              )}
                        </div>

                        {/* Sección de Opciones */}
                        <div className="flex flex-col">
                              <button
                                    onClick={() => handleToggle('options')}
                                    className="text-gray-300 hover:text-white flex items-center w-full py-2 px-4 lg:pl-4"
                              >
                                    <FaUsers className="w-6 h-6" />
                                    <span className="ml-2 hidden lg:block">Opciones</span>
                              </button>
                              {openSection === 'options' && (
                                    <div className="flex flex-col space-y-1 pl-4">
                                          <Link href="admin/users">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaUsers className="w-4 h-4 mr-2" /> Usuarios
                                                </span>
                                          </Link>
                                          <Link href="admin/city">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaCity className="w-4 h-4 mr-2" /> Ciudades
                                                </span>
                                          </Link>
                                          <Link href="admin/province">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaMapMarkedAlt className="w-4 h-4 mr-2" /> Provincias
                                                </span>
                                          </Link>
                                          <Link href="admin/country">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaFlag className="w-4 h-4 mr-2" /> Países
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
                                    <FaCashRegister className="w-6 h-6" />
                                    <span className="ml-2 hidden lg:block">Ventas</span>
                              </button>
                              {openSection === 'ventas' && (
                                    <div className="flex flex-col space-y-1 pl-4">
                                          <Link href="admin/reservations">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaTicketAlt className="w-4 h-4 mr-2" /> Reservas
                                                </span>
                                          </Link>
                                          <Link href="admin/ventas">
                                                <span className="text-gray-300 hover:text-white flex items-center py-2 px-4 cursor-pointer">
                                                      <FaCashRegister className="w-4 h-4 mr-2" /> Venta
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
