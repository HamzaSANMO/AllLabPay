import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-mobile-nav',


  template: `
    <!-- Bottom Navigation (Mobile) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div class="flex justify-around items-center py-2">
        <button 
          *ngFor="let item of getNavItems()"
          (click)="navigateTo(item.route)"
          [routerLink]="item.route"
          routerLinkActive="text-blue-600 dark:text-blue-400"
          class="flex flex-col items-center space-y-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          
          <svg class="w-6 h-6" [innerHTML]="item.icon"></svg>
          <span class="text-xs">{{ item.label }}</span>
        </button>
      </div>
    </div>

    <!-- Sidebar Toggle Button (Mobile) -->
    <button 
      (click)="toggleSidebar()"
      class="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Sidebar (Mobile) -->
    <div 
      [class]="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      class="md:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out">
      
      <!-- Sidebar Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span class="text-white font-semibold text-lg">
              {{ getInitials() }}
            </span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ currentUser?.nom }} {{ currentUser?.prenom }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ getRoleText() }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="p-4 space-y-2">
        <ng-container *ngFor="let item of getSidebarItems()">
          <a 
            [routerLink]="item.route"
            routerLinkActive="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            
            <svg class="w-5 h-5" [innerHTML]="item.icon"></svg>
            <span>{{ item.label }}</span>
          </a>
        </ng-container>
      </nav>

      <!-- Sidebar Footer -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          (click)="logout()"
          class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>

    <!-- Overlay (Mobile) -->
    <div 
      *ngIf="sidebarOpen"
      (click)="closeSidebar()"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30">
    </div>
  `,
  styles: [`
    .router-link-active {
      @apply text-blue-600 dark:text-blue-400;
    }
  `]
})
export class MobileNavComponent implements OnInit {
  currentUser: User | null = null;
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeSidebar();
  }

  logout(): void {
    this.authService.logout();
    this.closeSidebar();
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
          { label: 'Accueil', route: '/student', icon: this.getHomeIcon() },
          { label: 'TPs', route: '/student/tps', icon: this.getTpIcon() },
          { label: 'Inscriptions', route: '/student/registrations', icon: this.getRegistrationIcon() },
          { label: 'Paiements', route: '/student/payments', icon: this.getPaymentIcon() },
          { label: 'Profil', route: '/student/profile', icon: this.getProfileIcon() }
        ];
      case 'TEACHER':
        return [
          { label: 'Accueil', route: '/teacher', icon: this.getHomeIcon() },
          { label: 'Mes TPs', route: '/teacher/tps', icon: this.getTpIcon() },
          { label: 'Notes', route: '/teacher/grades', icon: this.getGradeIcon() },
          { label: 'Profil', route: '/teacher/profile', icon: this.getProfileIcon() }
        ];
      case 'ADMIN':
        return [
          { label: 'Accueil', route: '/admin', icon: this.getHomeIcon() },
          { label: 'Utilisateurs', route: '/admin/users', icon: this.getUsersIcon() },
          { label: 'Configuration', route: '/admin/config', icon: this.getConfigIcon() },
          { label: 'Audit', route: '/admin/audit', icon: this.getAuditIcon() }
        ];
      default:
        return [];
    }
  }

  getSidebarItems(): any[] {
    return this.getNavItems();
  }

  // Icônes SVG
  private getHomeIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>';
  }

  private getTpIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253"></path>';
  }

  private getRegistrationIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
  }

  private getPaymentIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>';
  }

  private getProfileIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>';
  }

  private getGradeIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>';
  }

  private getUsersIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>';
  }

  private getConfigIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>';
  }

  private getAuditIcon(): string {
    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>';
  }
}
