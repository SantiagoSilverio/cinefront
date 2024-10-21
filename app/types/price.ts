export interface PriceAdd {
    name: string;
    amount: number;
}

export interface Price {
    id: number;
    name: string;
    amount: number;
    state: boolean;
}