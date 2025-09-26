import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { PaymentService, Payment, PaymentRequest } from '../../services/payment.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 py-6">
          <h1 class="text-2xl font-bold text-gray-900">Paiements</h1>
          <p class="text-gray-600 mt-1">Gestion des paiements de laboratoire</p>
        </div>
      </div>

      <!-- Create Payment Form (Teachers/Admins only) -->
      <div *ngIf="isTeacher() || isAdmin()" class="px-4 py-6">
        <div class="card mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Créer un nouveau paiement</h2>
          
          <form (ngSubmit)="createPayment()" #paymentForm="ngForm">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label for="studentId" class="block text-sm font-medium text-gray-700 mb-1">
                  ID Étudiant
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  [(ngModel)]="newPayment.studentId"
                  required
                  class="input-field"
                  placeholder="Ex: 2024001"
                >
              </div>

              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
                  Montant (€)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  [(ngModel)]="newPayment.amount"
                  required
                  min="0"
                  step="0.01"
                  class="input-field"
                  placeholder="0.00"
                >
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  [(ngModel)]="newPayment.description"
                  required
                  class="input-field"
                  placeholder="Ex: Paiement laboratoire chimie"
                >
              </div>

              <div>
                <label for="course" class="block text-sm font-medium text-gray-700 mb-1">
                  Cours (optionnel)
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  [(ngModel)]="newPayment.course"
                  class="input-field"
                  placeholder="Ex: Chimie Organique"
                >
              </div>

              <div>
                <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
                  Date d'échéance (optionnel)
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  [(ngModel)]="newPayment.dueDate"
                  class="input-field"
                >
              </div>

              <button
                type="submit"
                [disabled]="!paymentForm.form.valid || isCreating"
                class="btn-primary w-full"
              >
                {{ isCreating ? 'Création...' : 'Créer le paiement' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Payments List -->
      <div class="px-4 pb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Liste des paiements</h2>
          <div class="flex space-x-2">
            <button 
              *ngFor="let filter of statusFilters"
              (click)="setStatusFilter(filter.value)"
              class="px-3 py-1 text-sm rounded-full transition-colors"
              [ngClass]="{
                'bg-primary-600 text-white': currentFilter === filter.value,
                'bg-gray-200 text-gray-700 hover:bg-gray-300': currentFilter !== filter.value
              }"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <div 
            *ngFor="let payment of filteredPayments" 
            class="card"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="font-medium text-gray-900">{{ payment.description }}</div>
                <div class="text-sm text-gray-500 mt-1">
                  Étudiant: {{ payment.studentName }} ({{ payment.studentId }})
                </div>
                <div *ngIf="payment.course" class="text-sm text-gray-500">
                  Cours: {{ payment.course }}
                </div>
                <div class="text-xs text-gray-400 mt-1">
                  Créé le {{ payment.createdAt | date:'short' }}
                </div>
                <div *ngIf="payment.dueDate" class="text-xs text-gray-400">
                  Échéance: {{ payment.dueDate | date:'short' }}
                </div>
              </div>
              
              <div class="text-right ml-4">
                <div class="font-semibold text-gray-900 text-lg">{{ payment.amount }}€</div>
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                  [ngClass]="{
                    'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                    'bg-green-100 text-green-800': payment.status === 'COMPLETED',
                    'bg-red-100 text-red-800': payment.status === 'FAILED',
                    'bg-gray-100 text-gray-800': payment.status === 'CANCELLED'
                  }"
                >
                  {{ getStatusDisplayName(payment.status) }}
                </span>
                
                <!-- Action buttons for Teachers/Admins -->
                <div *ngIf="(isTeacher() || isAdmin()) && payment.status === 'PENDING'" class="mt-2 space-x-2">
                  <button 
                    (click)="updatePaymentStatus(payment.id, 'COMPLETED')"
                    class="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Marquer payé
                  </button>
                  <button 
                    (click)="updatePaymentStatus(payment.id, 'CANCELLED')"
                    class="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="filteredPayments.length === 0" class="text-center py-8 text-gray-500">
            Aucun paiement trouvé
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentsComponent implements OnInit {
  currentUser: User | null = null;
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  currentFilter = 'ALL';
  
  newPayment: PaymentRequest = {
    amount: 0,
    description: '',
    studentId: '',
    dueDate: '',
    course: ''
  };
  
  isCreating = false;

  statusFilters = [
    { value: 'ALL', label: 'Tous' },
    { value: 'PENDING', label: 'En attente' },
    { value: 'COMPLETED', label: 'Payés' },
    { value: 'FAILED', label: 'Échoués' },
    { value: 'CANCELLED', label: 'Annulés' }
  ];

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
        this.payments = payments;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des paiements:', error);
      }
    });
  }

  createPayment(): void {
    if (this.isCreating) return;
    
    this.isCreating = true;
    this.paymentService.createPayment(this.newPayment).subscribe({
      next: (payment) => {
        this.isCreating = false;
        this.newPayment = {
          amount: 0,
          description: '',
          studentId: '',
          dueDate: '',
          course: ''
        };
        this.loadPayments();
      },
      error: (error) => {
        this.isCreating = false;
        console.error('Erreur lors de la création du paiement:', error);
      }
    });
  }

  updatePaymentStatus(paymentId: number, status: string): void {
    this.paymentService.updatePaymentStatus(paymentId, status).subscribe({
      next: () => {
        this.loadPayments();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du paiement:', error);
      }
    });
  }

  setStatusFilter(filter: string): void {
    this.currentFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.currentFilter === 'ALL') {
      this.filteredPayments = this.payments;
    } else {
      this.filteredPayments = this.payments.filter(p => p.status === this.currentFilter);
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