"use client";

import React, { useState, useEffect } from 'react'; 
import ProjectionList from '../../../components/projection/ProjectionsList'; 
import Pagination from '../../../components/pagination/pagination';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Projection, Room, Movie, Price } from '../../../types/projection';
import '../general.css';

const ProjectionsPage: React.FC = () => {
  const [projections, setProjections] = useState<Projection[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [prices, setPrices] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Projection | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true); 

 
  useEffect(() => {
    const fetchData = async () => {
      await fetchRooms();
      await fetchMovies();
      await fetchPrices();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rooms.length > 0 && movies.length > 0 && prices.length > 0) {
      fetchProjections(currentPage);
    }
  }, [rooms, movies, prices, currentPage]); 

  const fetchProjections = async (page: number) => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      const response = await fetch(
        `https://back-k1a3.onrender.com/projection/?page=${page}`,
        {
          method: 'GET',
          headers: myHeaders,
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Error ${response.status}: ${errorMessage}`);
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }

      const data = await response.json();
      const projectionsData = data.results;

      // Ahora que sabemos que rooms, movies, y prices están cargados, podemos enriquecer las proyecciones
      const enrichedProjections = projectionsData.map((projection: any) => ({
        ...projection,
        room: rooms.find((room) => room.id === projection.room) || null,
        movie: movies.find((movie) => movie.id === projection.movie) || null,
        price: prices.find((price) => price.id === projection.price) || null,
      }));

      setProjections(enrichedProjections);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error('Failed to fetch projections:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`https://back-k1a3.onrender.com/room/`, {
        method: 'GET',
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setRooms(data.results);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`https://back-k1a3.onrender.com/movie/`, {
        method: 'GET',
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const fetchPrices = async () => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`https://back-k1a3.onrender.com/price/`, {
        method: 'GET',
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setPrices(data.results);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    }
  };

  const deleteProjection = async (id: number) => {
    try {
      const token = Cookies.get('access_token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`https://back-k1a3.onrender.com/projection/${id}/`, {
        method: 'PATCH',
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error('Error deleting projection');
      }
      setProjections(projections.map(projection => projection.id === id ? { ...projection, is_active: false } : projection));
    } catch (error) {
      console.error('Failed to delete projection:', error);
    }
  };

  


      const handleEdit = (projection: Projection) => {
            return (
                  <Link href={`/admin/editprojection/${projection.id}`}>
                        <a>Editar</a>
                  </Link>
            );
      };

      const handleDelete = (id: number) => {
            deleteProjection(id);
      };

      const handleSearch = () => {
            fetchProjections(currentPage);
      };

      const handleSort = (column: keyof Projection) => {
        const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        setSortColumn(column); // column should be of type keyof Projection
        const sortedProjections = [...projections].sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];
    
            if (aValue == null || bValue == null) return 0;
    
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    
        setProjections(sortedProjections);
    };
    
    
    

      const handlePageChange = (page: number) => {
            setCurrentPage(page);
      };

      const filteredProjections = projections.filter(projection =>
            (projection.movie?.title || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      

      return (
            <div id="items-page-container" className="flex flex-col min-h-screen">
                  <div id="page-container" className="page-container">
                        <div id="sidebar-container" className="sidebar-container"></div>
                        <div id="content-container" className="content-container">

                              <div id="items-actions" className="projections-actions">
                                    <div id="new-item-button-container" className="new-item-button-container">
                                          <Link href="/admin/newprojection">
                                                <button id="new-item-button" className="new-item-button">
                                                      <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V10.5H17.5C18.0523 10.5 18.5 10.9477 18.5 11.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H13.5V17.5C13.5 18.0523 13.0523 18.5 12.5 18.5H11.5C10.9477 18.5 10.5 18.0523 10.5 17.5V13.5H6.5C5.94772 13.5 5.5 13.0523 5.5 12.5V11.5C5.5 10.9477 5.94772 10.5 6.5 10.5H10.5V6.5C10.5 5.94772 10.9477 5.5 11.5 5.5H12.5Z" fill="#ffffff"></path>
                                                      </svg>
                                                </button>
                                          </Link>
                                          <p id="new-general-text">Agregar proyección</p>
                                    </div>

                                    <div id="search-input-container" className="search-input-container">
                                          <input
                                                type="text"
                                                id="search-input"
                                                placeholder="Buscar una proyección"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="search-input"
                                          />
                                    </div>
                              </div>

                              <ProjectionList
                                    projections={filteredProjections}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onSort={handleSort}
                                    sortColumn={sortColumn}
                                    sortOrder={sortOrder}
                              />
                              <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                              />
                              <Link href="/">
                                    <button className="back-button">Volver</button>
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default ProjectionsPage;
