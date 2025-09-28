import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CreateTeacherComponent } from './admin/create-teacher/create-teacher.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // Routes étudiant
  { path: 'student/dashboard', component: StudentDashboardComponent },

  // Routes enseignant
  { path: 'teacher/dashboard', component: TeacherDashboardComponent },
  { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule) },

  // Routes administrateur
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/users/create-teacher', component: CreateTeacherComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] // seul RouterModule doit être exporté
})
export class AppRoutingModule { }
