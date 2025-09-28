import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-teacher-mobile-nav',
  templateUrl: './teacher-mobile-nav.component.html',
  styleUrls: ['./teacher-mobile-nav.component.css']
})
export class TeacherMobileNavComponent implements OnInit {
  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z',
      route: '/teacher/dashboard',
      active: false
    },
    {
      label: 'Mes TP',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      route: '/teacher/tps',
      active: false
    },
    {
      label: 'Paiements',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      route: '/teacher/payments',
      active: false
    },
    {
      label: 'Résultats',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      route: '/teacher/results',
      active: false
    },
    {
      label: 'Profil',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      route: '/teacher/profile',
      active: false
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.updateActiveRoute();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveRoute();
      }
    });
  }

  updateActiveRoute(): void {
    const currentRoute = this.router.url;
    this.navItems.forEach(item => {
      item.active = currentRoute.startsWith(item.route);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
  }
}