import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { TpService } from '../../services/tp.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface PaymentInfo {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  tpId: number;
  tpTitle: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentDate?: Date;
  createdAt: Date;
  paymentMethod?: string;
  transactionId?: string;
}

@Component({
  selector: 'app-payment-tracking',
  templateUrl: './payment-tracking.component.html',
  styleUrls: ['./payment-tracking.component.css']
})
export class PaymentTrackingComponent implements OnInit {
  payments: PaymentInfo[] = [];
  filteredPayments: PaymentInfo[] = [];
  isLoading = true;
  searchTerm = '';
  statusFilter = '';
  tpFilter = '';
  teacherTPs: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private tpService: TpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTeacherTPs();
    this.loadPayments();
  }

  loadTeacherTPs(): void {
    this.tpService.getTeacherTPs().subscribe({
      next: (tps) => {
        this.teacherTPs = tps;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des TP:', error);
      }
    });
  }

  loadPayments(): void {
    this.isLoading = true;
    // Simuler les données de paiement pour l'instant
    // Dans une vraie application, vous appelleriez this.paymentService.getTeacherPayments()
    setTimeout(() => {
      this.payments = [
        {
          id: 1,
          studentId: 101,
          studentName: 'Jean Dupont',
          studentEmail: 'jean.dupont@email.com',
          tpId: 1,
          tpTitle: 'Programmation Java',
          amount: 5000,
          status: 'COMPLETED',
          paymentDate: new Date('2024-01-15'),
          createdAt: new Date('2024-01-15'),
          paymentMethod: 'Mobile Money',
          transactionId: 'MM123456789'
        },
        {
          id: 2,
          studentId: 102,
          studentName: 'Marie Martin',
          studentEmail: 'marie.martin@email.com',
          tpId: 1,
          tpTitle: 'Programmation Java',
          amount: 5000,
          status: 'PENDING',
          createdAt: new Date('2024-01-16')
        },
        {
          id: 3,
          studentId: 103,
          studentName: 'Pierre Durand',
          studentEmail: 'pierre.durand@email.com',
          tpId: 2,
          tpTitle: 'Algèbre Linéaire',
          amount: 3000,
          status: 'COMPLETED',
          paymentDate: new Date('2024-01-14'),
          createdAt: new Date('2024-01-14'),
          paymentMethod: 'Carte Bancaire',
          transactionId: 'CB987654321'
        },
        {
          id: 4,
          studentId: 104,
          studentName: 'Sophie Bernard',
          studentEmail: 'sophie.bernard@email.com',
          tpId: 2,
          tpTitle: 'Algèbre Linéaire',
          amount: 3000,
          status: 'FAILED',
          createdAt: new Date('2024-01-13')
        }
      ];
      this.filteredPayments = this.payments;
      this.isLoading = false;
    }, 1000);
  }

  filterPayments(): void {
    this.filteredPayments = this.payments.filter(payment => {
      const matchesSearch = payment.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           payment.studentEmail.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           payment.tpTitle.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || payment.status === this.statusFilter;
      const matchesTP = !this.tpFilter || payment.tpId.toString() === this.tpFilter;
      return matchesSearch && matchesStatus && matchesTP;
    });
  }

  onSearchChange(): void {
    this.filterPayments();
  }

  onStatusFilterChange(): void {
    this.filterPayments();
  }

  onTPFilterChange(): void {
    this.filterPayments();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      case 'REFUNDED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'COMPLETED': return 'Payé';
      case 'FAILED': return 'Échoué';
      case 'REFUNDED': return 'Remboursé';
      default: return status;
    }
  }

  getTotalAmount(): number {
    return this.filteredPayments
      .filter(p => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  getPendingAmount(): number {
    return this.filteredPayments
      .filter(p => p.status === 'PENDING')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  getCompletedCount(): number {
    return this.filteredPayments.filter(p => p.status === 'COMPLETED').length;
  }

  getPendingCount(): number {
    return this.filteredPayments.filter(p => p.status === 'PENDING').length;
  }

  exportPayments(): void {
    const csvContent = this.filteredPayments.map(payment => 
      `${payment.studentName},${payment.studentEmail},${payment.tpTitle},${payment.amount},${this.getStatusText(payment.status)},${payment.paymentDate ? payment.paymentDate.toLocaleDateString() : 'N/A'}`
    ).join('\n');
    
    const header = 'Étudiant,Email,TP,Montant,Statut,Date de paiement\n';
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `paiements_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.snackBar.open('Export CSV généré avec succès', 'Fermer', { duration: 3000 });
  }
}