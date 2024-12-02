import React, { useState } from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { X } from 'lucide-react';

const TeamMember = ({ name, role, githubLink }) => (
  <div className="bg-pink-50 rounded-lg p-4 mb-3 transition transform hover:scale-[1.02] hover:shadow-md">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-[#D5447B]">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
      <a 
        href={githubLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#D5447B] hover:text-pink-700 transition-colors"
        aria-label={`${name}'s GitHub profile`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
    </div>
  </div>
);

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const teamMembers = [
    { 
      name: "Alejandra Duarte", 
      role: "PM, Backend Developer", 
      githubLink: "https://github.com/duarteale" 
    },
    { 
      name: "Martín Rivira", 
      role: "Frontend Developer", 
      githubLink: "https://github.com/MartinRivira" 
    },
    { 
      name: "Pablo Lezcano", 
      role: "Frontend Developer", 
      githubLink: "https://github.com/pablolezcano1" 
    },
    { 
      name: "Santiago Silverio", 
      role: "UX/UI Designer, Frontend Developer", 
      githubLink: "https://github.com/SantiagoSilverio" 
    },
    { 
      name: "Kevin Muñoz", 
      role: "Backend Developer", 
      githubLink: "https://github.com/kevinfamunoz" 
    }
  ];

  return (
    <footer className="bg-[#D5447B] p-5 w-screen">
      <div className="container mx-auto flex justify-between items-center text-gray-300">
        <div id="logo" className="text-3xl text-white font-bold">
          CINEIMPAR
        </div>

        <div className="text-xl text-center">
          © 2024 CINEIMPAR. Todos los derechos reservados.
        </div>

        <div className="flex flex-col items-center space-y-2">
          <span className="text-white font-bold text-lg">SÍGUENOS</span>
          <div className="flex space-x-4">
            <FaFacebookF
              id="monthly-facebook-icon"
              className="w-10 h-10 cursor-pointer hover:text-blue-800 transition-colors"
              onClick={() => window.open('https://www.facebook.com', '_blank')}
            />
            <FaInstagram
              id="monthly-instagram-icon"
              className="w-10 h-10 cursor-pointer hover:text-pink-700 transition-colors"
              onClick={() => window.open('https://www.instagram.com', '_blank')}
            />
            <button
              className="bg-white text-[#D5447B] font-bold py-2 px-4 rounded hover:bg-gray-300 transition"
              onClick={handleOpenModal}
            >
              Ver Equipo
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-[#D5447B] transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center text-[#D5447B]">
              Nuestro Equipo
            </h2>

            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <TeamMember 
                  key={index}
                  name={member.name}
                  role={member.role}
                  githubLink={member.githubLink}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;