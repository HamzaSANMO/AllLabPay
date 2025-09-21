import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  createTeacher(data: { email: string, password: string, departement: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/teachers`, data);
  }

  listUsers(role?: string): Observable<any[]> {
    let params = new HttpParams();
    if (role) params = params.set('role', role);
    return this.http.get<any[]>(`${this.apiUrl}/users`, { params });
  }

  toggleUserActive(id: number, isActive: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/toggle`, { isActive });
  }

  createDepartement(data: { nom: string, numeroMtn: string, numeroMoov: string, numeroCeltiis: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/departements`, data);
  }

  listDepartements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departements`);
  }

  listAuditLogs(filter: string, page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (filter) params = params.set('filter', filter);
    return this.http.get(`${this.apiUrl}/audit-logs`, { params });
  }

  listTPs(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/supervision/tps`, { params: new HttpParams().set('page', page.toString()).set('size', size.toString()) });
  }

  listPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/supervision/payments`);
  }

  listGrades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/supervision/grades`);
  }
}
