import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TP } from '../../shared/components/tp-card/tp-card.component';

export interface TpFilter {
  filiere?: string;
  niveau?: string;
  matiere?: string;
  status?: string;
  enseignantId?: number;
  search?: string;
}

export interface TpCreateRequest {
  titre: string;
  description: string;
  matiereId: number;
  filiereId: number;
  niveauId: number;
  dateLimite: string;
  prix: number;
  placesTotales: number;
  instructions?: string;
}

export interface TpUpdateRequest extends Partial<TpCreateRequest> {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class TpService {

  constructor(private http: HttpClient) {}

  // Récupérer tous les TPs avec filtres
  getTps(filters?: TpFilter): Observable<TP[]> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof TpFilter];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<TP[]>(`${environment.apiUrl}/tps`, { params });
  }

  // Récupérer un TP par ID
  getTpById(id: number): Observable<TP> {
    return this.http.get<TP>(`${environment.apiUrl}/tps/${id}`);
  }

  // Créer un nouveau TP (Enseignants/Admins)
  createTp(tpData: TpCreateRequest): Observable<TP> {
    return this.http.post<TP>(`${environment.apiUrl}/tps`, tpData);
  }

  // Mettre à jour un TP
  updateTp(tpData: TpUpdateRequest): Observable<TP> {
    return this.http.put<TP>(`${environment.apiUrl}/tps/${tpData.id}`, tpData);
  }

  // Supprimer un TP
  deleteTp(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tps/${id}`);
  }

  // Activer/Désactiver un TP
  toggleTpStatus(id: number): Observable<TP> {
    return this.http.patch<TP>(`${environment.apiUrl}/tps/${id}/toggle-status`, {});
  }

  // Récupérer les TPs d'un enseignant
  getTpsByTeacher(teacherId: number): Observable<TP[]> {
    return this.http.get<TP[]>(`${environment.apiUrl}/tps/teacher/${teacherId}`);
  }

  // Récupérer les TPs disponibles pour un étudiant
  getAvailableTpsForStudent(studentId: number): Observable<TP[]> {
    return this.http.get<TP[]>(`${environment.apiUrl}/tps/student/${studentId}/available`);
  }

  // Rechercher des TPs
  searchTps(query: string, filters?: TpFilter): Observable<TP[]> {
    let params = new HttpParams().set('q', query);
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof TpFilter];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<TP[]>(`${environment.apiUrl}/tps/search`, { params });
  }

  // Statistiques des TPs
  getTpStats(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/tps/stats`);
  }

  // Exporter les TPs (CSV/Excel)
  exportTps(format: 'csv' | 'excel', filters?: TpFilter): Observable<Blob> {
    let params = new HttpParams().set('format', format);
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof TpFilter];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get(`${environment.apiUrl}/tps/export`, { 
      params, 
      responseType: 'blob' 
    });
  }
}
