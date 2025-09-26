import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 py-6">
          <h1 class="text-2xl font-bold text-gray-900">Profil</h1>
          <p class="text-gray-600 mt-1">Informations de votre compte</p>
        </div>
      </div>

      <div class="px-4 py-6">
        <!-- Profile Card -->
        <div class="card mb-6">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
              <span class="text-white text-xl font-semibold">
                {{ currentUser?.firstName?.charAt(0) }}{{ currentUser?.lastName?.charAt(0) }}
              </span>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ currentUser?.firstName }} {{ currentUser?.lastName }}
              </h2>
              <p class="text-gray-600">{{ getRoleDisplayName(currentUser?.role) }}</p>
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1 text-sm text-gray-900">{{ currentUser?.email }}</div>
            </div>

            <div *ngIf="currentUser?.studentId">
              <label class="block text-sm font-medium text-gray-700">ID Étudiant</label>
              <div class="mt-1 text-sm text-gray-900">{{ currentUser.studentId }}</div>
            </div>

            <div *ngIf="currentUser?.department">
              <label class="block text-sm font-medium text-gray-700">Département</label>
              <div class="mt-1 text-sm text-gray-900">{{ currentUser.department }}</div>
            </div>
          </div>
        </div>

        <!-- Role-specific Information -->
        <div *ngIf="isStudent()" class="card mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations étudiant</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Statut</label>
              <div class="mt-1 text-sm text-green-600 font-medium">Actif</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Paiements en attente</label>
              <div class="mt-1 text-sm text-gray-900">{{ pendingCount }}</div>
            </div>
          </div>
        </div>

        <div *ngIf="isTeacher()" class="card mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations enseignant</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Département</label>
              <div class="mt-1 text-sm text-gray-900">{{ currentUser?.department || 'Non spécifié' }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Paiements créés</label>
              <div class="mt-1 text-sm text-gray-900">{{ createdPaymentsCount }}</div>
            </div>
          </div>
        </div>

        <div *ngIf="isAdmin()" class="card mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations administrateur</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Accès</label>
              <div class="mt-1 text-sm text-gray-900">Accès complet au système</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Total des paiements</label>
              <div class="mt-1 text-sm text-gray-900">{{ totalPaymentsCount }}</div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="space-y-4">
          <button 
            (click)="logout()"
            class="w-full btn-secondary text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  pendingCount = 0;
  createdPaymentsCount = 0;
  totalPaymentsCount = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadStats();
  }

  loadStats(): void {
    // Ici on pourrait charger les statistiques depuis l'API
    // Pour l'instant, on utilise des valeurs simulées
    this.pendingCount = 2;
    this.createdPaymentsCount = 15;
    this.totalPaymentsCount = 150;
  }

  getRoleDisplayName(role?: string): string {
    switch (role) {
      case 'STUDENT': return 'Étudiant';
      case 'TEACHER': return 'Enseignant';
      case 'ADMIN': return 'Administrateur';
      default: return '';
    }
  }

  isStudent(): boolean {
    return this.authService.isStudent();
  }

  isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}