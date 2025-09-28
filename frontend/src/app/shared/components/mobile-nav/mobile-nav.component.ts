import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css']
})
export class MobileNavComponent implements OnInit {
  currentUser: User | null = null;
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
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

  getNavItems(): NavItem[] {
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

  getSidebarItems(): NavItem[] {
    return this.getNavItems();
  }

  // Icônes SVG
  private getHomeIcon(): string { /* ... */ return ''; }
  private getTpIcon(): string { /* ... */ return ''; }
  private getRegistrationIcon(): string { /* ... */ return ''; }
  private getPaymentIcon(): string { /* ... */ return ''; }
  private getProfileIcon(): string { /* ... */ return ''; }
  private getGradeIcon(): string { /* ... */ return ''; }
  private getUsersIcon(): string { /* ... */ return ''; }
  private getConfigIcon(): string { /* ... */ return ''; }
  private getAuditIcon(): string { /* ... */ return ''; }
}
