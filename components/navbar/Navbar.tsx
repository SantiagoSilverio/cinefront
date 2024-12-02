'use client';

import React from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import '/app/globals.css';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = !!Cookies.get('access_token'); // Comprobar si el usuario está logueado verificando si el token de acceso existe.
  const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual

  const handleLogout = () => {
    // Eliminar los tokens de access y refresh
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    
    // Redirigir al usuario al login o página de inicio
    router.push('/login');
  };

  // Función para comprobar si el link está activo
  const isActive = (path: string) => pathname === path ? 'text-white font-semibold  ' : 'text-gray-300 hover:text-white';

  return (
    <nav id="navbar" className="bg-[#D5447B] p-4 w-screen">
      <div className="container mx-auto flex items-center bg-[#D5447B] justify-between">
        <div id="logo" className="text-white font-bold">CINEIMPAR</div>

        <div id="menu" className="flex space-x-4">
          <Link id="cartelera-link" href="/" className={`${isActive('/')}`}>
            Cartelera
          </Link>
          <Link id="promociones" href="/promociones" className={`${isActive('/promociones')}`}>
            Promociones
          </Link>
          <Link id="club-link" href="/contact" className={`${isActive('/contact')}`}>
            Club del Cine
          </Link>
        </div>

        <div id="auth-menu" className="flex items-center">
          {isLoggedIn ? (
            // Si está autenticado, muestra el botón de logout
            <button id="logout-button" onClick={handleLogout} className="text-gray-300 hover:text-white">
              <FaUser id="logout-icon" className="inline-block text-xl mr-2" />
              Logout
            </button>
          ) : (
            // Si no está autenticado, muestra el botón de login
            <Link id="login-link" href="/login" className="text-gray-300 hover:text-white">
              <FaUser id="login-icon" className="inline-block text-xl mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;