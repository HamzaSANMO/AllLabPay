import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Grade {
  id?: number;
  registrationId: number;
  tpId: number;
  userId: number;
  grade: number;
  comment?: string;
  gradedBy?: number;
  gradedAt?: Date;
}

export interface GradeRequest {
  registrationId: number;
  grade: number;
  comment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Récupérer toutes les notes d'un utilisateur
  getUserGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.API_URL}/grades/user`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer les notes d'un TP (pour les enseignants)
  getTpGrades(tpId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.API_URL}/grades/tp/${tpId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Noter un TP
  gradeTp(gradeRequest: GradeRequest): Observable<Grade> {
    return this.http.post<Grade>(`${this.API_URL}/grades`, gradeRequest, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Mettre à jour une note
  updateGrade(gradeId: number, grade: number, comment?: string): Observable<Grade> {
    const updateData: any = { grade };
    if (comment !== undefined) {
      updateData.comment = comment;
    }
    
    return this.http.patch<Grade>(`${this.API_URL}/grades/${gradeId}`, updateData, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer une note par ID
  getGradeById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.API_URL}/grades/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Supprimer une note
  deleteGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/grades/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer la moyenne des notes d'un utilisateur
  getUserAverageGrade(): Observable<{ average: number; totalGrades: number }> {
    return this.http.get<{ average: number; totalGrades: number }>(`${this.API_URL}/grades/user/average`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
