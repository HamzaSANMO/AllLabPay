import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-management.component.html',
})
export class UsersManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(role?: string) {
    this.adminService.listUsers(role).subscribe((data) => (this.users = data));
  }

  createTeacher(email: string, password: string, departement: string) {
    if (email && password && departement) {
      this.adminService.createTeacher({ email, password, departement }).subscribe(() => {
        this.loadUsers('TEACHER');
      });
    }
  }

  toggleUserActive(id: number, isActive: boolean) {
    this.adminService.toggleUserActive(id, isActive).subscribe(() => this.loadUsers());
  }
}
