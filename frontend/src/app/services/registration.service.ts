import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Registration {
  id?: number;
  tpId: number;
  userId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  registrationDate?: Date;
  approvalDate?: Date;
  rejectionReason?: string;
}

export interface RegistrationRequest {
  tpId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Récupérer toutes les inscriptions d'un utilisateur
  getUserRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.API_URL}/registrations/user`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // S'inscrire à un TP
  registerToTp(tpId: number): Observable<Registration> {
    const request: RegistrationRequest = { tpId };
    return this.http.post<Registration>(`${this.API_URL}/registrations`, request, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Se désinscrire d'un TP
  unregisterFromTp(registrationId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/registrations/${registrationId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer une inscription par ID
  getRegistrationById(id: number): Observable<Registration> {
    return this.http.get<Registration>(`${this.API_URL}/registrations/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Mettre à jour le statut d'une inscription (pour les enseignants)
  updateRegistrationStatus(id: number, status: string, rejectionReason?: string): Observable<Registration> {
    const updateData: any = { status };
    if (rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    
    return this.http.patch<Registration>(`${this.API_URL}/registrations/${id}/status`, updateData, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer toutes les inscriptions pour un TP (pour les enseignants)
  getTpRegistrations(tpId: number): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.API_URL}/registrations/tp/${tpId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
