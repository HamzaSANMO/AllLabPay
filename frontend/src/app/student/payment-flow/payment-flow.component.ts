import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TpService } from '../../services/tp.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { TP } from '../../models/tp.model';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-payment-flow',
  templateUrl: './payment-flow.component.html',
  styleUrls: ['./payment-flow.component.css']
})
export class PaymentFlowComponent implements OnInit {
  currentUser: User | null = null;
  tp: TP | null = null;
  isLoading = true;
  isProcessing = false;
  paymentForm: FormGroup;
  selectedProvider = '';
  paymentStep = 1; // 1: Select provider, 2: Confirm payment, 3: Processing, 4: Success
  
  // Opérateurs de paiement
  paymentProviders = [
    {
      id: 'MTN',
      name: 'MTN Mobile Money',
      icon: 'M',
      color: 'bg-yellow-500',
      description: 'Paiement via MTN Mobile Money'
    },
    {
      id: 'MOOV',
      name: 'Moov Money',
      icon: 'M',
      color: 'bg-orange-500',
      description: 'Paiement via Moov Money'
    },
    {
      id: 'CELTIIS',
      name: 'Celtiis Money',
      icon: 'C',
      color: 'bg-green-500',
      description: 'Paiement via Celtiis Money'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tpService: TpService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private roleService: RoleService
  ) {
    this.paymentForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8,10}$/)]],
      confirmPhoneNumber: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.phoneNumberMatchValidator });
  }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est bien un étudiant
    if (!this.roleService.isStudent()) {
      this.router.navigate(['/']);
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
      if (state.user) {
        this.loadTP();
      }
    });
  }

  loadTP(): void {
    const tpId = this.route.snapshot.paramMap.get('id');
    if (tpId) {
      this.tpService.getTpById(+tpId).subscribe({
        next: (tp) => {
          this.tp = tp;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement du TP:', error);
          this.isLoading = false;
          this.router.navigate(['/student/tps']);
        }
      });
    } else {
      this.router.navigate(['/student/tps']);
    }
  }

  selectProvider(providerId: string): void {
    this.selectedProvider = providerId;
    this.paymentStep = 2;
  }

  goBack(): void {
    if (this.paymentStep > 1) {
      this.paymentStep--;
    } else {
      this.router.navigate(['/student/tps']);
    }
  }

  confirmPayment(): void {
    if (this.paymentForm.valid && this.tp) {
      this.isProcessing = true;
      this.paymentStep = 3;

      const paymentData = {
        amount: this.tp.prix,
        description: `Paiement pour TP: ${this.tp.title}`,
        paymentMethod: this.selectedProvider,
        phoneNumber: this.paymentForm.value.phoneNumber,
        tpId: this.tp.id
      };

      // Simuler le processus de paiement
      setTimeout(() => {
        this.processPayment(paymentData);
      }, 2000);
    }
  }

  processPayment(paymentData: any): void {
    this.paymentService.createPayment(paymentData).subscribe({
      next: (response) => {
        this.isProcessing = false;
        this.paymentStep = 4;
        console.log('Paiement réussi:', response);
      },
      error: (error) => {
        this.isProcessing = false;
        console.error('Erreur lors du paiement:', error);
        alert('Erreur lors du paiement. Veuillez réessayer.');
        this.paymentStep = 2;
      }
    });
  }

  downloadReceipt(): void {
    // Simuler le téléchargement du reçu PDF
    alert('Téléchargement du reçu PDF en cours...');
    // Ici vous pourriez implémenter la vraie logique de téléchargement
  }

  phoneNumberMatchValidator(form: FormGroup) {
    const phoneNumber = form.get('phoneNumber');
    const confirmPhoneNumber = form.get('confirmPhoneNumber');
    
    if (phoneNumber && confirmPhoneNumber && phoneNumber.value !== confirmPhoneNumber.value) {
      confirmPhoneNumber.setErrors({ phoneNumberMismatch: true });
      return { phoneNumberMismatch: true };
    }
    
    return null;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(price);
  }

  getProviderInfo(providerId: string) {
    return this.paymentProviders.find(p => p.id === providerId);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.paymentForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}