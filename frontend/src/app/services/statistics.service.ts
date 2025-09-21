import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { 
  GlobalStatistics, 
  FiliereStatistics, 
  DepartementStatistics, 
  TeacherStatistics 
} from '@app/models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGlobalStatistics(): Observable<GlobalStatistics> {
    return this.http.get<GlobalStatistics>(`${this.apiUrl}/admin/statistics/global`);
  }

  getStatisticsByFiliere(filiereId: number): Observable<FiliereStatistics> {
    return this.http.get<FiliereStatistics>(`${this.apiUrl}/admin/statistics/filiere/${filiereId}`);
  }

  getStatisticsByDepartement(departementId: number): Observable<DepartementStatistics> {
    return this.http.get<DepartementStatistics>(`${this.apiUrl}/admin/statistics/departement/${departementId}`);
  }

  getTeacherStatistics(): Observable<TeacherStatistics> {
    return this.http.get<TeacherStatistics>(`${this.apiUrl}/teacher/statistics/detailed`);
  }

  getStudentStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/statistics`);
  }
}
