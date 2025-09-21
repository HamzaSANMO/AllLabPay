import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { TPSchedule, ScheduleTPDto } from '@app/models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = `${environment.apiUrl}/teacher`;

  constructor(private http: HttpClient) { }

  scheduleTP(scheduleDto: ScheduleTPDto): Observable<TPSchedule[]> {
    return this.http.post<TPSchedule[]>(`${this.apiUrl}/tps/schedule`, scheduleDto);
  }

  getTPSchedules(tpId: number): Observable<TPSchedule[]> {
    return this.http.get<TPSchedule[]>(`${this.apiUrl}/tps/${tpId}/schedules`);
  }

  getStudentSchedules(studentId: number): Observable<TPSchedule[]> {
    return this.http.get<TPSchedule[]>(`${environment.apiUrl}/student/schedules/${studentId}`);
  }

  updateScheduleStatus(scheduleId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/schedules/${scheduleId}/status`, { status });
  }

  markStudentAttendance(studentScheduleId: number, attended: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/student-schedules/${studentScheduleId}/attendance`, { attended });
  }
}
