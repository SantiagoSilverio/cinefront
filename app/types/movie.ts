export interface MovieAdd {
    title: string;
    gender: string;
    duration: number;
    synopsis: string;
    rating: string;
    poster: string;
    director_id: number;
    actor_id: number;
    bands_id: number;
    distributor_id: number;
}

export interface Movie {
    id: number;
    title: string;
    gender: string;
    duration: number;
    synopsis: string;
    rating: string;
    state: boolean;
    poster: string;
    director_id: number;
    actor_id: number;
    bands_id: number;
    distributor_id: number;
}