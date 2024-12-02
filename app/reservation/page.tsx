"use client";

import { useState, Fragment, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Movie {
    id: number;
    title: string;
    runtime: number | null;
    poster_path: string;
    backdrop_path: string;
}

const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatsPerRow = 16;

export default function CinemaSeatSelection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const movieId = searchParams.get('id');

    const [ticketTypes, setTicketTypes] = useState<{
        id: number;
        name: string;
        amount: number;
        description?: string
    }[]>([]);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [seatSelectionError, setSeatSelectionError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string>('11/4');
    const [selectedTime, setSelectedTime] = useState<string>('20:00');
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            if (!movieId) {
                setError('No se proporcionó ID de película');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${'caafb95311dcb2fe4da1e916374740c9'}&language=es-ES`
                );

                if (!response.ok) {
                    throw new Error('Error al obtener datos de la película');
                }

                const data = await response.json();
                setMovie(data);
                fetchTicketTypes();
            } catch (error) {
                console.error('Error fetching movie:', error);
                setError('Error al cargar la información de la película');
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId]);

    const fetchTicketTypes = async () => {
        try {
            const token = Cookies.get('access_token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch('https://back-k1a3.onrender.com/price/?is_active=true', {
                method: 'GET',
                headers: myHeaders,
            });

            if (!response.ok) {
                throw new Error('Error al obtener tipos de entradas');
            }

            const data = await response.json();
            console.log('Datos de tipos de entradas:', data);

            if (Array.isArray(data.results)) {
                setTicketTypes(data.results);
            } else {
                throw new Error('La respuesta no contiene un array en results');
            }
        } catch (error) {
            console.error('Error fetching ticket types:', error);
            setError('Error al cargar los tipos de entradas');
        }
    };

    const toggleSeatSelection = (seat: string) => {
        // Calcula el total de entradas seleccionadas
        const totalTickets = ticketTypes.reduce((total, type) => {
            const quantity = quantities[type.id] || 0;
            return total + quantity;
        }, 0);

        setSelectedSeats((prevSelectedSeats) => {
            // Si ya está seleccionado, permite deseleccionar
            if (prevSelectedSeats.includes(seat)) {
                setSeatSelectionError(null);
                return prevSelectedSeats.filter((s) => s !== seat);
            }

            // Si el número de asientos seleccionados es menor que el total de entradas, permite seleccionar
            if (prevSelectedSeats.length < totalTickets) {
                setSeatSelectionError(null);
                return [...prevSelectedSeats, seat];
            }

            // Si se intenta seleccionar más asientos de los permitidos
            setSeatSelectionError(`Solo puedes seleccionar ${totalTickets} asientos`);
            return prevSelectedSeats;
        });
    };

    const handleTicketTypeSelection = (typeId: number, change: 'increase' | 'decrease') => {
        setQuantities(prev => {
            const currentQuantity = prev[typeId] || 0;
            const newQuantity = change === 'increase'
                ? currentQuantity + 1
                : Math.max(0, currentQuantity - 1);

            return {
                ...prev,
                [typeId]: newQuantity
            };
        });
    };

    const handleConfirmation = () => {
        const total = ticketTypes.reduce((acc, type) => {
            const quantity = quantities[type.id] || 0;
            return acc + (type.amount * quantity);
        }, 0);

        const reservationDetails = {
            movieTitle: movie?.title,
            dateTime: `${selectedDay} - ${selectedTime}`,
            seats: selectedSeats.sort().join(', '),
            total: total,
            ticketTypes: ticketTypes.map(type => ({
                name: type.name,
                quantity: quantities[type.id] || 0,
                price: type.amount
            })).filter(ticket => ticket.quantity > 0)
        };

        localStorage.setItem('reservationData', JSON.stringify(reservationDetails));
        router.push('/order');
    };

    const formatRuntime = (minutes: number | null) => {
        if (!minutes) return '';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-teal-600/40 flex items-center justify-center">
                <div className="text-white text-xl">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-teal-600/40 flex items-center justify-center">
                <div className="text-white text-xl">{error}</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-teal-600/40 flex items-center justify-center">
                <div className="text-white text-xl">No se encontró la película</div>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-gradient-to-br from-teal-600/40 to-purple-600/40 p-10">
            <div className="container mx-auto max-w-6xl">
                {/* Header con botón de retorno */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center text-white hover:text-pink-300 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2 group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Atrás
                    </button>
                </div>

                {/* Contenido Principal */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Columna Izquierda - Información de la Película */}
                    <div className="col-span-1 space-y-6">
                        <div className="bg-white/10 rounded-xl p-5">
                            <img
                                src={movie?.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : '/placeholder-movie.jpg'
                                }
                                alt={movie?.title}
                                className="w-full rounded-lg mb-4 shadow-lg"
                            />
                            <h2 className="text-white text-2xl font-bold mb-2">{movie?.title}</h2>
                            <p className="text-white/70 mb-4">
                                {movie?.runtime ? `Duración: ${formatRuntime(movie.runtime)}` : 'Duración no disponible'}
                            </p>

                            {/* Selección de Fecha */}
                            <div className="mb-4">
                                <h3 className="text-white text-lg font-semibold mb-2">Fecha</h3>
                                <div className="flex space-x-2">
                                    {['Hoy', '10/4', '11/4', '12/4'].map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDay(date)}
                                            className={`px-3 py-1 rounded-md text-sm transition-all ${selectedDay === date
                                                ? 'bg-pink-500 text-white'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                                }`}
                                        >
                                            {date}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selección de Hora */}
                            <div>
                                <h3 className="text-white text-lg font-semibold mb-2">Hora</h3>
                                <div className="flex space-x-2">
                                    {['18:00', '20:00', '22:00', '24:00'].map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`px-3 py-1 rounded-md text-sm transition-all ${selectedTime === time
                                                ? 'bg-pink-500 text-white'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Botón de Confirmación */}
                        <div className="mt-28">
                            <button
                                className="w-full max-w-xs mx-auto block py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={selectedSeats.length === 0}
                                onClick={handleConfirmation}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>

                    {/* Columna Derecha - Selección de Asientos y Tipos de Entrada */}
                    <div className="col-span-2 flex flex-col space-y-6">
                        {/* Selección de Asientos */}
                        <div className="bg-white/10 rounded-xl p-5">
                            <div className="text-center mb-4">
                                <div className="h-1 bg-white rounded-full w-2/3 mx-auto mb-2"></div>
                                <p className="text-white text-base font-semibold">Pantalla</p>
                            </div>

                            {/* Grilla de Asientos */}
                            <div className="mx-auto max-w-3xl">
                                <div className="grid grid-cols-[auto_repeat(16,_minmax(0,_1fr))] gap-x-1 gap-y-2">
                                    <div className="col-span-1"></div>
                                    {Array.from({ length: seatsPerRow }, (_, i) => (
                                        <div key={i} className="text-center text-white font-medium text-sm">
                                            {i + 1}
                                        </div>
                                    ))}

                                    {seatRows.map((row) => (
                                        <Fragment key={row}>
                                            <div className="flex items-center justify-center text-white font-medium text-sm pr-3">
                                                {row}
                                            </div>
                                            {Array.from({ length: seatsPerRow }, (_, i) => {
                                                const seatNumber = `${row}${i + 1}`;
                                                const isSelected = selectedSeats.includes(seatNumber);

                                                return (
                                                    <div
                                                        key={seatNumber}
                                                        onClick={() => toggleSeatSelection(seatNumber)}
                                                        className={`
                                                            cursor-pointer
                                                            w-5 h-6
                                                            rounded-t-lg
                                                            transition-colors
                                                            ${isSelected ? 'bg-pink-500' : 'bg-white hover:bg-gray-100'}
                                                        `}
                                                    />
                                                );
                                            })}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tipos de Entrada */}
                        <div className="bg-white/10 rounded-xl p-5">
                            <h3 className="text-white text-xl font-bold mb-4 border-b border-white/20 pb-2 flex justify-between flex-row">
                                Tipos de Entrada

                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white font-semibold text-lg mr-3">Total de Entradas</span>
                                    <span className="text-pink-400 font-bold text-xl">
                                        {ticketTypes.reduce((total, type) => {
                                            const quantity = quantities[type.id] || 0;
                                            return total + quantity;
                                        }, 0)}
                                    </span>
                                </div>

                            </h3>

                            {ticketTypes.map((type) => {
                                const quantity = quantities[type.id] || 0;
                                const subtotal = type.amount * quantity;

                                return (
                                    <div
                                        key={type.id}
                                        className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
                                    >
                                        <div className="flex-grow">
                                            <h4 className="text-white font-semibold text-base">{type.name}</h4>
                                            <p className="text-gray-300 text-sm">${type.amount}</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleTicketTypeSelection(type.id, 'decrease')}
                                                className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </button>
                                            <span className="text-white font-bold text-lg w-6 text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => handleTicketTypeSelection(type.id, 'increase')}
                                                className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="mt-4 pt-2 border-t  border-white/20">

                                <div className="flex justify-between items-center">
                                    <span className="text-white font-semibold text-lg mr-3">Total a Pagar  </span>
                                    <span className="text-pink-400 font-bold text-xl ">
                                        ${ticketTypes.reduce((total, type) => {
                                            const quantity = quantities[type.id] || 0;
                                            return total + (type.amount * quantity);
                                        }, 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}