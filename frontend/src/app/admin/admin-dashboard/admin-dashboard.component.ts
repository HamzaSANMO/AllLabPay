import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/auth.model';
import { StatisticsService } from '../../services/statistics.service';
import { GlobalStatistics } from '../../models/statistics.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  globalStats: GlobalStatistics | null = null;

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router,
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est bien un administrateur
    if (!this.roleService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
      this.isLoading = false;
      if (state.user) {
        this.loadGlobalStatistics();
      }
    });
  }

  loadGlobalStatistics(): void {
    this.statisticsService.getGlobalStatistics().subscribe({
      next: (stats) => {
        this.globalStats = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    });
  }

  get userName(): string {
    return this.roleService.getCurrentUserName();
  }

  get userDepartement(): string {
    return this.currentUser?.departement || 'Non défini';
  }

  navigateToUsers(): void {
    this.router.navigate(['/admin/users']);
  }

  navigateToTPs(): void {
    this.router.navigate(['/admin/tps']);
  }

  navigateToDepartements(): void {
    this.router.navigate(['/admin/departements']);
  }

  navigateToFiliere(): void {
    this.router.navigate(['/admin/filiere']);
  }

  navigateToNiveaux(): void {
    this.router.navigate(['/admin/niveaux']);
  }

  navigateToMatieres(): void {
    this.router.navigate(['/admin/matieres']);
  }

  createTeacher(): void {
    this.router.navigate(['/admin/users/create-teacher']);
  }

  viewGlobalStatistics(): void {
    this.router.navigate(['/admin/statistics/global']);
  }

  viewFiliereStatistics(filiereId: number): void {
    this.router.navigate(['/admin/statistics/filiere', filiereId]);
  }

  viewDepartementStatistics(departementId: number): void {
    this.router.navigate(['/admin/statistics/departement', departementId]);
  }

  manageFiliere(): void {
    this.router.navigate(['/admin/filiere']);
  }

  manageMatieres(): void {
    this.router.navigate(['/admin/matieres']);
  }

  viewAuditLogs(): void {
    this.router.navigate(['/admin/audit-logs']);
  }
}
