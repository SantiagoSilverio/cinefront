export interface UserAdd {
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      password: string;
      address: string;
      city: string;
      role: string;
}

export interface User {
      id: number;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      password: string;
      address: string;
      city: string;  
      role: string;
      state: boolean;
}