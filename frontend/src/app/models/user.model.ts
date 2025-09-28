// frontend/src/app/models/user.model.ts
export interface Filiere {
  id: string;
  name: string;
}

export interface Niveau {
  id: string;
  name: string;
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  matricule?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  filiere?: Filiere;
  speciality?: string;
}
