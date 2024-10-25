export interface CountryAdd {
      name: string;
}
export interface Country {
      id:number;
      name: string;
      state: boolean;
}


export interface Province {
      id: number;
      name: string;
      country: Country;
      state: Boolean;      
}

export type ProvinceAdd = {
      name: string;
      countryId: number;
  };