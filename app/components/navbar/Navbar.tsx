import React from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa'; 

const Navbar: React.FC = () => {
  const isLoggedIn = true;
  return (
    <nav className="bg-[#D5447B] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold">CINEIMPAR</div>

        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Cartelera
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            Próximos Estrenos
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Club del Cine
          </Link>
        </div>

        <div className="flex items-center">
          {isLoggedIn ? (
            // Si está autenticado, muestra el botón de logout
            <button className="text-gray-300 hover:text-white">
              <FaUser className="inline-block text-xl mr-2" />
              Logout
            </button>
          ) : (
            // Si no está autenticado, muestra el botón de login
            <button className="text-gray-300 hover:text-white">
              <FaUser className="inline-block text-xl mr-2" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
