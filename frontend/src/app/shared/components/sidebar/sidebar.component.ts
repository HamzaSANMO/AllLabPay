import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',


  template: `
    <!-- Desktop Sidebar -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1 bg-gray-800">
          <!-- Logo -->
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-lg">F</span>
                </div>
              </div>
              <div class="ml-3">
                <h1 class="text-white text-lg font-semibold">FAST UAC</h1>
                <p class="text-gray-300 text-xs">Gestion des TPs</p>
              </div>
            </div>
          </div>

          <!-- User Info -->
          <div class="flex-shrink-0 flex bg-gray-700 p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-semibold text-lg">
                    {{ getInitials() }}
                  </span>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-white">
                  {{ currentUser?.nom }} {{ currentUser?.prenom }}
                </p>
                <p class="text-xs text-gray-300">{{ getRoleText() }}</p>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-gray-800 space-y-1">
              <ng-container *ngFor="let item of getNavItems()">
                <a 
                  [routerLink]="item.route"
                  routerLinkActive="bg-gray-900 text-white"
                  class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                  
                  <svg class="mr-3 h-6 w-6" [innerHTML]="item.icon"></svg>
                  {{ item.label }}
                </a>
              </ng-container>
            </nav>
          </div>

          <!-- Footer -->
          <div class="flex-shrink-0 flex bg-gray-700 p-4">
            <button 
              (click)="logout()"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
              <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SidebarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  getInitials(): string {
    if (!this.currentUser) return 'U';
    return (this.currentUser.prenom.charAt(0) + this.currentUser.nom.charAt(0)).toUpperCase();
  }

  getRoleText(): string {
    switch (this.currentUser?.role) {
      case 'STUDENT': return 'Étudiant';
      case 'TEACHER': return 'Enseignant';
      case 'ADMIN': return 'Administrateur';
      default: return 'Utilisateur';
    }
  }

  getNavItems(): any[] {
    const role = this.currentUser?.role;
    
    switch (role) {
      case 'STUDENT':
        return [
          { label: 'Tableau de bord', route: '/student', icon: this.getDashboardIcon() },
          { label: 'Travaux Pratiques', route: '/student/tps', icon: this.getTpIcon() },
          { label: 'Mes Inscriptions', route: '/student/registrations', icon: this.getRegistrationIcon() },
          { label: 'Mes Paiements', route: '/student/payments', icon: this.getPaymentIcon() },
          { label: 'Mes Notes', route: '/student/grades', icon: this.getGradeIcon() },
          { label: 'Mon Profil', route: '/student/profile', icon: this.getProfileIcon() }
        ];
      case 'TEACHER':
        return [
          { label: 'Tableau de bord', route: '/teacher', icon: this.getDashboardIcon() },
          { label: 'Mes TPs', route: '/teacher/tps', icon: this.getTpIcon() },
          { label: 'Créer un TP', route: '/teacher/tps/create', icon: this.getCreateIcon() },
          { label: 'Gestion des Notes', route: '/teacher/grades', icon: this.getGradeIcon() },
          { label: 'Mon Profil', route: '/teacher/profile', icon: this.getProfileIcon() }
        ];
      case 'ADMIN':
        return [
          { label: 'Tableau de bord', route: '/admin', icon: this.getDashboardIcon() },
          { label: 'Gestion Utilisateurs', route: '/admin/users', icon: this.getUsersIcon() },
          { label: 'Gestion Filières', route: '/admin/filieres', icon: this.getFiliereIcon() },
          { label: 'Gestion Matières', route: '/admin/matieres', icon: this.getMatiereIcon() },
          { label: 'Configuration Paiements', route: '/admin/payments', icon: this.getPaymentIcon() },
          { label: 'Audit & Logs', route: '/admin/audit', icon: this.getAuditIcon() },
          { label: 'Statistiques', route: '/admin/stats', icon: this.getStatsIcon() }
        ];
      default:
        return [];
    }
  }

  // Icônes SVG
  private getDashboardIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>';
  }

  private getTpIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253"></path>';
  }

  private getCreateIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>';
  }

  private getRegistrationIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
  }

  private getPaymentIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>';
  }

  private getGradeIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>';
  }

  private getProfileIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>';
  }

  private getUsersIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>';
  }

  private getFiliereIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>';
  }

  private getMatiereIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253"></path>';
  }

  private getAuditIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>';
  }

  private getStatsIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>';
  }
}
