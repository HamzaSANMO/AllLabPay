import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { PaymentService, Payment } from '../../services/payment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 py-6">
          <h1 class="text-2xl font-bold text-gray-900">
            Bonjour, {{ currentUser?.firstName }} !
          </h1>
          <p class="text-gray-600 mt-1">
            {{ getRoleDisplayName(currentUser?.role) }}
          </p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="px-4 py-6">
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="card">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600">{{ pendingPayments }}</div>
              <div class="text-sm text-gray-600">En attente</div>
            </div>
          </div>
          <div class="card">
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ completedPayments }}</div>
              <div class="text-sm text-gray-600">Payés</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Actions rapides</h2>
          
          <div class="grid grid-cols-1 gap-3">
            <button 
              *ngIf="isTeacher() || isAdmin()"
              class="card text-left hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">Créer un paiement</div>
                  <div class="text-sm text-gray-500">Ajouter un nouveau paiement</div>
                </div>
              </div>
            </button>

            <button 
              *ngIf="isStudent()"
              class="card text-left hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">Mes paiements</div>
                  <div class="text-sm text-gray-500">Voir mes paiements en cours</div>
                </div>
              </div>
            </button>

            <button 
              *ngIf="isAdmin()"
              class="card text-left hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">Statistiques</div>
                  <div class="text-sm text-gray-500">Voir les statistiques globales</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Recent Payments -->
        <div class="mt-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Paiements récents</h2>
          <div class="space-y-3">
            <div 
              *ngFor="let payment of recentPayments" 
              class="card"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-medium text-gray-900">{{ payment.description }}</div>
                  <div class="text-sm text-gray-500">{{ payment.studentName }}</div>
                  <div class="text-xs text-gray-400">{{ payment.createdAt | date:'short' }}</div>
                </div>
                <div class="text-right">
                  <div class="font-semibold text-gray-900">{{ payment.amount }}€</div>
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    [ngClass]="{
                      'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                      'bg-green-100 text-green-800': payment.status === 'COMPLETED',
                      'bg-red-100 text-red-800': payment.status === 'FAILED',
                      'bg-gray-100 text-gray-800': payment.status === 'CANCELLED'
                    }"
                  >
                    {{ getStatusDisplayName(payment.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  recentPayments: Payment[] = [];
  pendingPayments = 0;
  completedPayments = 0;

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (payments) => {
        this.recentPayments = payments.slice(0, 5);
        this.pendingPayments = payments.filter(p => p.status === 'PENDING').length;
        this.completedPayments = payments.filter(p => p.status === 'COMPLETED').length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des paiements:', error);
      }
    });
  }

  getRoleDisplayName(role?: string): string {
    switch (role) {
      case 'STUDENT': return 'Étudiant';
      case 'TEACHER': return 'Enseignant';
      case 'ADMIN': return 'Administrateur';
      default: return '';
    }
  }

  getStatusDisplayName(status: string): string {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'COMPLETED': return 'Payé';
      case 'FAILED': return 'Échoué';
      case 'CANCELLED': return 'Annulé';
      default: return status;
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
}