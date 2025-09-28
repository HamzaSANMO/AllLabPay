import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Logo et titre -->
        <div class="text-center">
          <div class="mx-auto w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span class="text-white font-bold text-3xl">F</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Connexion
          </h2>
          <p class="text-green-600 font-medium">
            Accédez à votre espace FAST UAC
          </p>
        </div>

        <!-- Formulaire de connexion -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="appearance-none relative block w-full pl-10 pr-3 py-3 border border-green-200 placeholder-green-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="votre@email.com"
                  [class.border-red-300]="isFieldInvalid('email')"
                  [class.focus:ring-red-500]="isFieldInvalid('email')"
                  [class.focus:border-red-500]="isFieldInvalid('email')"
                />
              </div>
              <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-red-600">
                Veuillez entrer une adresse email valide
              </div>
            </div>

            <!-- Mot de passe -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  class="appearance-none relative block w-full pl-10 pr-12 py-3 border border-green-200 placeholder-green-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Votre mot de passe"
                  [class.border-red-300]="isFieldInvalid('password')"
                  [class.focus:ring-red-500]="isFieldInvalid('password')"
                  [class.focus:border-red-500]="isFieldInvalid('password')"
                />
                <button
                  type="button"
                  (click)="togglePassword()"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-green-400 hover:text-green-600 transition-colors duration-200"
                >
                  <svg *ngIf="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <svg *ngIf="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                </button>
              </div>
              <div *ngIf="isFieldInvalid('password')" class="mt-1 text-sm text-red-600">
                Le mot de passe est requis
              </div>
            </div>

            <!-- Options -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  formControlName="rememberMe"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
          </div>

          <!-- Bouton de connexion -->
          <div>
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span *ngIf="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span *ngIf="!isLoading">Se connecter</span>
              <span *ngIf="isLoading">Connexion en cours...</span>
            </button>
          </div>

          <!-- Séparateur -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-green-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gradient-to-br from-white via-green-50 to-green-100 text-green-600">
                Ou continuez avec
              </span>
            </div>
          </div>

          <!-- Boutons sociaux -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-green-200 rounded-xl shadow-sm bg-white text-sm font-medium text-green-600 hover:bg-green-50 transition-all duration-200"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="ml-2">Google</span>
            </button>
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-green-200 rounded-xl shadow-sm bg-white text-sm font-medium text-green-600 hover:bg-green-50 transition-all duration-200"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <span class="ml-2">Twitter</span>
            </button>
          </div>

          <!-- Lien d'inscription -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Pas encore de compte ?
              <a routerLink="/auth/register" class="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                Créez-en un gratuitement
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .bg-gradient-to-br {
      background: linear-gradient(to bottom right, #ffffff, #f0fdf4, #dcfce7);
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
      const { email, password, rememberMe } = this.loginForm.value;
      
      const loginData = {
        emailOrMatricule: email,
        password: password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Connexion réussie:', response);
          // La navigation est gérée automatiquement par le service
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur de connexion:', error);
          // Ici vous pourriez afficher un message d'erreur à l'utilisateur
          alert('Erreur de connexion: ' + error.message);
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
}
