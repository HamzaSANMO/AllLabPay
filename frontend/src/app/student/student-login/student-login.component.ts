import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
      
      const loginData = {
        emailOrMatricule: email,
        password: password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Connexion réussie:', response);
          
          // Vérifier que l'utilisateur est bien un étudiant
          if (this.roleService.isStudent()) {
            this.router.navigate(['/student/dashboard']);
          } else {
            this.errorMessage = 'Accès refusé. Seuls les étudiants peuvent accéder à cette page.';
            this.authService.logout();
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur de connexion:', error);
          this.errorMessage = 'Email ou mot de passe incorrect. Veuillez réessayer.';
        }
      });
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}