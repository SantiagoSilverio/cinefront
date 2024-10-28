export interface User {
    username: string;
    isAdmin?: boolean;
  }
  
  export interface LoginResponse {
    access: string;
    refresh?: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<LoginResponse>;
    logout: () => Promise<void>;
  }