import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
  id: number;
  amount: number;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  studentId: string;
  studentName: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  labSession?: string;
  course?: string;
}

export interface PaymentRequest {
  amount: number;
  description: string;
  studentId: string;
  dueDate?: string;
  labSession?: string;
  course?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.API_URL}/payments`);
  }

  getPaymentsByStudent(studentId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.API_URL}/payments/student/${studentId}`);
  }

  createPayment(payment: PaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(`${this.API_URL}/payments`, payment);
  }

  updatePaymentStatus(id: number, status: string): Observable<Payment> {
    return this.http.patch<Payment>(`${this.API_URL}/payments/${id}/status`, { status });
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/payments/${id}`);
  }
}