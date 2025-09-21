import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  payments: any[] = [];
  registrations: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.loadPayments();
    this.loadRegistrations();
  }

  loadPayments(): void {
    this.paymentService.getUserPayments().subscribe((data: any[]) => {
      this.payments = data;
    });
  }

  loadRegistrations(): void {
    this.registrationService.getUserRegistrations().subscribe((data: any[]) => {
      this.registrations = data.filter((r: any) => r.status === 'PENDING');
    });
  }

  initiatePayment(registrationId: number, provider: string) {
    // Créer un paiement simple
    const paymentData = {
      amount: 5000, // Montant par défaut
      description: `Paiement pour inscription ${registrationId}`,
      paymentMethod: provider
    };

    this.paymentService.createPayment(paymentData).subscribe((res: any) => {
      // Simuler une redirection de paiement
      alert(`Paiement initié pour ${paymentData.amount} FCFA via ${provider}`);
      
      // Mettre à jour la liste des paiements
      this.loadPayments();
    });
  }

  downloadReceipt(paymentId: number) {
    // Simuler le téléchargement d'un reçu
    alert(`Téléchargement du reçu ${paymentId} en cours...`);
    // Ici vous pourriez implémenter la vraie logique de téléchargement
  }
}
