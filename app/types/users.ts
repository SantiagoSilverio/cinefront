export interface UserAdd {
      username: string;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      password: string;
      address: string;
      city_id: string; // Add this line
  }
  export interface City {
      name: string; // or any other relevant properties
  }
export interface User {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      password: string;
      address: string;
      city_id?: string; // Make sure to add this line
      state?: boolean; // If applicable
      city: City; 
}

