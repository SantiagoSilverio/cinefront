export interface Reservation {
    id: number;
    date_time: string;
    seats_reserved: number;
    state: string;
    id_usu: number; // Foreign key for user
    id_sea: number; // Foreign key for seat
    id_pro: number; // Foreign key for projection
}

export interface ReservationAdd {
    date_time: string;
    seats_reserved: number;
    state: string;
    id_usu: number; // Foreign key for user
    id_sea: number; // Foreign key for seat
    id_pro: number; // Foreign key for projection
}
