export interface City {
    id: number;
    name: string;
    postal_code: string;
    prefijo: string;
    province_id: number;
    state: boolean;
}

export interface CityAdd {
    name: string;
    postal_code: string;
    province_id: number;
    prefix: string; // Agregar la propiedad prefix aquí
}
