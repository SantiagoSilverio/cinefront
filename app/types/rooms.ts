// types/rooms.ts
export interface Room {
    id: number;
    number_rooms: number;
    seat_capacity: number;
    type_screens: string;
    state: boolean;
    id_cin: number;  // Foreign key to cinema
}

  
export interface RoomAdd {
  number_rooms: number;
  seat_capacity: number;
  type_screens: string;
  state: boolean;
  id_cin: number; // Asegúrate de que esto esté presente
}

  