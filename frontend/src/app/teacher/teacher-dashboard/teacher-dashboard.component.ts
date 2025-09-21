import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/auth.model';
import { StatisticsService } from '../../services/statistics.service';
import { TpService } from '../../services/tp.service';
import { TeacherStatistics } from '../../models/statistics.model';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  statistics: TeacherStatistics | null = null;
  recentTPs: any[] = [];

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router,
    private statisticsService: StatisticsService,
    private tpService: TpService
  ) { }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est bien un enseignant
    if (!this.roleService.isTeacher()) {
      this.router.navigate(['/']);
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
      this.isLoading = false;
      if (state.user) {
        this.loadStatistics();
        this.loadRecentTPs();
      }
    });
  }

  loadStatistics(): void {
    this.statisticsService.getTeacherStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    });
  }

  loadRecentTPs(): void {
    this.tpService.getTeacherTPs().subscribe({
      next: (tps) => {
        this.recentTPs = tps.slice(0, 5); // Prendre les 5 premiers TP
      },
      error: (error) => {
        console.error('Erreur lors du chargement des TP:', error);
      }
    });
  }

  get userName(): string {
    return this.roleService.getCurrentUserName();
  }

  get userDepartement(): string {
    return this.currentUser?.departement || 'Non défini';
  }

  get userGrade(): string {
    return this.currentUser?.grade || 'Non défini';
  }

  navigateToTPs(): void {
    this.router.navigate(['/teacher/tps']);
  }

  navigateToStudents(): void {
    this.router.navigate(['/teacher/students']);
  }

  navigateToPayments(): void {
    this.router.navigate(['/teacher/payments']);
  }

  createNewTP(): void {
    this.router.navigate(['/teacher/tps/create']);
  }

  scheduleTP(tpId: number): void {
    this.router.navigate(['/teacher/tps', tpId, 'schedule']);
  }

  viewTPDetails(tpId: number): void {
    this.router.navigate(['/teacher/tps', tpId]);
  }

  viewStatistics(): void {
    this.router.navigate(['/teacher/statistics']);
  }

  manageGrades(): void {
    this.router.navigate(['/teacher/grades']);
  }
}
