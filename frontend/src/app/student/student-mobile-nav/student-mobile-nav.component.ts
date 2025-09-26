import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-student-mobile-nav',
  templateUrl: './student-mobile-nav.component.html',
  styleUrls: ['./student-mobile-nav.component.css']
})
export class StudentMobileNavComponent implements OnInit {
  currentUser: User | null = null;
  currentRoute = '';

  navigationItems = [
    {
      id: 'dashboard',
      label: 'Accueil',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
      route: '/student/dashboard',
      active: false
    },
    {
      id: 'tps',
      label: 'TP',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      route: '/student/tps',
      active: false
    },
    {
      id: 'payments',
      label: 'Paiements',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      route: '/student/payments',
      active: false
    },
    {
      id: 'grades',
      label: 'Notes',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      route: '/student/grades',
      active: false
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      route: '/student/profile',
      active: false
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    // Vérifier que l'utilisateur est bien un étudiant
    if (!this.roleService.isStudent()) {
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
    });

    // Écouter les changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.updateActiveItems();
      }
    });

    // Initialiser l'état actif
    this.updateActiveItems();
  }

  updateActiveItems(): void {
    this.navigationItems.forEach(item => {
      item.active = this.currentRoute.startsWith(item.route);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
  }

  getUserInitials(): string {
    if (this.currentUser) {
      return `${this.currentUser.prenom.charAt(0)}${this.currentUser.nom.charAt(0)}`.toUpperCase();
    }
    return 'U';
  }
}