export interface City {
    id: number;
    name: string;
    postal_code: string;
    prefix: string;
    province_id: number;
    state: boolean;
}

export interface CityAdd {
    name: string;
    postal_code: string;
    province: number;
    prefix: string; // Agregar la propiedad prefix aquí
}
