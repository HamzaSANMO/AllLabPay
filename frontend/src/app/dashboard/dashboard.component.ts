import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Rediriger vers le bon tableau de bord selon le rôle
    if (this.roleService.isAuthenticated()) {
      const dashboardRoute = this.roleService.getDashboardRoute();
      this.router.navigate([dashboardRoute]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
