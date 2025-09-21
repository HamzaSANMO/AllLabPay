import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsComponent } from './payments.component';
import { PaymentService } from '../services/payment.service';
import { RegistrationService } from '../services/registration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let paymentService: PaymentService;
  let registrationService: RegistrationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsComponent],
      imports: [HttpClientTestingModule],
      providers: [PaymentService, RegistrationService]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    paymentService = TestBed.inject(PaymentService);
    registrationService = TestBed.inject(RegistrationService);
  });

  it('should load payments and registrations', () => {
    spyOn(paymentService, 'getMyPayments').and.returnValue(of([{ id: 1, status: 'PAID' }]));
    spyOn(registrationService, 'getMyRegistrations').and.returnValue(of([{ id: 1, status: 'PENDING' }]));

    fixture.detectChanges();

    expect(component.payments.length).toBe(1);
    expect(component.registrations.length).toBe(1);
  });
});
