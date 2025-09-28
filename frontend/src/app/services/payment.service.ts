import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Payment {
  id?: number;
  amount: number;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentMethod: string;
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentRequest {
  amount: number;
  description: string;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Récupérer tous les paiements d'un utilisateur
  getUserPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.API_URL}/payments/user`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Créer un nouveau paiement
  createPayment(payment: PaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(`${this.API_URL}/payments`, payment, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer un paiement par ID
  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.API_URL}/payments/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Mettre à jour le statut d'un paiement
  updatePaymentStatus(id: number, status: string): Observable<Payment> {
    return this.http.patch<Payment>(`${this.API_URL}/payments/${id}/status`, { status }, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Annuler un paiement
  cancelPayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/payments/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Récupérer l'historique des paiements
  getPaymentHistory(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.API_URL}/payments/history`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
