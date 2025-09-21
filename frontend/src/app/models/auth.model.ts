export interface RegisterDto {
  email: string;
  matricule: string;
  nom: string;
  prenom: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDto {
  emailOrMatricule: string;
  password: string;
}

export interface JwtResponse {
  token: string;
  user: User;
}

export interface User {
  id?: number;
  email: string;
  matricule: string;
  nom: string;
  prenom: string;
  role: string;
  departement?: string;
  grade?: string;
  filiere?: {
    id: number;
    nom: string;
    code: string;
  };
  niveau?: {
    id: number;
    nom: string;
    code: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
