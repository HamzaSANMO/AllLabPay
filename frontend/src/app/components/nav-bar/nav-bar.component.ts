import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser: User | null = null;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.authState$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
    });
  }

  get userName(): string {
    return this.roleService.getCurrentUserName();
  }

  get userRole(): string {
    return this.roleService.getCurrentRole() || '';
  }

  get isStudent(): boolean {
    return this.roleService.isStudent();
  }

  get isTeacher(): boolean {
    return this.roleService.isTeacher();
  }

  get isAdmin(): boolean {
    return this.roleService.isAdmin();
  }

  getCurrentUserInitials(): string {
    if (this.currentUser) {
      const prenom = this.currentUser.prenom || '';
      const nom = this.currentUser.nom || '';
      if (prenom && nom) {
        return (prenom.charAt(0) + nom.charAt(0)).toUpperCase();
      } else if (prenom) {
        return prenom.charAt(0).toUpperCase();
      } else if (nom) {
        return nom.charAt(0).toUpperCase();
      }
    }
    return 'U';
  }

  logout(): void {
    this.authService.logout();
  }

  goToDashboard(): void {
    const dashboardRoute = this.roleService.getDashboardRoute();
    this.router.navigate([dashboardRoute]);
  }
}
