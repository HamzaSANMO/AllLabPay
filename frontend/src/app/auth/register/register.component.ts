import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="min-h-screen bg-gradient-to-br flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- En-tête -->
        <div class="text-center">
          <div class="mx-auto h-16 w-16 bg-green-600 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-2xl">F</span>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Créer votre compte
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Rejoignez FAST UAC pour accéder aux TP
          </p>
        </div>

        <!-- Formulaire -->
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <!-- Prénom et Nom -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="prenom" class="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                formControlName="prenom"
                class="appearance-none relative block w-full px-3 py-3 border border-green-200 placeholder-green-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Votre prénom"
                [class.border-red-300]="isFieldInvalid('prenom')"
              />
              <div *ngIf="isFieldInvalid('prenom')" class="mt-1 text-sm text-red-600">
                Le prénom est requis
              </div>
            </div>

            <div>
              <label for="nom" class="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                id="nom"
                type="text"
                formControlName="nom"
                class="appearance-none relative block w-full px-3 py-3 border border-green-200 placeholder-green-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Votre nom"
                [class.border-red-300]="isFieldInvalid('nom')"
              />
              <div *ngIf="isFieldInvalid('nom')" class="mt-1 text-sm text-red-600">
                Le nom est requis
              </div>
            </div>
          </div>

          <!-- Matricule -->
          <div>
            <label for="matricule" class="block text-sm font-medium text-gray-700 mb-2">
              Matricule
            </label>
            <input
              id="matricule"
              type="text"
              formControlName="matricule"
              class="appearance-none relative block w-full px-3 py-3 border border-green-200 placeholder-green-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="Votre matricule"
              [class.border-red-300]="isFieldInvalid('matricule')"
            />
            <div *ngIf="isFieldInvalid('matricule')" class="mt-1 text-sm text-red-600">
              Le matricule est requis
            </div>
          </div>

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
                placeholder="Créez un mot de passe"
                [class.border-red-300]="isFieldInvalid('password')"
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
              Le mot de passe doit contenir au moins 6 caractères
            </div>
          </div>

          <!-- Confirmation du mot de passe -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="confirmPassword"
                [type]="showConfirmPassword ? 'text' : 'password'"
                formControlName="confirmPassword"
                class="appearance-none relative block w-full pl-10 pr-12 py-3 border border-green-200 placeholder-green-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Confirmez votre mot de passe"
                [class.border-red-300]="isFieldInvalid('confirmPassword')"
              />
              <button
                type="button"
                (click)="toggleConfirmPassword()"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-green-400 hover:text-green-600 transition-colors duration-200"
              >
                <svg *ngIf="!showConfirmPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg *ngIf="showConfirmPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            <div *ngIf="isFieldInvalid('confirmPassword')" class="mt-1 text-sm text-red-600">
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">La confirmation du mot de passe est requise</span>
              <span *ngIf="registerForm.errors?.['passwordMismatch']">Les mots de passe ne correspondent pas</span>
            </div>
          </div>

          <!-- Conditions d'utilisation -->
          <div class="flex items-center">
            <input
              id="terms"
              type="checkbox"
              formControlName="terms"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              J'accepte les <a href="#" class="text-green-600 hover:text-green-500">conditions d'utilisation</a>
            </label>
          </div>
          <div *ngIf="isFieldInvalid('terms')" class="mt-1 text-sm text-red-600">
            Vous devez accepter les conditions d'utilisation
          </div>

          <!-- Bouton de soumission -->
          <div>
            <button
              type="submit"
              [disabled]="registerForm.invalid || isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span *ngIf="!isLoading">Créer mon compte</span>
              <span *ngIf="isLoading">Création en cours...</span>
            </button>
          </div>

          <!-- Lien de connexion -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              Déjà un compte ?
              <a routerLink="/auth/login" class="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                Connectez-vous
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
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      matricule: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = this.registerForm.value;
      
      // Préparer les données selon le modèle backend
      const registerData = {
        email: formData.email,
        matricule: formData.matricule,
        nom: formData.nom,
        prenom: formData.prenom,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Inscription réussie:', response);
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur d\'inscription:', error);
          alert('Erreur d\'inscription: ' + error.message);
        }
      });
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}
