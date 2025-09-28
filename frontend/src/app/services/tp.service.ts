import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TP, TPRegistration, TPGrade } from '../models/tp.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TpService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Récupérer tous les TPs
  getAllTps(): Observable<TP[]> {
    return this.http.get<TP[]>(`${this.API_URL}/tp`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer un TP par ID
  getTpById(id: number): Observable<TP> {
    return this.http.get<TP>(`${this.API_URL}/tp/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Créer un nouveau TP
  createTp(tp: Partial<TP>): Observable<TP> {
    return this.http.post<TP>(`${this.API_URL}/tp`, tp, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Mettre à jour un TP
  updateTp(id: number, tp: Partial<TP>): Observable<TP> {
    return this.http.put<TP>(`${this.API_URL}/tp/${id}`, tp, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Supprimer un TP
  deleteTp(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/tp/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // S'inscrire à un TP
  registerToTp(tpId: number): Observable<TPRegistration> {
    return this.http.post<TPRegistration>(`${this.API_URL}/tp/${tpId}/register`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Se désinscrire d'un TP
  unregisterFromTp(tpId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/tp/${tpId}/register`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer les inscriptions d'un utilisateur
  getUserRegistrations(): Observable<TPRegistration[]> {
    return this.http.get<TPRegistration[]>(`${this.API_URL}/registrations/user`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer les notes d'un utilisateur
  getUserGrades(): Observable<TPGrade[]> {
    return this.http.get<TPGrade[]>(`${this.API_URL}/grades/user`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Noter un TP (pour les enseignants)
  gradeTp(registrationId: number, grade: number, comment?: string): Observable<TPGrade> {
    const gradeData = {
      grade: grade,
      comment: comment || ''
    };
    
    return this.http.post<TPGrade>(`${this.API_URL}/grades/${registrationId}`, gradeData, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  // Récupérer les TP disponibles par filière
  getAvailableTPsByFiliere(filiereId: number): Observable<TP[]> {
    return this.http.get<TP[]>(`${this.API_URL}/student/tps/filiere/${filiereId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  // Récupérer les TP disponibles par niveau
  getAvailableTPsByNiveau(niveauId: number): Observable<TP[]> {
    return this.http.get<TP[]>(`${this.API_URL}/student/tps/niveau/${niveauId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  // Récupérer les TP disponibles par département
  getAvailableTPsByDepartement(departementId: number): Observable<TP[]> {
    return this.http.get<TP[]>(`${this.API_URL}/student/tps/departement/${departementId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  // Récupérer les TP d'un enseignant
  getTeacherTPs(): Observable<TP[]> {
    return this.http.get<TP[]>(`${this.API_URL}/teacher/tps`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  // Créer un TP (pour les enseignants)
  createTP(tpData: any): Observable<TP> {
    return this.http.post<TP>(`${this.API_URL}/teacher/tps`, tpData, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  // Mettre à jour un TP (pour les enseignants)
  updateTP(tpId: number, tpData: any): Observable<TP> {
    return this.http.put<TP>(`${this.API_URL}/teacher/tps/${tpId}`, tpData, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
