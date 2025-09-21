import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
})
export class UsersManagementComponent implements OnInit {
  users: any[] = [];
  teacherForm: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      departement: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(role?: string) {
    this.adminService.listUsers(role).subscribe(data => {
      this.users = data;
    });
  }

  createTeacher() {
    if (this.teacherForm.valid) {
      this.adminService.createTeacher(this.teacherForm.value).subscribe(() => {
        this.loadUsers('TEACHER');
        this.teacherForm.reset();
      });
    }
  }

  toggleUserActive(id: number, isActive: boolean) {
    this.adminService.toggleUserActive(id, isActive).subscribe(() => {
      this.loadUsers();
    });
  }
}
