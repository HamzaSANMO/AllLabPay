import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/auth.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private authService: AuthService) { }

  // Vérifier si l'utilisateur est un étudiant
  isStudent(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role === 'STUDENT';
  }

  // Vérifier si l'utilisateur est un enseignant
  isTeacher(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role === 'TEACHER';
  }

  // Vérifier si l'utilisateur est un administrateur
  isAdmin(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role === 'ADMIN';
  }

  // Obtenir le rôle de l'utilisateur actuel
  getCurrentRole(): string | null {
    const user = this.authService.getCurrentUser();
    return user?.role || null;
  }

  // Obtenir le nom complet de l'utilisateur
  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      return `${user.prenom} ${user.nom}`;
    }
    return '';
  }

  // Obtenir l'interface appropriée selon le rôle
  getDashboardRoute(): string {
    if (this.isAdmin()) {
      return '/admin/dashboard';
    } else if (this.isTeacher()) {
      return '/teacher/dashboard';
    } else if (this.isStudent()) {
      return '/student/dashboard';
    }
    return '/dashboard';
  }

  // Vérifier les permissions pour une route
  canAccessRoute(route: string): boolean {
    if (route.startsWith('/admin')) {
      return this.isAdmin();
    } else if (route.startsWith('/teacher')) {
      return this.isTeacher();
    } else if (route.startsWith('/student')) {
      return this.isStudent();
    }
    return true; // Routes publiques
  }

  // Obtenir les informations de l'utilisateur actuel
  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  // Observer les changements d'état d'authentification
  getAuthState(): Observable<any> {
    return this.authService.authState$;
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
