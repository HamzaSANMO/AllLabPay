import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/auth.model';
import { TpService } from '../../services/tp.service';
import { ScheduleService } from '../../services/schedule.service';
import { TP } from '../../models/tp.model';
import { TPSchedule } from '../../models/schedule.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  availableTPs: TP[] = [];
  mySchedules: TPSchedule[] = [];
  myRegistrations: any[] = [];

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router,
    private tpService: TpService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    if (!this.roleService.isStudent()) {
      this.router.navigate(['/']);
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
      this.isLoading = false;
      if (state.user) {
        this.loadStudentData();
      }
    });
  }

  loadStudentData(): void {
    if (this.currentUser?.filiere?.id) {
      this.tpService.getAvailableTPsByFiliere(this.currentUser.filiere.id).subscribe({
        next: (tps) => this.availableTPs = tps,
        error: (error) => console.error('Erreur lors du chargement des TP:', error)
      });
    }

    if (this.currentUser?.id) {
      this.scheduleService.getStudentSchedules(this.currentUser.id).subscribe({
        next: (schedules) => this.mySchedules = schedules,
        error: (error) => console.error('Erreur lors du chargement des créneaux:', error)
      });
    }
  }

  get userName(): string {
    return this.roleService.getCurrentUserName();
  }

  get userFiliere(): string {
    return this.currentUser?.filiere?.nom || 'Non définie';
  }

  get userNiveau(): string {
    return this.currentUser?.niveau?.nom || 'Non défini';
  }

  navigateToTPs(): void {
    this.router.navigate(['/student/tps']);
  }

  navigateToPayments(): void {
    this.router.navigate(['/student/payments']);
  }

  navigateToRegistrations(): void {
    this.router.navigate(['/student/registrations']);
  }

  viewTPSchedule(tpId: number): void {
    this.router.navigate(['/student/tps', tpId, 'schedule']);
  }

  registerToTP(tpId: number): void {
    this.router.navigate(['/student/tps', tpId, 'register']);
  }

  viewMySchedules(): void {
    this.router.navigate(['/student/schedules']);
  }

  filterTPsByNiveau(niveauId: number): void {
    this.tpService.getAvailableTPsByNiveau(niveauId).subscribe({
      next: (tps) => this.availableTPs = tps,
      error: (error) => console.error('Erreur lors du filtrage par niveau:', error)
    });
  }

  filterTPsByDepartement(departementId: number): void {
    this.tpService.getAvailableTPsByDepartement(departementId).subscribe({
      next: (tps) => this.availableTPs = tps,
      error: (error) => console.error('Erreur lors du filtrage par département:', error)
    });
  }
}
