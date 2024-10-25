export interface UserAdd {
      username: string;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      password: string;
      address: string;
      city: string;
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
}