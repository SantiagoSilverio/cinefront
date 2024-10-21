export interface Projection {
    id: number;
    date: string; // en formato 'YYYY-MM-DD'
    start_time: string; // en formato 'HH:MM:SS'
    duration: string; // en formato de duración 'HH:MM:SS'
    price_total: number; // número decimal
    language: string;
    subtitles?: string; // opcional
    type: string;
    room: number; // referencia a ID de la sala
    movie: number; // referencia a ID de la película
    price: number; // referencia a ID del precio
    available_seats: number; // cantidad de asientos disponibles
    state: boolean; // activo o inactivo
}

export interface ProjectionAdd {
    date: string;
    start_time: string;
    duration: string;
    price_total: number;
    language: string;
    subtitles?: string;
    type: string;
    room: number;
    movie: number;
    price: number;
    available_seats: number;
    state: boolean;
}
export interface Movie {
    id: number;
    title: string;
    // Otras propiedades de la película
}
