export interface CountryAdd {
      name: string;
}
export interface Country {
      id:number;
      name: string;
      state: boolean;
}

export interface ProvinceAdd {
      name: string;
      country: number;
}
export interface Province {
      id: number;
      name: string;
      country: Country;
      state: Boolean;      
}